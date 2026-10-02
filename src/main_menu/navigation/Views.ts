import type { ComponentType } from 'react';
import Main from '../views/Main.js';
import Rapport from '../views/Rapport.js';
import Credits from '../views/Credits.js';

export interface View {
  title: string;
  component: ComponentType;
}

export const views: View[] = [
  {
    title: 'Menu principal',
    component: Main,
  },
  {
    title: 'Rapport de Mission',
    component: Rapport,
  },
  {
    title: 'Crédits & Système',
    component: Credits,
  },
];
