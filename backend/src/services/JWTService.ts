import jwt from "jsonwebtoken"
import config from "../../config";

export default class JWTService {

    static generateJwtToken(user, googleToken: string) {

        return jwt.sign({user, googleToken}, config.secret, {expiresIn: config.expireJwt})
    }
}