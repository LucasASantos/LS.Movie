export interface MovieData {
    originalTitle:string
    translatedTitles?: Array<{
        title: string,
        region: string
    }>;
    director: string;
    writers:Array<string>;
    stars: Array<string>;
    category:Array<string>;
    duraction: string;
    releaseDate:Date;
}