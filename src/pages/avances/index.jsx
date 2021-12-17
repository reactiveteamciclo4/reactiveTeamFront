import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_AVANCES } from 'graphql/avances/queries';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import PrivateRoute from 'components/PrivateRoute';


const IndexAvances = () => {
  const { data, error, loading } = useQuery(GET_AVANCES);

  useEffect(() => {
    if (error) {
      toast.error('Error consultando avances');
    }
  }, [error]);

  if (loading) return <div>Cargando....</div>;

  return (
      <div>
        Datos Avances:
        <table className='tabla'>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Descripcion</th>
              <th>Observaciones</th>
              <th>Nombre Proyecto</th>
              <th>Lider</th>
              <th>Creado Por</th>
            </tr>
          </thead>
          <tbody>
            {data && data.Avances ? (
              <>
                {data.Avances.map((u) => {
                  return (
                    <tr key={u._id}>
                      <td>{u.fecha}</td>
                      <td>{u.descripcion}</td>
                      <td>{u.observaciones}</td>
                      <td>Pendiente</td>
                      <td>Pendiente</td>
                      <td>Pendiente</td>
                      <td>
                        <Link to={`/avances/editar/${u._id}`}>
                          <i className='fas fa-pen text-yellow-600 hover:text-yellow-400 cursor-pointer' />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </>
            ) : (
              <div>No autorizado</div>
            )}
          </tbody>
        </table>
      </div>
  
  );
};

export default IndexAvances;