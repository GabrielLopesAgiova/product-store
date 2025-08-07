import { Component, inject } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { Product } from '../../shared/interfaces/product.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CardComponent } from './components/card/card.component';
import { Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';


@Component({
  selector: 'app-confirmation-dialog',
  template: `
    <h2 mat-dialog-title>Deletar produto</h2>
  <mat-dialog-content>
    Você confirma a exclusão completa deste produto?
  </mat-dialog-content>
  <mat-dialog-actions align="end">
    <button mat-button (click)="onRefuse()">Não</button>
    <button mat-raised-button (click)="onConfirm()" color="primary" cdkFocusInitial>Sim</button>
  </mat-dialog-actions>
  
  `,
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
})
export class ConfirmationDialogComponent {
  matDialogRef = inject(MatDialogRef)

  onRefuse() {
    this.matDialogRef.close(false)
  }

  onConfirm() {
    this.matDialogRef.close(true)
  }
}


@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CardComponent,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {

  products: Product[] = []

  productsService = inject(ProductsService)
  router = inject(Router)
  matDialog = inject(MatDialog)

  ngOnInit() {
    this.productsService.getAll().subscribe(products =>
      this.products = products
    );
  }

  onEdit(product: Product) {
    this.router.navigate([`edit-product`, product.id]);
  }
  onDelete(product: Product) {
    this.matDialog.open(ConfirmationDialogComponent)
      .afterClosed()
      .pipe(filter(answer => answer === true))
      .subscribe(() => {
        this.productsService.delete(product.id)
          .subscribe(() => {
            this.productsService.getAll().subscribe(products =>
              this.products = products
            );
          });
      });
  }
}
