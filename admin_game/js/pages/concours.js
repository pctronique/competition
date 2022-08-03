function validationConcours(e) {
    //fileImgAdd
    let idConcour = document.getElementById("id-concour");
    let name = document.getElementById("floatingInputName");
    let dateStart = document.getElementById("floatingInputDateStart");
    let dateEnd = document.getElementById("floatingInputDateEnd");
    let description = document.getElementById("controlTextareaDescription");

    let dateNow = Date.now();
    const today = new Date(dateNow);
    let dateString = today.getFullYear()+"-"+today.getMonth()+'-'+today.getDate();
    console.log(dateString);

    console.log(fileImgAdd);
    console.log(description.value);
    if(idConcour != "-1" && imgSrc != "" && name.value != "" && dateStart.value != "" && dateEnd.value != "" && description.value != "") {
        console.log("testing");
        addGame(name.value, imgSrc, "", dateStart.value, dateEnd.value, description.value, sessionTab.id);
        saveLocalSGBD();
        console.log(gameTab);
    }
}

function activeBtConcours() {
    document.getElementById("valider").addEventListener("click", validationConcours);
    document.getElementById("annuler").addEventListener("click", function (e) {
        window.location.href = './?ind=conc';
    });
}

function concours() {
    fetch_txt('./templates/concours.html').then(function(response) {
        document.getElementById("def_body").innerHTML += response;
        // en cas de changement de fichier (ici d'image)
        document.getElementById('imgToUpload').addEventListener('change', loadFilesImg);
        // quand on clique sur le bouton pour ajouter une image
        document.getElementById('add-img').addEventListener('click', img_add);
        activeBtConcours();
    });
}