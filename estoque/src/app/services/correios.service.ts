import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { EnderecoModel } from '../model/endereco.model';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CorreiosService {

  constructor(private http: HttpClient) { }

  getEndereco(cep:string): Observable<EnderecoModel> {
    return this.http.get<EnderecoModel>(`${environment.correiosWS}/${cep}/json/`);
  }
}
