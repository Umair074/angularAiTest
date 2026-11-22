import { Component, signal, inject, computed } from '@angular/core';
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

  // Filter category state
  selectedCategory = signal<string>('all');

  // Filtered projects list
  filteredProjects = computed(() => {
    const category = this.selectedCategory();
    const list = this.projects();
    if (category === 'all') {
      return list;
    }
    return list.filter(p => p.category === category);
  });

  // Skills categorized into the three requested tech stacks
  skillsCategories = signal([
    {
      title: 'Angular (Web)',
      iconClass: 'angular-icon',
      skills: [
        'Signals & Advanced Reactivity',
        'TypeScript Architecture & Design Patterns',
        'RxJS Stream Processing & Observables',
        'State Management (Signals & Store Patterns)',
        'SCSS & Custom Design Systems (Tailwind / UI Kits)',
        'Angular Router, Custom Directives & Pipes'
      ]
    },
    {
      title: 'Angular + CapacitorJS (Mobile)',
      iconClass: 'capacitor-icon',
      skills: [
        'Cross-Platform Hybrid App Architecture',
        'Native Device APIs (Camera, Geolocation, Filesystem)',
        'Local Secure Storage & Database Synchronization',
        'Android Studio & Xcode Native Build Integration',
        'Push Notifications & Local Geofencing Triggering',
        'Mobile Interface Optimization & Cupertino/Material Styles'
      ]
    },
    {
      title: 'Kotlin + ComposeJS (Multiplatform)',
      iconClass: 'compose-icon',
      skills: [
        'Kotlin Multiplatform (KMP) Shared Modules',
        'Kotlin/JS Compilation & Webpack Orchestration',
        'Declarative User Interface Design via Compose HTML/JS',
        'Asynchronous Flow Management with Kotlin Coroutines',
        'Skia Graphics Integration & Custom Canvas Vector Drawing',
        'Multi-Platform State Modeling & UI Binding'
      ]
    },
    {
      title: 'AI & Vibe Coding',
      iconClass: 'ai-icon',
      skills: [
        'AI-Assisted Development (LLMs & Agentic Tools)',
        'Prompt Engineering & Iterative Software Design',
        'Rapid Prototyping & Flow State Integration',
        'Cursor & Custom AI IDE Workflow Optimization',
        'Refactoring, Code Translation & Automated Testing',
        'Human-in-the-Loop Architecture Reviews'
      ]
    }
  ]);

  // Contact Form
  contactForm: FormGroup;
  isSubmitting = signal<boolean>(false);
  submitSuccess = signal<boolean>(false);
  submitError = signal<string | null>(null);

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

  async onSubmit(): Promise<void> {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    if (this.isSubmitting()) {
      return;
    }

    this.isSubmitting.set(true);
    this.submitError.set(null);

    const { name, email, subject, message } = this.contactForm.getRawValue();

    try {
      const response = await fetch('https://formsubmit.co/ajax/umairkhalid074@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          _replyto: email,
          _subject: subject,
          message
        })
      });
      const result = await response.json() as { success?: boolean | string; message?: string };

      if (!response.ok || (result.success !== true && result.success !== 'true')) {
        throw new Error(result.message || 'The email service could not accept your message.');
      }

      this.contactForm.reset();
      this.submitSuccess.set(true);
      setTimeout(() => this.submitSuccess.set(false), 5000);
    } catch (error: unknown) {
      console.error('Contact form submission failed:', error);
      this.submitError.set('Your message could not be sent. Please try again or email me directly.');
    } finally {
      this.isSubmitting.set(false);
    }
  }
}
