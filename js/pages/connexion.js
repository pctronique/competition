function validationConnexion() {
    let speudo = document.getElementById('floatingInputLogin').value;
    let pass = document.getElementById('floatingPassword').value;
    let theFindLogin = findLogin(speudo);
    if(speudo == "" || theFindLogin == -1) {

    }
    if(pass == "") {
        
    }
    if(speudo != "" && pass != "" && theFindLogin != -1) {
        let passUser = utilisateurTab[theFindLogin].pass;
        sha256(pass).then(function(response) {
            if(passUser == response) {
                userSession(utilisateurTab[theFindLogin]);
                window.location.href = './admin_game';
            } else {
                alert("Impossible de vous connecter.");
            }
        });
    } else if(speudo == "") {
        alert("Le login ne peu pas être vide.");
    } else if(pass == "" || passRepeat == "") {
        alert("Le mot de passe ne peu pas être vide.");
    } else {
        alert("Impossible de vous connecter.");
    }
}

function activeBtConnexion() {
    document.getElementById("valider").addEventListener("click", validationConnexion);
    document.getElementById("annuler").addEventListener("click", function (e) {
        window.location.href = './';
    });
}

function connexion() {
    fetch_txt('./templates/connexion.html').then(function(response) {
        document.getElementById("def_body").innerHTML += response;
        activeBtConnexion();
    });
}