import { gql } from '@apollo/client';

const GET_INSCRIPCIONES = gql`

query InscripcionesPendientes {
  InscripcionesPendientes {
    _id
    estado
    fechaIngreso
    proyecto {
      _id
      nombre
      lider {
        _id
      }
    }
    estudiante {
      _id
      nombre
      apellido
      correo
    }
  }
}
`;
const GET_INSCRIPCIONESR = gql`
query InscripcionesEst($estado: RECHAZADO) {
    _id
    fechaIngreso
    fechaEgreso
    proyecto {
      _id
      nombre
    }
    estudiante {
      _id
      nombre
      apellido
      correo
    }
  }

# query Inscripciones {
#   Inscripciones {
#     _id
#     estado
#     fechaIngreso
#     fechaEgreso
#     estudiante {
#       _id
#       nombre
#       apellido
#       correo
#       identificacion
#     }
#   }
# }
`;

export { GET_INSCRIPCIONES, GET_INSCRIPCIONESR };