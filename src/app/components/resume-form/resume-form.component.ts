// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';
// import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
// import { ToastrService } from 'ngx-toastr';
// import { ResumeService } from '../../services/resume.service';
// import { CommonModule } from '@angular/common';
// import { RouterLink } from '@angular/router';

// @UntilDestroy()
// @Component({
//   selector: 'app-resume-form',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule, RouterLink],
//   templateUrl: './resume-form.component.html',
//   styleUrls: ['./resume-form.component.css'],
// })
// export class ResumeFormComponent implements OnInit {
//   resumeForm: FormGroup;
//   resumeId: string | null = null;
//   userId = 1; // Hardcoded for simplicity (no auth)

//   constructor(
//     private fb: FormBuilder,
//     private resumeService: ResumeService,
//     private route: ActivatedRoute,
//     private router: Router,
//     private toastr: ToastrService
//   ) {
//     this.resumeForm = this.fb.group({
//       title: ['', Validators.required],
//       personalInfo: this.fb.group({
//         name: ['', Validators.required],
//         email: ['', [Validators.required, Validators.email]],
//         phone: [''],
//       }),
//       education: this.fb.group({
//         degree: [''],
//         institution: [''],
//         year: [''],
//       }),
//       experience: this.fb.group({
//         company: [''],
//         position: [''],
//         duration: [''],
//       }),
//       skills: [''],
//       template: ['modern'],
//     });
//   }

//   ngOnInit() {
//     this.resumeId = this.route.snapshot.paramMap.get('id');
//     if (this.resumeId) {
//       this.resumeService.getResume(this.resumeId).pipe(untilDestroyed(this)).subscribe({
//         next: (resume) => this.resumeForm.patchValue(resume),
//         error: () => this.toastr.error('Failed to load resume'),
//       });
//     }
//   }

//   onSubmit() {
//     if (this.resumeForm.valid) {
//       const resumeData = { ...this.resumeForm.value, userId: this.userId };
//       const observable = this.resumeId
//         ? this.resumeService.updateResume(this.resumeId, resumeData)
//         : this.resumeService.createResume(resumeData);
//       observable.pipe(untilDestroyed(this)).subscribe({
//         next: () => {
//           this.toastr.success(this.resumeId ? 'Resume updated' : 'Resume created');
//           this.router.navigate(['/my-resumes']);
//         },
//         error: () => this.toastr.error('Failed to save resume'),
//       });
//     }
//   }
// }


// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { Resume } from '../../models/resume.model';
// import { ResumeService } from '../../services/resume.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-resume-form',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './resume-form.component.html',
//   styleUrls: ['./resume-form.component.css'],
// })
// export class ResumeFormComponent {
//   resume: Resume = {
//     id: 0,
//     userId: 1, // Placeholder
//     title: 'My Resume',
//     personalInfo: { name: '', email: '', phone: '', profilePicture: null },
//     education: { degree: '', institution: '', year: '' },
//     experience: { company: '', position: '', duration: '' },
//     skills: '',
//     template: 'modern',
//   };
//   newSkill: string = '';

//   constructor(private resumeService: ResumeService, private router: Router) {}

//   onFileChange(event: any) {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         this.resume.personalInfo.profilePicture = e.target?.result as string;
//       };
//       reader.readAsDataURL(file);
//     }
//   }

//   addSkill() {
//     if (this.newSkill.trim()) {
//       this.resume.skills = this.resume.skills ? `${this.resume.skills},${this.newSkill.trim()}` : this.newSkill.trim();
//       this.newSkill = '';
//     }
//   }

//   onSubmit() {
//     this.resumeService.createResume(this.resume).subscribe({
//       next: (response) => {
//         this.router.navigate(['/resume-preview', response.id]);
//       },
//       error: (err) => console.error('Error saving resume', err),
//     });
//   }

//   saveDraft() {
//     console.log('Draft saved:', this.resume); // Placeholder for draft logic
//     // Add logic to save draft to localStorage or backend
//   }
// }
//new


// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { Resume, Education, Experience } from '../../models/resume.model';
// import { ResumeService } from '../../services/resume.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-resume-form',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './resume-form.component.html',
//   styleUrls: ['./resume-form.component.css'],
// })
// export class ResumeFormComponent {
//   resume: Resume = {
//     id: 0,
//     userId: 1, // Placeholder
//     title: 'My Resume',
//     personalInfo: { name: '', email: '', phone: '', profilePicture: null },
//     education: [{ degree: '', institution: '', year: '' }],
//     experience: [{ company: '', position: '', duration: '' }],
//     skills: '',
//     summary: '',
//     template: 'modern',
//   };
//   newSkill: string = '';

//   constructor(private resumeService: ResumeService, private router: Router) {}

//   onFileChange(event: any) {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         this.resume.personalInfo.profilePicture = e.target?.result as string;
//       };
//       reader.readAsDataURL(file);
//     }
//   }

//   addSkill() {
//     if (this.newSkill.trim()) {
//       this.resume.skills = this.resume.skills ? `${this.resume.skills},${this.newSkill.trim()}` : this.newSkill.trim();
//       this.newSkill = '';
//     }
//   }

//   addEducation() {
//     this.resume.education.push({ degree: '', institution: '', year: '' });
//   }

//   addExperience() {
//     this.resume.experience.push({ company: '', position: '', duration: '' });
//   }

//   onSubmit() {
//     this.resumeService.createResume(this.resume).subscribe({
//       next: (response) => {
//         this.router.navigate(['/resume-preview', response.id]);
//       },
//       error: (err) => console.error('Error saving resume', err),
//     });
//   }

//   saveDraft() {
//     console.log('Draft saved:', this.resume); // Placeholder for draft logic
//   }
// }
// new 1

// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { Router } from '@angular/router';
// import { ResumeService } from '../../services/resume.service';
// import { Resume, Education, Experience } from '../../models/resume.model';
// import { HttpClientModule } from '@angular/common/http';

// @Component({
//   selector: 'app-resume-form',
//   standalone: true,
//   imports: [CommonModule, FormsModule, HttpClientModule],
//   templateUrl: './resume-form.component.html',
//   styleUrls: ['./resume-form.component.css']
// })
// export class ResumeFormComponent {
//   resume: Resume = {
//     id: 0,
//     userId: 1, // Adjust based on auth
//     title: 'My Resume',
//     personalInfo: { name: '', email: '', phone: '', profilePicture: null },
//     education: [{ degree: '', institution: '', year: '' }],
//     experience: [{ company: '', position: '', duration: '' }],
//     skills: '',
//     summary: '',
//     template: 'modern'
//   };
//   newSkill: string = '';

//   constructor(private resumeService: ResumeService, private router: Router) {}

//   addEducation() {
//     this.resume.education.push({ degree: '', institution: '', year: '' });
//   }

//   addExperience() {
//     this.resume.experience.push({ company: '', position: '', duration: '' });
//   }

//   addSkill() {
//     if (this.newSkill.trim()) {
//       this.resume.skills = this.resume.skills ? `${this.resume.skills},${this.newSkill.trim()}` : this.newSkill.trim();
//       this.newSkill = '';
//     }
//   }

//   onFileChange(event: Event) {
//     const file = (event.target as HTMLInputElement).files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         this.resume.personalInfo.profilePicture = e.target?.result as string;
//       };
//       reader.readAsDataURL(file);
//     }
//   }

//   onSubmit() {
//     this.resumeService.saveResume(this.resume).subscribe({
//       next: (savedResume) => {
//         console.log('Resume saved:', savedResume);
//         // Navigate to preview with the saved ID
//         this.router.navigate([`/resume-preview/${savedResume.id}`]);
//       },
//       error: (err) => {
//         console.error('Error saving resume:', err);
//       }
//     });
//   }

//   saveDraft() {
//     // Implement draft logic if needed
//     console.log('Draft saved:', this.resume);
//   }
// }
// new 2

// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { Router } from '@angular/router';
// import { ResumeService } from '../../services/resume.service';
// import { Resume, Education, Experience } from '../../models/resume.model';
// import { HttpClientModule } from '@angular/common/http';
// import { HttpErrorResponse } from '@angular/common/http';

// @Component({
//   selector: 'app-resume-form',
//   standalone: true,
//   imports: [CommonModule, FormsModule, HttpClientModule],
//   templateUrl: './resume-form.component.html',
//   styleUrls: ['./resume-form.component.css']
// })
// export class ResumeFormComponent {
//   resume: Resume = {
//     id: null,
//     userId: 1,
//     title: 'My Resume',
//     personalInfo: { name: '', email: '', phone: '', profilePicture: null },
//     education: [{ degree: '', institution: '', year: '' }],
//     experience: [{ company: '', position: '', duration: '' }],
//     skills: '',
//     summary: '',
//     template: 'modern'
//   };
//   newSkill: string = '';
//   error: string | null = null;

//   constructor(private resumeService: ResumeService, private router: Router) {}

//   addEducation() {
//     this.resume.education.push({ degree: '', institution: '', year: '' });
//   }

//   addExperience() {
//     this.resume.experience.push({ company: '', position: '', duration: '' });
//   }

//   addSkill() {
//     if (this.newSkill.trim()) {
//       this.resume.skills = this.resume.skills
//         ? `${this.resume.skills},${this.newSkill.trim()}`
//         : this.newSkill.trim();
//       this.newSkill = '';
//     }
//   }

//   onFileChange(event: Event) {
//     const file = (event.target as HTMLInputElement).files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         // Optional: Resize image to reduce size (e.g., using a library like 'image-compressor.js')
//         this.resume.personalInfo.profilePicture = e.target?.result as string || null;
//       };
//       reader.readAsDataURL(file);
//     }
//   }

//   onSubmit() {
//     console.log('Submitting resume:', this.resume);
//     const saveObservable = this.resume.id
//       ? this.resumeService.updateResume(this.resume.id.toString(), this.resume)
//       : this.resumeService.createResume(this.resume);

//     saveObservable.subscribe({
//       next: (savedResume: Resume) => {
//         console.log('Resume saved successfully:', savedResume);
//         if (savedResume.id) {
//           this.router.navigate([`/resume-preview/${savedResume.id}`]);
//         } else {
//           console.error('No ID returned from save operation');
//           this.error = 'Save failed: No ID returned.';
//         }
//       },
//       error: (err: HttpErrorResponse) => {
//         console.error('Error saving resume:', err.status, err.statusText, err.message, err);
//         this.error = `Failed to save resume. Error: ${err.statusText || 'Unknown'} (Status: ${err.status || 0})`;
//       }
//     });
//   }

//   saveDraft() {
//     console.log('Draft saved (not persisted):', this.resume);
//   }
// }
// des

// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { Router } from '@angular/router';
// import { ResumeService } from '../../services/resume.service';
// import { Resume, Education, Experience, Project } from '../../models/resume.model';
// import { HttpClientModule } from '@angular/common/http';
// import { HttpErrorResponse } from '@angular/common/http';

// @Component({
//   selector: 'app-resume-form',
//   standalone: true,
//   imports: [CommonModule, FormsModule, HttpClientModule],
//   templateUrl: './resume-form.component.html',
//   styleUrls: ['./resume-form.component.css']
// })
// export class ResumeFormComponent {
//   resume: Resume = {
//     id: null,
//     userId: 1,
//     title: 'My Resume',
//     personalInfo: { name: '', email: '', phone: '', profilePicture: null },
//     education: [{ degree: '', institution: '', year: '' }],
//     experience: [{ company: '', position: '', duration: '', description: '' }],
//     projects: [{ title: '', duration: '', description: '' }],
//     skills: '',
//     summary: '',
//     template: 'modern'
//   };
//   newSkill: string = '';
//   error: string | null = null;

//   constructor(private resumeService: ResumeService, private router: Router) {}

//   addEducation() {
//     this.resume.education.push({ degree: '', institution: '', year: '' });
//   }

//   addExperience() {
//     this.resume.experience.push({ company: '', position: '', duration: '', description: '' });
//   }

//   addProject() {
//     this.resume.projects.push({ title: '', duration: '', description: '' });
//   }

//   addSkill() {
//     if (this.newSkill.trim()) {
//       this.resume.skills = this.resume.skills
//         ? `${this.resume.skills},${this.newSkill.trim()}`
//         : this.newSkill.trim();
//       this.newSkill = '';
//     }
//   }

//   onFileChange(event: Event) {
//     const file = (event.target as HTMLInputElement).files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         this.resume.personalInfo.profilePicture = e.target?.result as string;
//       };
//       reader.readAsDataURL(file);
//     }
//   }

//   onSubmit() {
//     console.log('Submitting resume:', this.resume);
//     const saveObservable = this.resume.id
//       ? this.resumeService.updateResume(this.resume.id.toString(), this.resume)
//       : this.resumeService.createResume(this.resume);

//     saveObservable.subscribe({
//       next: (savedResume: Resume) => {
//         console.log('Resume saved successfully:', savedResume);
//         if (savedResume.id) {
//           this.router.navigate([`/resume-preview/${savedResume.id}`]);
//         } else {
//           console.error('No ID returned from save operation');
//           this.error = 'Save failed: No ID returned.';
//         }
//       },
//       error: (err: HttpErrorResponse) => {
//         console.error('Error saving resume:', err.status, err.statusText, err.message, err);
//         this.error = `Failed to save resume. Error: ${err.statusText || 'Unknown'} (Status: ${err.status || 0})`;
//       }
//     });
//   }

//   saveDraft() {
//     console.log('Draft saved (not persisted):', this.resume);
//   }
// }
// skill


// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { Router } from '@angular/router';
// import { ResumeService } from '../../services/resume.service';
// import { Resume, Education, Experience, Project, Certification } from '../../models/resume.model';
// import { HttpClientModule } from '@angular/common/http';
// import { HttpErrorResponse } from '@angular/common/http';

// @Component({
//   selector: 'app-resume-form',
//   standalone: true,
//   imports: [CommonModule, FormsModule, HttpClientModule],
//   templateUrl: './resume-form.component.html',
//   styleUrls: ['./resume-form.component.css']
// })
// export class ResumeFormComponent {
//   resume: Resume = {
//     id: null,
//     userId: 1,
//     title: 'My Resume',
//     personalInfo: { name: '', email: '', phone: '', profilePicture: null },
//     education: [{ degree: '', institution: '', year: '' }],
//     experience: [{ company: '', position: '', duration: '', description: '' }],
//     projects: [{ title: '', duration: '', description: '' }],
//     certifications: [{ certificateName: '', issuingOrganization: '', year: '' }],
//     skills: '',
//     summary: '',
//     template: 'modern'
//   };
//   newSkill: string = '';
//   error: string | null = null;

//   constructor(private resumeService: ResumeService, private router: Router) {}

//   addEducation() {
//     this.resume.education.push({ degree: '', institution: '', year: '' });
//   }

//   addExperience() {
//     this.resume.experience.push({ company: '', position: '', duration: '', description: '' });
//   }

//   addProject() {
//     this.resume.projects.push({ title: '', duration: '', description: '' });
//   }

//   addCertification() {
//     this.resume.certifications.push({ certificateName: '', issuingOrganization: '', year: '' });
//   }

//   addSkill() {
//     if (this.newSkill.trim()) {
//       this.resume.skills = this.resume.skills
//         ? `${this.resume.skills},${this.newSkill.trim()}`
//         : this.newSkill.trim();
//       this.newSkill = '';
//     }
//   }

//   onFileChange(event: Event) {
//     const file = (event.target as HTMLInputElement).files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         this.resume.personalInfo.profilePicture = e.target?.result as string;
//       };
//       reader.readAsDataURL(file);
//     }
//   }

//   onSubmit() {
//     console.log('Submitting resume:', this.resume);
//     const saveObservable = this.resume.id
//       ? this.resumeService.updateResume(this.resume.id.toString(), this.resume)
//       : this.resumeService.createResume(this.resume);

//     saveObservable.subscribe({
//       next: (savedResume: Resume) => {
//         console.log('Resume saved successfully:', savedResume);
//         if (savedResume.id) {
//           this.router.navigate([`/resume-preview/${savedResume.id}`]);
//         } else {
//           console.error('No ID returned from save operation');
//           this.error = 'Save failed: No ID returned.';
//         }
//       },
//       error: (err: HttpErrorResponse) => {
//         console.error('Error saving resume:', err.status, err.statusText, err.message, err);
//         this.error = `Failed to save resume. Error: ${err.statusText || 'Unknown'} (Status: ${err.status || 0})`;
//       }
//     });
//   }

//   saveDraft() {
//     console.log('Draft saved (not persisted):', this.resume);
//   }
// }

// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { Router } from '@angular/router';
// import { ResumeService } from '../../services/resume.service';
// import { Resume, Education, Experience, Project, Certification } from '../../models/resume.model';
// import { HttpClientModule } from '@angular/common/http';
// import { HttpErrorResponse } from '@angular/common/http';

// @Component({
//   selector: 'app-resume-form',
//   standalone: true,
//   imports: [CommonModule, FormsModule, HttpClientModule],
//   templateUrl: './resume-form.component.html',
//   styleUrls: ['./resume-form.component.css']
// })
// export class ResumeFormComponent {
//   resume: Resume = {
//     id: null,
//     userId: 1,
//     title: 'My Resume',
//     personalInfo: { name: '', email: '', phone: '', profilePicture: null },
//     education: [{ degree: '', institution: '', year: '' }],
//     experience: [{ company: '', position: '', duration: '', description: '' }],
//     projects: [{ title: '', duration: '', description: '' }],
//     certifications: [{ certificateName: '', issuingOrganization: '', year: '' }],
//     skills: '',
//     summary: '',
//     template: 'modern'
//   };
//   newSkill: string = '';
//   error: string | null = null;

//   constructor(private resumeService: ResumeService, private router: Router) {}

//   addEducation() {
//     this.resume.education.push({ degree: '', institution: '', year: '' });
//   }

//   addExperience() {
//     this.resume.experience.push({ company: '', position: '', duration: '', description: '' });
//   }

//   addProject() {
//     this.resume.projects.push({ title: '', duration: '', description: '' });
//   }

//   addCertification() {
//     this.resume.certifications.push({ certificateName: '', issuingOrganization: '', year: '' });
//   }

//   addSkill() {
//     if (this.newSkill.trim()) {
//       this.resume.skills = this.resume.skills
//         ? `${this.resume.skills},${this.newSkill.trim()}`
//         : this.newSkill.trim();
//       this.newSkill = '';
//     }
//   }

//   onFileChange(event: Event) {
//     const file = (event.target as HTMLInputElement).files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         this.resume.personalInfo.profilePicture = e.target?.result as string;
//       };
//       reader.readAsDataURL(file);
//     }
//   }

//   onSubmit() {
//     console.log('Submitting resume:', this.resume);
//     const saveObservable = this.resume.id
//       ? this.resumeService.updateResume(this.resume.id.toString(), this.resume)
//       : this.resumeService.createResume(this.resume);

//     saveObservable.subscribe({
//       next: (savedResume: Resume) => {
//         console.log('Resume saved successfully:', savedResume);
//         if (savedResume.id) {
//           this.router.navigate([`/resume-preview/${savedResume.id}`]);
//         } else {
//           console.error('No ID returned from save operation');
//           this.error = 'Save failed: No ID returned.';
//         }
//       },
//       error: (err: HttpErrorResponse) => {
//         console.error('Error saving resume:', err.status, err.statusText, err.message, err);
//         this.error = `Failed to save resume. Error: ${err.statusText || 'Unknown'} (Status: ${err.status || 0})`;
//       }
//     });
//   }

//   saveDraft() {
//     console.log('Draft saved (not persisted):', this.resume);
//   }

//   scrollToSection(sectionId: string) {
//     document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
//   }
// }

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