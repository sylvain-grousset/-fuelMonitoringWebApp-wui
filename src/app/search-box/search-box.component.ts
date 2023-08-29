import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, debounceTime, distinctUntilChanged, fromEvent, map, of, startWith, switchMap, tap } from 'rxjs';
import { ApiService } from '../service/api-http.service';
import { Commune } from '../interface/Commune';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {

  constructor(private apiService: ApiService) {

  }

  public animationsOptions: AnimationOptions = {
    path: '/assets/searchAnimation.json', 
  };

  control = new FormControl('');
  lesVilles: Commune[] = [];
  filteredVilles!: Observable<Commune[]>;

  ngOnInit() {
    this.apiService.getCommunes().subscribe(res => {
      this.lesVilles = res;
      this.filteredVilles = this.control.valueChanges.pipe(
        startWith(''),
        map(value => this.filter(value || '')),
      );
    });
      

    
  }

  //Filtre les données en fonction des inputs de l'utilisateur.
  private filter(value: string): Commune[] {
    const filterValue = this.normalizeValue(value);

    //Pour éviter d'afficher toutes les données.
    if(filterValue === ''){
      return [];
    }

    const inputValues = value.split(' ');

    return this.lesVilles.filter(uneVille => 
      inputValues.every(a => 
        this.normalizeValue(uneVille.ville).includes(a) || 
        this.normalizeValue(uneVille.code_postal).includes(a)
        )
      );
  }

  //Normalise les entrées
  private normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }
  
}
