bluetooth.onBluetoothConnected(function () {
    setRoute(Route.BLE)
})
bluetooth.onBluetoothDisconnected(function () {
    setRoute(Route.USB)
})
input.onButtonPressed(Button.A, function () {
    sn = control.deviceSerialNumber()
    writeLineActive("Chip Info: micro:bit SN=" + sn)
})
bluetooth.onUartDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    rx = bluetooth.uartReadUntil(serial.delimiters(Delimiters.NewLine))
    setRoute(Route.BLE)
bluetooth.uartWriteLine("[RX] " + rx)
})
serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    setRoute(Route.USB)
})
function writeLineActive (msg: string) {
    if (currentRoute == Route.USB) {
        serial.writeLine(msg)
    } else {
        bluetooth.uartWriteLine(msg)
    }
}
let rx = ""
let sn = 0
enum Route { USB, BLE }
let currentRoute = Route.USB
bluetooth.startUartService()
bluetooth.startTemperatureService()
serial.setBaudRate(BaudRate.BaudRate115200)
function setRoute(r: Route) {
    if (currentRoute == r) return
        currentRoute = r
                if (currentRoute == Route.USB) {
                        serial.writeLine("[MODE] USB active; BLE muted")
                            } else {
                                    bluetooth.uartWriteLine("[MODE] BLE active; USB muted")
                                        }
                                        }
basic.forever(function () {
    if (currentRoute == Route.USB) {
        serial.writeLine("USB Temp:" + input.temperature())
    } else {
        bluetooth.uartWriteLine("BLE Temp:" + input.temperature())
    }
    if (input.temperature() < 24) {
        basic.showIcon(IconNames.Happy)
    } else if (input.temperature() >= 28) {
        basic.showIcon(IconNames.Sad)
    }
    basic.pause(100)
})
basic.forever(function () {
    if (input.temperature() == 25) {
        basic.showIcon(IconNames.SmallSquare)
    }
    if (input.temperature() == 26) {
        basic.showIcon(IconNames.SmallSquare)
    }
    if (input.temperature() == 27) {
        basic.showIcon(IconNames.SmallSquare)
    }
})
