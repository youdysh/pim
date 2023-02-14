import Bowser from "bowser";

const browser = Bowser.getParser(window.navigator.userAgent);
if (browser.getResult().os.name === "Windows") {
    import("~/styles/scroll.css");
}
console.log(browser)
export default browser;