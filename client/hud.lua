local DisplayRadar = DisplayRadar
local NetworkIsPlayerTalking = NetworkIsPlayerTalking
local Wait = Wait

local cinematicModeOn = false

-- We might want to add elements we want to also
-- hide at at a later date
local hudElementsToTarget = {}

local function startHudLoop()
  cinematicModeOn = true
  DisplayRadar(false)
  --CreateThread(function()
  --while cinematicModeOn do
  -- Always toggle radar when cinematicModeIsOn
      --for i = 0, #hudElementsToTarget do
      --  HideHelpTextThisFrame(hudElementsToTarget[i])
      --end
      --Wait(0)
    --end
  --end)
end

RegisterNUICallback('cinematicModeToggle', function(bool, cb)
  debugPrint('Cinematic mode toggle > ' .. tostring(bool))
  if bool then
    startHudLoop()
  else
    cinematicModeOn = false
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
    Wait(ResourceConfig.voiceUpdateTime)
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

    Wait(ResourceConfig.defaultHUDSettings.healthArmorUpdate)
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