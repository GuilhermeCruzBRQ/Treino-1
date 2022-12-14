import { Component } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';
import { usuarioModel } from '../models/modelos';
import { CadastroService } from '../services/cadastro/cadastro.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  // variavel que guarda o que tem nos inputs
  form!: FormGroup;
  // variavel que guarda a lista de usuario
  listaUsuario!: usuarioModel[]; 

  // listar elementos
  // injetando serviço dentro do componente

  constructor(private servicocadastro:CadastroService, private formbuilder:FormBuilder){}
  // metodo que é executado quando o componente abre
  ngOnInit(){
    // fazendo conecção entre ts e html
    this.form = this.formbuilder.group({
      nome: "",
      email: "",
      senha: ""
    })

    this.cadastrarUsuarios()
  }

  // função para pegar usuarios da API
  cadastrarUsuarios(){
    this.servicocadastro.getCadastro().subscribe({
      next:(usuario: any)=>{
        // oque vai acontecer quando der certo?
        this.listaUsuario = usuario;
        console.log(this.listaUsuario);
      },

      // caso de errado
      error:(erro: any)=>{
        console.log('deu ruim1 ');
      }
    })
  }

  // Função para postar informações das Inputs na API
  postarUsuario(){
    // pegar indormações dos inputs
    let nomeInput = this.form.controls["nome"].value
    let emailInput = this.form.controls["email"].value
    let senhaInput = this.form.controls["senha"].value

    // criando variavel para  pegar id corretamente sem se repetir 
    let idcorrer = ((this.listaUsuario[(this.listaUsuario.length)-1].id)+1)
    
    let dados={
      id: idcorrer,
      nome: nomeInput,
      email:emailInput,
      senha:senhaInput
    }

    this.servicocadastro.postCadastro(dados).subscribe({
      // oque vai acontecer quando der certo?
      next:(usuario: usuarioModel[]) => {
        // guardando os dados na variavel listaUsuarios
        console.log(usuario);
        this.cadastrarUsuarios()
      },

      // caso de errado
      error:(erro: any)=>{
        console.log('deu ruim');
      }
    })
  }
}
