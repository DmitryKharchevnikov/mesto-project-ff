import "../index.css";
import { createCard, comeLikeCard, comeDeleteCard } from "./card.js";
import { initialCards } from "./cards.js";
import { openModal, closeModal, closeModalByClick } from "./modal.js";

const cardList = document.querySelector(".places__list");
const CardModal = document.querySelector(".popup_type_new-card");
const CardForm = CardModal.querySelector(".popup__form");
const ProfileBtn = document.querySelector(".profile__add-button");
const ProfileModal = document.querySelector(".popup_type_edit");
const ProfileForm = ProfileModal.querySelector(".popup__form");
const ProfileEditBtn = document.querySelector(".profile__edit-button");
const modalCloseBtn = document.querySelectorAll(".popup__close");
const nameInput = document.querySelector(".popup__input_type_name");
const descInput = document.querySelector(".popup__input_type_description");
const profileTitle = document.querySelector(".profile__title");
const descProfile = document.querySelector(".profile__description");
const popupImage = document.querySelector(".popup_type_image");
const imgPopupImage = popupImage.querySelector(".popup__image");
const popupCaption = popupImage.querySelector(".popup__caption");
const inputName = CardForm.querySelector(".popup__input_type_card-name");
const inputUrl = CardForm.querySelector(".popup__input_type_url");

ProfileBtn.addEventListener("click", function () {
  openModal(CardModal);
});

ProfileEditBtn.addEventListener("click", function () {
  openModal(ProfileModal);
});

modalCloseBtn.forEach(function (button) {
  button.addEventListener("click", function () {
    closeModal(button.closest(".popup"));
  });
});

[CardModal, ProfileModal, popupImage].forEach((modal) => {
  modal.addEventListener("mousedown", function (event) {
    closeModalByClick(event, modal);
  });
});

ProfileForm.addEventListener("submit", profileFormSubmit);

initialCards.forEach(function (cardInfo) {
  const eachElement = createCard(
    cardInfo,
    comeDeleteCard,
    comeLikeCard,
    openImageModal
  );
  cardList.append(eachElement);
});

fillProfileInputs();

function profileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  descProfile.textContent = descInput.value;
  closeModal(ProfileModal);
}

function fillProfileInputs() {
  nameInput.value = profileTitle.textContent;
  descInput.value = descProfile.textContent;
}

function openImageModal(cardInfo) {
  imgPopupImage.src = cardInfo.link;
  imgPopupImage.alt = cardInfo.name;
  popupCaption.textContent = cardInfo.name;
  openModal(popupImage);
}

CardForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const cardInfo = {
    name: inputName.value,
    link: inputUrl.value,
  };
  const eachElement = createCard(
    cardInfo,
    comeDeleteCard,
    comeLikeCard,
    openImageModal
  );
  CardForm.reset();
  closeModal(CardModal);
  cardList.prepend(eachElement);
});

// В файле index.js должны остаться:
// объявления и инициализация глобальных констант и переменных с DOM-элементами страницы,
// обработчики событий (при открытии и закрытии попапов; при отправке форм; обработчик, открывающий попап при клике по изображению карточки);
// вызовы других функций, подключённых из созданных модулей, которым нужно будет передавать объявленные здесь переменные и обработчики.

// Чтобы было чуточку понятнее: вызов функции создания карточки должен находиться в файле index.js, но само объявление функции — в card.js.
//  Используйте директивы export/import.

// Код разделен на модули:
// в файле card.js описаны функции для работы с карточками: функция создания карточки, функции-обработчики событий удаления и лайка карточки;
// в файле cards.js описан массив карточек, отображаемых на странице;
// в файле modal.js описаны функции для работы с модальными окнами: функция открытия модального окна, функция закрытия модального окна,
// функция-обработчик события нажатия Esc и функция-обработчик события клика по оверлею;
// в файле index.js описана инициализация приложения и основная логика страницы: поиск DOM-элементов на странице и навешивание на них
//  обработчиков событий; обработчики отправки форм, функция-обработчик события открытия модального окна для редактирования профиля;
//  функция открытия модального окна изображения карточки. Также в index.js находится код, который отвечает за отображение шести карточек
//  при открытии страницы.
