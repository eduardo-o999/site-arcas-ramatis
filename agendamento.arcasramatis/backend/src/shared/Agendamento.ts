import { Entity, Fields, BackendMethod } from "remult"
import { Usuario } from "./Usuario"

@Entity<Agendamento>("agendamentos", {
  allowApiCrud: true,
  dbName: 'agendamentos'
})
export class Agendamento {
    @Fields.integer()
    id!: number

    @Fields.integer()
    paciente_id!: number

    @Fields.integer()
    especialista_id!: number

    @Fields.date()
    data_consulta!: Date

    // talvez adicionar linha de "horario_consulta"

    @Fields.string()
    status!: string

    @Fields.createdAt()
    criado_em!: Date
}