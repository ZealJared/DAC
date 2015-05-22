Prism.languages.arduino = {
    comment: {
        pattern: /(^|[^\\])(\/\*[\w\W]*?\*\/|(^|[^:])\/\/.*?(\r?\n|$))/g,
        lookbehind: true
    },
    string: /("|')(\\?.)*?\1/g,
    property: {
        pattern: /#[a-zA-Z]+\ .*/g,
        inside: {
            property: /<[a-zA-Z.]+>/g
        }
    },
    important: /\b(setup|loop)\b/gi,
    keyword: /\b(if|else|for|switch|case|while|do|break|continue|return|goto|void|boolean|char|unsigned|int|word|long|short|float|double|string|String|array|static|volatile|const|sizeof)\b/g,
    selector: /\b(requestFrom|beginTransmission|endTransmission|onReceive|onRequest|disconnect|config|setDNS|SSID|BSSID|RSSID|encryptionType|scanNetworks|getSocket|macAddress|subnetMask|gatewayIP|isValid|background|stroke|noStroke|fill|noFill|text|setTextSize|point|line|rect|width|height|circle|image|loadImage|setSpeed|step|isListening|overflow|listen|setBitOrder|setClockDivider|setDataMode|transfer|writeMicrosends|exist|mkdir|open|remove|rmdir|close|position|size|isDirectory|openNextFile|rewindDirectory|clear|home|setCursor|cursor|noCursor|blink|noBlink|display|noDisplay|scrollDisplayLeft|scrollDisplayRight|autoscroll|noAutoscroll|leftToRight|rightToLeft|createChar|attachGPRS|beginWrite|endWrite|beginSMS|endSMS|remoteNumber|peek|flush|shutdown|getVoiceCallStatus|ready|voiceCall|answerCall|hangCall|retrieveCallingNumber|printVersion|blinkVersion|printFirmwareVersion|setFirmwareVersion|sendAnalog|sendDigitalPorts|sendDigitalPortPair|sendSysex|sendString|processInput|attach|detach|callbackFunction|systemResetCallbackFunction|stringCallbackFunction|sysexCallbackFunction|connect|connected|flush|stop|beginPacket|endPacket|parsePacket|stop|remoteIP|remotePort|begin|available|localIP|maintain|read|write|print|println|pinMode|digitalWrite|digitalRead|analogReference|analogRead|analogWrite|analogReadResolution|analogWriteResolution|tone|noTone|shiftOut|shiftIn|pulseIn|millis|micros|delay|delayMicroseconds|min|max|abs|constrain|map|pow|sqrt|sin|cos|tan|randomSeed|random|lowByte|highByte|bitRead|bitWrite|bitSet|bitClear|bit|attachInterrupt|detachInterrupt|interrupts|noInterrupts)\b/g,
    "boolean": /\b(HIGH|LOW|INPUT|OUTPUT|INPUT_PULLUP|LED_BUILTIN|true|false)\b/g,
    number: /\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?)\b/g,
    'attr-value': /\b(Serial|EEPROM|Ethernet|Stream|Keyboard|Mouse|IPAddress|Server|EthernetServer|Client|EthernetClient|Firmata|GSM|GSMVoiceCall|GSM_SMS|GPRS|GSMClient|LiquidCrystal|SD|Servo|SPI|SoftwareSerial|Stepper|TFT|EsploraTFT|Pimage|WiFi|WiFiServer|WiFiClient|WiFiUDP|Wire)\b/g,
    operator: /[-+]{1,2}|!=?|<{1,2}=?|>{1,2}=?|\->|={1,2}|\^|~|%|(&){1,2}|\|?\||\?|\*|\//g,
    punctuation: /[{}[\];(),.:]/g
};