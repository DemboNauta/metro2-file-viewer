# frozen_string_literal: true

require 'glimmer-dsl-libui'

class App

  include Glimmer

  def run
    window('Hello, World!', 750, 500) {
      margined true

      label('Metro2 File Viewer')

      vertical_box {
        horizontal_box {
          stretchy false

          button('Select a file to view') {
            on_clicked do
              file_path = open_file(window)
              if file_path
                msg_box('File Selected', "File path: #{file_path}")
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
