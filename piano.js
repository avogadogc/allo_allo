function clicked(element) {
    val = keyVal(element)
    console.log('clicked ' + val)
    addChoice(val)
    print()
    verify()
    return false;
}

function onover(element) {
    val = keyVal(element)
    console.log('over ' + val)
    $("#current").text(val)
}

function onout(element) {
    console.log('out of ' + keyVal(element))
    $("#current").text('')
}

var CORRECT = ''
var NEXT = ''

var buff = []

function addChoice(value) {
    buff.unshift(value)
    while (buff.length > 8) {
        buff.pop()
    }
}

function print() {
    for (var i = 0; i < 8; i++) {
        $("#c" + i).text(buff[i])
    }
}

function verify() {
    if (buff.length != 8) return
    var content = ""
    for (var i = 0; i < 8; i++) {
        content += '-'
        content += buff[i]
    }
    var hash = sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(content))
    if (hash == CORRECT) {
        console.log('correct ' + hash)
        plain = sjcl.decrypt(content, NEXT)
        alert(plain) // TODO add eye candy
    }
}


function keyVal(element) {
    return element.getAttribute('id').replace(/^a/, "")
}

$(document).ready(function(event) {
    init('-42-42-42-42-42-42-42-42', "Init");

})

function init(pwd, msg) {
    hash = sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(pwd))
    cypher = sjcl.encrypt(pwd, msg)
    if (sjcl.decrypt(pwd, cypher) != msg) console.log('Unable to decompress')

    CORRECT = hash
    NEXT = cypher
}
