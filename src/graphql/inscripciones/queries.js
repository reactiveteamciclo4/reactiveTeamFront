import { gql } from '@apollo/client';

const GET_INSCRIPCIONES = gql`
 query Inscripciones {
   Inscripciones {
    _id
    estado
    fechaIngreso
    fechaEgreso
    estudiante {
      _id
      nombre
      apellido
      correo
      identificacion
      }
    proyecto {
      _id
      nombre
      }
   }
}
`;
const GET_INSCRIPCIONESPROY = gql`
  query FiltrarInscrip($idProyecto: String!) {
  filtrarInscrip(idProyecto: $idProyecto) {
    _id
    estado
    fechaIngreso
    fechaEgreso
    estudiante {
      _id
      nombre
      apellido
      identificacion
      correo
    }
  }
}
`;

export { GET_INSCRIPCIONES, GET_INSCRIPCIONESPROY};