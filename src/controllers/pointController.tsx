const base_url: string = 'http://localhost:4113/point';

const updatePoint = async (id: string, point: any) => {
    try {
      const response = await fetch(`${base_url}/point_update/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZDI0ZWExNGE
          2MGFmY2JmMGU0ODcxOSIsImlhdCI6MTY5MTc4MDU1MSwiZXhwIjoxNjkxODY2OTUxfQ.V6BeeKlFGMZ3ZQ13ExxOPeNUPu2tv2-f08eVi_P3Bkk`}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(point),
      });
  
      if (response.ok) {
        const updatedPoin = await response.json();
        return updatedPoin;
      } else {
        throw new Error('Erro ao atualizar documento!');
      }
    } catch (error) {
      throw new Error('Erro ao atualizar documento!');
    }
  };
  
  export default updatePoint;
