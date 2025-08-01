
temp = 0
bluetooth.start_uart_service()

def on_forever():
    global temp
    temp = input.temperature()
  
    serial.write_line("USB Temp:" + ("" + str(temp)))
    bluetooth.uart_write_line("BLE Temp:" + ("" + str(temp)))
  
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
  
    basic.pause(500)
basic.forever(on_forever)
