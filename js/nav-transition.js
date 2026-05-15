document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".desktop-nav-link");

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");

      if (!href || link.classList.contains("is-active")) return;

      event.preventDefault();

      navLinks.forEach((item) => {
        item.classList.remove("is-active", "is-changing");
      });

      link.classList.add("is-changing");

      setTimeout(() => {
        window.location.href = href;
      }, 280);
    });
  });
});