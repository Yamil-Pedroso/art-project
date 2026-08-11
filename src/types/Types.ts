export interface ArtWorkProps {
  id?: number;
  title?: string;
  medium?: string;
  dimensions?: string;
  description?: string;
  imageUrl?: string;
  category?: string;
}

export interface CVProps {
  title: string;
  subtitle?: string;
  description?: string;
  imageUrl?: string;
  link?: string;
}

export interface ArtShowEntry {
  title?: string;
  year: number;
  info: string;
}

export interface ArtShowSection {
  header: string;
  shows: ArtShowEntry[];
}

export interface ArtShowProps {
  soloShow: ArtShowSection;
  groupShow: ArtShowSection;
}
