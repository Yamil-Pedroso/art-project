export interface ArtWorkProps {
  id?: number;
  title?: string;
  medium?: string;
  dimensions?: string;
  description?: string;
  imageUrl?: string;
  category?: string;
  /** Editorial state displayed over artwork imagery when applicable. */
  status?: "In process";
  /** Optional manual override; the highest new ID is detected automatically. */
  markAsNew?: boolean;
  /** Optional ISO date; automatic publications use the deployment date. */
  publishedAt?: string;
}

export type PortfolioUpdateType =
  | "artwork"
  | "sketch"
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
  galleryCategory?: string;
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
