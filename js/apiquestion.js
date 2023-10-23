export const getQuestionsByAPI = async () => {
    try {
      const response = await fetch('../db/data.json');
      if(!response.ok){
        throw new Error('Tivemos problemas')
      }
      return response.json();
  
    } catch (error) {
      console.error(error.message);
    }
  };

export const selectQuestion = data =>{
    const randomQuestion = Math.floor(Math.random() * data.length)
    return data[randomQuestion]
  }
