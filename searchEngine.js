
var body = document.getElementsByTagName("body")[0];

function createElement(tag, text) {
    temp = document.createElement(tag);
    if (text != 0) {
        temp.textContent = text;
    }
    return temp;
}

function SearchRepositories(searchItem, page) {
    var dataShowCase = createElement("div");
    body.appendChild(dataShowCase);
    dataShowCase.appendChild(createElement("h1", searchItem));

    var request = new XMLHttpRequest();
    request.open("GET", "https://api.github.com/search/repositories?q=" + searchItem + "+size:>=1000" + "&page=" + page + "&sort=stars", true);
    request.onload = function () {
        var data = JSON.parse(this.response);
        for (var a in data.items) {
            var creator = data.items[a].full_name;
            var description = data.items[a].description;
            url = data.items[a].html_url;

            dataShowCase.appendChild(createElement("h3", creator));
            dataShowCase.appendChild(createElement("p", description));
            link = createElement("a", url);
            link.href = url;
            dataShowCase.appendChild(link);
        }
    }
    request.send();
    body.appendChild(dataShowCase);
}


// fetch("example/data.txt").then(response => {
//   console.log(response.status);
//   // → 200
//   console.log(response.headers.get("Content-type"));
//   // → text/plain
// });
//
// fetch("example/data.txt")
//   .then(resp => resp.text())
//   .then(text => console.log(text));

// document.querySelector("input").focus();
// console.log(document.activeElement.tagName);

let form = document.querySelector("form");

form.addEventListener("submit", event => {
    var inputText = form.elements.value.value;
    console.log("Saving value", inputText);
    SearchRepositories(inputText);
    event.preventDefault();
});
