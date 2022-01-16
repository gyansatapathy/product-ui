import {Component, OnInit, ViewChild} from '@angular/core';
import {ProductService} from "../services/product/product.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SelectionModel} from "@angular/cdk/collections";
import {GridComponent, SelectableSettings} from "@progress/kendo-angular-grid";

const createFormGroup = (dataItem, isNew) =>
    new FormGroup({
        productId: new FormControl({value: dataItem.productId, disabled: !isNew}, Validators.required),
        productName: new FormControl(dataItem.productName, Validators.required),
        productCategory: new FormControl(dataItem.productCategory, Validators.required),
        units: new FormControl(dataItem.units, Validators.pattern("^[0-9]*$"))
    });

const matches = (el, selector) =>
    (el.matches || el.msMatchesSelector).call(el, selector);


@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

    private isNew: boolean;
    private editedRowIndex: number;
    private docClickSubscription: any;
    public formGroup: FormGroup;
    @ViewChild(GridComponent)
    private grid: GridComponent;
    products;
    category = new FormControl();
    displayedColumns: string[] = ['productId', 'productCategory', 'productName', 'units'];
    selection = new SelectionModel<any>(false, []);
    selectable: SelectableSettings= {
        mode: 'multiple',
        drag: false,
        checkboxOnly: true
    }
    selectedProductIds: Array<string> =  [];

    constructor(private productService: ProductService) {
    }

    ngOnInit(): void {
        this.productService.getAllProducts().subscribe(response => {
            this.products =  response;
        });
    }

    searchByCategory() {
        if (this.category.value) {
            this.productService.searchByCategory(this.category.value).subscribe(result=>{
                this.products =  result;
            });
        }
    }

    public saveRow() {
        if (this.formGroup && this.formGroup.valid) {
            this.saveCurrent();
        }
    }

    public cellClickHandler({ isEdited, dataItem, rowIndex }): void {
        if (isEdited || (this.formGroup && !this.formGroup.valid)) {
            return;
        }

        if (this.isNew) {
            rowIndex += 1;
        }

        this.saveCurrent();

        this.formGroup = createFormGroup(dataItem, this.isNew);
        this.editedRowIndex = rowIndex;


        this.grid.editRow(rowIndex, this.formGroup);
    }

    public cancelHandler(): void {
        this.closeEditor();
    }

    private closeEditor(): void {
        this.grid.closeRow(this.editedRowIndex);

        this.isNew = false;
        this.editedRowIndex = undefined;
        this.formGroup = undefined;
    }

    private onDocumentClick(e: any): void {
        if (
            this.formGroup &&
            this.formGroup.valid &&
            !matches(
                e.target,
                "#productsGrid tbody *, #productsGrid .k-grid-toolbar .k-button"
            )
        ) {
            this.saveCurrent();
        }
    }

    private saveCurrent(): void {
        if (this.formGroup) {
            this.productService.save(this.formGroup.getRawValue(), this.isNew).subscribe(value => {
                const index = this.products.findIndex(prod => value.productId === prod.productId);
                if(index> -1){
                    this.products[index] = value;
                }else{
                    this.products.push(value);
                }
            })
            this.closeEditor();
        }
    }

    public addHandler(): void {
        this.closeEditor();

        this.formGroup = createFormGroup({
            productId: '',
            productName: '',
            productCategory: '',
            units: '',
        }, true);
        this.isNew = true;

        this.grid.addRow(this.formGroup);
    }

    deleteProduct(selectedProductIds: Array<string>) {
        this.productService.deleteProducts(selectedProductIds).subscribe(()=>{
            this.selectedProductIds.forEach(productId=>{
                this.products = this.products.filter(product=> product.productId != productId);
            })
        })
    }
}