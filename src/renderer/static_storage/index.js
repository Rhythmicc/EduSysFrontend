export default class backend {
    address() {
        return 'http://nat.rhythmlian.cn/'
    }
    getBindUser(){
        if(!this.user)this.user =  JSON.parse(localStorage.getItem('user'))
        return this.user;
    }
    saveUser(user, callback) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(user))
        callback && callback();
    }
    getUserInfo() {
        if(!this.info)this.info = JSON.parse(sessionStorage.getItem('UserInfo'))
        return this.info
    }
    saveUserInfo(info) {
        this.info = info
        sessionStorage.setItem('UserInfo', JSON.stringify(info))
    }
}
