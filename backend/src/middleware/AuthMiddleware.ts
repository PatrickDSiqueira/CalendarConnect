import {promisify} from "node:util";
import jwt from "jsonwebtoken";
import config from "../../config";
import BaseResponse from "../controllers/BaseResponse";

class AuthMiddleware extends BaseResponse {

    async check(req: Request, res, next) {

        const auth = req.headers['authorization'];

        if (!auth) {

            return this.responseUnauthorized(res);
        }

        const [, token] = auth.split(' ');

        try {

            const decode = await promisify(jwt.verify)(token, config.secret);

            if (!decode) {

                return this.responseUnauthorized(res);
            }

            const { googleToken } = decode;

            req.google_token = googleToken;

            next();

        } catch (e: Error) {

            return this.responseUnauthorized(res);
        }
    }
}

export default new AuthMiddleware();