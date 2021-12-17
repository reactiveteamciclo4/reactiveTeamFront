import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_AVANCES} from 'graphql/avances/queries';


const EditarAvance = () => {

  const { data, error, loading } = useQuery(GET_AVANCES);

  const{_id} = useParams();
  return (
    <div>
      hola soy editar {_id}
    </div>
  )
}

export default EditarAvance;
