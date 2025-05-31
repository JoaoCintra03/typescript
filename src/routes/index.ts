import { Router } from 'express'

import categoria from './categorias'
import usuario from './usuarios'
import session from './session'


const routes = Router()

routes.use('/categorias', categoria)
routes.use('/usuarios', usuario)
routes.use('/session', session)

export default routes
