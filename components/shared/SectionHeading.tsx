// the same heading on every home section (assignment: headings must look consistent)
export default function SectionHeading({ eyebrow, title, description }: { eyebrow: string, title: string, description: string }) {
    return (
        <div className="flex flex-col items-center gap-3 mx-auto text-center max-w-2xl">
            <p className="eyebrow text-link">{eyebrow}</p>
            <h2 className="h-section">{title}</h2>
            <p className="lead text-muted-foreground">{description}</p>
        </div>
    )
}
