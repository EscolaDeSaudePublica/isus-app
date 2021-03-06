import React, { useContext, useEffect, useState } from 'react';
import FormSelect from '../FormLayoutContexts/FormSelect';
import { pegarListaDeCategoriasProfissionais } from '../../apis/apiKeycloak';
import FormContext from '../../context/FormContext';

const InputCategoria = ({ defaultValue }) => {
  const [data, setData] = useState([]);
  const { setValue } = useContext(FormContext);

  const handleEffect = () => {
    pegarListaDeCategoriasProfissionais()
      .then((result) => {
        setData(
          result.map(m => ({
            label: m.nome,
            value: JSON.stringify({
              id: m.id,
              nome: m.nome
            })
          }))
        );
      });

    setValue('categoriaProfissional', defaultValue || '');
  };

  useEffect(handleEffect, [defaultValue]);

  return (
    <>
      <FormSelect
        data={data}
        name="categoriaProfissional"
        rules={{ required: true }}
        label="Categoria profissional"
      />
    </>
  );
};

export default InputCategoria;
