import {$host} from "./axiosAPI";

export const getModeOfData = async (eis) => {
    const {data} = await $host.get("/eis/get/" + eis)
    return data
}
export const executeCommand = async (command, id) =>{
    const {data} = await $host.post("/" + id + "/execute", command)
    return data
}
