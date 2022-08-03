let utilisateurAutoIncrement = 1;
let roleAutoIncrement = 1;
let gameAutoIncrement = 1;
let gameUserAutoIncrement = 1;
let utilisateurTab = [];
let roleTab = [];
let gameTab = [];
let gameUserTab = [];
let utilisateurIdDef = -1;
let roleIdDef = -1;
let gameIdDef = -1;
let gameUserIdDef = -1;

function role(id, name) {
    return {
        "id" : id,
        "name" : name,
    };
}

function utilisateur(id, speudo, pass, roleId) {
    return {
        "id" : id,
        "speudo" : speudo,
        "pass" : pass,
        "roleId" : roleId,
    };
}

function game(id, name, image, date, dateStart, dateEnd, description, userId) {
    return {
        "id" : id,
        "name" : name,
        "image" : image,
        "date" : date,
        "dateStart" : dateStart,
        "dateEnd" : dateEnd,
        "description" : description,
        "userId" : userId,
    };
}

function gameUser(id, gameId, userId, score) {
    return {
        "id" : id,
        "gameId" : gameId,
        "userId" : userId,
        "score" : score,
    };
}

function recupId(dataTab, id) {
    for (let index = 0; index < dataTab.length; index++) {
        if(dataTab[index].id == id) {
            return index
        }
    }
    return -1;
}

function addRole(name) {
    let idTab = roleIdDef;
    if(roleIdDef == -1) {
        idTab = roleAutoIncrement;
        roleAutoIncrement++;
    }
    let idIndex = recupId(roleTab, idTab);
    let roleTableOne = role(idTab, name);
    if(idIndex == -1) {
        roleTab.push(roleTableOne);
    } else {
        roleTab[idIndex] = roleTableOne;
    }
    return roleTableOne;
}

function addUser(speudo, pass, roleId) {
    let idTab = utilisateurIdDef;
    if(utilisateurIdDef == -1) {
        idTab = utilisateurAutoIncrement;
        utilisateurAutoIncrement++;
    }
    let idIndex = recupId(utilisateurTab, idTab);
    let userTableOne = utilisateur(idTab, speudo, pass, roleId);
    if(idIndex == -1) {
        utilisateurTab.push(userTableOne);
    } else {
        utilisateurTab[idIndex] = userTableOne;
    }
    return userTableOne;
}

function addGame(name, image, date, dateStart, dateEnd, description, userId) {
    let idTab = gameIdDef;
    if(gameIdDef == -1) {
        idTab = gameAutoIncrement;
        gameAutoIncrement++;
    }
    let idIndex = recupId(gameTab, idTab);
    let gameTableOne = game(idTab, name, image, date, dateStart, dateEnd, description, userId);
    if(idIndex == -1) {
        gameTab.push(gameTableOne);
    } else {
        gameTab[idIndex] = gameTableOne;
    }
    return gameTableOne;
}

function addGameUser(gameId, userId, score) {
    let idTab = gameUserIdDef;
    if(gameUserIdDef == -1) {
        idTab = gameUserAutoIncrement;
        gameUserAutoIncrement++;
    }
    let idIndex = recupId(gameUserTab, idTab);
    let gameUserTableOne = gameUser(gameId, userId, score);
    if(idIndex == -1) {
        gameUserTab.push(gameUserTableOne);
    } else {
        gameUserTab[idIndex] = gameUserTableOne;
    }
    return gameUserTableOne;
}

function saveLocalSGBD() {
    /*let valuesRole = {
        "number" : roleAutoIncrement,
        "listData" : roleTab,

    }
    localStorage.setItem('pctr_comp_role', JSON.stringify(valuesRole));*/
    let valuesUser = {
        "number" : utilisateurAutoIncrement,
        "listData" : utilisateurTab,

    }
    localStorage.setItem('pctr_comp_user', JSON.stringify(valuesUser));
    let valuesGame = {
        "number" : gameAutoIncrement,
        "listData" : gameTab,

    }
    localStorage.setItem('pctr_comp_game', JSON.stringify(valuesGame));
    let valuesGameUser = {
        "number" : gameUserAutoIncrement,
        "listData" : gameUserTab,

    }
    localStorage.setItem('pctr_comp_game_user', JSON.stringify(valuesGameUser));
}

function loadLocalSGBD() {
    /*var valuesRole = localStorage.getItem('pctr_comp_role');
    if(valuesRole !== undefined && valuesRole != "") {
        let values = JSON.parse(valuesRole);
        if(values != undefined && values != "") {
            roleAutoIncrement = values.number;
            roleTab = values.listData;
        }
    }*/
    var valuesUser = localStorage.getItem('pctr_comp_user');
    if(valuesUser !== undefined && valuesUser != "") {
        let values = JSON.parse(valuesUser);
        if(values != undefined && values != "") {
            utilisateurAutoIncrement = values.number;
            utilisateurTab = values.listData;
        }
    }
    var valuesGame = localStorage.getItem('pctr_comp_game');
    if(valuesGame !== undefined && valuesGame != "") {
        let values = JSON.parse(valuesGame);
        if(values != undefined && values != "") {
            gameAutoIncrement = values.number;
            gameTab = values.listData;
        }
    }
    var valuesGameUser = localStorage.getItem('pctr_comp_game_user');
    if(valuesGameUser !== undefined && valuesGameUser != "") {
        let values = JSON.parse(valuesGameUser);
        if(values != undefined && values != "") {
            gameUserAutoIncrement = values.number;
            gameUserTab = values.listData;
        }
    }
}

function saveFileSGBD() {
    let name_file = "sgbd_comppetition_" + Date.now() + ".json";
    let values = {
        //"roleAutoIncrement" : roleAutoIncrement,
        "utilisateurAutoIncrement" : utilisateurAutoIncrement,
        "gameAutoIncrement" : gameAutoIncrement,
        "gameUserAutoIncrement" : gameUserAutoIncrement,
        //"roleTab" : roleTab,
        "utilisateurTab" : utilisateurTab,
        "gameTab" : gameTab,
        "gameUserTab" : gameUserTab,
    }
    var blob = new Blob([JSON.stringify(values)], { type: "text" });
    const blobUrl = URL.createObjectURL(blob);
    
    var fileLink = document.createElement("a");
    fileLink.href = blobUrl;
    
    fileLink.download = name_file;
    
    fileLink.click();
}

function loadJSON_SGBD(jsonData) {
    var result = JSON.parse(jsonData);
    //roleAutoIncrement = result.roleAutoIncrement;
    utilisateurAutoIncrement = result.utilisateurAutoIncrement;
    gameAutoIncrement = result.gameAutoIncrement;
    gameUserAutoIncrement = result.gameUserAutoIncrement;
    //roleTab = result.roleTab;
    utilisateurTab = result.utilisateurTab;
    gameTab = result.gameTab;
    gameUserTab = result.gameUserTab;
    
    saveLocalSGBD();
}

function addDefRole() {
    addRole("utilisateur");
    addRole("admin");
}

addDefRole();
loadLocalSGBD();