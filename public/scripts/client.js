
$(document).ready(function() {
  /*
   * Client-side JS logic goes here
   * jQuery is already loaded
   * Reminder: Use (and do all your DOM work in) jQuery's document ready function
   */

  //write a new tweet functionality to display compose tweet form if clicked or to hide it
  $('.doubleDown').click(function() {

    if ($(".new-tweet").first().is(":hidden")) {
      $(".new-tweet").slideDown('slow');
      $("textarea").focus();
    } else {
      $(".new-tweet").slideUp('slow');
    }
  });

  //form submission using ajax and render alerts if needed
  $('form.new-tweet').submit(function(event) {
    event.preventDefault();
    const data = $(this).serialize();
    const decodedData = decodeURIComponent(data).slice(5);
    $("#error-message").slideUp();
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
          $("textarea").val('').change();
          $(".counter").val("140").change();
          $("textarea").focus();
        });
    }
   
  });

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
    const createdAt = moment(tweet.created_at).fromNow();
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
    <p class="align-text-b">${createdAt}</p>
    <p class="align-text-b tag-Name">⚑ ↩︎ ♥︎</p>
    </div>
    </footer>
    </article>
    `;
    return tweetArticle;
  };
  
  //helper function to render tweets with proper message
  const renderAlert = function(alert) {
    $("#error-messages").empty();
    $("#error-messages").prepend(
      `<div id="error-message">
      ${alert}
      </div> `
    );
    if ($("#error-message").first().is(":hidden")) {
      $("#error-message").slideDown();
    }
  };

  //prevent untrusted user to "hack" //helper function 
  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  
  loadTweets();
});
