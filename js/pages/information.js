function addRowUserGameInfo(gameUser) {
  console.log(gameUser.userId);
  let myIndex = recupId(utilisateurTab, gameUser.userId);
  let user = utilisateurTab[myIndex];
  return (
    '<tr id="concours_' +
    gameUser.id +
    '">' +
    "<td>" +
    gameUser.score +
    "</td>" +
    "<td>" +
    user.speudo +
    "</td>" +
    "</tr>"
  );
}

function loadlistScoreInfo(id) {
  document.getElementById("list_score_game").innerHTML = "";
  let tabReverse = reverseTab(gameUserTab);
  if (tabReverse.length > 0) {
    tabReverse.forEach((element) => {
      if(element.gameId == id) {
        document.getElementById("list_score_game").innerHTML += addRowUserGameInfo(
          element
        );
      }
    });
  } else {
    document.getElementById("list_score_game").innerHTML =
      "<tr>" + '<td colspan="2">Il n\'y a pas de catégorie.</td>' + "</tr>";
  }
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
  if (myIndex != -1) {
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
    });
  } else {
    document.getElementById("def_body").innerHTML =
      "<div>Impossible de trouver la page.</div>";
  }
}
