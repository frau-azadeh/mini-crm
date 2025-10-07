// src/api/postsService.ts
import axios from "axios";

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

/**
 * گرفتن همه پست‌ها از jsonplaceholder
 */
export async function fetchAllPosts(): Promise<Post[]> {
  const response = await axios.get<Post[]>(
    "https://jsonplaceholder.typicode.com/posts",
  );
  return response.data;
}
