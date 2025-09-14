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
    let title = 'Delivery Food GLO';

    try {
      title = localStorage.getItem('restaurantTitle') || title;
      localStorage.removeItem('restaurantTitle');
    } catch (error) {
      console.error('error', error);
    }

    const titleElement = document.querySelector('.title-section');
    if (titleElement) {
      titleElement.textContent = title;
    }
    document.title = `${title} - Наш Ресторан`;
  }
  initCards()
  initRestaurantPage()
}


document.addEventListener('DOMContentLoaded', init);
