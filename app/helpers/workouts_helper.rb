module WorkoutsHelper
  
  def each_weight(weight, percent)
    number_with_precision(((calculate_weight(weight, percent)-45)/2.0), strip_insignificant_zeros:true)
  end
  
  def calculate_weight(working_max, percent)
    round(working_max * percent)
  end
  
  private
    def round(x)
      ((x/5).round)*5
    end
end
