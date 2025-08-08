import { Component } from '@angular/core';
import { MatCard, MatCardContent, MatCardModule } from "@angular/material/card";

@Component({
  selector: 'app-empty-list',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './empty-list.component.html',
  styleUrl: './empty-list.component.scss'
})
export class EmptyListComponent {

}
