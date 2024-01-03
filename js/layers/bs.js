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
    gain() {
        let sum = new Decimal(0)
        if (player.bs.grid[101]>=1) sum = sum.add(gridEffect('bs',101))
        if (player.bs.grid[102]>=1) sum = sum.add(gridEffect('bs',102))
        if (player.bs.grid[103]>=1) sum=sum.add( gridEffect('bs',103))
        if (player.bs.grid[104]>=1) sum =sum.add( gridEffect('bs',104))
        if (player.bs.grid[105]>=1) sum =sum.add( gridEffect('bs',105))
        if (player.bs.grid[201]>=1) sum =sum.add( gridEffect('bs',201))
        if (player.bs.grid[202]>=1) sum =sum.add( gridEffect('bs',202))
        if (player.bs.grid[203]>=1) sum =sum.add( gridEffect('bs',203))
        if (player.bs.grid[204]>=1) sum =sum.add( gridEffect('bs',204))
        if (player.bs.grid[205]>=1) sum =sum.add( gridEffect('bs',205))
        if (player.bs.grid[301]>=1) sum =sum.add( gridEffect('bs',301))
        if (player.bs.grid[302]>=1) sum =sum.add( gridEffect('bs',302))
        if (player.bs.grid[303]>=1) sum =sum.add( gridEffect('bs',303))
        if (player.bs.grid[304]>=1) sum =sum.add( gridEffect('bs',304))
        if (player.bs.grid[305]>=1) sum =sum.add( gridEffect('bs',305))
        if (player.bs.grid[401]>=1) sum =sum.add( gridEffect('bs',401))
        if (player.bs.grid[402]>=1) sum =sum.add( gridEffect('bs',402))
        if (player.bs.grid[403]>=1) sum =sum.add( gridEffect('bs',403))
        if (player.bs.grid[404]>=1) sum =sum.add( gridEffect('bs',404))
        if (player.bs.grid[405]>=1) sum =sum.add( gridEffect('bs',405))
        return sum
    },
    effect() {
        let power = new Decimal(0)
        let sum = new Decimal(0)
        if (player.bs.grid[101]>=1) sum = sum.add(gridEffect('bs',101))
        if (player.bs.grid[102]>=1) sum = sum.add(gridEffect('bs',102))
        if (player.bs.grid[103]>=1) sum=sum.add( gridEffect('bs',103))
        if (player.bs.grid[104]>=1) sum =sum.add( gridEffect('bs',104))
        if (player.bs.grid[105]>=1) sum =sum.add( gridEffect('bs',105))
        if (player.bs.grid[201]>=1) sum =sum.add( gridEffect('bs',201))
        if (player.bs.grid[202]>=1) sum =sum.add( gridEffect('bs',202))
        if (player.bs.grid[203]>=1) sum =sum.add( gridEffect('bs',203))
        if (player.bs.grid[204]>=1) sum =sum.add( gridEffect('bs',204))
        if (player.bs.grid[205]>=1) sum =sum.add( gridEffect('bs',205))
        if (player.bs.grid[301]>=1) sum =sum.add( gridEffect('bs',301))
        if (player.bs.grid[302]>=1) sum =sum.add( gridEffect('bs',302))
        if (player.bs.grid[303]>=1) sum =sum.add( gridEffect('bs',303))
        if (player.bs.grid[304]>=1) sum =sum.add( gridEffect('bs',304))
        if (player.bs.grid[305]>=1) sum =sum.add( gridEffect('bs',305))
        if (player.bs.grid[401]>=1) sum =sum.add( gridEffect('bs',401))
        if (player.bs.grid[402]>=1) sum =sum.add( gridEffect('bs',402))
        if (player.bs.grid[403]>=1) sum =sum.add( gridEffect('bs',403))
        if (player.bs.grid[404]>=1) sum =sum.add( gridEffect('bs',404))
        if (player.bs.grid[405]>=1) sum =sum.add( gridEffect('bs',405))
        power = new Decimal(sum).pow(0.5)
        return power
    },
    tabFormat: {
        "Main": {
        content:[
            function() {if (player.tab == "bs") return "main-display"
},
            function() { if (player.tab == "bs")  return ["column", [
            player.bs.unlocked && player.bs.best.gte(1)?'':'prestige-button',
            "blank",
            ["display-text", "<i style='color: grey'>You have unlocked <b>Boosters Event</b></i> <br><i>Craft Boosters and get more boost!</i><hr>"],
            "blank",
			"buyables",
            "blank",
            ["display-text", "Current Boosters Power is <h2 style='color: rgb(52, 48, 41); text-shadow: rgb(52, 48, 41) 0px 0px 10px;'>"+format(tmp.bs.effect)+"</h2>"],
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
                    if (player.ec.points.lt(data.cost)) return {
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
        gridColor(data,id) {
            
        },
        getStyle(data, id) {
            if (player.bs.grid[id]>0) return {
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
            let cost = new Decimal(1).mul(new Decimal(10).pow(player.bs.total).pow(1+(id%100) + (Math.floor((id/100)-1)*5)))      
return cost
        },
        getUnlocked(id) { // Default
            return true
        },
        getCanClick(data, id) {
            if (player.bs.grid[id]<1) return (player.bs.points.gte(gridStartCost('bs',id)))
            return (player.bs.points.gte(gridCost('bs',id)))
        },
        onClick(data, id) { 
if (player.bs.grid[id]>=1){
player.bs.points = player.bs.points.sub(gridCost('bs',id))}
            if (player.bs.grid[id]<1){
player.bs.points = player.bs.points.sub(gridStartCost('bs',id))
player.bs.total++}
            player[this.layer].grid[id]++
        getBgColor(id) {
            let color  = "#";
            for (var i = 0; i < 6; i++) {
                color += Math.floor(Math.random() * 10);
            }
            return color
        },
        getBdColor(id) {
            let color  = "#";
            for (var i = 0; i < 6; i++) {
                color += Math.floor((Math.random() * 10)-30);
            }
            return color
        },
        },
        getEffect(data, id) {
            let eff = new Decimal(1)
            let base = new Decimal(0.75)
            if (player[this.layer].grid[id]>=1) eff = eff.mul(player[this.layer].grid[id]+1).pow(base).pow(id%100).pow((2*(Math.floor(id/100)))+1).pow(player.bs.grid[id]>=10?1+(player.bs.grid[id]-9)/100:1)
            return eff
        },
        getDisplay(data, id) {
            if (player[this.layer].grid[id]>=1) return 'Tier '+format(player[this.layer].grid[id])+".<br><h5>Adds +"+format(gridEffect('bs', id))+' to Booster Points gain/s.<br>Cost to tier up: '+format(gridCost('bs',id))+" booster points"
            else return '<h5>Empty Slot. Craft a booster to proceed.<br>Cost to craft: '+format(gridStartCost('bs',id))+" booster points</h5>"
        },
    },
    doReset(){
        layerDataReset('pl')
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "b", description: "b: Reset for booster points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return player.ec.buyables[11].gte(3)||player[this.layer].unlocked}
})
