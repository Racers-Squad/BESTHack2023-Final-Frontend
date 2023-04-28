import {LOGIN_PAGE, MAIN_PAGE, REGISTER_PAGE, STOCK_PAGE} from "./utils/const";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MainPage from "./pages/MainPage";
import StockPage from "./pages/StockPage";


export const publicRoutes = [
    {
        path: LOGIN_PAGE, Component: LoginPage
    },
    {
        path: REGISTER_PAGE, Component: RegisterPage
    },
    {
        path: MAIN_PAGE, Component: MainPage
    }, {
        path: STOCK_PAGE + '/:code', Component: StockPage
    }
]
