import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  providers: [ ClienteComponent ],
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  
  private clientes: Cliente[] = []
  private cliente: Cliente

  constructor(private serviceCliente: ClienteService) {
    this.cliente = new Cliente()
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
   excluir(){
    console.log(this.cliente)
    this.serviceCliente.excluirCliente(this.cliente).subscribe(
      response => 
      { 
        console.log(response) 
        this.selectClientes()
      }
    )
   }
   salvar(){
    console.log(this.cliente)
    if(this.cliente.id==null){
      this.serviceCliente.salvarCliente(this.cliente).subscribe(
        response => 
        { 
          console.log(response)
          this.selectClientes() 
        }
      )
    }else{
      this.serviceCliente.alterarCliente(this.cliente).subscribe(
        response => 
        { 
          console.log(response)
          this.selectClientes()
        }
      )
    }
   }
  alterar(cliente){
    this.cliente = cliente
    console.log(cliente.id)
  }
  novo(){
    this.cliente.id = null
    this.cliente.nome = null
    this.cliente.sexo = null
    this.cliente.nascimento = null
    this.cliente.cidade = null
    this.selectClientes()
  }
  ngOnInit() {
    this.selectClientes()
  }
}
