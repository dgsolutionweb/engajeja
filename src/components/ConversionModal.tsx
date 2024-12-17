import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaShoppingCart, 
  FaDollarSign,
  FaTimes,
  FaFilter,
  FaChartBar,
  FaEye,
  FaUserPlus,
  FaArrowUp,
  FaArrowDown,
  FaPercent,
  FaCalendar
} from 'react-icons/fa';

interface ConversionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MetricCard {
  title: string;
  value: string;
  change: number;
  icon: JSX.Element;
  color: string;
}

const ConversionModal: React.FC<ConversionModalProps> = ({ isOpen, onClose }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('hoje');
  const [metrics, setMetrics] = useState({
    visitors: 1234,
    leads: 456,
    conversions: 89,
    revenue: 12567
  });

  // Simular mudanças nas métricas
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        visitors: prev.visitors + Math.floor(Math.random() * 10),
        leads: prev.leads + Math.floor(Math.random() * 3),
        conversions: prev.conversions + Math.floor(Math.random() * 2),
        revenue: prev.revenue + Math.floor(Math.random() * 100)
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const metricCards: MetricCard[] = [
    {
      title: "Visitantes",
      value: metrics.visitors.toLocaleString(),
      change: 12.5,
      icon: <FaEye />,
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Leads Gerados",
      value: metrics.leads.toLocaleString(),
      change: 8.2,
      icon: <FaUserPlus />,
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "Conversões",
      value: metrics.conversions.toLocaleString(),
      change: 15.3,
      icon: <FaShoppingCart />,
      color: "from-green-500 to-green-600"
    },
    {
      title: "Receita",
      value: `R$ ${metrics.revenue.toLocaleString()}`,
      change: 10.8,
      icon: <FaDollarSign />,
      color: "from-yellow-500 to-yellow-600"
    }
  ];

  const conversionStages = [
    { stage: "Visitas", value: 100, color: "bg-blue-500" },
    { stage: "Leads", value: 45, color: "bg-purple-500" },
    { stage: "Oportunidades", value: 25, color: "bg-yellow-500" },
    { stage: "Negociação", value: 15, color: "bg-orange-500" },
    { stage: "Fechamento", value: 8, color: "bg-green-500" }
  ];

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
            className="bg-gray-900 p-6 rounded-2xl shadow-2xl border border-gray-800 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Dashboard de Conversão</h2>
                <p className="text-gray-400">Acompanhamento em tempo real</p>
              </div>
              <div className="flex gap-4">
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="bg-gray-800 text-white rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="hoje">Hoje</option>
                  <option value="semana">Esta Semana</option>
                  <option value="mes">Este Mês</option>
                  <option value="ano">Este Ano</option>
                </select>
                <button className="bg-gray-800 p-2 rounded-lg text-gray-400 hover:text-white">
                  <FaFilter />
                </button>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {metricCards.map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-gradient-to-r ${metric.color} p-4 rounded-xl`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-2xl text-white/90">
                      {metric.icon}
                    </div>
                    <div className={`flex items-center gap-1 text-sm ${metric.change > 0 ? 'text-green-300' : 'text-red-300'}`}>
                      {metric.change > 0 ? <FaArrowUp /> : <FaArrowDown />}
                      {Math.abs(metric.change)}%
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">
                    {metric.value}
                  </div>
                  <div className="text-sm text-white/80">
                    {metric.title}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Conversion Funnel */}
            <div className="bg-gray-800/50 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <FaChartBar /> Funil de Conversão
              </h3>
              <div className="space-y-4">
                {conversionStages.map((stage, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">{stage.stage}</span>
                      <span className="text-gray-400">{stage.value}%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${stage.value}%` }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                        className={`h-full ${stage.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Real-time Updates */}
            <div className="bg-gray-800/50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <FaCalendar /> Atualizações em Tempo Real
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-300">Taxa de Conversão</span>
                  <span className="text-green-400 flex items-center gap-1">
                    <FaPercent className="text-xs" /> {((metrics.conversions / metrics.visitors) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-300">Valor Médio por Venda</span>
                  <span className="text-blue-400">
                    R$ {(metrics.revenue / metrics.conversions).toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-300">ROI</span>
                  <span className="text-purple-400">284%</span>
                </div>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <FaTimes />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConversionModal; 