document.addEventListener("DOMContentLoaded", () => {
  // ---- Ajout du pseudo du joueur  ---- //
  // Récupérer tous les pseudos depuis le localStorage
  const pseudosList = JSON.parse(localStorage.getItem("pseudos")) || [];

  const $player = document.querySelector(".pseudo");
  const $cardPlayer = document.querySelectorAll(".player");
  const $cardIa = document.querySelector(".played");
  const $score = document.querySelector(".score");
  const zone = document.querySelector(".dropzone");
  const blocs = document.querySelectorAll(".player");

  let dragSrcEl = null;
  let score = 0;
  let level = 1;

  //verifier que j'ai bien des pseudo dans mon localStorage
  if (pseudosList.length > 0) {
    const lastIndex = pseudosList.lastIndexOf(
      pseudosList[pseudosList.length - 1]
    );
    const lastPseudo = pseudosList[lastIndex];

    $player.innerHTML = lastPseudo;
  }

  // ---- Fonction qui génère un nombre entre 1 et 10 ---- //
  const random = () => Math.floor(Math.random() * 10) + 1;

  // ---- Générer des chiffres aléatoires pour le joueur ---- //
  const numberPlayer = [];

  $cardPlayer.forEach((card) => {
    let randomNumber;
    do {
      randomNumber = random();
    } while (numberPlayer.includes(randomNumber));

    numberPlayer.push(randomNumber);
    card.innerHTML = randomNumber;
  });

  // Trier les cartes du joueur dans l'ordre
  numberPlayer.sort((a, b) => a - b);

  // Mettre à jour les cartes
  $cardPlayer.forEach((card, index) => {
    card.innerHTML = numberPlayer[index];
  });

  // ---- Gestion du drag and drop sur les cartes du joueur ---- //
  blocs.forEach((e) => {
    e.addEventListener(
      "dragstart",
      (event) => {
        dragSrcEl = event.target;
        event.target.classList.add("active");
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("text/plain", event.target.innerHTML);
      },
      false
    );
  });

  zone.addEventListener(
    "dragover",
    (event) => {
      event.preventDefault();
      event.target.classList.add("active");
    },
    false
  );

  zone.addEventListener(
    "drop",
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      e.target.classList.remove("active");

      // Si la zone de destination est vide
      if (e.target.children.length === 0) {
        e.target.appendChild(dragSrcEl);
        dragSrcEl.classList.remove("active");
        dragSrcEl.parentNode.removeChild(dragSrcEl);
      }

      const playerCardValue = parseInt(dragSrcEl.innerHTML, 10);

      // Récupérer la carte de l'IA depuis le localStorage
      const iaCardValue = JSON.parse(localStorage.getItem("iaCard"))[0];

      // Comparer les cartes
      if (playerCardValue === iaCardValue) {
        score++;
      } else {
        score--;
      }
      // Mettre à jour l'affichage du score
      $score.innerHTML = `${score} pt`;
    },
    false
  );

  // ---- Générer un chiffre aléatoire pour l'IA ---- //
  let numberIa = [];
  const randomNumberIa = random();
  numberIa.push(randomNumberIa);
  $cardIa.innerHTML = randomNumberIa;

  // Stocker la carte de l'IA dans le localStorage
  localStorage.setItem("iaCard", JSON.stringify(numberIa));
});
