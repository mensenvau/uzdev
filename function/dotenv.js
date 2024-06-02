// import .env file.
if (process.env.NODE_ENV == 'production' || process.env.NODE_ENV == 'development') {
    require('dotenv').config({ path: `./.env.${process.env.NODE_ENV}` });
} else {
    require('dotenv').config({ path: `./.env` });
}