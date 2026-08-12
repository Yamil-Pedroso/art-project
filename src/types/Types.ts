export interface ArtWorkProps {
  id?: number;
  title?: string;
  medium?: string;
  dimensions?: string;
  description?: string;
  imageUrl?: string;
  category?: string;
  /** Equivalent to the future admin option “Mark as new”. */
  markAsNew?: boolean;
  /** ISO publication date used to expire the NEW badge automatically. */
  publishedAt?: string;
}

export type PortfolioUpdateType =
  | "artwork"
  | "series"
  | "exhibition"
  | "news"
  | "studio";

export interface PortfolioUpdate {
  /** Stable identifier used to remember this update per visitor. */
  id: string;
  type: PortfolioUpdateType;
  title: string;
  publishedAt: string;
  description?: string;
  imageUrl?: string;
  artworkId?: number;
  href?: string;
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
