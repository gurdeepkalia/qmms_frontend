import { DataType } from './app-enums.model';

export class QueryAttribute{
    constructor(public queryAttribute : string , public attributeDatatype : DataType , public columnNumber : number){}
}