import {defineStore} from 'pinia'

export const useFingerprint = defineStore('fingerprint', {
    state: () => ({password: ""}),
    actions: {
        setPassword(password: string) {
            this.password = password
        }
    },
    getters: {
        getPassword(): string {
            return this.password
        }
    }
})