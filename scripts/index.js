// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const cardList = document.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(cardInfo, cardDelete) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const cardDeleteBtn = cardElement.querySelector(".card__delete-button");

  cardElement.querySelector(".card__image").src = cardInfo.link;
  cardElement.querySelector(".card__title").textContent = cardInfo.name;

  cardDeleteBtn.addEventListener("click", cardDelete);

  return cardElement;
}

// @todo: Функция удаления карточки
function cardDelete(evt) {
  const listItem = evt.target.closest(".places__item");
  listItem.remove();
}
// @todo: Вывести карточки на страницу
initialCards.forEach(function (cardInfo) {
  const eachElement = createCard(cardInfo, cardDelete);
  cardList.append(eachElement);
});
