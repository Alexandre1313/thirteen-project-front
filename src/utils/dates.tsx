import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// Função abaixo do relógio - Data do dia corrente
const DateOffDay = (): string => {
    const currentDate = new Date();
    const formattedDate = format(currentDate, "EEEE, dd/MM/yyyy", { locale: ptBR });
    return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
}

// Função que formata a data no ponto - Imutável
const formatedDate = (dataString: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  };  
  const data = new Date(dataString);
  const dataFormatada = data.toLocaleDateString('pt-BR', options);  
  const diaSemana = new Intl.DateTimeFormat('pt-BR', { weekday: 'long' }).format(data);
  const diaSemanaFormatado = diaSemana.charAt(0).toUpperCase() + diaSemana.slice(1);  
  return `${dataFormatada} - ${diaSemanaFormatado}`;
}

// Função usada no campo previsto
function formatTimestampToHoursAndMinutes(timestampInSeconds: number): string {
  const hours = Math.floor(timestampInSeconds / 3600);
  const minutes = Math.floor((timestampInSeconds % 3600) / 60);  
  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');  
  return `${formattedHours}:${formattedMinutes}`;
}

function calculateTimeDifferenceToTimestamp(timeOne: number, timeTwo: number) {
  const time1 = String(timeOne);
  const time2 = String(timeTwo);
  const [hours1, minutes1] = time1.split(":");
  const [hours2, minutes2] = time2.split(":");  
  const timestamp1 = parseInt(hours1, 10) * 3600 + parseInt(minutes1, 10) * 60;
  const timestamp2 = parseInt(hours2, 10) * 3600 + parseInt(minutes2, 10) * 60;  
  return timestamp2 - timestamp1;
}
// Entrada nos useStates => Saída hora formatada 00:00 vinda do BD
function SetTimestempToDateHours(tmts: number) : string {            
  const date = new Date(tmts * 1000);            
  const hours = date.getHours();
  const minutes = date.getMinutes();            
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}
// Função que converte a hora informada para um timestamp - Campos digitáveis do ponto
function SetDateHoursSet(hours: string) : number {
  const [hr, min] = hours.split(':');
  if(!hr || !min) {
    return -13; 
  } 
  const times1 = parseInt(hr, 10);
  const times2 = parseInt(min, 10);
  const date = new Date();
  date.setHours(times1, times2, 0, 0); // Define a hora para hora informada
  const timestamp = date.getTime() / 1000;
  return timestamp;      
}

const CalcHours = (hour1: number, hour2: number): string => {
  const sum = hour1 - hour2;
  return SetTimestempToDateHours(sum)
}

const CalcSaldo = (num1: number, num2: number, timestampInSeconds: number): string => {
  const num1v = num1 !== -13 ? num1: 0;
  const num2v = num2 !== -13 ? num2: 0;
  const timestampInSecondsv = timestampInSeconds - num1v - num2v;
  const isNagative = timestampInSecondsv;  
  const timestampInSecondsv2 = Math.abs(timestampInSecondsv);
  const hours = Math.floor(timestampInSecondsv2 / 3600);
  const minutes = Math.floor((timestampInSecondsv2 % 3600) / 60);  
  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');
  if(isNagative > 0){
    return `-${formattedHours}:${formattedMinutes}`;
  }
  if(isNagative === 0){
    return `${formattedHours}:${formattedMinutes}`;
  } 
  if(isNagative <= -60){
    return `+${formattedHours}:${formattedMinutes}`;
  } 
  return ""; 
}

const CalcSaldoPoint = (num1: number, num2: number, timestampInSeconds: number): number => {
  const num1v = num1 !== -13 ? num1: 0;
  const num2v = num2 !== -13 ? num2: 0;
  const timestampInSecondsv = timestampInSeconds - num1v - num2v;  
  return timestampInSecondsv   
}

const TotDay = (num1: number, num2: number): number => {
  const num1v = num1 !== -13 ? num1: 0;
  const num2v = num2 !== -13 ? num2: 0;
  const timestampInSecondsv = num1v + num2v;   
  return timestampInSecondsv   
}

function calculateHourDifference(timestamp1: number, timestamp2: number): string {
  if(timestamp1 === -13 || timestamp2 === -13){
    return "";
  }
  if(timestamp1 > timestamp2) {
    timestamp2 += 86400;
  }
  const differenceInSeconds =  timestamp2 - timestamp1;  
  const isNegative = differenceInSeconds < 0;
  const absoluteDifferenceInSeconds = Math.abs(differenceInSeconds);
  const hours = Math.floor(absoluteDifferenceInSeconds / 3600);
  const minutes = Math.floor((absoluteDifferenceInSeconds % 3600) / 60);
  const sign = isNegative ? "-" : "";
  return `${sign}${hours}:${minutes.toString().padStart(2, '0')}`;
}

function calculateHourDifPoint(timestamp1: number, timestamp2: number): number {
  if(timestamp1 === -13 || timestamp2 === -13){
    return -13;
  }
  if(timestamp1 > timestamp2) {
    timestamp2 += 86400;
  }
  const differenceInSeconds =  timestamp2 - timestamp1;    
  const absoluteDifferenceInSeconds = Math.abs(differenceInSeconds);  
  return absoluteDifferenceInSeconds;
}

export {DateOffDay, formatedDate, formatTimestampToHoursAndMinutes, SetDateHoursSet,
        SetTimestempToDateHours, CalcHours, calculateTimeDifferenceToTimestamp,
        calculateHourDifPoint, calculateHourDifference, CalcSaldo, CalcSaldoPoint, TotDay};
