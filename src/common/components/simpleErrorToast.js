export function showSimpleErrorToast(message) {
  const el = document.createElement("div");
  el.textContent = message;
  el.style.position = "fixed";
  el.style.top = "20px";
  el.style.right = "20px";
  el.style.padding = "10px 20px";
  el.style.background = "rgba(255,0,0,0.8)";
  el.style.color = "#fff";
  el.style.borderRadius = "5px";
  el.style.zIndex = "9999";
  el.style.fontFamily = "sans-serif";
  document.body.appendChild(el);

  setTimeout(() => {
    el.remove();
  }, 3000);
}
