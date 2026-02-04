import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-create-student',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.scss'],
})
export class CreateStudentComponent {
  constructor(private router: Router) {}

  back() {
    this.router.navigate(['/students']);     
  }
}
