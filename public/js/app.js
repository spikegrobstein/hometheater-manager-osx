$(function() {
  $('.service-button')
  .addClass( function() {
    return $(this).data('action') == 'start' ? 'btn-danger' : 'btn-success';
  })
  .click(function() {
    var route = $(this).data('route'),
        action = $(this).data('action');

    console.log('action!');

    $.ajax({
      type: 'POST',
      url: [ '/api', route, action ].join('/'),
      data: '',
      success: function() {
        window.location = '/';
      },
      error: function() {
        alert('ERROR');
      }
    });

    return false;
  });

});

