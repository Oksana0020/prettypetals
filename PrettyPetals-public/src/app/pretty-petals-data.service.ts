import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Flower } from './home-list/home-list.component';
import { environment } from '../environments/environment'; 

@Injectable({
  providedIn: 'root'
})
export class PrettyPetalsDataService {
  private apiBaseUrl = environment.apiUrl; 

  constructor(private http: HttpClient) {}

  // Fetch flowers from API
  public getFlowers(): Promise<Flower[]> {
    const url = `${this.apiBaseUrl}/flowers`; 
    return this.http.get<Flower[]>(url).toPromise()
      .then(response => response || []) 
      .catch(err => {
        console.error('Error fetching flowers:', err);
        return []; 
      });
  }
}



