import axios from 'axios';
import queryString from 'query-string';
import { UpvoteInterface, UpvoteGetQueryInterface } from 'interfaces/upvote';
import { GetQueryInterface } from '../../interfaces';

export const getUpvotes = async (query?: UpvoteGetQueryInterface) => {
  const response = await axios.get(`/api/upvotes${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createUpvote = async (upvote: UpvoteInterface) => {
  const response = await axios.post('/api/upvotes', upvote);
  return response.data;
};

export const updateUpvoteById = async (id: string, upvote: UpvoteInterface) => {
  const response = await axios.put(`/api/upvotes/${id}`, upvote);
  return response.data;
};

export const getUpvoteById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/upvotes/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteUpvoteById = async (id: string) => {
  const response = await axios.delete(`/api/upvotes/${id}`);
  return response.data;
};
