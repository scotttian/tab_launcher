$(document).ready(function(){
  updateClock();
  updateNews();
  setInterval(updateClock,1000);
  setInterval(updateNews,60000);
})

var updateClock = function(){
  var now = new Date(Date.now());
  var hours =  now.getHours()<10 ? "0"+now.getHours(): now.getHours();
  var minutes = now.getMinutes()<10 ? "0"+now.getMinutes(): now.getMinutes();
  var formattedTime = hours +" : "+ minutes;
  $(".time").html(formattedTime);
};


var getJson = function(url,callback){                                                                       var xhr = new XMLHttpRequest();
  xhr.open("get",url,true);
  xhr.responseType = "json";
  xhr.onload = function(){
    var status = xhr.status;
    if (status == 200){
      callback(xhr.response);
    }else{
      callback(status);
    }
  }
  xhr.send();
}

var updateNews = function(){
  getJson("https://newsapi.org/v1/articles?source=bloomberg&apiKey=500287b5dffd4862927ef31028309f91",function(data){
    var news_data = data.articles;
    var news_html = "";
    var limit = 5;
    news_data.forEach(function(news,i){
      if(i<limit){ 
        news_html += "<div class='news_block'><a class='news_content' href="+news.url+">"+news.title+"</a></div>";}
    })
    $(".news").html(news_html);
  }); 
}


