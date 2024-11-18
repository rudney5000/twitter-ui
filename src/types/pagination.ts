import {Tweet} from "./tweet.ts";

interface PaginatedResponse<T> {
    message: Tweet[];
    totalElements: number;
    totalPages: number;
    currentPage: number;
}