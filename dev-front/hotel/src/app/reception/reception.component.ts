import { Component, OnInit } from '@angular/core';
import { RoomService } from '../shared/room.service';

@Component({
  selector: 'ew-angular-reception',
  templateUrl: './reception.component.html',
  styleUrls: ['./reception.component.scss'],
})
export class ReceptionComponent implements OnInit {
  constructor(private roomService: RoomService) {}

  ngOnInit(): void {}

  newRoomId: string;
  addNewRoom() {
    this.roomService.addRoom({ id: parseInt(this.newRoomId, 10) });
    this.newRoomId = '';
  }
}
