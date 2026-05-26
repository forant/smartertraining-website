import { cn } from '@/lib/utils'

/**
 * Article body wrapper. Mimics the spirit of @tailwindcss/typography without
 * pulling in the plugin — keeps the dependency tree unchanged.
 */
export function Prose({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'max-w-none text-[17px] leading-[1.75] text-foreground',
        // headings
        '[&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:scroll-mt-24 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight',
        '[&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:scroll-mt-24 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:tracking-tight',
        // paragraphs and lists
        '[&_p]:my-5',
        '[&_ul]:my-5 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2',
        '[&_ol]:my-5 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2',
        '[&_li>p]:my-0',
        // links
        '[&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:opacity-80',
        // strong / em
        '[&_strong]:font-semibold [&_em]:italic',
        // blockquote
        '[&_blockquote]:my-6 [&_blockquote]:border-l-4 [&_blockquote]:border-border [&_blockquote]:pl-4 [&_blockquote]:text-muted-foreground',
        // code
        '[&_code]:rounded [&_code]:bg-surface-light [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-[0.95em]',
        // lead
        '[&_.lead]:text-lg [&_.lead]:md:text-xl [&_.lead]:text-muted-foreground [&_.lead]:leading-relaxed [&_.lead]:my-6',
        // direct-answer / takeaway boxes
        '[&_.answer-box]:my-6 [&_.answer-box]:rounded-xl [&_.answer-box]:bg-surface-light [&_.answer-box]:p-5 [&_.answer-box]:border [&_.answer-box]:border-border',
        '[&_.answer-box__label]:text-xs [&_.answer-box__label]:font-semibold [&_.answer-box__label]:uppercase [&_.answer-box__label]:tracking-wide [&_.answer-box__label]:text-muted-foreground [&_.answer-box__label]:mb-2',
        '[&_.answer-box_p]:my-0',
        '[&_.takeaway]:my-8 [&_.takeaway]:rounded-xl [&_.takeaway]:border [&_.takeaway]:border-accent/40 [&_.takeaway]:bg-accent/10 [&_.takeaway]:p-5',
        // images
        '[&_img]:my-6 [&_img]:rounded-xl',
        // horizontal rules
        '[&_hr]:my-10 [&_hr]:border-border',
        className
      )}
    >
      {children}
    </div>
  )
}
