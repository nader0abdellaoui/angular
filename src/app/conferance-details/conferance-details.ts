import { Component, input, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ConferanceService } from '../services/conferance';
import { Conferance } from '../models/conferance';

@Component({
  selector: 'app-conferance-details',
  imports: [RouterLink],
  templateUrl: './conferance-details.html',
  styleUrl: './conferance-details.css',
})
export class ConferanceDetails {
  //   conferances :any[]=[
  //   {id:1,name:"angular",date:"2023-01-01",place:"tunis"},
  //   {id:2,name:"react",date:"2023-02-01",place:"sfax"},
  //   {id:3,name:"vue",date:"2023-03-01",place:"sousse"},
  // ]
//   conf=input<any>()
//  inc = output();
//   onsave(){
//     this.inc.emit();
//   }
//private aroute = inject(ActivatedRoute);
//activated Route
// constructor(private aroute:ActivatedRoute){
//   this.id = this.aroute.snapshot.params['id'];
//   console.log(this.id);
  
// }
conference?: Conferance;
error = '';
constructor(
  private conferenceService: ConferanceService
) {}
 id= input.required<string>();

 ngOnInit() {
const id = Number(this.id());
   this.conferenceService.getById(id).subscribe({
     next: (conference) => {
       this.conference = conference;
       this.error = '';
     },
     error: () => {
       this.error = 'Impossible de charger cette conférence.';
     }
   });
 }

  private r = inject(Router);

   deleteConference() {
     const id = Number(this.id());
     this.conferenceService.deleteConferance(id).subscribe({
       next: () => this.goBack(),
       error: () => {
         this.error = 'Impossible de supprimer cette conférence.';
       }
     });
   }

   goBack() {
     this.r.navigate(['/list']);
   }
}
