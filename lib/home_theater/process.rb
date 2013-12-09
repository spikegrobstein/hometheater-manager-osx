require 'cocaine'

module HomeTheater
  class Process
    attr_accessor :app_name

    def initialize( app_name )
      @app_name = app_name
    end

    # return whether the app is running, based on `pid` return value
    def running?
      !!pid
    end

    # start the app
    def start
      `open "/Applications/#{ @app_name }"`
    end

    # stop the process
    # returns true if the process was stopped
    # will kill -9 it if it's still not running
    def stop
      return false unless running?

      `kill #{ self.pid }`

      running? && `kill -9 #{ self.pid }`
      return true
    end

    # restart the process
    # by stopping, then starting it
    def restart
      stop
      start
    end

    # parse output of `ps aux`
    # return the pid of this process if it's running
    # otherwise, return nil
    def pid
      line = Cocaine::CommandLine.new('ps', 'aux')
      line.run.split(/\n/).each do |line|
        m = line.match(/^.+?\s(\d+)\s.+#{ @app_name }/)
        return m[1] if m
      end

      return nil
    end

  end
end
