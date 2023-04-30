import {makeAutoObservable} from "mobx";

export default class ModalStore {

    constructor() {
        this._command = {}
        makeAutoObservable(this)
    }


    get command() {
        return this._command;
    }


    setCommand(value) {
        this._command = value;
    }

}