$(document).ready(function(){
  updateClock();
  updateNews();
  setInterval(updateClock,1000);
  setInterval(updateNews,60000);

  var appStorage = new appStorageController();
  var contentManager = new contentManagerController(appStorage);
  
  contentManager.showHeadLine();
  contentManager.showThinkPadList();
  
  var editMode = false;
  $("#thinkPadInputField").keydown(function(event){
    if(event.keyCode === 13){
      event.preventDefault();
      var thinkPadContent = $("#thinkPadInputField").text();
      $(this).blur();
      window.getSelection().removeAllRanges();
      contentManager.addToThinkPadList(thinkPadContent);
      $("#thinkPadInputField").html("");
      return false;
    }  
    }
  );

  
  $("#headLine").keydown(function(event){
    if(event.keyCode == 13){
        event.preventDefault();
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


//Controllers are below
var contentManagerController = function(appStorage){
  this.showHeadLine = function(){ 
    $("#headLine").html(appStorage.getHeadLine()); 
  }

  this.showThinkPadList = function(){
    var thinkPadItems = appStorage.getThinkPadItems();
    console.log(thinkPadItems);
    //thinkPadItems.forEach(function(e){
    //  this.addToThinkPadList(e)
   // })
  }
  this.addToThinkPadList = function(content){
    $("#thinkPadList").append("<div class='thinkPadListItem'>"+content+"</div>");
  }
}

//Ohter contollers 
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


// Storage Controller 
var appStorageController = function(){
  var myStorage = localStorage;
  if(myStorage.getItem("headLine")===null || myStorage.getItem("headLine").length===0){
    myStorage.setItem("headLine", "Another day in paradise");
  }  
  
  if(myStorage.getItem("thinkPadItems")===null || myStorage.getItem("thinkPadItems").length===0){
    myStorage.setItem("thinkPadItems", "hello");
  }  
  
  
  this.setHeadLine = function(headline){
    myStorage.setItem("headLine",headline);
  }
  
  this.getHeadLine = function(){ 
    return myStorage.getItem("headLine");
  }
  
  this.setThinkPad = function(list){
    myStorage.setItem("thinkPadItems",list);
  }
  
  this.addThinkPadItem = function(content){
    var itemList = this.getThinkPadItems();
    itiemList.push(content);
    this.setThinkPad(itemList);
  }
  this.getThinkPadItems = function(){
    return myStorage.getItem("thinkPadItems");
  }
}


