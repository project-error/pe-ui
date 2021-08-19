-- Local vars used throughout file
local resourceName = GetCurrentResourceName()
-- Globals used in other files
nuiIsReady = false
ResourceConfig = json.decode(LoadResourceFile(resourceName, 'config.json'))

RegisterNUICallback('nuiReadyForMessages', function(_, cb)
  nuiIsReady = true
  debugPrint('NUI sent ready message')
end)

RegisterNUICallback('requestFocus', function(boolean, cb)
  SetNuiFocus(boolean, boolean)
  cb({})
end)