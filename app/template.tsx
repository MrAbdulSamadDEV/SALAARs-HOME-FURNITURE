/**
 * Page transition wrapper – fades each route in softly on navigation.
 * Runs on every layout change without re-rendering the header/footer.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="animate-page-in">{children}</div>;
}
