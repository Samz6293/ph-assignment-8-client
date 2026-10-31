// the same heading on every home section (assignment: headings must look consistent)
// left: align to the left instead of the center (used when there's a link beside it)
export default function SectionHeading({ eyebrow, title, description, left }:
    { eyebrow: string, title: string, description?: string, left?: boolean }) {
    return (
        <div className={`flex flex-col gap-3 max-w-2xl ${left ? "items-start text-left" : "items-center mx-auto text-center"}`}>
            <p className="eyebrow text-link">{eyebrow}</p>
            <h2 className="h-section">{title}</h2>
            {description && <p className="lead text-muted-foreground">{description}</p>}
        </div>
    )
}
