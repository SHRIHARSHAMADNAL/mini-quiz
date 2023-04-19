import { axiosCall } from "./axiosServices";
export const getQuestions = () => {
    return axiosCall('get',`https://quizapi.io/api/v1/questions?apiKey=TGa5KVOLbsWRLn5y5RXUwaLLhhWkzizc9wqZrjA8&limit=10&category=Linux&difficulty=easy`,{})
}