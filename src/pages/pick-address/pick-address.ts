import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnderecoDTO } from '../../models/endereco.dto';

@IonicPage()
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})
export class PickAddressPage {

  items: EnderecoDTO[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.items = [
        {
          id: "1",
          logradouro: "Rua Flores",
          numero: "300",
          complemento: "Apto 203",
          bairro: "Jardins",
          cep: "38220834",
          cidade: {
              id: "1",
              nome: "Belém",
              estado: {
                  id: "1",
                  nome: "Pará"
              }
          }
      },
      {
          id: "2",
          logradouro: "Avenida Matos",
          numero: "105",
          complemento: "Sala 800",
          bairro: "Centro",
          cep: "38777012",
          cidade: {
              id: "4",
              nome: "Irituia",
              estado: {
                  id: "1",
                  nome: "Pará"
              }
          }
      }      
    ];
  }
}
