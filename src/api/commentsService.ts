import { Comments } from "@/types/types";
import { apiCommentClient } from "./apiCommentsClient";

export async function fetchAllComments(): Promise<Comments[]> {
    const response =await apiCommentClient.get<Comments[]>("/comments")
    return response.data
}
