-- Will track whether prompt is currently open
local promptIsOpen = fallse

--[[
table object:
  interface PromptInfo {
  placeholder: string;
  description: string;
  id: string;
  title: string;
}
]]
---@param promptTable
---@param cb function -- Will respond with either
---
--- NOTE: Need to handle an export spam triggering many prompts
function startPrompt(promptTable)
  debugPrint('Prompt opened >')
  debugPrint(json.encode(promptTable))

  local p = promise.new()
  SendReactMessage('openPrompt', promptTable)

  local cbStr = ('promptNuiResp-%s'):format(promptTable.id)

  promptIsOpen = true

  -- Data will be an array with ['closed' | 'submitted', content | null]
  RegisterNUICallback(cbStr, function(data, cb)
    p:resolve(data)
    promptIsOpen = false
    -- TODO: This causes a memory leak at the current moment
    -- as the RegisteredType is never cleaned up from the ResourceUI
    -- container in cpp. Feature pending
    RemoveEventHandler('__cfx_nui:' .. cbStr)
    cb({})
  end)

  local result = Citizen.Await(p)

  return result[1], result[2]
end

exports('startPrompt', startPrompt)

---@param promptId string Target prompt to close
function closePrompt(promptId)
  local stringPromptId = tostring(promptId)
  SendReactMessage('closePrompt', stringPromptId)
  debugPrint(('Prompt ID %s | Closed'):format(stringPromptId))
end


exports('closePrompt', closePrompt)