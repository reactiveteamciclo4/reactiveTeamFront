import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { toast } from 'react-toastify';
import PrivateRoute from 'components/PrivateRoute';
import { GET_INSCRIPCIONES } from 'graphql/inscripciones/queries';
import { APROBAR_INSCRIPCION, RECHAZAR_INSCRIPCION } from 'graphql/inscripciones/mutaciones';
import ButtonLoading from 'components/ButtonLoading';

const IndexInscripciones = () => {
  const { data, loading, error, refetch} = useQuery(GET_INSCRIPCIONES);

  useEffect(() => {
    if (data) {
      toast.success('Inscripcion consultada con exito');
      refetch();
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      toast.error('Error consultando la inscripcion');
    }
  }, [error]);
  if (loading) return <div>Cargando....</div>;

  return (
      <div>
        INSCRIPCIONES PENDIENTES:
        <table className='tabla'>
          <thead>
            <tr>
              <th>Id</th>
              <th>Proyecto</th>
              <th>Estudiante</th>
              <th>Estado</th>
              {/* <th>Fecha Ingreso</th> */}
              <th>Actualizar Estado</th>
            </tr>
          </thead>
          <tbody>
            {data && 
            data.InscripcionesPendientes ? (
              <>
                {data.InscripcionesPendientes.map((u) => {
                  return (
                    <tr key={u._id}>
                      <td>{u._id.slice(20)}</td>
                      <td>{u.proyecto.nombre}</td>
                      <td>{u.estudiante.nombre} {u.estudiante.apellido}</td>
                      <td>{u.estado}</td>
                      {/* <td>{u.fechaIngreso}</td> */}

                      <td>
                      <button> <Aprobar /> </button>
                      <span> </span> <span> </span>
                      <button> <Rechazar /> </button>
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


const Aprobar = () => {
  const [aprobarInscripcion, { data, loading, error, refetch }] = useMutation(APROBAR_INSCRIPCION);

  useEffect(() => {
    if (data) {
      toast.success('Inscripcion aprobada con exito');
      refetch();}
  }, [data]);

  useEffect(() => {
    if (error) {
      toast.error('Error aprobando la inscripcion');
    }
  }, [error]);

  const aprobarI = ()=> {
    aprobarInscripcion({
      variables: {
        AprobarInscripcionId: Aprobar._id,
      },
    });
  };

  return (
    <ButtonLoading onClick={() => {
      aprobarI();
      }}
      text='Aceptar'
      loading={loading}
      disabled={false}
    />
  )}

const Rechazar = ({ inscripcion, refetch }) => {
  const [rechazarInscripcion, { data, loading, error }] = useMutation(RECHAZAR_INSCRIPCION);
  
    useEffect(() => {
      if (data) {
        toast.success('Inscripcion rechazada');
        refetch();}
    }, [data]);
  
    useEffect(() => {
      if (error) {
        toast.error('Error rechazando la inscripcion');
      }
    }, [error]);
  
    const rechazarI = ()=> {
    data.InscripcionesPendientes.map((u) => {
              <Rechazar inscripcion={u} refetch={refetch} />
      rechazarInscripcion({
        variables: {
          RechazarInscripcionId: u._id,
        },
      })
    })
  }
  
    return (
      <ButtonLoading onClick={() => {
        rechazarI();
        }}
        text='Rechazar'
        loading={loading}
        disabled={false}
      />
    )
}

export default IndexInscripciones;