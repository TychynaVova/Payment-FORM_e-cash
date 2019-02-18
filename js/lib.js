function openCard(e) {
  var obj = document.getElementById("help_card");
  var x;
  var y;
  
  if(e.pageX) {
    x = e.pageX;
    y = e.pageY;
  }
  else {
    x = e.clientX;
    y = e.clientY;
  }
  obj.style.top = (y-220)+"px";
  obj.style.left = (x-358)+"px";
  obj.style.display = "block";
}

function closeCard() {
  var obj = document.getElementById("help_card");
  obj.style.display = "none";
}

$(function() {
  var $ccField = $('#card_num');
  $ccField.mask('0000 0000 0000 0000');
  if ($ccField.length) {
    $('#card_num').validateCreditCard(function (result) {
      $('.mps').removeClass('show');
      if (result.card_type) {
        switch (result.card_type.name) {
          case 'visa':
            $('.cards').addClass('hide');
            $('.visa').addClass('show');
            break;
              case 'mastercard':
            $('.cards').addClass('hide');
            $('.mastercard').addClass('show');
            break;
              case 'maestro':
            $('.cards').addClass('hide');
            $('.maestro').addClass('show');
            break;
              }
      } else {
        $('.cards').addClass('show');
      }
    });
  }
});

$('#card_exp_month').on('keyup', function(){
  var firstChar = $(this).val().substr(0,1),
      secondChar = $(this).val().substr(1,1);
  if ( secondChar != '' ) {
    var total = firstChar + secondChar;    
    if ( total == 01 || total == 02 || total == 03 || total == 04 || total == 05 || total == 06 || total == 07 || total == 08 || total == 09 || total == 10 || total == 11 || total == 12 ) {  
      $(this).next().focus(); 
    }else{
      $(this).val('');
      $(this).focus();
    }
  }
});

$('#card_exp_year').on('keyup', function(){
  var firstChar = $(this).val().substr(0,1),
      secondChar = $(this).val().substr(1,1),
      thirdChar = $(this).val().substr(2,1),
      fourthChar = $(this).val().substr(3,1);
  if ( fourthChar != '') {
    var total = firstChar + secondChar + thirdChar + fourthChar;
    if ( total >= '2018' && total <= '2045') {
      $(this).next().focus();
    }else{
      $(this).val('');
      $(this).focus();
    }
  }
});

function controlyear(input) { 
  var value = input.value; 
  var rep = /[^0-9]/;
  if (rep.test(value)) { 
    value = value.replace(rep, ''); 
    input.value = value; 
  } if (value.length >= 4) 
  {document.getElementById('cvv').focus();}
};

function formatCardCode() {
    var cardCode = this.value.replace(/[^\d]/g, '').substring(0,16);
    cardCode = cardCode != '' ? cardCode.match(/.{1,4}/g).join(' ') : '';
    this.value = cardCode;
}

/* CHECK CVV (ONLY DIGITS) */
  function getChar(event) {
    if (event.which == null) {
      if (event.keyCode < 32) {
        return null;
      }
      return [String.fromCharCode(event.keyCode), event.which];
    }
    if (event.which !== 0 && event.charCode !== 0) {
      if (event.which < 32) {
        return null;
      }
      return [String.fromCharCode(event.keyCode), event.which];
    }
    return null;
  }
  var cvv = document.getElementById('cvv');
  $('input[name=cvv]').on('keypress keyup keydown', function (e) {
    e = e || event;
    if (e.ctrlKey || e.altKey || e.metaKey) return;
    var chr = getChar(e);
    if (chr == null) return;
    if (chr[1] < '48' || chr[1] > '57' || chr['1'] === 37 || chr['1'] === 38 || chr['1'] === 39 || chr['1'] === 40) {
      return false;
    }
  });