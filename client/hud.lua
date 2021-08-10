local DisplayRadar = DisplayRadar
local HideHelpTextThisFrame = HideHelpTextThisFrame
local Wait = Wait

local cinematicModeOn = false

-- We might want to add elements we want to also
-- hide at at a later date
local hudElementsToTarget = {}

local function startHudLoop()
  cinematicModeOn = true
  CreateThread(function()
    while cinematicModeOn do
      -- Always toggle radar when cinematicModeIsOn
      DisplayRadar(false)
      --for i = 0, #hudElementsToTarget do
      --  HideHelpTextThisFrame(hudElementsToTarget[i])
      --end
      Wait(0)
    end
  end)
end

RegisterNUICallback('cinematicModeToggle', function(bool, cb)
  debugPrint('Cinematic mode toggle > ' .. tostring(bool))
  if bool then
    startHudLoop()
  else
    cinematicModeOn = false
  end
  cb({})
end)

RegisterCommand('cmode', function()
  cinematicModeOn = not cinematicModeOn

  SendReactMessage('setCinematicBars', cinematicModeOn)
end)

RegisterKeyMapping('cmode', 'Toggle cinematic mode', 'keyboard', '')