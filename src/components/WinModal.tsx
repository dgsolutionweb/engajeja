import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrophy } from 'react-icons/fa';

interface WinModalProps {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
}

const WinModal: React.FC<WinModalProps> = ({ isOpen, onClose, message = 'Parabéns! Você venceu!' }) => {
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
            className="bg-gray-900 p-8 rounded-2xl shadow-2xl border border-gray-800 max-w-md text-center"
            onClick={e => e.stopPropagation()}
          >
            <motion.div
              initial={{ rotate: -180, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: "spring", duration: 1 }}
              className="text-6xl text-yellow-500 mb-6 mx-auto w-fit"
            >
              <FaTrophy />
            </motion.div>
            <h3 className="text-3xl font-bold text-white mb-4">
              Parabéns!
            </h3>
            <p className="text-xl text-gray-300 mb-6">
              {message}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-lg text-lg font-semibold"
            >
              Continuar
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WinModal; 