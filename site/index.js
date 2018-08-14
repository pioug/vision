import Match from "preact-router/match";
import Router from "preact-router";
import { h, render, Component } from "preact";

import "./style.scss";

const scrollTop = {};
const pushState = history.pushState;

history.pushState = function(a, b, url) {
  pushState.call(history, a, b, url);

  if (url.indexOf("#") < 0) {
    scrollTo(0, 0);
  }
};

window.onpopstate = function() {
  setTimeout(() => {
    document.body.scrollTop = scrollTop[location.pathname] || 0;
  });
};

window.addEventListener(
  "scroll",
  () => {
    scrollTop[location.pathname] = document.body.scrollTop;
  },
  { passive: true }
);

class Vision extends Component {
  render() {
    return (
      <main>
        <header>
          <div>
            <a href="/">Vision</a>
          </div>
        </header>
        <Router>
          <Home default path="/" />
        </Router>
      </main>
    );
  }
}

class Home extends Component {
  submit(e) {
    e.preventDefault();
    const url = encodeURIComponent(e.target[0].value);
    window.location.replace(`https://visionapi-aqfcntfagh.now.sh/?url=${url}`);
  }
  render() {
    return (
      <section>
        <form onSubmit={this.submit}>
          <label for="url">Enter an URL:</label>
          <input id="url" type="url" placeholder="http://www.example.com/"/>
          <button type="submit">Get screenshot</button>
        </form>
      </section>
    );
  }
}

render(<Vision />, document.body);
