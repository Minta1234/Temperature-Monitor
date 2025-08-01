temp = 0
# เริ่มใช้งาน Bluetooth UART
bluetooth.start_uart_service()
# ตั้งค่า Serial USB สำหรับเชื่อมกับคอมพิวเตอร์
serial.set_baud_rate(BaudRate.BAUD_RATE115200)

def on_forever():
    global temp
    temp = input.temperature()
    # ส่งค่าอุณหภูมิผ่าน USB Serial
    serial.write_line("USB Temp:" + str(temp))
    # ส่งค่าอุณหภูมิผ่าน Bluetooth UART
    bluetooth.uart_write_line("BLE Temp:" + str(temp))
    # แสดงผลบนหน้าจอ LED ตามอุณหภูมิ
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
    # หน่วงเวลาเพื่อไม่ส่งข้อมูลถี่เกินไป
    basic.pause(100)
basic.forever(on_forever)
