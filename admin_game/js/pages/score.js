function score() {
    if("id" in sessionTab) {
        fetch_txt('./templates/score.html').then(function(response) {
            document.getElementById("def_body").innerHTML = response;
        });
    } else {
        window.location.href = './../?ind=conn';
    }
}