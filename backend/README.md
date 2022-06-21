Create a nodemon.json file for env variables with:
{
  "env": {
    "DB_USER": "mongodb user",
    "DB_PASSWORD": "",
    "DB_NAME": "name of collection in mongodb",
    "PORT": 8080 or whatever you prefer,
    "JWT_SECRET": "somerandomlongstring"
  }
}

In package.json, change the start script to nodemon from node.


Using:
    - ES6 module. In package.json we set "type": "module". Therefore we use import syntax instead of require(). This also has iplications for the use of __dirname, which is not globally available (as all other global variables?). Instead we can do:
        export const rootDir = path.resolve(path.resolve()) in a utils/globals.js file for ex. 
    - multer for parsing files. bodyparser does not have that ability. have to add enctype='multipart/form-data' in submithandler on frontend when sending multi-type data (files and text together eg)(might not have to do this. Max does it in the view [before REST API] and I have a note saying new FormData(), which we are sending, will set headers automatically)
        
