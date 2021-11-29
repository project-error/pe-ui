local DisplayRadar = DisplayRadar
local NetworkIsPlayerTalking = NetworkIsPlayerTalking
local Wait = Wait
local HideHudComponentThisFrame = HideHudComponentThisFrame
local cinematicModeOn = false
local screenshotMode = false

USER_SETTINGS = nil

local function hideAllElLoop()
  CreateThread(function()
    while screenshotMode do
      HideHudComponentThisFrame(1)
      HideHudComponentThisFrame(2)
      HideHudComponentThisFrame(3)
      HideHudComponentThisFrame(4)
      HideHudComponentThisFrame(6)
      HideHudComponentThisFrame(7)
      HideHudComponentThisFrame(8)
      HideHudComponentThisFrame(9)
      HideHudComponentThisFrame(10)
      HideHudComponentThisFrame(16)
      HideHudComponentThisFrame(19)
      HideHudComponentThisFrame(20)
      HideHudComponentThisFrame(21)
      HideHudComponentThisFrame(22)
      Wait(0)
    end
  end)
end

RegisterNUICallback('userSettingsUpdated', function(userSettings, cb)
  USER_SETTINGS = userSettings
  cb({})
end)


RegisterNUICallback('cinematicModeToggle', function(bool, cb)
  debugPrint('Cinematic mode toggle > ' .. tostring(bool))
  cinematicModeOn = bool
  if bool then
    DisplayRadar(false)
    hideAllElLoop()
  else
    DisplayRadar(true)
  end
  cb({})
end)

RegisterNUICallback('screenshotModeToggle', function(bool, cb)
  debugPrint('Screenshot mode toggle > ' .. tostring(bool))
  screenshotMode = bool
  if bool then
    DisplayRadar(false)
  else
    DisplayRadar(true)
  end
  cb({})
end)

RegisterCommand('cmode', function()
  cinematicModeOn = not cinematicModeOn

  SendReactMessage('setCinematicBars', cinematicModeOn)
end)

RegisterKeyMapping('cmode', 'Toggle cinematic mode', 'keyboard', '')


AddEventHandler('pma-voice:setTalkingMode', function(voiceMode)
  debugPrint('PMA Voice Range update: ' .. tostring(voiceMode))
  SendReactMessage('setVoiceRange', voiceMode)
end)

-- Store last talking value in loop
-- so we don't need to continuously send to NUI every iteration
-- we will only send an NUI message if status has changed since last loop
local wasTalking

-- Talking Thread
CreateThread(function()
  while true do
    local playerTalking = NetworkIsPlayerTalking(PlayerId())

    if playerTalking and not wasTalking then
      SendReactMessage('setIsTalking', true)
      debugPrint('Voice activated > true')
      wasTalking = true
    elseif not playerTalking and wasTalking then
      SendReactMessage('setIsTalking', false)
      debugPrint('Voice activated > false')
      wasTalking = false
    end
    Wait(not USER_SETTINGS and ResourceConfig.voiceUpdateTime or USER_SETTINGS.voiceUpdateTime)
  end
end)

local lastHealth
local lastArmor
-- Health & Armor Thread
CreateThread(function()
  while true do
    if nuiIsReady then
      local playerPed = PlayerPedId()
      local curHealth = GetEntityHealth(playerPed) - 100
      local curArmor = GetPedArmour(playerPed)

      if curHealth ~= lastHealth then
        SendReactMessage('setHealth', curHealth)
        debugPrint('Updating health:' .. tostring(curHealth))
        lastHealth = curHealth
      end

      if curArmor ~= lastArmor then
        SendReactMessage('setArmor', curArmor)
        debugPrint('Updating armor:' .. tostring(curArmor))
        lastArmor = curArmor
      end
    end

    Wait(not USER_SETTINGS and ResourceConfig.defaultHUDSettings.healthArmorUpdate or USER_SETTINGS.healthArmorInterval)
  end
end)

-- Pause menu check thread
local lastPauseStatus = false
CreateThread(function()
  while true do
    -- Sometimes returning int instead of bool? So we ternary it
    local curPauseStatus = IsPauseMenuActive() and true or false
    if lastPauseStatus ~= curPauseStatus then
      SendReactMessage('setPauseActive', curPauseStatus)
      debugPrint('Pause menu > ' .. tostring(curPauseStatus))
      lastPauseStatus = curPauseStatus
    end
    Wait(500)
  end
end)

--- @class AddCircleOpts
--- @field id string
--- @field iconColor string|nil
--- @field iconName string
--- @field trackColor string|nil
--- @field color string|nil
--- @field min number|nil
--- @field max number|nil
--- @field value number|nil

--- Adds a new circleHud based on passed opts
--- @param opts AddCircleOpts
local function addCircleHudItem(opts)
  SendReactMessage('addCircleItem', opts)
end

exports('addCircleHudItem', addCircleHudItem)

--- @class SetCircleHudValueOpts
--- @field value number
--- @field id string

--- Update an existing circleHud with a new value
--- @param opts SetCircleHudValueOpts
local function setCircleHudValue(opts)
  SendReactMessage('setItemValue', opts)
end

exports('setCircleHudValue', setCircleHudValue)