import axios from 'axios';
import { URL } from '../settings';

const detectAIGenerated = async (data) => {
  const url = `${URL}/detect`;
  const response = await axios.post(
    url,
    { data: data },
    {
      'Content-Type': 'application/json',
    }
  );
  return response;
};

export default detectAIGenerated;
