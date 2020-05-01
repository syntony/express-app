import StoreController from '../controllers/StoreController'

class Routes {
  private storeController: StoreController
  constructor() {
    this.storeController = new StoreController()
  }
  public routes(app): void {
    app.route('/').get(this.storeController.getAll)
  }
}

// (req: Request, res: Response) => {
//   res.send({
//     message: 'hello world!',
//   })
// }

export default Routes
