import browser from "~/plugin/bowser";
import {App, Plugin} from 'vue'

export const useMyPlugins: Plugin = {
    install(app: App) {
        app.config.globalProperties.$bowser = browser
    }
}