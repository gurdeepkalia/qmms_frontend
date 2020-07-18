import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { QueriesComponent } from './queries/queries.component';
import { QueryStartComponent } from './queries/query-start/query-start.component';
import { QueryEditComponent } from './queries/query-edit/query-edit.component';
import { QueryDetailsComponent } from './queries/query-details/query-details.component';
import { HomeComponent } from './home/home.component';
import { SQSComponent } from './queries/sqs/sqs.component';


const appRoutes : Routes = [
    {path : '' , redirectTo : '/home' , pathMatch : 'full'},
    {path : 'home' , component : HomeComponent},
    {path : 'queries' , component : QueriesComponent , children : [
        {path : '' , component : QueryStartComponent},
        {path : 'new' , component : QueryEditComponent},
        {path : ':queryId' , component : QueryDetailsComponent},
        {path : ':queryId/edit' , component : QueryEditComponent},
        {path : ':queryId/sqs' , component : SQSComponent}
    ]}

];

@NgModule({
    imports : [RouterModule.forRoot(appRoutes)],
    exports : [RouterModule]
})
export class AppRoutingModule{

}