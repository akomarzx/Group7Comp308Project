import { gql } from 'apollo-angular';

export const GET_ALL_LOCAL_NEWS = gql`
  query {
    getAllLocalNews {
      userId
      username
      title
      content
      timestamp
    }
  }
`;

export const GET_ALL_NEIGHBORHOOD_POSTS = gql`
  query {
    getAllNeighborhoodPosts {
      userId
      username
      title
      content
      interestsArea
      location
      timestamp
    }
  }
`;

export const GET_ALL_EMERGENCY_ALERTS = gql`
  query {
    getAllEmergencyAlerts {
      userId
      username
      title
      location
      timestamp
    }
  }
`;

export const ADD_LOCAL_NEWS = gql`
  mutation AddLocalNews($news: LocalNewsInput!) {
    addLocalNews(news: $news) {
      userId
      username
      title
      content
      timestamp
    }
  }
`;

export const ADD_NEIGHBORHOOD_POST = gql`
  mutation AddNeighborhoodPost($post: NeighborhoodHelpInput!) {
    addNeighborhoodPost(post: $post) {
      userId
      username
      title
      content
      interestsArea
      location
      timestamp
    }
  }
`;

export const ADD_EMERGENCY_ALERT = gql`
  mutation AddEmergencyAlert($alert: EmergencyAlertInput!) {
    addEmergencyAlert(alert: $alert) {
      userId
      username
      title
      location
      timestamp
    }
  }
`;