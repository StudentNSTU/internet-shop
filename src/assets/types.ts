export type Item = {
    id: number;
    title: string;
    price: number;
    currency: string;
    sizes: string[];
    alarm: boolean;
    imgURL?: string;
    // imgURL?: string|string[]; 
}

export type CartItem = {
    item: Item;
    chosenSize: string;
    quality: number;
}

export type ChosenItemType = {
    id: number;
    size: string;
}