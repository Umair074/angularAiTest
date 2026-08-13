import { Injectable, signal } from '@angular/core';

export interface Project {
  id: string;
  title: string;
  tagline: string;
  summary: string;
  description: string;
  challenge: string;
  solution: string;
  technologies: string[];
  role: string;
  timeline: string;
  keyFeatures: string[];
  githubUrl: string;
  liveUrl: string;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private readonly projectsList = signal<Project[]>([
    {
      id: 'novashop',
      title: 'NovaShop',
      tagline: 'Next-Gen E-Commerce Analytics Platform',
      summary: 'A high-performance online retail experience equipped with instant multi-facet searches, responsive checkout, and merchant analytics dashboard.',
      description: 'NovaShop is a state-of-the-art retail application designed for speed, beauty, and usability. It features a fully responsive client application integrated with a robust backend service to handle high checkout volumes while generating real-time metrics for merchants.',
      challenge: 'Managing high-frequency shopping cart state updates and ensuring search operations remain responsive under heavy inventory catalog filtering without lagging the client-side execution thread.',
      solution: 'Implemented visual state management with debounced search observables, client-side caching of query parameters, and highly optimized reactive lists. The checkout flow utilizes Stripe Elements configured dynamically via backend-controlled payment intents.',
      technologies: ['Angular', 'RxJS', 'TypeScript', 'SCSS', 'Stripe API', 'Chart.js'],
      role: 'Lead Full-Stack Architect',
      timeline: '4 Months (Q1 2026)',
      keyFeatures: [
        'Instant multi-parameter catalog filtering and keyword search',
        'Intuitive glassmorphism merchant dashboard with transaction graphs',
        'Optimistic updates for shopping cart interactions',
        'Secure multi-tier checkout integrated with Stripe API'
      ],
      githubUrl: 'https://github.com/example/novashop',
      liveUrl: 'https://novashop-demo.example.com',
      image: '/project1.jpg'
    },
    {
      id: 'aetherdash',
      title: 'AetherDash',
      tagline: 'Real-time Cloud Network Monitoring & Metric Explorer',
      summary: 'A futuristic analytics platform visualizing network topology health, server telemetry, and traffic spikes with millisecond precision.',
      description: 'AetherDash serves cloud operators by compiling complex log systems into sleek interactive diagrams. The tool plots globally distributed node statuses, latency distributions, and active alert systems in a unified glass-themed command interface.',
      challenge: 'Parsing and streaming high-throughput server telemetry data (thousands of events per second) to browser visualizations without causing frame drops or UI thread freezes.',
      solution: 'Structured a Web Worker architecture to run CPU-intensive statistics aggregation off the main thread, feeding data to Angular signals in chunks. Rendered data points utilizing Chart.js configured for high-frequency updates.',
      technologies: ['Angular', 'TypeScript', 'Web Workers', 'RxJS', 'Chart.js', 'SCSS'],
      role: 'Frontend Systems Engineer',
      timeline: '3 Months (Q2 2026)',
      keyFeatures: [
        'Global network node status topology mapping',
        'Configurable layout widgets with live telemetry logs',
        'Sub-millisecond data buffering using Web Workers',
        'Automated alert thresholds with native browser notification triggers'
      ],
      githubUrl: 'https://github.com/example/aetherdash',
      liveUrl: 'https://aetherdash-demo.example.com',
      image: '/project2.jpg'
    },
    {
      id: 'zenith',
      title: 'Zenith Canvas',
      tagline: 'Collaborative Gantt-integrated Workspace',
      summary: 'A high-fidelity project collaboration interface mapping cards to timeline tracks with intuitive drag-and-drop mechanics.',
      description: 'Zenith Canvas reinvents collaborative tracking by unifying Kanban boards with dynamic interactive timeline layouts. Designed for multi-tenant teams, it enables visual task updates, team member presence indicators, and milestones forecasting.',
      challenge: 'Implementing fluid drag-and-drop operations between discrete page components (Kanban columns to Gantt timelines) while maintaining consistent cross-component state synchronization.',
      solution: 'Customized drag-and-drop handlers using Angular CDK and managed coordinate system overlays to compute visual overlaps. Leveraged Angular signals to trigger immediate, fine-grained DOM recalculations.',
      technologies: ['Angular', 'Angular CDK', 'RxJS', 'SCSS', 'TypeScript'],
      role: 'UI/UX Developer',
      timeline: '5 Months (Q3 2026)',
      keyFeatures: [
        'Dynamic timeline track syncing with kanban board columns',
        'Smooth coordinate overlaps handling using custom layout engines',
        'Multi-member task assignment and visual tags filtering',
        'Interactive workflow charts for tracking sprint progress'
      ],
      githubUrl: 'https://github.com/example/zenith',
      liveUrl: 'https://zenith-demo.example.com',
      image: '/project3.jpg'
    }
  ]);

  getProjects(): Project[] {
    return this.projectsList();
  }

  getProjectById(id: string): Project | undefined {
    return this.projectsList().find(p => p.id === id);
  }
}
