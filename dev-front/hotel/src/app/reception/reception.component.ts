import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Subscription } from 'rxjs';
import { RoomService } from '../shared/room.service';

@Component({
  selector: 'ew-angular-reception',
  templateUrl: './reception.component.html',
  styleUrls: ['./reception.component.scss'],
})
export class ReceptionComponent implements OnInit, OnDestroy {
  ngOnInit(): void {}
  totalRooms: number = 0;
  private roomsSubscriber: Subscription;

  constructor(private roomService: RoomService) {
    this.roomsSubscriber = this.roomService.rooms$
      .pipe(map((x) => x.length))
      .subscribe((x) => (this.totalRooms = x));
  }
  ngOnDestroy(): void {
    this.roomsSubscriber.unsubscribe();
  }

  addNewRoom() {
    this.roomService.addRoom();
  }
}
