import { NextFunction, Request, Response, Router } from "express";
import { BaseRoute } from "./route";

/**
 * / route
 *
 * @class User
 */
export class ErrorRoute extends BaseRoute {

    /**
     * Create the routes.
     *
     * @class IndexRoute
     * @method create
     * @static
     */
    public static create(router: Router) {
        
        /* router.get("/404", (req: Request, res: Response, next: NextFunction) => {
            new ErrorRoute().err404(req, res, next);
        });
        
        router.get("/403", (req: Request, res: Response, next: NextFunction) => {
            new ErrorRoute().err403(req, res, next);
        });
        
        router.get("/500", (req: Request, res: Response, next: NextFunction) => {
            new ErrorRoute().err500(req, res, next);
        }); */
        
    }

    /**
     * Constructor
     *
     * @class IndexRoute
     * @constructor
     */
    constructor() {
        super();
    }

    /**
     * The home page route.
     *
     * @class IndexRoute
     * @method index
     * @param req {Request} The express Request object.
     * @param res {Response} The express Response object.
     * @next {NextFunction} Execute the next method.
     */
    public err404(req: Request, res: Response, next: NextFunction){
        next();
    }
    
    public err403(req: Request, res: Response, next: NextFunction){
        // trigger a 403 error
        var err = new Error('not allowed!');
        res.status = 403;
        next(res);
    }
    
    public err500(req: Request, res: Response, next: NextFunction){
        // trigger a generic (500) error
        next(new Error('keyboard cat!'));
    }

    public index(req: Request, res: Response, next: NextFunction) {
        //render template
        this.render(req, res, "index", { req });
    }
}
  