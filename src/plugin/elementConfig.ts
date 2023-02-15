// 监听窗口大小变化
import {reactive} from "vue";

export default function elementConfig() {
    const elementConfig = reactive({size: "medium"})
    const listener = () => {
        const width = window.innerWidth
        if (width < 768) {
            elementConfig.size = 'mini'
        } else if (width < 992) {
            elementConfig.size = 'small'
        } else if (width < 1200) {
            elementConfig.size = 'medium'
        } else if (width < 1920) {
            elementConfig.size = 'large'
        }
    }
    window.addEventListener('resize', listener)
    return elementConfig
}