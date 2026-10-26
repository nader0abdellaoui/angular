import { Component, inject, input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConferanceService } from '../services/conferance';
import { Conferance } from '../models/conferance';

@Component({
  selector: 'app-update-conferance',
  imports: [ReactiveFormsModule],
  templateUrl: './update-conferance.html',
  styleUrl: './update-conferance.css',
})
export class UpdateConferance {
  id = input.required<string>();
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

  ngOnInit() {
    this.conferenceService.getById(Number(this.id())).subscribe({
      next: (conference) => this.conferenceForm.patchValue({
        title: conference.title || conference.name || '',
        description: conference.description || '',
        location: conference.location || conference.place || '',
        date: conference.date || '',
        price: conference.price || 0,
        nbPlaces: conference.nbPlaces || 0
      }),
      error: () => {
        this.error = 'Impossible de charger cette conférence.';
      }
    });
  }

  submitForm() {
    if (this.conferenceForm.invalid) {
      this.conferenceForm.markAllAsTouched();
      return;
    }

    const conference: Conferance = this.conferenceForm.getRawValue();
    this.conferenceService.updateConferance(Number(this.id()), conference).subscribe({
      next: () => this.router.navigate(['/details', this.id()]),
      error: () => {
        this.error = 'Impossible de modifier la conférence.';
      }
    });
  }
}
