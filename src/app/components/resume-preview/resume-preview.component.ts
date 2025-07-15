import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ResumeService } from '../../services/resume.service';
import { Resume, Education, Experience, Project, Certification } from '../../models/resume.model';
import { HttpClientModule } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-resume-preview',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './resume-preview.component.html',
  styleUrls: ['./resume-preview.component.css']
})
export class ResumePreviewComponent {
  resume: Resume | null = null;
  displayedSkills: string[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(private route: ActivatedRoute, private resumeService: ResumeService, private router: Router) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.resumeService.getResume(id).subscribe({
        next: (resume: Resume) => {
          this.resume = resume;
          this.updateDisplayedSkills();
          console.log('Loaded resume:', this.resume); // Debug log
          this.loading = false;
        },
        error: (err: HttpErrorResponse) => {
          this.error = `Failed to load resume. Error: ${err.statusText || 'Unknown'} (Status: ${err.status || 0})`;
          this.loading = false;
        }
      });
    } else {
      this.error = 'No resume ID provided.';
      this.loading = false;
    }
  }

  updateDisplayedSkills() {
    if (this.resume?.skills && typeof this.resume.skills === 'string') {
      this.displayedSkills = this.resume.skills.split(',').map(s => s.trim()).filter(s => s.length > 0);
      console.log('Displayed skills in preview:', this.displayedSkills); // Debug log
    } else {
      this.displayedSkills = [];
      console.log('No valid skills found:', this.resume?.skills); // Debug log
    }
  }

  downloadPDF() {
    if (!this.resume) return;

    const element = document.querySelector('.resume-card') as HTMLElement;
    html2canvas(element).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = 210; // A4 width in mm
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('resume.pdf');
    });
  }
}