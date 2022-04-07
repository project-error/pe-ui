if not ResourceConfig.enableTestCommands then return end

debugPrint('Registering test commands')

RegisterCommand('testPrompt', function()
  local status, content = exports['pe-ui']:startPrompt({
    placeholder = 'Sent by lua',
    description = 'This is the description sent by lua',
    id = 'myTestPrompt',
    title = 'Wow this has a title!'
  })
  SpawnCar(content)

  debugPrint('Export result >')
  debugPrint('Status | ' ..status)
  debugPrint('Content | ' .. tostring(content))

end)

RegisterCommand('testPromptClose', function()
  local status, content = exports['pe-ui']:startPrompt({
    placeholder = 'Closable Prompt',
    description = 'This is a prompt that is closable',
    id = 'myTestPrompt',
    title = 'Closable Prompt',
    isClosable = true
  })
  SpawnCar(content)

  debugPrint('Export result >')
  debugPrint('Status | ' ..status)
  debugPrint('Content | ' .. tostring(content))

end)

RegisterCommand('testToast', function()
  CreateThread(function()
    exports['pe-ui']:addToast({
      message = 'This is my toast description',
      position = 'top-right',
      duration = 5000,
      status = 'success'
    })

    exports['pe-ui']:addToast({
      message = 'This is my toast description',
      position = 'top-right',
      title = 'Title test',
      duration = 3000,
      status = 'error'
    })

    exports['pe-ui']:addToast({
      message = 'This is my toast description',
      position = 'top-right',
      title = 'Title test',
      duration = 3000,
      status = 'info'
    })

    Wait(3000)

    exports['pe-ui']:addToast({
      message = 'This is my toast description',
      position = 'top-left',
      title = 'Title test',
      duration = 3000,
      status = 'info'
    })

    Wait(1000)

    exports['pe-ui']:addToast({
      message = 'This is my toast description',
      position = 'top',
      title = 'Title test',
      duration = 3000,
      status = 'warning'
    })

    Wait(1000)

    exports['pe-ui']:addToast({
      message = 'This is my toast description',
      position = 'bottom',
      title = 'Title test',
      duration = 3000,
      status = 'success'
    })

    Wait(1000)

    exports['pe-ui']:addToast({
      message = 'This is my toast description',
      position = 'bottom-right',
      title = 'Title test',
      duration = 3000,
      status = 'error'
    })
  end)
end)

RegisterCommand('testPersistent', function()
  exports['pe-ui']:addPersistentToast({
    message = 'Persistent test 1',
    position = 'top-right',
    id = 'myPersistentNoti',
    status = 'error'
  })

  exports['pe-ui']:addPersistentToast({
    message = 'Persistent test 2',
    position = 'top',
    title = 'This has a title',
    id = 'myPersistentNoti2',
    status = 'success'
  })
end)

RegisterCommand('clearPersistent', function()
  exports['pe-ui']:clearPersistentToast('myPersistentNoti')
  exports['pe-ui']:clearPersistentToast('myPersistentNoti2')
end)

RegisterCommand('progBar', function()
  local isComplete = exports['pe-ui']:startProgbar({
    color = 'green',
    id = 'myProgBar',
    duration = 10000,
    isCancellable = true
  })
  debugPrint('Prog bar complete:' .. tostring(isComplete))
end)

RegisterCommand('closeProgbar', function()
  exports['pe-ui']:closeProgbar()
end)

function SpawnCar(model)
  local hash = GetHashKey(model)

  local playerId = PlayerPedId()
  local coords = GetEntityCoords(playerId)

  RequestModel(hash)
  while not HasModelLoaded(hash) do
    Wait(100)
  end

  CreateVehicle(hash, coords, 0.0, false, false)
end

RegisterCommand('openMenu', function()
  local menu = ContextMenu.new("Garage")

  menu:addItem("Adder", function()
    print("spawning adder xd")
    SpawnAdder("adder")
  end, true, true)

  menu:addItem("Say hi", function()
    print("hi")
  end, false, true)

  menu:openMenu()
end)