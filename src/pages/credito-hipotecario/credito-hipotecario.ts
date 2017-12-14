import { Component } from "@angular/core";
import { LoadingController, NavController, NavParams } from "ionic-angular";

import { ApiBCIService } from "../../app/services/ApiBCI.services";
import { DetalleCreditoHipotecarioPage } from "../detalle-credito-hipotecario/detalle-credito-hipotecario";
/**
 * Generated class for the CreditoHipotecarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-credito-hipotecario",
  templateUrl: "credito-hipotecario.html"
})
export class CreditoHipotecarioPage {
  public creditosHipotecarios;
  public loading;

  constructor(
    public _as: ApiBCIService,
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController
  ) {
    this.presentLoadingDefault();
    this.getCreditosHipotecarios();
  }
  presentLoadingDefault() {
    this.loading = this.loadingCtrl.create({
      content: "Obteniendo datos...."
    });

    this.loading.present();
  }

  getCreditosHipotecarios() {
    this._as.getCreditosHipotecarios().subscribe(
      data => {
        this.creditosHipotecarios = data;
        console.log(data);
        this.loading.dismiss();
      },
      Error => {
        console.log(Error);
        this.loading.dismiss();
      }
    );
  }

  detalleCredito(item) {
    console.log(item);
    this.navCtrl.push(DetalleCreditoHipotecarioPage);
  }
}
