import { NavigationType } from './navigation.enums';

interface PageConfig {
  id?: number;
  order: number;
  path: string;
  area?: number;
  type?: NavigationType;
}

export class Page {
  id: number;
  order: number;
  path: string;
  area: number;
  type: NavigationType;

  constructor(config: PageConfig) {
    this.id = config.id || null; // This is not really needed at this point.
    this.order = config.order;
    this.path = config.path;
    this.area = config.area || 0;
    this.type = config.type || NavigationType.MAIN;
  }
}

interface DetailedPageConfig extends PageConfig {
  description?: string;
  shortDescription?: string;
  color?: string;
  details?: string[];
}

export class DetailedPage extends Page {
  description: string;
  shortDescription: string;
  color: string;
  details: string[];

  constructor(config: DetailedPageConfig) {
    super(config);
    this.description = config.description || '';
    this.shortDescription = config.shortDescription || '';
    this.color = config.color || '';
    this.details = config.details || [];
  }
}
