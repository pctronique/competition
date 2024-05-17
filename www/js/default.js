configDefStart();
let indexPg = urlGetName("ind");
document.getElementById("def_menu").innerHTML = "";
document.getElementById("def_body").innerHTML = "";
if (indexPg != undefined && indexPg.trim() != "") {
  if (indexPg == "insc") {
    document.getElementById("head-title").innerHTML = "Compétition game - inscription";
    menu();
    inscription();
    footer();
  } else if (indexPg == "conn") {
    document.getElementById("head-title").innerHTML = "Compétition game - connexion";
    menu();
    connexion();
    footer();
  } else if (indexPg == "decon") {
    deconnexion();
  } else if (indexPg == "info") {
    menu();
    information();
    footer();
  } else {
    menu();
    acc();
    footer();
  }
} else {
  menu();
  acc();
  footer();
}
