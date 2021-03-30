'use strict';

const headerToggleButtonElement = document.querySelector('.header__toggle-button');
const headerNavWrapperElement = document.querySelector('.header__nav-wrapper');
const priceTabButtonElement = document.querySelectorAll('.price__tab-button');
const priceTabCardsElements = document.querySelectorAll('.price__tab-card');
const priceButtonsTextElements = document.querySelectorAll('.price__button-text');
const priceModalWrapperElement = document.querySelector('.price__modal-wrapper');
const priceBuyLinksElements = document.querySelectorAll('.price__buy-link');
const priceModalCloseElement = document.querySelector('.price__modal-close');
const modalWrapperElement = document.querySelector('.modal-wrapper');
const modalButtonCloseElement = document.querySelector('.modal__button-close');
const priceFormElement = document.querySelector('.price__form');
const priceModalPhoneElement = document.querySelector('.price__modal-phone');
const priceModalEmailElement = document.querySelector('.price__modal-email');
const feedbackFormElement = document.querySelector('.feedback__form');
const feedbackPhoneElement = document.querySelector('.feedback__phone');
const feedbackEmailElement = document.querySelector('.feedback__email');

const ESCAPE_KEY_CODE = 27;
let storagePhone = '';
let storageEmail = '';

document.querySelector('.header').classList.remove('header--nojs');
headerNavWrapperElement.classList.remove('header__nav-wrapper--open');

headerToggleButtonElement.addEventListener('click', () => {
  if (headerNavWrapperElement.classList.contains('header__nav-wrapper--open')) {
    headerNavWrapperElement.classList.remove('header__nav-wrapper--open');
    headerNavWrapperElement.classList.remove('header__nav-wrapper--js');
  } else {
    headerNavWrapperElement.classList.add('header__nav-wrapper--open');
    headerNavWrapperElement.classList.add('header__nav-wrapper--js');
  }
});

for (let i = 0; i < priceTabButtonElement.length; i++) {
  priceTabButtonElement[i].addEventListener('click', () => {
    priceTabCardsElements.forEach(element => {
      element.classList.remove('price__card-show');
    });

    priceButtonsTextElements.forEach(element => {
      element.classList.remove('price__button-text--active');
    });

    priceTabCardsElements[i].classList.add('price__card-show');
    priceTabButtonElement[i].childNodes[1].classList.add('price__button-text--active');
  });
}

try {
  storagePhone = localStorage.getItem('phone');
} catch (err) {
  /*  */
}

try {
  storageEmail = localStorage.getItem('email');
} catch (err) {
  /*  */
}

for (let i = 0; i < priceBuyLinksElements.length; i++) {
  priceBuyLinksElements[i].addEventListener('click', (evt) => {
    evt.preventDefault();
    priceModalWrapperElement.classList.add('price__modal-wrapper--open');

    if (storagePhone && !storageEmail) {
      priceModalPhoneElement.value = storagePhone;
      priceModalEmailElement.focus();
    } else if (!storagePhone && storageEmail) {
      priceModalEmailElement.value = storageEmail;
      priceModalPhoneElement.focus();
    } else {
      priceModalPhoneElement.focus();
    }
  });
}

priceModalCloseElement.addEventListener('click', () => {
  priceModalWrapperElement.classList.remove('price__modal-wrapper--open');
});

const validPhone = (name) => {
  let pattern = (/\+[7]\s[0-9]{10}/);
  return pattern.test(name);
};

const validEmail = (email) => {
  let pattern = (/[^\@]+\@[^\.]+\..+/);
  return pattern.test(email);
};

priceFormElement.addEventListener('submit', (evt) => {
  let phone = validPhone(priceModalPhoneElement.value);
  let email = validEmail(priceModalEmailElement.value);

  if (!phone && !email) {
    evt.preventDefault();
    priceModalPhoneElement.classList.add('price__modal-input--error');
    priceModalEmailElement.classList.add('price__modal-input--error');
    priceModalPhoneElement.nextElementSibling.classList.add('price__error-message--show');
    priceModalEmailElement.nextElementSibling.classList.add('price__error-message--show');
  } else if (phone && !email) {
    evt.preventDefault();
    priceModalPhoneElement.classList.remove('price__modal-input--error');
    priceModalEmailElement.classList.remove('price__modal-input--error');
    priceModalPhoneElement.nextElementSibling.classList.remove('price__error-message--show');
    priceModalEmailElement.nextElementSibling.classList.remove('price__error-message--show');
    localStorage.setItem('phone', priceModalPhoneElement.value);
    priceModalPhoneElement.value = '';
    priceModalEmailElement.value = '';
    priceModalWrapperElement.classList.remove('price__modal-wrapper--open');
    modalWrapperElement.classList.add('modal-wrapper--open');
  } else if (!phone && email) {
    evt.preventDefault();
    localStorage.setItem('email', priceModalEmailElement.value);
    priceModalPhoneElement.classList.add('price__modal-input--error');
    priceModalPhoneElement.nextElementSibling.classList.add('price__error-message--show');
  } else {
    evt.preventDefault();
    priceModalPhoneElement.classList.remove('price__modal-input--error');
    priceModalEmailElement.classList.remove('price__modal-input--error');
    priceModalPhoneElement.nextElementSibling.classList.remove('price__error-message--show');
    priceModalEmailElement.nextElementSibling.classList.remove('price__error-message--show');
    localStorage.setItem('phone', priceModalPhoneElement.value);
    localStorage.setItem('email', priceModalEmailElement.value);
    priceModalPhoneElement.value = '';
    priceModalEmailElement.value = '';
    priceModalWrapperElement.classList.remove('price__modal-wrapper--open');
    modalWrapperElement.classList.add('modal-wrapper--open');
  }
});

feedbackFormElement.addEventListener('submit', (evt) => {
  let phone = validPhone(feedbackPhoneElement.value);
  let email = validEmail(feedbackEmailElement.value);

  if (!phone && !email) {
    evt.preventDefault();
    feedbackPhoneElement.classList.add('feedback__input--error');
    feedbackEmailElement.classList.add('feedback__input--error');
    feedbackPhoneElement.nextElementSibling.classList.add('feedback__error-message--show');
    feedbackEmailElement.nextElementSibling.classList.add('feedback__error-message--show');
  } else if (phone && !email) {
    evt.preventDefault();
    feedbackPhoneElement.classList.remove('feedback__input--error');
    feedbackEmailElement.classList.remove('feedback__input--error');
    feedbackPhoneElement.nextElementSibling.classList.remove('feedback__error-message--show');
    feedbackEmailElement.nextElementSibling.classList.remove('feedback__error-message--show');
    feedbackPhoneElement.value = '';
    feedbackEmailElement.value = '';
    modalWrapperElement.classList.add('modal-wrapper--open');
  } else if (!phone && email) {
    evt.preventDefault();
    feedbackPhoneElement.classList.add('feedback__input--error');
    feedbackPhoneElement.nextElementSibling.classList.add('feedback__error-message--show');
  } else {
    evt.preventDefault();
    feedbackPhoneElement.classList.remove('feedback__input--error');
    feedbackEmailElement.classList.remove('feedback__input--error');
    feedbackPhoneElement.nextElementSibling.classList.remove('feedback__error-message--show');
    feedbackEmailElement.nextElementSibling.classList.remove('feedback__error-message--show');
    feedbackPhoneElement.value = '';
    feedbackEmailElement.value = '';
    modalWrapperElement.classList.add('modal-wrapper--open');
  }
});

modalButtonCloseElement.addEventListener('click', () => {
  modalWrapperElement.classList.remove('modal-wrapper--open');
});

window.addEventListener('keydown', (evt) => {
  if (evt.keyCode === ESCAPE_KEY_CODE) {
    priceModalWrapperElement.classList.remove('price__modal-wrapper--open');
    modalWrapperElement.classList.remove('modal-wrapper--open');
  }
});

window.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('price__modal-wrapper') || evt.target.classList.contains('modal-wrapper')) {
    priceModalWrapperElement.classList.remove('price__modal-wrapper--open');
    modalWrapperElement.classList.remove('modal-wrapper--open');
  }
});
