import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IRoom } from '../room/room.interface';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  private _rooms: BehaviorSubject<IRoom[]> = new BehaviorSubject([
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
  ]);

  get rooms$() {
    return this._rooms;
  }

  getRooms(): BehaviorSubject<IRoom[]> {
    return this._rooms;
  }

  deleteRoom(id: number): void {
    this._rooms.next(this._rooms.getValue().filter((room) => room.id !== id));
  }

  addRoom(room: IRoom): void {
    const found = this._rooms.getValue().find((r) => room.id === r.id);
    if (!found) {
      this._rooms.next([...this._rooms.getValue(), room]);
    }
  }

  constructor() {}
}
