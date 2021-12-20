import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import Input from 'components/Input';
import { GET_USUARIOS } from 'graphql/usuarios/queries';
import { Link } from 'react-router-dom';
import DropDown from 'components/Dropdown';
import ButtonLoading from 'components/ButtonLoading';
import useFormData from 'hooks/useFormData';
import { Enum_TipoObjetivo } from 'utils/enums';
import { nanoid } from 'nanoid';
import { ObjContext } from 'context/objContext';
import { useObj } from 'context/objContext';
import { CREAR_AVANCE } from 'graphql/avances/mutations';


const NuevoAvance = () => {
  const { form, formData, updateFormData } = useFormData();

  /*const [listaUsuarios, setListaUsuarios] = useState({});


  const { data, loading, error } = useQuery(GET_USUARIOS, {
    variables: {
      filtro: { rol: 'LIDER', estado: 'AUTORIZADO' },
    },
  });
    useEffect(() => {
    console.log(data);
    if (data) {
      const lu = {};
      data.Usuarios.forEach((elemento) => {
        lu[elemento._id] = elemento.correo;
      });

      setListaUsuarios(lu);
    }
  }, [data]); */

  const [crearAvance, { data: mutationData, loading: mutationLoading, error: mutationError }] =
    useMutation(CREAR_AVANCE);



  useEffect(() => {
    console.log('data mutation', mutationData);
  });

  const submitForm = (e) => {
    e.preventDefault();

    formData.objetivos = Object.values(formData.objetivos);
    formData.presupuesto = parseFloat(formData.presupuesto);

    crearAvance({
      variables: formData,
    });
  };

  //if (loading) return <div>...Loading</div>;

  return (
    <div className='p-10 flex flex-col items-center'>
      <div className='self-start'>
        <Link to='/avances'>
          <i className='fas fa-arrow-left' />
        </Link>
      </div>
      <h1 className='text-2xl font-bold text-gray-900'>Crear Nuevo Avance</h1>
      <form ref={form} onChange={updateFormData} onSubmit={submitForm}>
        <Input name='fecha' label='Fecha' required={true} type='date' />
        <Input name='descripcion' label='Descripción' required={true} type='text' />
        <Input name='creadoPor' label='Avance creado:' required={true} type='text' />
        <Input name='proyecto' label='proyecto' required={true} type='text' />
      
        
      </form>
    </div>
  );
};




export default NuevoAvance;