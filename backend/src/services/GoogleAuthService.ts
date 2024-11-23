import axios from "axios";
import UserRepository from "../repositories/UserRepository";
import JWTService from "./JWTService";

require("dotenv").config()

export default class GoogleAuthService {

    generateLnkToAuthentication(): string {

        const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

        let REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;

        return `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=profile email https://www.googleapis.com/auth/calendar`;
    }

    async processGoogleOAuth2(code) {

        const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
        const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;
        const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

        const tokenUrl = "https://oauth2.googleapis.com/token";

        const data = {
            code,
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            redirect_uri: REDIRECT_URI,
            grant_type: "authorization_code",
            access_type: "offline",
        };

        const response = await axios.post(tokenUrl, data,
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }
        );

        const tokenData = response.data;

        const accessToken = tokenData.access_token;

        const profileURL = "https://www.googleapis.com/oauth2/v2/userinfo";

        const profileResponse = await axios.get(profileURL, {
            headers: {Authorization: `Bearer ${accessToken}`}
        });

        return JWTService.generateJwtToken(profileResponse.data, `Bearer ${accessToken}`)
    }
}
