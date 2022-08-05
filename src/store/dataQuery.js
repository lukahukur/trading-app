import { createApi, fetchBaseQuery, } from '@reduxjs/toolkit/query/react';

export const binanceApi = createApi({
        reducerPath: 'binanceApi',
        baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:2004/' }),
        endpoints: (builder) => ({
            getData: builder.query({
            query: ({s='',t='',c=''}) => `/${s}/${t}/${c}`,
        }),
        getMessages: builder.query({
            queryFn: () => ({data:[]}),
            async onCacheEntryAdded(arg, { updateCachedData, cacheDataLoaded, cacheEntryRemoved,getState })
             {
  
              const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${arg}`)
       
              try {
                function fnc(event){
                  const data =JSON.parse(event.data)
                  if (!data) return
      
                  updateCachedData((draft) => {
                    draft[0] = data;
                  })
              }
                await cacheDataLoaded
                ws.addEventListener('message', fnc)
                
              } catch(err) {
                console.log(err)
              }
             
              await cacheEntryRemoved
              ws.close()
            },
          }),
       getTrades:builder.query({
          query:({c='',s=''})=>`${c}/${s}`
       })   
    }),
    })
    
export const  {useGetDataQuery,useGetMessagesQuery,useGetTradesQuery} = binanceApi





