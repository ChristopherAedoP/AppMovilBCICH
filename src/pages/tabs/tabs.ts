import { Component } from '@angular/core';

// import { AboutPage } from '../about/about';
// import { ContactPage } from '../contact/contact';
// import { HomePage } from '../home/home';
import { CreditoHipotecarioPage } from '../credito-hipotecario/credito-hipotecario';
import { SimularCreditoHipotecarioPage } from '../simular-credito-hipotecario/simular-credito-hipotecario';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = CreditoHipotecarioPage;
   tab2Root = SimularCreditoHipotecarioPage;
  // tab3Root = ContactPage;

  constructor() {

  }
}
