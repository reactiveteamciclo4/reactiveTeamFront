import React, { useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import PrivateRoute from 'components/PrivateRoute';
import { GET_INSCRIPCIONES } from 'graphql/inscripciones/queries';
import { APROBAR_INSCRIPCION, RECHAZAR_INSCRIPCION } from 'graphql/inscripciones/mutaciones';
import ButtonLoading from 'components/ButtonLoading';
import { toast } from 'react-toastify';
import {
  AccordionStyled,
  AccordionSummaryStyled,
  AccordionDetailsStyled,
} from 'components/Accordion';
import { useParams } from 'react-router-dom';


const IndexInscripciones = () => {

  const { projectid } = useParams();

  const { data, loading, error, refetch } = useQuery(GET_INSCRIPCIONES);
  useEffect(() => {
    if (error) {
      toast.error('Error consultando la inscripcion');
    }
  }, [error]);
  if (loading) return <div>Loading...</div>;
  return (
    <PrivateRoute roleList={['ADMINISTRADOR', 'LIDER']}>
      <div className='p-10'>
      <div className= 'text-2xl font-semibold'>INSCRIPCIONES</div>
        <div className='my-4'>
          <AccordionInscripcion
            titulo='Inscripciones aprobadas'
            data={data.Inscripciones.filter((el) => el.proyecto._id===projectid && el.estado === 'ACEPTADO')}
          />
          <AccordionInscripcion
            titulo='Inscripciones pendientes'
            data={data.Inscripciones.filter((el) => el.proyecto._id===projectid && el.estado === 'PENDIENTE')}
            refetch={refetch}
          />
          <AccordionInscripcion
            titulo='Inscripciones rechazadas'
            data={data.Inscripciones.filter((el) => el.proyecto._id===projectid && el.estado === 'RECHAZADO')}
          />
        </div>
      </div>
      </PrivateRoute>
  );
};

const AccordionInscripcion = ({ data, titulo, refetch = () => {} }) => (
  <AccordionStyled>
    <AccordionSummaryStyled className='uppercase font-bold ' expandIcon={< i className='fas fa-chevron-down'/>} >
      {titulo} ({data.length})
    </AccordionSummaryStyled>
    <AccordionDetailsStyled>
      <div className='flex flex-wrap justify-between'>
        {data &&
          data.map((inscripcion) => (
            <Inscripcion inscripcion={inscripcion} refetch={refetch} />
          ))}
      </div>
    </AccordionDetailsStyled>
  </AccordionStyled>
);

const Inscripcion = ({ inscripcion }) => {

const InA = ({ refetch }) => {
  const [aprobarInscripcion, {data: mutationData, loading: mutationLoading, error: mutationError}] =
    useMutation ( APROBAR_INSCRIPCION );
   
  useEffect(() => {
    if (mutationData) {
      toast.success('Inscripcion aprobada con exito');
      refetch();
    }
  }, [mutationData]);

  useEffect(() => {
    if (mutationError) {
      toast.error('Error aprobando la inscripcion');
    }
  }, [mutationError]);

 const aInscripcion = () => {
    aprobarInscripcion({
      variables: {
        aprobarInscripcionId: inscripcion._id,
      },
    });
  }; 
  return (
      <ButtonLoading
        onClick={() => {
          aInscripcion();
        }}
        text='Aceptar'
        mutationLoading={mutationLoading}
        disabled={false}
      />);
    };

const InR = ({ refetch }) => {
      const [rechazarInscripcion, {data: mutationData, loading: mutationLoading, error: mutationError}] =
      useMutation( RECHAZAR_INSCRIPCION );
      useEffect(() => {
        if (mutationData) {
          toast.success('Inscripcion rechazada');
          refetch();
        }
      }, [mutationData]);
      useEffect(() => {
        if (mutationError) {
          toast.error('Error rechazando la inscripcion');
        }
      }, [mutationError]);
      const rInscripcion = () => {
        rechazarInscripcion({
          variables: {
            rechazarInscripcionId: inscripcion._id,
          },
        });
      };
      return (
        <ButtonLoading  
            onClick={() => {
              rInscripcion();
            }}
            text='Rechazar'
            mutationLoading={mutationLoading}
            disabled={false}
          />
          );
        };

  return (
    <div className='bg-white text-gray-900 flex flex-col p-6 m-2 rounded-lg shadow-xl'>
      <span>Proyecto: {inscripcion.proyecto.nombre}</span>
     <div className='text-lg font-semibold'><span> Estudiante: {inscripcion.estudiante.nombre} {inscripcion.estudiante.apellido}</span> </div> 
      <span>Estado: {inscripcion.estado}</span>
      {inscripcion.estado === 'PENDIENTE'&& (
        <div className='flex justify-between'>
          < InA/> <span> </span>
        < InR/> </div>
      )}      
    </div>
  );
};

export default IndexInscripciones;