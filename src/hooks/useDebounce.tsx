import { useEffect, useState } from "react"

export const useDebounce = (input: string = '', time: number = 700) => {
  const [debouncedValue, setDebouncedValue] = useState(input);
  
  useEffect(() => {

    const timeOut = setTimeout(() => {
      setDebouncedValue(input);
    }, time);

    return () => {
      clearTimeout(timeOut);
    }

  },[input]);

  return debouncedValue;
}

// Ejemplo de como usarlo 

// const [text, setText] = useState('');

// const debouncedValue = useDebounce(text, 1000);

// useEffect(() => {
//   aqui va la funcion que se va a ejecutar cuando obtenga el valor de text, que se va a obtener solamente después de un seg 
//   después de dejado de escribir
// }, [debouncedValue])
