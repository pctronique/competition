function displayCard(game) {
  let imgSrc = "";
  let posImgGame = recupIdImg(recupIdImageIdGame(game.id));
  if(posImgGame[0] != -1) {
    imgSrc = imagTab[posImgGame[0]][posImgGame[1]].src;
  }
  let validate = validateGame(game);
  let img = '<img class="img_validate" src="./img/icons8-red-square-96.svg" alt="fini" />';
  if(validate == 1) {
    img = '<img class="img_validate" src="./img/icons8-blue-square-96.svg" alt="n\'a pas commencé" />';
  } else if(validate == 2) {
    img = '<img class="img_validate" src="./img/icons8-green-square-96.svg" alt="en cours" />';
  }
  let descMain =
    "Début : " +
    displayDate(game.dateStart) +
    "<br />" +
    "fin : " +
    displayDate(game.dateEnd);
  return (
    '<a class="card-a-div" href="./?ind=info&id=' +
    game.id +
    '">' +
    '<div class="card m-2 mb-4" style="width: 18rem;">' +
    '<img src="' +
    imgSrc +
    '" class="card-img-top" alt="image du concours ' +
    game.name +
    '">' +
    '<div class="card-body">' +
    '<h5 class="card-title">' +
    game.name +
    "</h5>" +
    '<div class="descrip-game-acc">'+
    img+
    '<p class="card-text date-game-acc">' +
    descMain +
    "</p>" +
    "</div>"+
    "</div>" +
    "</div>" +
    "</a>"
  );
}

function loadValidateCardAcc(tab, validate) {
  let tabReverse = reverseTab(gameTab);
  for (let index = 0; index < tabReverse.length; index++) {
    const element = tabReverse[index];
    let validateGameValue = validateGame(element);
    if(element.visible == 1 && validateGameValue == validate) {
      if(tab != undefined) {
        tab.push(element);
      }
    }
  }
  return tab;
}

function displayAllCard() {
  let sectionCard = document.getElementById("list-concours");
  sectionCard.innerHTML = "";
  let tabGame = [];
  loadValidateCardAcc(tabGame, 2);
  loadValidateCardAcc(tabGame, 1);
  loadValidateCardAcc(tabGame, 0);
  tabGame = tabGame.forEach((element) => {
      sectionCard.innerHTML += displayCard(element);
  });
}

function activeBtAcc() {
  document.querySelectorAll(".btConcours").forEach((element) => {});
}

function acc() {
  fetch_txt("./templates/acc.html").then(function (response) {
    document.getElementById("def_body").innerHTML = response;
    activeBtAcc();
    displayAllCard();
  });
}
