
local resName = GetCurrentResourceName()
local configData = json.decode(LoadResourceFile(resName, 'config.json'))

local responseTemplates = {
  FAIL_NULL = "%s ^1Update Check Failed (Null Response)",
  UPDATE = [[
Your %s is currently ^1outdated!^0

The latest version is ^2%s^0, your version is ^8%s^0

You can download the latest release from https://github.com/project-error/pe-ui/
]],
  FAIL_ERR = "%s Error in update check, error code: %d",
  PRERELEASE = "%s You may be using a pre-release version. Your version: ^1%s^0, GitHub version: ^2%s\"",
  UP_TO_DATE = "%s ^2(v%s) is up to date and has started"
}

local function getUpdateInfo()
  local resPrefix = (resName == 'pe-ui') and "^3[pe-ui]^0" or ("^3[pe-ui] ^3(%s)^0"):format(resName)
  local curVersion = LoadResourceFile(resName, "version")


  local function updateCheckHandler(respCode, respText)
    -- If we dont get a resp or dont have a 'version' file
    if not respText or not curVersion then
      print(responseTemplates.FAIL_NULL:format(resPrefix))
    ---- If a newer version is detected on github
    elseif curVersion ~= respText and tonumber(curVersion) < tonumber(respText) then
      print("\n^1###############################\n")
      print(responseTemplates.UPDATE:format(resPrefix, respText, curVersion))
      print("\n^1###############################\n")
    --  If our current version is higher than github master
    elseif tonumber(curVersion) > tonumber(respText) then
      print(responseTemplates.PRERELEASE:format(resPrefix, curVersion, respText))
    --  Non 200 respCode handling
    elseif respCode < 200 or respCode > 299 then
      print(responseTemplates.FAIL_ERR:format(resPrefix, respCode))
     --Latest version running
    else
      print(responseTemplates.UP_TO_DATE:format(resPrefix, respText))
    end
  end

  PerformHttpRequest("https://raw.githubusercontent.com/project-error/pe-ui/master/version", updateCheckHandler, "GET")
end


CreateThread(function()
  if configData.updateChecker then
    getUpdateInfo()
  end
end)