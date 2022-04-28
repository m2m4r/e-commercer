import { useState } from "react";

function useInput(estadoInicial) {
  const [value, setValue] = useState(estadoInicial);

  const onChange = (event) => {
    setValue(event.target.value);
  };
  return { value, onChange };
}

export default useInput