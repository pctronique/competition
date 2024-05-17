function selectRoleUsers(idUser, idRole) {
  let html = '<select name="role" class="select-role" id="role-' + idUser + '">';
  roleTab.forEach((element) => {
    if (element.id == idRole) {
      html +=
        '<option value="' +
        element.id +
        '" selected>' +
        element.name +
        "</option>";
    } else {
      html +=
        '<option value="' + element.id + '">' + element.name + "</option>";
    }
  });
  html += "</select>";
  return html;
}

function addRowUsers(user) {
  return (
    '<tr id="users_' +
    user.id +
    '">' +
    "<td>" +
    user.speudo +
    "</td>" +
    "<td>" +
    selectRoleUsers(user.id, user.roleId) +
    "</td>" +
    '<td class="text-center"><img src="./img/mot-de-passe.svg" class="modif-pass" alt="modifier le mot de passe" /></td>' +
    "</tr>"
  );
}

function loadlistUsers() {
  document.getElementById("list_users").innerHTML = "";
  let tabReverse = reverseTab(utilisateurTab);
  if (tabReverse.length - 1 > 0) {
    tabReverse.forEach((element) => {
      if (element.id != sessionTab.id) {
        document.getElementById("list_users").innerHTML += addRowUsers(element);
      }
    });
    addEventAllUsers();
  } else {
    document.getElementById("list_users").innerHTML =
      "<tr>" + '<td colspan="5">Il n\'y a pas de catégorie.</td>' + "</tr>";
  }
}

function addEventAllUsers() {
  document.querySelectorAll(".select-role").forEach(element => {
    element.addEventListener("change", function (e) {
      let id = parseInt(
            document.getElementById(this.parentNode.parentNode.id).id.split("_")[1]
          );
      let theFindLogin = recupId(utilisateurTab, id);
      if(theFindLogin != -1) {
        let user_modif = utilisateurTab[theFindLogin];
        utilisateurIdDef = user_modif.id;
        addUser(user_modif.speudo, user_modif.pass, parseInt(this.value));
        saveLocalSGBD();
        utilisateurIdDef = -1;
      }
    });
  });
  document.querySelectorAll(".modif-pass").forEach(element => {
    element.addEventListener("click", function (e) {
      let id = parseInt(
            document.getElementById(this.parentNode.parentNode.id).id.split("_")[1]
          );
      let theFindLogin = recupId(utilisateurTab, id);
      if(theFindLogin != -1) {
        let user_modif = utilisateurTab[theFindLogin];
        if (
          confirm(
            "Voulez-vous modifier le mot de passe pour l'utilisateur : '" +
            user_modif.speudo +
              "' ?. \n\n'Ok' pour supprimer."
          )
        ) {
          sha256('Secret-1234').then(function (response) {
            utilisateurIdDef = user_modif.id;
            addUser(user_modif.speudo, response, user_modif.roleId);
            saveLocalSGBD();
            utilisateurIdDef = -1;
            alert("Le mot de passe a été modifié.");
          });
        }
      }
    });
  });
}

function users() {
  if ("id" in sessionTab) {
    if(sessionTab.roleId == 2) {
        fetch_txt("./templates/users.html").then(function (response) {
        document.getElementById("def_body").innerHTML = response;
        loadlistUsers();
        });
    } else {
        window.location.href = "./";
    }
  } else {
    window.location.href = "./../?ind=conn";
  }
}
