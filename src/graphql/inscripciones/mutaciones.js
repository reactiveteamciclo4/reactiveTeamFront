import { gql } from '@apollo/client';

const CREAR_INSCRIPCION = gql`
  mutation CrearInscripcion($proyecto: String!, $estudiante: String!) {
  crearInscripcion(proyecto: $proyecto, estudiante: $estudiante) {
    _id
  }
}
`;

const APROBAR_INSCRIPCION = gql`
  mutation AprobarInscripcion($aprobarInscripcionId: String!) {
  aprobarInscripcion(id: $aprobarInscripcionId) {
    _id
    estado
    fechaIngreso
  }
  }
`;

const RECHAZAR_INSCRIPCION = gql`
  mutation RechazarInscripcion($rechazarInscripcionId: String!) {
  rechazarInscripcion(id: $rechazarInscripcionId) {
    _id
    estado
  }
}
`;

export { CREAR_INSCRIPCION, APROBAR_INSCRIPCION, RECHAZAR_INSCRIPCION };