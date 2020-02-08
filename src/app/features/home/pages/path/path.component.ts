import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IPath, PathService } from '@app/core/services/path.service';
import { ActivatedRoute } from '@angular/router';
import { map, filter, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-path',
  templateUrl: './path.component.html',
  styleUrls: ['./path.component.scss']
})
export class PathComponent implements OnInit {
  path$: Observable<IPath>;
  pathID$: Observable<string>;

  constructor(private route: ActivatedRoute, private pathApi: PathService) { }

  ngOnInit() {
    this.path$ = this.route.params.pipe(
      map((params) => params.id),
      filter((id) => !!id),
      distinctUntilChanged(),
      switchMap((id) => this.pathApi.getPath$(id))
    );
  }
}
