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

const ALLERGENS = {
  A: "Glutenhaltiges Getreide",
  B: "Krebstiere",
  C: "Eier",
  D: "Fische",
  E: "Erdnüsse",
  F: "Sojabohnen",
  G: "Milch inkl. Laktose",
  H: "Schalenfrüchte (Nüsse)",
  I: "Sellerie",
  J: "Senf",
  K: "Sesamsamen",
  L: "Schwefeldioxid und Sulfite",
  M: "Lupinen",
  N: "Weichtiere",
};

document.addEventListener("click", (event) => {
  const btn = event.target.closest(".allergen-btn");
  const openedTooltip = document.querySelector(".allergen-tooltip");
  const activeBtn = document.querySelector(".allergen-btn.is-active");

  if (!btn) {
    openedTooltip?.remove();
    activeBtn?.classList.remove("is-active");
    return;
  }

  if (btn.classList.contains("is-active")) {
    openedTooltip?.remove();
    btn.classList.remove("is-active");
    return;
  }

  openedTooltip?.remove();
  activeBtn?.classList.remove("is-active");

  const letters = btn.dataset.allergens
    .split(",")
    .map((letter) => letter.trim())
    .filter(Boolean);

  const tooltip = document.createElement("div");
  tooltip.className = "allergen-tooltip";

  tooltip.innerHTML = letters
    .map(
      (letter) => `
        <p>
          <strong>${letter}</strong>
          <span>– ${ALLERGENS[letter] || "Unbekannter Allergen"}</span>
        </p>
      `
    )
    .join("");

  btn.classList.add("is-active");
  btn.parentElement.appendChild(tooltip);
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
        img: button.dataset.img2x || button.dataset.img,
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