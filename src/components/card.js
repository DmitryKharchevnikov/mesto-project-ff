// Функции для работы с карточками проекта Mesto вынесите в файл card.js, из него должна экспортироваться функция createCard,
// которую вы создали раньше (у вас она может называться по-другому). Функции, обрабатывающие события лайка и удаления карточки,
// также должны находиться в этом файле и экспортироваться из него.

export function createCard(cardInfo, cardDelete, cardLike, openImage) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const cardDeleteBtn = cardElement.querySelector(".card__delete-button");
  const cardLikeBtn = cardElement.querySelector(".card__like-button");

  cardDeleteBtn.addEventListener("click", cardDelete);
  cardLikeBtn.addEventListener("click", cardLike);

  cardElement.querySelector(".card__image").src = cardInfo.link;
  cardElement.querySelector(".card__title").textContent = cardInfo.name;
  cardElement
    .querySelector(".card__image")
    .addEventListener("click", function () {
      openImage(cardInfo);
    });

  return cardElement;
}

export function comeLikeCard(event) {
  if (event.target.classList.contains("card__like-button")) {
    event.target.classList.toggle("card__like-button_is-active");
  }
}

export function comeDeleteCard(event) {
  event.target.closest(".places__item").remove();
}
