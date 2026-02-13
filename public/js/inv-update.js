document.querySelectorAll("form").forEach(form => {
  form.addEventListener("input", () => {
    const btn = form.querySelector("button")
    btn.removeAttribute("disabled")
  })
})