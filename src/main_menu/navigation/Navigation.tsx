import * as React from 'react';
import { type View, views } from './Views.js';
import NavigationItem from './NavigationItem.js';

interface NavigationProps {
  active: View;
  onSelect: (view: View) => void;
}

export default function Navigation(props: NavigationProps) {
  return (
    <nav
      className="hidden lg:flex items-center gap-space-sm"
      data-active-classes="bg-primary-container text-on-primary-container font-headline-sm rounded"
    >
      {views.map((view: View) => (
        <NavigationItem
          title={view.title}
          isActive={view === props.active}
          onClick={() => props.onSelect(view)}
        />
      ))}
    </nav>
  );
}
