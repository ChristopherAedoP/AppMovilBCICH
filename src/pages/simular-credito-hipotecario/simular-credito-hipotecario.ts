import { Component } from "@angular/core";
import {
  AlertController,
  NavController,
  NavParams,
  LoadingController
} from "ionic-angular";
import { ComunesService } from "../../app/services/Comunes.services";
import { datosSimulacionCredito } from "../../app/models/datosSimulacionCredito";
import { ApiBCIService } from "../../app/services/ApiBCI.services";
import { DetalleSimulacionPage } from "../detalle-simulacion/detalle-simulacion";

@Component({
  selector: "page-simular-credito-hipotecario",
  templateUrl: "simular-credito-hipotecario.html"
})
export class SimularCreditoHipotecarioPage {
  public valorPropiedadUf = 500;
  public montoCreditoUf = 500;
  public plazo = 5;
  public singleValue4;

  public regiones;
  public codregion;
  public comuna;
  public simulacion: datosSimulacionCredito;
  public porcentaje: number = 100;
  public dynamicColor = "light";
  public loading;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public _sc: ComunesService,
    public _as: ApiBCIService,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ) {
    this.getRegiones();
    this.simulacion = new datosSimulacionCredito(
      "",
      "",
      "",
      "",
      "",
      600,
      600,
      5,
      false,
      0,
      "",
      ""
    );
       if (this.porcentaje > 90) {
         this.dynamicColor = "danger";
       } else {
         this.dynamicColor = "light";
       }
  }
  presentLoadingDefault() {
    this.loading = this.loadingCtrl.create({
      content: "Generando Simulación...."
    });

    this.loading.present();
  }
  getRegiones() {
    this._sc.getRegiones().subscribe(
      data => {
        // console.log(data.regiones);
        this.regiones = data.regiones;
      },
      Error => {
        console.log(Error);
      }
    );
  }
  btnSimular() {
    let mensaje = "";
    if (this.porcentaje > 90) {
      mensaje = `<li> El porcentaje máximo de financiamiento debeser menor al 90% de la propiedad. </li>`;
    }
    if (!this.codregion) {
      mensaje = mensaje + `<li> Debe indicar una region. </li>`;
    }

    if (!this.comuna) {
      mensaje = mensaje + `<li> Debe indicar una comuna. </li>`;
    }

    if (mensaje != "") {
      let alert = this.alertCtrl.create({
        title: "Corregir",
        subTitle: `<ul> ${mensaje} </ul>`,
        buttons: ["OK"]
      });

      alert.present();
    } else {
      this.simulacion.region = this.codregion;
      this.simulacion.comuna = this.comuna.trim();
      console.log(this.simulacion);
      this.GetSimulacionCredito();
    }
  }

  GetSimulacionCredito() {
    this.presentLoadingDefault();
    this._as
      .GetSimulacionCredito(this.simulacion)
      .then(data => {
        console.log("data", data);
        this.loading.dismiss();
        this.navCtrl.push(DetalleSimulacionPage, { data });
      })
      .catch(err => {
        console.log("err", err);
        this.loading.dismiss();
      });
  }

  calculoProcentaje(event) {
    this.porcentaje =
      <any>this.simulacion.montoCreditoUf /
      <any>this.simulacion.valorPropiedadUf *
      100;

    if (this.porcentaje > 90) {
      this.dynamicColor = "danger";
    } else {
      this.dynamicColor = "light";
    }
  }
  onSubmit(SimulacionForm) {}
}
