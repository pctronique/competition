let indexPg = urlGetName("ind");
document.getElementById("def_body").innerHTML = "";
if(indexPg != undefined && indexPg.trim() != "") {
    if(indexPg == "score") {
        score();
    } else if(indexPg == "conc") {
        concours();
    } else if(indexPg == "user") {
        user();
    } else if(indexPg == "users") {
        users();
    } else if(indexPg == "sgbd") {
        sgbd_recup();
    } else {
        acc();
    }
} else {
    acc();
}