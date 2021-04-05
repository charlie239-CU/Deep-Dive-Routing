import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { canComponentDeactivate } from './can-deactivate-guard.service'
import { ServersService } from '../servers.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, canComponentDeactivate{
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  getId:number
  allowEdit=false;
  changesSaved=false;
  constructor(private serversService: ServersService,private activedUrl:ActivatedRoute,
    private router:Router) { }

  ngOnInit() {
    this.getId=+this.activedUrl.snapshot.params['id']
    this.server = this.serversService.getServer(this.getId);

    this.activedUrl.params.subscribe((params:Params)=>{
      this.getId=params['id']
    })

    this.serverName = this.server.name;
    this.serverStatus = this.server.status;

    console.log(this.activedUrl.snapshot.queryParams)
    this.allowEdit=this.activedUrl.snapshot.queryParams['allowEdit']==='1'?true:false
    this.activedUrl.queryParams.subscribe((queryParams:Params)=>{
      this.allowEdit=queryParams['allowEdit']==='1'?true:false
    })
    console.log("query:"+this.allowEdit)
    this.activedUrl.fragment.subscribe()
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changesSaved=true
    this.router.navigate(['/'],{relativeTo:this.activedUrl})
  }
  canDeactivate():Observable<boolean> | Promise<boolean> | boolean{
      if(!this.allowEdit)
          return true;
      if(((this.serverName!==this.server.name)||(this.serverStatus!==this.server.status)) && !this.changesSaved)
      {
          return confirm("Do you want to Discard this change")
      }
      else{
        return true
      }
  }

}
