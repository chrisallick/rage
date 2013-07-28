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
            "61212088", # jon hopkins
            "61212089", # google plus
            "61212090", # hackensack UMC
            "64667737", # epstein old ime
            "65181084", # hackensack umc there is a place
            "65181087", # ppl birds
            "65181088", # pomellato
            "65594554", # yves geleyn colosse
            "65594555", # chobani snow angels
            "67900224", # guilherem marcondes           
            "67900225", # bbc bbc6 music
            "67900226", # julia pott
            "67906978", # british gas necta
            "67906979", # brtiish gas parachutes
            "67906982", # british gas upside down
            "67906983", # colgate spasce trip
            "67909282", # british gas rescue
            "67909283", # ge ecomagination
            "67909284", # infotel bear
            "67909285", # infotel chef
            "67909286", # infotel fan
            "68253601",
            "68253602",
            "68253604",
            "68253608",
            "68255250",
            "68255251", # british gas callback
            "68258983",
            "68258980", # confused.com
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
            "68266281",
            "70420546", # uncle bens take off
            "70420547",
            "70420553",
            "70420554",
            "70420555"  # uncle bens finger walk

        ]
    }, {
        :role => "COLORIST",
        :videos => [
            "65181082", # hbo east main
            "65181544", # canon eos
            "65575797", # intel ultrabook paris
            "65575798", # intel ultrabook sf
            "65575799", # the metermaids
            "65575800", # peelander z
            "65575801", # hbo east of main 2010
            "65594557", # twisted sister
            "67254716", # hbo east of main
            "67254717", # hbo east of main
            "67900223"  # hbo east of main
        ]
    }, {
        :role => "DIRECTOR",
        :videos => [
            "18675123"
        ]
    }, {
        :role => "CINEMATOGRAPHER",
        :videos => [
            "64569098", # survival tragedy of mind
            "64667738", # helado negro
            "70576792"  # willi patton - monk fish
        ]
    }, {
        :role => "TECHNICAL DIRECTOR",
        :videos => [
            "65594556", # royal caribbean
            "67910049", # usa
            "67910050"  # usa
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