export function selectElement(id, valueToSelect) {
  if (document !== undefined) {
    let element = document.getElementById(id);
    if (element) {
      element.value = valueToSelect;
    }
  }
}

export function isInputFocused() {
  return document.activeElement.tagName.toLowerCase() === "input";
}
