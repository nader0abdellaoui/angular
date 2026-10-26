import { Routes } from '@angular/router';
import { Home } from './home/home';
import { ConferanceList } from './conferance-list/conferance-list';
import { Notfound } from './notfound/notfound';
import { ConferanceDetails } from './conferance-details/conferance-details';
import { AddUser } from './add-user/add-user';
import { AddCoferance } from './add-coferance/add-coferance';
import { UpdateConferance } from './update-conferance/update-conferance';

export const routes: Routes = [
    {path:'home',component:Home},

  {path:'details/:id', component:ConferanceDetails},

  
    {path:'list',component:ConferanceList},
    {path:'',redirectTo:'home',pathMatch:'full'},
{path:'add',component: AddCoferance},
{path:'update/:id', component: UpdateConferance},
    {path:'**',component:Notfound},

];
