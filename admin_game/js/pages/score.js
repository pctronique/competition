function findGameAndUser(idGame) {
  for (let index = 0; index < gameUserTab.length; index++) {
    console.log(idGame+' == '+gameUserTab[index].gameId+' && '+sessionTab.id+' == '+gameUserTab[index].userId);
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

function loadlistScore() {
  document.getElementById("list_competition").innerHTML = "";
  let tabReverse = gameUserTab.reverse();
  if (tabReverse.length > 0) {
    tabReverse.forEach((element) => {
      document.getElementById("list_competition").innerHTML += addRowConcours(
        element
      );
    });
  } else {
    document.getElementById("list_competition").innerHTML =
      "<tr>" + '<td colspan="5">Il n\'y a pas de catégorie.</td>' + "</tr>";
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
      addEventAllScore();
    });
  } else {
    window.location.href = "./../?ind=conn";
  }
}
