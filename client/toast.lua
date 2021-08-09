local persistentToasts = {}

--[[
  position: "top" | "top-right" | "top-left" | "bottom" | "bottom-right" | "bottom-left";
  status: 'success' | 'error' | 'warning' | 'info'
  title: string
  description: string
  id: string
]]

--- @param persistentToastOpts table Persistent toast options
local function addPersistentToast(persistentToastOpts)
  if persistentToasts[persistentToastOpts.id] then
    return errorPrint(('Persistent Toast with ID (%s) already exists!'):format(persistentToastOpts.id))
  end

  debugPrint('Adding persistent toast > ')
  debugPrint(json.encode(persistentToastOpts))

  SendReactMessage('addPersistentToast', persistentToastOpts)

  persistentToasts[persistentToastOpts.id] = persistentToastOpts
end

exports('addPersistentToast', addPersistentToast)

--- @param id string The persistent toast to clear
local function clearPersistentToast(id)
  if not persistentToasts[id] then
    return errorPrint(('Persistent Toast with ID (%s) does not exist in cache'):format(id))
  end

  SendReactMessage('clearPersistentToast', id)

  -- Clear from table
  persistentToasts[id] = nil
end

exports('clearPersistentToast', clearPersistentToast)

--[[
    message: string,
    status: 'success' | 'error' | 'warning' | 'info'
    position: "top" | "top-right" | "top-left" | "bottom" | "bottom-right" | "bottom-left";
    duration: number
    title?: string
]]
--- @param toastOpts table
local function addToast(toastOpts)
  debugPrint('Adding new toast >')
  debugPrint(json.encode(toastOpts))

  SendReactMessage('addToast', toastOpts)
end

exports('addToast', addToast)

--- Will close all open toasts including persistent ones
--- and wipe from cache
local function closeAllToasts()
  debugPrint('Clearing all toasts')
  persistentToasts = {}
  SendReactMessage('closeAllToasts', {})
end

exports('closeAllToasts', closeAllToasts)