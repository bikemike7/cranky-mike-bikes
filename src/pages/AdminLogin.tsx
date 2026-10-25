import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error } = await signIn(email, password);

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    navigate('/admin');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-sm border border-border p-6">
        <div className="text-center mb-6">
          <Lock className="mx-auto text-primary mb-3" size={32} />
          <h1 className="font-heading text-3xl text-foreground">MOD LOGIN</h1>
          <p className="text-xs text-muted-foreground font-mono mt-1">AUTHORIZED PERSONNEL ONLY</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-muted border-border"
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-muted border-border"
            required
          />

          {error && <p className="text-sm text-destructive font-mono">{error}</p>}

          <Button type="submit" className="w-full font-heading text-lg tracking-wide" disabled={loading}>
            {loading ? <Loader2 className="animate-spin" size={18} /> : 'ENTER'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
