import { Component } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.scss']
})
export class EntrarComponent {
  // variavel que guarda o que tem no formGroup
  form!: FormGroup;
  
  constructor(private formbuilder:FormBuilder){}

  ngOnInit(){
    // fazendo a conecção entre HTML e ts
    this.form = this.formbuilder.group({
      // deixar inputs obrigatórios
      nome: new FormControl("", [Validators.required]),
      senha: new FormControl("", [Validators.required])
    })
  }

  

}
