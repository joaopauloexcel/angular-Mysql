import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Dieta } from './dieta';


@Injectable({
  providedIn: 'root'
})
export class DietaService {

  constructor(private http: HttpClient) { }
  
  getDietas(){
    return this.http.get('http://localhost/dieta.php?req=select')
  }
  salvarDieta(dieta){
    return this.http.post<Dieta>('http://localhost/dieta.php?req=insert',dieta)
  }
  alterarDieta(dieta){
    return this.http.post<Dieta>('http://localhost/dieta.php?req=update',dieta)
  }
  excluirDieta(dieta){
    return this.http.post<Dieta>('http://localhost/dieta.php?req=delete',dieta)
  }
}
