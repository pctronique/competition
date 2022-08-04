function selectRoleUsers(idUser, idRole) {
  let html = '<select name="role" id="role-' + idUser + '">';
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
    '<td class="text-center"><img src="./img/poubelle.svg" class="delete" alt="supprimer" /></th>' +
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
  document.querySelectorAll(".delete").forEach((element) => {
    element.addEventListener("click", function (e) {
      let id = parseInt(
        document.getElementById(this.parentNode.parentNode.id).id.split("_")[1]
      );
      let name = "";
      let myIndex = recupId(gameTab, id);
      if (myIndex !== -1) {
        let data = gameTab[myIndex];
        name = data.name;
      }
      if (
        confirm(
          "Voulez-vous supprimer le concour : '" +
            name +
            " ?'. 'Ok' pour continuer."
        )
      ) {
        if (myIndex !== -1) {
          gameTab.splice(myIndex, 1);
          saveLocalSGBD();
          loadlistConcours();
          eraseValueFormConcours();
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
