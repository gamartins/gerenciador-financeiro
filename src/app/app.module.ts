import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { CartaoCreditoComponent } from './cartao-credito/cartao-credito.component';
import { RouterModule, Routes } from '@angular/router';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { LancamentoComponent } from './lancamento/lancamento.component';
import { SigninComponent } from './signin/signin.component';
import { AuthService } from './services/auth.service';
import { AplicacoesFinanceirasComponent } from './aplicacoes-financeiras/aplicacoes-financeiras.component';
import { SignupComponent } from './signup/signup.component';

const appRoutes: Routes = [
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'cartao-credito', component: CartaoCreditoComponent, canActivate: [AuthService] },
  { path: 'lancamentos', component: LancamentoComponent, canActivate: [AuthService] },
  { 
    path: 'poupanca',
    component: AplicacoesFinanceirasComponent,
    canActivate: [AuthService],
    data: { tipoInvestimento: '/poupanca' },
  },
  { 
    path: 'investimentos',
    component: AplicacoesFinanceirasComponent,
    canActivate: [AuthService],
    data: { tipoInvestimento: '/investimento' },
  },
  {
    path: 'emprestado',
    component: AplicacoesFinanceirasComponent,
    canActivate: [AuthService],
    data: { tipoInvestimento: '/emprestado' },
  },
];

@NgModule({
  declarations: [
    AppComponent,
    CartaoCreditoComponent,
    LancamentoComponent,
    SigninComponent,
    AplicacoesFinanceirasComponent,
    SignupComponent,
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule,
    HttpModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
