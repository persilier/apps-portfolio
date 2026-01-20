export interface Application {
    id: number;
    name: string;
    url: string;
    imageUrl?: string | null;
    stack?: string | null;
    createdAt: string;
}
