import { gql } from '@apollo/client';

const EDITAR_AVANCE= gql`
mutation EditarAvance(
  $_id: String!, 
  $fecha: Date!, 
  $descripcion: String!, 
  $observaciones: String!, 
 
  ) {
  editarAvance(
    _id: $_id, 
    fecha: $fecha, 
    descripcion: $descripcion, 
    observaciones: $observaciones
    
    ) {
    
    fecha
    descripcion
    observaciones
  }
  
}
`;

export { EDITAR_AVANCE};