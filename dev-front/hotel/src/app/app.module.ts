import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RoomComponent } from './room/room.component';
import { FridgeComponent } from './fridge/fridge.component';
import { ReceptionComponent } from './reception/reception.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    RoomComponent,
    FridgeComponent,
    ReceptionComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, SharedModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
