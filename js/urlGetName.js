function urlGetName(name) {
  var url = new URL(document.location.href);
  return url.searchParams.get(name);
}
