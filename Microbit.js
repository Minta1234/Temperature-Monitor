let temp = 0
// เริ่มใช้งาน Bluetooth UART
bluetooth.startUartService()
// ตั้งค่า Serial USB สำหรับเชื่อมกับคอมพิวเตอร์
serial.setBaudRate(BaudRate.BaudRate115200)
basic.forever(function () {
    temp = input.temperature()
    // ส่งค่าอุณหภูมิผ่าน USB Serial
    serial.writeLine("USB Temp:" + temp)
    // ส่งค่าอุณหภูมิผ่าน Bluetooth UART
    bluetooth.uartWriteLine("BLE Temp:" + temp)
    // แสดงผลบนหน้าจอ LED ตามอุณหภูมิ
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
    // หน่วงเวลาเพื่อไม่ส่งข้อมูลถี่เกินไป
    basic.pause(100)
})
