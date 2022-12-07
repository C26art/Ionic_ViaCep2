import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { ModalProdutoDetailsComponent } from './modal-produto-details.component';



@NgModule({
  declarations: [ModalProdutoDetailsComponent],
  imports: [CommonModule, IonicModule],
  exports: [ModalProdutoDetailsComponent]
})
export class ModalProdutoDetailsModule { }
