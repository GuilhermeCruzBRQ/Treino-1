import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  // Gerando a rota da API
  url:string = 'http://localhost:3000/db'
  // HTTPclient = Fatch => interage com a API
  constructor(private httpclient: HttpClient) { }

  // gerando o metado de pegar dados
  getCadastro(): Observable<any>{ //Observable monitora o que acontece com o metado, oque acontece depois, durante, caso de erro 
    // para acessar API
    return this.httpclient.get(this.url)
  }

  // gerando o metado para  postar
  postCdastro(dados: any): Observable<any>{
    return this.httpclient.post(this.url, dados)
  }
}
