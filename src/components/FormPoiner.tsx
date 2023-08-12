import React, { useEffect, useState } from "react";
import { formatedDate, formatTimestampToHoursAndMinutes, SetDateHoursSet, CalcSaldo, CalcSaldoPoint,
         calculateHourDifPoint, SetTimestempToDateHours, calculateHourDifference, TotDay } from "@/utils/dates";
import styles from "../styles/formPointer.module.css";
import Image from "next/image";
import updatePoint from "@/controllers/pointController";

interface FormPointerProps {
  point: {
    _id: string; 
		user_id: string;
		edited: boolean;
		hours_tot_prev_day: number;
		is_active_init: boolean;
		is_active: boolean;
		date: Date;
		createdAt: Date;
		updatedAt: Date;
		hours_1: number;
		hours_2: number;
		hours_tot_1: number;
		hours_3: number;
		hours_4: number;
		hours_tot_2: number;
		hours_tot_day: number;
		hours_f_s: number;
		__v: number;
  };
}

const FormPointer = (props: FormPointerProps) => {
  const { point } = props;  
  
////////////////////////////////// Mask

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

  ///////////////////////////// States  

  const [updating, setUpdating] = useState(false);
  const [isFieldEnabled, setIsFieldEnabled] = useState(false);
  const [inicioValue, setInicioValue] = useState(point.hours_1 === -13 ? "": SetTimestempToDateHours(point.hours_1));
  const [saidaIntervaloValue, setSaidaIntervaloValue] = useState(point.hours_2 === -13 ? "": SetTimestempToDateHours(point.hours_2));
  const [retornoIntervaloValue, setRetornoIntervaloValue] = useState(point.hours_3 === -13 ? "": SetTimestempToDateHours(point.hours_3));
  const [saidaValue, setSaidaValue] = useState(point.hours_4 === -13 ? "": SetTimestempToDateHours(point.hours_4));   

  const [saldoValue, setSaldoValue] = useState(CalcSaldo(point.hours_tot_1, point.hours_tot_2, point.hours_tot_prev_day));
  const [totalHorasUmValue, setTotalHorasUmValue] = useState(calculateHourDifference(point.hours_1, point.hours_2));
  const [totalHorasDoisValue, setTotalHorasDoisValue] = useState(calculateHourDifference(point.hours_3, point.hours_4));  

  const handleInicioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInicioValue(applyTimeMask(event.target.value));
  };
  const handleInicioBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setTotalHorasUmValue(calculateHourDifference(SetDateHoursSet(event.target.value), SetDateHoursSet(saidaIntervaloValue)));    
    point.hours_1 = SetDateHoursSet(inicioValue)
    point.hours_2 = SetDateHoursSet(saidaIntervaloValue)
    point.hours_tot_1 = calculateHourDifPoint(SetDateHoursSet(event.target.value),
                        SetDateHoursSet(saidaIntervaloValue))
    setSaldoValue(CalcSaldo(point.hours_tot_1, point.hours_tot_2, point.hours_tot_prev_day))
    point.hours_f_s = CalcSaldoPoint(point.hours_tot_1, point.hours_tot_2, point.hours_tot_prev_day)
    point.hours_tot_day = TotDay(point.hours_tot_1, point.hours_tot_2)    
  };

  const handleSaidaIntervaloChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSaidaIntervaloValue(applyTimeMask(event.target.value));
  };
  const handleSaidaIntervaloBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setTotalHorasUmValue(calculateHourDifference(SetDateHoursSet(inicioValue), SetDateHoursSet(event.target.value)));
    point.hours_1 = SetDateHoursSet(inicioValue)
    point.hours_2 = SetDateHoursSet(saidaIntervaloValue)
    point.hours_tot_1 = calculateHourDifPoint(SetDateHoursSet(inicioValue),
                        SetDateHoursSet(event.target.value))
    setSaldoValue(CalcSaldo(point.hours_tot_1, point.hours_tot_2, point.hours_tot_prev_day))
    point.hours_f_s = CalcSaldoPoint(point.hours_tot_1, point.hours_tot_2, point.hours_tot_prev_day)
    point.hours_tot_day = TotDay(point.hours_tot_1, point.hours_tot_2)
    //console.log(point)
  };

  const handleRetornoIntervaloChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRetornoIntervaloValue(applyTimeMask(event.target.value));
  };
  const handleRetornoIntervaloBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setTotalHorasDoisValue(calculateHourDifference(SetDateHoursSet(event.target.value), SetDateHoursSet(saidaValue)));
    point.hours_3 = SetDateHoursSet(retornoIntervaloValue)
    point.hours_4 = SetDateHoursSet(saidaValue)
    point.hours_tot_2 = calculateHourDifPoint(SetDateHoursSet(event.target.value),
                        SetDateHoursSet(saidaValue))
    setSaldoValue(CalcSaldo(point.hours_tot_1, point.hours_tot_2, point.hours_tot_prev_day))
    point.hours_f_s = CalcSaldoPoint(point.hours_tot_1, point.hours_tot_2, point.hours_tot_prev_day)
    point.hours_tot_day = TotDay(point.hours_tot_1, point.hours_tot_2)
    //console.log(point)
  };

  const handleSaidaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSaidaValue(applyTimeMask(event.target.value));
  };
  const handleSaidaBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setTotalHorasDoisValue(calculateHourDifference(SetDateHoursSet(retornoIntervaloValue), SetDateHoursSet(event.target.value)));
    point.hours_3 = SetDateHoursSet(retornoIntervaloValue)
    point.hours_4 = SetDateHoursSet(saidaValue)
    point.hours_tot_2 = calculateHourDifPoint(SetDateHoursSet(retornoIntervaloValue),
                        SetDateHoursSet(event.target.value))
    setSaldoValue(CalcSaldo(point.hours_tot_1, point.hours_tot_2, point.hours_tot_prev_day))
    point.hours_f_s = CalcSaldoPoint(point.hours_tot_1, point.hours_tot_2, point.hours_tot_prev_day)
    point.hours_tot_day = TotDay(point.hours_tot_1, point.hours_tot_2)
    //console.log(point)
  };

  useEffect(() => {
    if(updating){
      setTotalHorasUmValue(calculateHourDifference(SetDateHoursSet(inicioValue), SetDateHoursSet(saidaIntervaloValue)));    
      point.hours_1 = SetDateHoursSet(inicioValue)
      point.hours_2 = SetDateHoursSet(saidaIntervaloValue)
      point.hours_tot_1 = calculateHourDifPoint(SetDateHoursSet(inicioValue),
                          SetDateHoursSet(saidaIntervaloValue))
      setSaldoValue(CalcSaldo(point.hours_tot_1, point.hours_tot_2, point.hours_tot_prev_day))
      point.hours_f_s = CalcSaldoPoint(point.hours_tot_1, point.hours_tot_2, point.hours_tot_prev_day)
      point.hours_tot_day = TotDay(point.hours_tot_1, point.hours_tot_2)
      setUpdating(false)
    }     
  },[inicioValue])
 
  useEffect(() => {
    if(updating){
      setTotalHorasUmValue(calculateHourDifference(SetDateHoursSet(inicioValue), SetDateHoursSet(saidaIntervaloValue)));
      point.hours_1 = SetDateHoursSet(inicioValue)
      point.hours_2 = SetDateHoursSet(saidaIntervaloValue)
      point.hours_tot_1 = calculateHourDifPoint(SetDateHoursSet(inicioValue),
                          SetDateHoursSet(saidaIntervaloValue))
      setSaldoValue(CalcSaldo(point.hours_tot_1, point.hours_tot_2, point.hours_tot_prev_day))
      point.hours_f_s = CalcSaldoPoint(point.hours_tot_1, point.hours_tot_2, point.hours_tot_prev_day)
      point.hours_tot_day = TotDay(point.hours_tot_1, point.hours_tot_2)
      setUpdating(false)
    }     
    //console.log(point)
  },[saidaIntervaloValue])

  useEffect(() => {
    if(updating){
      setTotalHorasDoisValue(calculateHourDifference(SetDateHoursSet(retornoIntervaloValue), SetDateHoursSet(saidaValue)));
      point.hours_3 = SetDateHoursSet(retornoIntervaloValue)
      point.hours_4 = SetDateHoursSet(saidaValue)
      point.hours_tot_2 = calculateHourDifPoint(SetDateHoursSet(retornoIntervaloValue),
                          SetDateHoursSet(saidaValue))
      setSaldoValue(CalcSaldo(point.hours_tot_1, point.hours_tot_2, point.hours_tot_prev_day))
      point.hours_f_s = CalcSaldoPoint(point.hours_tot_1, point.hours_tot_2, point.hours_tot_prev_day)
      point.hours_tot_day = TotDay(point.hours_tot_1, point.hours_tot_2)
      setUpdating(false)
    }     
    //console.log(point)
  },[retornoIntervaloValue])

  useEffect(() => {
    if(updating){
      setTotalHorasDoisValue(calculateHourDifference(SetDateHoursSet(retornoIntervaloValue), SetDateHoursSet(saidaValue)));
      point.hours_3 = SetDateHoursSet(retornoIntervaloValue)
      point.hours_4 = SetDateHoursSet(saidaValue)
      point.hours_tot_2 = calculateHourDifPoint(SetDateHoursSet(retornoIntervaloValue),
                          SetDateHoursSet(saidaValue))
      setSaldoValue(CalcSaldo(point.hours_tot_1, point.hours_tot_2, point.hours_tot_prev_day))
      point.hours_f_s = CalcSaldoPoint(point.hours_tot_1, point.hours_tot_2, point.hours_tot_prev_day)
      point.hours_tot_day = TotDay(point.hours_tot_1, point.hours_tot_2)
      setUpdating(false)
    }     
    //console.log(point)
  },[saidaValue])

  const PointB = () => {
    const points = [inicioValue, saidaIntervaloValue, retornoIntervaloValue, saidaValue];
    const currentTimeStamp = Math.floor(Date.now() / 1000); // Obtém o timestamp atual em segundos
    let index = points.findIndex(e => e === ""); 
    if(index === 0){  
      setUpdating(true);     
      setInicioValue(SetTimestempToDateHours(currentTimeStamp));          
    }
    if(index === 1) {
      setUpdating(true);
      setSaidaIntervaloValue(SetTimestempToDateHours(currentTimeStamp))
    }
    if(index === 2) {
      setUpdating(true);
      setRetornoIntervaloValue(SetTimestempToDateHours(currentTimeStamp))
    }
    if(index === 3) {
      setUpdating(true);
      setSaidaValue(SetTimestempToDateHours(currentTimeStamp))
    }        
  };

  const edit = () : void => {
    setIsFieldEnabled(isFieldEnabled ? false: true);
    point.edited = true;
  }

  useEffect(() => {
    if (updating) {      
      console.log(point);
      updatePoint(point._id, {
        "user_id": point.user_id,
        "edited": point.edited,
        "hours_tot_prev_day": point.hours_tot_prev_day,
        "is_active_init": point.is_active_init,
        "is_active": point.is_active,
        "_id": point._id,
        "date": point.date,
        "createdAt": point.createdAt,
        "updatedAt": point.updatedAt,
        "hours_1": point.hours_1,
        "hours_2": point.hours_2,
        "hours_tot_1": point.hours_tot_1,
        "hours_3": point.hours_3,
        "hours_4": point.hours_4,
        "hours_tot_2": point.hours_tot_2,
        "hours_tot_day": point.hours_tot_day,
        "hours_f_s": point.hours_f_s,
        "__v": point.__v
        })
        .then(updatedPoint => {
          console.log(updatedPoint);
          setUpdating(false);
        })
        .catch(error => {
          console.error('Error updating point:', error);
          setUpdating(false);
        });
    }
  }, [updating]);
  
  return (
    <div
      className={`p-2 lg:px-8 lg:py-2 rounded-lg grid h-auto md:px-8 shadow-2xl
          grid-cols-2 gap-2 bg-[#d9d8e0]  w-full lg:w-3/6 md:w-4/6`}
    >
      <div className={`grid col-span-2 grid-row-start-1`}>
        <h2 className={`text-start text-slate-900`}>
          Data:
          <span className={`text-slate-950 font-bold pl-[6px]`}>{formatedDate(point.date)}
          </span>
        </h2>
      </div>
      <div className={`grid col-span-2`}>
        <form className={`grid grid-cols-4 lg:gap-16 w-full gap-4`} action="">
          <div className={`grid col-span-2 gap-2`}>
            <div className={`col-span-1 lg:col-start-1 gap-1`}>
              <label
                className={`text-center text-[12px] md:text-sm lg:text-sm text-slate-900 
                      lg:grid-row-start-1 lg:grid-row-end-1`}
                htmlFor=""
              >
                Início
              </label>
              <div className={`lg:grid-row-start-2 lg:grid-row-end-2`}>
                <input
                  className={`h-8 text-center font-bold text-lg rounded-lg text-slate-950 
                            bg-[#f7f7f7]  w-full ring-1 ring-slate-900 ${styles.custom_focus}
                            ${isFieldEnabled ? '' : 'pointer-events-none'}`}
                  type="text"
                  value={inicioValue}
                  onChange={handleInicioChange}
                  onBlur={handleInicioBlur}
                  maxLength={5}
                  placeholder="HH:mm"
                />
              </div>
            </div>
            <div className={`cols-span-2 lg:col-start-1  gap-1`}>
              <label
                className={` text-slate-900 text-center text-[12px] md:text-sm lg:text-sm 
                      lg:grid-row-start-1 lg:grid-row-end-1`}
                htmlFor=""
              >
                Saída intervalo
              </label>
              <div className={`lg:grid-row-start-2 lg:grid-row-end-2 w-full`}>
                <input
                  className={`h-8 text-center font-bold text-lg rounded-lg text-slate-950 
                            bg-[#f7f7f7]  w-full ring-1 ring-slate-900 ${styles.custom_focus}
                            ${isFieldEnabled ? '' : 'pointer-events-none'}`}
                  type="text"
                  value={saidaIntervaloValue}
                  onChange={handleSaidaIntervaloChange}
                  onBlur={handleSaidaIntervaloBlur}
                  maxLength={5}
                  placeholder="HH:mm"
                />
              </div>
            </div>
          </div>
          <div className={`grid col-span-2 gap-2`}>
            <div className={`col-span-1 lg:col-start-1 gap-1`}>
              <label
                className={` text-slate-900 text-center text-[12px] md:text-sm lg:text-sm 
                      lg:grid-row-start-1 lg:grid-row-end-1`}
                htmlFor=""
              >
                Retorno intervalo
              </label>
              <div className={`lg:grid-row-start-2 lg:grid-row-end-2`}>
                <input
                  className={`h-8 text-center font-bold text-lg rounded-lg text-slate-950 
                            bg-[#f7f7f7]  w-full ring-1 ring-slate-900 ${styles.custom_focus}
                            ${isFieldEnabled ? '' : 'pointer-events-none'}`}
                  type="text"
                  value={retornoIntervaloValue}
                  onChange={handleRetornoIntervaloChange}
                  onBlur={handleRetornoIntervaloBlur}
                  maxLength={5}
                  placeholder="HH:mm"
                />
              </div>
            </div>
            <div className={`cols-span-2 lg:col-start-1  gap-1`}>
              <label
                className={` text-slate-900 text-center text-[12px] md:text-sm lg:text-sm 
                      lg:grid-row-start-1 lg:grid-row-end-1`}
                htmlFor=""
              >
                Saída
              </label>
              <div className={`lg:grid-row-start-2 lg:grid-row-end-2 w-full`}>
                <input
                  className={`h-8 text-center font-bold text-lg rounded-lg text-slate-950 
                            bg-[#f7f7f7]  w-full ring-1 ring-slate-900 ${styles.custom_focus}
                            ${isFieldEnabled ? '' : 'pointer-events-none'}`}
                  type="text"
                  value={saidaValue}
                  onChange={handleSaidaChange}
                  onBlur={handleSaidaBlur}
                  maxLength={5}
                  placeholder="HH:mm"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className={`grid grid-cols-2 col-span-2`}>
        <div
          className={`grid-cols-1 text-center text-[12px] md:text-sm lg:text-sm
         text-slate-900`}
        >
          Total horas:
          <span className={`text-green-600 font-bold pl-[6px]`}>{totalHorasUmValue}</span>
        </div>
        <div
          className={`grid-cols-2 text-center text-[12px] md:text-sm lg:text-sm text-slate-900`}
        >
          Total horas:
          <span className={`text-green-600 font-bold pl-[6px]`}>{totalHorasDoisValue}</span>
        </div>
      </div>
      <div className={`flex flex-col items-start gap-1`}>
        <h2
          className={`text-center text-[12px] md:text-sm lg:text-sm text-slate-900`}
        >
          Previsto:
          <span className={`text-blue-600 font-bold pl-[6px] ${""}`}>
            {formatTimestampToHoursAndMinutes(point.hours_tot_prev_day)}</span>
        </h2>
        <h2
          className={`text-center text-[12px] md:text-sm lg:text-sm text-slate-900`}
        >
          Saldo:
          <span className={`font-bold ${point.hours_f_s > 0 || point.hours_f_s === -13 ? 
          'text-red-500' : point.hours_f_s === 0 ?
          'text-slate-800' : 'text-green-600'} pl-[6px]`}>{saldoValue}</span>
        </h2>
      </div>
      <div className={`flex justify-end gap-4`}>
        <button className={` p-1 rounded-full `}>
          <span
            className={`text-[12px] text-blue-700 hover:text-blue-900 font-bold`}
          >
            Enviar
          </span>
        </button>
        <button className={` p-1 rounded-full`} onClick={edit}>
          <span
            className={`text-[12px] text-orange-700 hover:text-orange-900 font-bold`}
          >
            <Image
              className={``}
              src={'/images/clock-ajust.png'}
              alt={`Clock_in`}
              height={23}
              width={23}
              priority={true}
            />
          </span>
        </button>
        <button onClick={PointB} className={` p-1 rounded-full bg-transparent `}>
          <span
            className={`text-[12px] text-green-700 hover:text-green-900 font-bold`}
          >
            <Image
              className={``}
              src={'/images/clock_in2.png'}
              alt={`Clock_in`}
              height={23}
              width={23}
              priority={true}
            />
          </span>
        </button>
      </div>
    </div>
  );
};

export default FormPointer;
