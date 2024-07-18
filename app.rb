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

  def render_header_info
    # dynamically display header string with data binding
    label("==============\n===Header Info===\n==============") {
      stretchy false
    }

    horizontal_box {
      stretchy false
      label('Equifax Identifier:')
      label {
        stretchy false
        text <= [self.metro2file, :header_str, on_read: ->(header_str) { header_str ? header_str[22...32].strip : nil }]
      }
    }

    horizontal_box {
      stretchy false
      label('Experian Identifier:')
      label {
        stretchy false
        text <= [self.metro2file, :header_str, on_read: ->(header_str) { header_str ? header_str[32...37].strip : nil }]
      }
    }

    horizontal_box {
      stretchy false
      label('TransUnion Identifier:')
      label {
        stretchy false
        text <= [self.metro2file, :header_str, on_read: ->(header_str) { header_str ? header_str[37...47].strip : nil }]
      }
    }

    horizontal_box {
      stretchy false
      label('Activity Date:')
      label {
        stretchy false
        text <= [self.metro2file, :header_str, on_read: ->(header_str) { header_str ? parse_date(header_str[47...55].strip) : nil }]
      }
    }

    horizontal_box {
      stretchy false
      label('Date Created:')
      label {
        stretchy false
        text <= [self.metro2file, :header_str, on_read: ->(header_str) { header_str ? parse_date(header_str[55...63].strip) : nil }]
      }
    }

    horizontal_box {
      stretchy false
      label('Program Date:')
      label {
        stretchy false
        text <= [self.metro2file, :header_str, on_read: ->(header_str) { header_str ? parse_date(header_str[63...71].strip) : nil }]
      }
    }

    horizontal_box {
      stretchy false
      label('Program Revision Date:')
      label {
        stretchy false
        text <= [self.metro2file, :header_str, on_read: ->(header_str) { header_str ? parse_date(header_str[71...79].strip) : nil }]
      }
    }

    horizontal_box {
      stretchy false
      label('Reporter Name:')
      label {
        stretchy false
        text <= [self.metro2file, :header_str, on_read: ->(header_str) { header_str ? header_str[79...119].strip : nil }]
      }
    }

    horizontal_box {
      stretchy false
      label('Reporter Address:')
      label {
        stretchy false
        text <= [self.metro2file, :header_str, on_read: ->(header_str) { header_str ? header_str[119...215].strip : nil }]
      }
    }

    horizontal_box {
      stretchy false
      label('Reporter Phone:')
      label {
        stretchy false
        text <= [self.metro2file, :header_str, on_read: ->(header_str) { header_str ? header_str[215...225].strip : nil }]
      }
    }

    horizontal_box {
      stretchy false
      label('Program Creator:')
      label {
        stretchy false
        text <= [self.metro2file, :header_str, on_read: ->(header_str) { header_str ? header_str[225...265].strip : nil }]
      }
    }

    horizontal_box {
      stretchy false
      label('Program Version:')
      label {
        stretchy false
        text <= [self.metro2file, :header_str, on_read: ->(header_str) { header_str ? header_str[265...426].strip : nil }]
      }
    }
  end

end

App.new.run
