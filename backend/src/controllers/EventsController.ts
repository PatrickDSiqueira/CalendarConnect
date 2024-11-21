import BaseResponse from "./BaseResponse";
import EventsService from '../services/EventsService'

class EventsController extends BaseResponse {

    private eventsService: EventsService;

    constructor() {
        super();
        this.eventsService = new EventsService();
    }

    async index(req, res) {

        try {

            const data = await this.eventsService.listEvents(req.google_token);

            return this.responseSuccess(res, data);

        } catch (error: Error) {

            this.responseInternalError(res, error);
        }
    }
}


export default new EventsController();
