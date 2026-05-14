document.addEventListener("DOMContentLoaded", () => {
  const burgerBtn = document.querySelector("#burgerBtn");
  const closeBtn = document.querySelector("#closeBtn");
  const mobileMenu = document.querySelector("#mobileMenu");

  const homeFavoritesBtn = document.querySelector("#homeFavoritesBtn");
  const mobileFavoritesBar = document.querySelector("#mobileFavoritesBar");
  const mobileFavoritesCount = document.querySelector("#mobileFavoritesCount");

  function getFavoritesCount() {
    const favorites = JSON.parse(localStorage.getItem("terakotFavorites")) || [];
    return favorites.length;
  }

  function updateFavoritesButtons() {
    const count = getFavoritesCount();
    const hasFavorites = count > 0;
    const menuIsOpen = mobileMenu.classList.contains("is-open");

    if (homeFavoritesBtn) {
      homeFavoritesBtn.classList.toggle("is-visible", hasFavorites && !menuIsOpen);
    }

    if (mobileFavoritesBar) {
      mobileFavoritesBar.classList.toggle("is-visible", hasFavorites);
    }

    if (mobileFavoritesCount) {
      mobileFavoritesCount.textContent = `${count}. Option ausgewählt`;
    }
  }

  burgerBtn.addEventListener("click", () => {
    mobileMenu.classList.add("is-open");
    document.body.style.overflow = "hidden";
    updateFavoritesButtons();
  });

  closeBtn.addEventListener("click", () => {
    mobileMenu.classList.remove("is-open");
    document.body.style.overflow = "";
    updateFavoritesButtons();
  });

  const menuLinks = document.querySelectorAll(".mobile-nav a");

  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("is-open");
      document.body.style.overflow = "";
      updateFavoritesButtons();
    });
  });

  updateFavoritesButtons();
});