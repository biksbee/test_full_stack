import { FC } from "react";
interface ITitle {
    title: string;
}


export const MyTitle:FC<ITitle> = ({title = "my title"}) => <span>{title}</span>;