// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { Router } from '@angular/router';
// import { RouterLink } from '@angular/router';

// @Component({
//   selector: 'app-create-student',
//   standalone: true,
//   imports: [CommonModule, FormsModule, RouterLink],
//   templateUrl: './create-student.component.html',
//   styleUrls: ['./create-student.component.scss'],
// })
// export class CreateStudentComponent {
//   constructor(private router: Router) {}

//   back() {
//     this.router.navigate(['/students']);     
//   }
// }

import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { StudentsService } from '../../services/students/students.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CreateStudentPayload } from '../../models/student.model';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class CreateStudentComponent {

  private readonly studentsService = inject(StudentsService);
  private readonly router = inject(Router);

  public form = new FormGroup({
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    age: new FormControl('', Validators.required),
    course: new FormControl('', Validators.required),
    year_level: new FormControl('', Validators.required),
    gpa: new FormControl('', Validators.required),
  });

  public async createStudent(): Promise<void> {
    if (this.form.invalid) {
      console.log('Form invalid');
      return;
    }

    const payload: CreateStudentPayload = {
      first_name: this.form.value.first_name ?? '',
      last_name: this.form.value.last_name ?? '',
      email: this.form.value.email ?? '',
      age: Number(this.form.value.age),
      course: this.form.value.course ?? '',
      year_level: Number(this.form.value.year_level),
      gpa: Number(this.form.value.gpa),
      enrollment_status: 'Active', // number type
    };

    try {
      console.log('Creating student', payload);
      await this.studentsService.createStudent(payload);
      // Navigate back to student list after creation
      this.router.navigate(['/students']);
    } catch (error) {
      console.error('Error creating student:', error);
    }
  }

  public back(): void {
    this.router.navigate(['/students']);
  }
}

