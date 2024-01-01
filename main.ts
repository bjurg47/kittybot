input.onLogoEvent(TouchButtonEvent.Touched, function () {
    actief = 0
    speed = 0
    basic.showLeds(`
        . . . . .
        # # . # #
        # # . # #
        . . . . .
        . . . . .
        `)
    basic.pause(1000)
})
input.onButtonPressed(Button.A, function () {
    actief = 1
    speed = 100
    basic.showIcon(IconNames.Rollerskate)
})
input.onButtonPressed(Button.B, function () {
    actief = 0
    speed = 0
    basic.showIcon(IconNames.StickFigure)
})
let Stap = 0
let speed = 0
let actief = 0
basic.showLeds(`
    . . . # #
    . . . # .
    # # # # .
    # # # # .
    . # . # .
    `)
actief = 0
speed = 100
let Reverse = -100
let Afstand = 30
let graden = 90
let Scanner = 0
let strip = APA102.createStrip(4, PixelMode.RGB)
strip.setPixelColor(0, APA102.colors(PixelColors.White))
strip.show()
basic.pause(1000)
strip.setPixelColor(1, APA102.colors(PixelColors.Red))
strip.show()
basic.pause(1000)
strip.setPixelColor(2, APA102.colors(PixelColors.Green))
strip.show()
basic.pause(1000)
strip.setPixelColor(3, APA102.colors(PixelColors.Blue))
strip.show()
KitiBot.Servo(graden)
music._playDefaultBackground(music.builtInPlayableMelody(Melodies.Blues), music.PlaybackMode.UntilDone)
strip.clear()
basic.forever(function () {
    while (actief == 0) {
        strip.setPixelColor(1, APA102.colors(PixelColors.Red))
        strip.show()
        basic.showIcon(IconNames.StickFigure)
        basic.pause(1000)
    }
    strip.setPixelColor(1, APA102.colors(PixelColors.Green))
    strip.show()
    speed = 100
    basic.showArrow(ArrowNames.North)
    graden = 90
    KitiBot.Servo(graden)
    Stap = 5
    Scanner = 1
    while (KitiBot.Ultrasonic() > Afstand) {
        KitiBot.RunDelay(Dir.forward, speed, 1)
    }
    Scanner = 0
    KitiBot.RunDelay(Dir.backward, speed, 5)
    KitiBot.Run(Dir.stop, 0)
    KitiBot.Servo(45)
    basic.showArrow(ArrowNames.NorthEast)
    if (KitiBot.Ultrasonic() > Afstand) {
        KitiBot.RunDelay(Dir.turnRight, speed, 2)
        basic.pause(1000)
    } else {
        KitiBot.Servo(0)
        basic.showArrow(ArrowNames.East)
        if (KitiBot.Ultrasonic() > Afstand) {
            KitiBot.RunDelay(Dir.turnRight, speed, 5)
            basic.pause(1000)
        } else {
            KitiBot.Servo(135)
            basic.showArrow(ArrowNames.NorthWest)
            if (KitiBot.Ultrasonic() > Afstand) {
                KitiBot.RunDelay(Dir.turnLeft, speed, 2)
                basic.pause(1000)
            } else {
                KitiBot.Servo(180)
                basic.showArrow(ArrowNames.West)
                if (KitiBot.Ultrasonic() > Afstand) {
                    KitiBot.RunDelay(Dir.turnLeft, speed, 5)
                } else {
                    KitiBot.Servo(180)
                    basic.showArrow(ArrowNames.South)
                    KitiBot.RunDelay(Dir.turnLeft, speed, 11)
                    basic.pause(1000)
                }
                basic.pause(1000)
            }
        }
    }
})
control.inBackground(function () {
    while (true) {
        if (Scanner > 0) {
            graden += Stap
            KitiBot.Servo(graden)
            if (graden > 135 || graden < 45) {
                Stap = -1 * Stap
            }
        }
        basic.pause(100)
    }
})
