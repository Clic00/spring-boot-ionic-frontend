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

  items: ProdutoDTO[] = [];
  categoria: CategoriaDTO;
  categoria_nome: string;
  page : number = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public produtoService: ProdutoService,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    this.loadDataProdutos();
  }

  loadDataProdutos() {
    let loader = this.presentLoading();
    loader.present();
    this.produtoService.findByCategoria(this.navParams.get('categoria_id'), this.page, 10)
      .subscribe(
        response => {
          loader.dismiss();
          let items = response['content'];
          this.items = this.items.concat(items);
          this.categoria_nome = this.navParams.get('categoria_nome');

          console.log(this.page);
          console.log(this.items);

          this.loadImageUrls(items);
        },
        error => {
          loader.dismiss();
        }
      );
  }

  loadImageUrls(items : ProdutoDTO[]) {
    for (let item of items) {
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

  doRefresh(refresher) {
    this.page = 0;
    this.items = [];
    this.loadDataProdutos();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }


  doInfinite(infiniteScroll) {
    this.page++;
    this.loadDataProdutos();

    setTimeout(() => {
      infiniteScroll.complete();
    }, 1000);
  }
}
