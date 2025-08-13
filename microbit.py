# เมื่อ Bluetooth เชื่อมต่อ
def on_bluetooth_connected():
    global bleActive, usbActive
    bleActive = True
    # ปิด USB ถ้า BLE เชื่อมต่อ
    usbActive = False
    basic.show_icon(IconNames.SMALL_SQUARE)
    serial.write_line("[BLE] Connected")
bluetooth.on_bluetooth_connected(on_bluetooth_connected)

# เมื่อ Bluetooth ตัดการเชื่อมต่อ

def on_bluetooth_disconnected():
    global bleActive
    bleActive = False
    basic.show_icon(IconNames.SQUARE)
    serial.write_line("[BLE] Disconnected")
bluetooth.on_bluetooth_disconnected(on_bluetooth_disconnected)

# เมื่อมีข้อมูล Bluetooth UART เข้ามา

def on_uart_data_received():
    global received
    if bleActive:
        received = bluetooth.uart_read_until(serial.delimiters(Delimiters.NEW_LINE))
        serial.write_line("[BLE RX] " + received)
        basic.show_icon(IconNames.HEART)
bluetooth.on_uart_data_received(serial.delimiters(Delimiters.NEW_LINE),
    on_uart_data_received)

# ตรวจสอบ USB ว่ามีการอ่านข้อมูลเข้ามาหรือไม่

def on_data_received():
    global usbActive, bleActive
    usbActive = True
    # ปิด BLE ถ้า USB ถูกใช้งาน
    bleActive = False
serial.on_data_received(serial.delimiters(Delimiters.NEW_LINE), on_data_received)

temp = 0
received = ""
usbActive = False
bleActive = False
# เริ่มใช้งาน Bluetooth UART
bluetooth.start_uart_service()
# ตั้งค่า Serial USB สำหรับเชื่อมกับคอมพิวเตอร์
serial.set_baud_rate(BaudRate.BAUD_RATE115200)
# Loop หลัก: ส่งค่าอุณหภูมิ

def on_forever():
    global temp
    temp = input.temperature()
    # ส่งเฉพาะช่องทางที่ active
    if usbActive:
        serial.write_line("USB Temp:" + str(temp))
    elif bleActive:
        bluetooth.uart_write_line("BLE Temp:" + str(temp))
    # แสดง LED ตามอุณหภูมิ
    if temp <= 25:
        basic.show_leds("""
            . . . . .
            . . . . #
            . . . # .
            # . # . .
            . # . . .
            """)
    else:
        basic.show_leds("""
            # . . . #
            . # . # .
            . . # . .
            . # . # .
            # . . . #
            """)
    # ส่งทุก 1 วินาที
    basic.pause(1000)
basic.forever(on_forever)
