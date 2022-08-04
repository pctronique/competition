function findGameAndUser(idGame) {
  for (let index = 0; index < gameUserTab.length; index++) {
    if (idGame == gameUserTab[index].gameId && sessionTab.id == gameUserTab[index].userId) {
      return false;
    }
  }
  return true;
}

function loadlistSelectScore() {
  let nbDisplay = 0;
  document.getElementById("select-game").innerHTML = "";
  gameTab.forEach((element) => {
    if (
      findGameAndUser(element.id) &&
      dateToInt(dateNowStr()) < dateToInt(element.dateEnd)
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
  let imgValidate = "./img/icons8-red-square-96.svg";
  let altValidate = "Il n'est plus valide.";
  let validate = "0";
  if(dateToInt(dateNowStr(dateNowStr())) >= dateToInt(game.dateStart) && dateToInt(dateNowStr()) < dateToInt(game.dateEnd)) {
    imgValidate = "./img/icons8-green-square-96.svg";
    altValidate = "Il est valide.";
    validate = "1";
  }
  return (
    '<tr id="concours_' +
    gameUser.id +
    '">' +
    '<td class="icon-validate">' +
    //'<img class="img-validate" src="'+imgValidate+'" alt="'+altValidate+'" />' +
    validate+
    "</td>" +
    "<td>" +
    game.name +
    "</td>" +
    "<td>" +
    gameUser.score +
    "</td>" +
    '<td><img src="./img/poubelle.svg" class="delete" alt="supprimer" /></th>' +
    "</tr>"
  );
}

function trieTabInformationScore() {
  sortTable("table-info-score", "game-user-validate", -1);
}

function loadlistScore() {
  document.getElementById("list_score").innerHTML = "";
  let tabReverse = reverseTab(gameUserTab);
  if (tabReverse.length > 0) {
    for (let index = 0; index < tabReverse.length; index++) {
      const element = tabReverse[index];
      if(element.userId == sessionTab.id) {
        document.getElementById("list_score").innerHTML += addRowUserGame(
          element
        );
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
