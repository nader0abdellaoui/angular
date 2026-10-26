import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ConferanceService } from '../services/conferance';
import { Conferance } from '../models/conferance';

@Component({
  selector: 'app-conferance-list',
  imports: [RouterLink],
  templateUrl: './conferance-list.html',
  styleUrl: './conferance-list.css',
})
export class ConferanceList {
  //signal
   conferances: Conferance[] = [];
   error = '';

   private readonly conferenceService = inject(ConferanceService);

   ngOnInit() {
     this.loadConferences();
   }

   loadConferences() {
     this.conferenceService.getAll().subscribe({
       next: (conferences) => {
         this.conferances = conferences;
         this.error = '';
       },
       error: () => {
         this.error = 'Impossible de charger les conférences.';
       }
     });
   }

   deleteConference(id: number | undefined) {
     if (id === undefined) {
       return;
     }

     this.conferenceService.deleteConferance(id).subscribe({
       next: () => this.loadConferences(),
       error: () => {
         this.error = 'Impossible de supprimer cette conférence.';
       }
     });
   }

   conferenceName(conf: Conferance) {
     return conf.title || conf.name || 'Conférence sans titre';
   }
}
