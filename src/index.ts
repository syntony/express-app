import 'reflect-metadata'

import app from './app'

// require('dotenv').config({
//   path: `${__dirname}/../.env.${process.env.NODE_ENV || 'example'}`,
// })

const PORT = process.env.PORT || 3000

// Message after server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log('server started at http://localhost:' + PORT)
  })
}

export default app
