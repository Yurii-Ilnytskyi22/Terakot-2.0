const FAVORITES_KEY = "terakotFavorites";
const favoritesList = document.querySelector("#favoritesList");

function getFavorites() {
  try {
    const favorites = JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];

    return favorites.filter((item) => item && item.id);
  } catch {
    return [];
  }
}

function saveFavorites(favorites) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

function redirectToMenuIfEmpty(favorites) {
  if (favorites.length === 0) {
    localStorage.removeItem(FAVORITES_KEY);
    window.location.replace("./menu.html");
  }
}

function renderFavorites() {
  const favorites = getFavorites();

  saveFavorites(favorites);
  redirectToMenuIfEmpty(favorites);

  favoritesList.innerHTML = "";

  favorites.forEach((item) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <article class="favorite-card">
        <div class="favorite-info">
          <h3 class="favorite-title">${item.title}</h3>

          ${item.description ? `<p class="favorite-description">${item.description}</p>` : ""}

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

  document.querySelectorAll(".favorite-remove").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.id;
      const updatedFavorites = getFavorites().filter((item) => item.id !== id);

      saveFavorites(updatedFavorites);
      redirectToMenuIfEmpty(updatedFavorites);
      renderFavorites();
    });
  });
}

renderFavorites();