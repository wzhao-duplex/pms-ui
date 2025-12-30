import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [CommonModule],
    template: `
    <footer class="footer mt-auto py-3 bg-light text-center">
      <div class="container">
        <span class="text-muted">
          &copy; {{ currentYear }} PMS - Property Management System. All rights reserved.
        </span>
        <div class="small mt-1">
          <a href="#" class="text-secondary text-decoration-none me-2">Privacy Policy</a>
          <a href="#" class="text-secondary text-decoration-none">Terms of Service</a>
        </div>
      </div>
    </footer>
  `,
    styles: [`
    .footer {
      border-top: 1px solid #e0e0e0;
      background-color: #f8f9fa;
      margin-top: 3rem; /* Space above footer */
    }
  `]
})
export class FooterComponent {
    currentYear = new Date().getFullYear();
}