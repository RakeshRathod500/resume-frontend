import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ToastrService } from 'ngx-toastr';
import { ResumeService } from '../../services/resume.service';
import { CommonModule } from '@angular/common';

@UntilDestroy()
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  userId = 1; // Hardcoded for simplicity
  profilePicture: string | null = null;

  constructor(
    private fb: FormBuilder,
    private resumeService: ResumeService,
    private toastr: ToastrService
  ) {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      profilePicture: [null],
    });
  }

  ngOnInit() {
    this.resumeService.getUser(this.userId).pipe(untilDestroyed(this)).subscribe({
      next: (user) => {
        this.profileForm.patchValue(user);
        this.profilePicture = user.profilePicture;
      },
      error: () => this.toastr.error('Failed to load profile'),
    });
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.profileForm.patchValue({ profilePicture: input.files[0] });
    }
  }

  onSubmit() {
    if (this.profileForm.valid) {
      const formData = new FormData();
      formData.append('userId', this.userId.toString());
      formData.append('name', this.profileForm.get('name')!.value);
      formData.append('email', this.profileForm.get('email')!.value);
      if (this.profileForm.get('profilePicture')!.value) {
        formData.append('profilePicture', this.profileForm.get('profilePicture')!.value);
      }
      this.resumeService.updateProfile(formData).pipe(untilDestroyed(this)).subscribe({
        next: (response) => {
          this.profilePicture = response.profilePicture;
          this.toastr.success('Profile updated');
        },
        error: () => this.toastr.error('Failed to update profile'),
      });
    }
  }
}