# social-media-app
A MERN stack BE and FE in one repo

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


Using:
    - ES6 module. In package.json we set "type": "module". Therefore we use import syntax instead of require(). This also has iplications for the use of __dirname, which is not globally available (as all other global variables?). Instead we can do:
        export const rootDir = path.resolve(path.resolve()) in a utils/globals.js file for ex. 
    - multer for parsing files. bodyparser does not have that ability. have to add enctype='multipart/form-data' in submithandler on frontend when sending multi-type data (files and text together eg)(might not have to do this. Max does it in the view [before REST API] and I have a note saying new FormData(), which we are sending, will set headers automatically)
        

  Notes:
    CORS issues when using multiple ports on localhost (for different projects). Cors is set to allow port 3000 only, so need to change this if we are running on any other port unless I find a solution.
