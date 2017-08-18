import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { CartaoCreditoComponent } from './cartao-credito/cartao-credito.component';
import { RouterModule, Routes } from '@angular/router';
import { PoupancaComponent } from './poupanca/poupanca.component';
import { InvestimentoComponent } from './investimento/investimento.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { LancamentoComponent } from './lancamento/lancamento.component';


const appRoutes: Routes = [
  {path: 'cartao-credito', component: CartaoCreditoComponent},
  {path: 'poupanca', component: PoupancaComponent},
  {path: 'investimentos', component: InvestimentoComponent},
  {path: 'lancamentos', component: LancamentoComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    CartaoCreditoComponent,
    PoupancaComponent,
    InvestimentoComponent,
    LancamentoComponent,
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
