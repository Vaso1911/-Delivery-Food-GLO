function init() {
  function initCards() {
    const cards = document.querySelectorAll('.card-link');

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
      const isRestaurantPage = window.location.pathname.includes('restaurant.html')
      if (isRestaurantPage) {
        document.title = `${title} - Наш Ресторан`;
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

  function openModal() {
    modalOverlay.classList.add('modal-visible')
    document.addEventListener('keydown', handleEscapeKey);
  }

  function closeModal(e) {
    const btnClose = e.target.closest('.modal__close');
    const btnCancel = e.target.closest('#btn-cancel');
    const modal = e.target.closest('.modal');
    document.removeEventListener('keydown', handleEscapeKey);

    if (btnClose || btnCancel || !modal) {
      modalOverlay.classList.remove('modal-visible')
    }
  }

  cart.addEventListener('click', openModal);
  modalOverlay.addEventListener('click', closeModal);

}



document.addEventListener('DOMContentLoaded', init);
