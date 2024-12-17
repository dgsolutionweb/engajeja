import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG as QRCode } from 'qrcode.react';
import { 
  FaPhone, 
  FaWhatsapp, 
  FaInstagram,
  FaGlobe,
  FaQrcode,
  FaShare,
  FaEnvelope,
  FaTimes
} from 'react-icons/fa';
import logo from '../assets/logo.png';

interface DigitalCardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DigitalCardModal: React.FC<DigitalCardModalProps> = ({ isOpen, onClose }) => {
  const [showQRCode, setShowQRCode] = useState(false);
  const websiteUrl = 'https://dgsolutionweb.github.io/engajeja';

  const socialButtons = [
    {
      icon: <FaPhone className="text-xl" />,
      label: 'Ligar',
      color: 'bg-gray-700/60',
      link: 'tel:+5517999754390'
    },
    {
      icon: <FaEnvelope className="text-xl" />,
      label: 'Email',
      color: 'bg-gray-700/60',
      link: 'mailto:dgsolutionweb@gmail.com'
    },
    {
      icon: <FaWhatsapp className="text-xl" />,
      label: 'WhatsApp',
      color: 'bg-[#25D366]',
      link: 'https://wa.me/5517999754390'
    },
    {
      icon: <FaInstagram className="text-xl" />,
      label: 'Instagram',
      color: 'bg-gray-700/60',
      link: 'https://instagram.com/dgsolutionweb'
    },
    {
      icon: <FaGlobe className="text-xl" />,
      label: 'Website',
      color: 'bg-gray-700/60',
      link: websiteUrl
    }
  ];

  const handleShare = async () => {
    try {
      const cardUrl = 'https://dgsolutionweb.github.io/dgsolutioncard/';
      await navigator.clipboard.writeText(cardUrl);
      alert('Link do cartão copiado para a área de transferência!');
      
      if (navigator.share) {
        await navigator.share({
          title: 'Cartão Digital - DGSolution WEB',
          text: 'Confira meu cartão digital profissional',
          url: cardUrl
        });
      }
    } catch (error) {
      console.error('Erro ao compartilhar:', error);
    }
  };

  const handleButtonClick = (link: string) => {
    window.open(link, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
          onClick={onClose}
        >
          {/* Phone Frame */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative bg-black border-4 border-gray-800 rounded-[3rem] p-6 w-full max-w-sm mx-4 shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-b-3xl" />
            
            {/* Content */}
            <div className="mt-8">
              {/* Logo e Título */}
              <div className="text-center mb-8">
                <motion.img 
                  src={logo}
                  alt="DGSolution WEB Logo"
                  className="w-24 h-24 mx-auto mb-4 drop-shadow-2xl"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <h2 className="text-2xl font-bold text-[#00D1FF] mb-1">DGSolution WEB</h2>
                <p className="text-gray-400 text-sm">SOLUÇÕES EM DESENVOLVIMENTO WEB</p>
              </div>

              {/* QR Code Modal */}
              {showQRCode && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  className="absolute inset-0 bg-black/95 flex flex-col items-center justify-center rounded-[3rem]"
                >
                  <div className="bg-white p-4 rounded-xl">
                    <QRCode
                      value={websiteUrl}
                      size={200}
                      level="H"
                      includeMargin
                    />
                  </div>
                  <p className="text-white mt-4 text-sm">Escaneie para acessar o website</p>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowQRCode(false)}
                    className="mt-4 bg-gray-800/50 p-2 rounded-full"
                  >
                    <FaTimes className="text-gray-400" />
                  </motion.button>
                </motion.div>
              )}

              {/* Botões Sociais */}
              <div className="space-y-3">
                {socialButtons.map((button, index) => (
                  <motion.button
                    key={button.label}
                    className={`w-full ${button.color} text-white p-3 rounded-xl flex items-center gap-3 font-medium transition-all`}
                    onClick={() => handleButtonClick(button.link)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {button.icon}
                    {button.label}
                  </motion.button>
                ))}
              </div>

              {/* Bottom Icons */}
              <div className="mt-8 flex justify-center gap-6">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowQRCode(true)}
                  className="bg-gray-800/50 p-3 rounded-full"
                >
                  <FaQrcode className="text-gray-400 text-xl" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-gray-800/50 p-3 rounded-full"
                >
                  <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleShare}
                  className="bg-gray-800/50 p-3 rounded-full"
                >
                  <FaShare className="text-gray-400 text-xl" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DigitalCardModal; 