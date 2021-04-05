import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';


import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};

  constructor(private serversService: ServersService,
    private activeRoute:ActivatedRoute,
    private router:Router
    ) { }

  ngOnInit() {
    // const id=Number(this.activeRoute.snapshot.params['id'])
    // console.log(typeof id)
    // this.server = this.serversService.getServer(id);
    // this.activeRoute.params.subscribe((pararms:Params)=>{
    //   this.server = this.serversService.getServer(Number(pararms['id']));
    // })
    this.activeRoute.data.subscribe((data:Data)=>{
      this.server=data['server']
    })
    // this.server = this.serversService.getServer(2);
     console.log(this.activeRoute.snapshot.params['id'])
  }

  onEdit(){
    this.router.navigate(['edit'],{relativeTo:this.activeRoute,queryParamsHandling:'preserve'})
  }
}
