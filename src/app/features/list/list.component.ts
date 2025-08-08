import { Component, inject, signal } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { Product } from '../../shared/interfaces/product.interface';
import { MatButtonModule } from '@angular/material/button';
import { CardComponent } from './components/card/card.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';
import { DialogConfirmationService } from '../../shared/services/dialog-confirmation.service';
import { EmptyListComponent } from './components/empty-list/empty-list.component';





@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CardComponent,
    MatButtonModule,
    EmptyListComponent,
    RouterLink
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {

  products = signal<Product[]>(
    inject(ActivatedRoute).snapshot.data['products']
  );

  productsService = inject(ProductsService)
  dialogConfirmationService = inject(DialogConfirmationService)
  router = inject(Router)

  onEdit(product: Product) {
    this.router.navigate([`edit-product`, product.id]);
  }
  onDelete(product: Product) {
    this.dialogConfirmationService
      .openDialog()
      .pipe(filter(answer => answer === true))
      .subscribe(() => {
        this.productsService.delete(product.id)
          .subscribe(() => {
            this.productsService.getAll().subscribe(products =>
              this.products.set(products)
            );
          });
      });
  }
}
