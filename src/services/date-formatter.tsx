import moment from "moment";

const formatDate = (date: string) => {
  return moment.utc(date).local().format('YYYY-MM-DD HH:mm');
};

export default formatDate;
