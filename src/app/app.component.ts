import { Component } from '@angular/core';
import { QueryService } from './queries/query.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers : [QueryService]
})
export class AppComponent {
  title = 'QmmsFrontend';
}
