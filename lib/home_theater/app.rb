require 'rubygems'
require 'bundler/setup'

require 'sinatra/base'
require 'sinatra/namespace'
require 'haml'

require 'yaml'

require 'pry'
require './lib/home_theater/process'
require './lib/home_theater/config'


module HomeTheater
  APPLICATIONS = []

  Dir.glob('./config/*.yml').each do |config|
    config = YAML.load( File.read(config) )

    next unless config['enabled']

    puts "Got config: #{ config['name'] }"

    APPLICATIONS << HomeTheater::Config.new( config )
  end

  class App < Sinatra::Base
    register Sinatra::Namespace

    set :bind, '0.0.0.0'
    set :root, File.join( File.dirname(__FILE__), '../..' )

    namespace '/api' do

      APPLICATIONS.each do |config|

        namespace "/#{ config.route }" do
          before do
            @process = config.process
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

    end

    get '/' do
      @applications = APPLICATIONS
      haml :main
    end

  end
end

