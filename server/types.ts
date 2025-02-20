export interface PixelUpdate {
  x: number;
  y: number;
  color: string;
  userId: string;
}

export interface UserPresence {
  id: string;
  name: string;
  color: string;
  cursor?: {
    x: number;
    y: number;
  };
} 