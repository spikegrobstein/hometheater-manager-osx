$(function() {
  $('.off_button').click(function() {
    var route = $(this).data('route');

    console.log(route);

    $.ajax({
      type: 'POST',
      url: '/api/' + route + '/stop',
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

  $('.on_button').click(function() {
    var route = $(this).data('route');

    $.ajax({
      type: 'POST',
      url: '/api/' + route + '/start',
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

