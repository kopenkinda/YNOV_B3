import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ew-angular-fridge',
  templateUrl: './fridge.component.html',
  styleUrls: ['./fridge.component.scss'],
})
export class FridgeComponent implements OnInit {
  constructor() {}

  @Input() isAvailable: boolean = false;

  @Output() takeABottleEvent = new EventEmitter<number>();

  bottleCount = 10;

  public takeABottle() {
    if (--this.bottleCount <= 5) {
      this.takeABottleEvent.emit(this.bottleCount);
    }
  }

  ngOnInit(): void {}
}
