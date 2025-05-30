import {Router} from 'express'
import knex from './../database/knex'
import { z } from 'zod'
import {hash} from 'bcrypt'

const router = Router()

router.get("/",(req, res) => {
    knex("usuarios").then((users) => {
        res.json({ usuarios: users })
 })
})

router.post("/", async (req,res) => {

    const registerBodySchema = z.object({
        nome: z.string(),
        email: z.string().email(),
        senha: z.string().min(6)
})

   const objSalvar = registerBodySchema.parse(
    req.body
   )

   objSalvar.senha = await hash(objSalvar.senha,8)
    knex('usuarios').insert(objSalvar)
    const id_usuario = await knex('usuarios').insert(objSalvar)

    const usuarios = await knex ('usuarios')
    .where ({
        id: id_usuario[0]
    })
        res.json({
            meessage: 'Usuario cadastrado com sucesso',
            usuario: usuarios
        })
        return
})

router.put("/:id", async (req, res) => {
  const updateBodySchema = z.object({
    nome: z.string().optional(),
    email: z.string().email().optional(),
    senha: z.string().min(6).optional(),
  });

  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    const dadosAtualizados = updateBodySchema.parse(req.body);

    if (dadosAtualizados.senha) {
      dadosAtualizados.senha = await hash(dadosAtualizados.senha, 8);
    }

    const usuarioExistente = await knex("usuarios").where({ id }).first();

    if (!usuarioExistente) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    await knex("usuarios").where({ id }).update(dadosAtualizados);

    const usuarioAtualizado = await knex("usuarios").where({ id }).first();

    return res.status(200).json({
      message: "Usuário atualizado com sucesso",
      usuario: usuarioAtualizado,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
})

router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    const usuarioExistente = await knex("usuarios").where({ id }).first();

    if (!usuarioExistente) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    await knex("usuarios").where({ id }).del();

    return res.status(200).json({ message: "Usuário deletado com sucesso" });
  } catch {
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
});

export default router