import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Produto } from '../model/produto.model';
import { ProdutoService } from '../services/produto.service';

@Component({
  selector: 'app-modal-produto-details',
  templateUrl: './modal-produto-details.component.html',
  styleUrls: ['./modal-produto-details.component.scss'],
})
export class ModalProdutoDetailsComponent implements OnInit {
  @Input() produto!: Produto;

  constructor(private modalCtrl: ModalController,
    private service: ProdutoService,
    private router: Router) { }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  ngOnInit() {}

  edit(id:number) {

    this.router.navigate(['/tabs/editar', id]);
    this.modalCtrl.dismiss(null, 'cancel');
  }

  delete(id:number) {
    this.service.deleteProduto(id).subscribe({
      next: () => {
        this.modalCtrl.dismiss(null, 'cancel');
      },
      error: () => {
        console.error(console.error);
      },
    });
  }
}
