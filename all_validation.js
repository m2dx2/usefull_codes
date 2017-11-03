// allow to type only numberic value in text box

function fnAllowNumeric(evt) {
            evt = (evt) ? evt : window.event;
            var charCode = (evt.which) ? evt.which : evt.keyCode;
            if (charCode > 31 && (charCode < 48 || charCode > 57)) {

              return false;
            }
            return true;
          }


// comma formatted amount
function CommaFormatted(amount) {
          var numberStr = amount.toString();
          var thousandsMatcher = /(\d+)(\d{3})$/;
          var thousandsAndRest = thousandsMatcher.exec(numberStr);
          if (!thousandsAndRest) return numberStr;
          return thousandsAndRest[1].replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + thousandsAndRest[2];
        }

// validation of a pattern e.g. pan card,mobile
function pan_card_valid(element){
  	str=element.value;
   	pancardPattern = /^([a-zA-Z]{5})(\d{4})([a-zA-Z]{1})$/;
   	res = str.match(pancardPattern);
 	return res;
}

