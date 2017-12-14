import { Injectable } from '@angular/core';

import { Http } from '@angular/http';
import 'rxjs/Rx'; // Map
import { Observable } from "rxjs/Observable";
// import { Firmante } from '../components/models/firmante';
// import { GLOBAL } from './global';

@Injectable()
export class ComunesService {
  // private urlHostAPI = '';

  constructor(private _http: Http) {
    // this.urlHostAPI = GLOBAL.urlAPI;
  }
  public getRegiones() {
    // this._http.get('/data/regionesycomunas.json').subscribe(data => {
    //   // console.log(data.json());
    //   this.cargada = true;
    //   this.info = data.json();
    // });

    return this._http.get('assets/data/regionesycomunas.json')
      .map(res => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  // getRegiones() {

  //   const _url = `http://apis.modernizacion.cl/dpa/regiones`;

  //   const headers = new Headers({
  //     'Access-Control-Allow-Origin':'*',
  //     'Content-Type': 'application/json'
  //   });

  //   return this._http.get(_url, { headers })
  //     .map(res => res.json())
  //     .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

  // }

  getComunas(codRegion: string) {

    const _url = `http://apis.modernizacion.cl/dpa/regiones/${codRegion}/comunas`;

    return this._http.get(_url)
      .map(res => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

  }

}
