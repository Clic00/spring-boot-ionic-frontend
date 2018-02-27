import { ProdutoDTO } from "./produto.dto";

interface CartItem {
    quantidade: number;
    produto: ProdutoDTO;
    buttonDisabled: boolean;
}
export {CartItem}