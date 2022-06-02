import {$host} from "./index";

export const createLabRecord = async (formData: any) => {
    const {data} = await $host.post('lab_records', formData)
    return data
}