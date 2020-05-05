import { MoreThan, LessThan, Between } from 'typeorm'

export default class DateService {
  static MoreThan = (date: string | Date) => MoreThan(new Date(date).toISOString())

  static LessThan = (date: string | Date) => LessThan(new Date(date).toISOString())

  static Between = (fromDate: string | Date, toDate: string | Date) =>
    Between(new Date(fromDate).toISOString(), new Date(toDate).toISOString())
}
