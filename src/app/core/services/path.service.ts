import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';


export interface IPath {
  id: string;
  owner_id: string;

  title: string;
  description: string;

  start_date: string;

  location_start: string;
  location_end: string;

  created_at: string;
  updated_at: string;
}

const DATA = [
  {
    id: '1',
    owner_id: 'bla',
    title: 'Koper',
    description: 'Koper',
    start_date: '2020-02-08T16:53:44.774Z',
    location_end: 'Maribor',
    location_start: 'Ljubljana',
    created_at: '2020-02-08T16:53:44.774Z',
    updated_at: '2020-02-08T16:53:44.774Z'
  },
  {
    id: '2',
    owner_id: 'bla',
    title: 'Koper 2',
    description: 'Koper',
    start_date: '2020-02-08T16:53:44.774Z',
    location_end: 'Maribor',
    location_start: 'Ljubljana',
    created_at: '2020-02-08T16:53:44.774Z',
    updated_at: '2020-02-08T16:53:44.774Z'
  },
  {
    id: '3',
    owner_id: 'bla',
    title: 'Koper 3',
    description: 'Koper',
    start_date: '2020-02-08T16:53:44.774Z',
    location_end: 'Maribor',
    location_start: 'Ljubljana',
    created_at: '2020-02-08T16:53:44.774Z',
    updated_at: '2020-02-08T16:53:44.774Z'
  }
];

@Injectable({
  providedIn: 'root'
})
export class PathService {

  getPaths$({ limit, skip }: { limit?: number, skip?: number; } = {}) {
    return of<IPath[]>(DATA);
  }

  getPath$(id: string) {
    return of<IPath>(DATA.find((d) => d.id = id));
  }
}
