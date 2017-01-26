module UsersHelper
  def field_class(resource, field_name)
    if resource.errors[field_name].present?
      return "form-group has-error".html_safe
    else
      return "form-group".html_safe
    end
  end
end
