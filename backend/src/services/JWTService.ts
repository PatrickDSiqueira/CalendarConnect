import User from "../database/models/User";
import jwt from "jsonwebtoken"
import config from "../../config";

export default class JWTService {

    static generateJwtToken(user: User, googleToken: string) {

        return jwt.sign({id: user.id, googleToken}, config.secret, {expiresIn: config.expireJwt})
    }
}