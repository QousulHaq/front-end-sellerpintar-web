import axios from "axios";
import AxiosInstance from "@/lib/axios";
import { RegsiterFormTypes } from "@/types/form";

const responseTemplate = {
    data: null,
    error: null
}

export const register = async (data: RegsiterFormTypes) => {
    try {
        const responseData = await AxiosInstance.post("/auth/register",
            data,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        return { ...responseTemplate, data: responseData }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return { ...responseTemplate, error: (error.response?.data?.message || error.message) }
        }
        return { ...responseTemplate, error: error };
    }
}