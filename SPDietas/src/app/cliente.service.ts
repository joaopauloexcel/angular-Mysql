import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  
  constructor(private http: HttpClient) { }

  getClientes(){
    return this.http.get('http://localhost/cliente.php?req=select')
  }
  salvarCliente(cliente){
    return this.http.post<Cliente>('http://localhost/cliente.php?req=insert',cliente)
  }
  alterarCliente(cliente){
    return this.http.post<Cliente>('http://localhost/cliente.php?req=update',cliente)
  }
  excluirCliente(cliente){
    return this.http.post<Cliente>('http://localhost/cliente.php?req=delete',cliente)
  }
}
