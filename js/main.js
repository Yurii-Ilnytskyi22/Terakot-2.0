document.addEventListener('DOMContentLoaded', () => {
  const burgerBtn = document.getElementById('burgerBtn');
  const closeBtn = document.getElementById('closeBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  // Відкриття
  burgerBtn.addEventListener('click', () => {
    mobileMenu.classList.add('is-open');
    document.body.style.overflow = 'hidden'; // Щоб сторінка не скролилась під меню
  });

  // Закриття
  closeBtn.addEventListener('click', () => {
    mobileMenu.classList.remove('is-open');
    document.body.style.overflow = ''; 
  });

  // Закриття при кліку на посилання
  const menuLinks = document.querySelectorAll('.mobile-nav a');
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('is-open');
      document.body.style.overflow = '';
    });
  });
});

const homeFavoritesBtn = document.querySelector("#homeFavoritesBtn");
const favorites = JSON.parse(localStorage.getItem("terakotFavorites")) || [];

if (homeFavoritesBtn) {
  homeFavoritesBtn.classList.toggle("is-visible", favorites.length > 0);
}