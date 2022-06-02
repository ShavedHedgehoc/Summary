import {$host} from "./index";


export const createSummary = async (formData: any) => {
    const {data} = await $host.post('summary', formData)
    return data
}

export const getAllSummary = async () => {
    const {data} = await $host.get('summary')
    return data
}

export const getMonthSummaryCount = async () => {
    const {data} = await $host.get('summary/count')
    return data
}

export const deleteSummaryByPlantIdDate = async (plantId: string, date: string) => {
    const {data} = await $host.delete('summary/count/delete', {data: {plantId: plantId, date: date}})
    return data
}

export const getSummaryByDatePlantId = async (plantId: number, date: string) => {
    const {data} = await $host.get('summary/filter', {params: { date: date, plantId: plantId}});
    return data;
}

export const getSummaryIdsByDatePlantId = async (plantId: number, date: string) => {
    const {data} = await $host.get('summary/ids', {params: { date: date, plantId: plantId}});
    return data;
}

export const getSummaryById = async (id:number) => {
    const {data} = await $host.get(`summary/${id}`);
    return data;
}