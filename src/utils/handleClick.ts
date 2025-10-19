export function handleClick(container: HTMLDivElement) {
  container.classList.toggle("what-content-active");
  if (container.parentElement) {
    const siblings = Array.from(container.parentElement.children);
    for (const sibling of siblings) {
      if (sibling !== container)
        sibling.classList.remove("what-content-active");
    }
  }
}
