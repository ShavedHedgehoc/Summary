import {$host} from "./index";

export const getLabStatuses = async () => {
    const {data} = await $host.get('lab_statuses')
    return data
}

