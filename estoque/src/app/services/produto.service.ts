import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Produto } from '../model/produto.model';


const API_URL = 'http://localhost:3000';
const HTTP_OPTIONS = {
  headers: new HttpHeaders (
    { 'Content-Type': 'application/json;charset=utf-8' }
  )
};

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  constructor(private http: HttpClient) { }

  insertProduto(produto: Produto): Observable<any> {
    return this.http.post(`${API_URL}/produto`, produto, HTTP_OPTIONS);
  }

  findProduto(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${API_URL}/produto/${id}`);
  }

  getProduto(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${API_URL}/produto/${id}`, HTTP_OPTIONS);
  }

  getProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${API_URL}/produto`);
  }

  updateProduto(produto: Produto): Observable<any> {
    return this.http.put(`${API_URL}/produto/${produto.id}`, produto, HTTP_OPTIONS);
  }

  deleteProduto(id: number): Observable<any> {
    return this.http.delete(`${API_URL}/produto/${id}`);
  }
}
