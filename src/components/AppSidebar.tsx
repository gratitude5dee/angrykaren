import { Plus, Compass, Sparkles, Search, MessageCircle, ChevronDown, Crown } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const navItems = [
  { title: 'Discover', icon: Compass, url: '#' },
  { title: 'AvatarFX', icon: Sparkles, url: '#' },
];

const chatHistory = [
  { id: '1', name: 'Creative Writing Coach', avatar: '✍️' },
  { id: '2', name: 'Tech Advisor', avatar: '💻' },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const { profile, signOut } = useAuth();
  const collapsed = state === 'collapsed';

  return (
    <Sidebar className="border-r-0">
      <SidebarHeader className="p-4">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <span className="text-lg font-semibold text-sidebar-foreground">character.ai</span>
          )}
          <SidebarTrigger className="text-sidebar-foreground/60 hover:text-sidebar-foreground" />
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3">
        {/* Create Button */}
        <Button
          variant="outline"
          className="w-full justify-start gap-3 mb-4 bg-sidebar-accent border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent/80"
        >
          <Plus className="h-5 w-5" />
          {!collapsed && <span>Create</span>}
        </Button>

        {/* Navigation */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent"
                  >
                    <a href={item.url}>
                      <item.icon className="h-5 w-5" />
                      {!collapsed && <span>{item.title}</span>}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Search */}
        {!collapsed && (
          <div className="relative my-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-sidebar-foreground/40" />
            <Input
              placeholder="Search"
              className="pl-9 bg-sidebar-accent border-0 text-sidebar-foreground placeholder:text-sidebar-foreground/40"
            />
          </div>
        )}

        {/* Chat History */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/40 text-xs uppercase tracking-wider">
            Today
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {chatHistory.map((chat) => (
                <SidebarMenuItem key={chat.id}>
                  <SidebarMenuButton className="text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent">
                    <span className="text-lg">{chat.avatar}</span>
                    {!collapsed && <span className="truncate">{chat.name}</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 space-y-4">
        {!collapsed && (
          <div className="text-[11px] text-sidebar-foreground/40">
            Privacy Policy · Terms of Service
          </div>
        )}

        {/* Upgrade Button */}
        <Button
          variant="outline"
          className="w-full justify-center gap-2 border-accent text-accent hover:bg-accent/10"
        >
          <Crown className="h-4 w-4" />
          {!collapsed && <span>Upgrade</span>}
        </Button>

        {/* User Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-sidebar-accent transition-colors">
              <Avatar className="h-9 w-9">
                <AvatarImage src={profile?.avatar_url || undefined} />
                <AvatarFallback className="bg-accent text-accent-foreground text-sm">
                  {profile?.username?.charAt(0).toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              {!collapsed && (
                <>
                  <div className="flex-1 text-left">
                    <div className="text-sm font-medium text-sidebar-foreground">
                      {profile?.username || 'User'}
                    </div>
                    <div className="text-xs text-sidebar-foreground/60">
                      {profile?.handle || '@user'}
                    </div>
                  </div>
                  <ChevronDown className="h-4 w-4 text-sidebar-foreground/60" />
                </>
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={signOut} className="cursor-pointer">
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
