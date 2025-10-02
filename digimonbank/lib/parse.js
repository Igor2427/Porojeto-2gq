import Parse from "parse/dist/parse.min.js";

Parse.initialize(
  "SUA_APP_ID", // Substitua pelo App ID do Back4App
  "SUA_JS_KEY"  // Substitua pela JS Key
);

Parse.serverURL = "https://SEU_APP.back4app.io/"; // Substitua pela URL do seu app

export default Parse;
