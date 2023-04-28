import {makeAutoObservable} from "mobx";

export default class StockStore {
    constructor() {
        //hardcode
        this._stocks = []
        makeAutoObservable(this)
    }

    get stocks() {
        return this._stocks;
    }

    setStocks(value) {
        this._stocks = value;
    }

}