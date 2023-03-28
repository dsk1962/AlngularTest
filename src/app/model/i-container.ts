import { IWidget } from "./i-widget";

export interface IContainer extends IWidget{
    layout : string,
    children? : IWidget[]
}
