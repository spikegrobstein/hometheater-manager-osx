// ensure that a button's class is correct
// based on its action
function update_button_content( element ) {
  $.ajax({
    type: 'GET',
    url: '/api/' + $(element).data('route') + '/',
    success: function( data ) {
      if ( data === 'true' ) {
        // it's running
        // class: btn-success
        // action: stop
        $(element)
          .removeClass('btn-danger')
          .addClass('btn-success')
          .data('action', 'stop');
      } else {
        // it's not running
        // class: btn-success
        // action: stop
        $(element)
          .removeClass('btn-success')
          .addClass('btn-danger')
          .data('action', 'start');
      }
    }
  })
}

function update_all_buttons() {
  var buttons = $('.service-button');

  buttons.each(function(i, button) {
    update_button_content( button );
  });

  buttons
    .click(function() {
      var route = $(this).data('route'),
          action = $(this).data('action'),
          element = $(this);

      $.ajax({
        type: 'POST',
        url: [ '/api', route, action ].join('/'),
        data: '',
        success: function() {
          update_button_content( element );
        },
        error: function() {
          alert('ERROR');
        }
      });

      return false;
    });
}

$(function() {
  update_all_buttons();

  $('#refresh-button').click(update_all_buttons);
});

