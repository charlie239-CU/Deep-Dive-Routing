import { NgModule } from "@angular/core";
import { Routes,RouterModule } from "@angular/router";
import { AuthGuardService } from "./auth-guard.service";
import { ErrorPageComponent } from "./error-page/error-page.component";
import { HomeComponent } from "./home/home.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { CanDeactivateGuard } from "./servers/edit-server/can-deactivate-guard.service";
import { EditServerComponent } from "./servers/edit-server/edit-server.component";
import { ServerResolver } from "./servers/server/server-resolver.service";
import { ServerComponent } from "./servers/server/server.component";
import { ServersComponent } from "./servers/servers.component";
import { UserComponent } from "./users/user/user.component";
import { UsersComponent } from "./users/users.component";

const routes: Routes = [
    { path:'',component:HomeComponent },
    { path:'users',component:UsersComponent ,children:[
      { path:':id/:name',component:UserComponent },
    ]}, 
   
    { path:'servers',//canActivate:[AuthGuardService],
      canActivateChild:[AuthGuardService],
      component:ServersComponent , children:[
      { path:':id',component:ServerComponent ,resolve:{server:ServerResolver}},
      { path:':id/edit',component:EditServerComponent,canDeactivate:[CanDeactivateGuard] }
    ]},
   // { path:'not-found',component:NotFoundComponent },
    { path:'not-found',component:ErrorPageComponent, data:{message:'Page not found'} },
    { path:'**',redirectTo:'/not-found' }
  ];
  @NgModule({
    imports: [
       // RouterModule.forRoot(routes,{useHash:true}),
        RouterModule.forRoot(routes),
      ],
    exports:[RouterModule]
  })
  
export class AppRouterModule{

}