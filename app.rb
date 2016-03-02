require 'sinatra'
require 'sinatra/json'
require 'json'

get '/' do
  erb :index, layout: true
end

get '/favorites' do
  data = File.read('data.json')
  data = data.to_s.length > 2 ? JSON.parse(data) : []
  json data
end

post '/favorites' do
  file = JSON.parse(File.read('data.json'))
  unless params[:name] && params[:oid]
    return 'Invalid Request'
  end
  movie = { name: params[:name], oid: params[:oid] }
  file << movie
  File.write('data.json',JSON.pretty_generate(file))
  movie.to_json
end
