# frozen_string_literal: true

require 'glimmer-dsl-libui'

require_relative 'lib/metro2file.rb'

class App

  include Glimmer

  attr_accessor :metro2file

  def run
    window('Metro2 File Viewer', 750, 500) {
      margined true

      vertical_box {
        padded true

        horizontal_box {
          stretchy false

          button('Select a file to view') {
            on_clicked do
              file_path = open_file(window)
              if file_path
                self.metro2file = Metro2File.new.from_file file_path
                puts "Header: #{self.metro2file.get_header_info}"
              else
                msg_box('File Selected', "No file selected.")
              end
            end
          }
        }
      }
    }.show
  end

end

App.new.run
