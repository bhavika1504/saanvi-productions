import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, Loader2, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AdminLoginModal({ isOpen, onClose }: AdminLoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Logged in successfully');
      onClose();
      navigate('/admin');
    } catch (error: any) {
      console.error(error);
      toast.error('Login failed: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-primary/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-md bg-card rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>

            {/* Header */}
            <div className="bg-primary p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-cta/20 flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-cta" />
              </div>
              <h2 className="font-display text-2xl font-bold text-primary-foreground mb-2">
                Admin Login
              </h2>
              <p className="text-primary-foreground/70 text-sm">
                Access the admin dashboard to manage events and applications
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-8">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="admin-email" className="text-foreground flex items-center gap-2">
                    <Mail className="w-4 h-4 text-cta" />
                    Email Address
                  </Label>
                  <Input
                    id="admin-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@saanvifilms.com"
                    className="bg-background text-black border-border focus:border-cta focus:ring-cta"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="admin-password" className="text-foreground flex items-center gap-2">
                    <Lock className="w-4 h-4 text-cta" />
                    Password
                  </Label>
                  <Input
                    id="admin-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="bg-background text-black border-border focus:border-cta focus:ring-cta"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full mt-6 bg-cta hover:bg-cta/90 text-cta-foreground"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>

              <p className="text-center text-sm text-muted-foreground mt-4">
                Forgot password?{' '}
                <a href="#" className="text-cta hover:underline">
                  Reset here
                </a>
              </p>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
