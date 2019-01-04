import { NOT_FOUND_PAGE } from './core-page.config';
import { DetailedPage } from './page';
import { ProjectsConfig } from './projects-routing.config';

interface SubNavigationStateConfig {
  currentView?: DetailedPage;
  nextView?: DetailedPage;
  mainPageState?: string;
  secondaryPageState?: string;
  reversedAnimationDirection?: boolean;
}

export class SubNavigationState {
  public currentView: DetailedPage;
  public nextView: DetailedPage;
  public mainPageState;
  public secondaryPageState;
  public reversedAnimationDirection: boolean;
  public projectPages = Object.values(ProjectsConfig).map((project) => new DetailedPage(project));

  constructor(config: SubNavigationStateConfig) {
    this.currentView = config.currentView || this.projectPages[0];
    this.nextView = config.nextView || new DetailedPage(NOT_FOUND_PAGE);
    this.reversedAnimationDirection = config.reversedAnimationDirection || false;
    this.mainPageState = config.mainPageState || 'base';
    this.secondaryPageState = config.secondaryPageState || 'offRight';
  }
}
