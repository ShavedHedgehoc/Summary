import { computed, makeAutoObservable, observable } from "mobx"

// export interface IUserStore {
//     _isAuth: boolean;
//     _user: object;
// }

// export default class UserStore implements IUserStore {
export default class UserStore {

    @observable isAuth = false
    @observable user = {}

    // constructor() {

    //     makeAutoObservable(this)       
    // }

    // setIsAuth(bool: boolean) {
    //     this._isAuth = bool
    // }
    // setUser(user: object) {
    //     this._user = user
    // }


    // get isAuth() {
    //     return this._isAuth
    // }

    // get user() {
    //     return this._user
    // }
}