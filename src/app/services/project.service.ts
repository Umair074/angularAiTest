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
  githubUrl?: string;
  liveUrl?: string;
  image: string;
  category: 'angular' | 'capacitor' | 'composejs';
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private readonly projectsList = signal<Project[]>([
    {
      id: 'aetherdash',
      title: 'AetherDash',
      category: 'angular',
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
      id: 'syncmobile',
      title: 'SyncMobile',
      category: 'capacitor',
      tagline: 'Offline-First Hybrid Task Management Suite',
      summary: 'A cross-platform mobile task client using CapacitorJS to bridge web code with iOS and Android native storage and notification layers.',
      description: 'SyncMobile allows enterprise teams to log tasks, update project boards, and trigger location-based notifications completely offline. Built as an Angular application, it is packaged with CapacitorJS to run natively on mobile hardware.',
      challenge: 'Synchronizing locally cached task queues with the server backend upon restoration of network connectivity while preventing duplicate entry states.',
      solution: 'Implemented a RxJS-based synchronizer combined with SQLite via Capacitor Community Data Storage. Listened to network connection changes via Capacitor Network plugin to auto-flush offline queues.',
      technologies: ['Angular', 'CapacitorJS', 'SQLite', 'RxJS', 'TypeScript', 'Android Studio', 'Xcode'],
      role: 'Hybrid Mobile Architect',
      timeline: '4 Months (Q1 2026)',
      keyFeatures: [
        'Biometric authentication wrapper using Capacitor Fingerprint Auth',
        'Background sync queue with auto-retry logic',
        'Local notifications triggered by location geofencing',
        'Unified SCSS layout conforming to Material Design and Cupertino guidelines'
      ],
      githubUrl: 'https://github.com/example/syncmobile',
      // liveUrl is omitted to demonstrate optional link handling
      image: '/project1.jpg'
    },
    {
      id: 'composedesk',
      title: 'ComposeDesk',
      category: 'composejs',
      tagline: 'Declarative Multiplatform Graphic & Canvas Workspace',
      summary: 'An interactive, state-driven vector mockup drawing canvas built using Kotlin and Jetpack Compose for Web (ComposeJS).',
      description: 'ComposeDesk delivers desktop-grade layout and mockup building workflows to browser clients. Written entirely in Kotlin, it utilizes Compose Multiplatform HTML/JS to compile declarative UI layouts running directly on the browser\'s DOM canvas.',
      challenge: 'Maintaining fluid rendering rates (60FPS) while dragging vector shapes with complex gradients on a HTML canvas.',
      solution: 'Utilized Kotlin Coroutines to isolate canvas calculations and leveraged Compose\'s smart recomposition loops to draw only modified canvas bounds.',
      technologies: ['Kotlin', 'Compose Multiplatform', 'Kotlin/JS', 'Gradle', 'Canvas API', 'Kotlin Coroutines'],
      role: 'Kotlin UI Engineer',
      timeline: '5 Months (Q3 2026)',
      keyFeatures: [
        'Full vector path rendering utilizing HTML Canvas context',
        'Declarative UI state structures written completely in Kotlin',
        'Dynamic zooming and panning controls with coordinate mappings',
        'Export modules converting canvas layout JSON to SVG code'
      ],
      // githubUrl is omitted to demonstrate optional link handling
      liveUrl: 'https://composedesk-demo.example.com',
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
