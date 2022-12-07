import { EnderecoModel } from "./endereco.model";

export interface Produto {
  id: number;
  nome: string;
  quantidade: number;
  valorCompra: number;
  valorVenda: number;
  fornecedor: string;
  razaoSocial:string,
  cnpj:string,
  telefone:string,
  endereco:EnderecoModel,
}
