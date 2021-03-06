import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { MdSelectModule, MdInputModule, MdIconModule, MdToolbarModule, MdCardModule, MdGridListModule, MdListModule } from '@angular/material';
import { AppComponent } from './app.component';
import { PayComponent } from '../components/pay/pay.component';

@NgModule({
  declarations: [
    AppComponent,
    PayComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MdSelectModule,
    MdInputModule,
    MdIconModule,
    MdToolbarModule,
    MdCardModule,
    MdGridListModule,
    MdListModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
