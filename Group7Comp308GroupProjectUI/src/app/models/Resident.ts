export interface LocalNewsPost {
  userId: string | null; 
  username: string;
  title: string;
  content: string;
  timestamp: Date;
}

export interface NeighborhoodHelpPost {
  userId: string | null;
  username: string;
  title: String;
  content: string;
  interestsArea: string[];
  location: string;
  timestamp: Date;
}

export interface EmergencyAlerts {
  userId: string | null;
  username: string;
  title: String;
  location: string;
  timestamp: Date;
}