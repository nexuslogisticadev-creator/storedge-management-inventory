import axios from "axios"

export type RegisterInputs = {
    name: string
    email: string
    password: string
}
export const registerUser = async (data: RegisterInputs) => {
    const response = await axios.post("http://localhost:3000/register", data)
    return response.data
}

export type LoginInputs = {
    name: string
    password: string
}
export const loginUser = async (data: LoginInputs) => {
    const response = await axios.post("http://localhost:3000/login", data)
    return response.data
}
