import EventsController from "../controllers/EventsController";
import AuthMiddleware from "../middleware/AuthMiddleware";

export = function (app) {

    app.get("/events", (req, res, next) => AuthMiddleware.check(req, res, next), (req, res) => EventsController.index(req, res));
}