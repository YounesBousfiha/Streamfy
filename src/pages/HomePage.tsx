import { HeroSection } from '../features/movies/components/HeroSection';
import { Row } from '../features/movies/components/Row';
import { requests } from '../lib/api';

export const HomePage = () => {
    return (
        <div className="bg-[#141414] min-h-screen pb-20 overflow-x-hidden">

            <HeroSection />

            <div className="relative z-10 -mt-40 space-y-8 bg-transparent pb-10">
                <Row title="Trending Now" fetchUrl={requests.fetchTrending} isLargeRow />
                <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
                <Row title="Netflix Originals" fetchUrl={requests.fetchNetflixOriginals} isLargeRow />
                <Row title="Action Thrillers" fetchUrl={requests.fetchActionMovies} />
                <Row title="Comedies" fetchUrl={requests.fetchComedyMovies} />
                <Row title="Scary Movies" fetchUrl={requests.fetchHorrorMovies} />
                <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
                <Row title="Romance" fetchUrl={requests.fetchRomanceMovies} />
            </div>
        </div>
    );
};