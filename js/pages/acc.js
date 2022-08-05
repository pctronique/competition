function displayCard(game) {
  let descMain =
    "<span class=\"\">Début : " +
    displayDate(game.dateStart) +
    "</span><br />" +
    "<span class=\"\">fin : " +
    displayDate(game.dateEnd)+
    "</span>";
  return (
    '<a class="card-a-div" href="./?ind=info&id=' +
    game.id +
    '">' +
    '<div class="card m-2" style="width: 18rem;">' +
    '<img src="' +
    game.image +
    '" class="card-img-top" alt="image du concours ' +
    game.name +
    '">' +
    '<div class="card-body">' +
    '<h5 class="card-title">' +
    game.name +
    "</h5>" +
    '<p class="card-text">' +
    descMain +
    "</p>" +
    "</div>" +
    "</div>" +
    "</a>"
  );
}

function displayAllCard() {
  let sectionCard = document.getElementById("list-concours");
  sectionCard.innerHTML = "";
  let tabReverse = reverseTab(gameTab);
  tabReverse.forEach((element) => {
    if(element.visible == 1) {
      sectionCard.innerHTML += displayCard(element);
    }
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
