-- Will track whether prompt is currently open
local promptIsOpen = false

--[[
table object:
  interface PromptInfo {
  placeholder: string;
  description: string;
  id: string;
  title: string;
  isClosable?: boolean;
}
]]
---@param promptTable
---@param cb function -- Will respond with either
---
--- NOTE: Need to handle an export spam triggering many prompts
local function startPrompt(promptTable)
  debugPrint('Prompt opened >')
  debugPrint(json.encode(promptTable))

  local p = promise.new()
  SendReactMessage('openPrompt', promptTable)

  local cbStr = ('promptNuiResp-%s'):format(promptTable.id)

  promptIsOpen = true

  RegisterNuiCallbackType(cbStr)
  local eventData = AddEventHandler('__cfx_nui:' .. cbStr, function(data, cb)
    p:resolve(data)
    promptIsOpen = false
    cb({})
  end)

  local result = Citizen.Await(p)
  -- TODO: This causes a memory leak at the current moment
  -- as the RegisteredType is never cleaned up from the ResourceUI
  -- container in cpp. Feature pending

  -- Before we remove the event handler we need to copy the data
  -- otherwise we won't get a proper response.
  local resultCopy = result

  RemoveEventHandler(eventData)
  -- Returns two results as ['closed' | 'submitted', content | null]
  return resultCopy[1], resultCopy[2]
end

exports('startPrompt', startPrompt)

---@param promptId string Target prompt to close
function closePrompt(promptId)
  local stringPromptId = tostring(promptId)
  SendReactMessage('closePrompt', stringPromptId)
  debugPrint(('Prompt ID %s | Closed'):format(stringPromptId))
end


exports('closePrompt', closePrompt)