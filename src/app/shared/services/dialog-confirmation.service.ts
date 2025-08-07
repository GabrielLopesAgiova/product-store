import { Component, inject, Injectable } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';

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

@Injectable({
  providedIn: 'root'
})
export class DialogConfirmationService {

  matDialog = inject(MatDialog);

  constructor() { }

  openDialog(): Observable<boolean> {
    return this.matDialog
      .open(ConfirmationDialogComponent)
      .afterClosed()
  }
}
