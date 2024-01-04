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
tooltip() {return format(player.ec.boosterPoints)+"  Bosster Points"},
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
    gain() {
        let sum = new Decimal(1)
        sum = sum.add(tmp.bs.effect)
        return sum
    },
    effect() {
let row1 = new Decimal(1)
        let row2 = new Decimal(1)
let sum = new Decimal(1)
        let row3 = new Decimal(1)
let row4 = new Decimal(1)
        row1 =row1.mul(gridEffect('bs',101)).mul(gridEffect('bs',102)).mul(gridEffect('bs',103)).mul(gridEffect('bs',104)).mul(gridEffect('bs',105))
row2 =row2.mul(gridEffect('bs',201)).mul(gridEffect('bs',202)).mul(gridEffect('bs',203)).mul(gridEffect('bs',204)).mul(gridEffect('bs',205))
row3 =row3.mul(gridEffect('bs',301)).mul(gridEffect('bs',302)).mul(gridEffect('bs',303)).mul(gridEffect('bs',304)).mul(gridEffect('bs',305))
row4 =row4.mul(gridEffect('bs',401)).mul(gridEffect('bs',402)).mul(gridEffect('bs',403)).mul(gridEffect('bs',404)).mul(gridEffect('bs',405))
 return sum = row1.mul(row2).mul(row3).mul(row4)
    },
    tabFormat: {
        "Main": {
        content:[
            function() { if (player.tab == "bs")  return ["column", [

["display-text", "You have <h2 style='color:  #4f6925; text-shadow: #4f6925 0px 0px 10px;'>"+format(player.ec.boosterPoints)+"</h2> booster points"],
            player.bs.unlocked && player.bs.best.gte(1)?'':'prestige-button',
            "blank",
            ["display-text", "<i style='color: grey'>You have unlocked <b>Boosters Event</b></i> <br><i>Craft Boosters and get more boost!</i><hr>"],
            "blank",
			"buyables",
            "blank",
            ["display-text", "Current Boosters Power is <h2 style='color:  #4f6925; text-shadow: #4f6925 0px 0px 10px;'>"+format(tmp.bs.effect)+"</h2>"],
            "grid",
			]
        ]
 },
 ]
        },
    },
    buyables: {
        11: {
            cost(x) {return new Decimal(1e7).pow(x.add(1)) },
            display() {
                    let data = tmp[this.layer].buyables[this.id]
                    return "<h2><b>Add one more row of boosters</b></h2> <br>" + "With power of boosters, you can craft more of them! <br>Requirement: " + format(data.cost) + " Booster Points <br>" + "Addition: +" + formatWhole(player[this.layer].buyables[this.id]) + "/6 rows."},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                                cost = tmp[this.layer].buyables[this.id].cost
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
                                                            style() {
                                                                                let data = tmp[this.layer].buyables[this.id]
                    if (player.ec.boosterPoints.lt(data.cost)) return {
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
        rows: 4, // If these are dynamic make sure to have a max value as well!
        cols: 5,
        getStartData(id) {
            return 0
        },

getBgColor(data,id) {
            let color  = "#";
            for (var i = 0; i < 6; i++) {
                color += Math.floor(Math.random() * 10);
            }
            return color
        },
      getBdColor(data,id) {
            let color  = "#";
            for (var i = 0; i < 6; i++) {
                color += Math.floor((Math.random() * 10)-30);
            }
            return color
        },      
 getStyle(data, id) {

            if (player.ec.boosterPoints.lte(gridStartCost('bs',id))&& player.bs.grid[id]<1) return {
                'background-color': 'gray',
                'border-color': 'gray',
                'color': 'black'
            }
            else return {
                'background-color': gridBgColor('bs',id),
                'border-color': gridBdColor('bs',id),
                'color': 'white'
            }
        },
        getCost(data,id) {
            let b = new Decimal(3).pow(id/100+1+id%100).mul(1.73*player[this.layer].grid[id]**(5+id%100)).pow(id/100).pow(player.bs.grid[id]>=25?((player.bs.grid[id]-25)/10)+1:1).pow(player.bs.grid[id]>=50?((player.bs.grid[id]-50)/50)+1:1).pow(player.bs.grid[id]>=100?((player.bs.grid[id]-100)/100)+1:1)
            return b
        },
        getStartCost(data,id) {
let rowBoost = Math.floor((id/100))
            let cost = new Decimal(1).mul(new Decimal(10).pow(player.bs.total).pow((1+(id%100))+5*(rowBoost-1)))      
return cost
        },
        getUnlocked(id) { // Default
            return true
        },
        getCanClick(data, id) {
            if (player.bs.grid[id]<1) return (player.ec.boosterPoints.gte(gridStartCost('bs',id)))
            return (player.ec.boosterPoints.gte(gridCost('bs',id)))
        },
        onClick(data, id) { 

gridBgColor('bs',id)
gridBdColor('bs',id)
if (player.bs.grid[id]>=1){
player.ec.booaterPoints = player.ec.boosterPoints.sub(gridCost('bs',id))}
            if (player.bs.grid[id]<1){
player.ec.boosterPoints = player.ec.boosterPoints.sub(gridStartCost('bs',id))
player.bs.total++}
            player[this.layer].grid[id]++
        },

onHold(data, id) { 
if (player.bs.grid[id]>=1){
player.ec.booaterPoints = player.ec.boosterPoints.sub(gridCost('bs',id))}
            if (player.bs.grid[id]<1){
player.ec.boosterPoints = player.ec.boosterPoints.sub(gridStartCost('bs',id))
player.bs.total++}
            player[this.layer].grid[id]++
        },
        getEffect(data, id) {
            let eff = new Decimal(1.75)
            let base = new Decimal(0.35)
            if (player[this.layer].grid[id]>=1) eff = eff.pow(player[this.layer].grid[id]+1).pow(base).mul(0.36*(id%100)).mul(new Decimal(2).pow(Math.floor(id/100)-1))
return eff
        },
        getDisplay(data, id) {
            if (player[this.layer].grid[id]>=1) return 'Tier '+format(player[this.layer].grid[id])+".<br><h5>Boost booster points gain by  "+format(gridEffect('bs', id))+'x<br>Cost to tier up: '+format(gridCost('bs',id))+" booster points"
            else return '<h5>Empty Slot. Craft a booster to proceed.<br>Cost to craft: '+format(gridStartCost('bs',id))+" booster points</h5>"
        },
    },
    doReset(){
        layerDataReset('pl')
 player.bs.points = player.bs.points.add(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "b", description: "b: Reset for booster points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return player.ec.buyables[11].gte(3)||player[this.layer].unlocked}
})
