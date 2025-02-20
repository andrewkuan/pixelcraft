import { create } from 'zustand';
import { CanvasState, Tool, PixelUpdate } from '../types/canvas';

interface CanvasStore extends CanvasState {
  setPixel: (x: number, y: number, color: string) => void;
  setTool: (tool: Tool['id']) => void;
  setColor: (color: string) => void;
  setBrushSize: (size: number) => void;
  setScale: (scale: number) => void;
  toggleGrid: () => void;
  clear: () => void;
  loadArtwork: (pixels: Record<string, string>) => void;
  undo: () => void;
  redo: () => void;
}

const DEFAULT_WIDTH = 32;
const DEFAULT_HEIGHT = 32;

const useCanvasStore = create<CanvasStore>((set, get) => ({
  pixels: {},
  width: DEFAULT_WIDTH,
  height: DEFAULT_HEIGHT,
  scale: 20,
  tool: 'brush',
  color: '#000000',
  brushSize: 1,
  showGrid: true,
  history: [{}],
  historyIndex: 0,

  setPixel: (x: number, y: number, color: string) => {
    set((state) => {
      const newPixels = { ...state.pixels };
      const key = `${x},${y}`;
      
      if (color === '') {
        delete newPixels[key];
      } else {
        newPixels[key] = color;
      }

      return { pixels: newPixels };
    });
  },

  setTool: (tool: Tool['id']) => set({ tool }),
  setColor: (color: string) => set({ color }),
  setBrushSize: (brushSize: number) => set({ brushSize }),
  setScale: (scale: number) => set({ scale }),
  toggleGrid: () => set((state) => ({ showGrid: !state.showGrid })),

  clear: () => set({ pixels: {} }),

  loadArtwork: (pixels: Record<string, string>) => set({ pixels }),

  undo: () => {
    const { historyIndex, history } = get();
    if (historyIndex > 0) {
      set({
        historyIndex: historyIndex - 1,
        pixels: history[historyIndex - 1],
      });
    }
  },

  redo: () => {
    const { historyIndex, history } = get();
    if (historyIndex < history.length - 1) {
      set({
        historyIndex: historyIndex + 1,
        pixels: history[historyIndex + 1],
      });
    }
  },
}));

export default useCanvasStore; 