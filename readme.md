# HomeTheater Manager OSX

HomeTheater Manager is a lightweight web application that makes it easy to start and stop applications on your home theater machine running OSX. This app was designed to enable the user to start/stop Plex Home Theater and Plex Media Server with the push of a button rather than requiring them to either use Remote Desktop or SSH to accomplish this.

The interface is designed with mobile in mind, but also works well on a desktop browser.

## Installation

HomeTheater Manager is a Sinatra (Rack) application and can be run either in Apache or nginx with Passenger or can be run standalone by using `rackup` or something similar. More detailed installation instructions will be added, along with some scripts to get up and running.

I installed nginx with Passenger via brew with the following command:

    brew install nginx --with-passenger

Then used the following configuration options in `/usr/local/etc/nginx/nginx.conf`:

    # passenger loader
    passenger_root /usr/local/opt/passenger/libexec;
    passenger_ruby /usr/bin/ruby;

    server {
      listen       8080;
      server_name  hometheater hometheater.example.com hometheater.lvh.me;

      # server config
      location / {
        root   /path/to/hometheater-manager-osx/public;
        passenger_enabled on;
      }
    }

Because this application checks the status of and starts and stops named processes on the local machine, it must be run on the same machine as the Plex application(s).

## Configuration

You can configure HomeTheater Manager to manage any process on your machine. For example:

 * Steam (Big Picture)
 * Plex Home Theater
 * G-force Audio Visualizer

Configuration is done via YAML files in the `config` directory. Following is a commented example config for Steam:

    name: "Steam"          # the display name (how it will appear in the UI)
    app_name: "Steam.app"  # the name of the application in /Applications
    route: "steam"         # the route that will be used in the URI
    enabled: true          # whether it will be available to manage

Setting the `enabled` value to false will make it not appear in the UI and not be available to manage from the API.

Any application managed with HomeTheater Manager **MUST** be in `/Applications`.

## Bookmarklet

You can create a bookmarklet using the following URL:

    javascript:var%20$$$htm20131214=window.open('http://services.home.spike.cx','hometheatermanager20131214','width=320,height=300,scrollbars=yes,toolbar=no,status=no,location=no,menubar=no,resizable=yes');$$$htm20131214.focus()

Clicking that will open a new window, scaled to an appropriate size.

## Author

HomeTheater Manager is written by Spike Grobstein and licensed under the MIT License.  
https://github.com/spikegrobstein  
http://spike.grobste.in  
me@spike.cx  

