let indexPg = urlGetName("ind");
document.getElementById("def_menu").innerHTML = "";
document.getElementById("def_body").innerHTML = "";
if(indexPg != undefined && indexPg.trim() != "") {
    if(indexPg == "score") {
        menu();
        score();
    } else if(indexPg == "conc") {
        menu();
        concours();
    } else if(indexPg == "user") {
        menu();
        user();
    } else if(indexPg == "users") {
        menu();
        users();
    } else if(indexPg == "sgbd") {
        menu();
        sgbd_recup();
    } else {
        menu();
        acc();
    }
} else {
    menu();
    acc();
}