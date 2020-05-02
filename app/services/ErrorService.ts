export default class ErrorService {
  /*
  Catch Errors Handler

  With async/await, you need some way to catch errors
  Instead of using try{} catch(e) {} in each controller, we wrap the function in
  catchErrors(), catch any errors they throw, and pass it along to our express middleware with next()
*/

  static catchErrors = (fn) => (req, res, next) => fn(req, res, next).catch(next)

  /*
    Not Found Error Handler

    If we hit a route that is not found, we mark it as 404 and pass it along to the next error handler to display
  */
  static notFound = (req, res) => res.status(404).send({ message: 'Not Found' })
}
