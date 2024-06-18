ESX = nil

TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)

RegisterServerEvent('txAdmin:events:scheduledRestart')
AddEventHandler('txAdmin:events:scheduledRestart', function(eventData)
    local timeRemaining = eventData.secondsRemaining
    TriggerClientEvent('restart_ui:showNotification', -1, timeRemaining)
end)

-- Register the command for testing the restart UI
RegisterCommand('testrestart', function(source, args, rawCommand)
    local xPlayer = ESX.GetPlayerFromId(source)
    if xPlayer.getGroup() == 'admin' then
        TriggerClientEvent('restart_ui:showNotification', source, 600) -- Show test notification with 10 minutes remaining
    else
        TriggerClientEvent('chat:addMessage', source, { args = { '^1SYSTEM', 'You do not have permission to use this command.' } })
    end
end, false)
