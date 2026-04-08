import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HarrypotterService } from '../../services/harrypotter';
import { Character } from '../../models/character';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-characterdetails',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './characterdetails.html',
  styleUrl: './characterdetails.css'
})
export class CharacterdetailsComponent implements OnInit {
  character?: Character;
  loading = true;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private harryPotterService: HarrypotterService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.errorMessage = 'Character ID not found.';
      this.loading = false;
      return;
    }

    const cachedCharacter = this.harryPotterService.getCharacterFromCache(id);

    if (cachedCharacter) {
      this.character = cachedCharacter;
      this.loading = false;
      return;
    }

    this.harryPotterService.getCharacterById(id).subscribe({
      next: (data) => {
        this.character = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading character details:', err);
        this.errorMessage = 'Failed to load character details.';
        this.loading = false;
      }
    });
  }

  getCharacterImage(image?: string): string {
    return image && image.trim() !== ''
      ? image
      : 'https://via.placeholder.com/350x450?text=No+Image';
  }

  getValue(value: string | undefined | null): string {
    return value && value.trim() !== '' ? value : 'N/A';
  }

  getWandLength(length: number | null | undefined): string {
    return length !== null && length !== undefined ? String(length) : 'N/A';
  }
}