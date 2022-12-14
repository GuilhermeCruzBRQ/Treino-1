import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { usuarioModel } from '../../models/modelos';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  // Gerando a rota da API
  url:string = 'http://localhost:3000/usuarios'
  // HTTPclient = Fatch => interage com a API
  constructor(private httpclient: HttpClient) { }

  // gerando o metado de pegar dados
  getCadastro(): Observable<usuarioModel[]>{ //Observable monitora o que acontece com o metado, oque acontece depois, durante, caso de erro 
    // para acessar API
    return this.httpclient.get<usuarioModel[]>(this.url)
  }

  // gerando o metado para  postar
  postCadastro(dados: any): Observable<usuarioModel[]>{
    return this.httpclient.post<usuarioModel[]>(this.url, dados)
  }
}
