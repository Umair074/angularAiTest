import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProjectService, Project } from '../../services/project.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  private projectService = inject(ProjectService);
  private fb = inject(FormBuilder);

  // Load project list
  projects = signal<Project[]>(this.projectService.getProjects());

  // Skills categorized
  skillsCategories = signal([
    {
      title: 'Frontend Architecture',
      iconClass: 'frontend-icon',
      skills: ['Angular', 'TypeScript', 'RxJS', 'State Management (NgRx/Signals)', 'HTML5 & SCSS', 'Next.js / React']
    },
    {
      title: 'Backend & Systems',
      iconClass: 'backend-icon',
      skills: ['Node.js', 'Express & NestJS', 'PostgreSQL', 'MongoDB', 'REST APIs', 'GraphQL']
    },
    {
      title: 'DevOps & Tooling',
      iconClass: 'devops-icon',
      skills: ['Docker', 'AWS (S3/EC2)', 'Git & GitHub Actions', 'CI/CD Pipelines', 'Vite & Webpack', 'Vercel / Netlify']
    },
    {
      title: 'Product & Design',
      iconClass: 'design-icon',
      skills: ['UI/UX Wireframing', 'Figma Design', 'Responsive Web Standards', 'Performance Tuning', 'SEO Best Practices', 'A11y Accessibility']
    }
  ]);

  // Contact Form
  contactForm: FormGroup;
  isSubmitting = signal<boolean>(false);
  submitSuccess = signal<boolean>(false);

  constructor() {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required, Validators.minLength(4)]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  scrollToSection(id: string, event: Event) {
    event.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }

  onSubmit() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);

    // Simulate sending message via network
    setTimeout(() => {
      this.isSubmitting.set(false);
      this.submitSuccess.set(true);
      this.contactForm.reset();

      // Reset success state after a timeout
      setTimeout(() => {
        this.submitSuccess.set(false);
      }, 5000);
    }, 1500);
  }
}
