import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConferanceService } from '../services/conferance';

@Component({
  selector: 'app-add-coferance',
  imports: [ReactiveFormsModule],
  templateUrl: './add-coferance.html',
  styleUrl: './add-coferance.css',
})
export class AddCoferance {
  private readonly fb = inject(FormBuilder);
  private readonly conferenceService = inject(ConferanceService);
  private readonly router = inject(Router);
  error = '';

  conferenceForm = this.fb.nonNullable.group({
    title: ['', Validators.required],
    description: [''],
    location: [''],
    date: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(0)]],
    nbPlaces: [0, [Validators.required, Validators.min(1)]]
  });

  submitForm() {
    if (this.conferenceForm.invalid) {
      this.conferenceForm.markAllAsTouched();
      return;
    }

    this.conferenceService.addConferance(this.conferenceForm.getRawValue()).subscribe({
      next: () => this.router.navigate(['/list']),
      error: () => {
        this.error = 'Impossible d’ajouter la conférence.';
      }
    });
  }
}
