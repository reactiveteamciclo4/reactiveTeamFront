import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import PrivateRoute from 'components/PrivateRoute';
import { GET_INSCRIPCIONES } from 'graphql/inscripciones/queries';
import { APROBAR_INSCRIPCION, RECHAZAR_INSCRIPCION } from 'graphql/inscripciones/mutaciones';
import ButtonLoading from 'components/ButtonLoading';
import {
  AccordionStyled,
  AccordionSummaryStyled,
  AccordionDetailsStyled,
} from 'components/Accordion';

const IndexInscripciones = () => {
  const { data, error, loading } = useQuery(GET_INSCRIPCIONES);

  useEffect(() => {
    if (error) {
      toast.error('Error consultando avances');
    }
  }, [error]);

  if (loading) return <div>Cargando....</div>;

  return (
      <div>
        Datos Usuarios:
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
            {data && data.Inscripciones ? (
              <>
                {data.Inscripciones.map((u) => {
                  return (
                    <tr key={u._id}>
                      <td>{u.fechaIngreso}</td>
                      <td>{u.fechaEgreso}</td>

                      <td>
                        <Link to={`/usuarios/editar/${u._id}`}>
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

export default IndexInscripciones;