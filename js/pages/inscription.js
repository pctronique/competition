function validationInscription(e) {
  // pour ne pas prendre l'adresse de l'action du formulaire.
  e.preventDefault();
  let speudo = document.getElementById("floatingInputLogin").value;
  let pass = document.getElementById("floatingPassword").value;
  let passRepeat = document.getElementById("floatingPasswordRepeat").value;
  let theFindLogin = findLogin(speudo);
  if (speudo == "" || theFindLogin > -1) {
  }
  if (pass == "") {
  }
  if (passRepeat == "") {
  }
  if (speudo != "" && pass != "" && passRepeat != "" && theFindLogin == -1) {
    if (pass == passRepeat) {
      sha256(pass).then(function (response) {
        let utilisateur = undefined;
        if (utilisateurAutoIncrement == 1) {
          utilisateur = addUser(speudo, response, 2);
        } else {
          utilisateur = addUser(speudo, response, 1);
        }
        saveLocalSGBD();
        userSession(utilisateur);
        window.location.href = "./admin_game";
      });
    } else {
      alert("Les mots de passe ne sont pas identiques.");
    }
  } else if (speudo == "") {
    alert("Le login ne peu pas être vide.");
  } else if (pass == "" || passRepeat == "") {
    alert("Le mot de passe ne peu pas être vide.");
  } else if (theFindLogin > -1) {
    alert("Le login est déjà utilisé, merci d'en choisir un autre.");
  }
}

function activeBtInscription() {
  activePassEyeSlash();
  document
    .getElementById("valider")
    .addEventListener("click", validationInscription);
  document.getElementById("annuler").addEventListener("click", function (e) {
    window.location.href = "./";
  });

  /**
   * Action si on touche le bouton entrer du clavier.
   */
   document.body.addEventListener("keydown", (event) => {
    if (event.key == "Enter") {
      validationInscription(event);
    }
  });
}

function inscription() {
  fetch_txt("./templates/inscription.html").then(function (response) {
    document.getElementById("def_body").innerHTML = response;
    activeBtInscription();
  });
}
