import { Component, OnInit } from '@angular/core';
import {ApiHttpService} from "../service/api-http.service";
import {Histo} from "../interface/histo";
import { faGasPump } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-fuel-price',
  templateUrl: './fuel-price.component.html',
  styleUrls: ['./fuel-price.component.scss']
})
export class FuelPriceComponent implements OnInit {

  faGasPump = faGasPump;

  private histo: Histo[] = [];

  constructor(private api: ApiHttpService) { }

  ngOnInit(): void {
    this.api.get2Lasts().subscribe(data =>{
      this.histo = data;
      console.log(this.histo);
    });
  }

}
