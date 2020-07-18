import { Component, OnInit } from '@angular/core';
import { QueryService } from '../query.service';
import { Query } from 'src/app/models/query.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-query-list',
  templateUrl: './query-list.component.html',
  styleUrls: ['./query-list.component.css']
})
export class QueryListComponent implements OnInit {

  queries : Query[];

  constructor(private queryService : QueryService,private route : ActivatedRoute , private router : Router) { }

  ngOnInit() {
    this.queryService.getQueries().subscribe((response : Query[])=>{
      this.queries = response;
     });
   
    this.queryService.queriesChanged.subscribe(
      (queries : Query[])=>{
        this.queries = queries;
      }
    );
  }

  onNewQueryClick(){
    this.router.navigate(['new'],{relativeTo : this.route})
  }

 

}
