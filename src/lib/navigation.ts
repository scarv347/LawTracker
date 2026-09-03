export type PageId = 'dashboard' | 'my-laws' | 'ask-lawtrack' | 'court-dates' | 'cases';

export interface NavItem {
  id: PageId;
  label: string;
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'my-laws', label: 'My Laws' },
  { id: 'ask-lawtrack', label: 'Ask LawTrack' },
  { id: 'court-dates', label: 'Court Dates' },
  { id: 'cases', label: 'Cases' },
];

import type { ComponentType, SVGProps } from 'react';
import { LayoutDashboard, Scale, MessageCircle, Calendar, FolderOpen } from '../components/ui/Icons';

export const pageIcons: Record<PageId, ComponentType<SVGProps<SVGSVGElement>>> = {
  dashboard: LayoutDashboard,
  'my-laws': Scale,
  'ask-lawtrack': MessageCircle,
  'court-dates': Calendar,
  cases: FolderOpen,
};
