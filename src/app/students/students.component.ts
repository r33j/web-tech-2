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

  public async deleteStudent(studentId: string) {
    if (!confirm('Are you sure you want to delete this student?')) return;
    await this.studentsService.deleteStudent(studentId);
    await this.loadStudents(); 
  }
}
