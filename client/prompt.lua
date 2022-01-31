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
---@param promptTable table
---
--- NOTE: Need to handle an export spam triggering many prompts
local function startPrompt(promptTable)
  debugPrint('Prompt opened >')
  debugPrint(json.encode(promptTable))

  local p = promise.new()
  SendReactMessage('openPrompt', promptTable)

  local cbStr = ('promptNuiResp-%s'):format(promptTable.id)

  promptIsOpen = true

  RegisterRawNuiCallback(cbStr, function(data, cb)
    local resp = json.decode(data.body)

    p:resolve(resp)
    promptIsOpen = false
    cb({ body = json.encode({}) })

    UnregisterRawNuiCallback(`promptResp-${props.id}`);
  end)

  local result = Citizen.Await(p)

  -- Returns two results as ['closed' | 'submitted', content | null]
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