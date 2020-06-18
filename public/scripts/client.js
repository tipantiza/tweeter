/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function(){

  // $.ajax({
  //   type: "POST",
  //   url: url,
  //   data: data,
  //   success: success,
  //   dataType: dataType
  // });

  
  $('form.new-tweet').submit(function(event) {
    event.preventDefault();
    const data = $(this).serialize();
    const decodedData = decodeURIComponent(data).slice(5)

    if(!decodedData){
      alert("Please type a message")
    } else if(decodedData.length > 140){
      alert("Message is too long, please type something less then 140 characters")
    } else {
      $.post('/tweets/', 
      data, 
      function(){
        console.log("success");
      })

    }
  })

  const loadTweets = function () {
      $.getJSON('/tweets/', 
        function(data){
          console.log(data);
          renderTweets(data)
      })
  
  }

  const renderTweets = function(tweets){
    for (tweet of tweets){
      const $tweet = createTweetElement(tweet)
      $('#tweets-container').prepend($tweet)
    }
  }


   const createTweetElement = function(tweet){
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
              ${text}
            </div>
            <div class="footerBox b">
              <p class="align-text-b">${created_at}</p>
              <p class="align-text-b">⚑ ↩︎ ♥︎</p>
            </div>
          </footer>
        </article>
      `;
      return tweetArticle;
    }
    loadTweets();
 })
