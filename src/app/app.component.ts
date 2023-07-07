import { Component } from '@angular/core';
import { ApiService } from './service/api-http.service';
import { Histo } from "./interface/histo";
import { faCalendar, faGasPump, faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import { ECharts, EChartsOption } from 'echarts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'fuelMonitoringWebApp-wui';

  faLongArrowAltRight = faLongArrowAltRight;
  faCalendar = faCalendar;
  faGasPump = faGasPump;

  today!: Histo;
  yesterday!: Histo;

  public chart: any;
  public monDictionnaire: { [key: string]: number[] } = {};

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getByMinusDays(1).subscribe(res => {
      this.today = res;
      this.apiService.getByMinusDays(2).subscribe(res => {
        this.yesterday = res;

        this.monDictionnaire["Gazole"] = [this.today.Gazole, Number(this.calculerVariationPrix("Gazole").toFixed(3))];
        this.monDictionnaire["SP98"] = [this.today.SP98, Number(this.calculerVariationPrix("SP98").toFixed(3))];
        this.monDictionnaire["SP95"] = [this.today.SP95, Number(this.calculerVariationPrix("SP95").toFixed(3))];
        this.monDictionnaire["E85"] = [this.today.E85, Number(this.calculerVariationPrix("E85").toFixed(3))];
  
      }); 
    });

    this.createChart();

  }





  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  public isVariationPositive(variation: number) : boolean{
    if(variation > 0){
      return true;
    }else{
      return false;
    }
  }

  private calculerVariationPrix(typeCarburant: string) : number{
    switch (typeCarburant) {
      case "Gazole":
        return ((this.today.Gazole - this.yesterday.Gazole) / this.yesterday.Gazole) * 100;
      case "SP98":
        return ((this.today.SP98 - this.yesterday.SP98) / this.yesterday.SP98) * 100;
      case "SP95":
        return ((this.today.SP95 - this.yesterday.SP95) / this.yesterday.SP95) * 100;
      case "E85":
        return ((this.today.E85 - this.yesterday.E85) / this.yesterday.E85) * 100;
    }
    return 0;
  }


  options!: EChartsOption;
  
  createChart(){
    const xAxisData = [];
    const data1 = [];
    const data2 = [];

    for (let i = 0; i < 100; i++) {
      xAxisData.push('category' + i);
      data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
      data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
    }

    this.options = {
      legend: {
        data: ['bar', 'bar2'],
        align: 'left',
      },
      tooltip: {},
      xAxis: {
        data: xAxisData,
        silent: false,
        splitLine: {
          show: false,
        },
      },
      yAxis: {},
      series: [
        {
          name: 'bar',
          type: 'bar',
          data: data1,
          animationDelay: idx => idx * 10,
        },
        {
          name: 'bar2',
          type: 'bar',
          data: data2,
          animationDelay: idx => idx * 10 + 100,
        },
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: idx => idx * 5,
    };
  }
  
}
