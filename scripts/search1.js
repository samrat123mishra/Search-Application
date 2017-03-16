

  window.addEventListener('load', function () {
     var para = $('p').text();
     // var search_btn = document.getElementsByTagName('button')[0];
     // search_btn.addEventListener('click', parseInput);
        $('#inp').keyup(function(event) {
              $('p').text(para);
             $('#alternative').text('');
            if($('#inp').val()!=''){
    parseInput();
            }
          
        });
/* This function takes the input from the input box and the content from where the word is to be searched */ 
function parseInput() {
    var searchString = $('#inp').val();
    var wholeContent = $('p').text();
   
    search(searchString, wholeContent);
}

/* This function searches the input characters present in the content and find the first index of the searched character*/
function search(searchValue, content) {
  // if(searchValue==''){
       // $('p').eq(1).text('Please enter the correct character');
       // }
         if (content.indexOf(searchValue) !== -1) {
        var firstIndex = content.indexOf(searchValue);
        var inputStringLength = searchValue.length;
        var searchArray = content.split(content.substr(firstIndex, inputStringLength));
        highLight(searchArray, searchValue);
    }  else {
        $('#alternative').text('Not Found');
    }
}
/* This function highlights the searched characters in the content or rather mark them */
function highLight(finalArray, item) {
    for (var i = 0; i < finalArray.length - 1; i++) {
        finalArray[i] += '<mark>' + item + '</mark>';
    }
    render(finalArray);
}
/* This function renders the final marked content */
function render(finalString) {
    $('p').html(finalString);
}

  });