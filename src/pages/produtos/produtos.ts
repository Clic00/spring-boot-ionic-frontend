import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';
import { CategoriaDTO } from '../../models/categoria.dto';
import { API_CONFIG } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  items : ProdutoDTO[];
  categoria : CategoriaDTO;
  categoria_nome : string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public produtoService: ProdutoService) {
  }

  ionViewDidLoad() {

    this.produtoService.findByCategoria(this.navParams.get('categoria_id'))
      .subscribe( 
        response => {
          this.items = response['content'];
          this.categoria_nome = this.navParams.get('categoria_nome');
          this.loadImageUrls();
        },
        error => {}
      );
  }

  loadImageUrls() {
    for (let item of this.items) {
      this.produtoService.getSmallImageFromBucket(item.id)
        .subscribe(
          response => {
            item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`;
          },
          error => {}
        );
    }    
  }
}
