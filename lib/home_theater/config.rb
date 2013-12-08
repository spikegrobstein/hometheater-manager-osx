module HomeTheater
  class Config
    attr_accessor :name, :route, :app, :group

    def initialize( config )
      @name = config.delete('name')
      @route = config.delete('route')
      @app = config.delete('app_name')
      @group = config.delete('group')
    end

    def process
      Process.new(@app)
    end
  end
end
