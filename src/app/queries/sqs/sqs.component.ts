import { Component, OnInit } from '@angular/core';
import { QueryService } from '../query.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import {saveAs} from 'file-saver';

@Component({
  selector: 'app-sqs',
  templateUrl: './sqs.component.html',
  styleUrls: ['./sqs.component.css']
})
export class SQSComponent implements OnInit {

  queryId : string;
  sqsJson : any;

  constructor(private queryService : QueryService,private route : ActivatedRoute,private router : Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params : Params)=>{
        this.queryId = params['queryId'];
        this.queryService.getSqs(this.queryId).subscribe((response : Response)=>{
         this.sqsJson = response;
        });
      }
    );
  }

  onDownloadClick(){
    const blb = new Blob([JSON.stringify(this.sqsJson)],{type : "application/json"});
    saveAs(blb,this.queryId.toLowerCase());
  }



}
