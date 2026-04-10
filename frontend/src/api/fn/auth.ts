import Globals from "@/shared/globals"
import axios from "axios"

import type { RegisterInputs } from "@/types/RegisterInputs"
import type { LoginInputs } from "@/types/LoginInputs"

export const registerUser = async (data: RegisterInputs) => {
    const response = await axios.post(
        `${Globals.baseUrl}${Globals.registerRoute}`,
        data
    )
    return response.data
}

export const loginUser = async (data: LoginInputs) => {
    const response = await axios.post(
        `${Globals.baseUrl}${Globals.loginRoute}`,
        data
    )
    return response.data
}
