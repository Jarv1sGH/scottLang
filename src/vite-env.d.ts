/// <reference types="vite/client" />


type LangType = "ja" | "hi" | "es" | "fr";
type WordType = {
    word: string,
    meaning: string,
    options: string[]
};


type StateType = {
    loading: boolean,
    result: string[],
    error?: string,
    words: WordType[]
}