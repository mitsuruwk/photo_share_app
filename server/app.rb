# -*- coding: utf-8 -*-
require 'rubygems'
require 'sinatra'
require 'sinatra/reloader'
require 'haml'
require 'sass'
require 'json'
require 'pp'
require 'pusher'

configure do
  Pusher.app_id = '0000'
  Pusher.key = '000000000000'
  Pusher.secret = '0000000000'

  set :pusher, Pusher['photo_share_channel']
  set :protection, :except => :frame_options
end

get '/' do
  haml :main
end

get '/main.css' do
  scss :main
end

get '/app.html' do
  haml :app
end

get '/app.css' do
  scss :app
end

post '/upload_data' do
  # pp params
  
  msg = {
    :message => params[:message],
    :image_data => params[:image_data],
    :user_agent => request.user_agent,
    :post_at => Time.now.to_s,
    :ip => request.ip
  };
  
  settings.pusher.trigger('new', JSON.generate(msg))

  content_type content_type, 'charset' => 'utf-8'
  JSON.generate(:ret => 0)
end
