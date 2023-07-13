/*interface data {
  [type: string] : {
    date: Date,
    prix: number,
  }[]
}*/

export class FormattedPrixFrance {

  constructor(Carburant: string, Datas: {Date: string, Prix: number}[]){
    this.Carburant = Carburant;
    this.Datas = Datas;
  }

  Carburant: string
  Datas: {
    Date: string,
    Prix: number,
  }[]
}

/*"SP95": [ {"id": "1", "prix": 10},,,,],
"SP85": [ {"id": "1", "prix": 10},,,,]*/