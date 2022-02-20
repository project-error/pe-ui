ContextMenu = {}
ContextMenu.__index = ContextMenu

function ContextMenu.new(title, items)
    self = {}
    setmetatable(self, ContextMenu)
    self._title = title
    self._items = items or {}

    return self
end

function ContextMenu:addItem(title, cb, condition)
    if condition or condition == nil then
        self._items[#self._items + 1] = { id = #self._items + 1, title = title, cb = cb }
    end
end

function ContextMenu:openMenu()
    SendReactMessage('openMenu', { title = self._title, items = self._items })
end

function ContextMenu:onClick(data)
    local menuItem = locateTableItem(self._items, data)
    if (menuItem == nil) then return errorPrint("Menu item was not found.") end

    menuItem.cb()
end

function ContextMenu:closeMenu()
    SendReactMessage('closeMenu')
end

RegisterNuiCallback('contextMenuOnClick', function(data)
    ContextMenu:onClick(data)
end)