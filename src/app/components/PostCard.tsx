// components/PostCard.tsx
import React from "react";

export type Post = {
  id: number;
  title: string;
  body: string;
};

type Props = {
  post: Post;
};

export const PostCard: React.FC<Props> = ({ post }) => (
  <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
    <h2 className="font-semibold text-lg mb-2 text-gray-900 dark:text-gray-100">
      {post.title}
    </h2>
    <p className="text-gray-600 dark:text-gray-300 text-sm">{post.body}</p>
  </div>
);
