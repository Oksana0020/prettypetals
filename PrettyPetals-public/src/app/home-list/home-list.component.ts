import { Component, OnInit } from '@angular/core';
import { PrettyPetalsDataService } from '../pretty-petals-data.service'; 

// the Flower interface
export class Flower {
  _id!: string;
  name!: string;
  picture!: string;
  rating!: number;
  description!: string;
  careGuide!: {
    level: string;
    temperature: string;
    light: string;
    water: string;
    fertilize: string;
    bloomTime: string;
  };
  votes!: number;
}

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.css'],
  providers: [PrettyPetalsDataService] 
})
export class HomeListComponent implements OnInit {
  flowers: Flower[] = []; 

  quote = {
    lines: [
      "They are autographs of angels, penned",
      "In Nature’s green-leaved book, in blended tints,",
      "Borrowed from rainbows and the sunset skies,",
      "And written everywhere–on plain and hill,",
      "In lonely dells, ‘mid crowded haunts of men;",
      "On the broad prairies, where no eye save God’s",
      "May read their silent, sacred mysteries.",
      "Thank God for flowers!",
      "They gladden human hearts; Seraphic breathings part their fragrant lips",
      "With whisperings of Heaven."
    ],
    author: "Albert Laighton"
  };

  // injecting the data service into the constructor
  constructor(private prettyPetalsDataService: PrettyPetalsDataService) {}

  ngOnInit(): void {
    this.getFlowers(); 
  }

  private getFlowers(): void {
    this.prettyPetalsDataService.getFlowers()
      .then(foundFlowers => {
        this.flowers = foundFlowers; 
      })
      .catch(err => {
        console.error('Error fetching flowers:', err); 
      });
  }
}
