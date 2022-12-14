import { Component } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';
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
  listaUsuario: any; 

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

  // função para cadastrar usuarios
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

  postarUsuario(){
    let nomeInput = this.form.controls["nome"].setValue
    let emailInput = this.form.controls["email"].setValue
    let senhaInput = this.form.controls["senha"].setValue

    let dados={
      id: 3,
      nome: nomeInput,
      email:emailInput,
      senha:senhaInput
    }

    this.servicocadastro.postCdastro(dados).subscribe({
      // oque vai acontecer quando der certo?
      next:(usuario: any) => {
        // guardando os dados na variavel listaUsuarios
        console.log(usuario);
        this.listaUsuario()
      },

      // caso de errado
      error:(erro: any)=>{
        console.log('deu ruim ');
      }
    })
  }
}
