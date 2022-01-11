import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ew-angular-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements OnInit {
  constructor() {}

  @Input() id: number;

  public get isAvailable(): boolean {
    return this.guest.trim().toLowerCase().includes('dmitrii');
  }

  isDoNotDisturb = false;
  guest = '';

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
