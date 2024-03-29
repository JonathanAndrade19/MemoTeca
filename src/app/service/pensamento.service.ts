import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pensamento } from '../core/pensamento';

@Injectable({
  providedIn: 'root'
})
export class PensamentoService {

  private readonly API = "http://localhost:3000/pensamentos"

  constructor(private http: HttpClient) { }

  listarPensamentos(pagina: number, filtro: string, favoritos: boolean): Observable<Pensamento[]>{
    const itensPorPagina = 6;
    
    let params = new HttpParams().set("_page", pagina).set("_limit", itensPorPagina)
    if (filtro.trim().length > 2){
      params = params.set("q", filtro)
    }
    if(favoritos){
      params = params.set("favorito", true)
    }

    return this.http.get<Pensamento[]>(this.API, {params: params})
  }

  cadastrarPensamento(pensamento: Pensamento): Observable<Pensamento>{
    return this.http.post<Pensamento>(this.API, pensamento)
  }  

  editarPensamento(pensamento: Pensamento): Observable<Pensamento>{
    const url = `${this.API}/${pensamento.id}`
    return this.http.put<Pensamento>(url, pensamento)
  }

  mudarFavorito(pensamento: Pensamento): Observable<Pensamento>{
    pensamento.favorito = !pensamento.favorito
    const url = `${this.API}/${pensamento.id}`
    return this.http.put<Pensamento>(url, pensamento)
    
  }

  excluirPensamento(id: number): Observable<Pensamento>{
    const url = `${this.API}/${id}`
    return this.http.delete<Pensamento>(url)
  }

  buscarPorId(id: number): Observable<Pensamento>{
    const url = `${this.API}/${id}`
    return this.http.get<Pensamento>(url)
  }

}
