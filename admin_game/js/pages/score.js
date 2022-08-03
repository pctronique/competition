function score() {
    fetch_txt('./pages/score.html').then(function(response) {
        document.getElementById("def_body").innerHTML += response;
    });
}