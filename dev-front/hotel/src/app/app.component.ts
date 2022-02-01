import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IRoom } from './room/room.interface';
import { RoomService } from './shared/room.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [RoomService],
})
export class AppComponent implements OnInit {
  constructor(private roomService: RoomService) {}
  rooms: IRoom[] = [];
  rooms$: BehaviorSubject<IRoom[]> = this.roomService.rooms$;
  ngOnInit(): void {
    this.rooms$.subscribe((rooms) => {
      this.rooms = rooms;
    });
  }
}
