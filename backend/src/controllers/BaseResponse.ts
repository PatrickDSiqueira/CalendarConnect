import express from "express";
import config from "../../config";

export default class {

    public responseSuccess(response, data: any): express.Response {

        return response.status(200).json({ok: true, data});
    }

    public responseInternalError(response, error: Error): express.Response {

        console.error(error);

        return response.status(500).json({ok: false, error: "Internal Server Error"});
    }

    public responseUnauthorized(response): express.Response {

        return response.status(401)
            .json({ok: false, error: "Unauthorized"});
    }

    public responseRedirect(response): express.Response {

        return response.redirect(config.frontendURL);
    }
}