// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { RouterLink } from '@angular/router';

// type Student = {
//   name: string;
//   course: string;
//   yearLevel: string;
// };

// @Component({
//   selector: 'app-students',
//   standalone: true,
//   imports: [CommonModule, RouterLink],
//   templateUrl: './students.component.html',
//   styleUrls: ['./students.component.scss'],
// })
// export class StudentsComponent {
//   students: Student[] = [
//     { name: 'Juan Dela Cruz', course: 'BSIT', yearLevel: '3rd Year' },
//     { name: 'Maria Santos', course: 'BSCS', yearLevel: '2nd Year' },
//     { name: 'Paolo Reyes', course: 'BSIT', yearLevel: '1st Year' },
//   ];

//   deleteStudent(i: number) {
//     this.students.splice(i, 1);
//   }
// }

import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { StudentsService } from '../../services/students/students.service';
import { GetStudent } from '../../models/student.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class StudentsComponent implements OnInit {
  private readonly studentsService = inject(StudentsService);

  public students = signal<GetStudent[]>([]);

  async ngOnInit(): Promise<void> {
    await this.loadStudents();
  }

  private async loadStudents() {
    const data = await this.studentsService.getStudents();
    this.students.set(data);
  }

  // Delete student
  public async deleteStudent(studentId: string) {
    if (!confirm('Are you sure you want to delete this student?')) return;
    await this.studentsService.deleteStudent(studentId);
    await this.loadStudents(); // refresh list
  }
}
