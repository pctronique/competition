function validationInscription(e) {
    let speudo = document.getElementById('floatingInputLogin').value;
    let pass = document.getElementById('floatingPassword').value;
    let passRepeat = document.getElementById('floatingPasswordRepeat').value;
    if(speudo != "" && pass != "" && passRepeat != "" ) {
        if(pass == passRepeat) {
            
        }
    }
}

function activeBtInscription() {
    document.getElementById("valider").addEventListener("click", validationInscription);
    document.getElementById("annuler").addEventListener("click", function (e) {
        window.location.href = './';
    });
}

function inscription() {
    fetch_txt('./pages/inscription.html').then(function(response) {
        document.getElementById("def_body").innerHTML += response;
        activeBtInscription();
    });
}