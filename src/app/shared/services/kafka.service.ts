import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Subject } from 'rxjs';

@Injectable()
export class KafkaService {
    private _kafka: Subject<any> = new Subject();
    constructor(private socket: Socket) {
        this.socket.on('kafka', (message) => {
            this._kafka.next(JSON.parse(message.value) || {});
        });
    }


    public get kafka() {
        return this._kafka;
    }
}
