export default class backend {
    address() {
        return 'http://localhost:8000/'
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
}
