import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signUp, user, loading } = useAuth();
  const { toast } = useToast();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sidebar">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await signUp(email, password, username);

    if (error) {
      toast({
        title: 'Registration failed',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Check your email',
        description: 'We sent you a confirmation link to complete your registration.',
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-sidebar p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-sidebar-foreground mb-2">Simulate</h1>
          <p className="text-sidebar-foreground/60">Create your account to get started.</p>
        </div>

        <div className="bg-sidebar-accent rounded-2xl p-8 shadow-xl border border-sidebar-border">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sidebar-foreground">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="bg-sidebar border-sidebar-border text-sidebar-foreground placeholder:text-sidebar-foreground/40"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sidebar-foreground">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-sidebar border-sidebar-border text-sidebar-foreground placeholder:text-sidebar-foreground/40"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sidebar-foreground">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="bg-sidebar border-sidebar-border text-sidebar-foreground placeholder:text-sidebar-foreground/40"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
              disabled={isLoading}
            >
              {isLoading ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sidebar-foreground/60">
              Already have an account?{' '}
              <Link to="/login" className="text-accent hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
