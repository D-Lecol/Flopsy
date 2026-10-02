import * as React from 'react';
import { type View, views } from './Views.js';
import NavigationItem from './NavigationItem.js';

interface NavigationProps {
  active: View;
  onSelect: (view: View) => void;
}

export default function Navigation(props: NavigationProps) {
  return (
    <div className="flex flex-col gap-space-md">
      <div className="px-space-xs">
        <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
          Secteurs Opérationnels
        </span>
      </div>
      <nav
        className="flex flex-col gap-space-xs"
        data-active-classes="bg-primary-container text-on-primary-container font-bold rounded"
      >
        {views.map((view: View) => (
          <NavigationItem
            title={view.title}
            subtitle={view.subtitle}
            isActive={view === props.active}
            onClick={() => props.onSelect(view)}
          />
        ))}
      </nav>
    </div>
  );
}
