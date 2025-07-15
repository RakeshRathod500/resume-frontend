import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ToastrService } from 'ngx-toastr';
import { ResumeService } from '../../services/resume.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@UntilDestroy()
@Component({
  selector: 'app-my-resumes',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './my-resumes.component.html',
  styleUrls: ['./my-resumes.component.css'],
})
export class MyResumesComponent implements OnInit {
  resumes: any[] = [];
  userId = 1; // Hardcoded for simplicity

  constructor(private resumeService: ResumeService, private toastr: ToastrService) {}

  ngOnInit() {
    this.resumeService.getResumes(this.userId).pipe(untilDestroyed(this)).subscribe({
      next: (resumes) => (this.resumes = resumes),
      error: () => this.toastr.error('Failed to load resumes'),
    });
  }

  deleteResume(id: string) {
    if (confirm('Are you sure you want to delete this resume?')) {
      this.resumeService.deleteResume(id).pipe(untilDestroyed(this)).subscribe({
        next: () => {
          this.resumes = this.resumes.filter(r => r.id !== id);
          this.toastr.success('Resume deleted');
        },
        error: () => this.toastr.error('Failed to delete resume'),
      });
    }
  }
}