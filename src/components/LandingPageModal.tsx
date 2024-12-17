import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaUsers,
  FaRocket,
  FaTimes,
  FaDesktop,
  FaTablet,
  FaMobile,
  FaFire,
  FaCheck,
  FaStar,
  FaShieldAlt
} from 'react-icons/fa';

interface LandingPageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LandingPageModal: React.FC<LandingPageModalProps> = ({ isOpen, onClose }) => {
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [countdown] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  });

  const benefits = [
    {
      icon: <FaRocket className="text-blue-500" />,
      title: 'Resultados Rápidos',
      description: 'Aumente suas vendas em até 300%'
    },
    {
      icon: <FaUsers className="text-purple-500" />,
      title: 'Suporte Exclusivo',
      description: 'Atendimento personalizado 24/7'
    },
    {
      icon: <FaShieldAlt className="text-green-500" />,
      title: 'Garantia Total',
      description: '30 dias de garantia ou seu dinheiro de volta'
    }
  ];

  const testimonials = [
    {
      name: 'João Silva',
      role: 'Empresário',
      comment: 'Aumentei minhas vendas em 250% no primeiro mês!',
      stars: 5
    },
    {
      name: 'Maria Santos',
      role: 'E-commerce',
      comment: 'Melhor investimento que já fiz para meu negócio.',
      stars: 5
    },
    {
      name: 'Pedro Costa',
      role: 'Lojista',
      comment: 'Resultados surpreendentes desde o primeiro dia.',
      stars: 5
    }
  ];

  const features = [
    'Estratégias comprovadas de conversão',
    'Templates otimizados para vendas',
    'Integrações com principais plataformas',
    'Análise de dados em tempo real',
    'Suporte técnico especializado',
    'Atualizações constantes'
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-gray-900 rounded-2xl max-w-4xl w-full p-6 relative"
            onClick={e => e.stopPropagation()}
          >
            {/* Device Preview Controls */}
            <div className="flex justify-center gap-4 mb-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setPreviewDevice('desktop')}
                className={`p-3 rounded-xl ${previewDevice === 'desktop' ? 'bg-blue-600' : 'bg-gray-800'}`}
              >
                <FaDesktop className="text-white text-xl" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setPreviewDevice('tablet')}
                className={`p-3 rounded-xl ${previewDevice === 'tablet' ? 'bg-blue-600' : 'bg-gray-800'}`}
              >
                <FaTablet className="text-white text-xl" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setPreviewDevice('mobile')}
                className={`p-3 rounded-xl ${previewDevice === 'mobile' ? 'bg-blue-600' : 'bg-gray-800'}`}
              >
                <FaMobile className="text-white text-xl" />
              </motion.button>
            </div>

            {/* Landing Page Preview */}
            <div className={`bg-white rounded-xl overflow-hidden ${
              previewDevice === 'mobile' ? 'max-w-xs mx-auto' : 
              previewDevice === 'tablet' ? 'max-w-md mx-auto' : 'w-full'
            }`}>
              {/* Hero Section */}
              <div className="bg-gradient-to-br from-blue-600 to-purple-700 text-white p-8 text-center">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <h1 className="text-4xl font-bold mb-4">
                    Transforme seu Negócio com
                    <span className="block text-yellow-300">Landing Pages que Vendem</span>
                  </h1>
                  <p className="text-lg mb-8 text-blue-100">
                    Aumente suas vendas com páginas otimizadas para conversão
                  </p>
                  <div className="inline-block bg-red-500 text-white px-4 py-2 rounded-lg mb-6">
                    <div className="flex items-center gap-2">
                      <FaFire className="text-yellow-300" />
                      <span>Oferta Especial por Tempo Limitado</span>
                    </div>
                  </div>
                  <div className="flex justify-center gap-4 text-2xl font-bold mb-8">
                    <div className="bg-white/10 rounded-lg p-3">
                      <span className="text-yellow-300">{countdown.hours}</span>
                      <span className="text-sm block text-blue-100">Horas</span>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3">
                      <span className="text-yellow-300">{countdown.minutes}</span>
                      <span className="text-sm block text-blue-100">Minutos</span>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3">
                      <span className="text-yellow-300">{countdown.seconds}</span>
                      <span className="text-sm block text-blue-100">Segundos</span>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 px-8 py-4 rounded-full font-bold text-lg shadow-lg"
                  >
                    QUERO AUMENTAR MINHAS VENDAS AGORA!
                  </motion.button>
                </motion.div>
              </div>

              {/* Benefits Section */}
              <div className="p-8 bg-gray-50">
                <div className="grid md:grid-cols-3 gap-6">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={benefit.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white p-6 rounded-xl shadow-lg text-center"
                    >
                      <div className="text-3xl mb-4">{benefit.icon}</div>
                      <h3 className="text-xl font-bold mb-2 text-gray-800">{benefit.title}</h3>
                      <p className="text-gray-600">{benefit.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Features Section */}
              <div className="p-8 bg-white">
                <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
                  Tudo que Você Precisa para <span className="text-blue-600">Vender Mais</span>
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {features.map((feature, index) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <FaCheck className="text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Testimonials */}
              <div className="p-8 bg-gray-900 text-white">
                <h2 className="text-3xl font-bold text-center mb-8">
                  O que Nossos Clientes Dizem
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {testimonials.map((testimonial, index) => (
                    <motion.div
                      key={testimonial.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gray-800 p-6 rounded-xl"
                    >
                      <div className="flex gap-1 mb-4">
                        {[...Array(testimonial.stars)].map((_, i) => (
                          <FaStar key={i} className="text-yellow-400" />
                        ))}
                      </div>
                      <p className="mb-4 text-gray-300">"{testimonial.comment}"</p>
                      <div>
                        <p className="font-bold">{testimonial.name}</p>
                        <p className="text-sm text-gray-400">{testimonial.role}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* CTA Section */}
              <div className="p-8 bg-gradient-to-br from-blue-600 to-purple-700 text-white text-center">
                <h2 className="text-3xl font-bold mb-4">
                  Comece a Vender Mais Hoje Mesmo!
                </h2>
                <p className="mb-8 text-blue-100">
                  Não perca mais tempo e dinheiro. Transforme seu negócio agora!
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 px-8 py-4 rounded-full font-bold text-lg shadow-lg"
                >
                  GARANTIR MINHA VAGA COM DESCONTO!
                </motion.button>
                <p className="mt-4 text-sm text-blue-100">
                  <FaShieldAlt className="inline mr-2" />
                  Garantia incondicional de 30 dias
                </p>
              </div>
            </div>

            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <FaTimes />
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LandingPageModal; 