import {$host} from "./index";

export const getAllPlants = async () => {
    const {data} = await $host.get('plants')
    return data
}

