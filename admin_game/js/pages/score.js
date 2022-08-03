function score() {
    fetch_txt('./templates/score.html').then(function(response) {
        document.getElementById("def_body").innerHTML += response;
    });
}