import { gql } from '@apollo/client';

const GET_INSCRIPCIONES = gql`
query Inscripciones {
  Inscripciones {
    _id
    estado
    fechaIngreso
    fechaEgreso
  }
}
`;

export { GET_INSCRIPCIONES };