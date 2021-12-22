import { gql } from '@apollo/client';

const PROYECTOS = gql`
  query Proyectos {
    Proyectos {
      _id
      nombre
      estado
      objetivos {
        _id
        descripcion
        tipo
      }
      lider {
        _id
        correo
      }
      inscripciones {
        _id
        estado
        estudiante {
          _id
        }
      }
    }
  }
`;

export { PROYECTOS };