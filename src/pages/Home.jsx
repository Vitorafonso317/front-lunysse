import { motion } from 'framer-motion';
import { Heart, Brain, Shield, Star, User, Calendar } from 'lucide-react';
import Dec1 from "../assets/Home/Home.jpg";
import PsiHome1 from "../assets/Home/PsiHome.jpg"
import ManHome from "../assets/Home/ManHome.jpg"
import GirlHome from "../assets/Home/GirlHome.jpg"
import PsiGirlHome from "../assets/Home/PsiGirlHome.jpg" 
import PqTerapia from "../assets/Home/PqTerapia.jpg"
import PessoasFelizes from "../assets/Home/PessoasFelizes.jpg"
import Motivacao from "../assets/Home/Motivacao.jpg"

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

export const Home = () => {
  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center justify-between overflow-hidden px-6 md:px-20">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="max-w-2xl z-10"
        >
          <h1 className="text-4xl md:text-6xl font-black text-dark leading-tight mb-6 tracking-tight">
            Cuidar da mente é um ato de <span className="text-medium">coragem</span>
          </h1>
          <p className="text-xl text-dark/80 mb-8 leading-relaxed font-light">
            Agende seu atendimento psicológico de forma simples e acolhedora. 
            Sua jornada de autoconhecimento começa aqui.
          </p>
          
          {/* 🖼️ ESPAÇO PARA IMAGEM: Aqui seria ideal uma foto de uma pessoa em sessão de terapia 
              ou uma ilustração representando bem-estar mental */}
        </motion.div>

        <motion.img
          src={Banner}
          alt="decoração floral"
          className="absolute bottom-0 right-0 object-contain opacity-90 pointer-events-none z-10"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        />

        <motion.img
          src={Dec1}
          alt="decoração adicional"
          className="absolute bottom-0 right-40 w-40 md:w-400 object-contain pointer-events-none z-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </section>

      {/* Seção com Foto de Terapia */}
      <section className="py-20 px-6 md:px-20 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Foto de Terapia */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <img 
                src= {PsiHome1}
                alt="Sessão de terapia profissional" 
                className="w-full h-96 object-cover rounded-2xl shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-medium/20 to-transparent rounded-2xl"></div>
            </motion.div>
            
            {/* Texto Complementar */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-dark tracking-tight">
                Um espaço seguro para <span className="text-medium">sua transformação</span>
              </h3>
              <p className="text-lg text-dark/80 leading-relaxed font-light">
                Nossa abordagem terapêutica combina técnicas comprovadas com um ambiente 
                acolhedor e profissional, onde você pode se sentir à vontade para explorar 
                seus sentimentos e pensamentos.
              </p>
              <p className="text-base text-dark/70 leading-relaxed font-light">
                Cada sessão é conduzida com respeito, confidencialidade e foco no seu 
                bem-estar, proporcionando as ferramentas necessárias para seu crescimento pessoal.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefícios da Terapia */}
      <section className="py-20 px-6 md:px-20 bg-white/50">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <div className="mb-8">
              <img 
                src={PqTerapia} 
                alt="Por que fazer terapia" 
                className="w-64 h-64 mx-auto mb-6 rounded-2xl shadow-lg object-cover"
              />
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-dark mb-4 tracking-tight">
              Benefícios da Terapia
            </h2>
            <p className="text-xl text-dark/70 max-w-2xl mx-auto font-light">
              Descubra como a terapia pode transformar sua vida de forma positiva
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Brain, title: "Autoconhecimento", desc: "Desenvolva uma compreensão mais profunda de si mesmo" },
              { icon: Heart, title: "Equilíbrio Emocional", desc: "Aprenda a lidar melhor com suas emoções" },
              { icon: Shield, title: "Redução da Ansiedade", desc: "Técnicas eficazes para controlar a ansiedade" }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="glassmorphism p-8 text-center hover:scale-105 transition-transform duration-300 h-full flex flex-col"
              >
                <benefit.icon className="w-16 h-16 text-medium mx-auto mb-4" />
                <h3 className="text-xl font-bold text-dark mb-3 tracking-tight">{benefit.title}</h3>
                <p className="text-dark/70 font-light flex-grow">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Depoimentos */}
      <section className="py-20 px-6 md:px-20">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-dark mb-4 tracking-tight">
              O que nossos pacientes dizem
            </h2>
            <div className="mt-6">
              <img 
                src={PessoasFelizes} 
                alt="Pessoas felizes e satisfeitas" 
                className="w-60 h-40 mx-auto rounded-2xl shadow-lg object-cover"
              />
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { name: "Maria Silva", text: "A terapia mudou completamente minha perspectiva de vida. Hoje me sinto mais confiante e em paz comigo mesma." },
              { name: "João Santos", text: "Encontrei aqui o acolhimento que precisava. O processo terapêutico me ajudou a superar momentos difíceis." }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="glassmorphism p-8 h-full flex flex-col"
              >
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-accent fill-current" />
                  ))}
                </div>
                <p className="text-dark/80 mb-4 italic text-lg font-light">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <img 
                    src={testimonial.name === "Maria Silva" ? GirlHome : ManHome} 
                    alt={testimonial.name} 
                    className="w-14 h-14 rounded-full object-cover mr-3" 
                  />
                  <span className="font-semibold text-dark tracking-wide">{testimonial.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Sobre o Psicólogo */}
      <section className="py-20 px-6 md:px-20 bg-white/30">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div variants={fadeInUp}>
            <h2 className="text-3xl md:text-5xl font-black text-dark mb-8 tracking-tight">
              Sobre Nossa Equipe
            </h2>
            <div className="glassmorphism p-12">
              <div className="w-32 h-32 mx-auto mb-6">
                <img 
                  src={PsiGirlHome} 
                  alt="Dra. Ana Luiza" 
                  className="w-32 h-32 rounded-full object-cover shadow-lg" 
                />
              </div>
              <h3 className="text-2xl font-bold text-dark mb-4 tracking-tight">Dra. Ana Luiza</h3>
              <p className="text-dark/70 text-lg leading-relaxed mb-6 font-light">
                Psicóloga clínica com mais de 10 anos de experiência em terapia cognitivo-comportamental. 
                Especializada em ansiedade, depressão e desenvolvimento pessoal. 
                Acredito que cada pessoa tem o potencial de transformar sua vida.
              </p>
              <div className="text-medium font-medium tracking-wide">
                CRP: 12345-6 | Especialização em TCC
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* CTA Final */}
      <section className="py-20 px-6 md:px-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }} 
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="glassmorphism p-12">
            <div className="mb-6">
              <img 
                src={Motivacao} 
                alt="Motivação para começar a jornada" 
                className="w-64 h-64 mx-auto rounded-4xl shadow-lg object-cover bg-accent"
              />
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-dark mb-6 tracking-tight">
              Pronto para começar sua jornada?
            </h2>
            <p className="text-xl text-dark/70 mb-8 max-w-2xl mx-auto font-light">
              Dê o primeiro passo em direção ao seu bem-estar. 
              Agende uma consulta e descubra como a terapia pode transformar sua vida.
            </p>

           
          </div>
        </motion.div>
      </section>
    </div>
  );
};
