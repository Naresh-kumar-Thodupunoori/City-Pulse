import { EmergencyAlert } from '@/types';

export const EMERGENCY_ALERTS: EmergencyAlert[] = [
  {
    id: '1',
    title: 'Weather Alert: Heavy Rain Expected',
    description: 'Heavy rainfall is expected in the next 24 hours. Please avoid unnecessary travel and stay indoors.',
    severity: 'medium',
    date: new Date().toISOString(),
    category: 'Weather',
  },
  {
    id: '2',
    title: 'Traffic Advisory: Road Closure on Main Street',
    description: 'Main Street will be closed from 8 AM to 6 PM due to maintenance work. Please use alternate routes.',
    severity: 'low',
    date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    category: 'Traffic',
  },
  {
    id: '3',
    title: 'Public Health Notice',
    description: 'Free flu vaccination camps available at all community centers this weekend.',
    severity: 'low',
    date: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    category: 'Health',
  },
  {
    id: '4',
    title: 'Emergency: Gas Leak in Downtown Area',
    description: 'Gas leak reported in downtown area. Residents are advised to evacuate immediately. Emergency services on site.',
    severity: 'critical',
    date: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    category: 'Emergency',
  },
  {
    id: '5',
    title: 'Power Outage Scheduled Maintenance',
    description: 'Scheduled power maintenance in sectors 5-7 from 10 PM to 2 AM tonight.',
    severity: 'medium',
    date: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    category: 'Utilities',
  },
];




