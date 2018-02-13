function removeTags(html) {
  var tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
  //return text.replace(/<\/?[^>]+(>|$)/g, "");
}

function truncate(source, size) {
  return source.length > size ? source.slice(0, size - 1) + "…" : source;
}

function ucfirst(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function findByPath(obj, path) {
  var result;

  for (var p in obj) {
    if (obj.path === path) {
      return obj;
    } else {
      if (typeof obj[p] === "object") {
        result = findByPath(obj[p], path);
        if (result) {
          return result;
        }
      }
    }
  }
  return result;
}

/*function truncate(str, limit) {
  return str.length < limit ? str : str.substring(0, limit) + "...";
}*/

export { truncate, removeTags, findByPath, ucfirst };
