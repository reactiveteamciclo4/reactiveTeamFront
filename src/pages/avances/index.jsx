import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_AVANCES } from 'graphql/avances/queries';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import PrivateRoute from 'components/PrivateRoute';
import PrivateComponent from 'components/PrivateComponent';


const IndexAvances = () => {
  const { data, error, loading } = useQuery(GET_AVANCES);

  useEffect(() => {
    if (error) {
      toast.error('Error consultando avances');
    }
  }, [error]);

  if (loading) return <div>Cargando....</div>;

  return (
    <div className='p-10 flex flex-col'>
    <div className='flex w-full items-center justify-center'>
    </div>
    <h1 className='text-2xl font-bold text-gray-900'>Lista de Avances</h1>
        {/* <PrivateComponent roleList={['ADMINISTRADOR', 'ESTUDIANTE']}> */}
          <div className='my-2 self-end'>
            <button className='bg-indigo-500 text-gray-50 p-2 rounded-lg shadow-lg hover:bg-indigo-400'>
              <Link to='/avances/nuevo'>Crear nuevo avance</Link>
            </button>
          </div>
        {/* </PrivateComponent> */}
        <table className='tabla'>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Descripcion</th>
              <th>Observaciones</th>
              <th>Nombre Proyecto</th>
              <th>Lider</th>
              <th>Avance Creado Por</th>
              <th>Editar Avance</th>
              <th>Agregar Observación</th>

            </tr>
          </thead>
          <tbody>
            {data && data.Avances ? (
              <>
                {data.Avances.map((avance) => {
                  return (
                    <tr key={avance._id}>
                      <td>{avance.fecha}</td>
                      <td>{avance.descripcion}</td>
                      <td>{avance.observaciones}</td>
                      <td>{avance.proyecto.nombre}</td>
                      <td>{avance.proyecto.lider.nombre}</td>
                      <td>{avance.creadoPor.nombre}</td>
                      <td>
                        <Link to={`/avances/editar/${avance._id}`}>
                          <i className='fas fa-pen text-yellow-600 hover:text-yellow-400 cursor-pointer' />
                        </Link>
                      </td>
                      <td>
                        <Link to={`/avances/editar/${avance._id}`}>
                          <i className='fas fa-plus text-yellow-600 hover:text-yellow-400 cursor-pointer' />
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