import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ResumeService } from '../../services/resume.service';
import { Resume, Education, Experience, Project, Certification } from '../../models/resume.model';
import { HttpClientModule } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-resume-form',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './resume-form.component.html',
  styleUrls: ['./resume-form.component.css']
})
export class ResumeFormComponent {
  resume: Resume = {
    id: null,
    userId: 1,
    title: 'My Resume',
    personalInfo: { name: '', email: '', phone: '', profilePicture: null },
    education: [{ degree: '', institution: '', year: '' }],
    experience: [{ company: '', position: '', duration: '', description: '' }],
    projects: [{ title: '', duration: '', description: '' }],
    certifications: [{ certificateName: '', issuingOrganization: '', year: '' }],
    skills: '',
    summary: '',
    template: 'modern'
  };
  newSkill: string = '';
  error: string | null = null;
  displayedSkills: string[] = [];

  constructor(private resumeService: ResumeService, private router: Router) {
    this.updateDisplayedSkills(); // Initialize displayedSkills
  }

  ngOnInit() {
    this.updateDisplayedSkills(); // Ensure skills are updated on init
  }

  updateDisplayedSkills() {
    if (this.resume.skills && typeof this.resume.skills === 'string') {
      this.displayedSkills = this.resume.skills.split(',').map(s => s.trim()).filter(s => s.length > 0);
      console.log('Displayed skills in form:', this.displayedSkills); // Debug log
    } else {
      this.displayedSkills = [];
    }
  }

  addEducation() {
    this.resume.education.push({ degree: '', institution: '', year: '' });
  }

  addExperience() {
    this.resume.experience.push({ company: '', position: '', duration: '', description: '' });
  }

  addProject() {
    this.resume.projects.push({ title: '', duration: '', description: '' });
  }

  addCertification() {
    this.resume.certifications.push({ certificateName: '', issuingOrganization: '', year: '' });
  }

  addSkill() {
    if (this.newSkill.trim()) {
      this.resume.skills = this.resume.skills
        ? `${this.resume.skills.trim()},${this.newSkill.trim()}`
        : this.newSkill.trim();
      this.newSkill = '';
      this.updateDisplayedSkills(); // Update displayedSkills after adding a skill
      console.log('Updated skills:', this.resume.skills); // Debug log
    }
  }

  onFileChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.resume.personalInfo.profilePicture = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    console.log('Submitting resume:', this.resume); // Debug log
    const saveObservable = this.resume.id
      ? this.resumeService.updateResume(this.resume.id.toString(), this.resume)
      : this.resumeService.createResume(this.resume);

    saveObservable.subscribe({
      next: (savedResume: Resume) => {
        console.log('Resume saved successfully:', savedResume);
        if (savedResume.id) {
          this.router.navigate([`/resume-preview/${savedResume.id}`]);
        } else {
          console.error('No ID returned from save operation');
          this.error = 'Save failed: No ID returned.';
        }
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error saving resume:', err.status, err.statusText, err.message, err);
        this.error = `Failed to save resume. Error: ${err.statusText || 'Unknown'} (Status: ${err.status || 0})`;
      }
    });
  }

  saveDraft() {
    console.log('Draft saved (not persisted):', this.resume);
  }

  scrollToSection(sectionId: string) {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  }
}