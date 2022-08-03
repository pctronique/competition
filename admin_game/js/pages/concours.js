function concours() {
    fetch_txt('./pages/concours.html').then(function(response) {
        document.getElementById("def_body").innerHTML += response;
        // en cas de changement de fichier (ici d'image)
        document.getElementById('imgToUpload').addEventListener('change', loadFilesImg);
        // quand on clique sur le bouton pour ajouter une image
        document.getElementById('add-img').addEventListener('click', img_add);
    });
}