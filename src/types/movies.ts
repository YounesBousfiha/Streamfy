export interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    vote_average: string;
    release_date: string;
    genre_ids: number[];
    video?: boolean;
}

export interface MovieDetails extends Movie {
    genres: { id: number; name: string}[];
    runtime: number;
    status: string;
    tagline: string;
    videos: {
        results: VideoResult[];
    },
    credits: {
        cast: CastMember[];
        crew: CrewMember[];
    }
}

export interface  VideoResult {
    id: string;
    key: string;
    site: string;
    type: string;
    name: string;
}

export interface CastMember {
    id: number;
    name: string;
    job: string;
}


export interface CrewMember { }