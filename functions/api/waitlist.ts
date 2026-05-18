/// <reference types="@cloudflare/workers-types" />

/**
 * Cloudflare Pages Function — POST /api/waitlist
 *
 * Captures early-access emails into a KV namespace bound as `WAITLIST`. The
 * email itself is the key (so re-submits are idempotent), and the value is a
 * JSON blob with capture metadata for later attribution / debugging.
 *
 * Adapted from the SmarterEats waitlist function.
 *
 * TODO (one-time setup before this works in production):
 *   1. Workers & Pages → KV → Create namespace → name it
 *      "smartertraining_waitlist" (the binding name below is what matters).
 *   2. Pages project → Settings → Functions → KV namespace bindings →
 *      Add: Variable name = "WAITLIST", KV namespace = the one you created.
 *   3. Redeploy.
 *
 * Until the binding exists, the form will show a clean "Server misconfigured"
 * error. Local `next dev` does not run this function — see the form's stub
 * note below.
 *
 * To export signups later:
 *   wrangler kv:key list --namespace-id <ID>
 */

interface Env {
  WAITLIST: KVNamespace
}

type Stored = {
  email: string
  capturedAt: string
  ua: string | null
  ip: string | null
  referer: string | null
  country: string | null
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json',
      'cache-control': 'no-store',
    },
  })

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  if (!env.WAITLIST) {
    return json(
      { ok: false, error: 'Server misconfigured: WAITLIST binding missing.' },
      500
    )
  }

  let body: { email?: unknown }
  try {
    body = await request.json()
  } catch {
    return json({ ok: false, error: 'Invalid request body.' }, 400)
  }

  const raw = typeof body.email === 'string' ? body.email : ''
  const email = raw.trim().toLowerCase()

  if (!EMAIL_RE.test(email) || email.length > 254) {
    return json({ ok: false, error: 'Please enter a valid email.' }, 400)
  }

  const existing = await env.WAITLIST.get(email)
  if (existing) {
    return json({ ok: true, alreadyOnList: true })
  }

  const record: Stored = {
    email,
    capturedAt: new Date().toISOString(),
    ua: request.headers.get('user-agent'),
    ip: request.headers.get('cf-connecting-ip'),
    referer: request.headers.get('referer'),
    country: request.cf?.country ? String(request.cf.country) : null,
  }

  await env.WAITLIST.put(email, JSON.stringify(record))

  return json({ ok: true, alreadyOnList: false })
}

export const onRequest: PagesFunction = async () =>
  json({ ok: false, error: 'Method not allowed.' }, 405)
