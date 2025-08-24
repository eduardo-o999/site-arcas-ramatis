import { Entity, Fields, BackendMethod } from "remult"
import { User } from "./Users"

@Entity<Appointment>("agendamentos", {
  allowApiCrud: true,
  dbName: 'agendamentos'
})
export class Appointment {
    @Fields.integer()
    id!: number

    @Fields.integer()
    paciente_id!: number

    @Fields.integer()
    especialista_id!: number

    @Fields.date()
    data_consulta!: Date

    @Fields.string()
    status!: string

    @Fields.createdAt()
    criado_em!: Date
}