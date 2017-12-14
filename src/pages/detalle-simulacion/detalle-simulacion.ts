import { Component } from "@angular/core";
import {
  AlertController,
  NavController,
  NavParams,
  LoadingController
} from "ionic-angular";

/**
 * Generated class for the DetalleSimulacionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-detalle-simulacion",
  templateUrl: "detalle-simulacion.html"
})
export class DetalleSimulacionPage {
  public lista;
  public loading;
  public _title;
  public _subTitle;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ) {
    this.lista = this.navParams.get("data");
  }

  btnPreAprovacion() {
    this.presentLoadingDefault();

    let alert_1 = this.alertCtrl.create({
      title: "Aprobado",
      subTitle:
        "Su crédito ha sido pre-aprobado, un ejecutivo se comunicara con usted.",
      buttons: ["OK"]
    });

    let alert_2 = this.alertCtrl.create({
      title: "En revisión",
      subTitle:
        "Su crédito solicitud de crédito será revisada, un ejecutivo se comunicara con usted.",
      buttons: ["OK"]
    });

    let res=   new Promise((resolve, reject) => {

          setTimeout(function() {
            var random_boolean = Math.random() >= 0.5;

            if (random_boolean) {
              resolve(random_boolean);
            } else {
              reject(random_boolean);
            }

            // this.loading.dismiss();
          }, 3000);
     });

    res
      .then(res => {
        this.loading.dismiss();
        alert_1.present();

      })
      .catch(res => {
         this.loading.dismiss();
        alert_2.present();

      });

  }
  public presentLoadingDefault() {
    this.loading = this.loadingCtrl.create({
      content: "Solicitando Pre Aprobación...."
    });

    this.loading.present();
  }
  mostarMensaje() {
    let alert = this.alertCtrl.create({
      title: this._title,
      subTitle: this._subTitle,
      buttons: ["OK"]
    });
    alert.present();
  }
}
