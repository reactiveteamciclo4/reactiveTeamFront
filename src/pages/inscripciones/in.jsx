import React, { useEffect } from 'react';
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
  const { data, error, loading, refetch } = useQuery(GET_INSCRIPCIONES);

  useEffect(() => {
    console.log(data);
  }, [data]);
  if (loading) return <div>Loading...</div>;
  return (
    //<PrivateRoute roleList={['ADMINISTRADOR', 'LIDER']}>
      <div className='p-10'>
        <div>Pagina de inscripciones</div>
        <div className='my-4'>
          <AccordionInscripcion
            titulo='Inscripciones aprobadas'
            data={data.Inscripciones.filter((el) => el.estado === 'ACEPTADO')}
          />
          <AccordionInscripcion
            titulo='Inscripciones pendientes'
            data={data.Inscripciones.filter((el) => el.estado === 'PENDIENTE')}
            refetch={refetch}
          />
          <AccordionInscripcion
            titulo='Inscripciones rechazadas'
            data={data.Inscripciones.filter((el) => el.estado === 'RECHAZADO')}
          />
        </div>
      </div>
    //</PrivateRoute>
  );
};
  const AccordionInscripcion = ({ data, titulo, refetch = () => {} }) => {
  return (
    <AccordionStyled>
      <AccordionSummaryStyled>
        {titulo} ({data.length})
      </AccordionSummaryStyled>
      <AccordionDetailsStyled>
        <div className='flex'>
          {data &&
            data.map((inscripcion) => {
              return <Inscripcion inscripcion={inscripcion} refetch={refetch} />;

            })}
        </div>
      </AccordionDetailsStyled>
    </AccordionStyled>
  );
};

const Inscripcion = ({ inscripcion, refetch }) => {
  const [aprobarInscripcion, { data, loading, error }] = useMutation(APROBAR_INSCRIPCION);

  useEffect(() => {
    if (data) {
      toast.success('Inscripcion aprobada con exito');
      refetch();
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      toast.error('Error aprobando la inscripcion');
    }
  }, [error]);
};

const cambiarEstadoInscripcion = () => {
  aprobarInscripcion({
    variables: {
      aprobarInscripcionId: inscripcion._id,
    },
  });

return (
  <div className='bg-gray-900 text-gray-50 flex flex-col p-6 m-2 rounded-lg shadow-xl'>
    <span>{inscripcion.proyecto.nombre}</span>
    <span>{inscripcion.estudiante.nombre}</span>
    <span>{inscripcion.estado}</span>
    {inscripcion.estado === 'PENDIENTE' && (
      <ButtonLoading
        onClick={() => {
          cambiarEstadoInscripcion();
        }}
        text='Aprobar Inscripcion'
        loading={loading}
        disabled={false}
      />
    )}
  </div>
); 
export default IndexInscripciones;



<tbody>
          
{data && data.InscripcionesPendientes ? (
  <>
    {data.InscripcionesPendientes.map((u) => {
      return (
        <tr key={u._id}>
          <td>{u._id.slice(20)}</td>
          <td>{u.proyecto.nombre}</td>
          <td>{u.estudiante.nombre} {u.estudiante.apellido}</td>
          <td>{u.estado}</td>
          <td>{u.fechaIngreso}</td>

          <td>
            <Link to={`/usuarios/editar/${u._id}`}>
              <i className='fas fa-pen text-yellow-600 hover:text-yellow-400 cursor-pointer' />
              {/* <ToastContainer position='bottom-center' autoClose={5000} /> */}
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
</div></div>
);       
};
