import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProductToSave} from '../Model/ProductToSave.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private host = 'http://localhost:5000';


  constructor(public http: HttpClient) { }

  getAllProduct() {
    return this.http.get(this.host + '/product', {observe: 'response'});
  }

  saveProduct(pdts: ProductToSave) {
    return this.http.post(this.host + '/product', pdts, {observe: 'response'});
  }

  deleteProduct(productid) {
    return this.http.delete(this.host + '/product/' + productid + '', {observe: 'response'});
  }

}
