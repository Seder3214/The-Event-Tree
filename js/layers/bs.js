const typeNames = {
    normal: "Normal",
    scaled: "Upscaled",
    sideways: "Sideways",
    starred: "Starred",
    passive: "Passive",
    exponenial: "Exponential",
}
function formatRoman(num) {
    var roman = {
      M: 1000, CM: 900, D: 500, CD: 400,
      C: 100, XC: 90, L: 50, XL: 40,
      X: 10, IX: 9, V: 5, IV: 4, I: 1
    };
    var str = '';
  
    for (var i of Object.keys(roman)) {
      var q = Math.floor(num / roman[i]);
      num -= q * roman[i];
      str += i.repeat(q);
    }
  
    return str;
}
function seededRandom(seed) {
    let value = seed % 16777216
    var x = Math.tan(value*1000+1);
    x = x / 125
    x = Math.min(Math.sin(x+1) * 16777216, 16777216)
    return x - Math.floor(x);
}
function sidewaysEff() {
    let boost=new Decimal(1)
    for(var i in player.bs.grid) {
      if (getGridData("bs", i).type=='sideways') boost=boost.mul(gridEffect('bs',i).eff2)
    }
    return boost
  }
  function starredEff() {
    let boost=new Decimal(1)
    for(var i in player.bs.grid) {
      if (getGridData("bs", i).type=='starred') boost=boost.mul(gridEffect('bs',i).eff2)
    }
    return boost
  }
function getColor(seed, tier) {
    let value = Math.floor(seededRandom(seed * Math.sin(((+tier * (seed ** 1.1))))) * 16777216)
    return "#" + value.toString(16).padStart(6, '0')
}
addLayer("bs", {
    name: "Boosters Event", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "BS", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
        colors: {},
		points: new Decimal(0),
        best: new Decimal(0),
        pool: ["starred", "scaled", "sideways"],
        gridPower: new Decimal(0),
    }},
    
    branches: ['pl'],
    color: "#4f6925",
    requires: new Decimal('1.8e220'), // Can be a function that takes requirement increases into account
    resource: "booster points", // Name of prestige currency
    baseResource: "stars", // Name of resource prestige is based on
    baseAmount() {return player.pl.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    tabFormat: {
        "Main": {
        content:[
            function() { if (player.tab == "bs")  return ["column", [

["display-text", "You have <h2 style='color:  #4f6925; text-shadow: #4f6925 0px 0px 10px;'>"+format(player.bs.points)+"</h2> (+" + format(tmp.bs.getBoosterEff)+ "/s) booster points "],
            player.bs.unlocked && player.bs.best.gte(1)?'':'prestige-button',
            "blank",
            ["display-text", "<i style='color: grey'>You have unlocked <b>Boosters Event</b></i> <br><i>Craft Boosters and get more boost!</i><hr>"],
            "blank",
			"buyables",
            "blank",
            "grid",
			]
        ]
 },
 ]
        },
    },
    getBoosterEff() {
        let boost=new Decimal(1)
        for(var i in player.bs.grid) {
          if (new Decimal(getGridData("bs", i).tier).gt(0)) boost=boost.mul(gridEffect('bs',i).eff)
        }
        return boost.pow(sidewaysEff())
      },
    buyables: {
        11: {
            cost(x) {return new Decimal(1e15).pow(x.add(1)) },
            purchaseLimit: new Decimal(4),
            display() {
                    let data = tmp[this.layer].buyables[this.id]
                    return "<h2><b>Add one more row of boosters</b></h2> <br>" + "With power of boosters, you can craft more of them! <br>Requirement: " + format(data.cost) + " Booster Points <br>" + "Addition: +" + formatWhole(player[this.layer].buyables[this.id]) + "/4 rows."},
            canAfford() { return player.bs.points.gte(this.cost()) },
            buy() {
                                cost = tmp[this.layer].buyables[this.id].cost
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
                                                            style() {
                                                                                let data = tmp[this.layer].buyables[this.id]
                    if (player.bs.points.lt(data.cost)) return {
                            'border-color': 'gray',
                            'background-color': '#181818',
                            'color': 'white',
                        }
                    else return {
                            'border-color': '#343029',
                            'background-color': '#181818',
                            'color': 'white',
                        }
                },
                unlocked() {return true},
        },
        12: {
            cost(x) {return new Decimal(1e12).pow(x.div(5).add(1)) },
            purchaseLimit: new Decimal(5),
            display() {
                    let data = tmp[this.layer].buyables[this.id]
                    return "<h2><b>Add one more column of boosters</b></h2> <br>" + "With power of boosters, you can craft more of them! <br>Requirement: " + format(data.cost) + " Booster Points <br>" + "Addition: +" + formatWhole(player[this.layer].buyables[this.id]) + "/5 columns."},
            canAfford() { return player.bs.points.gte(this.cost()) },
            buy() {
                                cost = tmp[this.layer].buyables[this.id].cost
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
                                                            style() {
                                                                                let data = tmp[this.layer].buyables[this.id]
                    if (player.bs.points.lt(data.cost)) return {
                            'border-color': 'gray',
                            'background-color': '#181818',
                            'color': 'white',
                        }
                    else return {
                            'border-color': '#343029',
                            'background-color': '#181818',
                            'color': 'white',
                        }
                },
                unlocked() {return true},
        },
    },
    grid: {
        cols() {let num = 3
            num += player.bs.buyables[12].toNumber()
            return num},
            maxCols: 7,
        rows() {let rows = 1
        rows += player.bs.buyables[11].toNumber()
        return rows},
        maxRows: 7, // If these are dynamic make sure to have a max value as well!
        getStartData(id) {
            return {type: 'normal', tier: 0}
        },

getBgColor(id) {
            let color = "#";
            for (var i = 0; i < 6; i++) {
                color += Math.floor(Math.random() * 10);
            }
return color
        },   
 getStyle(data, id) {
            if (data.tier<1) return {
                'width':'115px',
                'height':'115px',
                'background-color': 'gray',
                'border-color': 'dark gray',
                'color': 'black'
            }
            if (!player.bs.colors[id]) player.bs.colors[id] = Math.floor(Math.random() * 16777216)
             return {
                'background': getColor(player.bs.colors[id], data.tier),
                'border-color': '',
                'width':'115px',
                'height':'115px',
            }
        },
        getCost(data,id) {
            let b = gridStartCost('bs',id).add(2).div(new Decimal(1e5).mul((id%100)-2).max(1)).pow(data.tier).add(10).mul(id/100).pow(data.tier>=10?1+(data.tier-5)/50:1)
            return b
        },
        getStartCost(data,id) {
let rowBoost = Math.floor(id/100)
            let cost = new Decimal(10).pow(new Decimal(id%100).sub(1).mul(7).add(new Decimal(20).mul(new Decimal(id/100).floor().sub(1)))).mul(new Decimal(1e25).mul(new Decimal(id/100).floor().sub(1)).max(1)).div(100)
            if (id%100<=2 && id/100<2) cost = new Decimal(1).mul(1000**((id%100)-1))
return cost
        },
        getUnlocked(id) { // Default
            return true
        },
        getCanClick(data, id) {
            return true
        },
        onClick(data, id) { 
            gridBgColor('bs',id)
            let chance = Math.random()
if (data.tier>=1 && player.bs.points.gte(gridCost('bs',id))){
    if(chance<0.1 && hasUpgrade('ec',14) && data.type=='normal') {
        x = Math.floor(Math.random() * (buyableEffect('ec',12) - 0) + 0);
        player.bs.grid[id] = {type:player.bs.pool[x],tier: data.tier }
    }
player.bs.points = player.bs.points.sub(gridCost('bs',id))
data.tier++
}
if (data.tier<1 && player.bs.points.gte(gridStartCost('bs',id))){
    player.bs.points = player.bs.points.sub(gridStartCost('bs',id))
    data.tier++
    player.bs.total++}
        },
        onHold(data, id) { 
            let chance = Math.random()
if (data.tier>=1 && player.bs.points.gte(gridCost('bs',id))){
    if(chance<0.1 && hasUpgrade('ec',14) && data.type=='normal') {
        x = Math.floor(Math.random() * (buyableEffect('ec',12) - 0) + 0);
        player.bs.grid[id] = {type:player.bs.pool[x],tier: data.tier }
}
    }
                            if (data.tier<1 && player.bs.points.gte(gridStartCost('bs',id))){
                player.bs.points = player.bs.points.sub(gridStartCost('bs',id))
                data.tier++
                player.bs.total++}
                    },
        getEffect(data, id) {
            let eff = new Decimal(1.75)
            let eff2 = new Decimal(1.75)
            let base = new Decimal(0.6)
            if (data.tier>=1) eff = eff.pow(data.tier+1).pow(base).mul(new Decimal(35).pow(Math.floor(id/100))).mul(new Decimal(15).mul((id%100)-1).max(1)).mul(upgradeEffect('ec',14))
if (id == 101) eff = eff.mul(data.tier>=10?10:1).mul(data.tier>=20?15:1).mul(data.tier>=30?5:1)
switch (data.type) {
    case "normal":  return {eff: eff,eff2: eff2 = eff}
    case "starred": return {eff: eff, eff2: eff2 = eff.pow(1.475).pow(player.pl.points.add(1).log10().add(1).log(2))}
    case "scaled":  return {eff: eff, eff2: eff2 = eff.mul(new Decimal(data.tier).div(2).mul(1.5))}
    case "sideways": return {eff:eff,eff2:eff2 = eff.add(1).log(10).div(200).add(1)}
    default: return new Decimal(0)
}
        },
        getDisplay(data, id) {
            if (data.tier==0) return "<h4>Empty Slot. Craft a booster to proceed.<br>Cost to craft: "+format(gridStartCost('bs',id))+" booster points</h4>"
            const effects = {
                normal: "<b>x{}</b> to <b>booster points gain</b>",
                starred: "Booosts <b>stars gain</b> by <b>x{}</b>",
                scaled: "Heavily boosts <b>booster points gain</b> by <b>x{}</b>",
                sideways: "Boosts <b>booster power</b> by <b>^{}</b>",
            }
            const effects2 = {
                normal: "(Boost Power: x[]) ",
                starred: "(Boost Power: x[]) ",
                scaled: "(Boost Power: x[]) ",
                sideways: "(Boost Power: x[]) ",
            }

            return `<h3>${typeNames[data.type]}<br/>Tier ${formatRoman(data.tier)}</h3>
                <h4>${effects2[data.type].replace("[]", format(this.getEffect(data, id).eff))+effects[data.type].replace("{}", format(this.getEffect(data, id).eff2,4))+'<br>Cost to tier up: '+format(gridCost('bs',id))+" booster points</h4>"}
            `

        },
    },
    
    doReset(){
     layerDataReset('pl')
player.bs.points = player.bs.points.add(1)
    },
    update(diff) {
       if (player.bs.grid[101].tier>=1) player.bs.points = player.bs.points.add(tmp.bs.getBoosterEff.times(diff))
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)

    hotkeys: [
        {key: "b", description: "b: Reset for booster points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return player.ec.buyables[11].gte(3)||player[this.layer].unlocked}
})
