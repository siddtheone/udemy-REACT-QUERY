import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "react-query";
import { Person } from "./Person";

const initialUrl = "https://swapi.dev/api/people/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfinitePeople() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
    isFetching,
    error,
  } = useInfiniteQuery(
    "sw-people",
    ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    { getNextPageParam: ({ next }) => next }
  );

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong: ${error.toString()}</div>;
  }

  console.log(data);

  return (
    <>
      {isFetching && <div className="loading">Loading...</div>}
      <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
        {data.pages.map((pageData) =>
          pageData.results.map((person) => (
            <Person {...person} key={person.name} />
          ))
        )}
      </InfiniteScroll>
    </>
  );
}
