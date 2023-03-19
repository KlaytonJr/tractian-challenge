<p align="center">
    <img width="250" src="./src/assets/img/tractian-logo.png" />
</p>

# Tractian Challenge

This project I developed for Tractian Challenge using React.js with TypeScript.

## 🚀 Technologies

### This project was developed with the followings technologies:

<ul>
  <li>React.js</li>
  <li>HTML</li>
  <li>CSS</li>
  <li>TypeScript</li>
</ul>

### Other technologies:

<ul>
  <li>Graphics (Highcharts)</li>
  <li>AntDesign React</li>
  <li>React Router Dom</li>
</ul>

Link of challenge [Tractian Front-end Challenge](https://tractian.notion.site/Front-End-Software-Engineer-cf7f9a91d97647abaf99b2565f8ae8fa)

You can view the project through this link <a href="https://klaytonjr.github.io/Nubank-Redesign/">Click here</a>

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

By default use [https://my-json-server.typicode.com/tractian/fake-api](https://my-json-server.typicode.com/tractian/fake-api)

But can run the fake-api locally, you need to change the baseURL 
```ts
import axios from 'axios';

const api = axios.create({
    baseURL: "https://my-json-server.typicode.com/tractian/fake-api"
    // baseURL: "http://localhost:7000"
})

export default api;
```
And run ```json-server --port 7000 --watch db.json```
# tractian-challenge
