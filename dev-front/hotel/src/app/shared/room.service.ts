import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IRoom } from '../room/room.interface';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  private lastId = 4;
  private _rooms: BehaviorSubject<IRoom[]> = new BehaviorSubject([
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
  ]);

  get rooms$() {
    return this._rooms;
  }

  deleteRoom(id: number): void {
    this._rooms.next(this._rooms.getValue().filter((room) => room.id !== id));
  }

  addRoom(): void {
    this._rooms.next([...this._rooms.getValue(), { id: ++this.lastId }]);
  }

  constructor() {}
}
