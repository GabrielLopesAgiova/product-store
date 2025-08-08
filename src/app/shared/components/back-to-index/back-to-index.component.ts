import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-back-to-index',
  standalone: true,
  imports: [RouterLink, MatButtonModule],
  templateUrl: './back-to-index.component.html',
  styleUrl: './back-to-index.component.scss'
})
export class BackToIndexComponent {

}
