import { Component } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { cadastrarModel } from '../models/modelos';
import { CadastroService } from '../services/cadastro/cadastro.service';


@Component({
  selector: 'app-home',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent {
  // variavel que guarda o que tem no formGroup
  form!: FormGroup;
  // variavel que guarda a lista de usuario da API
  listaUsuario!: cadastrarModel[]; 
  // criando variavel para checar se o input de nome está preenchidos
  inputNomeErro:boolean = false;
  // criando variavel para checar se o input de email está preenchidos
  inputEmailErro:boolean = false;
  // criando variavel para checar se o input de senha está preenchidos
  inputSenhaErro:boolean = false;
  // criando variavel para checar se as senhas estão iguais
  certificarSenhaErro:boolean = false;
  // criando variavel de email existente
  emailExistente:boolean = false;

  // listar elementos
  // injetando serviço dentro do componente

  constructor(private servicocadastro:CadastroService, private formbuilder:FormBuilder){}
  // metodo que é executado quando o componente abre
  ngOnInit(){
    // fazendo conecção entre ts e html
    this.form = this.formbuilder.group({
      // deixando os inputs obrigatorios
      nome: new FormControl("", [Validators.required]),
      // deixar o email obrigatório e deixar @.com obrigatório
      email: new FormControl("", [Validators.required, Validators.email]),
      senha: new FormControl("", [Validators.required]),
      certificarSenha: new FormControl("", [Validators.required])
    })

    this.cadastrarUsuarios()
  }

  // função para pegar usuarios da API
  cadastrarUsuarios(){
    this.servicocadastro.getCadastro().subscribe({
      next:(usuario: cadastrarModel[])=>{
        // oque vai acontecer quando der certo?
        this.listaUsuario = usuario;
        console.log(this.listaUsuario);
      },

      // caso de errado
      error:(erro: any)=>{
        console.log('erro para pegar usuarios da API');
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
    
    // ver o input de nome está preenchido 
    if(this.form.controls["nome"].invalid){
      // se inputErro for verdadeiro,
      this.inputNomeErro = true
      // mostrando no console antes de parar a função
      console.log("nome obrigatorio");
      // então a função para e não posta os dados na API
      return
    }

    // ver o input de email está preenchido 
    if(this.form.controls["email"].invalid){
      // se inputErro for verdadeiro,
      this.inputEmailErro = true
      // mostrando no console antes de parar a função
      console.log("email obrigatorio");
      // então a função para e não posta os dados na API
      return
    }

    // verificar se o email na input já existe na API
    this.listaUsuario.forEach(objeto =>{
      if(objeto.email === emailInput){
        // se o email for existente
        this.emailExistente = true;
        // dar erro na função
        console.log("esse email não pode ser utilizado");
        return
      }
    })

    // ver o input de senha está preenchido 
    if(this.form.controls["senha"].invalid){
      // se inputErro for verdadeiro,
      this.inputSenhaErro = true
      // mostrando no console antes de parar a função
      console.log("senha obrigatorio");
      // então a função para e não posta os dados na API
      return
    }

    // verificar se as senhas estão iguais
    if(this.form.controls["senha"].value !== this.form.controls["certificarSenha"].value){
      // se as senhas forem diferentes
      this.certificarSenhaErro = true
      // se for verdadeiro então a função não continua
      console.log("senhas opostas umas das outras");
      return
    }
    
    
    // fazendo variavel que lê os dados inseridos nos inputs
    let dados={
      id:idcorrer,
      nome:nomeInput,
      email:emailInput,
      senha:senhaInput
    }

    if(this.emailExistente !== true){
      this.servicocadastro.postCadastro(dados).subscribe({
        // oque vai acontecer quando der certo?
        next:(usuario: cadastrarModel[]) => {
          // guardando os dados na variavel listaUsuarios
          console.log(usuario);
          this.cadastrarUsuarios()
        },
        
        // caso de errado
        error:(erro: any)=>{
          console.log('erro de cadastro');
        }
      })
    }
    /* deixar o valor da variavel como falso no final da função
     para reiniciar a opção de cadastrar e assim permitir
     uma nova tentativa 
     */
    this.emailExistente = false
    this.inputNomeErro = false
  }
}
