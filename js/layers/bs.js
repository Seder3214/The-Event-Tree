addLayer("bs", {
    name: "Boosters Event", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "BS", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        total: 0,
        best: new Decimal(0),
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

["display-text", "You have <h2 style='color:  #4f6925; text-shadow: #4f6925 0px 0px 10px;'>"+format(player.bs.points)+"</h2> (+" + format(tmp.bs.getBoosterEff)+ "/s) booster points"],
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
          if (new Decimal(getGridData("bs", i)).gt(0)) boost=boost.mul(gridEffect('bs',i))
        }
        return boost
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
            return 0
        },

getBgColor(id) {
            let color = "#";
            for (var i = 0; i < 6; i++) {
                color += Math.floor(Math.random() * 10);
            }
return color
        },   
 getStyle(data, id) {
            if (player.bs.grid[id]<1) return {
                'width':'85px',
                'height':'85px',
                'background-color': 'gray',
                'border-color': 'dark gray',
                'color': 'black'
            }
             return {
                'background-color': gridBgColor('bs',id),
                'border-color': '',
                'width':'85px',
                'height':'85px',
                'color': 'white'
            }
        },
        getCost(data,id) {
            let b = gridStartCost('bs',id).add(2).pow(player.bs.grid[id]).add(10).mul(id/100).pow(player.bs.grid[id]>=10?1+(player.bs.grid[id]-9)/50:1)
            return b
        },
        getStartCost(data,id) {
let rowBoost = Math.floor(id/100)
            let cost = new Decimal(10).pow(new Decimal(id%100).sub(1).mul(4.5).add(new Decimal(20).mul(new Decimal(id/100).floor().sub(1)))).mul(new Decimal(1e25).mul(new Decimal(id/100).floor().sub(1)).max(1))
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
if (player.bs.grid[id]>=1 && player.bs.points.gte(gridCost('bs',id))){
player.bs.points = player.bs.points.sub(gridCost('bs',id))
player[this.layer].grid[id]++
}
            if (player.bs.grid[id]<1&& player.bs.points.gte(gridStartCost('bs',id))){
player.bs.points = player.bs.points.sub(gridStartCost('bs',id))
player[this.layer].grid[id]++
player.bs.total++}
        },
        onHold(data, id) { 
            if (player.bs.grid[id]>=1 && player.bs.points.gte(gridCost('bs',id))){
                player.bs.points = player.bs.points.sub(gridCost('bs',id))
                player[this.layer].grid[id]++
                }
                            if (player.bs.grid[id]<1&& player.bs.points.gte(gridStartCost('bs',id))){
                player.bs.points = player.bs.points.sub(gridStartCost('bs',id))
                player[this.layer].grid[id]++
                player.bs.total++}
                    },
        getEffect(data, id) {
            let eff = new Decimal(1.75)
            let base = new Decimal(0.6)
            if (player[this.layer].grid[id]>=1) eff = eff.pow(player[this.layer].grid[id]+1).pow(base).mul(new Decimal(100).pow(Math.floor(id/100)-1)).mul(new Decimal(15).mul((id%100)))
if (id == 101) eff = eff.mul(player.bs.grid[id]>=10?10:1).mul(player.bs.grid[id]>=20?15:1).mul(player.bs.grid[id]>=30?5:1)
return eff
        },
        getDisplay(data, id) {
            if (player[this.layer].grid[id]>=1) return 'Tier '+format(player[this.layer].grid[id])+".<br><h5>Boost booster points gain by "+format(gridEffect('bs', id))+'x. <br>Cost to tier up: '+format(gridCost('bs',id))+" booster points</h5>"
            else return '<h5>Empty Slot. Craft a booster to proceed.<br>Cost to craft: '+format(gridStartCost('bs',id))+" booster points</h5>"
        },
    },
    
    doReset(){
        layerDataReset('pl')
    },
    update(diff) {
       if (player.bs.grid[101]>=1) player.bs.points = player.bs.points.add(tmp.bs.getBoosterEff.times(diff))},
    row: 1, // Row the layer is in on the tree (0 is the first row)

    hotkeys: [
        {key: "b", description: "b: Reset for booster points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return player.ec.buyables[11].gte(3)||player[this.layer].unlocked}
})
