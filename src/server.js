const http = require("http");
const loadResources = require("./app");

loadResources().then(intializeApp);

function intializeApp({ port, appInstance }) {
  http
    .createServer(appInstance)
    .listen(port, () => console.log("server listening on port", port));
}
