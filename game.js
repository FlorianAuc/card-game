document.addEventListener("DOMContentLoaded", () => {
  // ---- Ajout du pseudo du joueur  ---- //
  // Récupérer tous les pseudos depuis le localStorage
  const pseudosList = JSON.parse(localStorage.getItem("pseudos")) || [];

  const $player = document.querySelector(".pseudo");
  const $cardPlayer = document.querySelectorAll(".player");
  const $cardIa = document.querySelector(".played");
  const $score = document.querySelector(".score");

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

  // ---- Gestion du clic sur les cartes du joueur ---- //
  let score = 0;

  $cardPlayer.forEach((card) => {
    card.addEventListener("click", () => {
      const playerCardValue = parseInt(card.innerHTML);

      // Récupérer la carte de l'IA depuis le localStorage
      const iaCardValue = JSON.parse(localStorage.getItem("iaCard"))[0];

      // Comparer les cartes
      if (playerCardValue === iaCardValue) {
        score++;
      } else {
        score--;
      }

      // Retirer la carte du joueur
      card.style.display = "none";

      // Mettre à jour l'affichage du score
      $score.innerHTML = `${score} pt`;

      // Générer une nouvelle carte pour l'IA sans répétition
      let newRandomNumberIa;
      const playedNumbersIa =
        JSON.parse(localStorage.getItem("playedNumbersIa")) || [];

      do {
        newRandomNumberIa = random();
      } while (playedNumbersIa.includes(newRandomNumberIa));

      numberIa[0] = newRandomNumberIa;
      $cardIa.innerHTML = newRandomNumberIa;

      // Ajouter le nouveau chiffre à la liste des chiffres joués par l'IA
      playedNumbersIa.push(newRandomNumberIa);
      localStorage.setItem("playedNumbersIa", JSON.stringify(playedNumbersIa));
    });
  });

  // ---- Générer un chiffre aléatoire pour l'IA ---- //
  let numberIa = [];
  const randomNumberIa = random();
  numberIa.push(randomNumberIa);
  $cardIa.innerHTML = randomNumberIa;

  // Stocker la carte de l'IA dans le localStorage
  localStorage.setItem("iaCard", JSON.stringify(numberIa));
});
