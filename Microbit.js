let temp = 0
bluetooth.startUartService()
basic.forever(function on_forever() {
    
    temp = input.temperature()
    
    serial.writeLine("USB Temp:" + ("" + ("" + temp)))
    bluetooth.uartWriteLine("BLE Temp:" + ("" + ("" + temp)))
    
    if (temp <= 25) {
        basic.showLeds(`
            . . . . .
            . . . . #
            . . . # .
            # . # . .
            . # . . .
            `)
    } else if (temp >= 26) {
        basic.showLeds(`
            # . . . #
            . # . # .
            . . # . .
            . # . # .
            # . . . #
            `)
    } else {
        basic.clearScreen()
    }
    

    basic.pause(500)
})
