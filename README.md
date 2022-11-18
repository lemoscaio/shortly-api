<!-- HEADER -->
<div>
<div align="center">
  <img  src="https://i.imgur.com/7WZ2o8a.png"
    width=100%" >
</div>
<br>
<h1 align="center">
  Shortly - API
</h1>
<div align="center">
  <h3>Built With</h3>
  <img alt="NodeJS badge" src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" height="30px"/>  
  <img alt="ExpressJS badge" src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express.js&logoColor=white" height="30px"/>
  <img alt="MongoDB badge" src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" height="30px"/>
  <img alt="Heroku badge" src="https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white" height="30px"/>
  <!-- Badges source: https://dev.to/envoy_/150-badges-for-github-pnk -->
</div>
<br/>
</div>

<!-- CONTENT -->
## Description

Shortly is an API for a URL shortener application.

It was the 16ᵗʰ project of the Driven Full Stack Bootcamp.

## Features

- Shorten any URL
- Keep track of the visit count
- User authentication (sign-up and sign-in) to store all the user's URLs
- Redirects to the correct URL stored in the database
- All data stored in a SQL database (PostgreSQL)
- Layered architecture (controllers, middlewars, services, etc)
- User ranking with visit count in all URLs
- All the entries are validated against schemas (with a single middleware)

## API Reference

  ### Users

  * #### Create new user

    ```http
    POST /signup
    ```

    ##### Request body:

    | Body              | Type     | Description                               |
    | :---------------- | :------- | :---------------------------------------- |
    | `name`            | `string` | **Required** - Valid name                 |
    | `email`           | `string` | **Required** - Valid email                |
    | `password`        | `string` | **Required** - Password `length: 6 to 20` |
    | `confirmPassword` | `string` | **Required** - Must match the password    |

    ##### Example: 

    ```json
    {
      "name": "João",
      "email": "joao@email.com",
      "password": "joaopassword",
      "confirmPassword": "joaopassword"
    }
    ```

  * #### Login user

    ```http
    POST /signin
    ```

    ##### Request body:

    | Body       | Type     | Description                               |
    | :--------- | :------- | :---------------------------------------- |
    | `email`    | `string` | **Required** - Valid email                |
    | `password` | `string` | **Required** - Password `length: 6 to 20` |

    ##### Example: 

    ```json
    {
      "email": "joao@email.com",
      "password": "joaopassword",
    }
    ```

    ##### Response:

    ```json
    {
      "token": "string"
    }
    ```

  * #### Get URLs from specific User

    ```http
    GET /users/{id}
    ```

    ##### Path parameters:

    | Parameter | Description            |
    | :-------- | :--------------------- |
    | `id`      | **Required** - User id |

    ##### Headers:

    | Name            | Description                       |
    | :-------------- | :-------------------------------- |
    | `authorization` | **Required** - "Bearer {{token}}" |

    #### Response:

    ```json
    {
      "id": 1,
      "name": "Caio Lemos",
      "visitCount": 5,
      "shortenedUrls": [
        {
          "id": 2,
          "shortUrl": "kOwvE5xBh-",
          "url": "https://www.youtube.com/@GraduacaoNerd",
          "visitCount": 5
        },
        {
          "id": 3,
          "shortUrl": "x5-Iaj52_e",
          "url": "https://www.youtube.com/watch?v=d8zXQA5Za9M",
          "visitCount": 0
        }
      ]
    }
    ```

  ### URLs

  * #### Shorten a URL

    ```http
    POST /urls/shorten
    ```

    ##### Request body:

    | Body  | Type     | Description              |
    | :---- | :------- | :----------------------- |
    | `url` | `string` | **Required** - Valid URL |

    ##### Example: 

    ```json
    {
      "url": "http(s)://...",
    }
    ```

    ##### Headers:

    | Name            | Description                       |
    | :-------------- | :-------------------------------- |
    | `authorization` | **Required** - "Bearer {{token}}" |

    ##### Response:

    ```json
    {
      "shortUrl": "kOwvE5xBh-"
    }
    ```

  * #### Get URL by ID

    ```http
    GET /urls/{id}
    ```

    ##### Path parameters:

    | Parameter | Description           |
    | :-------- | :-------------------- |
    | `id`      | **Required** - URL id |

    ##### Response: 
    
    ```json
    {
      "id": 1,
      "shortUrl": "bd8235a0",
      "url": "http(s)://..."
    }
    ```
    
  * #### Open URL from short URL

    ```http
    GET /urls/open/{shortUrl}
    ```

    ##### Path parameters:

    | Parameter  | Description                       |
    | :--------- | :-------------------------------- |
    | `shortUrl` | **Required** - Existing short url |

    ##### Response:

    `Redirects to the full URL and increments the visitCount.`

  * #### Delete a shortened URL

    ```http
    DELETE /urls/{id}
    ```

    ##### Path parameters:

    | Parameter | Description           |
    | :-------- | :-------------------- |
    | `id`      | **Required** - URL id |

    ##### Headers:

    | Name            | Description                       |
    | :-------------- | :-------------------------------- |
    | `authorization` | **Required** - "Bearer {{token}}" |

  ### Ranking

  * #### Get the the users visit count ranking

    ```http
    GET /ranking
    ```

    ###### Reponse:
  
    ```json
    [
      {
        "id": 2,
        "name": "user1",
        "linksCount": 5,
        "visitCount": 100000
      },
      {
        "id": 4,
        "name": "user3",
        "linksCount": 3,
        "visitCount": 85453
      },
      {
        "id": 9,
        "name": "user2",
        "linksCount": 10,
        "visitCount": 0
      },
      {
        "id": 14,
        "name": "user9",
        "linksCount": 0,
        "visitCount": 0
      }
    ]
    ```

## Run Locally

Clone the project:

```bash
git clone https://github.com/lemoscaio/shortly-api.git
```

Go to the project directory:

```bash
cd shortly-api
```

Install dependencies:

```bash
npm install
```

Set up the environment variables in the `.env` file, using the `.env.example`.

Make sure the PostgreSQL server is running and available.

Start the server:

```bash
node index.js
```

## Lessons Learned

In this project I learned the following:

* to use a SQL database and persist relational data between tables
* to use SQL constraints on the tables to guarantee the application logic is correct
* to build a URL shortener from scratch
* to use more types of Joins in a SQL database
* to store some useful data within the 
* to use a layered architecture to build the application (dividing it in controllers, middlewares, services, etc)
* to protect the application from SQL injection
* to create an unique middleware that validates all types of schemas

## Acknowledgements

-   [Awesome Badges](https://github.com/Envoy-VC/awesome-badges)