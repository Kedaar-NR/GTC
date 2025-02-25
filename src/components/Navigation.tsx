
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Home, Users, BookOpen, Newspaper, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Representatives', path: '/representatives', icon: Users },
    { name: 'Education', path: '/education', icon: BookOpen },
    { name: 'News', path: '/news', icon: Newspaper },
  ];

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate('/');
      toast({
        title: "Signed out successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-xl font-semibold text-civic-text">CivicEngage</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="flex items-center space-x-1 text-gray-600 hover:text-civic-accent transition-colors"
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            ))}
            {user ? (
              <Button 
                variant="ghost" 
                className="text-gray-600 hover:text-red-600"
                onClick={handleSignOut}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            ) : (
              <Button 
                variant="default" 
                className="bg-civic-accent hover:bg-civic-accent/90"
                onClick={() => navigate('/auth')}
              >
                Sign In
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden animate-in">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-600 hover:text-civic-accent hover:bg-gray-50"
                onClick={() => setIsOpen(false)}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            ))}
            {user ? (
              <Button 
                variant="ghost" 
                className="w-full justify-start text-gray-600 hover:text-red-600"
                onClick={() => {
                  handleSignOut();
                  setIsOpen(false);
                }}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            ) : (
              <Button 
                variant="default" 
                className="w-full bg-civic-accent hover:bg-civic-accent/90"
                onClick={() => {
                  navigate('/auth');
                  setIsOpen(false);
                }}
              >
                Sign In
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
