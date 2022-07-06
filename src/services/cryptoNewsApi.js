import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoNewsHeaders = {
    'X-BingApis-SDK': 'true',
    'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com',
    'X-RapidAPI-Key': 'd207b0bd0cmsh9400004eb183b5bp17db81jsn4fa95fa39bcb'
}


const baseUrl = 'https://bing-news-search1.p.rapidapi.com';

const createNewsRequest = (url) =>({ url, headers : cryptoNewsHeaders});

export const cryptoNewsApi = createApi({
    reducerPath : 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
            query: ({newsCategory, count}) => createNewsRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`),
        })
    })
});

export const {                /*Basically here we are fething data from cryptoNewsApi and storing that in a hook which*/
    useGetCryptoNewsQuery         /* which is created by redux itself*/
} = cryptoNewsApi;

  