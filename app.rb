require 'rubygems'
require 'bundler/setup'

require 'sinatra/base'
require 'sinatra/namespace'
require 'haml'

require 'pry'
require './lib/home_theater/process'

class PlexDashboardApp < Sinatra::Base
  register Sinatra::Namespace
  set :bind, '0.0.0.0'

  namespace '/api' do
    namespace '/h(ometheater)?' do
      before do
        @process = HomeTheater::Process.new('Plex Home Theater.app')
      end
      get '/status' do
        @process.running?.to_s
      end

      post '/start' do
        @process.start
      end

      post '/stop' do
        @process.stop
      end

      post '/restart' do
        @process.restart
      end
    end
  end

  get '/' do
    @home_theater = HomeTheater::Process.new('Plex Home Theater.app')
    haml :main
  end

  run!
end

