export function executeScroll(ref) {
  ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
}
