import { Component } from '@angular/core';
import { ApiService } from './service/api-http.service';
import { Histo } from "./interface/histo";
import { faCalendar, faGasPump, faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import { ECharts, EChartsOption } from 'echarts';
import { AnimationOptions } from 'ngx-lottie';
import { PrixFrance } from './interface/PrixFrance';
import { FormattedPrixFrance } from './interface/FormattedPrixFrance';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'fuelMonitoringWebApp-wui';

  //Logos font awesome
  faLongArrowAltRight = faLongArrowAltRight;
  faCalendar = faCalendar;
  faGasPump = faGasPump;

  //Variables relativent au graphique.
  chart: any;
  options!: EChartsOption;

  private myDatas: PrixFrance[] = []; //Données récupérées depuis le backend.
  formattedData: FormattedPrixFrance[] = []; //Données formatées.

  animationsOptions: AnimationOptions = {
    path: '/assets/liveAnimation.json', 
  };

  constructor(private apiService: ApiService) {}


  ngOnInit() {

    //Je récupère toutes les données des prix moyens en France.
    this.apiService.getPrixFrance().subscribe(res => {
      this.myDatas = res;
      
      //Je formatte les données au format souhaité (classe FormattedPrixFrance).
      this.myDatas.forEach(item => {
        const formattedItem = this.formattedData.find(data => 
          data.Carburant === item.Type
          );

        if (formattedItem) {
          formattedItem.Datas.push({ Date: this.formatDate(item.Date), Prix: item.PrixMoyen });
        } else {
          this.formattedData.push(new FormattedPrixFrance(item.Type, [{ Date: this.formatDate(item.Date), Prix: item.PrixMoyen }]));
        }
      });

      //console.log(this.formattedData);

    });

    //Création du graphique.
    this.createChart();

  }

  //Retourne si la variation de prix est positive ou négative.
  public isVariationPositive(typeCarburant: string) : boolean{
    var element = this.formattedData.filter(element => element.Carburant == typeCarburant)[0];
    if(((element.Datas[element.Datas.length-1].Prix - element.Datas[element.Datas.length-2].Prix) / element.Datas[element.Datas.length-2].Prix) * 100 > 0){
      return true;
    }else{
      return false;
    }
  }

  //Calcul la variation de prix entre aujourd'hui et hier.
  public calculerVariationPrix(typeCarburant: string) : number{
    var element = this.formattedData.filter(element => element.Carburant == typeCarburant)[0];
        return ((element.Datas[element.Datas.length-1].Prix - element.Datas[element.Datas.length-2].Prix) / element.Datas[element.Datas.length-2].Prix) * 100; 
  }


  
  createChart(){
    var mesHisto: Histo[] = [];
    
    var yAxisGazole:number[] = [];
    var yAxisSP98:number[] = [];
    var yAxisSP95:number[] = [];
    var yAxisE85:number[] = [];

    var xAxis:string[] = [];

    this.apiService.getAll().subscribe(res => {
      mesHisto = res;
      mesHisto.forEach((item) => {
        xAxis.push(this.formatDate(item.Date));
        yAxisGazole.push(item.Gazole);
        yAxisSP98.push(item.SP98);
        yAxisSP95.push(item.SP95);
        yAxisE85.push(item.E85);
      })

      this.options = {
        legend: {
          data: ['Gazole', 'SP98', 'SP95', 'E85']
        },

        tooltip: {
          trigger: 'axis'
        },

        xAxis: {
          type: 'category',
          data: xAxis,
          axisLabel: {
            show: true,
            interval: 0,
            rotate: 45,
          },
        },
        yAxis: {
          type: 'value',
          min: 'auto',
          show: true
        },

        series: [
          {
            type: 'line',
            name: 'Gazole',
            data: yAxisGazole,
            showSymbol: false
          },
          {
            type: 'line',
            name: 'SP98',
            data: yAxisSP98,
            showSymbol: false,
          },
          {
            type: 'line',
            name: 'SP95',
            data: yAxisSP95,
            showSymbol: false
          },
          {
            type: 'line',
            name: 'E85',
            data: yAxisE85,
            showSymbol: false
          }
        ]
      };

    });

  }

  private formatDate(inputDate: string): string{
    const dateObj = new Date(inputDate);
    
    const day = dateObj.getDate().toString().padStart(2, '0');
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const year = dateObj.getFullYear().toString();

    return `${day}/${month}/${year}`;
  }

}
