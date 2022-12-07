import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ModalProdutoDetailsModule } from '../modal-produto-details/modal-produto-details.module';
import { ProdutoService } from '../services/produto.service';
import { Tab2PageRoutingModule } from './tab2-routing.module';
import { Tab2Page } from './tab2.page';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    ModalProdutoDetailsModule,
    Tab2PageRoutingModule
  ],
  declarations: [Tab2Page],
  providers: [ProdutoService]
})
export class Tab2PageModule {}
