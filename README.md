# social-media-app
#A MERN stack BE and FE in one repo
Backend of social media MERN stack project

![project-image1](https://user-images.githubusercontent.com/60953822/172692414-d6214bba-74bb-40d9-a5e8-81ab8719fa4a.jpg)

![project-image2](https://user-images.githubusercontent.com/60953822/172692409-71ac59df-071a-41a0-b6dd-7d4dfba733bf.jpg)

![project-image3](https://user-images.githubusercontent.com/60953822/172690728-af434ae9-f231-4c23-b300-e4659d859324.jpg)



To run the app:

- npm i
- Create a nodemon.json file for env variables with:
{
  "env": {
    "DB_USER": "mongodb user",
    "DB_PASSWORD": "",
    "DB_NAME": "name of collection in mongodb",
    "PORT": 8080 or whatever you prefer,
    "JWT_SECRET": "somerandomlongstring"
  }
}
- In package.json, change the start script to nodemon from node.
- npm start.
- Can use Postman for testing.

