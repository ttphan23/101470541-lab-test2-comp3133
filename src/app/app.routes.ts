import { Routes } from '@angular/router';
import { CharacterlistComponent } from './components/characterlist/characterlist';
import { CharacterdetailsComponent } from './components/characterdetails/characterdetails';

export const routes: Routes = [
  { path: '', component: CharacterlistComponent },
  { path: 'characters/:id', component: CharacterdetailsComponent },
  { path: '**', redirectTo: '' }
];