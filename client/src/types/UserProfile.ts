export interface FavoriteBar {
  id: number;
  name: string;
  music_style: string;
  address: string;
  postcode: number;
  city: string;
  image1: string;
}

export interface FavoriteGroup {
  id: number;
  name: string;
  style: string;
  image: string;
}

export interface FavoriteEvent {
  id: number;
  title: string;
  date: number;
  start_at: string;
  end_at: string;
  description: string;
  image: string;
  bar_name: string;
  bar_id: number;
  address: string;
  postcode: string;
  city: string;
  music_group_name: string;
  music_group_id: number;
  music_style: string;
  hour_only: number;
  latitude: number;
  longitude: number;
  group_id: number;
  event_name: string;
}

export interface ParticipatedEvent {
  id: number;
  title: string;
  image: string;
  date: string;
  start_at: string;
  end_at: string;
  bar_name: string;
  music_style: string;
}

export interface UserProfileData {
  favoriteBars: FavoriteBar[];
  favoriteGroups: FavoriteGroup[];
  favoriteEvents: FavoriteEvent[];
  participatedEvents: ParticipatedEvent[];
}
