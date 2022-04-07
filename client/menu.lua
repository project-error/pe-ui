ContextMenu = {}
ContextMenu.__index = ContextMenu

local ActiveMenu = nil

function ContextMenu.new(title, items)
    self = {}
    setmetatable(self, ContextMenu)
    self._title = title
    self._items = items or {}

    return self
end

function ContextMenu:addItem(title, cb, closeOnClick, condition)
    if condition or condition == nil then
        self._items[#self._items + 1] = { id = #self._items + 1, title = title, closeOnClick = closeOnClick, cb = cb }
    end
end

function ContextMenu:onClick(data)
    local menuItem = locateMenuTableItem(self._items, data.id)
    if (menuItem == nil) then return errorPrint("Menu item was not found.") end

    menuItem.cb()
end

RegisterNUICallback('onMenuItemClick', function(data, cb)
    ActiveMenu:onClick(data)
    if data.closeOnClick == true then
        ActiveMenu:closeMenu()
    end
end)

function ContextMenu:openMenu()
    local items = {}
    for k,v in ipairs(self._items) do
        items[k] = {}

        items[k]["id"] = v.id
        items[k]["title"] = v.title
        items[k]["closeOnClick"] = v.closeOnClick
    end

    SendReactMessage('openMenu', { title = self._title, items = items })
    SetNuiFocus(true, true)

    ActiveMenu = self
end

function ContextMenu:closeMenu()
    SendReactMessage('closeMenu', {})
    SetNuiFocus(false)
end

RegisterNUICallback('onCloseMenu', function(data, cb)
    SetNuiFocus(false)
    cb()
end)
