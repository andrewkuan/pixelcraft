import { useCallback } from 'react';
import useCanvasStore from '../store/canvasStore';
import { Tool } from '../types/canvas';

const tools: Tool[] = [
  { id: 'brush', name: 'Brush', icon: '🖌️' },
  { id: 'eraser', name: 'Eraser', icon: '🧹' },
  { id: 'fill', name: 'Fill', icon: '🪣' },
  { id: 'picker', name: 'Color Picker', icon: '👆' },
];

const colors = [
  '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF',
  '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500', '#800080',
];

const Toolbar = () => {
  const {
    tool,
    color,
    brushSize,
    showGrid,
    setTool,
    setColor,
    setBrushSize,
    toggleGrid,
    clear,
    undo,
    redo,
  } = useCanvasStore();

  const handleBrushSize = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setBrushSize(parseInt(e.target.value));
  }, [setBrushSize]);

  return (
    <div className="flex flex-col gap-4 p-4 bg-white border border-gray-200 rounded-lg">
      {/* Tools */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">Tools</h3>
        <div className="flex flex-wrap gap-2">
          {tools.map((t) => (
            <button
              key={t.id}
              onClick={() => setTool(t.id)}
              className={`p-2 rounded ${
                tool === t.id
                  ? 'bg-blue-100 text-blue-700'
                  : 'hover:bg-gray-100'
              }`}
              title={t.name}
            >
              {t.icon}
            </button>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">Colors</h3>
        <div className="flex flex-wrap gap-2">
          {colors.map((c) => (
            <button
              key={c}
              onClick={() => setColor(c)}
              className={`w-8 h-8 rounded-full border-2 ${
                color === c ? 'border-blue-500' : 'border-gray-200'
              }`}
              style={{ backgroundColor: c }}
              title={c}
            />
          ))}
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-8 h-8"
          />
        </div>
      </div>

      {/* Brush Size */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">Brush Size</h3>
        <input
          type="range"
          min="1"
          max="5"
          value={brushSize}
          onChange={handleBrushSize}
          className="w-full"
        />
      </div>

      {/* Actions */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">Actions</h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={toggleGrid}
            className={`px-3 py-1 rounded ${
              showGrid
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            Grid
          </button>
          <button
            onClick={undo}
            className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200"
          >
            Undo
          </button>
          <button
            onClick={redo}
            className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200"
          >
            Redo
          </button>
          <button
            onClick={clear}
            className="px-3 py-1 rounded bg-red-100 text-red-700 hover:bg-red-200"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toolbar; 