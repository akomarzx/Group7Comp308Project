import { Injectable } from '@angular/core';
import { EmergencyAlerts, LocalNewsPost, NeighborhoodHelpPost } from '../../models/Resident';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class ResidentService {

  #localNewsList$: BehaviorSubject<LocalNewsPost[]>;
  #neighboorhoodPostList$: BehaviorSubject<NeighborhoodHelpPost[]>
  #emergencyAlertsList$: BehaviorSubject<EmergencyAlerts[]>

  constructor(private apollo: Apollo) {
    this.#localNewsList$ = new BehaviorSubject<LocalNewsPost[]>(this.posts);
    this.#neighboorhoodPostList$ = new BehaviorSubject<NeighborhoodHelpPost[]>(this.nhPost);
    this.#emergencyAlertsList$ = new BehaviorSubject<EmergencyAlerts[]>(this.emergencyAlerts)
  }

  posts: LocalNewsPost[] = [
    {
      userId: '12312312312',
      username: 'JaneDoe123',
      title: 'Road Construction on Main St.',
      content:
        'Expect delays this week due to construction near the downtown intersection.',
      timestamp: new Date(),
    },
    {
      userId: '12312312312',
      username: 'LocalDad88',
      title: 'Community BBQ This Saturday!',
      content:
        'Everyone is welcome at the park for food and fun. Starts at 2pm!',
      timestamp: new Date(),
    },
  ];

  nhPost: NeighborhoodHelpPost[] = [
    {
      userId: 'u123',
      username: 'HelpingHand88',
      title: 'Need Help with Gardening',
      content:
        'I’m looking for someone to help me with weeding and planting in my backyard this weekend.',
      interestsArea: ['Gardening', 'Outdoor Work'],
      location: 'Maplewood Crescent, Toronto',
      timestamp: new Date('2025-04-10T10:00:00Z'),
    },
    {
      userId: 'u456',
      username: 'FoodieFriend',
      title: 'Offering Home-Cooked Meals',
      content:
        'Happy to provide meals to anyone in the area who needs a hot dish.',
      interestsArea: ['Cooking', 'Community Support'],
      location: 'King Street West, Hamilton',
      timestamp: new Date('2025-04-12T14:30:00Z'),
    },
    {
      userId: null,
      username: 'AnonymousNeighbor',
      title: 'Need Help Moving Furniture',
      content:
        'I have a bad back and need assistance moving a couch into my living room.',
      interestsArea: ['Moving Help', 'Volunteering'],
      location: 'Main Street East, Mississauga',
      timestamp: new Date('2025-04-13T09:15:00Z'),
    },
    {
      userId: 'u789',
      username: 'PetPal22',
      title: 'Dog Walking Service Available',
      content:
        'I love dogs and have time in the afternoons to walk them for anyone in need.',
      interestsArea: ['Pets', 'Exercise'],
      location: 'Lakeshore Road, Oakville',
      timestamp: new Date('2025-04-11T16:45:00Z'),
    },
    {
      userId: 'u101',
      username: 'TechHelper',
      title: 'Free Tech Support for Seniors',
      content:
        'Willing to help seniors in the neighborhood with phone or computer issues.',
      interestsArea: ['Technology', 'Senior Support'],
      location: 'Yonge Street, North York',
      timestamp: new Date('2025-04-09T11:20:00Z'),
    },
  ];

  emergencyAlerts: EmergencyAlerts[] = [
  {
    userId: "u100",
    username: "SafetyFirst",
    title: "Gas Leak Reported",
    location: "Elm Street, Downtown",
    timestamp: new Date("2025-04-13T08:30:00Z")
  },
  {
    userId: null,
    username: "Anonymous",
    title: "Suspicious Activity Near Park",
    location: "Greenway Park, Oakridge",
    timestamp: new Date("2025-04-13T10:15:00Z")
  },
  {
    userId: "u102",
    username: "StormWatcher",
    title: "Flooding on Main Street",
    location: "Main Street & 5th Ave",
    timestamp: new Date("2025-04-12T22:45:00Z")
  },
  {
    userId: "u103",
    username: "AlertQueen",
    title: "Power Outage in Neighborhood",
    location: "Sunset Blvd, Block B",
    timestamp: new Date("2025-04-13T00:05:00Z")
  },
  {
    userId: "u104",
    username: "QuickResponder",
    title: "Fire Near Grocery Market",
    location: "Hilltop Plaza, West End",
    timestamp: new Date("2025-04-11T19:20:00Z")
  }
];

  getAllLocalResidentNews(): Observable<LocalNewsPost[]> {
    return this.#localNewsList$.asObservable();
  }

  getAllNeighboordNewsPost(): Observable<NeighborhoodHelpPost[]> {
    return this.#neighboorhoodPostList$.asObservable();
  }

  addNewLocalNews(newNews: LocalNewsPost) {
    this.#localNewsList$.next([...this.#localNewsList$.value, newNews]);
  }

  addNeighborhoodRequest(newNeighborHoodRequest: NeighborhoodHelpPost) {
    this.#neighboorhoodPostList$.next([...this.#neighboorhoodPostList$.value, newNeighborHoodRequest]);
  }

  getAllEmergencyAlerts(): Observable<EmergencyAlerts[]> {
    return this.#emergencyAlertsList$.asObservable();
  }

  addEmergencyAlert(emergencyAlert: EmergencyAlerts) {
    this.#emergencyAlertsList$.next([...this.#emergencyAlertsList$.value, emergencyAlert]);
  }
  
}
