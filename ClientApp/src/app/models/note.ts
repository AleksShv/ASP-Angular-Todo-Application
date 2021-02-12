export interface Note{
    id?: number;
    title: string;
    content: string;
    completed?: boolean;
    changed?: boolean;
    createDate?: Date;
    completeDate?: Date;
    userId?: number;
}