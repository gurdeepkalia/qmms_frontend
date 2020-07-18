import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Query } from 'src/app/models/query.model';
import { QueryService } from '../query.service';
import { QueryAttribute } from 'src/app/models/query-attribute.model';

@Component({
  selector: 'app-query-details',
  templateUrl: './query-details.component.html',
  styleUrls: ['./query-details.component.css']
})
export class QueryDetailsComponent implements OnInit {
  queryId : string;
  query : Query;

  constructor(private route : ActivatedRoute,private queryService : QueryService,private router : Router) { }

  ngOnInit() {
    this.route.params.subscribe((params : Params)=>{
      this.queryId = params['queryId'];
      this.queryService.getQuery(this.queryId).subscribe((response:Query)=>{
        this.query = response;
        //console.log(this.query);
      });
    });

    this.queryService.queryChanged.subscribe((response:Query)=>{
      this.query = response;
      console.log("Query : " +this.query);
    });
  }

  getAttributes() : QueryAttribute[]{
    //console.log(this.query.attributes);
    return this.query.attributes;
  }

  onEditClick(){
    this.router.navigate(['edit'],{relativeTo : this.route})
  }

  onDeleteClick(){
    this.queryService.deleteQuery(this.queryId);
    this.router.navigate(['/queries']);
  }

  onGenerateSQSClick(){
    this.router.navigate(['sqs'],{relativeTo : this.route});
  }

}
