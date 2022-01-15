import {Component, OnInit} from '@angular/core';
import {ProductService} from "../services/product/product.service";
import {MatTableDataSource} from "@angular/material/table";
import {FormControl} from "@angular/forms";
import {SelectionModel} from "@angular/cdk/collections";

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
    products;
    category = new FormControl();
    displayedColumns: string[] = ['productId', 'productCategory', 'productName', 'units'];
    selection = new SelectionModel<any>(false, []);

    constructor(private productService: ProductService) {
    }

    ngOnInit(): void {
        this.productService.getAllProducts().subscribe(response => {
            this.products = new MatTableDataSource();
            this.products.data = response;
        });
    }

    searchByCategory() {
        if (this.category.value) {
            this.productService.searchByCategory(this.category.value).subscribe(result=>{
                this.products = new MatTableDataSource();
                this.products.data = result;
            });
        }
    }
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.products.data.length;
        return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    select(value) {
        this.selection.toggle(value);
        console.log(value)
    }
}