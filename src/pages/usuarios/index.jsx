import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USUARIOS } from 'graphql/usuarios/queries';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { Enum_Rol, Enum_EstadoUsuario } from 'utils/enums';
import PrivateRoute from 'components/PrivateRoute';

const IndexUsuarios = () => {
  const { data, error, loading } = useQuery(GET_USUARIOS);
  const[busqueda, setBusqueda] = useState('');
  const[filtro, setFiltro] = useState([]);

  useEffect(() =>{
    if(data){
    data.Usuarios.forEach((elemento)=>{
      filtro.push(elemento);
    });
  }
   
}, [data]);

useEffect(()=>{
 
  console.log(busqueda)
  if(data){
    setFiltro(data.Usuarios.filter(elemento=>{
    return JSON.stringify(elemento).toLowerCase().includes(busqueda.toLowerCase());
     }));
  }
 
 },[busqueda, data]);

 useEffect(() => {
  if (error) {
    toast.error('No se pueden consultar los usuarios');
  }
}, [error]);


  if (loading) return <div>Cargando....</div>;

  return (
    <PrivateRoute roleList={['ADMINISTRADOR','LIDER']}>
      <div>
        <h3><strong> INFORMACIÓN DE USUARIOS </strong></h3>
        <div className='flex flex-row justify-end'>
          <input
            onChange ={e=>setBusqueda(e.target.value)}
            value={busqueda}
            placeholder='Buscar'
            className='border-2 border-gray-700 px-3 py-1 rounded-md focus:outline-none focus:border-indigo-200'/>
        </div>
        <table className='tabla'>
          <thead>
            <tr>
              <th>NOMBRE</th>
              <th>APELLIDOS</th>
              <th>CORREO</th>
              <th>IDENTIFICACIÓN</th>
              <th>ROL</th>
              <th>ESTADO</th>
              <th>EDITAR</th>
            </tr>
          </thead>
          <tbody>
            {data && data.Usuarios ? (
              <>
                {filtro.map((u) => {
                  return (
                    <tr key={u._id}>
                      <td>{u.nombre}</td>
                      <td>{u.apellido}</td>
                      <td>{u.correo}</td>
                      <td>{u.identificacion}</td>
                      <td>{Enum_Rol[u.rol]}</td>
                      <td>{Enum_EstadoUsuario[u.estado]}</td>
                      <td>
                        <Link to={`/usuarios/editar/${u._id}`}>
                          <i className='fas fa-pen text-blue-600 hover:text-yellow-400 cursor-pointer' />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </>
            ) : (
              <div>Usuario No autorizado</div>
            )}
          </tbody>
        </table>
      </div>
    </PrivateRoute>
  );
};

export default IndexUsuarios;