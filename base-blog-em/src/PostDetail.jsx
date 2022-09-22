import { useMutation, useQuery } from "react-query";

async function fetchComments(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  );
  return response.json();
}

async function deletePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: "DELETE" }
  );
  return response.json();
}

async function updatePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: "PATCH", data: { title: "REACT QUERY FOREVER!!!!" } }
  );
  return response.json();
}

export function PostDetail({ post }) {
  const { data, isLoading, isError, error } = useQuery(
    ["comments", post.id],
    async () => await fetchComments(post.id)
  );

  const {
    mutate,
    isLoading: isDeleting,
    isError: isErrorDeletingPost,
    isSuccess,
  } = useMutation((postId) => deletePost(postId));

  const {
    mutate: postUpdateMutation,
    isLoading: isUpdatingPost,
    isError: isErrorPostUpdate,
    isSuccess: isPostUpdateSuccess,
  } = useMutation((postId) => updatePost(postId));

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  if (isError) {
    return (
      <>
        <h3>Oops something went wrong</h3>
        <p>{error.toString()}</p>
      </>
    );
  }

  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <button onClick={() => mutate(post.id)}>Delete</button>
      {isDeleting && "Is deleting post"}
      {isErrorDeletingPost && "Deleting post failed"}
      {isSuccess && "Post deleted"}
      <button onClick={() => postUpdateMutation(post.id)}>Update title</button>
      {isUpdatingPost && "Updating post"}
      {isErrorPostUpdate && "Failed to update post"}
      {isPostUpdateSuccess && "Post udpated successfully"}
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
