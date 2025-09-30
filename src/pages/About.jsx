import { motion } from 'framer-motion';
import { Heart, Brain, Shield, Users, Calendar, Activity, FileText, Zap, Target, Award } from 'lucide-react';
import { Card } from '../components/Card';

import Misabout from "../assets/About/MisAbout.png"; 
import VisAbout from "../assets/About/VisAbout.png";
import ValAbout from "../assets/About/ValAbout.png";
import FunAbout from "../assets/About/FunAbout.png";
import SocAbout from "../assets/About/SocAbout.png";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

const VALUES = [
  {
    icon: <Heart className="w-8 h-8 text-white" />,
    title: 'Acolhimento',
    description: 'Criamos um ambiente seguro e acolhedor para todos que buscam apoio psicológico'
  },
  {
    icon: <Brain className="w-8 h-8 text-white" />,
    title: 'Bem-estar Mental',
    description: 'Promovemos saúde mental através de tecnologia acessível e humanizada'
  },
  {
    icon: <Shield className="w-8 h-8 text-white" />,
    title: 'Confidencialidade',
    description: 'Garantimos total privacidade e segurança dos dados de nossos usuários'
  },
  {
    icon: <Users className="w-8 h-8 text-white" />,
    title: 'Inclusão',
    description: 'Democratizamos o acesso à terapia para todas as pessoas, independente de sua condição'
  }
];

const FEATURES = [
  {
    icon: <Calendar className="w-6 h-6 text-medium" />,
    title: 'Agenda Interativa',
    description: 'Sistema automatizado com marcação de horários disponíveis e lembretes por e-mail'
  },
  {
    icon: <Activity className="w-6 h-6 text-medium" />,
    title: 'Análise Inteligente',
    description: 'Algoritmos de Machine Learning para agrupamento de perfis e padrões emocionais'
  },
  {
    icon: <FileText className="w-6 h-6 text-medium" />,
    title: 'Registro Estruturado',
    description: 'Histórico de sessões com temas, recomendações e relatórios analíticos'
  },
  {
    icon: <Zap className="w-6 h-6 text-medium" />,
    title: 'Segurança Total',
    description: 'Autenticação JWT, privacidade garantida e interface acessível'
  }
];

export const About = () => {
  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-6 md:px-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* ÍCONE: Representativo da empresa */}
          <div className="w-24 h-24 bg-medium rounded-full flex items-center justify-center mx-auto mb-8">
            <Heart className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-dark mb-6 tracking-tight">
            Sobre o <span className="text-medium">Lunysse</span>
          </h1>
          <Card className="p-8 md:p-12">
            <p className="text-xl text-dark/80 leading-relaxed mb-6 font-light">
              Sistema de agendamento de atendimento psicológico voltado para instituições 
              como universidades, ONGs e projetos sociais, oferecendo uma solução digital 
              que organiza agendas e acompanha o bem-estar emocional.
            </p>
            <p className="text-lg text-dark/70 leading-relaxed font-light">
              Unimos tecnologia, saúde e responsabilidade social para democratizar 
              o acesso ao cuidado psicológico de qualidade.
            </p>
          </Card>
        </motion.div>
      </section>

      {/* Missão e Visão */}
      <section className="py-20 px-6 md:px-20 bg-white/30">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div variants={fadeInUp} className="h-full">
              <Card className="p-8 h-full flex flex-col">
                {/* IMAGEM: Ícone ou ilustração sobre missão */}
                <div className="w-full h-32 mb-6">
                  <img src={Misabout} alt="Nossa Missão" className="w-full h-full object-cover rounded-lg" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-dark mb-4 tracking-tight">Nossa Missão</h2>
                <p className="text-dark/80 leading-relaxed mb-4 font-light">
                  Desenvolver um sistema web que permita o agendamento e acompanhamento 
                  de atendimentos psicológicos, garantindo privacidade, usabilidade e 
                  acessibilidade com suporte analítico baseado em dados.
                </p>
                <p className="text-dark/70 leading-relaxed font-light">
                  Otimizamos o processo de marcação e gestão de atendimentos psicológicos 
                  voluntários para instituições e projetos sociais.
                </p>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp} className="h-full">
              <Card className="p-8 h-full flex flex-col">
                {/* IMAGEM: Ícone ou ilustração sobre visão */}
                <div className="w-full h-32 mb-6">
                  <img src={VisAbout} alt="Nossa Visão" className="w-full h-full object-cover rounded-lg" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-dark mb-4 tracking-tight">Nossa Visão</h2>
                <p className="text-dark/80 leading-relaxed mb-4 font-light">
                  Ser a solução digital de referência para organização de serviços 
                  psicológicos em projetos sociais, promovendo impacto positivo 
                  na saúde mental coletiva.
                </p>
                <p className="text-dark/70 leading-relaxed font-light">
                  Transformar a gestão de atendimentos psicológicos através de 
                  tecnologia acessível e inteligência artificial aplicada.
                </p>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Nossos Valores */}
      <section className="py-20 px-6 md:px-20">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={fadeInUp} className="text-center mb-16">
            {/* IMAGEM: Banner sobre valores da empresa */}
            <div className="w-full max-w-md h-40 mx-auto mb-8">
              <img src={ValAbout} alt="Nossos Valores" className="w-full h-full object-cover rounded-lg" />
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-dark mb-4 tracking-tight">
              Nossos Valores
            </h2>
            <p className="text-xl text-dark/70 max-w-2xl mx-auto font-light">
              Os princípios que orientam nosso compromisso com o bem-estar emocional
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((value, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="hover:scale-105 transition-transform duration-300"
              >
                <Card className="p-6 text-center h-full flex flex-col">
                  <div className="w-16 h-16 bg-medium rounded-full flex items-center justify-center mx-auto mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-lg font-bold text-dark mb-3 tracking-tight">{value.title}</h3>
                  <p className="text-dark/70 font-light leading-relaxed flex-grow">{value.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Funcionalidades */}
      <section className="py-20 px-6 md:px-20 bg-white/30">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={fadeInUp} className="text-center mb-16">
            {/* IMAGEM: Ilustração sobre tecnologia e bem-estar */}
            <div className="w-full max-w-lg h-48 mx-auto mb-8">
              <img src={FunAbout} alt="Funcionalidades" className="w-full h-full object-cover rounded-lg" />
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-dark mb-4 tracking-tight">
              Como Funcionamos
            </h2>
            <p className="text-xl text-dark/70 max-w-2xl mx-auto font-light">
              Funcionalidades inteligentes para gestão completa de atendimentos
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {FEATURES.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="hover:scale-105 transition-transform duration-300"
              >
                <Card className="p-8 h-full flex flex-col">
                  <div className="flex items-start space-x-4 flex-grow">
                    <div className="flex-shrink-0 w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center">
                      {feature.icon}
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-xl font-bold text-dark mb-3 tracking-tight">{feature.title}</h3>
                      <p className="text-dark/70 font-light leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Compromisso Final */}
      <section className="py-20 px-6 md:px-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <Card className="p-12">
            {/* IMAGEM: Ilustração sobre compromisso e cuidado */}
            <div className="w-full max-w-sm h-40 mx-auto mb-6">
              <img src={SocAbout} alt="Impacto Social" className="w-full h-full object-cover rounded-lg" />
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-dark mb-6 tracking-tight">
              Impacto Social
            </h2>
            <p className="text-xl text-dark/80 mb-6 font-light leading-relaxed">
              Este projeto representa a união entre tecnologia, saúde e responsabilidade social. 
              Desenvolvemos não apenas habilidades técnicas, mas também promovemos empatia 
              e compromisso com o bem-estar coletivo.
            </p>
            <p className="text-lg text-dark/70 font-light">
              Uma oportunidade de aplicar conhecimento em um contexto sensível e transformador.
            </p>
          </Card>
        </motion.div>
      </section>
    </div>
  );
};