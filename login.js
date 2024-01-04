document.addEventListener("DOMContentLoaded", () => {
  // Sélectionner le formulaire
  const $form = document.querySelector(".login form");

  $form.addEventListener("submit", (e) => {
    e.preventDefault();
    const $pseudo = document.getElementById("pseudo").value;

    const storedPseudos = JSON.parse(localStorage.getItem("pseudos")) || [];

    if (storedPseudos.includes($pseudo)) {
      document.querySelector(".error").classList.remove("hidden");
    } else {
      storedPseudos.push($pseudo);

      // Mettre à jour le localStorage
      localStorage.setItem("pseudos", JSON.stringify(storedPseudos));

      // Dirigé le joueur sur la page game.html
      window.location.href = "./game.html";
    }
  });
});
