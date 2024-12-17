import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface GameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onWin: () => void;
}

const GameModal: React.FC<GameModalProps> = ({ isOpen, onClose, onWin }) => {
  const [tiles, setTiles] = useState<number[]>([]);
  const [emptyIndex, setEmptyIndex] = useState<number>(8);
  const [isSolved, setIsSolved] = useState(false);

  // Initialize puzzle
  useEffect(() => {
    if (isOpen) {
      const numbers = Array.from({ length: 8 }, (_, i) => i + 1);
      const shuffled = [...numbers, 0].sort(() => Math.random() - 0.5);
      setTiles(shuffled);
      setEmptyIndex(shuffled.indexOf(0));
      setIsSolved(false);
    }
  }, [isOpen]);

  // Check if puzzle is solved
  useEffect(() => {
    const solved = tiles.slice(0, 8).every((tile, index) => tile === index + 1) && tiles[8] === 0;
    if (solved && !isSolved) {
      setIsSolved(true);
      setTimeout(() => {
        onWin();
      }, 500);
    }
  }, [tiles, onWin]);

  const canMove = (index: number) => {
    const row = Math.floor(index / 3);
    const emptyRow = Math.floor(emptyIndex / 3);
    const col = index % 3;
    const emptyCol = emptyIndex % 3;

    return (
      (Math.abs(row - emptyRow) === 1 && col === emptyCol) ||
      (Math.abs(col - emptyCol) === 1 && row === emptyRow)
    );
  };

  const moveTile = (index: number) => {
    if (canMove(index)) {
      const newTiles = [...tiles];
      [newTiles[index], newTiles[emptyIndex]] = [newTiles[emptyIndex], newTiles[index]];
      setTiles(newTiles);
      setEmptyIndex(index);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-gray-900 p-8 rounded-2xl shadow-2xl border border-gray-800"
            onClick={e => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Racha Cuca</h3>
            <div className="grid grid-cols-3 gap-2 w-64 h-64 mb-6">
              {tiles.map((tile, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: canMove(index) ? 1.05 : 1 }}
                  whileTap={{ scale: canMove(index) ? 0.95 : 1 }}
                  className={`${
                    tile === 0 ? 'invisible' : 'bg-gradient-to-br from-blue-500 to-purple-600'
                  } rounded-lg text-white text-2xl font-bold flex items-center justify-center transition-colors
                    ${canMove(index) ? 'cursor-pointer hover:from-blue-600 hover:to-purple-700' : 'cursor-default'}`}
                  onClick={() => moveTile(index)}
                >
                  {tile !== 0 && tile}
                </motion.button>
              ))}
            </div>
            <p className="text-gray-400 text-center mb-4">
              Organize os números em ordem crescente!
            </p>
            <button
              onClick={onClose}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2 rounded-lg font-semibold"
            >
              Fechar
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GameModal; 