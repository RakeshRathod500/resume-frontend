import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ResumeFormComponent } from './components/resume-form/resume-form.component';
import { ResumePreviewComponent } from './components/resume-preview/resume-preview.component';
import { TemplatesComponent } from './components/templates/templates.component';
import { MyResumesComponent } from './components/my-resumes/my-resumes.component';
import { ProfileComponent } from './components/profile/profile.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'resume-form', component: ResumeFormComponent },
  { path: 'resume-form/:id', component: ResumeFormComponent },
  { path: 'resume-preview/:id', component: ResumePreviewComponent },
  { path: 'templates', component: TemplatesComponent },
  { path: 'my-resumes', component: MyResumesComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '**', redirectTo: '' },
];