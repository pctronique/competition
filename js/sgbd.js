let utilisateurAutoIncrement = 1;
let roleAutoIncrement = 1;
let gameAutoIncrement = 1;
let gameUserAutoIncrement = 1;
let gameImgAutoIncrement = 1;
let utilisateurTab = [];
let roleTab = [];
let gameTab = [];
let gameUserTab = [];
let imagTab = [];
let configTab = [];
let utilisateurIdDef = -1;
let roleIdDef = -1;
let gameIdDef = -1;
let gameUserIdDef = -1;
let gameImgIdDef = -1;

function configDefSite() {
  configTab = {
    blur: 0
  };
}

function role(id, name) {
  return {
    id: id,
    name: name,
  };
}

function utilisateur(id, speudo, pass, roleId) {
  return {
    id: id,
    speudo: speudo,
    pass: pass,
    roleId: roleId,
  };
}

function image(id, gameId, src) {
  return {
    id: id,
    gameId, gameId,
    src: src,
  };
}

function game(id, name, date, dateStart, dateEnd, description, userId, visible = 1) {
  return {
    id: id,
    name: name,
    date: date,
    dateStart: dateStart,
    dateEnd: dateEnd,
    description: description,
    userId: userId,
    visible: visible,
  };
}

function gameUser(id, gameId, userId, score) {
  return {
    id: id,
    gameId: gameId,
    userId: userId,
    score: score,
  };
}

function deleteGame(id) {
  let myIndex = recupId(gameTab, id);
  if (myIndex !== -1) {
    let game = gameTab[myIndex];
    let imgPos = recupIdImg(game.imageId);
    if(imgPos[0] != -1) {
      imagTab[imgPos[0]][imgPos[1]] = {};
    }
    let deleteImage = [];
    for (let index = 0; index < imagTab.length; index++) {
      const element = imagTab[index];
      if(element != undefined) {
        for (let index1 = 0; index1 < element.length; index1++) {
          const element1 = element[index1];
          if(element1.gameId == id) {
            deleteImage.push(index+":"+index1);
          }
        }
      }
    }
    deleteImage.reverse();
    for (let index = 0; index < deleteImage.length; index++) {
      let posiImg = deleteImage[index].split(":");
      imagTab[posiImg[0]].splice(posiImg[1], 1);
    }
    for (let index = (imagTab.length-1); index >= 0; index--) {
      if(imagTab[index].length == 0) {
        imagTab.splice(index, 1);
      }
    }
    let deleteGameUser = [];
    for (let index = 0; index < gameUserTab.length; index++) {
      if(gameUserTab[index].gameId == id) {
        deleteGameUser.push(index);
      }
    }
    deleteGameUser.reverse();
    for (let index = 0; index < deleteGameUser.length; index++) {
      gameUserTab.splice(deleteGameUser[index], 1);
    }
    gameTab.splice(myIndex, 1);
  }
}

function recupIdUserGame(idUser, idGame) {
  for (let index = 0; index < gameUserTab.length; index++) {
    if (gameUserTab[index].userId == idUser && gameUserTab[index].gameId == idGame) {
      return gameUserTab[index].id;
    }
  }
  return -1;
}

function recupId(dataTab, id) {
  for (let index = 0; index < dataTab.length; index++) {
    if (dataTab[index].id == id) {
      return index;
    }
  }
  return -1;
}

function recupIdImg(id) {
  for (let index = 0; index < imagTab.length; index++) {
    const element = imagTab[index];
    if(element != undefined) {
      for (let index1 = 0; index1 < element.length; index1++) {
        const element1 = element[index1];
        if(element1.id == id) {
          return [index, index1];
        }
      }
    }
  }
  return [-1, -1];
}

function recupIdImageIdGame(id) {
  for (let index = 0; index < imagTab.length; index++) {
    const element = imagTab[index];
    if(element != undefined) {
      for (let index1 = 0; index1 < element.length; index1++) {
        const element1 = element[index1];
        if(element1.gameId == id) {
          return element1.id;
        }
      }
    }
  }
  return -1;
}

function addRole(name) {
  let idTab = roleIdDef;
  if (roleIdDef == -1) {
    idTab = roleAutoIncrement;
    roleAutoIncrement++;
  }
  let idIndex = recupId(roleTab, idTab);
  let roleTableOne = role(idTab, name);
  if (idIndex == -1) {
    roleTab.push(roleTableOne);
  } else {
    roleTab[idIndex] = roleTableOne;
  }
  return roleTableOne;
}

function addUser(speudo, pass, roleId) {
  let idTab = utilisateurIdDef;
  if (utilisateurIdDef == -1) {
    idTab = utilisateurAutoIncrement;
    utilisateurAutoIncrement++;
  }
  let idIndex = recupId(utilisateurTab, idTab);
  let userTableOne = utilisateur(idTab, speudo, pass, roleId);
  if (idIndex == -1) {
    utilisateurTab.push(userTableOne);
  } else {
    utilisateurTab[idIndex] = userTableOne;
  }
  return userTableOne;
}

function addImg(gameId, src) {
  if(imagTab.length == 0) {
    imagTab.push([]);
  }
  let idTab = gameImgIdDef;
  if (gameImgIdDef == -1) {
    idTab = gameImgAutoIncrement;
    gameImgAutoIncrement++;
  }
  let idIndex = recupIdImg(idTab);
  let imgTableOne = image(idTab, gameId, src);
  if (idIndex[0] == -1) {
    console.log(imagTab[imagTab.length-1]);
    if(imagTab[imagTab.length-1] != undefined) {
      if(imagTab[imagTab.length-1].length >= 4) {
        imagTab.push([]);
      }
    }
    if(imagTab[imagTab.length-1] != undefined) {
      imagTab[imagTab.length-1].push(imgTableOne);
    } else {
      imagTab[imagTab.length-1] = [];
      imagTab[imagTab.length-1].push(imgTableOne);
    }
  } else {
    imagTab[idIndex[0]][idIndex[1]] = imgTableOne;
  }
  return imgTableOne;
}

function addGame(name, date, dateStart, dateEnd, description, userId, visible = 1) {
  let idTab = gameIdDef;
  if (gameIdDef == -1) {
    idTab = gameAutoIncrement;
    gameAutoIncrement++;
  }
  let idIndex = recupId(gameTab, idTab);
  let gameTableOne = game(
    idTab,
    name,
    date,
    dateStart,
    dateEnd,
    description,
    userId,
    visible
  );
  if (idIndex == -1) {
    gameTab.push(gameTableOne);
  } else {
    gameTab[idIndex] = gameTableOne;
  }
  return gameTableOne;
}

function addGameUser(gameId, userId, score) {
  let idTab = gameUserIdDef;
  if (gameUserIdDef == -1) {
    idTab = gameUserAutoIncrement;
    gameUserAutoIncrement++;
  }
  let idIndex = recupId(gameUserTab, idTab);
  let gameUserTableOne = gameUser(idTab, gameId, userId, score);
  if (idIndex == -1) {
    gameUserTab.push(gameUserTableOne);
  } else {
    gameUserTab[idIndex] = gameUserTableOne;
  }
  return gameUserTableOne;
}

function saveLocalSGBD() {
  localStorage.setItem("pctr_comp_config", JSON.stringify(configTab));
  /*let valuesRole = {
        "number" : roleAutoIncrement,
        "listData" : roleTab,

    }
    localStorage.setItem('pctr_comp_role', JSON.stringify(valuesRole));*/
  let valuesImg = {
    number: gameImgAutoIncrement,
    listData: imagTab,
  };
  localStorage.setItem("pctr_comp_img", JSON.stringify(valuesImg));
  let valuesUser = {
    number: utilisateurAutoIncrement,
    listData: utilisateurTab,
  };
  localStorage.setItem("pctr_comp_user", JSON.stringify(valuesUser));
  let valuesGame = {
    number: gameAutoIncrement,
    listData: gameTab,
  };
  localStorage.setItem("pctr_comp_game", JSON.stringify(valuesGame));
  let valuesGameUser = {
    number: gameUserAutoIncrement,
    listData: gameUserTab,
  };
  localStorage.setItem("pctr_comp_game_user", JSON.stringify(valuesGameUser));
}

function loadLocalSGBD() {
  configTab = JSON.parse(localStorage.getItem("pctr_comp_config"));
  /*var valuesRole = localStorage.getItem('pctr_comp_role');
    if(valuesRole !== undefined && valuesRole != "") {
        let values = JSON.parse(valuesRole);
        if(values != undefined && values != "") {
            roleAutoIncrement = values.number;
            roleTab = values.listData;
        }
    }*/
  var valuesUser = localStorage.getItem("pctr_comp_img");
  if (valuesUser !== undefined && valuesUser != "") {
    let values = JSON.parse(valuesUser);
    if (values != undefined && values != "") {
      gameImgAutoIncrement = values.number;
      imagTab = values.listData;
    }
  }
  var valuesUser = localStorage.getItem("pctr_comp_user");
  if (valuesUser !== undefined && valuesUser != "") {
    let values = JSON.parse(valuesUser);
    if (values != undefined && values != "") {
      utilisateurAutoIncrement = values.number;
      utilisateurTab = values.listData;
    }
  }
  var valuesGame = localStorage.getItem("pctr_comp_game");
  if (valuesGame !== undefined && valuesGame != "") {
    let values = JSON.parse(valuesGame);
    if (values != undefined && values != "") {
      gameAutoIncrement = values.number;
      gameTab = values.listData;
    }
  }
  var valuesGameUser = localStorage.getItem("pctr_comp_game_user");
  if (valuesGameUser !== undefined && valuesGameUser != "") {
    let values = JSON.parse(valuesGameUser);
    if (values != undefined && values != "") {
      gameUserAutoIncrement = values.number;
      gameUserTab = values.listData;
    }
  }
}

function saveFileSGBD() {
  let name_file = "sgbd_comppetition_" + Date.now() + ".json";
  let values = {
    configTab : configTab,
    //"roleAutoIncrement" : roleAutoIncrement,
    utilisateurAutoIncrement: utilisateurAutoIncrement,
    gameAutoIncrement: gameAutoIncrement,
    gameUserAutoIncrement: gameUserAutoIncrement,
    gameImgAutoIncrement : gameImgAutoIncrement,
    //"roleTab" : roleTab,
    utilisateurTab: utilisateurTab,
    gameTab: gameTab,
    gameUserTab: gameUserTab,
    imagTab: imagTab,
  };
  var blob = new Blob([JSON.stringify(values)], { type: "text" });
  const blobUrl = URL.createObjectURL(blob);

  var fileLink = document.createElement("a");
  fileLink.href = blobUrl;

  fileLink.download = name_file;

  fileLink.click();
}

function loadJSON_SGBD(jsonData) {
  var result = JSON.parse(jsonData);
  configTab = result.configTab,
  //roleAutoIncrement = result.roleAutoIncrement;
  utilisateurAutoIncrement = result.utilisateurAutoIncrement;
  gameAutoIncrement = result.gameAutoIncrement;
  gameUserAutoIncrement = result.gameUserAutoIncrement;
  gameImgAutoIncrement = result.gameImgAutoIncrement;
  //roleTab = result.roleTab;
  utilisateurTab = result.utilisateurTab;
  gameTab = result.gameTab;
  gameUserTab = result.gameUserTab;
  imagTab = result.imagTab;

  saveLocalSGBD();
}

function loadDefJSON_SGBD(jsonData) {
  var result = JSON.parse(jsonData);
  //roleAutoIncrement = result.roleAutoIncrement;
  utilisateurDefAutoIncrement = result.utilisateurAutoIncrement;
  gameAutoIncrement = result.gameAutoIncrement;
  gameUserAutoIncrement = result.gameUserAutoIncrement;
  gameImgAutoIncrement = result.gameImgAutoIncrement;
  //roleTab = result.roleTab;
  utilisateurDefTab = result.utilisateurTab;
  gameTab = result.gameTab;
  gameUserTab = result.gameUserTab;
  imagTab = result.imagTab;

  if(utilisateurDefAutoIncrement > utilisateurAutoIncrement) {
    utilisateurAutoIncrement = utilisateurDefAutoIncrement;
  }

  for (let index = 0; index < utilisateurDefTab.length; index++) {
    const element = utilisateurDefTab[index];
    if(recupId(utilisateurTab, element.id) == -1) {
      if(findLogin(element.speudo) != -1) {
        element.speudo += "_01";
      }
      utilisateurTab.push(element);
    }
  }

  saveLocalSGBD();
}

function del_SGBD() {
  localStorage.removeItem('pctr_comp_role');
  localStorage.removeItem('pctr_comp_user');
  localStorage.removeItem('pctr_comp_game');
  localStorage.removeItem('pctr_comp_game_user');
  sessionStorage.removeItem("pctr_competition_session");
}

function addDefRole() {
  addRole("utilisateur");
  addRole("admin");
  addRole("supprimer");
  addRole("banni");
}

addDefRole();
loadLocalSGBD();
