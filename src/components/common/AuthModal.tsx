import React, { useState } from 'react';
import { X, User, Shield, Store, MapPin, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation('translation');
  const [step, setStep] = useState<'role' | 'form' | 'mfa'>('role');
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { login, register } = useAuth();

  const roles = [
    {
      id: 'tourist',
      titleKey: 'auth.roles.tourist.title',
      descriptionKey: 'auth.roles.tourist.description',
      icon: User,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'admin',
      titleKey: 'auth.roles.admin.title',
      descriptionKey: 'auth.roles.admin.description',
      icon: Shield,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'seller',
      titleKey: 'auth.roles.seller.title',
      descriptionKey: 'auth.roles.seller.description',
      icon: Store,
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'guide',
      titleKey: 'auth.roles.guide.title',
      descriptionKey: 'auth.roles.guide.description',
      icon: MapPin,
      color: 'from-orange-500 to-red-500'
    }
  ];

  const handleRoleSelect = (roleId: string) => {
    setSelectedRole(roleId);
    setStep('form');
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      if (!isLogin) {
        // Registration validation
        if (formData.password !== formData.confirmPassword) {
          setError(t('auth.passwordMismatch'));
          setIsLoading(false);
          return;
        }
        if (formData.password.length < 6) {
          setError(t('auth.passwordTooShort'));
          setIsLoading(false);
          return;
        }
        await register(formData.email, formData.password, formData.name, selectedRole);
      } else {
        await login(formData.email, formData.password, selectedRole);
      }
      onClose();
      resetForm();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : t('auth.authFailed');
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setStep('role');
    setSelectedRole('');
    setFormData({ email: '', password: '', confirmPassword: '', name: '' });
    setIsLogin(true);
    setError(null);
  };

  const handleClose = () => {
    onClose();
    resetForm();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {step === 'role' ? t('auth.chooseRole') : isLogin ? t('auth.welcomeBack') : t('auth.createAccount')}
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg flex items-center space-x-2"
            >
              <AlertCircle className="w-5 h-5 text-red-500" />
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </motion.div>
          )}

          <AnimatePresence mode="wait">
            {step === 'role' && (
              <motion.div
                key="role"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                {roles.map((role) => {
                  const IconComponent = role.icon;
                  return (
                    <button
                      key={role.id}
                      onClick={() => handleRoleSelect(role.id)}
                      className="w-full p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-transparent hover:shadow-lg transition-all duration-300 text-left group"
                      style={{
                        background: `linear-gradient(135deg, transparent, transparent), linear-gradient(135deg, ${role.color.split(' ')[1]}, ${role.color.split(' ')[3]})`
                      }}
                    >
                      <div className="flex items-start space-x-4">
                        <div className={`p-3 rounded-lg bg-gradient-to-r ${role.color} text-white`}>
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-white transition-colors">
                            {t(role.titleKey)}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-white/80 transition-colors">
                            {t(role.descriptionKey)}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </motion.div>
            )}

            {step === 'form' && (
              <motion.div
                key="form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="mb-6">
                  <div className="flex items-center space-x-2 mb-2">
                    {(() => {
                      const role = roles.find(r => r.id === selectedRole);
                      const IconComponent = role?.icon || User;
                      return (
                        <>
                          <div className={`p-2 rounded-lg bg-gradient-to-r ${role?.color} text-white`}>
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            {role ? t(role.titleKey) : ''}
                          </span>
                        </>
                      );
                    })()}
                  </div>
                  <div className="flex space-x-1 mb-4">
                    <button
                      onClick={() => { setIsLogin(true); setError(null); }}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isLogin
                          ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                          : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                      }`}
                    >
                      {t('auth.login')}
                    </button>
                    <button
                      onClick={() => { setIsLogin(false); setError(null); }}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        !isLogin
                          ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                          : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                      }`}
                    >
                      {t('auth.signUp')}
                    </button>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {!isLogin && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t('auth.fullName')}
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                        placeholder={t('auth.enterFullName')}
                        required
                      />
                    </div>
                  )}
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('auth.emailAddress')}
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                      placeholder={t('auth.enterEmail')}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('auth.password')}
                    </label>
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                      placeholder={t('auth.enterPassword')}
                      required
                    />
                  </div>

                  {!isLogin && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t('auth.confirmPassword')}
                      </label>
                      <input
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                        placeholder={t('auth.confirmYourPassword')}
                        required
                      />
                    </div>
                  )}

                  {!isLogin && (
                    <div className="flex items-start space-x-2">
                      <input
                        type="checkbox"
                        id="terms"
                        className="mt-1 w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                        required
                      />
                      <label htmlFor="terms" className="text-sm text-gray-600 dark:text-gray-400">
                        {t('auth.termsAgree')}{' '}
                        <a href="#" className="text-green-600 hover:text-green-700 transition-colors">
                          {t('auth.termsOfService')}
                        </a>{' '}
                        {t('auth.and')}{' '}
                        <a href="#" className="text-green-600 hover:text-green-700 transition-colors">
                          {t('auth.privacyPolicy')}
                        </a>
                      </label>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-green-600 to-orange-500 text-white py-3 rounded-lg font-medium hover:from-green-700 hover:to-orange-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? t('auth.processing') : isLogin ? t('auth.login') : t('auth.createAccount')}
                  </button>
                </form>

                <div className="mt-4 text-center">
                  <button
                    onClick={() => { setStep('role'); setError(null); }}
                    className="text-sm text-green-600 hover:text-green-700 transition-colors"
                  >
                    {t('auth.backToRoles')}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthModal;
