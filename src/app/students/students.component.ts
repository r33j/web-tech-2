import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

type Student = {
  name: string;
  course: string;
  yearLevel: string;
};

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent {
  students: Student[] = [
    { name: 'Juan Dela Cruz', course: 'BSIT', yearLevel: '3rd Year' },
    { name: 'Maria Santos', course: 'BSCS', yearLevel: '2nd Year' },
    { name: 'Paolo Reyes', course: 'BSIT', yearLevel: '1st Year' },
  ];

  deleteStudent(i: number) {
    this.students.splice(i, 1);
  }
}