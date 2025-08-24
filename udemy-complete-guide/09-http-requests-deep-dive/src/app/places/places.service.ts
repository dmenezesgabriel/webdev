import { inject, Injectable, signal } from '@angular/core';
import { map, catchError, throwError, tap } from 'rxjs';

import { Place } from './place.model';
import { HttpClient } from '@angular/common/http';
import { ErrorService } from '../shared/error.service';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private errorService = inject(ErrorService);
  private httpClient = inject(HttpClient);
  private userPlaces = signal<Place[]>([]);

  loadedUserPlaces = this.userPlaces.asReadonly();

  loadAvailablePlaces() {
    return this.fetchPlaces(
      'http://localhost:3000/places',
      'Something went wrong fetching the available places. Please try again later.'
    );
  }

  loadUserPlaces() {
    return this.fetchPlaces(
      'http://localhost:3000/user-places',
      'Something went wrong fetching favorite places. Please try again later.'
    ).pipe(
      tap({
        next: (userPlaces) => this.userPlaces.set(userPlaces),
      })
    );
  }

  addPlaceToUserPlaces(place: Place) {
    const prevPlaces = this.userPlaces();

    if (!prevPlaces.some((prevPlace) => prevPlace.id === place.id)) {
      // optimistic updating (before put request)
      this.userPlaces.set([...prevPlaces, place]);
    }

    return this.httpClient
      .put('http://localhost:3000/user-places', {
        placeId: place.id,
      })
      .pipe(
        // handle optimistic update errors
        catchError((error) => {
          this.userPlaces.set(prevPlaces);
          this.errorService.showError('Failed to store selected place.');
          return throwError(() => new Error('Failed to store selected place.'));
        })
      );
  }

  removeUserPlace(place: Place) {
    const prevPlaces = this.userPlaces();

    if (prevPlaces.some((prevPlace) => prevPlace.id === place.id)) {
      this.userPlaces.set(
        prevPlaces.filter((prevPlace) => prevPlace.id !== place.id)
      );
    }

    return this.httpClient
      .delete('http://localhost:3000/user-places/' + place.id)
      .pipe(
        catchError((error) => {
          this.userPlaces.set(prevPlaces);
          this.errorService.showError('Failed to remove the selected place.');
          return throwError(
            () => new Error('Failed to remove the selected place')
          );
        })
      );
  }

  private fetchPlaces(url: string, errorMessage: string) {
    return this.httpClient.get<{ places: Place[] }>(url).pipe(
      map((data) => data.places),
      catchError((error) => {
        console.log(error);
        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
