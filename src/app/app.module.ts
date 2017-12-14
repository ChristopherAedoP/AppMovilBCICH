import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ApiBCIService } from './services/ApiBCI.services';
import { CreditoHipotecarioPage } from '../pages/credito-hipotecario/credito-hipotecario';
import { DetalleCreditoHipotecarioPage } from '../pages/detalle-credito-hipotecario/detalle-credito-hipotecario';
import { SimularCreditoHipotecarioPage } from '../pages/simular-credito-hipotecario/simular-credito-hipotecario';
import { ComunesService } from './services/Comunes.services';
import { ComunasPipe } from './pipes/comunas.pipe';
import { DetalleSimulacionPage } from '../pages/detalle-simulacion/detalle-simulacion';



@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    CreditoHipotecarioPage,
    DetalleCreditoHipotecarioPage,
    SimularCreditoHipotecarioPage,
    DetalleSimulacionPage,
    ComunasPipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    CreditoHipotecarioPage,
    DetalleCreditoHipotecarioPage,
    SimularCreditoHipotecarioPage,
    DetalleSimulacionPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ApiBCIService,
    ComunesService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
