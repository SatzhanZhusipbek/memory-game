# Memory Game

A memory game created as part of the Rolling Scopes School JavaScript course.

## Description

The player opens cards one by one and tries to find all matching pairs using as few moves as possible. Matching cards stay open, non-matching ones close.

The game contains 16 cards (8 pairs). Cards are shuffled at the beginning of every game.

## Features

- 16 cards with 8 matching pairs
- Random card shuffling on page load and on every new game
- Move counter
- Matched-pairs counter
- Temporary board lock while a non-matching pair is open
- New Game button
- Victory modal
- Leaderboard modal
- Top 10 results
- Results stored in `localStorage`
- Sorting by number of moves and, when equal, by earlier completion time
- Modal closing by button, overlay click, or `Escape`
- Page scrolling is locked while a modal is open
- Application markup is created dynamically with JavaScript

## Technologies

- HTML
- CSS
- JavaScript
- DOM API
- `localStorage`

No third-party libraries or frameworks are used for the interface or game logic.

## Project Structure

```text
memory-game/
├── assets/
├── index.html
├── script.js
├── style.css
└── README.md
```

## How to Run

1. Clone the repository.
2. Open the project in VS Code.
3. Run `index.html` with Live Server, or open it through another local web server.

## Deployment

[Deployment URL](https://satzhanzhusipbek.github.io/memory-game/)


## Image Credits

```text
Card back:
- Author: David Bellot
- License:  Creative Commons CC0 License
```
[Cards' back source  URL](https://commons.wikimedia.org/wiki/File:Card_back_01.svg)
```text
Card faces:
- Author/project: Twemoji
- License: CC-BY 4.0
```
[Animal pics source URL](https://allsvgicons.com/pack/twemoji/)
