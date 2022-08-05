import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { FuelPriceComponent } from './fuel-price/fuel-price.component';
import { FuelChartComponent } from './fuel-chart/fuel-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    FuelPriceComponent,
    FuelChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
