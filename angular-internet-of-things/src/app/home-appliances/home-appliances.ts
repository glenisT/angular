import { Observable } from "rxjs";

ngOnInit(): void{
    {
        this.service.getAppliances().subscribe(appliances =>{
            this.appliances = appliances
        });
    }
}

getAppliance(): Observable<Appliance[]>{
    return this.socketClient
      .onMessage('/topic/appliances/get')
}