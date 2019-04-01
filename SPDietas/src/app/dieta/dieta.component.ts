import { ClienteService } from './../cliente.service';
import { Dieta } from './../dieta';
import { Component, OnInit } from '@angular/core';
import { DietaService } from '../dieta.service';
import { Cliente } from '../cliente';

@Component({
  selector: 'app-dieta',
  templateUrl: './dieta.component.html',
  providers: [ DietaComponent ],
  styleUrls: ['./dieta.component.css']
})
export class DietaComponent implements OnInit {
  
  private clientes: Cliente[] = []
  private dietas: Dieta[] = []
  private dieta: Dieta
  

  constructor(private serviceDieta : DietaService, private serviceCliente : ClienteService) {
    this.dieta = new Dieta()
  }

  selectClientes(){
    this.serviceCliente.getClientes().subscribe( 
        result => 
        { 
          console.log(result) 
          this.clientes = JSON.parse(JSON.stringify(result))
        }
      )
   }
   selectDietas(){
    this.serviceDieta.getDietas().subscribe( 
        result => 
        { 
          console.log(result) 
          this.dietas = JSON.parse(JSON.stringify(result))
        }
      )
   }
   excluir(){
    this.serviceDieta.excluirDieta(this.dieta).subscribe(
      response => 
      { 
        console.log(response) 
        this.selectDietas()
      }
    )
   }
   salvar(){
    console.log(this.dieta)
    if(this.dieta.id==null){
      this.serviceDieta.salvarDieta(this.dieta).subscribe(
        response => 
        { 
          console.log(response)
          this.selectDietas() 
        }
      )
    }else{
      this.serviceDieta.alterarDieta(this.dieta).subscribe(
        response => 
        { 
          console.log(response)
          this.selectDietas()
        }
      )
    }
   }
  alterar(dieta){
    this.dieta = dieta
    console.log(dieta.id)
  }
  novo(){
    this.dieta.id = null
    this.dieta.descricao = null
    this.dieta.data = null
    this.dieta.id_cliente = null
    this.selectDietas()
  }
  ngOnInit() {
    this.selectClientes()
    this.selectDietas()
  }
}
