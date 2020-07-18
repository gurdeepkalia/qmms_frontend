import { QueryAttribute } from './query-attribute.model';
import { Frequency, Status } from './app-enums.model';

export class Query{
        constructor(public queryId : string , public query : string ,
                 public freq : Frequency , public status : Status ,
                  public optyVer : string , public insDate : Date ,
                   public updDate : Date,public attributes : QueryAttribute[]){}
}