const app = document.createElement("div");
app.classList.add("app");
document.body.append(app);

const header = document.createElement("header");
header.classList.add("header");
app.append(header);

const newGameButton = document.createElement("button");
newGameButton.classList.add("new-game-button");
newGameButton.type = "button";
newGameButton.textContent = "New Game";
header.append(newGameButton);
newGameButton.addEventListener("click", startNewGame);

const leaderboardButton = document.createElement("button");
leaderboardButton.classList.add("leaderboard-button");
leaderboardButton.type = "button";
leaderboardButton.textContent = "Leaderboard";
header.append(leaderboardButton);

leaderboardButton.addEventListener("click", showLeaderboardModal);

const gameInfo = document.createElement("div");
gameInfo.classList.add("game-info");
app.append(gameInfo);

const movesText = document.createElement("p");
movesText.textContent = "Moves: ";

const movesValue = document.createElement("span");
movesValue.id = "moves";
movesValue.textContent = "0";
movesText.append(movesValue);
gameInfo.append(movesText);

const pairsText = document.createElement("p");
pairsText.textContent = "Pairs: ";

const pairsValue = document.createElement("span");
pairsValue.id = "pairs";
pairsValue.textContent = "0 / 8";

pairsText.append(pairsValue);
gameInfo.append(pairsText);

const gameBoard = document.createElement("div");
gameBoard.classList.add("game-board");
app.append(gameBoard);

const modalOverlay = document.createElement("div");
modalOverlay.classList.add("modal-overlay");

const modal = document.createElement("div");
modal.classList.add("modal");

modalOverlay.append(modal);
document.body.append(modalOverlay);

const cardValues = [
  { name: "cat", image: "./assets/cat.svg" },
  { name: "dog", image: "./assets/dog.svg" },
  { name: "beaver", image: "./assets/beaver.svg" },
  { name: "tiger", image: "./assets/tiger.svg" },
  { name: "rabbit", image: "./assets/rabbit.svg" },
  { name: "camel", image: "./assets/two-hump-camel.svg" },
  { name: "chipmunk", image: "./assets/chipmunk.svg" },
  { name: "giraffe", image: "./assets/giraffe.svg" },
];

function shuffleCards(cards) {
  for (let i = cards.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));

    [cards[i], cards[randomIndex]] = [cards[randomIndex], cards[i]];
  }

  return cards;
}

let firstCard = null;
let secondCard = null;
let moves = 0;
let matchedPairs = 0;
let isBoardLocked = false;
let closeCardsTimeout = null;
let isGameOver = false;
let victoryTimeout = null;

function createCard(cardData) {
  const card = document.createElement("button");
  card.classList.add("card");
  card.type = "button";
  card.dataset.value = cardData.name;

  const cardBack = document.createElement("span");
  cardBack.classList.add("card-back");

  const cardFront = document.createElement("span");
  cardFront.classList.add("card-front");

  const cardImage = document.createElement("img");
  cardImage.src = cardData.image;
  cardImage.alt = cardData.name;

  cardFront.append(cardImage);
  card.append(cardBack, cardFront);

  card.addEventListener("click", () => {
    handleCardClick(card);
  });
  return card;
}

function handleCardClick(card) {
  if (isGameOver) {
    return;
  }

  if (isBoardLocked) {
    return;
  }

  if (card.classList.contains("matched")) {
    return;
  }

  if (card === firstCard) {
    return;
  }

  if (firstCard === null) {
    firstCard = card;
    card.classList.add("flipped");
    return;
  }

  if (secondCard === null) {
    secondCard = card;
    card.classList.add("flipped");

    moves++;
    movesValue.textContent = moves;

    checkForMatch();
  }
}

function checkForMatch() {
  const isMatch = firstCard.dataset.value === secondCard.dataset.value;

  if (isMatch) {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");

    matchedPairs++;
    pairsValue.textContent = `${matchedPairs} / 8`;

    firstCard = null;
    secondCard = null;

    if (matchedPairs === 8) {
      finishGame();
    }

    return;
  }
  isBoardLocked = true;
  closeCardsTimeout = setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");

    firstCard = null;
    secondCard = null;

    isBoardLocked = false;
    closeCardsTimeout = null;
  }, 1000);
}

function startNewGame() {
  if (victoryTimeout !== null) {
    clearTimeout(victoryTimeout);
    victoryTimeout = null;
  }

  if (closeCardsTimeout !== null) {
    clearTimeout(closeCardsTimeout);
    closeCardsTimeout = null;
  }

  firstCard = null;
  secondCard = null;
  moves = 0;
  matchedPairs = 0;
  isBoardLocked = false;
  isGameOver = false;

  movesValue.textContent = "0";
  pairsValue.textContent = "0 / 8";

  renderCards();
}

function renderCards() {
  gameBoard.replaceChildren();

  const shuffledCards = shuffleCards([...cardValues, ...cardValues]);

  shuffledCards.forEach((cardData) => {
    const card = createCard(cardData);
    gameBoard.append(card);
  });
}

function finishGame() {
  isGameOver = true;
  saveResult();

  victoryTimeout = setTimeout(() => {
        showVictoryModal();
        victoryTimeout = null;
      }, 600);
}

startNewGame();

function openModal(content) {
  modal.replaceChildren(content);
  modalOverlay.classList.add("open");
  document.body.classList.add("modal-open");
}

function closeModal() {
  modalOverlay.classList.remove("open");
  modal.replaceChildren();
  document.body.classList.remove("modal-open");
}

modalOverlay.addEventListener("click", (event) => {
  if (event.target === modalOverlay) {
    closeModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modalOverlay.classList.contains("open")) {
    closeModal();
  }
});

function showVictoryModal() {
  const content = document.createElement("div");
  content.classList.add("victory-modal-content");

  const title = document.createElement("h2");
  title.textContent = "You won!";

  const result = document.createElement("p");
  result.textContent = `Moves: ${moves}`;

  const buttons = document.createElement("div");
  buttons.classList.add("modal-buttons");

  const newGameModalButton = document.createElement("button");
  newGameModalButton.type = "button";
  newGameModalButton.textContent = "New Game";

  const closeButton = document.createElement("button");
  closeButton.type = "button";
  closeButton.textContent = "Close";

  buttons.append(newGameModalButton, closeButton);

  content.append(title, result, buttons);

  openModal(content);

  newGameModalButton.addEventListener("click", () => {
    closeModal();
    startNewGame();
  });

  closeButton.addEventListener("click", closeModal);
}

function formatDate(date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
}

function saveResult() {
  const savedResults = localStorage.getItem("memoryGameResults");

  const results = savedResults
    ? JSON.parse(savedResults)
    : [];

  const now = new Date();

  const newResult = {
    moves: moves,
    date: formatDate(now),
    timestamp: now.getTime(),
  };

  results.push(newResult);

  results.sort((a, b) => {
    if (a.moves !== b.moves) {
      return a.moves - b.moves;
    }

    return a.timestamp - b.timestamp;
  });

  const bestResults = results.slice(0, 10);

  localStorage.setItem(
    "memoryGameResults",
    JSON.stringify(bestResults),
  );
}

function getSavedResults() {
  const savedResults = localStorage.getItem("memoryGameResults");

  return savedResults
    ? JSON.parse(savedResults)
    : [];
}

function showLeaderboardModal() {
  const content = document.createElement("div");
  content.classList.add("leaderboard-modal-content");

  const title = document.createElement("h2");
  title.textContent = "Leaderboard";

  content.append(title);

  const results = getSavedResults();

  if (results.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = "No results yet";

    content.append(emptyMessage);
  } else {
    const table = document.createElement("table");

    const headerRow = document.createElement("tr");

    const placeHeader = document.createElement("th");
    placeHeader.textContent = "Place";

    const movesHeader = document.createElement("th");
    movesHeader.textContent = "Moves";

    const dateHeader = document.createElement("th");
    dateHeader.textContent = "Date";

    headerRow.append(placeHeader, movesHeader, dateHeader);

    const tableHead = document.createElement("thead");
    tableHead.append(headerRow);

    const tableBody = document.createElement("tbody");

    results.forEach((result, index) => {
      const row = document.createElement("tr");

      const placeCell = document.createElement("td");
      placeCell.textContent = index + 1;

      const movesCell = document.createElement("td");
      movesCell.textContent = result.moves;

      const dateCell = document.createElement("td");
      dateCell.textContent = result.date;

      row.append(placeCell, movesCell, dateCell);
      tableBody.append(row);
    });

    table.append(tableHead, tableBody);
    content.append(table);
  }

  const closeButton = document.createElement("button");
  closeButton.type = "button";
  closeButton.textContent = "Close";

  closeButton.addEventListener("click", closeModal);

  content.append(closeButton);

  openModal(content);
}
