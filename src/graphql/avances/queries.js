import { gql } from '@apollo/client';

const GET_AVANCES = gql`
query Avances {
  Avances {
    _id
    fecha
    descripcion
    observaciones
    proyecto {
      _id
      nombre
      lider {
        _id
        nombre
      }
    }
    creadoPor {
      _id
      nombre
      apellido
      correo
    }
    
  }
}
`;


export { GET_AVANCES };