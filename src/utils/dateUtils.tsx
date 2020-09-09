import moment, { tz, Moment } from "moment-timezone";

export enum Range {
    All = 0,
    Last7Days = 2,
    Last30Days = 3,
    Last12Months = 4,
}

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

    static calculateBackDate = (value: Range) => {
        let backDate: any = DateUtils.getToday()
            .set({ hour: 0, minute: 0, second: 0, millisecond: 0 });

        if (value === Range.Last7Days) {
            backDate = backDate.subtract(7, "days");
        } else if (value === Range.Last30Days) {
            backDate = backDate.subtract(30, "days");
        } else if (value === Range.Last12Months) {
            backDate = backDate.subtract(12, "months");
        } else if (value === Range.All) {
            backDate = null;
        }

        return backDate;
    };
}