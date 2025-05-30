import { Router } from 'express'

import categoria from './categorias'
import usuario from './usuarios'

const routes = Router()

routes.use('/categorias', categoria)

routes.use('/usuarios', usuario)



export default routes
