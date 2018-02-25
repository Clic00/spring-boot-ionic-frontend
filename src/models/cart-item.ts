import { ProdutoDTO } from "./produto.dto";

interface CartItem {
    quantidade: number;
    produto: ProdutoDTO;
}
export {CartItem}