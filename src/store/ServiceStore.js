import {makeAutoObservable} from "mobx";

export default class ServiceStore {

    constructor() {
        this._services = []
        this._selected = null
        //hardcode
        makeAutoObservable(this)
    }

    get services() {
        return this._services
    }

    get selected() {
        return this._selected;
    }

    setSelected(value) {
        this._selected = value;
    }

    setServices(services) {
        this._services = services
    }


}