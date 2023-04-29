export interface MovieInterface {
    dates: Date;
    results?: (ResultEntity)[] | null;
}

export interface Dates {
    maximum: string;
    minimum: string;
}

export interface ResultEntity {
    name:string;
    backdrop_path: string;
    genres: Genre[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    vote_average: number;
    vote_count: number;
    region:string;
}
export interface Genre {
    id: number
    name: string
  }
