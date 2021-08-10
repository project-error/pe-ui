nuiIsReady = false

RegisterNUICallback('nuiReadyForMessages', function(_, cb)
  nuiIsReady = true
  debugPrint('NUI sent ready message')
end)


RegisterNUICallback('requestFocus', function(boolean, cb)
  SetNuiFocus(boolean, boolean)
  cb({})
end)