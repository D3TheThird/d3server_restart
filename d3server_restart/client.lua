ESX = nil

Citizen.CreateThread(function()
    while ESX == nil do
        TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)
        Citizen.Wait(0)
    end
end)

RegisterNetEvent('restart_ui:showNotification')
AddEventHandler('restart_ui:showNotification', function(timeRemaining)
    SendNUIMessage({
        action = 'show',
        time = timeRemaining
    })
    Citizen.Wait(5000) -- Wait for 5 seconds
    SendNUIMessage({
        action = 'hide'
    })
end)
