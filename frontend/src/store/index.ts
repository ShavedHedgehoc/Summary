import UserStore from "./UserStore";

class RootStore {
    user: UserStore;

    constructor(){
        this.user = new UserStore();
    }
}

export default RootStore;