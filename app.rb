require 'rubygems'
require 'bundler/setup'
require 'pry'
require './lib/plex'
require 'sinatra/base'

class PlexDashboardApp < Sinatra::Base
  set :bind, '0.0.0.0'

  get '/status' do
    Plex::MediaServer.running?.to_s
  end

  post '/start' do
    Plex::MediaServer.start
  end

  post '/stop' do
    Plex::MediaServer.stop
  end

  post '/restart' do
    Plex::MediaServer.restart
  end

  run!
end

