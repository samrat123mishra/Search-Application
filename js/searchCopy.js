var indexOfSearch=[];
var arrItem=[];
function finIndexOfSeachedItem(searchString, str,status) {
    var strLength=str.length;
    var searchStringLength = searchString.length;
    var searchStringCpy=searchString;
    var strCpy=str;
    if(status==true){
    strCpy=strCpy.toLowerCase();
    searchStringCpy=searchStringCpy.toLowerCase();
   }
    if(strCpy.indexOf(searchStringCpy) !== -1)
    {
      var index=strCpy.indexOf(searchStringCpy);
      var last=(indexOfSearch[(indexOfSearch.length-1)]==null)?0:(indexOfSearch[(indexOfSearch.length-1)]+searchStringLength);
      indexOfSearch.push(index +last);
      index += searchStringLength;
      strCpy=strCpy.substr(index,strLength);
      finIndexOfSeachedItem(searchStringCpy, strCpy,status);
    }
  return indexOfSearch;
}

//returns an array of searched items
function seachedItems(arr,itemLength,str,status){
  var arrLength = arr.length;
  var str1=str;
  for(var i=0;i<arrLength;i++){
    var firstIdx=parseInt(arr[i]);
    arrItem.push(str1.substr(firstIdx-1,itemLength));
  }
  highlightSearchedItem(arr,arrItem,itemLength,str,status);
}

//returns a string replacing the item with mark tag
function highlightSearchedItem(arrOfIndex,arrOfItems,itemLength,str,status){
  var arrOfStr=str.split('');
  for(var i=0;i<arrOfIndex.length;i++){
    arrOfStr[arrOfIndex[i]-1] = "<mark>"+arrOfStr[arrOfIndex[i]-1];
    arrOfStr[arrOfIndex[i]-1+itemLength] = '</mark>'+arrOfStr[arrOfIndex[i]-1+itemLength];
  }
  arrOfStr=arrOfStr.join("");
  var noOfFound=arrOfIndex.length;
  render(arrOfStr,noOfFound);
}

//changing the dom with marking
function render(string,number){
  $('p').html(string);
  if(number!== undefined){
  $('#numberFound').html(number+' found');
   }else{
       $('#numberFound').html('');
  }
}

//binding events for getting value from input
function bindEvents(){
  var orgStr;
  $( "input[type=text]" ).on('keyup',function( event ) {
    var inputString = $('input[type=text]').val();
    var status=$('input[type=checkbox]').is(':checked');
    var str= $('p').text();
    orgStr=str;
    var number;
    indexOfSearch=[];
    if(inputString != ''){
          var msg=finIndexOfSeachedItem(inputString, str,status);
          for(var i=0;i<msg.length;i++){
            msg[i]=msg[i]+1;
          }
          seachedItems(msg,inputString.length,str,status)
        }else {
          render(str,number);
        }
      });
    $(window).on('keydown',function (e) {
        if (e.keyCode === 114 || (e.ctrlKey && e.keyCode === 70)) {
            e.preventDefault();
            $('.searchBar').css('display','block');
        }
        if(e.keyCode === 27){
          render(orgStr);
          $('.searchBar').css('display','none');
        }
      });
};

$(document).ready(function(){
  bindEvents();
});
