require 'sinatra'
require 'sinatra/partial'
require 'sinatra/reloader' if development?

require 'redis' #db

configure do
    redisUri = ENV["REDISTOGO_URL"] || 'redis://localhost:6379'
    uri = URI.parse(redisUri) 
    $redis = Redis.new(:host => uri.host, :port => uri.port, :password => uri.password)
end

video_data = {
    :roles => [{
        :role => "EDITOR",
        :videos => [
            "61212088",
            "61212089",
            "61212090",
            "65181084",
            "64667737",
            "65181087",
            "65181088",
            "65594554",
            "65594555",
            "67900225",
            "67900226",
            "67906978",
            "67906979",
            "67906982",
            "67906983",
            "67909282",
            "67909283",
            "67909284",
            "67909285",
            "67900224",
            "67909286",
            "68253601",
            "68253602",
            "68253604",
            "68253608",
            "68255250",
            "68258983",
            "68258985",
            "68258986",
            "68258987",
            "68260800",
            "68260801",
            "68260802",
            "68260804",
            "68261947",
            "68262231",
            "68262234",
            "68262235",
            "68262238",
            "68262239",
            "68266279",
            "68266280",
            "68266281"
        ]
    }, {
        :role => "COLORIST",
        :videos => [
            "65181082",
            "65181544",
            "65575797",
            "65575798",
            "65575799",
            "65575800",
            "65575801",
            "65594557",
            "67254716",
            "67254717",
            "67900223"
        ]
    }, {
        :role => "DIRECTOR",
        :videos => [
            "18675123"
        ]
    }, {
        :role => "CINEMATOGRAPHER/EDITOR",
        :videos => [
            "64667738"
        ]
    }, {
        :role => "TECHNICAL DIRECTOR",
        :videos => [
            "65594556",
            "67910049",
            "67910050"
        ]
    }]
}

get '/categories' do
    cats = params[:cats]

    vids = []
    video_data[:roles].each do |role|
        if cats.include? role[:role]
            role[:videos].each do |video|
                vids.push({:role =>role[:role], :id => video})
            end
        end
        
    end

    erb :main, :layout => false, :locals => {
        :video_data => vids
    }
end

get '/' do
    vids = []
    video_data[:roles].each do |role|
        r = role[:role]
        role[:videos].each do |video|
            vids.push({:role =>r, :id => video})
        end
    end

    erb :main, :locals => {
        :video_data => vids
    }
end