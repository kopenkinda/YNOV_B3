import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IRoom } from './room/room.interface';
import { RoomService } from './shared/room.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [],
  providers: [RoomService],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private roomService: RoomService) {}
  rooms: IRoom[] = [];
  roomsSubscription: Subscription;
  ngOnInit(): void {
    this.roomsSubscription = this.roomService.rooms$.subscribe((rooms) => {
      this.rooms = rooms;
    });
  }
  ngOnDestroy(): void {
    this.roomsSubscription.unsubscribe();
  }
}
