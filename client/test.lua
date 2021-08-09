RegisterCommand('testPrompt', function()
  local status, content = exports['pe-ui']:startPrompt({
    placeholder = 'Sent by lua',
    description = 'This is the description sent by lua',
    id = 'myTestPrompt',
    title = 'Wow this has a title!'
  })

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