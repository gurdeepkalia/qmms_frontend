import { Component, OnInit, Query, Input } from '@angular/core';

@Component({
  selector: 'app-query-item',
  templateUrl: './query-item.component.html',
  styleUrls: ['./query-item.component.css']
})
export class QueryItemComponent implements OnInit {

  @Input() query : Query;
  
  constructor() { }

  ngOnInit() {
    console.log(this.query);
  }

}
