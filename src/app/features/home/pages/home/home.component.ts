import { Component, OnInit } from '@angular/core';
import { PathService, IPath } from '@app/core/services/path.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  pages$: Observable<IPath[]>;
  displayedColumns = ['title', 'description', 'start_date', 'location_start', 'location_end', 'owner_id'];


  constructor(public pathApi: PathService) { }

  ngOnInit() {
    this.pages$ = this.pathApi.getPaths$();
  }
}
