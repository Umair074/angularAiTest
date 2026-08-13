import { Component, signal, inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private router = inject(Router);
  
  isMobileMenuOpen = signal<boolean>(false);
  currentSection = signal<string>('home');

  constructor() {
    // Listen to route changes to update active links
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const url = this.router.url;
      if (!url.includes('/project/')) {
        // We are on home page
        this.isMobileMenuOpen.set(false);
      }
    });
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen.update(prev => !prev);
  }

  navigateToSection(sectionId: string, event: Event) {
    event.preventDefault();
    this.isMobileMenuOpen.set(false);
    
    if (this.router.url === '/' || this.router.url.startsWith('/#')) {
      this.scrollTo(sectionId);
    } else {
      // If we are on details page, navigate to home first
      this.router.navigate(['/']).then(() => {
        setTimeout(() => {
          this.scrollTo(sectionId);
        }, 100);
      });
    }
  }

  private scrollTo(elementId: string) {
    const element = document.getElementById(elementId);
    if (element) {
      this.currentSection.set(elementId);
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }

  goToHome(event: Event) {
    event.preventDefault();
    this.router.navigate(['/']);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.currentSection.set('home');
  }
}
