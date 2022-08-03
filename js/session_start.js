let sessionTab = {};

let valueSession = sessionStorage.getItem('pctr_competition_session');
if(valueSession != undefined && valueSession.trim() != "") {
    sessionTab = JSON.parse(valueSession);
}

function userSession(utilisateur) {
    let tabSave = {
        "id" : utilisateur.id,
        "speudo" : utilisateur.speudo,
        "roleId" : utilisateur.roleId,
    };
    sessionStorage.setItem('pctr_competition_session', JSON.stringify(tabSave));
}