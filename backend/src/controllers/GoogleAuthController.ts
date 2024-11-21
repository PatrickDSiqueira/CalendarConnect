import BaseResponse from "./BaseResponse";
import GoogleAuthService from "../services/GoogleAuthService";

class GoogleAuthController extends BaseResponse {

    private googleAuthService: GoogleAuthService;

    constructor() {
        super();
        this.googleAuthService = new GoogleAuthService();
    }

    get(req, res) {

        try {

            const data = this.googleAuthService.generateLnkToAuthentication();

            return this.responseSuccess(res, data);

        } catch (error) {

            return this.responseInternalError(res, error);
        }
    }

    async callback(req, res) {

        try {

            const code = req.query.code;

            const data = await this.googleAuthService.processGoogleOAuth2(code);

            return this.responseSuccess(res, data);

        } catch (error: Error) {

            return this.responseInternalError(res, error);
        }
    }
}

export default new GoogleAuthController();