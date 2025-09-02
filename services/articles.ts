import axios from "axios";
import AxiosInstance from "@/lib/axios";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

const responseTemplate = {
    data: null,
    error: null
}

export const getDetailArticles = async (id: string) => {
    try {
        const session = await getServerSession(authOptions);

        const resDetail = await AxiosInstance.get(`/articles/${id}`, {
            headers: {
                Authorization: `Bearer ${session?.user.accessToken}`,
            },
        })

        const resAll = await AxiosInstance.get("/articles", {
            headers: {
                Authorization: `Bearer ${session?.user.accessToken}`,
            },
            params: {
                page: 1,
                limit: 9
            }
        })

        const otherArticles = resAll.data.data.filter((article: any) => article.id !== id && article.category.name === resDetail.data.category.name).sort(() => 0.5 - Math.random()).slice(0, 3)

        return { ...responseTemplate, data: { ...resDetail.data, otherArticles } }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return { ...responseTemplate, error: (error.response?.data?.message || error.message) }
        }
        return { ...responseTemplate, error: error };
    }
}

export const getCategories = async () => {
    try {
        const session = await getServerSession(authOptions);

        const res = await AxiosInstance.get(`/categories`, {
            headers: {
                Authorization: `Bearer ${session?.user.accessToken}`,
            },
        })

        return { ...responseTemplate, data: { ...res.data } }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return { ...responseTemplate, error: (error.response?.data?.message || error.message) }
        }
        return { ...responseTemplate, error: error };
    }
}