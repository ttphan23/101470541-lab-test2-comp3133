import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Character } from '../../models/character';
import { HarrypotterService } from '../../services/harrypotter';
import { CharacterfilterComponent } from '../characterfilter/characterfilter';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-characterlist',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    CharacterfilterComponent,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './characterlist.html',
  styleUrl: './characterlist.css'
})
export class CharacterlistComponent implements OnInit {
  characters: Character[] = [];
  loading = true;
  errorMessage = '';

  constructor(private harryPotterService: HarrypotterService) {}

  ngOnInit(): void {
    this.loadAllCharacters();
  }

  loadAllCharacters(): void {
    this.loading = true;
    this.errorMessage = '';

    this.harryPotterService.getAllCharacters().subscribe({
      next: (data) => {
        this.characters = data;
        this.harryPotterService.setCharactersCache(data);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading all characters:', err);
        this.errorMessage = 'Failed to load characters.';
        this.loading = false;
      }
    });
  }

  onHouseSelected(house: string): void {
    if (!house) {
      this.loadAllCharacters();
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.harryPotterService.getCharactersByHouse(house).subscribe({
      next: (data) => {
        this.characters = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading characters by house:', err);
        this.errorMessage = 'Failed to load characters for selected house.';
        this.loading = false;
      }
    });
  }

  getCharacterImage(image: string): string {
    return image && image.trim() !== ''
      ? image
      : 'https://via.placeholder.com/250x320?text=No+Image';
  }

  getHouseLabel(house: string): string {
    return house && house.trim() !== '' ? house : 'No House';
  }
}