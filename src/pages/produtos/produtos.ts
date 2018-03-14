import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
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

  items: ProdutoDTO[];
  categoria: CategoriaDTO;
  categoria_nome: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public produtoService: ProdutoService,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    let loader = this.presentLoading();
    loader.present();
    this.produtoService.findByCategoria(this.navParams.get('categoria_id'))
      .subscribe(
        response => {
          loader.dismiss();
          this.items = response['content'];
          this.categoria_nome = this.navParams.get('categoria_nome');
          this.loadImageUrls();
        },
        error => {
          loader.dismiss();
        }
      );
  }

  loadImageUrls() {
    for (let item of this.items) {
      this.produtoService.getSmallImageFromBucket(item.id)
        .subscribe(
          response => {
            item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`;
          },
          error => { }
        );
    }
  }

  showDetail(produto_id: string) {
    this.navCtrl.push('ProdutoDetailPage', { produto_id: produto_id });
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Aguarde...",
    });
    //loader.present();
    return loader;
  }

}
