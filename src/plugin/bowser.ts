import Bowser from "bowser";
import {ref} from "vue";

export const useBrowser = () => {
    const browser = ref(Bowser.getParser(window.navigator.userAgent));
    if (browser.value.getResult().os.name === "Windows") {
        import("~/styles/scroll.css");
    }
    console.log(browser)
    return browser;
}
