function validationConcours(e) {
  // pour ne pas prendre l'adresse de l'action du formulaire.
  e.preventDefault();
  //fileImgAdd
  let idConcour = document.getElementById("id-concour");
  let name = document.getElementById("floatingInputName");
  let dateStart = document.getElementById("floatingInputDateStart");
  let dateEnd = document.getElementById("floatingInputDateEnd");
  let description = document.getElementById("controlTextareaDescription");

  let dateString = dateNowStr();
  let idUser = sessionTab.id;

  if (idConcour.value != "-1") {
    gameIdDef = parseInt(idConcour.value);
    let myIndex = recupId(gameTab, gameIdDef);
    if (myIndex != -1) {
      idUser = gameTab[myIndex].userId;
      dateString = gameTab[myIndex].date;
    }
    if (imgSrc == "") {
      imgSrc = gameTab[myIndex].image;
    }
  }

  if (
    imgSrc != "" &&
    name.value != "" &&
    dateStart.value != "" &&
    dateEnd.value != ""
  ) {
    if (recupIdNameConcours(gameIdDef, name.value)) {
      addGame(
        name.value,
        imgSrc,
        dateString,
        dateStart.value,
        dateEnd.value,
        description.value,
        idUser
      );
      saveLocalSGBD();
      loadlistConcours();

      eraseValueFormConcours();
    } else {
      alert("Le nom est déjà utilisé, merci d'en choisir un autre");
    }
  } else {
    alert("Merci de tout remplir");
  }
}

function eraseValueFormConcours() {
  document.getElementById("id-concour").value = "-1";
  document.getElementById("add-img").src =
    "./img/icons8-ajouter-une-image-90.png";
  document.getElementById("floatingInputName").value = "";
  document.getElementById("floatingInputDateStart").value = "";
  document.getElementById("floatingInputDateEnd").value = "";
  document.getElementById("controlTextareaDescription").value = "";
  gameIdDef = -1;
  fileImgAdd = undefined;
  imgSrc = "";
}

function recupIdNameConcours(id, name) {
  for (let index = 0; index < gameTab.length; index++) {
    if (gameTab[index].id != id && gameTab[index].name == name) {
      return index;
    }
  }
  return -1;
}

function activeBtConcours() {
  document
    .getElementById("valider")
    .addEventListener("click", validationConcours);
  document.getElementById("annuler").addEventListener("click", function (e) {
    window.location.href = "./?ind=conc";
  });
}

function addRowConcours(concours) {
  return (
    '<tr id="concours_' +
    concours.id +
    '">' +
    "<td>" +
    concours.name +
    "</td>" +
    "<td>" +
    displayDate(concours.dateStart) +
    "</td>" +
    "<td>" +
    displayDate(concours.dateEnd) +
    "</td>" +
    '<td><img src="./img/icons8-modifier.svg" class="modif" alt="modifier" /></th>' +
    '<td><img src="./img/poubelle.svg" class="delete" alt="supprimer" /></th>' +
    "</tr>"
  );
}

function addEventAllConcours() {
  document.querySelectorAll(".modif").forEach((element) => {
    element.addEventListener("click", function (e) {
      eraseValueFormConcours();
      id = parseInt(
        document.getElementById(this.parentNode.parentNode.id).id.split("_")[1]
      );
      let myIndex = recupId(gameTab, id);
      if (myIndex !== -1) {
        let data = gameTab[myIndex];
        document.getElementById("id-concour").value = data.id;
        document.getElementById("add-img").src = data.image;
        document.getElementById("floatingInputName").value = data.name;
        document.getElementById("floatingInputDateStart").value =
          data.dateStart;
        document.getElementById("floatingInputDateEnd").value = data.dateEnd;
        document.getElementById("controlTextareaDescription").value =
          data.description;
      }
    });
  });
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
          deleteGame(id);
          saveLocalSGBD();
          loadlistConcours();
          eraseValueFormConcours();
        }
      }
    });
  });
}

function loadlistConcours() {
  document.getElementById("list_competition").innerHTML = "";
  let tabReverse = reverseTab(gameTab);
  if (tabReverse.length > 0) {
    tabReverse.forEach((element) => {
      document.getElementById("list_competition").innerHTML += addRowConcours(
        element
      );
    });
    addEventAllConcours();
  } else {
    document.getElementById("list_competition").innerHTML =
      "<tr>" + '<td colspan="5">Il n\'y a pas de catégorie.</td>' + "</tr>";
  }
}

function concours() {
  if ("id" in sessionTab) {

    if(sessionTab.roleId == 2) {
        fetch_txt("./templates/concours.html").then(function (response) {
        document.getElementById("def_body").innerHTML = response;
        // en cas de changement de fichier (ici d'image)
        document
            .getElementById("imgToUpload")
            .addEventListener("change", loadFilesImg);
        // quand on clique sur le bouton pour ajouter une image
        document.getElementById("add-img").addEventListener("click", img_add);
        activeBtConcours();
        loadlistConcours();
        });
    } else {
        window.location.href = "./";
    }
  } else {
    window.location.href = "./../?ind=conn";
  }
}
