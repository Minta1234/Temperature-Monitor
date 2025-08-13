// เมื่อ Bluetooth เชื่อมต่อ
bluetooth.onBluetoothConnected(function () {
    bleActive = true
    // ปิด USB ถ้า BLE เชื่อมต่อ
    usbActive = false
    basic.showIcon(IconNames.SmallSquare)
    serial.writeLine("[BLE] Connected")
})
// เมื่อ Bluetooth ตัดการเชื่อมต่อ
bluetooth.onBluetoothDisconnected(function () {
    bleActive = false
    basic.showIcon(IconNames.Square)
    serial.writeLine("[BLE] Disconnected")
})
// เมื่อมีข้อมูล Bluetooth UART เข้ามา
bluetooth.onUartDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    if (bleActive) {
        received = bluetooth.uartReadUntil(serial.delimiters(Delimiters.NewLine))
        serial.writeLine("[BLE RX] " + received)
        basic.showIcon(IconNames.Heart)
    }
})
// ตรวจสอบ USB ว่ามีการอ่านข้อมูลเข้ามาหรือไม่
serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    usbActive = true
    // ปิด BLE ถ้า USB ถูกใช้งาน
    bleActive = false
})
let temp = 0
let received = ""
let usbActive = false
let bleActive = false
// เริ่มใช้งาน Bluetooth UART
bluetooth.startUartService()
// ตั้งค่า Serial USB สำหรับเชื่อมกับคอมพิวเตอร์
serial.setBaudRate(BaudRate.BaudRate115200)
// Loop หลัก: ส่งค่าอุณหภูมิ
basic.forever(function () {
    temp = input.temperature()
    // ส่งเฉพาะช่องทางที่ active
    if (usbActive) {
        serial.writeLine("USB Temp:" + temp)
    } else if (bleActive) {
        bluetooth.uartWriteLine("BLE Temp:" + temp)
    }
    // แสดง LED ตามอุณหภูมิ
    if (temp <= 25) {
        basic.showLeds(`
            . . . . .
            . . . . #
            . . . # .
            # . # . .
            . # . . .
            `)
    } else {
        basic.showLeds(`
            # . . . #
            . # . # .
            . . # . .
            . # . # .
            # . . . #
            `)
    }
    // ส่งทุก 1 วินาที
    basic.pause(1000)
})
