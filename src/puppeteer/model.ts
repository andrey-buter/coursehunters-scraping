export interface IParentCategory {
    title: string;
    url: string;
    subCategories: ISubCategory[];
    cache: string[],
}

export interface ISubCategory {
    title: string,
    url: string
    courses: ICourse[]
}

export interface ICourse {
    title: string;
    originTitle: string;
    url: string;
    materials: string[];
    subCategory: string;
}