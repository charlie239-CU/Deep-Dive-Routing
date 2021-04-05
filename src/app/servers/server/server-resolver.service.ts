import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { ServersService } from "../servers.service";

interface ServerData{
    id:number;
    name:string;
    status:string;
}
@Injectable()
export class ServerResolver implements Resolve<ServerData>{

    constructor(private serversService:ServersService){}

    resolve(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):Observable<ServerData>|
    Promise<ServerData>|ServerData
    {
        return this.serversService.getServer(+route.params['id'])
    }

}