import axios from "axios";
import { generate } from "random-words";


export const fetchTranslation = async (langCode: LangType): Promise<WordType[]> => {
    try {
        const words = generate(8).map(i => ({
            Text: i
        }));
        const options = {
            params: {
                'to[0]': langCode,
                'api-version': '3.0',
                profanityAction: 'NoAction',
                textType: 'plain'
            },
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': '6f7ee6a8f8msh48e7038f8199655p1a3346jsnef0abd6472c9',
                'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com'
            },
        };


        const translateData = await axios.post('https://microsoft-translator-text.p.rapidapi.com/translate', words, options)

        const received: TranslationType[] = translateData.data;

        const translateArr: WordType[] = received.map((i, index) => {



            return {
                word: i.translations[0].text,
                meaning: words[index].Text,
                options: ["ads"]
            }
        })


        return translateArr;
    } catch (error) {
        // console.log(error)
        throw new Error(`error occured`);

    }
}