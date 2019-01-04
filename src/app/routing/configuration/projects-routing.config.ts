import { NAVIGATION_TYPE } from './navigation.enums';

export const ProjectsConfig = Object.freeze({
  HOME: {
    id: 1,
    description: 'Projects',
    shortDescription: 'Projects',
    path: 'projects/',
    order: 1,
    color: '',
    details: [
      'This is a paragraph detailing what this project is about.'
    ],
    type: NAVIGATION_TYPE.SECONDARY
  },
  TRACKER: {
    id: 2,
    description: 'Tracker',
    shortDescription: 'Tracker',
    path: 'projects/tracker',
    order: 2,
    color: '#f4cb42',
    details: [
      'This is a paragraph detailing what this project is about.'
    ],
    type: NAVIGATION_TYPE.SECONDARY
  },
  DVT: {
    id: 3,
    description: 'DVT Internal',
    shortDescription: 'DVT',
    path: 'projects/dvt-internal',
    order: 3,
    color: '#007fba',
    details: [
      'This is a paragraph detailing what this project is about.'
    ],
    type: NAVIGATION_TYPE.SECONDARY
  },
  RANDOM: {
    id: 4,
    description: 'Random Page',
    shortDescription: 'Random Page',
    path: 'projects/',
    order: 4,
    color: '',
    details: [
      'This is a paragraph detailing what this project is about.'
    ],
    type: NAVIGATION_TYPE.SECONDARY
  },
  HUGE: {
    id: 5,
    description: 'Huge Telecom',
    shortDescription: 'Huge',
    path: 'projects/huge-telecom',
    order: 5,
    color: '#00adef',
    details: [
      'This is a paragraph detailing what this project is about.'
    ],
    type: NAVIGATION_TYPE.SECONDARY
  },
  FRIGGIN: {
    id: 6,
    description: 'Friggin Coffee',
    shortDescription: 'Friggin',
    path: 'projects/friggin-coffee',
    order: 6,
    color: '#cc0000',
    details: [
      'This is a paragraph detailing what this project is about.'
    ],
    type: NAVIGATION_TYPE.SECONDARY
  }
});
