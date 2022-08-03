function information() {
    let indexPg = urlGetName("id");
    if(indexPg == undefined) {
        indexPg = -1;
    }
    if(indexPg == '') {
        indexPg = -1;
    }
    let myIndex = recupId(gameTab, parseInt(indexPg));
    if(myIndex != -1) {
        fetch_txt('./templates/information.html').then(function(response) {
            document.getElementById("def_body").innerHTML = response;
            document.getElementById("score-game-title").innerHTML = gameTab[myIndex].name;
            document.getElementById("score-game-desc").innerHTML = gameTab[myIndex].description;
            document.getElementById("score-game-img").src = gameTab[myIndex].image;
            document.getElementById("score-game-date").innerHTML = gameTab[myIndex].date;
            document.getElementById("score-game-dateStart").innerHTML = gameTab[myIndex].dateStart;
            document.getElementById("score-game-dateEnd").innerHTML = gameTab[myIndex].dateEnd;
        });
    } else {
        document.getElementById("def_body").innerHTML = "<div>Impossible de trouver la page.</div>";
    }
}