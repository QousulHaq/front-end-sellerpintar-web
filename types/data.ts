export type Author = {
    id: string;
    username: string;
}

export type Category = {
    id: string;
    name: string
}

export type Articles = {
    id?: string;
    title: string;
    content: string;
    category: Category;
    createdAt: string;
    imageUrl: string;
    user?: Author;
}

export type OtherArticlesTypes = {
    otherArticles?: Articles[]
}

export type GetArticlesResponses = {
    data: {
        data: Articles[]
    } | null;
    error: string | null;
}


export type GetDetailArticlesResponses = {
    data: Articles & OtherArticlesTypes | null;
    error: string | null;
}

export type GetDetailCategoriesResponses = {
    data: Category[];
    error: string | null;
}