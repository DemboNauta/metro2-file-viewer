# frozen_string_literal: true

require 'glimmer-dsl-libui'

require_relative 'lib/metro2file.rb'
require_relative 'lib/parseutils.rb'

class App

  include Glimmer
  include ParseUtils

  attr_accessor :metro2file, :header_info

  def initialize
    self.metro2file = Metro2File.new
  end

  def run
    gui = create_gui

    gui.show
  end

  def create_gui
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
                self.metro2file.from_file file_path
                # puts "Header: #{self.metro2file.get_header_info}"
              else
                msg_box('File Selected', "No file selected.")
              end
            end
          }
        }

        render_header_info
      }
    }
  end

  def create_header_label_element(label_text, data_character_range)
    horizontal_box {
      stretchy false
      label(label_text)
      label {
        stretchy false
        text <= [self.metro2file, :header_str, on_read: ->(header_str) { header_str ? header_str[data_character_range].strip : nil }]
      }
    }
  end

  def render_header_info
    # dynamically display header string with data binding
    label("==============\n===Header Info===\n==============") {
      stretchy false
    }

    Metro2File::HEADER_FIELDS.each do |header_field|
      create_header_label_element(header_field[0], header_field[1])
    end
  end

end

App.new.run
