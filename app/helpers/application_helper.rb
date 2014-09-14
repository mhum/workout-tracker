module ApplicationHelper

  def nav_bar
    content_tag(:ul, class: "nav navbar-nav") do
      yield
    end
  end
  
  def nav_link(text, path)
    options = current_controller?(path) ? { class: "active" } : {}
    content_tag(:li, options) do
      link_to text, path
    end
  end
  
  def current_controller?(link)
    url_for(link).include? controller.controller_name
  end
end
