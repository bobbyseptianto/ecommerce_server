# E-Commerce CMS Server

## RESTful endpoints
**Login**
----
  Login on server.

* **URL**

  /login

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