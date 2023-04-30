import {makeAutoObservable} from "mobx";

export default class ServiceStore {

    constructor() {
        this._services = []
        this._selected = null
        this._commands = [{mode: 0, methods: ''}]
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
    get commands() {
        return this._commands;
    }


    setCommands(value) {
        this._commands = value;
    }

    setServices(services) {
        this._services = services
    }


}