import { Component, OnInit } from '@angular/core';
import { CsvDataService } from '../../services/csv-data.service';

@Component({
  selector: 'app-ontario-status',
  templateUrl: './ontario-status.component.html',
  styleUrls: ['./ontario-status.component.scss'],
})
export class OntarioStatusComponent implements OnInit {
  csvData: any[] = [];

  constructor(private csvDataService: CsvDataService) { }

  ngOnInit() {
    this.csvDataService.getOntarioData().subscribe(data => {
      this.csvData = data;
      console.log('CSV Data:', this.csvData); // For debugging
    }, error => {
      console.error('Error fetching CSV data:', error);
    });
  }
}
