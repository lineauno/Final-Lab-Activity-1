// Define the shape of the data coming from your Laravel API
export type MediaType = 'KDrama' | 'Manhwa' | 'Book' | 'Anime' | 'CDrama';

export interface MediaItem {
  id: number;
  user_id: number;
  title: string;
  media_type: MediaType;
  status: string; // e.g., 'Finished', 'On-Going', 'Currently Reading'
  rating: number | null; // Normalized 1.0 to 10.0
  genres: string | null;
  author_artist: string | null;
  date_finished: string | null;
  episode_progress: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}