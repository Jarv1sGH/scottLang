import axios from "axios";
import { generate } from "random-words";
import _ from "lodash"

const generateWords = (translatedWords: {
    Text: string
}[], index: number): string[] => {

    const correctOption: string = translatedWords[index].Text;

    // this will include all the other translated words except for the correct one
    const incorrectArrayFiltered = translatedWords.filter((i) => i.Text !== correctOption);

    // taking 3 random translatedWords from the filtered array to map in quiz options
    const incorrectOptions: string[] = _.sampleSize(incorrectArrayFiltered, 3).map((i) => i.Text);
    const quizOptions = _.shuffle([...incorrectOptions, correctOption]);

    return quizOptions;
}

export const fetchTranslation = async (langCode: LangType): Promise<WordType[]> => {
    try {
        const words = generate(8).map(i => ({
            Text: i
        }));
        const apiOptions = {
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


        const translateData = await axios.post('https://microsoft-translator-text.p.rapidapi.com/translate', words, apiOptions)

        const received: TranslationType[] = translateData.data;

        const translateArr: WordType[] = received.map((i, index) => {


            const options: string[] = generateWords(words, index);

            return {
                word: i.translations[0].text,
                meaning: words[index].Text,
                options
            }
        })


        return translateArr;
    } catch (error) {
        // console.log(error)
        throw new Error(`error occured`);

    }
}