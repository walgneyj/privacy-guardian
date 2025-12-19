import { LucideIcon } from 'lucide-react';

interface Tab {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface TabNavigationProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const TabNavigation = ({ tabs, activeTab, onTabChange }: TabNavigationProps) => {
  return (
    <nav className="bg-card rounded-2xl shadow-card mb-6 p-2 animate-slide-up stagger-1">
      <div className="flex gap-1.5">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl 
                font-semibold text-sm transition-all duration-300
                ${isActive 
                  ? 'gradient-hero text-primary-foreground shadow-lg shadow-primary/20 scale-[1.02]' 
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }
              `}
            >
              <Icon className="w-5 h-5" />
              <span className="hidden md:inline">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default TabNavigation;
