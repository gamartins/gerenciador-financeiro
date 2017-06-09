import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { environment } from "../environments/environment";

import { AppComponent } from './app.component';
import { CartaoCreditoComponent } from './cartao-credito/cartao-credito.component';
import { RouterModule, Routes } from "@angular/router";
import { PoupancaComponent } from './poupanca/poupanca.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';


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
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
