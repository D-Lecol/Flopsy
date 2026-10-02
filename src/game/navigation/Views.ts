import type { ComponentType } from 'react';
import ClustersView from '../views/ClustersView.js';
import GeneralView from '../views/GeneralView.js';
import ElectricalNetwork from '../views/ElectricalNetwork.js';

export interface View {
  title: string;
  subtitle: string;
  component: ComponentType;
}

export const views: View[] = [
  {
    title: 'Vue Générale',
    subtitle: 'SYS',
    component: GeneralView,
  },
  {
    title: 'Clusters Datacenter',
    subtitle: 'FLOPS',
    component: ClustersView,
  },
  {
    title: 'Réseau Electrique ',
    subtitle: 'PWR',
    component: ElectricalNetwork,
  },
];
