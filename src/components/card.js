export function createCard(cardInfo, cardDelete, cardLike, openImage) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const cardDeleteBtn = cardElement.querySelector(".card__delete-button");
  const cardLikeBtn = cardElement.querySelector(".card__like-button");
  const cardLikeCount = cardElement.querySelector(".card__like-count");

  cardDeleteBtn.addEventListener("click", cardDelete);
  cardLikeBtn.addEventListener("click", cardLike);

  cardElement.querySelector(".card__image").src = cardInfo.link;
  cardElement.querySelector(".card__image").alt = cardInfo.name;
  cardElement.querySelector(".card__title").textContent = cardInfo.name;
  cardElement
    .querySelector(".card__image")
    .addEventListener("click", function () {
      openImage(cardInfo);
    });

  const cardId = cardInfo["_id"];
  cardElement.setAttribute("id", cardId);

  let userId;

  const setUserId = (id) => {
  userId = id};

  if (cardInfo.owner["_id"] === userId) {
    cardDeleteBtn.addEventListener("click", () => {
      cardDelete(cardId);
    });
  } else {
    cardDeleteBtn.remove();
  }
  if (cardInfo.likes.some((like) => like._id === userId)) {
    cardLikeBtn.classList.add("card__like-button_is-active");
  }

  cardLikeCount.textContent = cardInfo["likes"] ? cardInfo["likes"].length : 0;
  cardElement.querySelector(".card__image").addEventListener("click", () => {
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
