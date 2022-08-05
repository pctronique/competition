function validationConnexion(e) {
  // pour ne pas prendre l'adresse de l'action du formulaire.
  e.preventDefault();
  let speudo = document.getElementById("floatingInputLogin").value;
  let pass = document.getElementById("floatingPassword").value;
  let theFindLogin = findLogin(speudo);
  if (speudo == "" || theFindLogin == -1) {
  }
  if (pass == "") {
  }
  if (speudo != "" && pass != "" && theFindLogin != -1) {
    let passUser = utilisateurTab[theFindLogin].pass;
    let idRole = utilisateurTab[theFindLogin].roleId;
    sha256(pass).then(function (response) {
      if (passUser == response) {
        if (idRole != 3 && idRole != 4) {
          userSession(utilisateurTab[theFindLogin]);
          window.location.href = "./admin_game";
        } else if (idRole == 3) {
          alert("Le compte a été supprimé.");
        } else if (idRole == 4) {
          alert("Le compte a été banni.");
        }
      } else {
        alert("Impossible de vous connecter.");
      }
    });
  } else if (speudo == "") {
    alert("Le login ne peu pas être vide.");
  } else if (pass == "") {
    alert("Le mot de passe ne peu pas être vide.");
  } else {
    alert("Impossible de vous connecter.");
  }
}

function activeBtConnexion() {
  document
    .getElementById("valider")
    .addEventListener("click", validationConnexion);
  document.getElementById("annuler").addEventListener("click", function (e) {
    window.location.href = "./";
  });
}

function connexion() {
  fetch_txt("./templates/connexion.html").then(function (response) {
    document.getElementById("def_body").innerHTML = response;
    activeBtConnexion();
  });
}
