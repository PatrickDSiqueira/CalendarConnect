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

        const formatDate = (dateToFormat: string) => {

            const hasTime = dateToFormat.includes('T')

            if (hasTime) {

                dateToFormat = dateToFormat.replace('T', ' ').replace('Z', '');
            }

            const date = new Date(dateToFormat);

            const day = String(date.getDate()).padStart(2, '0');

            const month = String(date.getMonth() + 1).padStart(2, '0');

            const year = date.getFullYear();

            const format = `${day}/${month}/${year}`;

            if (!hasTime) {

                return format;
            }

            const hour = String(date.getHours()).padStart(2, '0');

            const minutes = String(date.getMinutes()).padStart(2, '0');

            return `${format} ${hour}:${minutes}`;
        };

        return events.map(event => {

            return {
                summary: event.summary,
                start: formatDate(event.start.date || event.start.dateTime),
                end: formatDate(event.end.date || event.end.dateTime),
                link: event.htmlLink,
                creator: event.creator,
            }
        })
    }
}
