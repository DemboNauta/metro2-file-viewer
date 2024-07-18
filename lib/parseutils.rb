module ParseUtils

  def parse_date(date_str)
    # parse a date from the format MMDDYYYY to MM/DD/YYYY
    date_str[0..1] + '/' + date_str[2..3] + '/' + date_str[4..7]
  end

end
