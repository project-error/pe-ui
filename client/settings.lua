local settingModalOpen = false

RegisterCommand('ui-settings', function()
  -- Toggle state of modal with command
  settingModalOpen = not settingModalOpen
  SendReactMessage('setSettingsVisible', settingModalOpen)
end)

RegisterNUICallback('settingsModalClosed', function(_, cb)
  settingModalOpen = false
  cb({})
end)

-- Always unbound for now
RegisterKeyMapping('ui-settings', 'Opens the UI settings menu', 'KEYBOARD', '')


