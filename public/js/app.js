(function( document, window, $ ) {

  var ButtonController = function( timeout ) {
    this.timeout = timeout; // how often to update the ui

    this.autoUpdateThread = null; // store the setTimeout
  }

  // ensure that a button's class is correct
  // based on its action
  ButtonController.prototype.updateButtonContent = function( element ) {
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
    });
  }

  ButtonController.prototype.updateAllButtons = function() {
    var buttons = $('.service-button');

    // update each individual button
    buttons.each(function(i, button) {
      this.updateButtonContent( button );
    }.bind(this));
  }

  // configure each button so when clicked, it'll perform the appropriate action
  ButtonController.prototype.attachActionToButtons = function( buttons ) {
    var bc = this;

    buttons.click(function() {
      var route = $(this).data('route'),
          action = $(this).data('action'),
          element = $(this);

      $.ajax({
        type: 'POST',
        url: [ '/api', route, action ].join('/'),
        data: '',
        success: function() {
          // zap the next UI update and force timer to start over
          clearInterval( this.autoUpdateThread );
          this.timedUpdateAllButtons();
        }.bind(bc),

        error: function() {
          alert('ERROR');
        }
      });

      return false;
    });
  }

  ButtonController.prototype.timedUpdateAllButtons = function() {
    this.updateAllButtons();

    this.autoUpdateThread = setTimeout( this.timedUpdateAllButtons.bind(this), this.timeout );
  }

  $(function() {
    var bc = new ButtonController( 5000 );

    bc.updateAllButtons();
    bc.attachActionToButtons( $('.service-button') );
    bc.timedUpdateAllButtons();

    $('#refresh-button').click(bc.updateAllButtons.bind(bc));
  });

})( document, window, jQuery );

