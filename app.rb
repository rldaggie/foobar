require 'httparty'
require 'sinatra'
require 'sinatra/json'
require 'json'

get '/' do
  erb :index, layout: true
end

get '/search' do
  results = []
  if params[:q] && params[:q].length > 0
    results << get_results(params[:q])
  end
  json results
end

get '/favorites' do
  data = File.read('data.json')
  data = data.to_s.length > 2 ? JSON.parse(data) : []
  json data
end

post '/favorites' do
  file = JSON.parse(File.read('data.json'))
  puts "params: #{params}"
  file << params
  File.write('data.json', JSON.pretty_generate(file))
  params.to_json
end

def get_results(query)
  begin
    response = HTTParty.get("https://www.omdbapi.com?t=#{query}").parsed_response
    puts "response: #{response}"
    response
  rescue
    []
  end
end
