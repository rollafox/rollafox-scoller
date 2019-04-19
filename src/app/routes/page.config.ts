
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

export const NOT_FOUND_PAGE = {
  id: -1,
  order: null,
  path: 'not-found',
};

// TODO: Revise these core Page Configurations.
// area calculated at 1200px width
export const PAGES = [
  {
    order: 1,
    path: ''
  }, {
    order: 2,
    path: 'projects',
    area: 1280000
  }, {
    order: 3,
    path: 'about',
    area: 1080000
  }, {
    order: 4,
    path: 'contact'
  }
];
