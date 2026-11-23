export function Section({
  id,
  title,
  note,
  children,
}: {
  id: string;
  title: string;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-6 border-t border-line">
      <div className="mx-auto max-w-5xl px-5 py-16 md:px-8 md:py-20">
        <div className="mb-10 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <h2 className="font-mono text-2xl font-bold tracking-tight md:text-3xl">{title}</h2>
          {note && <p className="font-mono text-sm text-dim">{note}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}
