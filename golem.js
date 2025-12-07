class Golem {
  constructor(player, turn, character) {
    this.player = player
    this.damage = character.power
    this.defense = character.defense
    this.health = 20;
    this.alive = true
    this.attack = false
    this.hit = false;
    this.hover = character.hover
    this.attackTimer;
    this.idleAni = loadAni(character.idles)
    this.idleAni.frameDelay = 10
    this.idle = Math.random()*200

    this.attackAni = loadAni(character.attack)
    this.sprite = new Sprite(width/3*player, height/2, 50, 50)
    this.sprite.scale *=2
    this.sprite.scale.y *=-1;
    if (player == 2) {
      this.sprite.scale.x *=-1;
    }
    if (turn == 1) {
      setTimeout(()=>{
        this.attackTimer = setInterval(()=>{
      this.attack = true;
    }, 5000)
      }, 2500)
    } else {
      this.attackTimer = setInterval(()=>{
      this.attack = true;
    }, 5000)
    }
    this.sprite.addAnimation("idle", this.idleAni)
    this.sprite.addAnimation("attack", this.attackAni)
    
    
  }
  
  punch(){
    return (this.damage)
  }
  
  kick(){
    return (this.damage)
  }
  
  take_damage(d) {
    var result = d - this.defense;
    if (result < 0) {
      result = 0;
    }
    this.health -= result;
    if (this.health <= 0) {
      this.die()
    }
    return this.alive
  }
  
  die() {
    //animate death
    this.alive = false
  }

  
  display() {
    let offset = Math.floor(sin((frameCount+ this.idle)*4) * 5)*3;
    // print(frameCount)


    if (this.attack) {
      this.sprite.changeAni("attack")
    } else {
      this.sprite.changeAni("idle")

      this.sprite.y = height/2 + offset



    }
    if (this.player == 1) {
      if (this.sprite.x < width/3*2 && this.attack) {
      // console.log("forwards")
      this.sprite.moveTo(width/3*2, this.sprite.y, 30)
      } else {
        // console.log("backwards")
        this.sprite.moveTo(width/3, this.sprite.y, 30)
      }
      if (this.sprite.x >= width/3*2) {
        this.attack = false;
        this.hit = true;
      }

    } else {
      if (this.sprite.x > width/3 && this.attack) {
      // console.log("forwards")
      this.sprite.moveTo(width/3, this.sprite.y, 30)
      } else {
        // console.log("backwards")
        this.sprite.moveTo(width/3*2, this.sprite.y, 30)
      }
      if (this.sprite.x <= width/3) {
        this.attack = false;
        this.hit = true;

      }
    }
    this.sprite.rotation = 0;

    
    
  }
}