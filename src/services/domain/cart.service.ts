import { Injectable } from "@angular/core";
import { StorageService } from "../storage.service";
import { Cart } from "../../models/cart";
import { ProdutoDTO } from "../../models/produto.dto";


@Injectable()
export class CartService {

    constructor(public storage: StorageService) {
    }

    createOrClearCart() {
        let cart: Cart = { items: [] };
        this.storage.setCart(cart);
        return cart;
    }

    getCart(): Cart {
        let cart: Cart = this.storage.getCart();
        if (cart == null) {
            cart = this.createOrClearCart();
        }
        return cart;
    }

    addProduto(produto: ProdutoDTO): Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == produto.id);
        if (position == -1) {
            cart.items.push({ quantidade: 1, produto: produto, buttonDisabled: false });
        }
        this.storage.setCart(cart);
        return cart;
    }

    removeProduto(produto: ProdutoDTO): Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == produto.id);
        if (position != -1) {
            cart.items.splice(position, 1);
        }
        this.storage.setCart(cart);
        return cart;
    }

    increaseQuantity(produto: ProdutoDTO): Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == produto.id);
        if (position != -1) {
            cart.items[position].quantidade++;
            cart.items[position].buttonDisabled = true;
        }
        this.storage.setCart(cart);
        return cart;
    }

    decreaseQuantity(produto: ProdutoDTO): Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == produto.id);
        let q = cart.items[position].quantidade;
        if (q > 1) {
            cart.items[position].quantidade--;
        }
        if (q <= 2) {
            cart.items[position].buttonDisabled = false;
        }        
        this.storage.setCart(cart);
        return cart;
    }

    total(): number {
        let carts = this.getCart();
        let tot = 0;
        for (let cart of carts.items) {
            tot = tot + cart.produto.preco * cart.quantidade;
        }
        return tot;
    }
}