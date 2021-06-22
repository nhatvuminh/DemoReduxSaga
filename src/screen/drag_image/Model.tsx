export interface Post {
  post_id: number;
  username: string;
  post_image: string;
  avatar: string;
  description: string;
}

export type FacebookRoutes = {
  ListPost: undefined;
  DetailPost: { post: Post; height: number };
};
