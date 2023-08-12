import { ChangeEvent, useState } from 'react';
import styles from '../styles/formPointer.module.css'

interface TimeInputProps {
  value: string;
  onChange: (newValue: string) => void;
}

const TimeInput: React.FC<TimeInputProps> = ({ value, onChange }) => {
  const applyTimeMask = (inputValue: string): string => {
    const cleanedValue = inputValue.replace(/\D/g, '');
    const formattedValue = cleanedValue.replace(/^(\d{0,2})(\d{0,2})/, (match, p1, p2) => {
      // Verificar se o valor de p1 é maior que 23, se sim, ajustar para 23
      if (parseInt(p1, 10) > 23) {
        p1 = '23';
      }

      // Verificar se o valor de p2 é maior que 59, se sim, ajustar para 59
      if (parseInt(p2, 10) > 59) {
        p2 = '59';
      }

      return p2 ? `${p1}:${p2}` : p1;
    });
    return formattedValue;
  };

  const [maskedValue, setMaskedValue] = useState(applyTimeMask(value));

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const maskedValue = applyTimeMask(value);
    setMaskedValue(maskedValue);
    onChange(maskedValue);
  };

  return (    
        <input
          className={`h-8 text-center font-bold text-lg rounded-lg text-slate-950 
          bg-[#f7f7f7]  w-full ring-1 ring-slate-900 ${styles.custom_focus}`}
          type="text"
          value={maskedValue}
          onChange={handleChange}
          maxLength={5}
          placeholder="HH:mm"
        />   
    );
};

export default TimeInput;
