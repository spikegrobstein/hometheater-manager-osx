require 'cocaine'

module Plex
  class MediaServer

    APP_NAME = 'Plex Home Theater.app'
    # APP_NAME = 'Blackmagic Disk Speed Test.app'

    class << self

      def running?
        !!pid_of_app
      end

      def start
        `open "/Applications/#{ APP_NAME }"`
      end

      def stop
        return false unless running?

        `kill #{ pid_of_app }`

        running? && `kill -9 #{ pid_of_app }`
        return true
      end

      def restart
        stop
        start
      end

      private

      def pid_of_app
        line = Cocaine::CommandLine.new('ps', 'aux')
        line.run.split(/\n/).each do |line|
          m = line.match(/^.+?\s(\d+)\s.+#{ APP_NAME }/)
          return m[1] if m
        end

        return nil
      end

    end

  end
end

