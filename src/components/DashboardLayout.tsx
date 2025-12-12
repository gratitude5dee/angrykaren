import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { profile } = useAuth();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 bg-background">
          {/* Header */}
          <header className="flex items-center justify-between px-8 py-6">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Welcome back,</span>
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={profile?.avatar_url || undefined} />
                  <AvatarFallback className="bg-accent text-accent-foreground text-xs">
                    {profile?.username?.charAt(0).toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                <span className="font-semibold text-foreground">{profile?.username || 'User'}</span>
              </div>
            </div>

            <div className="relative w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search training scenarios..."
                className="pl-10 rounded-full border-border bg-card shadow-sm"
              />
            </div>
          </header>

          {/* Content */}
          <div className="px-8 pb-8 space-y-8">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
