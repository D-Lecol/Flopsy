import * as React from 'react';

interface NavigationItemProps {
  isActive: boolean;
  title: string;
  onClick: () => void;
}

export default function NavigationItem(props: Readonly<NavigationItemProps>) {
  return (
    <button
      aria-current="page"
      className={`px-space-md py-1.5 transition-colors rounded 
        ${
          props.isActive
            ? 'font-headline-sm bg-primary-container text-on-primary-container'
            : 'font-body-md text-body-md  text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
        }`}
      onClick={props.onClick}
    >
      {props.title}
    </button>
  );
}
