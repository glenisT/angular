import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { connect } from "node:http2";
import { BehaviorSubject, Observable } from "rxjs";

private client: Client;
private state : BehaviorSubject<SocketClientState>

constructor(){
    this.client = over(new SockJS ('http://localhost:8080/websocket'));
    this.state = new BehaviorSubject<SocketClientState>(SocketClientState.ATTEMPTING);
    this.client.connect({}, () => {
        this.state.next(SocketClientState.CONNECTED)
    })
}

connect():Observable<Client>{
    return new Observable<Client>(observer => {
        this.state.pipe(filter(state => state === SocketClientState.CONNECTED)).subscribe(() => {
            observer.next(this.client);
        })
    })
}

static jsonHandler(message: Message) : any{
    return JSON.parse(message.body);
}