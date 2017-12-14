import { Injectable } from '@angular/core';

import { Http, Headers } from '@angular/http';
import 'rxjs/Rx'; // Map
import { Observable } from "rxjs/Observable";
// import { Firmante } from '../components/models/firmante';
import { GLOBAL } from './global';
import { datosSimulacionCredito } from '../models/datosSimulacionCredito';



import { forkJoin } from "rxjs/observable/forkJoin";
// import { Injectable } from "@angular/core";
import {
  // Http,
  Response,
  // Headers,
  // RequestOptions,
} from "@angular/http";
import "rxjs/add/operator/toPromise";
import { Credito } from '../models/credito';

@Injectable()
export class ApiBCIService {
  private urlHostAPI = "";

  constructor(private _http: Http) {
    this.urlHostAPI = GLOBAL.urlAPI;
  }

  getCreditosHipotecarios() {
    const _url = `${this.urlHostAPI}/creditos-hipotecarios/`;

    const headers = new Headers({
      Accept: "application/json",
      "X-IBM-Client-Id": GLOBAL.clientId
    });

    return this._http
      .get(_url, { headers })
      .map(res => res.json())
      .catch((error: any) =>
        Observable.throw(error.json().error || "Server error")
      );
  }

  GetSimulacionCredito(simulacion: datosSimulacionCredito) {

    const _url = `${this.urlHostAPI}/creditos-hipotecarios/`;

    const headers = new Headers({
      Accept: "application/json",
      'Content-Type': 'application/json',
      "X-IBM-Client-Id": GLOBAL.clientId
    });

    let creditos = this._http
      .get(_url, { headers })
      .map(res => {
        return res.json();
      });

    const body = JSON.stringify(simulacion);
    var creditosHipotecarios = [];
    var listaSimulaciones = [];
    var _creditos;

    return new Promise((resolve, reject) => {
        creditos.subscribe(
          data => {
            _creditos = data;
            // console.log(_creditos);
            data.forEach(credito => {
              const _url = `${this
                .urlHostAPI}/creditos-hipotecarios/${credito.id}/simulaciones `;

              var promise = this._http
                .post(_url, body, { headers })
                .map((res: Response) => res.json());

              creditosHipotecarios.push(promise);
            });

            forkJoin(creditosHipotecarios).subscribe(results => {
              // console.log(results);
              let i = 0;
              results.forEach(simulacion => {
                listaSimulaciones.push(
                  new Credito(
                    _creditos[i].id,
                    _creditos[i].nombre,
                    _creditos[i].descripcion,
                    simulacion
                  )
                );
                i = i + 1;
              });

              resolve(listaSimulaciones);
            });
          },
          Error => {
            console.log(Error);
            reject(Error);
          }
        );
    });

  }

}
