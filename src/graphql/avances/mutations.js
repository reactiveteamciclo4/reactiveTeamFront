import { gql } from '@apollo/client';

const EDITAR_AVANCE= gql`
mutation EditarAvance(
  $_id: String!,  
  $descripcion: String!, 
 
  ) {
  editarAvance(
    _id: $_id, 
    descripcion: $descripcion, 
    
    ) {
    descripcion
  }
  
}
`;

const AGREGAR_OBSERVACIONES= gql`
mutation CrearObservacionesAvance(
  $_id: String!, 
  $observaciones: [String]!
  ) {
  crearObservacionesAvance(
  _id: $_id, 
    observaciones: $observaciones
    ) {
    observaciones
  }
}

`;

const CREAR_AVANCE= gql`
mutation CrearAvance(
  $fecha: Date!, 
  $descripcion: String!, 
  $proyecto: String!, 
  $creadoPor: String!) {
  crearAvance(
    fecha: $fecha, 
    descripcion: $descripcion, 
    proyecto: $proyecto, 
    creadoPor: $creadoPor) 
    {
      fecha
      descripcion
      proyecto
      creadoPor
    
  }
}

`;

export { EDITAR_AVANCE, AGREGAR_OBSERVACIONES, CREAR_AVANCE};