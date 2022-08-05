function addRowUserGameInfo(gameUser) {
  let myIndex = recupId(utilisateurTab, gameUser.userId);
  let user = utilisateurTab[myIndex];
  return (
    '<tr id="concours_' +
    gameUser.id +
    '">' +
    "<td class=\"text-center icon-cup\">" +
    "</td>" +
    "<td class=\"text-center\">" +
    gameUser.score +
    "</td>" +
    "<td class=\"text-center\">" +
    user.speudo +
    "</td>" +
    "</tr>"
  );
}

function addParticipationConcours(idGame) {
	addGameUser(idGame, sessionTab.id, 0);
	saveLocalSGBD();
  location.reload();
}

function addBtParticipationConcoursScore(id) {
  document.getElementById("bt-participation-concours").innerHTML = "";
  if ("id" in sessionTab) {
    if(findGameAndUser(id)) {
      let myIndex = recupId(gameTab, parseInt(id));
      if(myIndex != -1) {
        let game = gameTab[myIndex];
        if(dateToInt(dateNowStr()) < dateToInt(game.dateEnd)) {
          document.getElementById("bt-participation-concours").innerHTML = '<button id="participer" type="button" class="btn btn-dark m-1">Participer</button>';
          document.getElementById('participer').addEventListener("click", function (e) {
            addParticipationConcours(parseInt(id));
          })
        }
      }
    }
  }
}

function loadlistScoreInfo(id) {
  document.getElementById("list_score_game").innerHTML = "";
  let nbColumn = 0;
  let tabReverse = reverseTab(gameUserTab);
  if (tabReverse.length > 0) {
    for (let index = 0; index < tabReverse.length; index++) {
      const element = tabReverse[index];
      if(element.gameId == id) {
        nbColumn++;
        document.getElementById("list_score_game").innerHTML += addRowUserGameInfo(
          element
        );
      }
    }
    trieTabInformationGame();
    let i = 0;
    document.getElementById("list_score_game").querySelectorAll('tr').forEach(element => {
      if(i == 0) {
        element.querySelector(".icon-cup").innerHTML = '<img src="./img/trophee.svg" alt="premier" />';
      } else if(i == 1) {
        element.querySelector(".icon-cup").innerHTML = '<img src="./img/deuxieme-prix.svg" alt="deuxième" />';
      } else if(i == 2) {
        element.querySelector(".icon-cup").innerHTML = '<img src="./img/troisieme-prix.svg" alt="troisième" />';
      }
      i++;
    });
  }
  if(nbColumn == 0) {
    document.getElementById("list_score_game").innerHTML =
      "<tr>" + '<td colspan="3">il n\'y a pas de participants pour le moment.</td>' + "</tr>";
  }
}

function trieTabInformationGame() {
  sortTable("table-info-game", "score-game-user", -1);
}

function information() {
  let indexPg = urlGetName("id");
  if (indexPg == undefined) {
    indexPg = -1;
  }
  if (indexPg == "") {
    indexPg = -1;
  }
  let myIndex = recupId(gameTab, parseInt(indexPg));
  let visible = 0;
  if(myIndex != -1) {
    visible = gameTab[myIndex].visible;
  }
  if (myIndex != -1 && visible == 1) {
    fetch_txt("./templates/information.html").then(function (response) {
      document.getElementById("def_body").innerHTML = response;
      document.getElementById("score-game-title").innerHTML =
        gameTab[myIndex].name;
      document.getElementById("score-game-desc").innerHTML =
        gameTab[myIndex].description;
      document.getElementById("score-game-img").src = gameTab[myIndex].image;
      document.getElementById("score-game-date").innerHTML = displayDate(
        gameTab[myIndex].date
      );
      document.getElementById("score-game-dateStart").innerHTML = displayDate(
        gameTab[myIndex].dateStart
      );
      document.getElementById("score-game-dateEnd").innerHTML = displayDate(
        gameTab[myIndex].dateEnd
      );
      loadlistScoreInfo(indexPg);
      addBtParticipationConcoursScore(indexPg);
    });
  } else {
    document.getElementById("def_body").innerHTML =
      "<div>Impossible de trouver la page.</div>";
  }
}
