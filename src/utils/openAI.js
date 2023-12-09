import OpenAI from 'openai';
import { OpenAI_API_KEY } from './constants';

const openai = new OpenAI({
  apiKey: OpenAI_API_KEY, 
  dangerouslyAllowBrowser: true
});

export default openai