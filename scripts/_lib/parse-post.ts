/**
 * Static TSX-post parser.
 *
 * Post files (`content/blog/posts/<slug>.tsx`) cannot be `import`-ed directly
 * from a plain Node script because they pull in `next/link`, JSX, and the
 * `@/` path alias. Rather than wire up the Next compiler just to read
 * metadata, we walk the source AST with the TypeScript compiler API
 * (already a devDep) and extract the `meta` object literal plus any later
 * `meta.toc = TOC` assignments.
 *
 * Only the metadata is needed for generation/auditing — the JSX body is left
 * as raw text and scanned with regexes for the content-quality checks.
 */
import * as fs from 'node:fs'
import * as ts from 'typescript'

export interface ParsedPost {
  filePath: string
  fullText: string
  meta: Record<string, unknown>
}

export function parsePostFile(filePath: string): ParsedPost | null {
  const fullText = fs.readFileSync(filePath, 'utf8')
  const sf = ts.createSourceFile(
    filePath,
    fullText,
    ts.ScriptTarget.ESNext,
    /* setParentNodes */ true,
    ts.ScriptKind.TSX
  )

  const meta: Record<string, unknown> = {}
  // Track top-level `const NAME = ...` so `meta.toc = TOC` can resolve TOC.
  const topLevelConsts = new Map<string, ts.Expression>()

  for (const stmt of sf.statements) {
    if (ts.isVariableStatement(stmt)) {
      for (const decl of stmt.declarationList.declarations) {
        if (ts.isIdentifier(decl.name) && decl.initializer) {
          topLevelConsts.set(decl.name.text, decl.initializer)
        }
      }
    }
  }

  function objLitToValue(node: ts.ObjectLiteralExpression): Record<string, unknown> {
    const obj: Record<string, unknown> = {}
    for (const prop of node.properties) {
      if (!ts.isPropertyAssignment(prop)) continue
      let key: string | undefined
      if (ts.isIdentifier(prop.name)) key = prop.name.text
      else if (ts.isStringLiteral(prop.name)) key = prop.name.text
      if (key === undefined) continue
      const v = exprToValue(prop.initializer)
      if (v !== undefined) obj[key] = v
    }
    return obj
  }

  function exprToValue(node: ts.Expression): unknown {
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node))
      return node.text
    if (ts.isTemplateExpression(node)) {
      let s = node.head.text
      for (const span of node.templateSpans) {
        const sub = exprToValue(span.expression)
        s += typeof sub === 'string' || typeof sub === 'number' ? String(sub) : '${...}'
        s += span.literal.text
      }
      return s
    }
    if (node.kind === ts.SyntaxKind.TrueKeyword) return true
    if (node.kind === ts.SyntaxKind.FalseKeyword) return false
    if (node.kind === ts.SyntaxKind.NullKeyword) return null
    if (ts.isNumericLiteral(node)) return Number(node.text)
    if (ts.isPrefixUnaryExpression(node) && node.operator === ts.SyntaxKind.MinusToken) {
      const inner = exprToValue(node.operand)
      if (typeof inner === 'number') return -inner
    }
    if (ts.isArrayLiteralExpression(node)) {
      const arr: unknown[] = []
      for (const el of node.elements) {
        const v = exprToValue(el)
        if (v !== undefined) arr.push(v)
      }
      return arr
    }
    if (ts.isObjectLiteralExpression(node)) return objLitToValue(node)
    if (ts.isIdentifier(node)) {
      // Resolve top-level const references (e.g. `TOC`).
      const ref = topLevelConsts.get(node.text)
      if (ref) return exprToValue(ref)
    }
    if (ts.isAsExpression(node) || ts.isTypeAssertionExpression(node)) {
      return exprToValue(node.expression)
    }
    return undefined
  }

  for (const stmt of sf.statements) {
    // Capture `export const meta: PostMeta = { ... }`
    if (ts.isVariableStatement(stmt)) {
      const exported = stmt.modifiers?.some(
        (m) => m.kind === ts.SyntaxKind.ExportKeyword
      )
      if (!exported) continue
      for (const decl of stmt.declarationList.declarations) {
        if (
          ts.isIdentifier(decl.name) &&
          decl.name.text === 'meta' &&
          decl.initializer &&
          ts.isObjectLiteralExpression(decl.initializer)
        ) {
          Object.assign(meta, objLitToValue(decl.initializer))
        }
      }
    }

    // Capture later `meta.foo = X` style assignments.
    if (ts.isExpressionStatement(stmt) && ts.isBinaryExpression(stmt.expression)) {
      const be = stmt.expression
      if (
        be.operatorToken.kind === ts.SyntaxKind.EqualsToken &&
        ts.isPropertyAccessExpression(be.left) &&
        ts.isIdentifier(be.left.expression) &&
        be.left.expression.text === 'meta'
      ) {
        const key = be.left.name.text
        const value = exprToValue(be.right)
        if (value !== undefined) meta[key] = value
      }
    }
  }

  return { filePath, fullText, meta }
}
