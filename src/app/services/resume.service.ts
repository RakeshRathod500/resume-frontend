import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Resume } from '../models/resume.model';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {
  private apiUrl = 'http://localhost:5000/api/resumes';

  constructor(private http: HttpClient) {}

  getResume(id: string): Observable<Resume> {
    console.log('Fetching resume from:', `${this.apiUrl}/${id}`);
    return this.http.get<Resume>(`${this.apiUrl}/${id}`);
  }

  getResumes(userId: number): Observable<Resume[]> {
    console.log('Fetching resumes for user:', userId);
    return this.http.get<Resume[]>(`${this.apiUrl}?userId=${userId}`); // Adjust endpoint as needed
  }

  createResume(resume: Resume): Observable<Resume> {
    console.log('Creating resume:', resume);
    return this.http.post<Resume>(this.apiUrl, resume);
  }

  updateResume(id: string, resume: Resume): Observable<Resume> {
    console.log('Updating resume:', resume);
    return this.http.put<Resume>(`${this.apiUrl}/${id}`, resume);
  }

  deleteResume(id: string): Observable<void> {
    console.log('Deleting resume with ID:', id);
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Add user-related methods (assuming a separate API endpoint)
  getUser(userId: number): Observable<any> { // Replace 'any' with a User interface if defined
    console.log('Fetching user with ID:', userId);
    return this.http.get<any>(`http://localhost:5000/api/users/${userId}`); // Adjust endpoint
  }

  updateProfile(formData: any): Observable<any> { // Replace 'any' with a Profile interface if defined
    console.log('Updating profile:', formData);
    return this.http.put<any>(`http://localhost:5000/api/users/${formData.userId}`, formData); // Adjust endpoint
  }
}