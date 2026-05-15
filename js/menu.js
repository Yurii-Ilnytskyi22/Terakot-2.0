const nav = document.querySelector("#menuNav");
const navLinks = document.querySelectorAll(".menu-nav-link");
const sections = document.querySelectorAll(".menu-category");

function centerActiveLink(activeLink) {
  if (!nav || !activeLink) return;

  if (window.innerWidth >= 768) return;

  const navRect = nav.getBoundingClientRect();
  const linkRect = activeLink.getBoundingClientRect();

  const navCenter = navRect.width / 2;
  const linkCenter = linkRect.left - navRect.left + linkRect.width / 2;

  nav.scrollTo({
    left: nav.scrollLeft + linkCenter - navCenter,
    behavior: "smooth",
  });
}

function setActiveLink(id) {
  const activeLink = document.querySelector(`.menu-nav-link[href="#${id}"]`);

  if (!activeLink || activeLink.classList.contains("active")) return;

  navLinks.forEach((link) => {
    link.classList.remove("active");
  });

  activeLink.classList.add("active");
  centerActiveLink(activeLink);
}

function updateActiveSectionOnScroll() {
  const headerHeight = window.innerWidth >= 768 ? 150 : 64;
  const checkPoint = window.scrollY + headerHeight + 120;

  let currentSectionId = sections[0].id;

  sections.forEach((section) => {
    if (checkPoint >= section.offsetTop) {
      currentSectionId = section.id;
    }
  });

  setActiveLink(currentSectionId);
}

window.addEventListener("scroll", updateActiveSectionOnScroll);

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    const id = link.getAttribute("href").replace("#", "");
    const section = document.getElementById(id);

    if (!section) return;

    const headerHeight = window.innerWidth >= 768 ? 150 : 64;

    window.scrollTo({
      top: section.offsetTop - headerHeight,
      behavior: "smooth",
    });

    setActiveLink(id);
  });
});

updateActiveSectionOnScroll();

const FAVORITES_KEY = "terakotFavorites";

const favButtons = document.querySelectorAll(".dish-fav");
const favoritesBar = document.querySelector("#favoritesBar");
const favoritesCount = document.querySelector("#favoritesCount");

function getFavorites() {
  return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
}

function saveFavorites(favorites) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

function updateFavoritesBar() {
  const favorites = getFavorites();

  if (!favoritesBar || !favoritesCount) return;

  favoritesBar.classList.toggle("is-visible", favorites.length > 0);
  favoritesCount.textContent = `${favorites.length}. Option ausgewählt`;
}

function syncFavButtons() {
  const favorites = getFavorites();

  favButtons.forEach((button) => {
    const id = button.dataset.id;
    const isActive = favorites.some((item) => item.id === id);

    button.classList.toggle("is-active", isActive);
  });
}

favButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const favorites = getFavorites();
    const id = button.dataset.id;

    const existingItem = favorites.find((item) => item.id === id);

    if (existingItem) {
      const updatedFavorites = favorites.filter((item) => item.id !== id);
      saveFavorites(updatedFavorites);
    } else {
      if (favorites.length >= 16) return;

      favorites.push({
        id,
        title: button.dataset.title,
        price: button.dataset.price,
        img: button.dataset.img,
        weight: button.dataset.weight,
        allergens: button.dataset.allergens,
        description: button.dataset.description,
      });

      saveFavorites(favorites);
    }

    syncFavButtons();
    updateFavoritesBar();
  });
});

syncFavButtons();
updateFavoritesBar();