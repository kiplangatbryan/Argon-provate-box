// user validation


const validate = (wt, ev) => {
    // error
    

    if (wt[1].value.length < 6) {
        if ($('.error1')) {
            return    
        }
        $('.passwd').append('<div class="error1">Password too short.Must be 6 characters long</div>')
        
    }

    ev.preventDefault()
}



$('document').ready(function () {
    $('form').submit(function (e) {
        
        // validate(this, e)
    })
})



var options = {
	classname: 'my-class',
    id: 'my-id'
};
var nanobar = new Nanobar( options );
nanobar.go( 30 );
nanobar.go( 76 );
nanobar.go(100);