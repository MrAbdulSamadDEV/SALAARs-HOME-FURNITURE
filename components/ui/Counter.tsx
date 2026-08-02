/**
 * Static stat display – renders the final value immediately (no count-up
 * animation) for fast, minimal rendering.
 */
export default function Counter({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) {
  return (
    <span>
      {value.toLocaleString()}
      {suffix}
    </span>
  );
}
