import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { EnderecoModel } from '../model/endereco.model';
import { Produto } from '../model/produto.model';
import { CorreiosService } from '../services/correios.service';
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
    private route: ActivatedRoute,
    private correiosService: CorreiosService) {}

    ngOnInit(): void {
      this.produtoForm = this.formBuilder.group({
        nome: [
          '',
          [
            Validators.required,
            Validators.minLength(2),
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
        logradouro: [
          '',
          [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(100)
          ]
        ],
        bairro: [
          '',
          [
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(100)
          ]
        ],
        cidade: [
          '',
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(100)
          ]
        ],
        cep: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(10)
          ]
        ],
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
        logradouro: this.produto.logradouro,
        bairro: this.produto.bairro,
        cidade: this.produto.cidade,
        cep: this.produto.cep,
      });
    }

    loadEndereco() {
      const cep:string = this.produtoForm.get('cep')?.value;
      this.correiosService.getEndereco(cep).subscribe({
        next: (result:EnderecoModel) => {
          this.produtoForm.patchValue({
            logradouro: result.logradouro,
            bairro: result.bairro,
            cidade: result.localidade,
            cep: result.cep
          });
        },
        error: (err) => {
          console.error(err)
        }
      });
    }

    editProduto() {
      const editProduto = this.produtoForm.getRawValue() as Produto;
      editProduto.id = this.produto.id;

      this.produtoService.updateProduto(editProduto).subscribe({
        next: () => {
          this.router.navigateByUrl('/tabs/tab2');
          this.produtoForm.reset();
        },
        error: (err) => {
          console.error(err);
          this.produtoForm.reset();
        }
      });
    }



  valordeVendas(valorCompra: number, porcentagemBruto: number) {
    const porcentagem = porcentagemBruto / 100 + 1;
    return valorCompra * porcentagem;
  }

}
