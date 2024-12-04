import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-error-page',
  imports: [CommonModule],
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss'],
})
export class ErrorPageComponent {
  constructor(private router: Router) {}

  navigateToHome(): void {
    this.router.navigate(['/']);
  }
}
