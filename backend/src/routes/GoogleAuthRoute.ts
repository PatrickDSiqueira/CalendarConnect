import GoogleAuthController from "../controllers/GoogleAuthController";

export = function (app) {

    app.get("/auth/google", (req, res) => GoogleAuthController.get(req, res));

    app.get("/auth/google/callback", (req, res) => GoogleAuthController.callback(req, res));
}