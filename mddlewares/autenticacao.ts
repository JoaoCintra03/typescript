import{
    Request,
    Response, 
    NextFunction
} from 'express'
import {
    verify
} from 'jsonwebtoken'

function autenticacao(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const authHeader = req.headers.authorization

    if(!authHeader) {
        res.status(401).json({message: 'Token inválido'})
        return;
    }

    const [, token] = authHeader.split(" ");

    try {
        const dadosToken = verify(token, 'NAOPASSARNGM_lhfvqwkufvyk')

        console.log('dadosToken', dadosToken)

        next()
    }catch (error) {
        res.status(401).json({message: "Token invalido"})
    }
}

export default autenticacao