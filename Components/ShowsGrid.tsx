import ShowCard from './ShowsCard';
import ShowsInfiniteScrollWrapper from './ShowsInfiniteScrollWrapper';
import { fetchInitialShows } from '../lib/ShowApi';
import Movie from '@/types/Movie';
import TvShow from '@/types/Show';

interface ShowsGridProps {
  type: 'movie' | 'tv';
  searchQuery : string
}

export default async function ShowsGrid({ type , searchQuery }: ShowsGridProps) {
  const initialData = await fetchInitialShows(type , searchQuery );
  
  return (
    <ShowsInfiniteScrollWrapper 
      initialShows={initialData.shows}
      hasMore={initialData.hasMore}
      type={type}
      searchQuery={searchQuery}
    >
      <div className="flex flex-wrap justify-center gap-10 mt-16">
        {initialData.shows.map((show: Movie | TvShow, index: number) => (
          <ShowCard key={`${show.id}-${index}`} show={show} />
        ))}
      </div>
    </ShowsInfiniteScrollWrapper>
  );
}