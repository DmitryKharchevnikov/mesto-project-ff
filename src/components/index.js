import "../index.css";
import { createCard, comeLikeCard } from "./card.js";
import { openModal, closeModal, closeModalByClick } from "./modal.js";
import { enableValidation, clearValidation } from "./validation.js";
import {
  userId,
  fetchUserData,
  fetchCards,
  updateUserData,
  fetchAddСardToServer,
  updateAvatar,
  fetchDeleteCardFromServer,
} from "./api.js";

const cardList = document.querySelector(".places__list");
const cardModal = document.querySelector(".popup_type_new-card");
const cardForm = cardModal.querySelector(".popup__form");
const popupOpenBtn = document.querySelector(".profile__add-button");
const profileModal = document.querySelector(".popup_type_edit");
const profileForm = profileModal.querySelector(".popup__form");
const profileEditBtn = document.querySelector(".profile__edit-button");
const modalCloseBtn = document.querySelectorAll(".popup__close");
const nameInput = document.querySelector(".popup__input_type_name");
const descInput = document.querySelector(".popup__input_type_description");
const profileTitle = document.querySelector(".profile__title");
const descProfile = document.querySelector(".profile__description");
const popupImage = document.querySelector(".popup_type_image");
const imgPopupImage = popupImage.querySelector(".popup__image");
const popupCaption = popupImage.querySelector(".popup__caption");
const inputName = cardForm.querySelector(".popup__input_type_card-name");
const inputUrl = cardForm.querySelector(".popup__input_type_url");
const allModals = document.querySelectorAll(".popup");
const editProfileAvatarModal = document.querySelector(
  ".popup_type_edit_avatar"
);
const editProfileAvatarForm =
  editProfileAvatarModal.querySelector(".popup__form");
const editProfileAvatarImage = document.querySelector(".profile__image");
const profileAvatarinput = editProfileAvatarForm.querySelector(
  ".popup__input_type_profile-url"
);
const deleteCardModal = document.querySelector(".popup_type_card-remove");
const deleteCardForm = deleteCardModal.querySelector(".popup__form");
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

deleteCardForm.addEventListener("submit", () => {
  const id = deleteCardForm.getAttribute("id");
  fetchDeleteCardFromServer(id)
    .then(() => {
      document.getElementById(id).remove();
    })
    .catch((err) => console.log(err))
    .finally(() => closeModal(deleteCardModal));
});

popupOpenBtn.addEventListener("click", function () {
  const formElement = cardModal.querySelector(validationConfig.formSelector);
  clearValidation(formElement, validationConfig);
  cardForm.reset();
  openModal(cardModal);
});

profileEditBtn.addEventListener("click", function () {
  const formElement = profileModal.querySelector(validationConfig.formSelector);
  clearValidation(formElement, validationConfig);
  openModal(profileModal);
  fillProfileInputs();
});

modalCloseBtn.forEach(function (button) {
  button.addEventListener("click", function () {
    closeModal(button.closest(".popup"));
  });
});

editProfileAvatarForm.addEventListener("submit", updateProfileAvatarSubmit);

profileForm.addEventListener("submit", profileFormSubmit);

[cardModal, profileModal, popupImage].forEach((modal) => {
  modal.addEventListener("mousedown", function (event) {
    closeModalByClick(event, modal);
  });
});

profileTitle.addEventListener("click", () => {
  openModal(deleteCardModal);
});

fillProfileInputs();

enableValidation(validationConfig);

modalCloseBtn.forEach((button) => {
  button.addEventListener("click", () => {
    closeModal(button.closest(".popup"));
  });
});

allModals.forEach((modal) => {
  modal.addEventListener("mousedown", (event) => {
    closeModalByClick(event, modal);
  });
});

function openCardRemovalConfirmationModal(id) {
  openModal(deleteCardModal);
  deleteCardForm.setAttribute("id", id);
}

function profileFormSubmit(evt) {
  evt.preventDefault();
  addPreloader(evt);
  updateUserData(nameInput.value, descInput.value)
    .then((res) => {
      profileTitle.textContent = res.name;
      descInput.textContent = res.about;
    })
    .catch((err) => console.log(err))
    .finally(() => {
      removePreloader(evt);
      closeModal(profileModal);
    });
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

function renderUserData(userInfo) {
  profileTitle.textContent = userInfo.name;
  descProfile.textContent = userInfo.about;
  profileForm.elements["name-input"].value = userInfo.name;
  profileForm.elements["description-input"].value = userInfo.about;
  editProfileAvatarImage.style[
    "background-image"
  ] = `url('${userInfo.avatar}')`;
}

function addInitialCards(cards) {
  cards.forEach((cardInfo) => {
    const eachElement = createCard(
      cardInfo,
      openCardRemovalConfirmationModal,
      comeLikeCard,
      openImageModal,
      userId
    );
    cardList.append(eachElement);
  });
}

cardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const formElement = cardModal.querySelector(validationConfig.formSelector);
  const cardData = {
    name: inputName.value,
    link: inputUrl.value,
    owner: {
      _id: userId,
    },
  };
  addPreloader(evt);
  fetchAddСardToServer(inputName.value, inputUrl.value)
    .then((cardData) => {
      const eachElement = createCard(
        cardData,
        openCardRemovalConfirmationModal,
        comeLikeCard,
        openImageModal,
        userId
      );
      cardList.prepend(eachElement);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      removePreloader(evt);
      closeModal(cardModal);
      clearValidation(formElement, validationConfig);
      cardForm.reset();
    });
});

editProfileAvatarImage.addEventListener("click", () => {
  const formElement = editProfileAvatarModal.querySelector(
    validationConfig.formSelector
  );
  clearValidation(formElement, validationConfig);
  editProfileAvatarForm.reset();
  openModal(editProfileAvatarModal);
});

function updateProfileAvatarSubmit(evt) {
  evt.preventDefault();
  const formElement = editProfileAvatarModal.querySelector(
    validationConfig.formSelector
  );
  const url = profileAvatarinput.value;
  addPreloader(evt);
  updateAvatar(url)
    .then((res) => {
      const profilePictureUrl = res.avatar;
      editProfileAvatarImage.style[
        "background-image"
      ] = `url('${profilePictureUrl}')`;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      removePreloader(evt);
      closeModal(editProfileAvatarModal);
      clearValidation(formElement, validationConfig);
      editProfileAvatarForm.reset();
    });
}

function addPreloader(evt) {
  evt.submitter.textContent = "Сохранение...";
}

function removePreloader(evt) {
  evt.submitter.textContent = "Сохранить";
}

const promises = [fetchUserData(), fetchCards()];
Promise.all(promises)
  .then(([userInfo, cards]) => {
    renderUserData(userInfo);
    addInitialCards(cards);
  })
  .catch((err) => console.log(err));
