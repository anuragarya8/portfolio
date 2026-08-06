/**
 * Custom line splitter — no Club SplitText license required.
 * Wraps each visual line in a .split-line > .split-line-inner structure.
 */
export function splitLines(element: HTMLElement): HTMLElement[] {
  const text = element.textContent?.trim() ?? "";
  if (!text) return [];

  const words = text.split(/\s+/);
  element.setAttribute("aria-label", text);
  element.innerHTML = "";
  element.classList.add("split-parent");

  const wordSpans: HTMLSpanElement[] = [];
  words.forEach((word, i) => {
    const span = document.createElement("span");
    span.className = "split-word";
    span.style.display = "inline-block";
    span.textContent = word;
    element.appendChild(span);
    wordSpans.push(span);
    if (i < words.length - 1) {
      element.appendChild(document.createTextNode(" "));
    }
  });

  const lines: HTMLElement[][] = [];
  let currentTop: number | null = null;
  let currentLine: HTMLElement[] = [];

  wordSpans.forEach((word) => {
    const top = word.offsetTop;
    if (currentTop === null || Math.abs(top - currentTop) > 2) {
      if (currentLine.length) lines.push(currentLine);
      currentLine = [word];
      currentTop = top;
    } else {
      currentLine.push(word);
    }
  });
  if (currentLine.length) lines.push(currentLine);

  element.innerHTML = "";
  const lineElements: HTMLElement[] = [];

  lines.forEach((lineWords) => {
    const line = document.createElement("span");
    line.className = "split-line";
    line.style.display = "block";
    line.style.overflow = "hidden";
    line.setAttribute("aria-hidden", "true");

    const inner = document.createElement("span");
    inner.className = "split-line-inner";
    inner.style.display = "block";
    inner.style.transformOrigin = "left center";

    lineWords.forEach((word, i) => {
      const w = document.createElement("span");
      w.className = "split-word";
      w.style.display = "inline-block";
      w.textContent = word.textContent;
      inner.appendChild(w);
      if (i < lineWords.length - 1) {
        inner.appendChild(document.createTextNode(" "));
      }
    });

    line.appendChild(inner);
    element.appendChild(line);
    lineElements.push(inner);
  });

  return lineElements;
}

export function revertSplit(element: HTMLElement) {
  const label = element.getAttribute("aria-label");
  if (label) {
    element.textContent = label;
    element.removeAttribute("aria-label");
  }
  element.classList.remove("split-parent");
}
