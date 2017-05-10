import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CartaoCreditoComponent } from './cartao-credito/cartao-credito.component';
import { RouterModule, Routes } from "@angular/router";
import { PoupancaComponent } from './poupanca/poupanca.component';

const appRoutes: Routes = [
  {path: 'cartao-credito', component: CartaoCreditoComponent},
  {path: 'poupanca', component: PoupancaComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    CartaoCreditoComponent,
    PoupancaComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
