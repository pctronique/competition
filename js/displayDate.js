function displayDate(date) {
  let dateOut = "";
  if (date != undefined && date.trim() != "") {
    let tab = date.split("-");
    dateOut = tab[2] + "/" + tab[1] + "/" + tab[0];
  }
  return dateOut;
}

function dateToInt(date) {
  let dateOut = 0;
  if (date != undefined && date.trim() != "") {
    let tab = date.split("-");
    let dateMain = new Date();
    dateMain.setFullYear(tab[0]);
    dateMain.setMonth(tab[1] - 1);
    dateMain.setDate(tab[2]);
    dateOut = dateMain.getTime();
  }
  return dateOut;
}

function dateNowStr() {
  const today = new Date(Date.now());
  let todayDate = "" + today.getDate();
  if (todayDate.length == 1) {
    todayDate = "0" + todayDate;
  }
  let todayMonth = "" + (today.getMonth() + 1);
  if (todayMonth.length == 1) {
    todayMonth = "0" + todayMonth;
  }
  return today.getFullYear() + "-" + todayMonth + "-" + todayDate;
}
