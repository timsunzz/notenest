import { ReactNode } from 'react';

interface MainLayoutProps {
  sidebar: ReactNode;
  content: ReactNode;
}

export function MainLayout({ sidebar, content }: MainLayoutProps) {
  return (
    <div className="h-screen flex">
      <div className="w-80 flex flex-col border-r bg-background">
        {sidebar}
      </div>
      <div className="flex-1 relative">
        <div className="absolute inset-0 p-4">
          {content}
        </div>
      </div>
    </div>
  );
}