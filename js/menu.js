const nav = document.querySelector("#menuNav");
const navLinks = document.querySelectorAll(".menu-nav-link");
const sections = document.querySelectorAll(".menu-category");

function setActiveLink(id) {
  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${id}`;
    link.classList.toggle("active", isActive);

    if (isActive) {
      link.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setActiveLink(entry.target.id);
      }
    });
  },
  {
    root: null,
    threshold: 0.4,
    rootMargin: "-80px 0px -45% 0px",
  }
);

sections.forEach((section) => observer.observe(section));

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const id = link.getAttribute("href").replace("#", "");
    setActiveLink(id);
  });
});

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