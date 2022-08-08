if (!("blur" in configTab)) {
  configDefSite();
}

function sortTable1(idTabe, idth, f) {
  // fait a partir du site : https://www.pierre-giraud.com/trier-tableau-javascript/
  let compare = function (ids, asc) {
    return function (row1, row2) {
      let tdValue = function (row, ids) {
        return row.children[ids].textContent;
      };
      let tri = function (v1, v2) {
        if (v1 !== "" && v2 !== "" && !isNaN(v1) && !isNaN(v2)) {
          return v1 - v2;
        } else {
          return v1.toString().localeCompare(v2);
        }
      };
      return tri(
        tdValue(asc ? row1 : row2, ids),
        tdValue(asc ? row2 : row1, ids)
      );
    };
  };

  let tableSort = document.getElementById(idTabe);
  let th = tableSort.querySelector("#" + idth);
  let thx = tableSort.querySelectorAll("th");
  let tbody = tableSort.querySelector("tbody");
  let trxb = tbody.querySelectorAll("tr");
  let classe = Array.from(trxb).sort(
    compare(Array.from(thx).indexOf(th), f == 1)
  );
  classe.forEach(function (tr) {
    tbody.appendChild(tr);
  });
}

function reverseTab(tab) {
  if (tab != undefined) {
    let tabReverse = [];
    for (let index = 0; index < tab.length; index++) {
      const element = tab[index];
      tabReverse.push(element);
    }
    return tabReverse.reverse();
  }
}

function findLogin(speudo) {
  for (let index = 0; index < utilisateurTab.length; index++) {
    if (utilisateurTab[index].speudo == speudo) {
      return index;
    }
  }
  return -1;
}

function findGameAndUser(idGame) {
  for (let index = 0; index < gameUserTab.length; index++) {
    if (
      idGame == gameUserTab[index].gameId &&
      sessionTab.id == gameUserTab[index].userId
    ) {
      return false;
    }
  }
  return true;
}

function urlGetName(name) {
  var url = new URL(document.location.href);
  return url.searchParams.get(name);
}

function validateGame(game) {
  if (game != undefined) {
    let validate = 1;
    if (
      dateToInt(dateNowStr(dateNowStr())) >= dateToInt(game.dateStart) &&
      dateToInt(dateNowStr()) <= dateToInt(game.dateEnd)
    ) {
      validate = 2;
    } else if (dateToInt(dateNowStr()) >= dateToInt(game.dateEnd)) {
      validate = 0;
    }
    return validate;
  }
  return -1;
}

function passEyeSlash(e) {
  let element = e.target;
  if(!element.classList.contains("eye-slash-img")) {
    element = e.target.parentNode;
  }
  let elementImg = element.querySelector("i");
  let elementText = element.parentNode.querySelector(".eye-slash-txt");
  if(elementText.type == "password") {
    elementText.type = "text";
  } else {
    elementText.type = "password";
  }
  elementImg.classList.toggle("bi-eye");
  elementImg.classList.toggle("bi-eye-slash");
}

function activePassEyeSlash() {
  document.querySelectorAll(".eye-slash-img").forEach((element) => {
    element.addEventListener("click", passEyeSlash);
  });
}
