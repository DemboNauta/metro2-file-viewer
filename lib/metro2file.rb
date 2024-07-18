require_relative 'parseutils.rb'

class Metro2File

  include ParseUtils

  attr_accessor :header_str, :trailer_str, :accounts_strs

  def get_header_info
    if self.header_str
      {
        'Equifax Identifier' => self.header_str[22...32].strip,
        'Experian Identifier' => self.header_str[32...37].strip,
        'TransUnion Identifier' => self.header_str[37...47].strip,
        'Activity Date' => parse_date(self.header_str[47...55].strip),
        'Date Created' => parse_date(self.header_str[55...63].strip),
        'Program Date' => parse_date(self.header_str[63...71].strip),
        'Program Revision Date' => parse_date(self.header_str[71...79].strip),
        'Reporter Name' => self.header_str[79...119].strip,
        'Reporter Address' => self.header_str[119...215].strip,
        'Reporter Phone' => self.header_str[215...225].strip,
        'Program Creator' => self.header_str[225...265].strip,
        'Program Version' => self.header_str[265...426].strip,
      }
    end
  end

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
