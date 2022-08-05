/* variables de la page */
let cellule_score_old_value = "";
let cellule_score_old_item = "0";

/**
 * rendre les celles non editable.
 * 
 * @param {*} item item du noeud
 */
 function editabledScore(item) {
  /* parcourir les cellules tab_input pour fermer la version editable */
  document
    .getElementById("list_score")
    .querySelectorAll("td")
    .forEach((element) => {
      /* si l'element n'est pas identique a l'item */
      if (element.id != item.id) {
        /* verifier que l'element n'est pas identique a la verion cliquer avant le changement */
        if (cellule_score_old_item == element.id) {
          /* si c'est d'une version cliquer avant */
          /* on recupere les anciennes informations (en cas d'erreur) */
          let value_old = cellule_score_old_value;
          let id_old = element.id;
          /* verifier qu'on a bien changer les valeurs */
          let modif = element.innerHTML != cellule_score_old_value;
          /* on vide les informations */
          cellule_score_old_value = "";
          cellule_score_old_item = "0";
          /* si on a modifier la valeur */
          if (modif) {
            let score = document.getElementById(id_old).innerHTML;
            if(!isNaN(score)) {
              let scoreInt = parseInt(score);
              if(scoreInt >= 0) {
                gameUserIdDef = parseInt(id_old.split('_')[1]);
                let myIndex = recupId(gameUserTab, gameUserIdDef);
                if(myIndex != -1) {
                  addGameUser(gameUserTab[myIndex].gameId, gameUserTab[myIndex].userId, scoreInt);
                  saveLocalSGBD();
                }
                gameUserIdDef = -1;
                console.log(gameUserTab[myIndex]);
              } else {
                document.getElementById(id_old).innerHTML = value_old;
                alert('Vous devez entrer un nombre supérieur ou égal à 0.')
              }
            } else {
              document.getElementById(id_old).innerHTML = value_old;
              alert('Vous devez entrer un nombre.')
            }
            /* on modifier les valeur dans la base */
            //modif_user(element.parentNode.id, element.id, value_old, id_old);
          }
        }
        /* on desactive la cellule */
        element.contentEditable = false;
      }
    });
}

/**
 * rendre la cellule editable.
 * 
 * @param {event} e evenement du javascript 
 */
 function input_edit_score(e) {
  /* remetre les cellules sous format non editable */
  editabledScore(e.target);
  /* recupere les informations de la cellule */
  cellule_score_old_value = e.target.innerText;
  cellule_score_old_item = e.target.id;
  /* rends celle-ci editable */
  e.target.contentEditable = true;
}

function inputEditAlleventScore() {
  /* activer le changement de format des cellules */
  document
  .getElementById("list_score")
  .querySelectorAll(".tab_input")
  .forEach((element) => {
     element.addEventListener("dblclick", input_edit_score);
  });
  document
  .getElementById("list_score")
  .querySelectorAll(".tab_input_end")
  .forEach((element) => {
     element.addEventListener("dblclick", function(e){
      editabledScore(e);
      alert('il est fini.');
     });
  });
  document
  .getElementById("list_score")
  .querySelectorAll(".tab_input_start")
  .forEach((element) => {
     element.addEventListener("dblclick", function(e){
      editabledScore(e);
      alert('il n\'a pas commencé.');
     });
  });
  document
  .getElementById("list_score")
  .querySelectorAll(".delete")
  .forEach((element) => {
     element.addEventListener("click", function(e){
      let id = parseInt(
        document.getElementById(this.parentNode.parentNode.id).id.split("_")[1]
      );
      let name = "";
      let myIndex = recupId(gameUserTab, id);
      if (myIndex !== -1) {
        let myIndexGame = recupId(gameTab, gameUserTab[myIndex].gameId);
        if (myIndexGame !== -1) {
          let data = gameTab[myIndexGame];
          name = data.name;
        }
      }
      if(name != undefined && name != "") {
        if (
          confirm(
            "Voulez-vous supprimer le score pour le concours : '" +
              name +
              "' ?. \n'Ok' pour supprimer."
          )
        ) {
          if (myIndex !== -1) {
            gameUserTab.splice(myIndex, 1);
            saveLocalSGBD();
            window.location.href = "./?ind=score";
          }
        }
      }
     });
  });
}

function loadlistSelectScore() {
  let nbDisplay = 0;
  document.getElementById("select-game").innerHTML = "";
  gameTab.forEach((element) => {
    if (
      findGameAndUser(element.id) &&
      dateToInt(dateNowStr()) < dateToInt(element.dateEnd) &&
      element.visible == 1
    ) {
      nbDisplay++;
      document.getElementById("select-game").innerHTML +=
        '<option value="' + element.id + '">' + element.name + "</option>";
    }
  });
  if (nbDisplay > 0) {
    document.getElementById("choice-game").style.display = "block";
  }
}

function addRowUserGame(gameUser) {
  let myIndex = recupId(gameTab, gameUser.gameId);
  let game = gameTab[myIndex];
  let validate = "0";
  let type_input = "tab_input";
  if(dateToInt(dateNowStr(dateNowStr())) >= dateToInt(game.dateStart) && dateToInt(dateNowStr()) < dateToInt(game.dateEnd)) {
    validate = "1";
  } else if(dateToInt(dateNowStr()) >= dateToInt(game.dateEnd)) {
    type_input = "tab_input_end";
  } else if(dateToInt(dateNowStr(dateNowStr())) < dateToInt(game.dateStart)) {
    type_input = "tab_input_start";
  }
  return (
    '<tr id="concours_' +
    gameUser.id +
    '">' +
    '<td class="icon-validate">' +
    validate+
    "</td>" +
    "<td>" +
    game.name +
    '</td>' +
    '<td id="score_'+gameUser.id+'" class="'+type_input+' text-center">' +
    gameUser.score +
    '</td>' +
    '<td class="text-center"><img src="./img/poubelle.svg" class="delete" alt="supprimer" /></th>' +
    "</tr>"
  );
}

function trieTabInformationScore() {
  sortTable("table-info-score", "game-user-validate", -1);
}

function loadlistScore() {
  document.getElementById("list_score").innerHTML = "";
  let tabReverse = reverseTab(gameUserTab);
  let nbLigne = 0;
  for (let index = 0; index < tabReverse.length; index++) {
    const element = tabReverse[index];
    let myIndex = recupId(gameTab, element.gameId);
    if (myIndex !== -1) {
      let data = gameTab[myIndex];
      if(element.userId == sessionTab.id && data.visible == 1) {
        nbLigne++;
      }
    }
  }
  if (nbLigne > 0) {
    for (let index = 0; index < tabReverse.length; index++) {
      const element = tabReverse[index];
      let myIndex = recupId(gameTab, element.gameId);
      if (myIndex !== -1) {
        let data = gameTab[myIndex];
        if(element.userId == sessionTab.id && data.visible == 1) {
          document.getElementById("list_score").innerHTML += addRowUserGame(
            element
          );
        }
      }
    }
    trieTabInformationScore();
    document.getElementById("list_score").querySelectorAll('tr').forEach(element => {
      let elementTd = element.querySelector(".icon-validate");
      if(elementTd.innerHTML == "1") {
        elementTd.innerHTML = '<img class="img-validate" src="./img/icons8-green-square-96.svg" alt="Il est valide." />';
      } else {
        elementTd.innerHTML = '<img class="img-validate" src="./img/icons8-red-square-96.svg" alt="Il n\'est plus valide." />';
      }
    });
    inputEditAlleventScore();
  } else {
    document.getElementById("list_score").innerHTML =
      "<tr>" + '<td colspan="4">Il n\'y a pas de catégorie.</td>' + "</tr>";
  }
}

function addParticipation(e) {
  // pour ne pas prendre l'adresse de l'action du formulaire.
  e.preventDefault();
  let value = document.getElementById("select-game").value;
  if(value != undefined && value != "") {
    addGameUser(parseInt(value), sessionTab.id, 0);
    saveLocalSGBD();
    window.location.href = "./?ind=score";
  }
}

function addEventAllScore() {
  document.getElementById('participer').addEventListener('click', addParticipation);

  /**
   * Action si on touche le bouton entrer du clavier.
   */
  document.body.addEventListener("keydown", (event) => {
    if (event.key == "Enter") {
      editabledScore(event);
    }
  });
}



function score() {
  if ("id" in sessionTab) {
    fetch_txt("./templates/score.html").then(function (response) {
      document.getElementById("def_body").innerHTML = response;
      loadlistSelectScore();
      loadlistScore();
      addEventAllScore();
    });
  } else {
    window.location.href = "./../?ind=conn";
  }
}
