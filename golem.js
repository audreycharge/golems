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

    this.attackAni = loadAni(character.attack)
    this.sprite = new Sprite(width/3*player, height/2, 50, 50)
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
    return (this.damage*0.3)
  }
  
  kick(){
    return (this.damage*0.4)
  }
  
  take_damage(d) {
    var result = d;
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
    if (this.attack) {
      this.sprite.changeAni("attack")
    } else {
      this.sprite.changeAni("idle")
    }
    if (this.player == 1) {
      if (this.sprite.x < width/3*2 && this.attack) {
      // console.log("forwards")
      this.sprite.moveTo(width/3*2, height/2, 30)
      } else {
        // console.log("backwards")
        this.sprite.moveTo(width/3, height/2, 30)
      }
      if (this.sprite.x >= width/3*2) {
        this.attack = false;
        this.hit = true;
      }

    } else {
      if (this.sprite.x > width/3 && this.attack) {
      // console.log("forwards")
      this.sprite.moveTo(width/3, height/2, 30)
      } else {
        // console.log("backwards")
        this.sprite.moveTo(width/3*2, height/2, 30)
      }
      if (this.sprite.x <= width/3) {
        this.attack = false;
        this.hit = true;

      }
    }
    this.sprite.rotation = 0;
    
  }
}