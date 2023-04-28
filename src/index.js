import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import UserStore from "./store/UserStore";
import ServiceStore from "./store/ServiceStore";
import StockStore from "./store/StockStore";

export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Context.Provider value={{
    user: new UserStore(),
    services: new ServiceStore(),
    stocks: new StockStore()
}}>
    <App/>
</Context.Provider>);
