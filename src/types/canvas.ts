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

export interface Tool {
  id: 'brush' | 'eraser' | 'fill' | 'picker';
  name: string;
  icon: string;
}

export interface CanvasState {
  pixels: Record<string, string>; // key: "x,y", value: color
  width: number;
  height: number;
  scale: number;
  tool: Tool['id'];
  color: string;
  brushSize: number;
  showGrid: boolean;
}

export interface ArtworkData {
  id: string;
  title: string;
  pixels: Record<string, string>;
  width: number;
  height: number;
  createdAt: string;
  updatedAt: string;
  createdBy: {
    id: string;
    name: string;
  };
} 