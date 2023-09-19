const apiKey = import.meta.env.VITE_API_KEY;
const voiceRssApiKey = import.meta.env.VITE_VOICE_API_KEY;
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
                'X-RapidAPI-Key': apiKey,
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


export const resultCalculator = (arr1: string[], arr2: string[]): number => {
    if (arr1.length !== arr2.length) throw new Error("Arrays length do not match");

    let matchingAnswers = 0;
    for (let index = 0; index < arr1.length; index++) {
        if (arr1[index] === arr2[index]) matchingAnswers++;
    }

    return matchingAnswers;
}


// text to speech api call

export const fetchTextToSpeech = async (text: string, language: LangType): Promise<string> => {

    const encodedParams = new URLSearchParams({
        src: text,
        r: "0",
        c: "mp3",
        f: '8khz_8bit_mono',
        b64:"true"

    });

    if (language === "ja") encodedParams.set("hl", "ja-jp")
    else if (language === "es") encodedParams.set("hl", "es-es")
    else if (language === "fr") encodedParams.set("hl", "fr-fr")
    else encodedParams.set("hl", "hi-in")


    const options = {
        params: { key: voiceRssApiKey },
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'voicerss-text-to-speech.p.rapidapi.com'
        }
    };
    const { data }: { data: string } = await axios.post(`https://voicerss-text-to-speech.p.rapidapi.com/`, encodedParams, options);

    return data;

}