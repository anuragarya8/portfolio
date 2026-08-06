export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  titleId,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  titleId?: string;
}) {
  return (
    <div className={className ? `max-w-2xl ${className}` : "max-w-2xl"}>
      {eyebrow ? (
        <p
          data-reveal="eyebrow"
          className="mb-3 text-sm font-medium tracking-wide text-accent"
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        id={titleId}
        data-reveal="heading"
        className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
      >
        {title}
      </h2>
      {description ? (
        <p
          data-reveal="description"
          className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
