import { Component, OnInit } from '@angular/core';
import { CsvDataService } from '../../services/csv-data.service';

@Component({
  selector: 'app-canada-summary',
  templateUrl: './canada-summary.component.html',
  styleUrls: ['./canada-summary.component.scss'],
})
export class CanadaSummaryComponent implements OnInit {
  csvData: any[] = [];

  constructor(private csvDataService: CsvDataService) { }

  ngOnInit() {
    this.csvDataService.getCanadaData().subscribe(data => {
      this.csvData = data;
      console.log('CSV Data:', this.csvData); // For debugging
    }, error => {
      console.error('Error fetching CSV data:', error);
    });
  }
}
