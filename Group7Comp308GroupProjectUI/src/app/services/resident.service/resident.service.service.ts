import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import {
  GET_ALL_LOCAL_NEWS,
  GET_ALL_NEIGHBORHOOD_POSTS,
  GET_ALL_EMERGENCY_ALERTS,
  ADD_LOCAL_NEWS,
  ADD_NEIGHBORHOOD_POST,
  ADD_EMERGENCY_ALERT
} from './resident.graphql';
import { Observable } from 'rxjs';
import { LocalNewsPost, NeighborhoodHelpPost, EmergencyAlerts } from '../../models/Resident';

@Injectable({ providedIn: 'root' })
export class ResidentService {
  constructor(private apollo: Apollo) {}

  getAllLocalResidentNews(): Observable<LocalNewsPost[]> {
    return this.apollo.watchQuery<{ getAllLocalNews: LocalNewsPost[] }>({
      query: GET_ALL_LOCAL_NEWS,
      fetchPolicy: 'cache-and-network'
    }).valueChanges.pipe(map(result => result.data.getAllLocalNews));
  }

  getAllNeighborhoodNewsPost(): Observable<NeighborhoodHelpPost[]> {
    return this.apollo.watchQuery<{ getAllNeighborhoodPosts: NeighborhoodHelpPost[] }>({
      query: GET_ALL_NEIGHBORHOOD_POSTS,
      fetchPolicy: 'cache-and-network',
    }).valueChanges.pipe(map(result => result.data.getAllNeighborhoodPosts));
  }

  getAllEmergencyAlerts(): Observable<EmergencyAlerts[]> {
    return this.apollo.watchQuery<{ getAllEmergencyAlerts: EmergencyAlerts[] }>({
      query: GET_ALL_EMERGENCY_ALERTS,
      fetchPolicy: 'cache-and-network'
    }).valueChanges.pipe(map(result => result.data.getAllEmergencyAlerts));
  }

  addNewLocalNews(newNews: LocalNewsPost): Observable<LocalNewsPost> {
    return this.apollo.mutate<{ addLocalNews: LocalNewsPost }>({
      mutation: ADD_LOCAL_NEWS,
      variables: { news: newNews },
      refetchQueries: [GET_ALL_LOCAL_NEWS ],
    }).pipe(map(result => result.data!.addLocalNews));
  }

  addNeighborhoodRequest(post: NeighborhoodHelpPost): Observable<NeighborhoodHelpPost> {
    return this.apollo.mutate<{ addNeighborhoodPost: NeighborhoodHelpPost }>({
      mutation: ADD_NEIGHBORHOOD_POST,
      variables: { post },
      refetchQueries: [GET_ALL_NEIGHBORHOOD_POSTS],
    }).pipe(map(result => result.data!.addNeighborhoodPost));
  }

  addEmergencyAlert(alert: EmergencyAlerts): Observable<EmergencyAlerts> {
    return this.apollo.mutate<{ addEmergencyAlert: EmergencyAlerts }>({
      mutation: ADD_EMERGENCY_ALERT,
      variables: { alert },
      refetchQueries: [GET_ALL_EMERGENCY_ALERTS]
    }).pipe(map(result => result.data!.addEmergencyAlert));
  }
}