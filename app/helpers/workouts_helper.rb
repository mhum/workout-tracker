module WorkoutsHelper
  
  def each_weight(weight, percent)
    if (percent)
      calculated_weight = ((calculate_weight(weight, percent)-45)/2.0)
      if (calculated_weight<0)
        return 0
      else
        return number_with_precision(calculated_weight, strip_insignificant_zeros:true)
      end
    end
  end
  
  def calculate_weight(working_max, percent)
    if (percent)
      round_to_fifth(working_max * percent)
    end
  end
  
  def cell_color(text, reps)
    if (reps==5)
      content_tag(:td, text, class: "success")
    elsif (reps==3)
      content_tag(:td, text, class: "warning")
    elsif (reps==1)
      content_tag(:td, text, class: "danger")
    end
  end
  
  private
    def round_to_fifth(x)
      ((x/5).round)*5
    end
end
