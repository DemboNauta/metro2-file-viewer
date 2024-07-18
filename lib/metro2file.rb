require_relative 'parseutils.rb'

class Metro2File

  include ParseUtils

  attr_accessor :header_str, :header_fields, :trailer_str, :accounts_strs

  HEADER_FIELDS = [
    ['Equifax Identifier', 22...32],
    ['TransUnion Identifier', 32...42],
    ['Experian Identifier', 42...47],
    ['Activity Date', 47...55],
    ['Date Created', 55...63],
    ['Program Date', 63...71],
    ['Program Revision Date', 71...79],
    ['Reporter Name', 79...119],
    ['Reporter Address', 119...215],
    ['Reporter Phone', 215...225],
    ['Software Vendor Name', 225...265],
    ['Software Version Number', 265...426],
  ]

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
