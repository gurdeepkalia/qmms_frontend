import { Component, OnInit } from '@angular/core';
import { QueryService } from '../query.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { Query } from 'src/app/models/query.model';
import { Frequency, Status } from 'src/app/models/app-enums.model';

@Component({
  selector: 'app-query-edit',
  templateUrl: './query-edit.component.html',
  styleUrls: ['./query-edit.component.css']
})
export class QueryEditComponent implements OnInit {

  queryId : string;
  editMode : boolean = false;
  queryForm : FormGroup;
  queryItem : Query;
  freqKeys : any[];
  frequencies : Frequency;

  constructor(private queryService : QueryService,private route : ActivatedRoute,private router : Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params : Params)=>{
        this.queryId = params['queryId'];
        this.editMode = this.queryId != null;
        this.initForm();
      }
    );
  }

  private initForm(){
    let queryId = '';
    let query = '';
    let freq='';
    let status='';
    let optyVer='';
    let attributes=new FormArray([]);

    if(this.editMode){
      //const queryItem = this.queryService.getQuery(this.queryId);
      this.queryService.getQuery(this.queryId).subscribe((response:Query)=>{
        this.queryItem = response;
        this.freqKeys = Object.keys(this.queryItem.freq);
        queryId = this.queryItem.queryId;
        query = this.queryItem.query;
        freq = this.queryItem.freq;
        status = this.queryItem.status;
        optyVer = this.queryItem.optyVer;
        if(this.queryItem['attributes']){
          for(let attribute of this.queryItem.attributes){
            attributes.push(
              new FormGroup({
                'queryAttribute' : new FormControl(attribute.queryAttribute),
                'attributeDatatype' : new FormControl(attribute.attributeDatatype),
                'columnNumber' : new FormControl(attribute.columnNumber)
              })
            );
          }
        }
        this.queryForm = new FormGroup({
          'queryId' : new FormControl(queryId),
          'query' : new FormControl(query),
          'freq' : new FormControl(freq),
          'status' : new FormControl(status),
          'optyVer' : new FormControl(optyVer),
          'attributes' : attributes
        });
      });
    }
    else
    {
      this.queryForm = new FormGroup({
        'queryId' : new FormControl(queryId),
        'query' : new FormControl(query),
        'freq' : new FormControl(freq),
        'status' : new FormControl(status),
        'optyVer' : new FormControl(optyVer),
        'attributes' : attributes
      });
    }

    
  }


  onSubmit(){
    console.log(this.queryForm);
    const newQuery = new Query(
      this.queryForm.value['queryId'],
      this.queryForm.value['query'],
      Frequency[<string>(this.queryForm.value['freq'])],
      Status[<string>(this.queryForm.value['status'])],
      this.queryForm.value['optyVer'],
      new Date(),
      new Date(),
      this.queryForm.value['attributes']
      );
    if(this.editMode){
      console.log("New Query : " +newQuery);
      console.log("Hello1");
      this.queryService.updateQuery(this.queryId,newQuery);
    }
    else{
      this.queryService.addQuery(newQuery);
    }
    this.onCancel();
  }

  onCancel(){
    this.router.navigate(['../'],{relativeTo:this.route});
  }

  getAttributeControls(){
    return (<FormArray>this.queryForm.get('attributes')).controls;
  }

  onAddAttributeClick(){
    (<FormArray>this.queryForm.get('attributes')).push(
      new FormGroup({
        'queryAttribute' : new FormControl(null),
        'attributeDatatype' : new FormControl(null),
        'columnNumber' : new FormControl(null)
      })
    );
  }

  onDeleteAttributeClick(index : number){
    (<FormArray>this.queryForm.get('attributes')).removeAt(index);
  }
}
