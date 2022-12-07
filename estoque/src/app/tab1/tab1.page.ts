import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EnderecoModel } from '../model/endereco.model';

import { Produto } from '../model/produto.model';
import { ProdutoService } from '../services/produto.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  produtoForm!: FormGroup;
  produto!: Produto;
  editable:boolean = false;

  constructor(private formBuilder: FormBuilder, private produtoService: ProdutoService, private router: Router,
    private route: ActivatedRoute) {}

    ngOnInit(): void {
      this.produtoForm = this.formBuilder.group({
        nome: [
          '',
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(100)
          ]
        ],
        quantidade: [
          '',
          [
            Validators.required,
            Validators.minLength(1),
            Validators.pattern(/^[0-9]+$/)
          ]
        ],
        valorCompra: [
          '',
          [
            Validators.required,
          ]
        ],
        valorVenda: [
          '',
          [
            Validators.required,
          ]
        ],
        fornecedor: [
          '',
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(100)
          ]
        ],
        razaoSocial: [
          '',
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(100)
          ]
        ],
        cnpj: [
          '',
          [
            Validators.required,
          ]
        ],
        telefone: [
          '',
          [
            Validators.required,
            Validators.minLength(11),
            Validators.maxLength(15)
          ]
        ],
        endereco:this.formBuilder.group({
          cep:['',[Validators.required,Validators.pattern(/^\d{5}\-?\d{3}$/)]],
          logradouro:['',[Validators.required]],
          complemento:['',],
          bairro:['',[Validators.required]],
          localidade:['',[Validators.required]],
          uf:['',[Validators.required]]
        }),
      });

      this.route.paramMap.subscribe(params => {
        const produtoId = +params.get('id')!;

        if(produtoId) {
          this.produtoService.findProduto(produtoId).subscribe({
            next: (produtoDB: Produto) => {
            this.produto = produtoDB;
            this.produto.id = produtoId;
            this.editable = true;
            this.loadForm();
            },
            error: (err) => console.log(err)
          });
        }
      });
    }
    addProduto() {
      const newProduto = this.produtoForm.getRawValue() as Produto;

     this.produtoService.insertProduto(newProduto)
      .subscribe({
        next: (result:any) => {
          this.produtoForm.reset();
          this.router.navigateByUrl('/tabs/tab2');
        },
        error: (error:any) => { console.log(error)}
      });
    }
    loadForm() {
      this.produtoForm.patchValue({
        nome: this.produto.nome,
        quantidade: this.produto.quantidade,
        valorCompra: this.produto.valorCompra,
        valorVenda: this.produto.valorVenda,
        fornecedor: this.produto.fornecedor,
      });
    }
    editar() {
      const produtoId = this.produto.id;
    }

    verifyCEP(){
      const cep = this.produtoForm.get('endereco')?.getRawValue() as EnderecoModel;
      console.log(cep)
      const receivedCEP = this.produtoService.getCEP(cep.cep);
      receivedCEP.subscribe({
        next:(cep)=>{
          this.refresForm(cep)
        },
        error: (err)=>{
          console.log(err)
        }
      })
      console.log(receivedCEP)
    }

    refresForm(endereco:EnderecoModel){
      this.produtoForm.get("endereco")?.patchValue({
        logradouro: endereco.logradouro,
        bairro: endereco.bairro,
        localidade:endereco.localidade,
        uf: endereco.uf
      })
  }






  get nome(){return this.produtoForm.get("nome")!}
  get quantidade(){return this.produtoForm.get("quantidade")!}
  get valorCompra(){return this.produtoForm.get("valorCompra")!}
  get valorVenda(){return this.produtoForm.get("valorVenda")!}
  get fornecedor(){return this.produtoForm.get("fornecedor")!}
  get razaoSocial(){return this.produtoForm.get("razaoSocial")!}
  get cnpj(){return this.produtoForm.get("cnpj")!}
  get telefone(){return this.produtoForm.get("telefone")!}
  get cep(){return this.produtoForm.get("endereco")?.get("cep")!}
  get logradouro(){return this.produtoForm.get("endereco")?.get("logradouro")!}
  get complemento(){return this.produtoForm.get("endereco")?.get("complemento")!}
  get bairro(){return this.produtoForm.get("endereco")?.get("bairro")!}
  get localidade(){return this.produtoForm.get("endereco")?.get("localidade")!}
  get uf(){return this.produtoForm.get("endereco")?.get("uf")!}
}
