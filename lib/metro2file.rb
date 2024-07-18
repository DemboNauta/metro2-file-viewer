require_relative 'parseutils.rb'

class Metro2File

  include ParseUtils

  attr_accessor :header_str, :trailer_str, :accounts_strs

  def from_file(file_path)
    File.open(file_path, 'r') do |file|
      self.header_str = file.gets
      self.accounts_strs = []
      while line = file.gets
        if line.start_with?('0426TRAILER')
          self.trailer_str = line
        else
          self.accounts_strs << line
        end
      end
    end
    self
  end

end
