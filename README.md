# ProjectGuestara

## Project Structure

```
.
├── .env
├── .env.example 
├── .gitignore
├── controllers/
│   ├── categoryController.js
│   ├── itemController.js
│   └── subCategoryController.js
├── index.js
├── models/
│   ├── category.js
│   ├── items.js
│   └── subCategory.js
├── package.json
├── README.md
├── routes/
│   ├── categoryRoutes.js
│   ├── itemRoutes.js
│   └── subCategoryRoutes.js
└── vercel.json
```

## API Documentation

## Forking and Running the Application

### Forking the Repository

1. Go to the repository page on GitHub.
2. Click the "Fork" button in the top-right corner of the page.
3. Select your GitHub account to fork the repository.

### Cloning the Repository

1. Open your terminal or command prompt.
2. Clone the repository using the following command:
   ```sh
   git clone https://github.com/your-username/ProjectGuestara.git
   ```
3. Navigate to the project directory:
   ```sh
   cd ProjectGuestara
   ```

### Installing Dependencies

1. Ensure you have Node.js and npm installed on your machine.
2. Install the required dependencies using npm:
   ```sh
   npm install
   ```

### Running the Application

1. Start the application using the following command:
   ```sh
   npm start
   ```
2. The application should now be running at `http://localhost:5000`.

3. A Postman collection  is provided, you can import it in postman and create an environment variable with the URL of the app and test all the APIs.

### Environment Variables

1. Create a `.env` file in the root directory of the project.
2. Add the necessary environment variables as specified in the `.env.example` file.

### Deployed Version

A deployed version of the application is available on Vercel:
[https://project-guestara.vercel.app/](https://project-guestara.vercel.app/)

> [!WARNING]
>This can be slow as the Vercel service is free and located in the US.*

### Base URL
```
http://localhost:5000
```

### Endpoints

#### Categories

##### Create Category
- **URL:** `/category/create`
- **Method:** `POST`
- **Description:** Creates a new category.
- **Request Body:**
  ```json
  {
    "name": "string",
    "image": "string",
    "description": "string",
    "taxApplicability": "boolean",
    "tax": "number",
    "taxType": "string"
  }
  ```
- **Response:**
  - **201 Created:** Category created successfully.
  - **400 Bad Request:** Error encountered while creating category.

##### Get Categories
- **URL:** `/category/find`
- **Method:** `GET`
- **Description:** Retrieves categories.
- **Query Parameters:**
  - `page` (optional): Page number for pagination.
  - `limit` (optional): Number of items per page.
  - `categoryName` (optional): Name of the category to search.
  - `categoryId` (optional): ID of the category to search.
> [!IMPORTANT]
> Other than page and limit only one parameter should be chosen for result, as mentioned in the tasks documentation.
- **Response:**
  - **200 OK:** Categories retrieved successfully.
  - **400 Bad Request:** Error encountered while getting categories.

##### Edit Category
- **URL:** `/category/:categoryId`
- **Method:** `PUT`
- **Description:** Edits an existing category.
- **Request Body:**
  ```json
  {
    "name": "string",
    "image": "string",
    "description": "string",
    "taxApplicability": "boolean",
    "tax": "number",
    "taxType": "string"
  }
  ```
- **Response:**
  - **200 OK:** Category updated successfully.
  - **400 Bad Request:** Error encountered while updating category.
  - **404 Not Found:** Category not found.

#### SubCategories

##### Create SubCategory
- **URL:** `/subCategory/create`
- **Method:** `POST`
- **Description:** Creates a new subcategory.
- **Request Body:**
  ```json
  {
    "name": "string",
    "image": "string",
    "description": "string",
    "taxApplicability": "boolean",
    "tax": "number",
    "category": "string (Category ID)"
  }
  ```
- **Response:**
  - **201 Created:** SubCategory created successfully.
  - **400 Bad Request:** Error encountered while creating subCategory.

##### Get SubCategories
- **URL:** `/subCategory/find`
- **Method:** `GET`
- **Description:** Retrieves subcategories.
- **Query Parameters:**
  - `page` (optional): Page number for pagination.
  - `limit` (optional): Number of items per page.
  - `subCategoryId` (optional): ID of the subcategory to search.
  - `subCategoryName` (optional): Name of the subcategory to search.
  - `categoryName` (optional): Name of the category to search.
> [!IMPORTANT]
> Other than page and limit only one parameter should be chosen for result, as mentioned in the tasks documentation.
- **Response:**
  - **200 OK:** SubCategories retrieved successfully.
  - **400 Bad Request:** Error encountered while finding subCategories.

##### Edit SubCategory
- **URL:** `/subCategory/:subCategoryId`
- **Method:** `PUT`
- **Description:** Edits an existing subcategory.
- **Request Body:**
  ```json
  {
    "name": "string",
    "image": "string",
    "description": "string",
    "taxApplicability": "boolean",
    "tax": "number",
    "category": "string (Category ID)"
  }
  ```
- **Response:**
  - **200 OK:** SubCategory updated successfully.
  - **400 Bad Request:** Error encountered while updating subCategory.
  - **404 Not Found:** SubCategory not found.

#### Items

##### Create Item
- **URL:** `/item/create`
- **Method:** `POST`
- **Description:** Creates a new item.
- **Request Body:**
  ```json
  {
    "name": "string",
    "image": "string",
    "description": "string",
    "taxApplicability": "boolean",
    "tax": "number",
    "baseAmount": "number",
    "discount": "number",
    "category": "string (Category ID)",
    "subCategory": "string (SubCategory ID)"
  }
  ```
- **Response:**
  - **201 Created:** Item created successfully.
  - **400 Bad Request:** Error encountered while adding Item data.

##### Get Items
- **URL:** `/item/find`
- **Method:** `GET`
- **Description:** Retrieves items.
- **Query Parameters:**
  - `page` (optional): Page number for pagination.
  - `limit` (optional): Number of items per page.
  - `itemId` (optional): ID of the item to search.
  - `itemName` (optional): Name of the item to search.
  - `subCategoryName` (optional): Name of the subcategory to search.
  - `categoryName` (optional): Name of the category to search.
>[!IMPORTANT]
> Other than page and limit only one parameter should be chosen for result, as mentioned in the tasks documentation.
- **Response:**
  - **200 OK:** Items retrieved successfully.
  - **400 Bad Request:** Error encountered while finding Item/s.

##### Edit Item
- **URL:** `/item/:itemId`
- **Method:** `PUT`
- **Description:** Edits an existing item.
- **Request Body:**
  ```json
  {
    "name": "string",
    "image": "string",
    "description": "string",
    "taxApplicability": "boolean",
    "tax": "number",
    "baseAmount": "number",
    "discount": "number",
    "category": "string (Category ID)",
    "subCategory": "string (SubCategory ID)"
  }
  ```
- **Response:**
  - **200 OK:** Item updated successfully.
  - **400 Bad Request:** Error encountered while updating Item Data.
  - **404 Not Found:** Item not found.

##### Search Item
- **URL:** `/item/search`
- **Method:** `GET`
- **Description:** Searches for items by name.
- **Query Parameters:**
  - `itemName` (required): Name of the item to search.
- **Response:**
  - **200 OK:** Items found successfully.
  - **400 Bad Request:** Error encountered while searching Item Data.

### Error Responses
- **400 Bad Request:** The request could not be understood or was missing required parameters.
- **404 Not Found:** Resource was not found.
- **500 Internal Server Error:** An error occurred on the server.

### Example Requests

#### Create Category
```sh
curl -X POST http://localhost:5000/category/create -H "Content-Type: application/json" -d '{
  "name": "Beverages",
  "image": "beverages.jpg",
  "description": "All kinds of beverages",
  "taxApplicability": true,
  "tax": 10,
  "taxType": "percentage"
}'
```

#### Get Categories
```sh
curl -X GET http://localhost:5000/category/find?page=1&limit=10
```

#### Edit Category
```sh
curl -X PUT http://localhost:5000/category/60d5ec49f1e4c2b1c8e4b1e1 -H "Content-Type: application/json" -d '{
  "name": "Updated Beverages",
  "image": "updated_beverages.jpg",
  "description": "Updated description",
  "taxApplicability": true,
  "tax": 15,
  "taxType": "percentage"
}'
```

#### Create SubCategory
```sh
curl -X POST http://localhost:5000/subCategory/create -H "Content-Type: application/json" -d '{
  "name": "Soft Drinks",
  "image": "soft_drinks.jpg",
  "description": "All kinds of soft drinks",
  "taxApplicability": true,
  "tax": 5,
  "category": "60d5ec49f1e4c2b1c8e4b1e1"
}'
```

#### Get SubCategories
```sh
curl -X GET http://localhost:5000/subCategory/find?page=1&limit=10
```

#### Edit SubCategory
```sh
curl -X PUT http://localhost:5000/subCategory/60d5ec49f1e4c2b1c8e4b1e2 -H "Content-Type: application/json" -d '{
  "name": "Updated Soft Drinks",
  "image": "updated_soft_drinks.jpg",
  "description": "Updated description",
  "taxApplicability": true,
  "tax": 7,
  "category": "60d5ec49f1e4c2b1c8e4b1e1"
}'
```

#### Create Item
```sh
curl -X POST http://localhost:5000/item/create -H "Content-Type: application/json" -d '{
  "name": "Coca Cola",
  "image": "coca_cola.jpg",
  "description": "Refreshing soft drink",
  "taxApplicability": true,
  "tax": 5,
  "baseAmount": 50,
  "discount": 5,
  "category": "60d5ec49f1e4c2b1c8e4b1e1",
  "subCategory": "60d5ec49f1e4c2b1c8e4b1e2"
}'
```

#### Get Items
```sh
curl -X GET http://localhost:5000/item/find?page=1&limit=10
```

#### Edit Item
```sh
curl -X PUT http://localhost:5000/item/60d5ec49f1e4c2b1c8e4b1e3 -H "Content-Type: application/json" -d '{
  "name": "Updated Coca Cola",
  "image": "updated_coca_cola.jpg",
  "description": "Updated description",
  "taxApplicability": true,
  "tax": 7,
  "baseAmount": 55,
  "discount": 5,
  "category": "60d5ec49f1e4c2b1c8e4b1e1",
  "subCategory": "60d5ec49f1e4c2b1c8e4b1e2"
}'
```

#### Search Item
```sh
curl -X GET http://localhost:5000/item/search?itemName=Coca Cola
```