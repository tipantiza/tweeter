
$(document).ready(function() {
  /*
   * Client-side JS logic goes here
   * jQuery is already loaded
   * Reminder: Use (and do all your DOM work in) jQuery's document ready function
   */
  
  
  $('form.new-tweet').submit(function(event) {
    event.preventDefault();
    const data = $(this).serialize();
    const decodedData = decodeURIComponent(data).slice(5);
    $("#error-message").slideUp(()=>{
      $("#error-messages").empty();
    });
    if (!decodedData) {
      const message =  "🔺Woah Woah, slow down there buckaroo, plz type something in! 🔺";
      renderAlert(message);
    } else if (decodedData.length > 140) {
      const message = "🔺Woah Woah, slow down there buckaroo, plz rspct our arbitrary limit of 140 chars 🔺";
      renderAlert(message);
    } else {
      $.post('/tweets/',
        data,
        function() {
          loadTweets();
        });
    }
  });

  const renderAlert = function(alert) {
    $("#error-messages").prepend(
      `<div id="error-message">
      ${alert}
      </div> `
    );
    if ($("#error-message").first().is(":hidden")) {
      $("#error-message").slideDown();
    }
  };

  const loadTweets = function() {
    $.getJSON('/tweets/',
      function(data) {
        $('#tweets-container').empty();
        renderTweets(data);
      });
  
  };

  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').prepend($tweet);
    }
  };

  const createTweetElement = function(tweet) {
    const name = tweet.user.name;
    const avatar = tweet.user.avatars;
    const handle = tweet.user.handle;
    const text = tweet.content.text;
    const created_at = tweet.created_at;
    const tweetArticle = `
      <article>
          <header id="tweet-profile" class="align-text-a">
            <div class="avatar-name">
              
              <img id="avatar" src="${avatar}" alt="prfil picture cartoon pixel">
              <p>
                ${name}
              </p>
            </div>
            <p class="tag-Name">
              ${handle}
            </p>
          </header>
          <footer>
            <div class="footerBox a align-text-a">
              ${escape(text)}
            </div>
            <div class="footerBox b">
              <p class="align-text-b">${created_at}</p>
              <p class="align-text-b">⚑ ↩︎ ♥︎</p>
            </div>
          </footer>
        </article>
      `;
    return tweetArticle;
  };

  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };


  loadTweets();
});
