import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'project/:id', component: ProjectDetailsComponent },
  { path: '**', redirectTo: '' }
];
