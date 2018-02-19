import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';
import { CategoriaDTO } from '../../models/categoria.dto';

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
        },
        error => {}
      );
  }
}
