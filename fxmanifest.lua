fx_version "cerulean"

description "Basic React (TypeScript) & Lua Game Scripts Boilerplate"
author "Project Error"
version '0.0.1'
repository 'https://github.com/project-error/fivem-react-boilerplate-lua'

lua54 'yes'

games {
  "gta5",
  "rdr3"
}

ui_page 'web/build/index.html'

client_scripts {
  "client/utils.lua",
  "client/main.lua",
  "client/**/*"
}

server_script "server/update.lua"

files {
  'config.json',
  'web/build/index.html',
  'web/build/**/*',
}