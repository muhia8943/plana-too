import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { EventsComponent } from './admin/events/events.component';
import { UsersComponent } from './admin/users/users.component';
import { CreateEventsComponent } from './manager/create-events/create-events.component';
import { ManagerdashboardComponent } from './manager/managerdashboard/managerdashboard.component';
import { ViewBookingsComponent } from './manager/view-bookings/view-bookings.component';
import { ViewEventsComponent } from './manager/view-events/view-events.component';
import { UserdashboardComponent } from './users/userdashboard/userdashboard.component';
import { UserprofileComponent } from './users/userprofile/userprofile.component';
import { UserbookingsComponent } from './users/userbookings/userbookings.component';
import { ManagerprofileComponent } from './manager/managerprofile/managerprofile.component';
import { AdminprofileComponent } from './admin/adminprofile/adminprofile.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { CreateTicketsComponent } from './manager/create-tickets/create-tickets.component';

export const routes: Routes = [
    {path: '',component:LandingComponent},
    {path: 'landing', pathMatch: 'full',redirectTo:''},
    {path: 'login', component:LoginComponent},
    {path: 'register', component:RegisterComponent},
    {path: 'events', component:EventsComponent},
    {path: 'users', component:UsersComponent},
{path: 'adminprofile', component:AdminprofileComponent},
    {path: 'createevents', component:CreateEventsComponent},
    {path: 'manager', component:ManagerdashboardComponent},
    {path: 'viewbookings', component:ViewBookingsComponent},
    {path: 'viewevents', component:ViewEventsComponent},
    {path: 'userdashboard', component:UserdashboardComponent},
    {path: 'userprofile', component:UserprofileComponent},
    {path: 'userbookings', component:UserbookingsComponent},
    {path: 'managerprofile', component:ManagerprofileComponent},
    {path: 'bookings', component:UserbookingsComponent},
    {path: 'event/:id', component: EventDetailComponent},
    {path: 'createtickets', component: CreateTicketsComponent}
    
];
