import {$host} from "./index";

export const fetchUsers = async () => {
    const {data} = await $host.get('users')
    return data
}

export const deleteUser = async (id: any) => {
    const {data} = await $host.delete('users', {data: {id: id}})
    return data
}

export const createUser = async (formData:any) => {
    const {data} = await $host.post('users', formData)
    return data
}

export const updateUser = async () => {

}