import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
  organization: "org-zLhrj8pbHJOgiMXANGakCiAD",
});

const openai = new OpenAIApi(configuration);

export default openai;
