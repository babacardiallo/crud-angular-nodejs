import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../services/product.service';
import {ProductToSave} from '../Model/ProductToSave.model';
import {Product} from '../Model/Product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  public AjouterForm: FormGroup;

  public listofproduct: Product[];

  constructor(private formBuilder: FormBuilder, private productService: ProductService) { }

  ngOnInit() {
    this.OngetAll();
    this.initForm();
  }

  initForm() {

    this.AjouterForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      price: ['', [Validators.required]],
    });
  }

  OnAjouter() {
     const name = this.AjouterForm.get('name').value;
     const price = this.AjouterForm.get('price').value;
     const product = new ProductToSave(name, price);
     console.log(product);
     this.productService.saveProduct(product).subscribe(response => {
        this.listofproduct.push(response.body['createdProduct']);
        console.log(response);
        this.AjouterForm.reset();
     },
       error => {
           console.log(error);
       });
  }

  OngetAll() {
    this.productService.getAllProduct().subscribe(response => {
       console.log(response);
       this.listofproduct = response.body['docs'];
       console.log(this.listofproduct);
    },
      error => {
         console.log(error);
      });
  }

  OnDelete(product) {
    console.log(product._id);
    this.productService.deleteProduct(product._id).subscribe(response => {
        console.log(response);
        this.listofproduct.splice(this.listofproduct.indexOf(product), 1);
    },
      error => {
        console.log(error);
      });
  }

}
