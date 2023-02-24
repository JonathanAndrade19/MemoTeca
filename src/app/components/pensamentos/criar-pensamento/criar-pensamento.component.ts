import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { minusculoValidator } from 'src/app/core/minusculoValidator';
import { PensamentoService } from 'src/app/service/pensamento.service';

@Component({
  selector: 'app-criar-pensamento',
  templateUrl: './criar-pensamento.component.html',
  styleUrls: ['./criar-pensamento.component.css']
})
export class CriarPensamentoComponent implements OnInit {

  formulario!: FormGroup;

  constructor(
    private service: PensamentoService, 
    private router: Router, 
    private formBuilder: FormBuilder
  ){ }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      conteudo: [
        '', 
        Validators.compose(
          [
            Validators.required, 
            Validators.pattern(/(.|\s)*\S(.|\s)*/)
          ]
        )
      ],
      autoria: [
        '', 
        Validators.compose(
          [
            Validators.required, 
            Validators.minLength(3),
            minusculoValidator
          ]          
        )
      ],
      modelo: ['modelo1'],
      favorito: [false]
    })
  }

  criarPensamento() {
    // console.log(this.formulario.get('autoria')?.errors)
    if(this.formulario.valid){
      this.service.cadastrarPensamento(this.formulario.value).subscribe(() => {
        this.router.navigate(['/listarPensamento']);
      })
    }
  }

  cancelar() {
    this.router.navigate(['/listarPensamento']);
  }

  habilitarBotao(): string{
    if(this.formulario.valid){
      return 'botao'
    } else {
      return 'botao__desabilitado'
    }
  }
}
