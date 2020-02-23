# React XKCD

<img src="https://i.imgur.com/Wh8J9mX.gif" />

Let's build a fun Single Page Application backed by a real API. We will recreate [xkcd.com](xkcd.com) using React and the [xkcd json api](https://xkcd.com/json.html).

To accomplish this, we will need to make some network requests with [axios](https://github.com/axios/axios), manage them with `useEffect` and `useState`, and learn what CORS is.

## Goals

* [x] Be respectful of the limits of the cors-anywhere and xkcd api.
* [x] Recreate the core functionality of [xckd.com](xkcd.com).
  * [x] See the most recent comic on page load.
  * [x] Go to next comic.
  * [x] Go to previous comic.
  * [x] Go to first comic.
  * [x] Go to most recent comic.
  * [x] Go to random comic.
* [x] Display the comic image, title, and alt text.

## Stretch Goals

* [ ] Use [react-router](https://reacttraining.com/react-router/web/guides/quick-start), or another routing solution, handle navigating to comics by id.
* [x] Setup [cors anywhere](https://github.com/Rob--W/cors-anywhere) locally.
* [x] Disable comic navigation buttons depending on context. (ex. It doesn't make sense to go to the next comic when you are at the lastest one).
* [x] Try initiating your requests directly with functions (ex. `fetchLastestComic()`) or via `useEffect` (ex. `useEffect(() => { axios(...) }, [comicNumber])`).

## Notes

* [xkcd](https://xkcd.com) &copy; by Randall Munroe
* CORS (Cross-Origin Resource Sharing) is a _browser_ feature that allows servers to specify which websites are allowed to make requests  to access their content.

API's will use this feature to prevent other websites from interacting with them. For example, your bank's api will reject requets from evilwebsite.example.com.

It is possible to lie what website we are making the request from, or saying we are not a website at all. However, the web browser will not let us do this directly.

A common reason API's will use CORS is because they require a secret key to access. These secrets should never be used directly inside an SPA, as there is nothing preventing a user from copying them.

Instead, the intention is for us to create our own API that the browser calls which will then proxy the request, with the secret and as not coming from a website (therefor not triggering CORS), and return the data.

[cors anywhere](https://github.com/Rob--W/cors-anywhere) is a general purpose server that will do this proxying for us. Thankfully, the developers have a hosted version for us to use for simple projects like this https://cors-anywhere.herokuapp.com/.

It is important to recognize that this is a free tool, and we should not abuse it with large numbers of requests. It is very easy to run on your own machine for development purposes.

## Install and Use

To run and edit the project, clone the project to your computer, `cd` into the project directory and follow the instructions below for your javascript pacakge manager of choice.

### yarn

In the project directory run `yarn install` to install the depenencies, and `yarn start` to star the development server. It should open a browser tab to `localhost:3000`.

### npm

In the project directory run `npm install` to install the depenencies, and `npm start` to star the development server. It should open a browser tab to `localhost:3000`.
