import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-templates',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css'],
})
export class TemplatesComponent {
  templates = [
    { name: 'Modern', description: 'A sleek, modern layout.' },
    { name: 'Classic', description: 'A traditional, professional layout.' },
  ];
}