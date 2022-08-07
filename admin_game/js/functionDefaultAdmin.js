function addPopoverInfo(game, validate) {
    let title = "Information";
    let info = "Début : "+displayDate(game.dateStart)+' <br /> '+"fin : "+displayDate(game.dateEnd);
    let imgSrc = "./../img/icons8-red-square-96.svg";
    let cssColor = "custom-popover-red";
    let alt = "c\'est fini";
    if (validate == 1) {
        cssColor = "custom-popover-blue";
        imgSrc = "./../img/icons8-blue-square-96.svg";
        alt = "il n'a pas commencé";
      } else if (validate == 2) {
        cssColor = "custom-popover-green";
        imgSrc = "./../img/icons8-green-square-96.svg";
        alt = "en cours";
      }
    return '<div '+
    'data-bs-toggle="popover" data-bs-html="true" data-bs-custom-class="'+cssColor+'" data-bs-trigger="hover focus" data-bs-title="'+alt+'" data-bs-content="<span class=\'text-right\'>'+info+'</span>"'+
    ''+
    '><img class="img-validate" src="'+imgSrc+'" alt="'+alt+'" /></div>';
}

function activePopover() {
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
    const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));
}

function displayModal(idmodal) {
  let modal = document.getElementById(idmodal);
  modal.classList.toggle("show");
  if(modal.classList.contains("show")) {
      modal.style.display = "unset";
  } else {
      modal.style.display = "none";
  }
}