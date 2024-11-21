import axios from "axios";

export default class EventsService {

    async listEvents(accessToken: string) {


        const eventsResponse = await axios.get("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
            headers: {Authorization: accessToken},
            params: {
                timeMin: new Date().toISOString(),
                maxResults: 10,
                singleEvents: true,
                orderBy: "startTime",
            }
        })

        const events = eventsResponse.data.items;

        return events.map(event => {

            return {
                summary: event.summary,
                start: event.start,
                end: event.end,
            }
        })
    }
}
