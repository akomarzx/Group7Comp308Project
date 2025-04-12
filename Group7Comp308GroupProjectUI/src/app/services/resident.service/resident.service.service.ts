import { Injectable } from '@angular/core';
import { LocalNewsPost } from '../../models/Resident';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class ResidentService {

  #localNewsList$ : BehaviorSubject<LocalNewsPost[]> 

  constructor(private apollo: Apollo) { 
    this.#localNewsList$ = new BehaviorSubject<LocalNewsPost[]>(this.posts)
  }

  posts: LocalNewsPost[] = [
    {
      user: 'JaneDoe123',
      title: 'Road Construction on Main St.',
      content: 'Expect delays this week due to construction near the downtown intersection.',
      timestamp: new Date()
    },
    {
      user: 'LocalDad88',
      title: 'Community BBQ This Saturday!',
      content: 'Everyone is welcome at the park for food and fun. Starts at 2pm!',
      timestamp: new Date()
    }
  ];
  
  getAllLocalResidentNews() : Observable<LocalNewsPost[]> {
    return this.#localNewsList$.asObservable()
  }

  addNewLocalNews(newNews : LocalNewsPost) {
    this.#localNewsList$.next([...this.#localNewsList$.value, newNews])
  }

}
