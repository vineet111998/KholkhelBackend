const { Configuration, OpenAIApi } =require("openai");
const { resolve } = require("path");
const { reject } = require('bcrypt/promises');
const { json } = require('body-parser');

class AiService {
    constructor(){
        this.configuration = new Configuration({
            apiKey: "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",
          });
        this.openai = new OpenAIApi(this.configuration);
    }
    async getTextFromOpenAIApi(data) {
        const response = await this.openai.createCompletion({
            model: "text-davinci-003",
            prompt: data,
            max_tokens:2048,
            temperature:1
          });
          return response.data.choices[0].text;
    }

    async getImageFromOpenAIApi(data){
        const configuration = new Configuration({
            apiKey: "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",
          });
        const openai = new OpenAIApi(configuration);
        const response = await openai.createImage({
            prompt: data,
            n: 1,
            size: "1024x1024",
          });
        return response.data.data[0].url;
    }
}
module.exports = new AiService();


  