import { Request, Response } from 'express';
import { join } from 'path';

const DIST_FOLDER = join(process.cwd(), 'dist');

/**
 * Constructor
 *
 * @class BaseRoute
 */
export class BaseRoute {

  /**
   * Constructor
   *
   * @class BaseRoute
   * @constructor
   */
  constructor() {
  }

  /**
   * Render a page.
   *
   * @class BaseRoute
   * @method render
   * @param req {Request} The request object.
   * @param res {Response} The response object.
   * @param view {String} The view to render.
   * @param options {Object} Additional options to append to the view's local scope.
   * @return void
   */
  public render(req: Request, res: Response, view: string, options?: Object) {
    // render view
    res.render(view, options);
  }
}
