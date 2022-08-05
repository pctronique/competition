function loadFilesSGBD(event) {
  let files = event.target.files;

  if (files.length <= 0) {
    return false;
  }

  var fr = new FileReader();

  fr.onload = function (e) {
    loadJSON_SGBD(e.target.result);
  };

  fr.readAsText(files.item(0));
  window.location.href = "./";
}

function loadDefSGBD(e) {
  fetch_txt("./../config/sgbd_default.json").then(function (response) {
    loadDefJSON_SGBD(response);
    window.location.href = "./";
  });
}

/*
ajouter une image dans le telechargement
*/
function file_sgbd_add() {
  document.getElementById("fileToUpload").click();
}

function activeBtSGBD() {
  document.getElementById("save").addEventListener("click", function(e) {
    saveFileSGBD();
  });
  document.getElementById("recup").addEventListener("click", function(e) {
    file_sgbd_add();
  });
  document.getElementById("delete").addEventListener("click", function(e) {
    del_SGBD();
    window.location.href = "./../";
  });
  document.getElementById("default").addEventListener("click", function(e) {
    loadDefSGBD();
  });
  // en cas de changement de fichier
  document
    .getElementById("fileToUpload")
    .addEventListener("change", loadFilesSGBD);
}

function sgbd_recup() {
  if ("id" in sessionTab) {
    if(sessionTab.roleId == 2) {
        fetch_txt("./templates/sgbd.html").then(function (response) {
          document.getElementById("def_body").innerHTML = response;
          activeBtSGBD();
        });
    } else {
        window.location.href = "./";
    }
  } else {
    window.location.href = "./../?ind=conn";
  }
}
