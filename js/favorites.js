const FAVORITES_KEY = "terakotFavorites";

const favoritesList = document.querySelector("#favoritesList");
const favoritesEmpty = document.querySelector("#favoritesEmpty");

function getFavorites() {
  return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
}

function saveFavorites(favorites) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

function renderFavorites() {
  const favorites = getFavorites();

  favoritesList.innerHTML = "";

  favoritesEmpty.classList.toggle("is-visible", favorites.length === 0);

  favorites.forEach((item) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <article class="favorite-card">
        <div class="favorite-info">
          <h3 class="favorite-title">${item.title}</h3>

          ${
            item.description
              ? `<p class="favorite-description">${item.description}</p>`
              : ""
          }

          <div class="favorite-meta">
            <span>${item.weight || ""}</span>
            <span>${item.allergens || ""}</span>
          </div>

          <div class="favorite-bottom">
            <span class="favorite-price">${item.price}</span>

            <button class="favorite-remove" type="button" data-id="${item.id}">
              <svg width="20" height="20">
                <use href="./images/symbol-defs.svg#icon-heart-icon"></use>
              </svg>
            </button>
          </div>
        </div>

        <img class="favorite-img" src="${item.img}" alt="${item.title}" />
      </article>
    `;

    favoritesList.appendChild(li);
  });

  const removeButtons = document.querySelectorAll(".favorite-remove");

  removeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.id;
      const updatedFavorites = getFavorites().filter((item) => item.id !== id);

      saveFavorites(updatedFavorites);
      renderFavorites();
    });
  });
}

renderFavorites();