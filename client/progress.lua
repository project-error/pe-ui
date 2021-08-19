local openProgbars = {}

RegisterNUICallback('progbar-complete', function(data, cb)
  local progbarId = data.progbarId
  openProgbars[progbarId]:resolve(true)
  SetNuiFocus(false)
  cb({})
end)

RegisterNUICallback('progbar-cancel', function(data, cb)
  local progbarId = data.progbarId
  openProgbars[progbarId]:resolve(false)
  SetNuiFocus(false)
  cb({})
end)

-- Probably a good idea to move cancel key handling to game scripts
-- instead of NUI for several reasons
-- * NUI Focus can be taken by another resource
-- * Handling NUI Focus switching can be a pain

-- Start a new progbar
--[[
interface ProgBarData {
  color: string;
  duration: number;
  id: string;
  isCancellable?: boolean;
  disableControls?: boolean;
}
]]

local function startProgbar(opts)
  SendReactMessage('setProgressBar', opts)
  SetNuiFocus(true)
  openProgbars[opts.id] = promise.new()
  local resp = Citizen.Await(openProgbars[opts.id])
  openProgbars[opts.id] = nil
  return resp
end
exports('startProgbar', startProgbar)

-- Close and resolve tracked progbars
local function closeProgbar()
  SendReactMessage('closeProgbar')

  for _, v in ipairs(openProgbars) do
    v:resolve(false)
  end

  openProgbars = {}
end
exports('closeProgbar', closeProgbar)
