import { Query } from '../models/query.model';
import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';





@Injectable({providedIn : 'root'})
export class QueryService{

    query : Query;
    
    headers = new HttpHeaders({'Access-Control-Allow-Origin' : '*'});
    constructor(private http : HttpClient){}

    queriesChanged = new EventEmitter<Query[]>();
    queryChanged = new EventEmitter<Query>();
    queries : Query[]=[
        // new Query("select_query1","select ename from emp",Frequency.WEEKLY,Status.ENABLE,"19.4.2",new Date(),new Date(),
        //             [new QueryAttribute("ename",DataType.VARCHAR2,1)]
        //          ),
        // new Query("select_query2","select ename,age from emp",Frequency.WEEKLY,Status.ENABLE,"19.4.3",new Date(),new Date(),
        //             [new QueryAttribute("ename",DataType.VARCHAR2,1),new QueryAttribute("age",DataType.NUMBER,2)]
        //          )
    ]

    getQueriesFromDb(){
        this.http.get<Query[]>("http://localhost:8080/queries/",{headers : this.headers}).subscribe(
            (response)=>{
                console.log(response);
            }
        );
    }

    getQueries(){
        return this.http.get<Query[]>("http://localhost:8080/queries/",{headers : this.headers});
        
        
    }

    getQuery(queryId:string){
       
        let url = `http://localhost:8080/queries/${queryId}`;
        console.log(url);
        return this.http.get<Query>(url,{headers : this.headers});
          
    }

    deleteQuery(queryId : string){
        //this.queries.splice(index,1);
        let url = `http://localhost:8080/queries/${queryId}`;
        console.log(url);
        this.http.delete(url).subscribe(()=>{
            this.http.get<Query[]>("http://localhost:8080/queries/",{headers : this.headers}).subscribe((response : Query[])=>{
            this.queries = response;
            this.queriesChanged.emit(this.queries.slice());
            });
        });
        
    }

    updateQuery(queryId:string , newQuery : Query){
        //this.queries[index] = newQuery;
        //this.queriesChanged.emit(this.queries.slice());
        let url = `http://localhost:8080/queries/${queryId}`;
        this.http.post(url,newQuery,{headers : this.headers}).subscribe(()=>{
            this.http.get<Query>(`http://localhost:8080/queries/${queryId}`,{headers : this.headers}).subscribe((response : Query)=>{
                this.query = response;
                console.log("In update :" +this.query);
                this.queryChanged.emit(this.query);
                },);
        });
    }

    addQuery(newQuery : Query){
        this.http.post("http://localhost:8080/queries/",newQuery,{headers : this.headers}).subscribe(()=>{
            this.http.get<Query[]>("http://localhost:8080/queries/",{headers : this.headers}).subscribe((response : Query[])=>{
                this.queries = response;
                this.queriesChanged.emit(this.queries.slice());
                });
        });
      //  this.queries.push(newQuery);
      //  this.queriesChanged.emit(this.queries.slice());
    }

    getSqs(queryId : string){
        return this.http.get(`http://localhost:8080/queries/${queryId}/sqs`,{headers : this.headers});
    }
}