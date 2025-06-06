import { Router } from 'express'

import categoria from './categorias'
import usuario from './usuarios'
import session from './session'
import autenticacao from '../mddlewares/autenticacao'


const routes = Router()

routes.use('/usuarios', usuario)
routes.use('/session', session)
//routes.use(autenticacao)
routes.use('/categorias', autenticacao, categoria)

export default routes
