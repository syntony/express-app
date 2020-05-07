# Express app with TypeORM and TypeScript

## ⚛ Engines Requirements
- [Node.js >=10.16.0](https://nodejs.org/en/)
- [Yarn >=1.16.0](https://yarnpkg.com/en/docs/install)
- [npm >=6.11.3](https://www.npmjs.com/) (optional)

## 🚀 Quick start

```
git clone https://github.com/syntony/express-app
cd express-app
yarn install
```

then you have 2 ways:

- working through webpack + docker (for now - production mode only included). My docker command:

```
docker build -t express-app . && docker run -p 127.0.0.1:3000:3000 --name express-app express-app
```

- working locally on your machine (for now - default development environment)

```
yarn start
```

- case there was some issues with automatic migrations

```
yarn migration:run
```

## 🛣 Routes

###Stores:
1. GET ``/api/v1/stores`` - get all hookah stores.

    Query params:
    
    - limit - Number, Optional (default: 10) 
    - offset - Number, Optional (offset: 0)
    
    Response example:
    ```$xslt
    {
        results: [
            {
                id: "638ff68c-e594-4da4-8646-aff556024580",
                name: "Lueilwitz - Hessel and Sons",
                description: "Quia exercitationem rerum consectetur sed. Tempora molestiae est voluptatem consequuntur nihil numquam velit eveniet. Hic impedit vel omnis fugiat quisquam accusantium rerum dolores dolor. Ut temporibus est expedita voluptates numquam. Velit et aut possimus dolorum sunt ut porro qui aut.",
                image: "http://loremflickr.com/640/480/hookah",
                createdAt: "2020-05-06T20:30:27.000Z",
                updatedAt: "2020-05-06T20:30:27.000Z",
                isPublished: true
            },
            ...
        ],
        meta: {
            limit: 10,
            offset: 0,
            pagesTotal: 1,
            itemsTotal: 5
        }
    }
    ```
    
1. GET ``/api/v1/stores/:id`` - get specific hookah store with it`s hookas + their offers

    Response example:
    ```$xslt
    {
        results: {
            id: "638ff68c-e594-4da4-8646-aff556024580",
            name: "Lueilwitz - Hessel and Sons",
            description: "Quia exercitationem rerum consectetur sed. Tempora molestiae est voluptatem consequuntur nihil numquam velit eveniet. Hic impedit vel omnis fugiat quisquam accusantium rerum dolores dolor. Ut temporibus est expedita voluptates numquam. Velit et aut possimus dolorum sunt ut porro qui aut.",
            image: "http://loremflickr.com/640/480/hookah",
            createdAt: "2020-05-06T20:30:27.000Z",
            updatedAt: "2020-05-06T20:30:27.000Z",
            isPublished: true,
            hookahs: [
                id: "4249eb59-360a-46af-bab6-d667b73396f1",
                name: "Keyboard Handmade Granite Shirt",
                description: "Ullam nihil vel suscipit maxime. Voluptatem totam explicabo neque repudiandae voluptas eos id. Qui odit non tempora earum in nulla consequatur exercitationem. Voluptatem porro id nesciunt. Rerum facere nulla.",
                pipes: 1,
                image: "http://loremflickr.com/640/480/hookah",
                createdAt: "2020-05-06T20:30:27.000Z",
                updatedAt: "2020-05-06T20:30:27.000Z",
                isPublished: true,
                storeId: "638ff68c-e594-4da4-8646-aff556024580",
                offers: [
                    {
                        id: "663cbbf6-1a83-4b92-9b0c-f560e2c8dd13",
                        guest: "Lilliana Johnson",
                        guestsNumber: 3,
                        reservedFrom: "2020-05-06T20:30:27.849Z",
                        reservedUntil: "2020-05-06T20:30:27.849Z",
                        storeId: "29c6ceb7-1e4a-4186-bcb3-d8e201d1e4ee",
                        hookahId: "4249eb59-360a-46af-bab6-d667b73396f1",
                        createdAt: "2020-05-06T20:30:27.000Z",
                        updatedAt: "2020-05-06T20:30:27.000Z"
                    },
                    {
                        id: "aec32c7e-0818-400d-9c50-a618c47912a7",
                        guest: "Libbie Deckow",
                        guestsNumber: 8,
                        reservedFrom: "2020-05-06T20:30:27.849Z",
                        reservedUntil: "2020-05-06T20:30:27.849Z",
                        storeId: "e4335220-222a-42d1-97c4-5284d2248fa2",
                        hookahId: "4249eb59-360a-46af-bab6-d667b73396f1",
                        createdAt: "2020-05-06T20:30:27.000Z",
                        updatedAt: "2020-05-06T20:30:27.000Z"
                    }
                ],
                ...
            ]
        }
    }
    ```

1. POST ``/api/v1/stores`` - create hookah store.

    Request body:

    - name - String, Required, Unique (min 4 symbols)
    - description - String
    - image - String
    
1. PATCH ``/api/v1/stores/:id`` - edit hookah store.

    Request body:

    - name - String, Required, Unique (min 4 symbols)
    - description - String
    - image - String
    
1. DELETE ``/api/v1/stores/:id`` - delete hookah store.

###Hookahs:

1. GET ``/api/v1/stores/:storeId/hookahs`` - get all hookahs of one store.

    Query params:
       
   - limit - Number, Optional (default: 10) 
   - offset - Number, Optional (offset: 0)
   
   Response example:
   ```$xslt
        {
            results: [
                {
                    id: "31835cab-585d-445e-8601-9467ebca32c5",
                    name: "Cheese Tasty Soft Sausages",
                    description: "Maxime tempore aliquam expedita possimus. Autem corporis iusto laboriosam cum dolorem officiis atque. Tempore odit ut assumenda commodi vel. Sint architecto ipsa.",
                    pipes: 5,
                    image: "http://loremflickr.com/640/480/hookah",
                    createdAt: "2020-05-06T20:30:27.000Z",
                    updatedAt: "2020-05-06T20:30:27.000Z",
                    isPublished: true,
                    storeId: "638ff68c-e594-4da4-8646-aff556024580"
                },
                ...
            ],
            meta: {
                limit: 10,
                offset: 0,
                pagesTotal: 1,
                itemsTotal: 4
            }
        }
    ```
   
   Case you searching hookahs for an offer (required all) Query params::
   
   - from - ISO Date (example: 2020-05-06T20:31:27.000Z)
   - to - ISO Date (example: 2020-05-06T20:35:27.000Z)
   - guestsNumber - Number
   
   Response example (results - subsets of hookas for your guestsNumber offer):
   ```$xslt
    {
        results: [
            [
                {
                id: "4249eb59-360a-46af-bab6-d667b73396f1",
                name: "Keyboard Handmade Granite Shirt",
                description: "Ullam nihil vel suscipit maxime. Voluptatem totam explicabo neque repudiandae voluptas eos id. Qui odit non tempora earum in nulla consequatur exercitationem. Voluptatem porro id nesciunt. Rerum facere nulla.",
                pipes: 1,
                image: "http://loremflickr.com/640/480/hookah",
                createdAt: "2020-05-06T20:30:27.000Z",
                updatedAt: "2020-05-06T20:30:27.000Z",
                isPublished: true,
                storeId: "638ff68c-e594-4da4-8646-aff556024580"
                },
                ...
            ],
            [
               {
                   id: "770eb129-2658-4e55-a9a5-b14e70be5d5e",
                   name: "Tuna Intelligent Cotton Computer",
                   description: "Voluptatem ratione earum fugiat voluptatem quos fugit. Expedita at dolorem enim fugit voluptas. Accusantium consequuntur ut culpa corporis impedit. Modi ut commodi accusantium. Perferendis quis sint.",
                   pipes: 1,
                   image: "http://loremflickr.com/640/480/hookah",
                   createdAt: "2020-05-06T20:30:27.000Z",
                   updatedAt: "2020-05-06T20:30:27.000Z",
                   isPublished: true,
                   storeId: "638ff68c-e594-4da4-8646-aff556024580"
               },
               ...
            ],
            ...
        ],
        meta: {
            limit: 10,
            offset: 0,
            pagesTotal: 1
        }
    }
   ```
   
1. GET ``/api/v1/stores/:storeId/hookahs/:id`` - get specific hookah.

    Response example:
    
    ```$xslt
        {
            results: {
                id: "31835cab-585d-445e-8601-9467ebca32c5",
                name: "Cheese Tasty Soft Sausages",
                description: "Maxime tempore aliquam expedita possimus. Autem corporis iusto laboriosam cum dolorem officiis atque. Tempore odit ut assumenda commodi vel. Sint architecto ipsa.",
                pipes: 5,
                image: "http://loremflickr.com/640/480/hookah",
                createdAt: "2020-05-06T20:30:27.000Z",
                updatedAt: "2020-05-06T20:30:27.000Z",
                isPublished: true,
                storeId: "638ff68c-e594-4da4-8646-aff556024580",
                offers: [
                    {
                        id: "4227d095-efbe-4cd1-80f9-57a376593130",
                        guest: "Alta Collins",
                        guestsNumber: 6,
                        reservedFrom: "2020-05-06T20:30:27.849Z",
                        reservedUntil: "2020-05-06T20:30:27.849Z",
                        storeId: "638ff68c-e594-4da4-8646-aff556024580",
                        hookahId: "31835cab-585d-445e-8601-9467ebca32c5",
                        createdAt: "2020-05-06T20:30:27.000Z",
                        updatedAt: "2020-05-06T20:30:27.000Z"
                    },
                    ...
                ]
            }
        }
    ```
1. POST ``/api/v1/stores/:storeId/hookahs`` - create hookah.

    Request body:

    - name - String, Required, Unique (min 4 symbols)
    - description - String
    - image - String
    - pipes - Number, Required (min 1, max 6)
    
1. PATCH ``/api/v1/stores/:storeId/hookahs/:id`` - edit hookah.
    
    Request body:

    - name - String, Required, Unique (min 4 symbols)
    - description - String
    - image - String
    - pipes - Number, Required (min 1, max 6)
    
1. DELETE ``/api/v1/stores/:storeId/hookahs:id`` - delete hookah store.

###Offers:

1. GET ``/api/v1/stores/:storeId/offers`` - get all offers on specific store. 
       
    Query params:
          
      - limit - Number, Optional (default: 10) 
      - offset - Number, Optional (offset: 0)
      
    Response example:
    ```$xslt
    {
        results: [
            {
                id: "4227d095-efbe-4cd1-80f9-57a376593130",
                guest: "Alta Collins",
                guestsNumber: 6,
                reservedFrom: "2020-05-06T20:30:27.849Z",
                reservedUntil: "2020-05-06T20:30:27.849Z",
                storeId: "638ff68c-e594-4da4-8646-aff556024580",
                hookahId: "31835cab-585d-445e-8601-9467ebca32c5",
                createdAt: "2020-05-06T20:30:27.000Z",
                updatedAt: "2020-05-06T20:30:27.000Z"
            },
            ...
        ],
        meta: {
            limit: 10,
            offset: 0,
            pagesTotal: 2,
            itemsTotal: 15
        }
    }
    ```

1. GET ``/api/v1/stores/:storeId/hookahs/:hookahId/offers`` - get all offers on specific hookah. 
       
    Query params:
          
      - limit - Number, Optional (default: 10) 
      - offset - Number, Optional (offset: 0)

    Response example:

    ```$xslt
        {
            results: [
                {
                    id: "4227d095-efbe-4cd1-80f9-57a376593130",
                    guest: "Alta Collins",
                    guestsNumber: 6,
                    reservedFrom: "2020-05-06T20:30:27.849Z",
                    reservedUntil: "2020-05-06T20:30:27.849Z",
                    storeId: "638ff68c-e594-4da4-8646-aff556024580",
                    hookahId: "31835cab-585d-445e-8601-9467ebca32c5",
                    createdAt: "2020-05-06T20:30:27.000Z",
                    updatedAt: "2020-05-06T20:30:27.000Z"
                },
                ...
            ],
            meta: {
                limit: 10,
                offset: 0,
                pagesTotal: 1,
                itemsTotal: 1
            }
        }
    ```
   
1. GET ``/api/v1/stores/:storeId/hookahs/:hookahId/offers/:id`` - get one specific offer.

    Response example:
    ```$xslt
        {
            results: {
                id: "4227d095-efbe-4cd1-80f9-57a376593130",
                guest: "Alta Collins",
                guestsNumber: 6,
                reservedFrom: "2020-05-06T20:30:27.849Z",
                reservedUntil: "2020-05-06T20:30:27.849Z",
                storeId: "638ff68c-e594-4da4-8646-aff556024580",
                hookahId: "31835cab-585d-445e-8601-9467ebca32c5",
                createdAt: "2020-05-06T20:30:27.000Z",
                updatedAt: "2020-05-06T20:30:27.000Z"
            }
        }
    ```
   
1. POST ``/stores/:storeId/hookahs/:hookahId/offers`` - create offer.

    Request body:
    
    - guest - String, Required (min 4, max 20 symbols)
    - guestsNumber - Number, Required
    - reservedFrom - ISO Date, Required