import moment, { tz, Moment } from "moment-timezone";

export default class DateUtils {
    static toMomentDate = (date: Date) => {
        return moment(date);
    };

    static getToday = () => {
        return moment();
    };

    static getTodayString = () => {
        return moment().format('YYYY-MM-DD');
    };

    static toUTC = (date: string) => {
        return moment.utc(date);
    };

    static toUTCString = (date: Moment) => {
        return moment.utc(date).format('YYYY-MM-DD HH:mm:ss');
    };

    static dateToString = (date: Moment) => {
        return date.format('YYYY-MM-DD');
    };

    static getTimezone = () => {
        return tz.guess();
    };
}