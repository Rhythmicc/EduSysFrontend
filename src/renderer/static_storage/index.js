const user_key = "user"
const info_key = "UserInfo"

export default class backend {
    address() {
        return 'http://118.31.73.98/'
    }
    getBindUser(){
        return JSON.parse(localStorage.getItem(user_key));
    }
    saveUser(user, callback) {
        localStorage.setItem(user_key, JSON.stringify(user))
        callback && callback();
    }
    getUserInfo() {
        if(!this.info)this.info = JSON.parse(sessionStorage.getItem(info_key))
        return this.info
    }
    saveUserInfo(info) {
        this.info = info
        sessionStorage.setItem(info_key, JSON.stringify(info))
    }
    getSessionObject(key) {
        return JSON.parse(sessionStorage.getItem(key))
    }
    saveSessionObject(key, obj) {
        sessionStorage.setItem(key, JSON.stringify(obj))
    }
}
