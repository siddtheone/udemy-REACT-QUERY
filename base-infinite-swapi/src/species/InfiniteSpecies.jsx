import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "react-query";
import { Species } from "./Species";

const initialUrl = "https://swapi.dev/api/species/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfiniteSpecies() {
  const {
    data,
    isLoading,
    isError,
    error,
    isFetching,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    "sw-species",
    ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    { getNextPageParam: ({ next }) => next }
  );

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }
  if (isError) {
    return <div>Error: {error.toString()}</div>;
  }

  return (
    <>
      {isFetching && <div className="loading">Loading...</div>}
      <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
        {data.pages.map((page) =>
          page.results.map((species) => (
            <Species
              key={species.name}
              averageLifespan={species.average_lifespan}
              name={species.name}
              language={species.language}
            />
          ))
        )}
      </InfiniteScroll>
    </>
  );
}
