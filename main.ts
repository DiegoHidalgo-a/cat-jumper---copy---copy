namespace SpriteKind {
    export const Coin = SpriteKind.create()
    export const Flower = SpriteKind.create()
    export const Fireball = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Coin, function (sprite, otherSprite) {
    info.changeScoreBy(1)
    otherSprite.destroy()
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Hops_and_Paw.vy == 0) {
        Hops_and_Paw.vy = -150
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`tile3`, function (sprite, location) {
    game.setGameOverEffect(false, effects.melt)
    game.gameOver(false)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`tile2`, function (sprite, location) {
    current_level += 1
    startLevel()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Flower, function (sprite, otherSprite) {
    otherSprite.destroy()
    bee = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Enemy)
    animation.runImageAnimation(
    bee,
    [img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . f f f f f f f . . . . . 
        . . . f 1 1 1 f 1 1 1 f . . . . 
        . . . f 1 1 1 f 1 1 1 f . . . . 
        . . . . . 1 1 1 1 1 . . . . . . 
        . . . . f f f f f f f . . . . . 
        . . . f 5 5 5 f 5 5 5 f . . . . 
        . . . f f 5 5 f 5 5 f f . . . . 
        . . . f 5 5 5 f 5 5 5 f . . . . 
        . . . . f f f f f f f . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . f f f f f f f . . . . . 
        . . . f 5 5 5 f 5 5 5 f . . . . 
        . . . f f 5 5 f 5 5 f f . . . . 
        . . . f 5 5 5 f 5 5 5 f . . . . 
        . . . . f f f f f f f . . . . . 
        `],
    100,
    true
    )
    bee.setPosition(Hops_and_Paw.x + 80, Hops_and_Paw.y - 80)
    bee.follow(Hops_and_Paw, 50)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Fireball, function (sprite, otherSprite) {
    info.changeLifeBy(-2)
    otherSprite.destroy()
})
function startLevel () {
    if (current_level == 0) {
        tiles.setTilemap(tilemap`level`)
    } else if (current_level == 1) {
        tiles.setTilemap(tilemap`level_0`)
    } else if (current_level == 2) {
        tiles.setTilemap(tilemap`level_1`)
    } else {
        game.gameOver(true)
    }
    tiles.placeOnRandomTile(Hops_and_Paw, assets.tile`tile6`)
    for (let value of tiles.getTilesByType(assets.tile`tile6`)) {
        tiles.setTileAt(value, assets.tile`tile0`)
    }
    scene.cameraFollowSprite(Hops_and_Paw)
    info.setLife(5)
    for (let value2 of sprites.allOfKind(SpriteKind.Enemy)) {
        value2.destroy()
    }
    for (let value3 of sprites.allOfKind(SpriteKind.Coin)) {
        value3.destroy()
    }
    for (let value4 of sprites.allOfKind(SpriteKind.Flower)) {
        value4.destroy()
    }
    for (let value5 of tiles.getTilesByType(assets.tile`tile4`)) {
        flower = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . f f f f f f f . . . . 
            . . . . f 5 5 5 5 5 5 5 f . . . 
            . . . f 5 5 4 4 4 4 5 5 5 f . . 
            . . f 5 5 5 5 5 5 5 5 5 5 5 f . 
            . . f 5 4 5 5 5 5 5 5 5 5 5 f . 
            . . f 5 4 5 5 5 5 5 5 5 5 5 f . 
            . . f 5 4 5 5 5 5 5 5 5 5 5 f . 
            . . f 5 4 5 5 5 5 5 5 5 5 5 f . 
            . . f 5 4 5 5 5 5 5 5 5 5 5 f . 
            . . f 5 4 5 5 5 5 5 5 5 5 5 f . 
            . . . f 5 5 4 4 5 5 5 5 5 f . . 
            . . . . f 5 5 5 5 5 5 5 f . . . 
            . . . . . f f f f f f f . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Coin)
        animation.runImageAnimation(
        flower,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . . f f f f f f f . . . . . 
            . . . f 5 5 5 5 5 5 5 f . . . . 
            . . f 5 4 4 4 4 4 5 5 5 f . . . 
            . f 5 4 5 5 5 5 5 5 5 5 5 f . . 
            . f 5 4 5 5 5 5 5 5 5 5 5 f . . 
            . f 5 4 5 5 5 5 5 5 5 5 5 f . . 
            . f 5 4 5 5 5 5 5 5 5 5 5 f . . 
            . f 5 4 5 5 5 5 5 5 5 5 5 f . . 
            . f 5 4 5 5 5 5 5 5 5 5 5 f . . 
            . f 5 5 5 5 5 5 5 5 5 5 5 f . . 
            . . f 5 5 4 4 4 5 5 5 5 f . . . 
            . . . f 5 5 5 5 5 5 5 f . . . . 
            . . . . f f f f f f f . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . f f f f f . . . . . . 
            . . . . f 5 5 5 5 5 f . . . . . 
            . . . f 5 4 4 4 4 5 5 f . . . . 
            . . f 5 4 5 5 5 5 5 5 5 f . . . 
            . . f 5 4 5 5 5 5 5 5 5 f . . . 
            . . f 5 4 5 5 5 5 5 5 5 f . . . 
            . . f 5 4 5 5 5 5 5 5 5 f . . . 
            . . f 5 4 5 5 5 5 5 5 5 f . . . 
            . . f 5 4 5 5 5 5 5 5 5 f . . . 
            . . f 5 5 5 5 5 5 5 5 5 f . . . 
            . . . f 5 5 4 4 5 5 5 f . . . . 
            . . . . f 5 5 5 5 5 f . . . . . 
            . . . . . f f f f f . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . f f f . . . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . f 5 4 4 5 5 f . . . . . 
            . . . f 5 4 5 5 5 5 5 f . . . . 
            . . . f 5 4 5 5 5 5 5 f . . . . 
            . . . f 5 4 5 5 5 5 5 f . . . . 
            . . . f 5 4 5 5 5 5 5 f . . . . 
            . . . f 5 4 5 5 5 5 5 f . . . . 
            . . . f 5 4 5 5 5 5 5 f . . . . 
            . . . f 5 5 5 5 5 5 5 f . . . . 
            . . . . f 5 5 4 5 5 f . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . . f f f . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . f 5 4 5 f . . . . . . 
            . . . . f 5 4 5 5 5 f . . . . . 
            . . . . f 5 4 5 5 5 f . . . . . 
            . . . . f 5 4 5 5 5 f . . . . . 
            . . . . f 5 4 5 5 5 f . . . . . 
            . . . . f 5 4 5 5 5 f . . . . . 
            . . . . f 5 4 5 5 5 f . . . . . 
            . . . . f 5 5 5 5 5 f . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . f 4 f . . . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . f 4 f . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . f 4 f . . . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . f 5 4 5 f . . . . . . 
            . . . . f 5 4 5 5 5 f . . . . . 
            . . . . f 5 4 5 5 5 f . . . . . 
            . . . . f 5 4 5 5 5 f . . . . . 
            . . . . f 5 4 5 5 5 f . . . . . 
            . . . . f 5 4 5 5 5 f . . . . . 
            . . . . f 5 4 5 5 5 f . . . . . 
            . . . . f 5 5 5 5 5 f . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . f f f . . . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . f 5 4 4 5 5 f . . . . . 
            . . . f 5 4 5 5 5 5 5 f . . . . 
            . . . f 5 4 5 5 5 5 5 f . . . . 
            . . . f 5 4 5 5 5 5 5 f . . . . 
            . . . f 5 4 5 5 5 5 5 f . . . . 
            . . . f 5 4 5 5 5 5 5 f . . . . 
            . . . f 5 4 5 5 5 5 5 f . . . . 
            . . . f 5 5 5 5 5 5 5 f . . . . 
            . . . . f 5 5 4 5 5 f . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . . f f f . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `],
        100,
        true
        )
        tiles.placeOnTile(flower, value5)
        tiles.setTileAt(value5, assets.tile`tile0`)
    }
    for (let value6 of tiles.getTilesByType(assets.tile`tile5`)) {
        flower = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . 3 a . . a 3 . . . . . . 
            . . . . a 3 2 2 3 a . . . . . . 
            . . 7 7 . a 3 3 a . . . . . . . 
            . . 7 7 7 . c c . 7 7 . . . . . 
            . . . 8 7 7 7 . 7 7 7 . . . . . 
            . . . 8 8 7 7 7 7 8 . . . . . . 
            . . . . . 8 7 7 8 . . . . . . . 
            . . . . . . 7 8 . . . . . . . . 
            `, SpriteKind.Flower)
        tiles.placeOnTile(flower, value6)
        tiles.setTileAt(value6, assets.tile`tile0`)
    }
    for (let value7 of tiles.getTilesByType(assets.tile`tile11`)) {
        fireball = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . 5 . . . . . . . . 
            . . . . 5 5 2 5 5 4 5 5 . . . . 
            . . . . . 4 4 4 4 2 4 . . . . . 
            . . . 5 4 4 2 2 2 2 4 5 . . . . 
            . . . 5 4 . 2 8 2 8 4 2 . . . . 
            . . . 5 5 . 2 8 8 2 4 5 . . . . 
            . . . 2 5 2 2 8 2 4 4 5 . . . . 
            . . . . 5 4 2 2 2 4 5 . . . . . 
            . . . . . . 4 . 4 4 5 . . . . . 
            . . . 5 . 5 5 5 4 5 5 . . . . . 
            . . . . . . . 2 5 5 . . . . . . 
            . . . . . . . . . . . . . 5 . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Fireball)
        tiles.placeOnTile(fireball, value7)
        tiles.setTileAt(value7, assets.tile`tile0`)
        animation.runMovementAnimation(
        fireball,
        "c 0 -100 0 100 0 0",
        2000,
        true
        )
        fireball.startEffect(effects.fire)
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    if (Hops_and_Paw.y < otherSprite.y) {
        info.changeScoreBy(3)
    } else {
        info.changeLifeBy(-1)
    }
})
let fireball: Sprite = null
let flower: Sprite = null
let bee: Sprite = null
let Hops_and_Paw: Sprite = null
let current_level = 0
scene.setBackgroundColor(9)
scene.setBackgroundImage(img`
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffff11111ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffff111111111ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffff1111111111111ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffff111111111111111ffffffff1111111ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffff11111111111111111fffff1111111111fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffff111111111111111111ffff11111111111ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffff11111111111111111111ff1111111111111fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffff111ffff111111111111111111111111111111111111ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffff11111ff1111111111111111111111111111111111111ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffff111111f11111111111111111111111111111111111111fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffff1111111111111111111111111111111111111111111111fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffff1111111111111111111111111111111111111111111111fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffff1111111111111111111111111111111111111111111111ffffffffffffffffffffffffffffffff11111fffffffffffffffffffffffffffffffffffffffffff1111fffffffffffffff
    ffffffffffffff111111111111111111111111111111111111111111111111fffffffffffffffffffffffffffffff1111111fffffff111ffffffffffffffffffffffffffffff1111111f1111ffffffff
    ffffffffffffff111111111111111111111111111111111111111111111111fffffffffffffffffffffffffffffff11111111ff11111111ffffffffffffffffffffffffffff11111111111111fffffff
    ffffffffffffff111111111111111111111111111111111111111111111111ffffffffffffffffffffffffffffff1111111111f111111111ffffffffffffffffffffffffff1111111111111111ffffff
    ffffffffffffff111111111111111111111111111111111111111111111111ffffffffffffffffffffffffffffff111111111111111111111ffffffffffffffffffffffff11111111111111111ffffff
    ffffffffffffffff111111111111111111111111111111111111111111111fffffffffffffffffffffffffffffff111111111111111111111ff111fffffffffffffffffff11111111111111111ffffff
    fffffffffffffff1111111111111111111111111111111111111111111ffffffffffffffffffffffffffffffffff111111111111111111111111111fffffffffffffffff111111111111111111ffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff11111111111111111111111111111fffffffffffffff111111111111111111ffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff11111111111111111111111111111fffffffffffffff11111111111111111ffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff11111111111111111111111111111ffffffffffffffff11111111111111fffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff11111111111111111111111111111fffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff111111111111111111111111111111ffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffff22fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffff2222ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffff222222ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffff2222222222ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffff22222222222ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffff2222222222222fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffff22222222222222fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffff222222222222222222fffffffffffffffffffffffffffffffffffff2222fffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffff2222222222222222222222ffffffffffffffffffffffffffffffff222222fffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffff2222222222222222222222222ffffffffffffffffffffffffffff222222222ffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffff2222222222222222222222222222fffffffffffffffffffffffff2222222222ffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffff2222222222222222222222222222222fffffffffffffffffffffff222222222222fffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffff2222222222222222222222222222222222ffffffffffffffffffff222222222222222ffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffff22222222222222222222222222222222222222fffffffffffffffff2222222222222222ffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffff222222222222222222222222222222222222222222fffffffffffff2222222222222222222ffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffff2222222222222222222222222222222222222222222222fffffffffff222222222222222222222222ffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffff2222222222222222222222222222222222222222222222222ffffffff222222222222222222222222222ffffffffffffffffffffffff2fffffffffffffffffff
    fffffffffffffffffffffffffffff222222222222222222222222222222222222222222222222222222fffff222222222222222222222222222222ffffffffffffffffffff22222fffffffffffffffff
    fffffffffffffffffffffffffff2222222222222222222222222222222222222222222222222222222922222222222222222222222222222222222222fffffffffffffff22222222ffffffffffffffff
    fffffffffffffffffffffffff22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222fffffffffff222222222222ffffffffffffff
    fffffffffffffffffffff22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222ffffffff2222222222222ffffffffffffff
    fffffffffffffff22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222fff22222222222222222ffffffffffff
    fffffffff22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222fffffffffff
    fffffff22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222ffffffffff
    22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222ffffffff
    2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222ffffff
    2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222fff
    2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222f22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222f22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
    222222222222222222222222222222222f222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
    22222222222222222222222222222222f2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
    22222222222222222222222222222222f2222222222222222222222222222222f22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222f22222222222222222222222222222222f22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222f2222222222222222222222222222222fffffffff2222222222222222222222222222222222222ff2222222222222222222222222222222222222222222222222
    222222222222222222222222222222f22222222222222222222222222222222f22222222ffff2222222222222222222222222222222ff2f2222222222222222222222222222222222222222222222222
    222222222222222222222222222222f22222222222222222222222222222222f222222222222ff2222222222222222222222222222f222f2222222222222222222222222222222222222222222222222
    22222222222222222222222222222f22222222222222222222222222222222f222222222222222f22222222222222222222222222f222f22222222222222222222222222222222222222222222222222
    22222222222222222222222222222f22222222222222222222222222222222f2222222222222222f222222222222222222222222ff222f22222222222222222222222222222222222222222222222222
    2222222222222222222222222222f22222222222222222222222222222222f222222222222222222f2222222222222222222222f22222f22222222222222222222222222222222222222222222222222
    2222222222222222222222222222f22222222222222222222222222222222f2222222222222222222f22222222222222222222f22222f222222222222222222222222222222222222222222222222222
    222222222222222222222222222f22222222222222222222222222222222f22222222222222222222f2222222222222222222f222222f222222222222222222222222222222222222222222222222222
    222222222222222222222222222f22222222222222222222222222222222f22222222222222222222f2222222222222222222f222222f222222222222222222222222222222222222222222222222222
    22222222222222222222222222f222222222222222222222222222222222f22222222222222222222f222222222222222222f2222222f222222222222222222222222222222222222222222222222222
    2222222222222222222222222f222222222222222222222222222222222f2222222222222222222222f2222222222222222f22222222f222222222222222222222222222222222222222222222222222
    2222222222222222222222222f222222222222222222222222222222222f2222222222222222222222f222222222222222f222222222f222222222222222222222222222222222222222222222222222
    222222222222222222222222f2222222222222222222222222222222222f2222222222222222222222f22222222222222f2222222222f222222222222222222222222222222222222222222222222222
    222222222222222222222222f2222222222222222222222222222222222f2222222222222222222222f2222222222222f2222222222f2222222222222222222222222222222222222222222222222222
    22222222222222222222222f22222222222222222222222222222222222f2222222222222222222222f222222222222f22222222222f2222222222222222222222222222222222222222222222222222
    22222222222222222222222f22222222222222222222222222222222222f222222222222222222222f2222222222222f22222222222f2222222222222222222222222222222222222222222222222222
    2222222222222222222222f222222222222222222222222222222222222f222222222222222222222f22222222ff22f222222222222f2222222222222222222222222222222222222222222222222222
    2222222222222222222222f22222222222222222222222222222222222f222222222222222222222f22222222222fffff2222222222f2222222222222222222222222222222222222222222222222222
    222222222222222222222f222222222222222222222222222222222222f222222222222222222222f22222222222f2222ff2222222f22222222222222222222222222222222222222222222222222222
    222222222222222222222f22222222222222222222222222222222222f222222222222222222222f22222222222f2222222ff22222f22222222222222222222222222222222222222222222222222222
    22222222222222222222f222222222222222222222222222222222222f22222222222222222222f22222222222f2222222222ff222f22222222222222222222222222222222222222222222222222222
    22222222222222222222f22222222222222222222222222222222222f22222222222222222222f222222222222f222222222222ffff22222222222222222222222222222222222222222222222222222
    2222222222222222222f222222222222222222222222222222222222f2222222222222222222f222222222222f2222222222222222fff222222222222222222222222222222222222222222222222222
    2222222222222222222f2222222222222222222222222222222222f2f222222222222222222f222222222222f22222222222222222f22fff222222222222222222222222222222222222222222222222
    2222222222222222222f2222222222222222222222222222222222f2f2222222222222222ff222222222222f222222222222222222f22222222222222222222222222222222222222222222222222222
    2222222222222222222ffffffffffff222222222222222222222222ff22222222222222ff22222222222222f222222222222222222f22222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222ff222222222222222222222f22ff2222222fffff222222222222222f2222222222222222222f22222222222222222222222222222222222222222222222222222
    222222222222222222222222222222222fff22222222222222222222222fffffff22222222222222222222f2222222222222222222f22222222222222222222222222222222222222222222222222222
    222222222222222222222222222222222222fffffff222222222222222222222222222222222222222222f22222222222222222222f22222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222222222222222222222222222222222222f22222222222222222222f22222222222222222222222222222222222222222222222222222
    22222222222222222222222222222222222222222222222222222222222222222222222222222222222ff222222222222222222222f22222222222222222222222222222222222222222222222222222
    22222222222222222222222222222222222222222222222222222222222222222222222222222222222f2222222222222222222222f22222222222222222222222222222222222222222222222222222
    22222222222222222222222222222222222222222222222222222222222222222222222222222222222f2222222222222222222222f22222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222f22222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222f22222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222f22222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222f22222222222222222222222222222222222222222222222222222
    22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222fff22222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
    `)
current_level = 0
Hops_and_Paw = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . f . . . 
    . . . . . . . . . . . . f 2 f . 
    . . . . . . . . . . . . f 2 9 2 
    f 2 f 2 f 2 f 2 f 2 f 2 f 2 f 2 
    . . . . f 2 f 2 f 2 f 2 f 2 . . 
    . . . . f 2 f 2 f 2 f 2 f . . . 
    . . . . f . f . . . f . f . . . 
    . . . . f . f . . . f . f . . . 
    `, SpriteKind.Player)
controller.moveSprite(Hops_and_Paw, 80, 0)
startLevel()
game.onUpdate(function () {
    if (Hops_and_Paw.vy < 0) {
        Hops_and_Paw.setImage(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . 2 . . . . 
            . . . . . . . . . . . 2 f 2 . . 
            . . . . . . . . . . . 2 f 9 f . 
            . . . 2 . . . . . . f 2 f 2 f . 
            . . . 2 . . . . . . f 2 f 2 . . 
            . . f 2 . . . . . 2 f 2 . . . . 
            . . f . . . . . . 2 f 2 f f f f 
            . . f . . . . . f 2 f 2 . . . . 
            . . f 2 . . . 2 f 2 f 2 f f f . 
            . . . 2 f 2 f 2 f 2 . . . . . . 
            . . . . . . f 2 f . . . . . . . 
            . . . . . f f . f . . . . . . . 
            . . . . . f . . f . . . . . . . 
            . . . . . f . . . . . . . . . . 
            `)
    } else if (Hops_and_Paw.vy > 0) {
        Hops_and_Paw.setImage(img`
            . . . . . . . 2 . . . . . . . . 
            . . . . . . f . . . . . . . . . 
            . . . . . 2 f . . . . . . . . . 
            . . . . . 2 . . . . . . . . . . 
            . . . . . 2 . . . . . . . . . . 
            . . . . . 2 f . . . . . . . . . 
            . . . . f 2 f 2 . . . . . . . . 
            . . . . f 2 f 2 . . . . . . . . 
            . . . . f 2 f 2 f . . . . . . . 
            . . . . f . f 2 f 2 . . f . . . 
            . . . . f . f 2 f 2 f 2 f 2 f . 
            . . . . f . f . f 2 f 2 f 2 9 2 
            . . . . . . . . f 2 f 2 f 2 f 2 
            . . . . . . . . f . f . . . . . 
            . . . . . . . . f . f . . . . . 
            . . . . . . . . f . f f . . . . 
            `)
    } else if (Hops_and_Paw.x % 2 == 0) {
        Hops_and_Paw.setImage(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . 2 . . . 
            . . . . . . . . . . . . 2 f 2 . 
            . . . . . . . . . . . . 2 f 9 f 
            2 f 2 f 2 f 2 f 2 f 2 f 2 f 2 f 
            . . . . 2 f 2 f 2 f 2 f 2 f . . 
            . . . . 2 f 2 f 2 f 2 f 2 . . . 
            . . . . 2 f . . . . . f 2 . . . 
            . . . . 2 f . . . . . f 2 . . . 
            `)
    } else {
        Hops_and_Paw.setImage(img`
            . . . . . . . . . . . . . . . . 
            . . f . . . f f . . . . . f . . 
            . . f . . . f . f . . . f . f . 
            . . f . . . f . . f . f . . . f 
            . . f . . . f . f . . f f f f f 
            . . f f . . f f . . . f . . . f 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . 2 . . . 
            . . . . . . . . . . . . 2 f 2 . 
            . . . . . . . . . . . . 2 f 9 f 
            2 f 2 f 2 f 2 f 2 f 2 f 2 f 2 f 
            . . . . 2 f 2 f 2 f 2 f 2 f . . 
            . . . . 2 f 2 f 2 f 2 f 2 . . . 
            . . . . 2 . 2 . . . f . 2 . . . 
            . . . . 2 . 2 . . . f . 2 . . . 
            `)
    }
    if ((Hops_and_Paw.isHittingTile(CollisionDirection.Left) || Hops_and_Paw.isHittingTile(CollisionDirection.Right)) && Hops_and_Paw.vy >= 0) {
        Hops_and_Paw.vy = 0
        Hops_and_Paw.ay = 0
        Hops_and_Paw.setImage(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . f f . . 
            . . . . . . . . . . . f 5 f . . 
            . . . . . . . . . . . f f f . . 
            . . . . . . . . . . f f f f . . 
            . . . . . . . . . . . . f f f f 
            . . . . . . . . . . . . f f . . 
            . . . . . . . . . . . . f f f f 
            . . . . . . . f . . . . f f . . 
            . . . . . . . f . . . . f f . . 
            . . . . . . . f . . . . f f . . 
            . . . . . . . f . . . . f f f f 
            . . . . . . . f f . . . f f . . 
            . . . . . . . . f f f f f f f f 
            `)
    } else {
        Hops_and_Paw.ay = 350
    }
    if (Hops_and_Paw.vx < 0 || Hops_and_Paw.isHittingTile(CollisionDirection.Left)) {
        Hops_and_Paw.image.flipX()
        Hops_and_Paw.setImage(Hops_and_Paw.image)
    }
})
