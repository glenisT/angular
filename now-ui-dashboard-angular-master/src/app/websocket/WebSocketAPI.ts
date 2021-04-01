import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { _ } from 'ajv';

export class WebSocketAPI {
    webSocketEndPoint: string = 'http://localhost:8080/ws';  // endPoint created in spring consumer
    topic: string = "/topic/appliances/get";
    stompClient: any;
    
    applianceTopic:any = [

    ]

    actualTopic: string = "topic1"

    _disconnect() {
        if (this.stompClient !== null) {
            this.stompClient.disconnect();
        }
        console.log("Disconnected");
    }

    // on error, schedule a reconnection attempt
    errorCallBack(error) {
        console.log("errorCallBack -> " + error)
        setTimeout(() => {
            this.getAllAppliances(); //funksionon njelloj si connect
        }, 5000);
    }

    public ws: any;
    getAllAppliances(){
        console.log("Getting Appliances");
        this.ws = new SockJS(this.webSocketEndPoint);
        this.stompClient = Stomp.over(this.ws);
        const _this = this;
        _this.stompClient.connect({}, function (frame) {
            _this.stompClient.subscribe(_this.topic, function (message) {
                _this.onMessageReceived(message);
                console.log("******:: "+ message);
                
            });
        }, this.errorCallBack);
    }

 /**
  * Send message to sever via web socket
  * @param {*} message 
  */
    // _send(message) {
    //     console.log("calling logout api via web socket");
    //     console.log("----",message);
        
    //     this.stompClient.send("/app/sendMessage", {}); //Json.Stringify(message)
    // }

    resolveAfter2Seconds(x) {  
        return new Promise(resolve => {
          setTimeout(() => {
            resolve(x);
          }, 1000);
        });
    }

    onSend(destination: String) {
        this.getAllAppliances();
        this.resolveAfter2Seconds(20).then(() => {
            this.stompClient.send(destination, {}, "Message sent!");
        });  
    }

    onMessageReceived(message) {
        console.log(message);
    }
}