import axios from 'axios';

export async function fetchGallery(search, page = 1) {
  const BASE_URL = 'https://pixabay.com/api';
  const KEY_API = '35783392-ced7b2b0963a7e7ac45fdf9cc';

  const resp = await axios.get(
    `${BASE_URL}?key=${KEY_API}&q=${search}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
  );

  return await resp.data;
  // return fetch(
  //   `${BASE_URL}?key=${KEY_API}&q=${search}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
  // ).then(resp => {
  //   if (!resp.ok) {
  //     throw new Error(resp.statusText);
  //   }
  //   return resp.json();
  // });
}
