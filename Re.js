radio.setGroup(55)

let lastCmd = "S"

// ======================
//      JOYSTICK
// ======================
basic.forever(function () {

    let x = pins.analogReadPin(AnalogPin.P1)
    let y = pins.analogReadPin(AnalogPin.P2)

    let cmd = "S"

    // Deadzone เพื่อกันค่าสุ่ม
    if (y > 700) cmd = "F"          // Forward
    else if (y < 300) cmd = "B"     // Backward
    else if (x > 700) cmd = "R"     // Turn Right
    else if (x < 300) cmd = "L"     // Turn Left
    else cmd = "S"

    // ส่งเฉพาะเมื่อคำสั่งเปลี่ยน
    if (cmd != lastCmd) {
        radio.sendString(cmd)
        lastCmd = cmd
    }

    basic.pause(60)
})


// ======================
//       BUTTONS
// ======================

// Lift Up
control.onEvent(DigitalPin.P8, DAL.MICROBIT_PIN_EVT_RISE, function () {
    radio.sendString("UP")
})

// Lift Down
control.onEvent(DigitalPin.P12, DAL.MICROBIT_PIN_EVT_RISE, function () {
    radio.sendString("DOWN")
})

// Claw Open
control.onEvent(DigitalPin.P13, DAL.MICROBIT_PIN_EVT_RISE, function () {
    radio.sendString("OPEN")
})

// Claw Close
control.onEvent(DigitalPin.P14, DAL.MICROBIT_PIN_EVT_RISE, function () {
    radio.sendString("CLOSE")
})
