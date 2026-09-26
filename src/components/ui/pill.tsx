export function Pill({
  score,
  text,
  plain,
}: {
  score?: number;
  text: string;
  /** bordered (default) vs plain pill */
  plain?: boolean;
}) {
  let cls = "pill-gray";
  if (score != null) cls = score >= 70 ? "pill-green" : "pill-red";
  else if (text === "Tayang") cls = "pill-green-plain";
  else if (text === "Draft") cls = "pill-gray";
  return <span className={"pill" + (plain ? " pill-plain" : " " + cls)}>{text}</span>;
}