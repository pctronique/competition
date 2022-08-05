function validateCptUserName(e) {
  // pour ne pas prendre l'adresse de l'action du formulaire.
  e.preventDefault();
  let speudo = document.getElementById('floatingInputLogin').value;
  let theFindLogin = findLogin(speudo);
  if(theFindLogin != -1) {
    let user_modif = utilisateurTab[theFindLogin];
    if(user_modif.id != sessionTab.id) {
      theFindLogin = -1;
    }
  } else {
    theFindLogin = recupId(utilisateurTab, sessionTab.id);
  }
  if(theFindLogin != -1) {
    utilisateurIdDef = sessionTab.id;
    let user_modif = utilisateurTab[theFindLogin];
    user_modif = addUser(speudo, user_modif.pass, user_modif.roleId);
    userSession(user_modif);
    saveLocalSGBD();
    utilisateurIdDef = -1;
  } else {
    alert("Le login est déjà utilisé, merci d'en choisir un autre.");
    document.getElementById("floatingInputLogin").value = sessionTab.speudo;
  }
}

function validateCptUserPass(e) {
  // pour ne pas prendre l'adresse de l'action du formulaire.
  e.preventDefault();
  let pass = document.getElementById("floatingPassword").value;
  let passRepeat = document.getElementById("floatingPasswordRepeat").value;
  if (pass == "") {
  }
  if (passRepeat == "") {
  }
  if (pass != "" && passRepeat != "") {
    if (pass == passRepeat) {
      sha256(pass).then(function (response) {
        utilisateurIdDef = sessionTab.id;
        let theFindLogin = recupId(utilisateurTab, sessionTab.id);
        let user_modif = utilisateurTab[theFindLogin];
        addUser(user_modif.speudo, response, user_modif.roleId);
        saveLocalSGBD();
        document.getElementById("floatingPassword").value = "";
        document.getElementById("floatingPasswordRepeat").value = "";
        utilisateurIdDef = -1;
        alert("Le mot de passe a été modifié.");
      });
    } else {
      alert("Les mots de passe ne sont pas identiques.");
    }
  } else {
    alert("Le mot de passe ne peu pas être vide.");
  }
}

function addEventAllUser() {
  document
    .getElementById("valider")
    .addEventListener("click", validateCptUserName);
    document
    .getElementById("validerPass")
    .addEventListener("click", validateCptUserPass);
}

function user() {
  if ("id" in sessionTab) {
    fetch_txt("./templates/user.html").then(function (response) {
      document.getElementById("def_body").innerHTML = response;
      document.getElementById("floatingInputLogin").value = sessionTab.speudo;
      addEventAllUser();
    });
  } else {
    window.location.href = "./../?ind=conn";
  }
}
