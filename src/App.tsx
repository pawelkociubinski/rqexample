import { useCallback, useState } from "react";
import { gql } from "graphql-request";
import {
  useGetPostsQuery,
  useGetPostQuery,
  useCreatePostMutation,
} from "./generated/graphql";
import { graphQLClient } from "./client";
import { useQueryClient } from "@tanstack/react-query";

gql`
  query getPosts {
    posts(options: { slice: { start: 50, end: 110 } }) {
      data {
        id
        title
      }
    }
  }
`;

gql`
  query getPost($id: ID!) {
    post(id: $id) {
      id
      title
      body
    }
  }
`;

gql`
  mutation createPost($input: CreatePostInput!) {
    createPost(input: $input) {
      id
      title
      body
    }
  }
`;

function App() {
  const [value, setValue] = useState("");
  const [isSelected, setIsSelected] = useState("");
  const queryClient = useQueryClient();

  const { data } = useGetPostsQuery(graphQLClient);

  const { mutate } = useCreatePostMutation(graphQLClient, {
    onSuccess: () => {
      console.log("success!")
      queryClient.invalidateQueries(["getPosts"]);
    },
  });

  const handleClick = () => {
    mutate({ input: { title: value, body: value } });
  };

  // const { status, data, error, isLoading, isSuccess, isError } = useFetchAllPokemonQuery(graphQLClient)
  // const { status, data, isLoading } = useFetchPokemonQuery(graphQLClient, { id: 12 })

  return (
    <div>
      <input value={value} onChange={(event) => setValue(event.target.value)} />
      <button onClick={handleClick}>Submit</button>

      {isSelected && <Post id={isSelected} />}

      {data?.posts?.data?.map((post, index) => {
        return (
          <div
            key={index}
            onClick={() => {
              setIsSelected(post!.id!);
            }}
          >
            {post?.title}
          </div>
        );
      })}
    </div>
  );
}

function Post(props: any) {
  const { data } = useGetPostQuery(graphQLClient, { id: props.id });

  return (
    <div className="post">
      <div>id: {data?.post?.id}</div>
      <div>title: {data?.post?.title}</div>
    </div>
  );
}

export default App;
