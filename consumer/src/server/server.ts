import express from 'express';
import path from 'path';
import { refractCmsHandler, extendSchema } from '@refract-cms/server';
import config from '../refract-cms/refract.config';
import { NewsArticleSchema } from '../refract-cms/news/news-article.model';
import { RefractTypes } from '@refract-cms/core';
import { ProductSchema, Product } from '../refract-cms/products/product.model';

const app = express();

app.use(
  ...refractCmsHandler({
    rootPath: '/cms',
    config,
    serverConfig: {
      mongoConnectionString: 'mongodb://localhost:27018/refract-consumer-example',
      filesPath: 'consumer/files/',
      auth: {
        adminCredentials: {
          username: 'admin',
          password: 'pw'
        },
        jwt: {
          issuer: 'consumer',
          secret: 'secret'
        }
      },
      schemaExtensions: [
        extendSchema<Product, { someVar: string }>(ProductSchema, {
          someVar: {
            type: RefractTypes.string,
            resolve: product => `${product._id}_hello !`
          }
        })
      ]
    }
  })
);

app.get('/*', express.static(path.resolve(__dirname, '..', '..', 'dist')));

app.get('*', (req, res) => {
  const application = ''; // renderToString(<App />);
  const config = {
    umbracoUrl: 'https://localhost:44300',
    umbracoMasterUrl: 'https://localhost:44300',
    apiUrl: '',
    newsUrl: 'http://localhost:3000',
    searchApiUrl: '',
    newsBasePath: '/news'
  };
  const html = `<!doctype html>
    <html class="no-js" lang="">
        <head>
            <meta charset="utf-8">
            <meta http-equiv="x-ua-compatible" content="ie=edge">
            <title>Refract-CMS Consumer</title>
            <meta name="description" content="">
            <meta name="viewport" content="width=device-width, initial-scale=1">
        </head>
        <body>
          <script>
            window.config = ${JSON.stringify(config)}
          </script>
            <div id="app">${application}</div>
            <script src="http://localhost:3001/client.js"></script>
        </body>
    </html>`;

  res.send(html);
});

export default app;
