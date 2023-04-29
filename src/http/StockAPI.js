import {$host} from "./axiosAPI";


export const getStocksByType = async (type) => {
    const {data} = await $host.get("/eis/" + type)
    return data
}

export const getStockByCode = async (code) => {
    const {data} = await $host.get('/stock/' + code)
    return data
}