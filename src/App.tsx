import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FaGamepad, FaUsers, FaTrophy, FaChartLine, FaRocket, FaMobile, FaLightbulb, FaChartBar, FaPlay, FaIdCard } from 'react-icons/fa'
import AOS from 'aos'
import 'aos/dist/aos.css'
import SplineBackground from './components/SplineBackground'
import GameModal from './components/GameModal'
import RaffleModal from './components/RaffleModal'
import SocialModal from './components/SocialModal'
import ConversionModal from './components/ConversionModal'
import DigitalCardModal from './components/DigitalCardModal'
import WinModal from './components/WinModal'
import LandingPageModal from './components/LandingPageModal'
import logo from './assets/logo.png'

function App() {
  const [isGameModalOpen, setIsGameModalOpen] = useState(false);
  const [isRaffleModalOpen, setIsRaffleModalOpen] = useState(false);
  const [isSocialModalOpen, setIsSocialModalOpen] = useState(false);
  const [isConversionModalOpen, setIsConversionModalOpen] = useState(false);
  const [isDigitalCardModalOpen, setIsDigitalCardModalOpen] = useState(false);
  const [isWinModalOpen, setIsWinModalOpen] = useState(false);
  const [isLandingPageModalOpen, setIsLandingPageModalOpen] = useState(false);
  const [winSource, setWinSource] = useState<'game' | 'raffle' | null>(null);
  const [winnerName, setWinnerName] = useState<string>('');

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    })
  }, [])

  const handleGameWin = () => {
    setIsGameModalOpen(false);
    setWinSource('game');
    setTimeout(() => {
      setIsWinModalOpen(true);
    }, 500);
  };

  const handleRaffleWin = (winner: { name: string }) => {
    setWinnerName(winner.name);
    setWinSource('raffle');
    setIsWinModalOpen(true);
  };

  const handleWinModalClose = () => {
    setIsWinModalOpen(false);
    setWinSource(null);
    setWinnerName('');
    if (isRaffleModalOpen) {
      setIsRaffleModalOpen(false);
    }
  };

  const scrollToSolutions = () => {
    const solutionsSection = document.getElementById('solutions-section');
    if (solutionsSection) {
      solutionsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openDigitalCard = () => {
    window.open('https://dgsolutionweb.github.io/dgsolutioncard/', '_blank');
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <header className="bg-dark min-h-screen relative overflow-hidden" role="banner">
        <SplineBackground />
        
        {/* Content Layer */}
        <div className="absolute inset-0 flex items-center" style={{ zIndex: 30 }}>
          <div className="container mx-auto px-4 py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:max-w-3xl md:max-w-2xl max-w-xl mx-auto md:ml-10 px-4"
            >
              <motion.img 
                src={logo} 
                alt="DGSolution WEB Logo - Empresa de Desenvolvimento Web e Marketing Digital" 
                className="w-32 md:w-48 mb-8 mx-auto drop-shadow-2xl"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              />
              <div className="text-center md:text-left">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-white drop-shadow-lg">
                  DGSolution <br />
                  <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
                    WEB
                  </span>
                </h1>
                <p className="text-lg md:text-xl lg:text-2xl text-gray-200 mb-10 drop-shadow-lg max-w-lg mx-auto md:mx-0">
                  Transforme sua presença digital com soluções interativas e gamificação
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={scrollToSolutions}
                  className="btn-primary shadow-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-8 py-4 text-lg"
                  aria-label="Ver nossas soluções digitais"
                >
                  Comece sua transformação digital
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      <main role="main">
        {/* Features Section */}
        <section 
          className="py-20 bg-gray-900" 
          aria-label="Nossos diferenciais"
        >
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-16 text-white">
              Por que nos <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">escolher</span>?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.article
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-8 rounded-2xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:bg-gray-800/80 transition-all duration-300"
                >
                  <div className="text-blue-500 text-4xl mb-4 inline-block" aria-hidden="true">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section 
          id="solutions-section" 
          className="py-20 bg-black"
          aria-label="Nossas soluções digitais"
        >
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-16 text-white">
              Nossas <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">Soluções</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.article
                  key={index}
                  whileHover={{ y: -10 }}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                  className="p-8 rounded-2xl bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 hover:bg-gray-900/80 transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="text-purple-500 text-4xl" aria-hidden="true">{service.icon}</div>
                    {(index === 0 || index === 1 || index === 2 || index === 3 || index === 4 || index === 5) && (
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                          if (index === 0) setIsGameModalOpen(true);
                          else if (index === 1) setIsRaffleModalOpen(true);
                          else if (index === 2) setIsSocialModalOpen(true);
                          else if (index === 3) setIsConversionModalOpen(true);
                          else if (index === 4) setIsDigitalCardModalOpen(true);
                          else if (index === 5) setIsLandingPageModalOpen(true);
                        }}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white p-2 rounded-lg flex items-center gap-2 text-sm font-semibold"
                        aria-label={`Ver demonstração de ${service.title}`}
                      >
                        <FaPlay aria-hidden="true" /> Demo
                      </motion.button>
                    )}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">{service.title}</h3>
                  <p className="text-gray-400">{service.description}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section 
          className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden"
          aria-label="Entre em contato"
        >
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-600/10" aria-hidden="true" />
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                }}
                aria-hidden="true"
              >
                <div className="w-1 h-1 bg-blue-500/30 rounded-full" />
              </div>
            ))}
          </div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl mx-auto"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">
                Pronto para <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">revolucionar</span> seu negócio?
              </h2>
              <p className="text-xl mb-8 text-gray-300">
                Entre em contato e descubra como podemos ajudar sua empresa a crescer
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={openDigitalCard}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
                aria-label="Abrir cartão digital de contato"
              >
                Fale Conosco
              </motion.button>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer for SEO */}
      <footer className="bg-gray-900 py-8 text-center text-gray-400">
        <div className="container mx-auto px-4">
          <p>&copy; {new Date().getFullYear()} DGSolution WEB. Todos os direitos reservados.</p>
          <p className="mt-2">
            Desenvolvimento Web | Marketing Digital | Soluções Interativas
          </p>
        </div>
      </footer>

      {/* Modals */}
      <GameModal 
        isOpen={isGameModalOpen}
        onClose={() => setIsGameModalOpen(false)}
        onWin={handleGameWin}
      />
      <RaffleModal 
        isOpen={isRaffleModalOpen}
        onClose={() => setIsRaffleModalOpen(false)}
        onWin={handleRaffleWin}
      />
      <SocialModal 
        isOpen={isSocialModalOpen}
        onClose={() => setIsSocialModalOpen(false)}
      />
      <ConversionModal 
        isOpen={isConversionModalOpen}
        onClose={() => setIsConversionModalOpen(false)}
      />
      <DigitalCardModal 
        isOpen={isDigitalCardModalOpen}
        onClose={() => setIsDigitalCardModalOpen(false)}
      />
      <LandingPageModal 
        isOpen={isLandingPageModalOpen}
        onClose={() => setIsLandingPageModalOpen(false)}
      />
      <WinModal 
        isOpen={isWinModalOpen}
        onClose={handleWinModalClose}
        message={winSource === 'raffle' 
          ? `Parabéns! ${winnerName} venceu o sorteio!` 
          : 'Parabéns! Você venceu o desafio!'}
      />
    </div>
  )
}

const features = [
  {
    icon: <FaRocket />,
    title: "Rápida Implementação",
    description: "Soluções prontas para usar em questão de dias"
  },
  {
    icon: <FaMobile />,
    title: "100% Responsivo",
    description: "Funciona perfeitamente em todos os dispositivos"
  },
  {
    icon: <FaLightbulb />,
    title: "Inovação Constante",
    description: "Sempre atualizado com as últimas tendências"
  },
  {
    icon: <FaChartBar />,
    title: "Resultados Mensuráveis",
    description: "Acompanhe o sucesso com métricas detalhadas"
  }
]

const services = [
  {
    icon: <FaGamepad />,
    title: "Gamificação",
    description: "Engaje seus clientes com experiências interativas e divertidas"
  },
  {
    icon: <FaTrophy />,
    title: "Sorteios",
    description: "Aumente o engajamento com promoções e sorteios personalizados"
  },
  {
    icon: <FaUsers />,
    title: "Interação Social",
    description: "Construa uma comunidade forte e engajada em torno da sua marca"
  },
  {
    icon: <FaChartLine />,
    title: "Conversão de Vendas",
    description: "Transforme visitantes em clientes com estratégias eficientes"
  },
  {
    icon: <FaIdCard />,
    title: "Cartões Digitais",
    description: "Cartões de visita digitais interativos e personalizados"
  },
  {
    icon: <FaRocket />,
    title: "Landing Pages",
    description: "Páginas de alta conversão otimizadas para resultados"
  }
]

export default App
