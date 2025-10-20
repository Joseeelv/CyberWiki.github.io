function copyToClipboard(event) {
  const button = event.currentTarget;
  const codeContainer = button.closest(".code-container");
  if (!codeContainer) return;

  const preElement = codeContainer.querySelector("pre");
  if (!preElement) return;

  const code = preElement.innerText.trim();

  if (typeof navigator !== "undefined" && navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
    // Clipboard API segura
    navigator.clipboard.writeText(code).then(() => showCopied(button))
      .catch(err => {
        console.error("Clipboard write failed:", err);
        fallbackCopy(code, button);
      });
  } else {
    // Fallback antiguo
    fallbackCopy(code, button);
  }
}

function fallbackCopy(code, button) {
  const textarea = document.createElement("textarea");
  textarea.value = code;
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand("copy");
    showCopied(button);
  } catch (err) {
    console.error("Copy fallback failed:", err);
  }
  document.body.removeChild(textarea);
}

function showCopied(button) {
  button.textContent = "Copied!";
  button.classList.add("copied");
  setTimeout(() => {
    button.textContent = "Copy";
    button.classList.remove("copied");
  }, 2000);
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".copy-button").forEach(button => {
    button.addEventListener("click", copyToClipboard);
  });
});
