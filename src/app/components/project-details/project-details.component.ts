import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProjectService, Project } from '../../services/project.service';

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.scss'
})
export class ProjectDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private projectService = inject(ProjectService);

  project = signal<Project | undefined>(undefined);

  ngOnInit() {
    // Scroll to top when page loaded
    window.scrollTo(0, 0);

    // Fetch the project by id param
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        const foundProject = this.projectService.getProjectById(id);
        if (foundProject) {
          this.project.set(foundProject);
        } else {
          // Redirect to home if project is not found
          this.router.navigate(['/']);
        }
      } else {
        this.router.navigate(['/']);
      }
    });
  }
}
