const CHECK = (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export function TaskCard({
  id,
  title,
  sub,
  done,
  onToggle,
}: {
  id: string | number;
  title: string;
  sub: string;
  done: boolean;
  onToggle?: (id: string | number, next: boolean) => void;
}) {
  return (
    <div
      className={"task-card" + (done ? " done" : "")}
      data-check
      data-task-id={id}
      onClick={() => onToggle?.(id, !done)}
      role="checkbox"
      aria-checked={done}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onToggle?.(id, !done);
        }
      }}
    >
      <span className="tbox">{CHECK}</span>
      <span>
        <b>{title}</b>
        <span>{sub}</span>
      </span>
    </div>
  );
}