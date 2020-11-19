# E-Commerce CMS Server

## RESTful endpoints
**Login Admin**
----
  Login admin on server.

* **URL**

  /loginAdmin

* **Method:**
  
  `POST`

* **Request Headers**

  None
  
* **URL Params**
   
  None

* **Data Params**

   **Required:**

   `email=[string]`
   `password=[string]`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:**
    ```
    {
      "id": 1,
      "email": "admin@mail.com",
      "access_token": "<your access token>"
    }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ msg : "Invalid email or password!" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : "Internal server error!" }`

&nbsp;

**Create Product**
----
  Create product data on server into a database.

* **URL**

  /products

* **Method:**
  
  `POST`

* **Request Headers**

  **Required:**

  ```
  {
    "access_token": "<your access token>"
  }
  ```
  
* **URL Params**

  None

* **Data Params**

  **Required:**

  `name=[string]`,
  `image_url=[string]`,
  `description=[string]`,
  `price=[integer]`,
  `stock=[integer]`
  `CategoryId=[integer]`

* **Success Response:**

  * **Code:** 201 CREATED <br />
    **Content:** `{
    "id": 1,
    "name": "PS 5",
    "image_url": "https://ecs7-p.tokopedia.net/img/cache/200-square/product-1/2020/10/3/119218/119218_61799ae4-3bb2-4ab3-81f5-6ecd074cf03b_415_415.jpg",
    "price": 11000000,
    "stock": 5,
    "CategoryId": 1,
    "UserId": 1,
    "updatedAt": "2020-11-09T17:42:29.833Z",
    "createdAt": "2020-11-09T17:42:29.833Z"
    }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ msg : "Name is required!, Image URL is required!, Wrong image URL format!, Price is required and must be an Integer!, Stock is required and must be an Integer!" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : "Internal server error!" }`

&nbsp;

**Read Products**
----
  Returns all available products data.

* **URL**

  /products

* **Method:**
  
  `GET`

* **Request Headers**

  **Required:**

  ```
  {
    "access_token": "<your access token>"
  }
  ```
  
* **URL Params**

  None

* **Data Params**
   
  None

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:**
    `[
    {
    "id": 1,
    "name": "Kabinet Modular BESTA",
    "image_url": "https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/501/0350121_PE535204_S4.jpg",
    "description": "Kombinasi penyimpanan dengan laci, Lappviken putih",
    "price": 4300000,
    "stock": 5,
    "UserId": 1,
    "CategoryId": 1,
    "createdAt": "2020-11-10T15:33:00.570Z",
    "updatedAt": "2020-11-11T07:43:02.984Z",
    "Category": {
        "id": 1,
        "name": "Ruang Keluarga",
        "UserId": 1,
        "createdAt": "2020-11-10T15:31:37.977Z",
        "updatedAt": "2020-11-10T15:31:37.977Z"
      }
    }
    ]`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : "Internal server error!" }`

&nbsp;

**Read Product By Id**
----
  Returns one available product data based on its 'id'.

* **URL**

  /products/:id

* **Method:**
  
  `GET`

* **Request Headers**

  **Required:**

  ```
  {
    "access_token": "<your access token>"
  }
  ```
  
* **URL Params**

  **Required:**
   
  `id=[integer]`

* **Data Params**
   
  None

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:**
    `{
    "id": 1,
    "name": "Kabinet Modular BESTA",
    "image_url": "https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/501/0350121_PE535204_S4.jpg",
    "description": "Kombinasi penyimpanan dengan laci, Lappviken putih",
    "price": 4300000,
    "stock": 5,
    "UserId": 1,
    "CategoryId": 1,
    "createdAt": "2020-11-10T15:33:00.570Z",
    "updatedAt": "2020-11-11T07:43:02.984Z",
    "Category": {
        "id": 1,
        "name": "Ruang Keluarga",
        "UserId": 1,
        "createdAt": "2020-11-10T15:31:37.977Z",
        "updatedAt": "2020-11-10T15:31:37.977Z"
      }
    }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ msg : "Error not found!" }`


&nbsp;

**Update Product**
----
  Update a product data based on its "id" on server.

* **URL**

  /products/:id

* **Method:**
  
  `PUT`

* **Request Headers**

  **Required:**

  ```
  {
    "access_token": "<your access token>"
  }
  ```
  
* **URL Params**

  **Required:**
   
  `id=[integer]`

* **Data Params**

  **Required:**
   
  `name=[string]`,
  `image_url=[string]`,
  `price=[integer]`,
  `stock=[integer]`,
  `CategoryId=[integer]`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:**
    `{
    "id": 1,
    "name": "XBOX",
    "image_url": "https://cdn.mos.cms.futurecdn.net/y9MdEUKkZ6itgR6y6Rqaif-970-80",
    "price": 12000000,
    "stock": 10,
    "CategoryId": 2,
    "UserId": 1,
    "createdAt": "2020-11-09T17:42:29.833Z",
    "updatedAt": "2020-11-09T17:53:41.555Z"
    }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ msg : "Name is required!, Image URL is required!, Wrong image URL format!, Price is required and must be an Integer!, Stock is required and must be an Integer!" }`

  OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ msg : "Error not found!" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : "Internal server error!" }`

&nbsp;
  
**Delete Product**
----
  Delete a product data based on its "id" on server.

* **URL**

  /products/:id

* **Method:**
  
  `DELETE`

* **Request Headers**

  **Required:**

  ```
  {
    "access_token": "<your access token>"
  }
  ```
  
* **URL Params**

  **Required:**

  `id=[integer]`

* **Data Params**
   
   None

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:**
    `{ msg : 'Successfully delete a product!' }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ msg : "Error not found!" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : "Internal server error!" }`

&nbsp;

**Create Category**
----
  Create category data on server into a database.

* **URL**

  /categories

* **Method:**
  
  `POST`

* **Request Headers**

  **Required:**

  ```
  {
    "access_token": "<your access token>"
  }
  ```
  
* **URL Params**

  None

* **Data Params**

  **Required:**

  `name=[string]`

* **Success Response:**

  * **Code:** 201 CREATED <br />
    **Content:** `{
    "id": 1,
    "name": "Ruang Makan",
    "UserId": 1,
    "updatedAt": "2020-11-09T17:42:29.833Z",
    "createdAt": "2020-11-09T17:42:29.833Z"
    }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ msg : "Category name is required!" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : "Internal server error!" }`

&nbsp;

**Read Categories**
----
  Returns all available categories data.

* **URL**

  /categories

* **Method:**
  
  `GET`

* **Request Headers**

  **Required:**

  ```
  {
    "access_token": "<your access token>"
  }
  ```
  
* **URL Params**

  None

* **Data Params**
   
  None

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:**
    `[
    {
        "id": 1,
        "name": "Ruang Keluarga",
        "UserId": 1,
        "createdAt": "2020-11-10T06:28:15.150Z",
        "updatedAt": "2020-11-10T06:28:15.150Z"
    },
    {
        "id": 2,
        "name": "Kamar Tidur",
        "UserId": 1,
        "createdAt": "2020-11-10T06:28:15.150Z",
        "updatedAt": "2020-11-10T06:28:15.150Z"
    },
    {
        "id": 3,
        "name": "Dapur",
        "UserId": 1,
        "createdAt": "2020-11-10T06:28:15.150Z",
        "updatedAt": "2020-11-10T06:28:15.150Z"
    },
    {
        "id": 5,
        "name": "Kamar Mandi",
        "UserId": 1,
        "createdAt": "2020-11-10T07:56:04.792Z",
        "updatedAt": "2020-11-10T07:56:04.792Z"
    }
]`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : "Internal server error!" }`

&nbsp;

**Delete Category**
----
  Delete a category data based on its "id" on server.

* **URL**

  /categories/:id

* **Method:**
  
  `DELETE`

* **Request Headers**

  **Required:**

  ```
  {
    "access_token": "<your access token>"
  }
  ```
  
* **URL Params**

  **Required:**

  `id=[integer]`

* **Data Params**
   
   None

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:**
    `{ msg : 'Successfully delete a category!' }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ msg : "Error not found!" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : "Internal server error!" }`

&nbsp;

**Register Customer**
----
  Register customer on server.

* **URL**

  /registerCustomer

* **Method:**
  
  `POST`

* **Request Headers**

  None
  
* **URL Params**
   
  None

* **Data Params**

   **Required:**

   `email=[string]`
   `password=[string]`

* **Success Response:**

  * **Code:** 201 CREATED <br />
    **Content:**
    `{
      "id": 1,
      "email": "user@gmail.com"
    }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ msg : "Email is required!, Wrong email format!, Password is required!, Password length minimum 4 characters!" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : "Internal server error!" }`

&nbsp;

**Login Customer**
----
  Login customer on server.

* **URL**

  /loginCustomer

* **Method:**
  
  `POST`

* **Request Headers**

  None
  
* **URL Params**
   
  None

* **Data Params**

   **Required:**

   `email=[string]`
   `password=[string]`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:**
    ```
    {
      "id": 1,
      "email": "admin@mail.com",
      "access_token": "<your access token>"
    }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ msg : "Invalid email or password!" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : "Internal server error!" }`

&nbsp;

**Add To Cart**
----
  Add product data to cart.

* **URL**

  /carts

* **Method:**
  
  `POST`

* **Request Headers**

  **Required:**

  ```
  {
    "access_token": "<your access token>"
  }
  ```
  
* **URL Params**

  None

* **Data Params**

  **Required:**

  `ProductId=[integer]`

* **Success Response:**
  * **Code:** 200 OK <br />
    **Content:** `{
    "id": 54,
    "quantity": 5,
    "checkout": "false",
    "ProductId": 1,
    "UserId": 3,
    "createdAt": "2020-11-19T03:24:29.410Z",
    "updatedAt": "2020-11-19T03:26:16.362Z"
}`

    OR

  * **Code:** 201 CREATED <br />
    **Content:** `{
    "id": 54,
    "ProductId": 1,
    "UserId": 3,
    "updatedAt": "2020-11-19T03:24:29.410Z",
    "createdAt": "2020-11-19T03:24:29.410Z",
    "quantity": 1,
    "checkout": "false"
}`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ msg : "Running out of stock product!" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : "Internal server error!" }`

&nbsp;

**Read Cart**
----
  Returns all products in cart.

* **URL**

  /carts

* **Method:**
  
  `GET`

* **Request Headers**

  **Required:**

  ```
  {
    "access_token": "<your access token>"
  }
  ```
  
* **URL Params**

  None

* **Data Params**
   
  None

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:**
    `{
    "cart": [
        {
            "id": 1,
            "checkout": "false",
            "quantity": 6,
            "ProductId": 1,
            "UserId": 3,
            "createdAt": "2020-11-17T14:31:33.968Z",
            "updatedAt": "2020-11-17T15:10:33.092Z",
            "Product": {
                "id": 1,
                "name": "Kabinet Modular BESTA",
                "image_url": "https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/501/0350121_PE535204_S4.jpg",
                "description": "Kombinasi penyimpanan dengan laci, Lappviken putih",
                "price": 4300000,
                "stock": 6,
                "UserId": 1,
                "CategoryId": 3,
                "createdAt": "2020-11-10T15:33:00.570Z",
                "updatedAt": "2020-11-11T09:55:13.249Z",
                "Category": {
                    "id": 3,
                    "name": "Dapur",
                    "UserId": 1,
                    "createdAt": "2020-11-10T15:31:37.977Z",
                    "updatedAt": "2020-11-10T15:31:37.977Z"
                }
            }
        },
        {
            "id": 2,
            "checkout": "false",
            "quantity": 1,
            "ProductId": 5,
            "UserId": 3,
            "createdAt": "2020-11-17T14:32:02.720Z",
            "updatedAt": "2020-11-17T15:00:31.653Z",
            "Product": {
                "id": 5,
                "name": "Meja TV HEMNES",
                "image_url": "https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/247/0824740_PE776188_S4.jpg",
                "description": "Kombinasi penyimpanan TV, hitam-cokelat/cokelat muda kaca bening",
                "price": 12497000,
                "stock": 8,
                "UserId": 1,
                "CategoryId": 1,
                "createdAt": "2020-11-10T18:12:48.405Z",
                "updatedAt": "2020-11-10T18:12:48.405Z",
                "Category": {
                    "id": 1,
                    "name": "Ruang Keluarga",
                    "UserId": 1,
                    "createdAt": "2020-11-10T15:31:37.977Z",
                    "updatedAt": "2020-11-10T15:31:37.977Z"
                }
            }
        }
    ],
    "total": 38297000
}`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : "Internal server error!" }`

&nbsp;

**Read Cart By Id**
----
  Returns one cart data based on its 'id'.

* **URL**

  /carts/:id

* **Method:**
  
  `GET`

* **Request Headers**

  **Required:**

  ```
  {
    "access_token": "<your access token>"
  }
  ```
  
* **URL Params**

  **Required:**
   
  `id=[integer]`

* **Data Params**
   
  None

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:**
    `{
    "id": 2,
    "checkout": "false",
    "quantity": 1,
    "ProductId": 5,
    "UserId": 3,
    "createdAt": "2020-11-17T14:32:02.720Z",
    "updatedAt": "2020-11-17T15:00:31.653Z",
    "Product": {
        "id": 5,
        "name": "Meja TV HEMNES",
        "image_url": "https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/247/0824740_PE776188_S4.jpg",
        "description": "Kombinasi penyimpanan TV, hitam-cokelat/cokelat muda kaca bening",
        "price": 12497000,
        "stock": 8,
        "UserId": 1,
        "CategoryId": 1,
        "createdAt": "2020-11-10T18:12:48.405Z",
        "updatedAt": "2020-11-10T18:12:48.405Z",
        "Category": {
            "id": 1,
            "name": "Ruang Keluarga",
            "UserId": 1,
            "createdAt": "2020-11-10T15:31:37.977Z",
            "updatedAt": "2020-11-10T15:31:37.977Z"
        }
    }
}`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ msg : "Error not found!" }`

&nbsp;

**Update Cart**
----
  Update quantity a product data in cart based on its "id" on server.

* **URL**

  /carts/:id

* **Method:**
  
  `PATCH`

* **Request Headers**

  **Required:**

  ```
  {
    "access_token": "<your access token>"
  }
  ```
  
* **URL Params**

  **Required:**
   
  `id=[integer]`

* **Data Params**

  **Required:**
   
  `quantity=[integer]`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:**
    `{
    "id": 1,
    "checkout": "false",
    "quantity": 6,
    "ProductId": 1,
    "UserId": 3,
    "createdAt": "2020-11-17T14:31:33.968Z",
    "updatedAt": "2020-11-17T15:16:01.930Z"
}`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ msg : "Quantity is required and must be an Integer!" }`
    OR
    **Content:** `{ msg : "Running out of stock product!" }`

  OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ msg : "Error not found!" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : "Internal server error!" }`

&nbsp;

**Update Checkout Cart**
----
  Update quantity stock product data in DB based on its "id" on server.

* **URL**

  /carts/:id

* **Method:**
  
  `PUT`

* **Request Headers**

  **Required:**

  ```
  {
    "access_token": "<your access token>"
  }
  ```
  
* **URL Params**

  **Required:**
   
  `id=[integer]`

* **Data Params**

  **Required:**
   
  `quantity=[integer]`,
  `ProductId=[integer]`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:**
    `{ msg : 'Successfully checkout products on your cart!' }`
}`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : "Internal server error!" }`

&nbsp;

**Update Cart Quantity Increment**
----
  Update increment quantity in cart based on its "id" on server.

* **URL**

  /carts/:id/incrementQuantity

* **Method:**
  
  `PATCH`

* **Request Headers**

  **Required:**

  ```
  {
    "access_token": "<your access token>"
  }
  ```
  
* **URL Params**

  **Required:**
   
  `id=[integer]`

* **Data Params**

  **Required:**
   
  `quantity=[integer]`,
  `ProductId=[integer]`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:**
    `{
    "id": 1,
    "checkout": "false",
    "quantity": 6,
    "ProductId": 1,
    "UserId": 3,
    "createdAt": "2020-11-17T14:31:33.968Z",
    "updatedAt": "2020-11-17T15:16:01.930Z"
}`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ msg : "Running out of stock product!" }`

  OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ msg : "Error not found!" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : "Internal server error!" }`

&nbsp;

**Update Cart Quantity Decrement**
----
  Update decrement quantity in cart based on its "id" on server.

* **URL**

  /carts/:id/decrementQuantity

* **Method:**
  
  `PATCH`

* **Request Headers**

  **Required:**

  ```
  {
    "access_token": "<your access token>"
  }
  ```
  
* **URL Params**

  **Required:**
   
  `id=[integer]`

* **Data Params**

  **Required:**
   
  `quantity=[integer]`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:**
    `{
    "id": 1,
    "checkout": "false",
    "quantity": 5,
    "ProductId": 1,
    "UserId": 3,
    "createdAt": "2020-11-17T14:31:33.968Z",
    "updatedAt": "2020-11-17T15:16:01.930Z"
}`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ msg : "Minimum quantity is 1!" }`

  OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ msg : "Error not found!" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : "Internal server error!" }`

&nbsp;
  
**Delete Cart**
----
  Delete a product data based on its "id" on server.

* **URL**

  /products/:id

* **Method:**
  
  `DELETE`

* **Request Headers**

  **Required:**

  ```
  {
    "access_token": "<your access token>"
  }
  ```
  
* **URL Params**

  **Required:**

  `id=[integer]`

* **Data Params**
   
   None

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:**
    `{ msg : 'Successfully delete a product!' }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ msg : "Error not found!" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : "Internal server error!" }`

&nbsp;

**Add To Wishlist**
----
  Add product data to wishlist.

* **URL**

  /wishlist

* **Method:**
  
  `POST`

* **Request Headers**

  **Required:**

  ```
  {
    "access_token": "<your access token>"
  }
  ```
  
* **URL Params**

  None

* **Data Params**

  **Required:**

  `ProductId=[integer]`

* **Success Response:**

  * **Code:** 201 CREATED <br />
    **Content:** `{
    "id": 1,
    "ProductId": 1,
    "UserId": 3,
    "createdAt": "2020-11-17T07:38:11.981Z",
    "updatedAt": "2020-11-17T07:38:11.981Z"
    }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ msg : "Already added in your wishlist!" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : "Internal server error!" }`

&nbsp;

**Read Wishlist**
----
  Returns all products in whislist.

* **URL**

  /wishlist

* **Method:**
  
  `GET`

* **Request Headers**

  **Required:**

  ```
  {
    "access_token": "<your access token>"
  }
  ```
  
* **URL Params**

  None

* **Data Params**
   
  None

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:**
    `[
    {
        "id": 1,
        "ProductId": 1,
        "UserId": 3,
        "createdAt": "2020-11-17T07:38:11.981Z",
        "updatedAt": "2020-11-17T07:38:11.981Z",
        "Product": {
            "id": 1,
            "name": "Kabinet Modular BESTA",
            "image_url": "https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/501/0350121_PE535204_S4.jpg",
            "description": "Kombinasi penyimpanan dengan laci, Lappviken putih",
            "price": 4300000,
            "stock": 5,
            "UserId": 1,
            "CategoryId": 3,
            "createdAt": "2020-11-10T15:33:00.570Z",
            "updatedAt": "2020-11-11T09:55:13.249Z",
            "Category": {
                "id": 3,
                "name": "Dapur",
                "UserId": 1,
                "createdAt": "2020-11-10T15:31:37.977Z",
                "updatedAt": "2020-11-10T15:31:37.977Z"
            }
        }
    },
    {
        "id": 3,
        "ProductId": 5,
        "UserId": 3,
        "createdAt": "2020-11-17T07:38:33.371Z",
        "updatedAt": "2020-11-17T07:38:33.371Z",
        "Product": {
            "id": 5,
            "name": "Meja TV HEMNES",
            "image_url": "https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/247/0824740_PE776188_S4.jpg",
            "description": "Kombinasi penyimpanan TV, hitam-cokelat/cokelat muda kaca bening",
            "price": 12497000,
            "stock": 5,
            "UserId": 1,
            "CategoryId": 1,
            "createdAt": "2020-11-10T18:12:48.405Z",
            "updatedAt": "2020-11-10T18:12:48.405Z",
            "Category": {
                "id": 1,
                "name": "Ruang Keluarga",
                "UserId": 1,
                "createdAt": "2020-11-10T15:31:37.977Z",
                "updatedAt": "2020-11-10T15:31:37.977Z"
            }
        }
    }
]`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : "Internal server error!" }`

&nbsp;
  
**Delete Whislist**
----
  Delete a product data based on its "id" in wishlist on server.

* **URL**

  /wishlist/:id

* **Method:**
  
  `DELETE`

* **Request Headers**

  **Required:**

  ```
  {
    "access_token": "<your access token>"
  }
  ```
  
* **URL Params**

  **Required:**

  `id=[integer]`

* **Data Params**
   
   None

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:**
    `{ msg : 'Successfully delete your wishlist product!' }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ msg : "Error not found!" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : "Internal server error!" }`

&nbsp;

**Read Products for customer**
----
  Returns all available products data.

* **URL**

  /productsCustomer

* **Method:**
  
  `GET`

* **Request Headers**

  **Required:**

  None
  
* **URL Params**

  None

* **Data Params**
   
  None

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:**
    `[
    {
    "id": 1,
    "name": "Kabinet Modular BESTA",
    "image_url": "https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/501/0350121_PE535204_S4.jpg",
    "description": "Kombinasi penyimpanan dengan laci, Lappviken putih",
    "price": 4300000,
    "stock": 5,
    "UserId": 1,
    "CategoryId": 1,
    "createdAt": "2020-11-10T15:33:00.570Z",
    "updatedAt": "2020-11-11T07:43:02.984Z",
    "Category": {
        "id": 1,
        "name": "Ruang Keluarga",
        "UserId": 1,
        "createdAt": "2020-11-10T15:31:37.977Z",
        "updatedAt": "2020-11-10T15:31:37.977Z"
      }
    }
    ]`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : "Internal server error!" }`

&nbsp;

**Read Categories for Customer**
----
  Returns all available categories data.

* **URL**

  /categoriesCustomer

* **Method:**
  
  `GET`

* **Request Headers**

  **Required:**

  None
  
* **URL Params**

  None

* **Data Params**
   
  None

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:**
    `[
    {
        "id": 1,
        "name": "Ruang Keluarga",
        "UserId": 1,
        "createdAt": "2020-11-10T06:28:15.150Z",
        "updatedAt": "2020-11-10T06:28:15.150Z"
    },
    {
        "id": 2,
        "name": "Kamar Tidur",
        "UserId": 1,
        "createdAt": "2020-11-10T06:28:15.150Z",
        "updatedAt": "2020-11-10T06:28:15.150Z"
    },
    {
        "id": 3,
        "name": "Dapur",
        "UserId": 1,
        "createdAt": "2020-11-10T06:28:15.150Z",
        "updatedAt": "2020-11-10T06:28:15.150Z"
    },
    {
        "id": 5,
        "name": "Kamar Mandi",
        "UserId": 1,
        "createdAt": "2020-11-10T07:56:04.792Z",
        "updatedAt": "2020-11-10T07:56:04.792Z"
    }
]`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : "Internal server error!" }`

&nbsp;