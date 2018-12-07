
export const DEFAULT_PAGE = {
  height: {
    value: 100,
    unit: 'vh'
  },
  width: {
    value: 100,
    unit: '%'
  }
};

// area calculated at 1200px width
export const PAGES = [
  {
    order: 1,
    path: ''
  }, {
    order: 2,
    path: 'about',
    area: 1080000
  }, {
    order: 3,
    path: 'projects',
    area: 1280000
  }, {
    order: 4,
    path: 'contact'
  }
];

export enum NAVIGATION_TYPE {
  MAIN,
  SECONDARY
}

interface PageConfig {
  order: number;
  path: string;
  area?: number;
  type?: NAVIGATION_TYPE;
}

export class Page {
  order: number;
  path: string;
  area: number;
  type: NAVIGATION_TYPE;

  constructor(config: PageConfig) {
    this.order = config.order;
    this.path = config.path;
    this.area = config.area || 0;
    this.type = config.type || NAVIGATION_TYPE.MAIN;
  }

}
