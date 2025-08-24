// definição, por typescript, de email e password do usuário aqui uma única vez. Remult fará o resto e evitará repetições.
import { Entity, Fields, BackendMethod } from 'remult'

@Entity<User>("usuarios", {
    allowApiCrud: true,
    dbName: 'usuarios'
})
export class User {
    @Fields.integer()
    id!: number

    @Fields.string()
    nome_completo!: string

    @Fields.string()
    email!: string

    @Fields.string()
    senha!: string

    @Fields.dateOnly()
    data_nascimento!: Date

    @Fields.string()
    cpf!: string

    @Fields.string()
    telefone_contato!: string

    @Fields.string()
    funcao!: string

    @Fields.createdAt()
    criado_em!: Date
}