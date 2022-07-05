import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pixabay.com/api/',
});

const APIKEY = '27863220-3ac241b372460d79544818f8f';

export const getImages = async (query, page = 1) => {
  const { data } = await instance.get(`/`, {
    params: {
      q: query,
      page,
      key: APIKEY,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
    },
  });
  return data;
};
