module ApplicationHelper
  def referrer_url
    request.env['4']
  end
end
