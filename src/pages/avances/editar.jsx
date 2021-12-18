import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_AVANCE } from 'graphql/avances/queries';
import Input from 'components/Input';
import ButtonLoading from 'components/ButtonLoading';
import useFormData from 'hooks/useFormData';
import { toast } from 'react-toastify';
import { EDITAR_AVANCE } from 'graphql/avances/mutations';
import PrivateComponent from 'components/PrivateComponent';




const EditarAvance = () => {

  const { form, formData, updateFormData } = useFormData(null);
  const { _id } = useParams();

  const {
    data: queryData,
    error: queryError,
    loading: queryLoading,
  } = useQuery(GET_AVANCE, {
    variables: { _id },
  });


  const [EditarAvance, { data: mutationData, loading: mutationLoading, error: mutationError }] =
    useMutation(EDITAR_AVANCE);

  const submitForm = (e) => {
    e.preventDefault();
    //delete formData.rol;
    EditarAvance({
      variables: { _id, ...formData },
    });
  };

  useEffect(() => {
    if (mutationData) {
      toast.success('Avance modificado correctamente');
    }
  }, [mutationData]);

  useEffect(() => {
    if (mutationError) {
      toast.error('Error modificando el Avance');
    }

    if (queryError) {
      toast.error('Error consultando el Avance');
    }
  }, [queryError, mutationError]);

  if (queryLoading) return <div>Cargando....</div>;



  return (
    <div className='flew flex-col w-full h-full items-center justify-center p-10'>
      <Link to='/avances'>
        <i className='fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900' />
      </Link>
      <h1 className='m-4 text-3xl text-gray-800 font-bold text-center'>Editar Avance</h1>
      <form
        onSubmit={submitForm}
        onChange={updateFormData}
        ref={form}
        className='flex flex-col items-center justify-center'
      >
       
          <Input
            label='Descripcion:'
            type='text'
            name='descripcion'
            defaultValue={queryData.Avance.descripcion}
            required={true}
          />
       
        <PrivateComponent roleList={['ADMINISTRADOR', 'LIDER']}>
          <Input
            label='Observaciones:'
            type='text'
            name='observaciones'
            defaultValue={queryData.Avance.observaciones}
            required={true}
          />
        </PrivateComponent>


        <ButtonLoading
          disabled={Object.keys(formData).length === 0}
          loading={mutationLoading}
          text='Confirmar'
        />
      </form>
    </div>

  )

};



export default EditarAvance;
