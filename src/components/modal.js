// Работу модальных окон — в файл modal.js. Оттуда экспортируйте функции openModal и closeModal, принимающие в качестве аргумента
// DOM-элемент модального окна, с которым нужно произвести действие.

export function openModal(modal) {
  modal.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeModalByEsc);
}

export function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeModalByEsc);
}

export function closeModalByClick(event, popup) {
  if (event.target.classList.contains("popup")) {
    closeModal(popup);
  }
}

export function closeModalByEsc(evt) {
  if (evt.key) {
    if (evt.key.toLowerCase() === "escape") {
      const popupOpened = document.querySelector(".popup_is-opened");
      closeModal(popupOpened);
    }
  }
}
