"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type ArticleData = {
    title: string;
    content: string;
    categoryId: string;
    imageUrl: string;
};

type ArticleContextType = {
    article: ArticleData;
    setArticle: (data: ArticleData) => void;
    updateArticle: (data: Partial<ArticleData>) => void;
};

// default kosong
const defaultArticle: ArticleData = {
    title: "",
    content: "",
    categoryId: "",
    imageUrl: "",
};

const ArticleContext = createContext<ArticleContextType | undefined>(undefined);

export function ArticleProvider({ children }: { children: ReactNode }) {
    const [article, setArticle] = useState<ArticleData>(defaultArticle);

    const updateArticle = (data: Partial<ArticleData>) => {
        setArticle((prev) => ({ ...prev, ...data }));
    };

    return (
        <ArticleContext.Provider value={{ article, setArticle, updateArticle }}>
            {children}
        </ArticleContext.Provider>
    );
}

export function useArticletContext() {
    const ctx = useContext(ArticleContext);
    if (!ctx) {
        throw new Error("usePostContext must be used within PostProvider");
    }
    return ctx;
}
