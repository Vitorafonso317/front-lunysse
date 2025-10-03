import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { mockApi } from '../services/mockApi';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Card } from '../components/Card';
import { Heart, Lock, Mail, Eye, EyeOff, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

export const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { user, token } = await mockApi.login(formData.email, formData.password);
      login(user, token);
      toast.success('Login realizado com sucesso!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-white/50 to-accent/10 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        
        {/* Left Side - Welcome Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hidden lg:block space-y-8"
        >
          <div className="space-y-6">
            <div className="w-64 h-40 bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <img src="/logotipo sem fundo.png" alt="Lunysse" className="w-full h-full object-contain transform scale-125" />
            </div>
            
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-black text-dark leading-tight">
                Bem-vindo de volta!
              </h2>
              <p className="text-xl text-dark/70 font-light leading-relaxed">
                Continue sua jornada de autoconhecimento e bem-estar. 
                Estamos aqui para apoiá-lo em cada passo.
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-4 pt-8">
              {[
                "Acesso seguro e confidencial",
                "Acompanhamento personalizado", 
                "Profissionais qualificados"
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-2 h-2 bg-medium rounded-full"></div>
                  <span className="text-dark/80 font-light">{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Side - Login Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-md mx-auto lg:mx-0"
        >
          <Card className="p-8 md:p-10 backdrop-blur-xl bg-white/80 border border-white/20">
            {/* Mobile Header */}
            <div className="lg:hidden text-center mb-8">
              <div className="w-52 h-32 mx-auto mb-4 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-md">
                <img src="/logotipo sem fundo.png" alt="Lunysse" className="w-full h-full object-contain transform scale-125" />
              </div>
              <h1 className="text-2xl font-black text-dark mb-2">Entrar</h1>
              <p className="text-dark/70 font-light">Acesse sua conta no Lunysse</p>
            </div>

            {/* Desktop Header */}
            <div className="hidden lg:block text-center mb-8">
              <h3 className="text-2xl font-bold text-dark mb-2">Fazer Login</h3>
              <p className="text-dark/70 font-light">Entre com suas credenciais</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-dark">E-mail</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-dark/40" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="seu@email.com"
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-medium/20 focus:border-medium transition-colors bg-white/50"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-dark">Senha</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-dark/40" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Sua senha"
                    className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-medium/20 focus:border-medium transition-colors bg-white/50"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-dark/40 hover:text-dark transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-medium to-accent text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all duration-300 disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    Entrar
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </form>

            {/* Links */}
            <div className="mt-8 space-y-4 text-center">
              <p className="text-dark/70 font-light">
                Não tem uma conta?{' '}
                <Link to="/register" className="text-medium hover:text-accent font-medium transition-colors">
                  Criar conta
                </Link>
              </p>
              <Link to="/" className="text-dark/60 hover:text-dark font-light text-sm transition-colors inline-flex items-center gap-1">
                ← Voltar ao início
              </Link>
            </div>


          </Card>
        </motion.div>
      </div>
    </div>
  );
};