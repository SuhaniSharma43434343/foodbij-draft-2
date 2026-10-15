/** Renders copy, marking any [NEEDS CLIENT: ...] placeholder so reviewers can spot it. */
export function Txt({ children }: { children: string }) {
  const parts = children.split(/(\[NEEDS CLIENT:[^\]]*\])/g);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith("[NEEDS CLIENT") ? (
          <span key={i} className="needs-client">
            {p}
          </span>
        ) : (
          p
        ),
      )}
    </>
  );
}
