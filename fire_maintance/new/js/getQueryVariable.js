/*解析 href 中的参数
* @returns {Json}
*/
function getQueryVariable() {
  var query = window.location.search.substring(1);
  var vars = query.split("&")
  var json = {}
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=")
    json[pair[0]] = decodeURI(pair[1])
  }
  return json
}
