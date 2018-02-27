import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartItem } from '../../models/cart-item';
import { CartService } from '../../services/domain/cart.service';
import { ProdutoService } from '../../services/domain/produto.service';
import { API_CONFIG } from '../../config/api.config';
import { ProdutoDTO } from '../../models/produto.dto';
import { Cart } from '../../models/cart';

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  items: CartItem[];
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public cartService: CartService,
    public produtoService: ProdutoService) {
  }

  ionViewDidLoad() {
    let cart = this.cartService.getCart();
    this.items = cart.items;
    this.loadImageUrls();
  }

  loadImageUrls() {
    for (let item of this.items) {
      this.produtoService.getSmallImageFromBucket(item.produto.id)
        .subscribe(
          response => {
            item.produto.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.produto.id}-small.jpg`;
          },
          error => {}
        );
    }          
  }  

  remove(produto: ProdutoDTO) {
    this.items = this.cartService.removeProduto(produto).items;
  }

  increase(produto: ProdutoDTO) {
    this.items = this.cartService.increaseQuantity(produto).items;
  }

  decrease(produto: ProdutoDTO) {
    this.items = this.cartService.decreaseQuantity(produto).items;
  }
  
  total(): number {
    return this.cartService.total();
  }

  goOn() {
    this.navCtrl.setRoot('CategoriasPage');
  }
}
