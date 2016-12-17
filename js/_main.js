$(document).ready(function(){
  updateClock();
  updateNews();
  setInterval(updateClock,1000);
  setInterval(updateNews,60000);

  var appStorage = new appStorageController();
  var contentManager = new contentManagerController(appStorage);
  
  contentManager.showHeadLine();

  var editMode = false;

  $("#headLine").keydown(function(event){
    if(event.keyCode == 13){
      event.preventDefault();
      return false;
    }
  });
  $("#headLine").keyup(function(event){
    if(event.keyCode == 13){
        //event.preventDefault();
        //document.execCommand('insertHTML', false, '<br><br>');
        var new_content = $("#headLine").text();
        appStorage.setHeadLine(new_content);
        $(this).blur();
        window.getSelection().removeAllRanges();
        return false;
    }
  });
  $("#headLine").blur(function(){
    contentManager.showHeadLine();
  });
})

var contentManagerController = function(appStorage){
  this.showHeadLine = function(){ 
    $("#headLine").html(appStorage.getHeadLine()); 
  }
}

var updateClock = function(){
  var now = new Date(Date.now());
  var hours =  now.getHours()<10 ? "0"+now.getHours(): now.getHours();
  var minutes = now.getMinutes()<10 ? "0"+now.getMinutes(): now.getMinutes();
  var formattedTime = hours +":"+ minutes;
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


var appStorageController = function(){
  var myStorage = localStorage;
  if(myStorage.getItem("headLine")===null || myStorage.getItem("headLine").length===0){
    myStorage.setItem("headLine", "Another day in paradise");
  }  

  this.setHeadLine = function(headline){
    myStorage.setItem("headLine",headline);
  }
  
  this.getHeadLine = function(){ 
    return myStorage.getItem("headLine");
  }
}


