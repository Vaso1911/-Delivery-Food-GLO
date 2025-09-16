// import {loadRestaurants} from './restaurant.js'
function init() {
    const isRestaurantPage = window.location.pathname.includes('restaurant.html')
    const cards = document.querySelectorAll('.card-link');
  function initCards() {

    if (!cards.length) return;

    cards.forEach(card => {
      card.addEventListener('click', handleCardClick);
    });
  }

  function handleCardClick(e) {
    e.preventDefault();

    const title = this.querySelector('.card__title')?.textContent?.trim() ||
      this.dataset.title ||
      'Какой-то Ресторан';

    try {
      localStorage.setItem('restaurantTitle', title);
      window.location.href = 'restaurant.html';
    } catch (error) {
      console.error('Ошибка при переходе:', error);
    }
  }

  function initRestaurantPage() {
    let title = 'Ресторан';

    try {
      title = localStorage.getItem('restaurantTitle') || title;
      localStorage.removeItem('restaurantTitle');
    } catch (error) {
      console.error('error', error);
    }

    const titleElement = document.querySelector('.title-section');
    if (titleElement) {
      titleElement.textContent = title;
    
      if (isRestaurantPage) {
        document.title = `Delivery Food GLO ${title}`;
      }
    }

  }
  initCards()
  initRestaurantPage()

  // модалка 
  const cart = document.querySelector('.header__cart');
  const modalOverlay = document.querySelector('.modal-overlay');

  function handleEscapeKey(e) {
    if (e.code === 'Escape') {
      closeModal();
    }
  }

  function handleCloseClick(e) {
    const btnClose = e.target.closest('.modal__close');
    const btnCancel = e.target.closest('#btn-cancel');
    const modal = e.target.closest('.modal');

    if (btnClose || btnCancel || !modal) {
      closeModal();
    }
  }

  function openModal() {
    modalOverlay.classList.add('modal-visible')
    document.addEventListener('keydown', handleEscapeKey);
  }

  function closeModal() {
    modalOverlay.classList.remove('modal-visible');
    document.removeEventListener('keydown', handleEscapeKey);
  }

  cart.addEventListener('click', openModal);
  modalOverlay.addEventListener('click', handleCloseClick);

// загрузка ресторанов и карточек

}



document.addEventListener('DOMContentLoaded', init);
