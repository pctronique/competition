configDefStart();
let indexPg = urlGetName("ind");
document.getElementById("def_menu").innerHTML = "";
document.getElementById("def_body").innerHTML = "";
if (indexPg != undefined && indexPg.trim() != "") {
  if (indexPg == "score") {
    document.getElementById("head-title").innerHTML = "Compétition game - admin - score";
    menu();
    score();
  } else if (indexPg == "conc") {
    document.getElementById("head-title").innerHTML = "Compétition game - admin - concours";
    menu();
    concours();
  } else if (indexPg == "user") {
    document.getElementById("head-title").innerHTML = "Compétition game - admin - utilisateur";
    menu();
    user();
  } else if (indexPg == "users") {
    document.getElementById("head-title").innerHTML = "Compétition game - admin - utilisateurs";
    menu();
    users();
  } else if (indexPg == "config") {
    document.getElementById("head-title").innerHTML = "Compétition game - admin - configuration";
    menu();
    config();
  } else if (indexPg == "sgbd") {
    document.getElementById("head-title").innerHTML = "Compétition game - admin - sgbd";
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
