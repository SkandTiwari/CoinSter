import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoExchangesApiHeaders = {
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
    'X-RapidAPI-Key': 'fc834428a7msh7519a2a31aa6637p11fd9cjsnc19cbb1b6b80',
}

const baseUrl = 'https://coinranking1.p.rapidapi.com';

const createRequest = (url) =>({ url, headers : cryptoApiHeaders});

export const cryptoApi = createApi({
    reducerPath : 'cryptoApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query: (count) => createRequest(`/coins?limit=${count}`),
        })
    })
});                 // HERE WE HAVE CREATE AN API

export const {                /*Basically here we are fething data from cryptoApi and storing that in a hook which*/
    useGetCryptosQuery,         /* which is created by redux itself*/
} = cryptoApi;
