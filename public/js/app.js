$(function() {
  $('.off_button').click(function() {
    $.ajax({
      type: 'POST',
      url: '/api/h/stop',
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
    $.ajax({
      type: 'POST',
      url: '/api/h/start',
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

