import { Component, Input, OnInit } from '@angular/core';
import { RoomService } from '../shared/room.service';

@Component({
  selector: 'ew-angular-room',
  templateUrl: './room.component.html',
  styleUrls: [],
})
export class RoomComponent implements OnInit {
  constructor(private roomService: RoomService) {}

  @Input() id: number;

  public get isAvailable(): boolean {
    return this.guest.trim().toLowerCase().includes('dmitrii');
  }

  isDoNotDisturb = false;
  guest = '';

  public onDelete() {
    this.roomService.deleteRoom(this.id);
  }

  public onBottleCountChange(count: number) {
    console.log(`Bottle count changed to ${count}`);
  }

  public call() {
    console.log(
      `Knock-knock %c${this.guest}`,
      'color:red;font-size:24px;background: white;'
    );
  }

  ngOnInit(): void {}
}
