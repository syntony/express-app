export default class OfferService {
  static getConcurrentOffers = ({ offers, fromDate, toDate }) => {
    return offers.filter(
      (o) =>
        // still reserved, while we want to reserve
        (new Date(o.reservedFrom) < new Date(String(fromDate)) &&
          new Date(o.reservedUntil) > new Date(String(fromDate))) ||
        // already reserved before we want left
        (new Date(o.reservedFrom) < new Date(String(toDate)) && new Date(o.reservedUntil) > new Date(String(toDate))) ||
        // reserved between our fromDate and toDate
        (new Date(o.reservedFrom) >= new Date(String(fromDate)) &&
          new Date(o.reservedUntil) <= new Date(String(toDate)))
    )
  }
}
