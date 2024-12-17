import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGift, FaTrophy, FaInstagram, FaShare, FaUserTag, FaTicketAlt, FaClipboard } from 'react-icons/fa';

interface RaffleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onWin: (winner: Participant) => void;
}

interface Participant {
  name: string;
  instagram: string;
  ticketNumber: string;
  completed: {
    followed: boolean;
    tagged: boolean;
    shared: boolean;
    form: boolean;
  };
}

const RaffleModal: React.FC<RaffleModalProps> = ({ isOpen, onClose, onWin }) => {
  const [step, setStep] = useState<'rules' | 'form' | 'raffle'>('rules');
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState<Participant | null>(null);
  const [currentName, setCurrentName] = useState('');
  const [spinSpeed, setSpinSpeed] = useState(100);
  const [formData, setFormData] = useState({
    name: '',
    instagram: '',
    completed: {
      followed: false,
      tagged: false,
      shared: false,
      form: false
    }
  });

  const generateTicketNumber = () => {
    return Math.random().toString(36).substr(2, 8).toUpperCase();
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newParticipant: Participant = {
      ...formData,
      ticketNumber: generateTicketNumber(),
      completed: {
        ...formData.completed,
        form: true
      }
    };
    setParticipants([...participants, newParticipant]);
    setStep('raffle');
  };

  const startRaffle = () => {
    if (participants.length === 0) return;
    setIsSpinning(true);
    setWinner(null);
    setSpinSpeed(100);
  };

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    if (isSpinning) {
      interval = setInterval(() => {
        const randomParticipant = participants[Math.floor(Math.random() * participants.length)];
        setCurrentName(`${randomParticipant.name} (${randomParticipant.ticketNumber})`);
        setSpinSpeed(prev => Math.min(prev + 10, 300));
      }, spinSpeed);

      setTimeout(() => {
        setIsSpinning(false);
        const finalWinner = participants[Math.floor(Math.random() * participants.length)];
        setWinner(finalWinner);
        onWin(finalWinner);
      }, 3000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isSpinning, participants, spinSpeed, onWin]);

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
            className="bg-gray-900 p-8 rounded-2xl shadow-2xl border border-gray-800 max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-6">
                {step === 'rules' ? 'Regras do Sorteio' : 
                 step === 'form' ? 'Cadastro para Sorteio' : 
                 'Sorteio em Andamento'}
              </h3>

              {step === 'rules' && (
                <div className="text-left mb-8">
                  <div className="bg-gray-800/50 p-6 rounded-xl mb-6">
                    <h4 className="text-xl font-semibold text-white mb-4">Para participar, siga os passos:</h4>
                    <ul className="space-y-4">
                      <li className="flex items-center gap-3 text-gray-300">
                        <FaInstagram className="text-pink-500 text-xl flex-shrink-0" />
                        <span>Siga nosso Instagram @dgsolution.web</span>
                      </li>
                      <li className="flex items-center gap-3 text-gray-300">
                        <FaUserTag className="text-blue-500 text-xl flex-shrink-0" />
                        <span>Marque 3 amigos nos comentários do post</span>
                      </li>
                      <li className="flex items-center gap-3 text-gray-300">
                        <FaShare className="text-purple-500 text-xl flex-shrink-0" />
                        <span>Compartilhe em seus stories</span>
                      </li>
                      <li className="flex items-center gap-3 text-gray-300">
                        <FaClipboard className="text-green-500 text-xl flex-shrink-0" />
                        <span>Preencha o formulário de participação</span>
                      </li>
                    </ul>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setStep('form')}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-3 rounded-lg font-semibold"
                  >
                    Participar Agora
                  </motion.button>
                </div>
              )}

              {step === 'form' && (
                <form onSubmit={handleFormSubmit} className="text-left mb-8">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-300 mb-2">Nome Completo</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2">Instagram</label>
                      <input
                        type="text"
                        value={formData.instagram}
                        onChange={e => setFormData({...formData, instagram: e.target.value})}
                        className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg"
                        placeholder="@seu.usuario"
                        required
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="block text-gray-300 mb-2">Confirme as ações:</label>
                      <div className="space-y-2">
                        {Object.entries({
                          followed: 'Segui o Instagram',
                          tagged: 'Marquei 3 amigos',
                          shared: 'Compartilhei nos stories'
                        }).map(([key, label]) => (
                          <label key={key} className="flex items-center gap-2 text-gray-300 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.completed[key as keyof typeof formData.completed]}
                              onChange={e => setFormData({
                                ...formData,
                                completed: {
                                  ...formData.completed,
                                  [key]: e.target.checked
                                }
                              })}
                              className="w-4 h-4 rounded border-gray-600"
                              required
                            />
                            {label}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-3 rounded-lg font-semibold mt-6"
                  >
                    Gerar Minha Rifa
                  </motion.button>
                </form>
              )}

              {step === 'raffle' && (
                <div className="mb-8">
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <FaTicketAlt className="text-2xl text-yellow-500" />
                    <span className="text-gray-400">Rifas Geradas: {participants.length}</span>
                  </div>
                  
                  <motion.div
                    className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-xl mb-6"
                    animate={{
                      scale: isSpinning ? [1, 1.02, 1] : 1,
                      borderRadius: isSpinning ? ["0.75rem", "1rem", "0.75rem"] : "0.75rem"
                    }}
                    transition={{
                      duration: 0.5,
                      repeat: isSpinning ? Infinity : 0,
                    }}
                  >
                    <motion.div
                      className="text-2xl font-bold text-white"
                      animate={{
                        opacity: isSpinning ? [1, 0.7, 1] : 1,
                        scale: isSpinning ? [1, 1.05, 1] : 1,
                      }}
                      transition={{
                        duration: 0.3,
                        repeat: isSpinning ? Infinity : 0,
                      }}
                    >
                      {winner ? 
                        `${winner.name} (${winner.ticketNumber})` : 
                        currentName || 'Clique para sortear!'}
                    </motion.div>
                  </motion.div>

                  {winner ? (
                    <div className="flex items-center justify-center gap-2 text-yellow-500 mb-4">
                      <FaTrophy className="text-2xl animate-bounce" />
                      <span className="text-white">Parabéns ao ganhador!</span>
                    </div>
                  ) : (
                    <motion.div
                      className="flex justify-center mb-4"
                      animate={{ 
                        rotate: isSpinning ? 360 : 0,
                        scale: isSpinning ? [1, 1.1, 1] : 1,
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity, 
                        ease: "linear" 
                      }}
                    >
                      <FaGift className="text-4xl text-purple-500" />
                    </motion.div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={startRaffle}
                      disabled={isSpinning || participants.length === 0}
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSpinning ? 'Sorteando...' : 'Iniciar Sorteio'}
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={onClose}
                      className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold"
                    >
                      Fechar
                    </motion.button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RaffleModal; 