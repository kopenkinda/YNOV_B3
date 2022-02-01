import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRoom } from '../room/room.interface';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  private _rooms: IRoom[] = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];

  getRooms() {
    return new Observable<IRoom[]>((observer) => {
      let i = 0;
      const intervalMs = 330;
      const it = setInterval(() => {
        if (this._rooms.length === i) {
          observer.complete();
          clearInterval(it);
          return;
        }
        observer.next(this._rooms.slice(0, ++i));
      }, intervalMs);
    });
  }
  constructor() {}
}
