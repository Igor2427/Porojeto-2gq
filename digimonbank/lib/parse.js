import Parse from "parse/dist/parse.min.js";

if (typeof window !== "undefined") {
  Parse.initialize(
    process.env.NEXT_PUBLIC_PARSE_APP_ID,
    process.env.NEXT_PUBLIC_PARSE_JS_KEY
  );
  Parse.serverURL = process.env.NEXT_PUBLIC_PARSE_SERVER_URL;
}

export default Parse;
