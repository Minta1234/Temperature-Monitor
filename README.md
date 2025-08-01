# Temperature-Monitor


JavaScript 
'''
let temp = 0
bluetooth.startUartService()
basic.forever(function on_forever() {
    
    temp = input.temperature()
    //  แสดงผลผ่าน Serial และ Bluetooth
    serial.writeLine("USB Temp:" + ("" + ("" + temp)))
    bluetooth.uartWriteLine("BLE Temp:" + ("" + ("" + temp)))
    //  แสดงไอคอนตามอุณหภูมิ
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
    
    //  ส่งข้อมูลทุก 0.5 วินาที เพื่อความปลอดภัย
    basic.pause(500)
})
'''


python
'''
temp = 0
bluetooth.start_uart_service()

def on_forever():
    global temp
    temp = input.temperature()
    # แสดงผลผ่าน Serial และ Bluetooth
    serial.write_line("USB Temp:" + ("" + str(temp)))
    bluetooth.uart_write_line("BLE Temp:" + ("" + str(temp)))
    # แสดงไอคอนตามอุณหภูมิ
    if temp <= 25:
        basic.show_leds("""
            . . . . .
            . . . . #
            . . . # .
            # . # . .
            . # . . .
            """)
    elif temp >= 26:
        basic.show_leds("""
            # . . . #
            . # . # .
            . . # . .
            . # . # .
            # . . . #
            """)
    else:
        basic.clear_screen()
    # ส่งข้อมูลทุก 0.5 วินาที เพื่อความปลอดภัย
    basic.pause(500)
basic.forever(on_forever)
'''
