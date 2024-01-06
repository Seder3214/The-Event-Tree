addLayer("ec", {
    name: "events configurator", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "EC", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
boosterPoints: new Decimal(0),
    }},
    color: "#343029",
    requires() {if (player.ec.points.gte(4)) return new Decimal(1e30)
 if (player.ec.points.gte(3)) return new Decimal(1e10)
        else return new Decimal(1e15)}, // Can be a function that takes requirement increases into account
    resource: "event fragments", // Name of prestige currency
    baseResource() {if (player.ec.points.gte(3)) return 'booster points'
        else return "stars"}, // Name of resource prestige is based on
    baseAmount() {if (player.ec.points.gte(3)) return player.bs.points
        else return player.pl.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent() {if (player.ec.points.gte(3)) return 3
        else return 5.85}, // Prestige currency exponent
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
            function() {if (player.tab == "ec") return "main-display"
},
            function() { if (player.tab == "ec")  return ["column", [
            'prestige-button',
            "blank",
            ["display-text", "<i style='color: grey'>You have unlocked <b>Event Configurator</b></i> <br><i>Seems like you only got to Neptune's last upgrade, yes? Here you can expand events further, up to the end of them and make it faster!</i><hr>"],
            "blank",
			"buyables",
            "blank",
            "upgrades",
            "grid"
			]
        ]
 },
 ]
        },
    },
    buyables: {
        11: {
            cost(x) {return new Decimal(1).mul(x.add(1)) },
            purchaseLimit: new Decimal(3),
            display() {
                    let data = tmp[this.layer].buyables[this.id]
                    return "<h2><b>Expand Planetary Event</b></h2> <br>" + "Event Cofigurator allows you to modify events! Unlock more planets and upgrades per level. <br>Requirement: " + format(data.cost) + " Event Fragments <br>" + "Expandation: " + formatWhole(player[this.layer].buyables[this.id]) + "/3. At third expand, unlock new layer"},
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
        12: {
            cost(x) {return new Decimal(4).mul(x.add(1)) },
            purchaseLimit: new Decimal(6),
            display() {
                    let data = tmp[this.layer].buyables[this.id]
                    return "<h2><b>Unlock new booster types</b></h2> <br>" + "Event Cofigurator allows you to modify events! Unlock more booster types per level. <br>Requirement: " + format(data.cost) + " Event Fragments <br>" + "Currently: +" + formatWhole(buyableEffect('ec',12)) + "/18. At third expand, unlock new layer"},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                                cost = tmp[this.layer].buyables[this.id].cost
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                let eff = new Decimal(0)
                eff = x.mul(3)
                return eff
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
                unlocked() {return hasUpgrade('ec',14)},
        },
    },
    upgrades: {
        11: {
            title: "Planet Boost I",
            description() {return "Get a 900% boost to Pluto and Neptune base gain."},
            cost: new Decimal(1),
            canAfford() {return player.ec.points.gte(1)},
            unlocked() {return true},
            pay(){
                return player.ec.points = player.ec.points
            },
            style() {
            if (hasUpgrade("ec", 11)) return {
                'border-color': '#343029',
                'background-color': '#181818',
                'color': 'white'
            }
            if (player.ec.points.gte(this.cost)) return {
                'border-color': 'yellow',
                'background-color': '#181818',
                'color': 'white'
            }
            else return {
                'border-color': 'gray',
                'background-color': '#181818',
                'color': 'white'
            }
            },
        },
        12: {
            title: "Planet Boost II",
            description() {return "<b>Meteor Bundle I and II</b> works without buying them."},
            cost: new Decimal(2),
           canAfford() {return player.ec.points.gte(2)},
            unlocked() {return (hasUpgrade('ec',11))},
            pay(){
                return player.ec.points = player.ec.points
            },
            style() {
            if (hasUpgrade("ec", 12)) return {
                'border-color': '#343029',
                'background-color': '#181818',
                'color': 'white'
            }
            if (player.ec.points.gte(this.cost)) return {
                'border-color': 'yellow',
                'background-color': '#181818',
                'color': 'white'
            }
            else return {
                'border-color': 'gray',
                'background-color': '#181818',
                'color': 'white'
            }
            },
        },
        13: {
            title: "Planet Boost III",
            description() {return "Get a 1e22% boost to stars gain."},
            cost: new Decimal(3),
           canAfford() {return player.ec.points.gte(3)},
            unlocked() {return (hasUpgrade('ec',12))},
            pay(){
                return player.ec.points = player.ec.points
            },
            style() {
            if (hasUpgrade("ec", 13)) return {
                'border-color': '#343029',
                'background-color': '#181818',
                'color': 'white'
            }
            if (player.ec.points.gte(this.cost)) return {
                'border-color': 'yellow',
                'background-color': '#181818',
                'color': 'white'
            }
            else return {
                'border-color': 'gray',
                'background-color': '#181818',
                'color': 'white'
            }
            },
        },
        14: {
            title: "Events Synergy I",
            description() {return "<h5>Stars boosts <b>booster tier</b> amount in their effect.<br> Planetary Event will no longer be resetted.<br>Now you have a 10% chance to get different type booster. Also unlock Booster Type Unlocker"},
            cost: new Decimal(4),
           canAfford() {return player.ec.points.gte(4)},
            unlocked() {return (hasUpgrade('ec',13))},
            effect() {
                let eff = new Decimal(1)
                eff = player.pl.points.add(1).log10().add(1).log10().add(1)
                return eff
            },
            effectDisplay() { return "x"+format(upgradeEffect('ec',14))},
            pay(){
                return player.ec.points = player.ec.points
            },
            style() {
            if (hasUpgrade("ec", 14)) return {
                'border-color': '#343029',
                'background-color': '#181818',
                'color': 'white'
            }
            if (player.ec.points.gte(this.cost)) return {
                'border-color': 'yellow',
                'background-color': '#181818',
                'color': 'white'
            }
            else return {
                'border-color': 'gray',
                'background-color': '#181818',
                'color': 'white'
            }
            },
        },
    },
    doReset(){
        if (!hasUpgrade('ec',14)) layerDataReset('pl')
layerDataReset('bs')
    },
    row: "side", // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "e", description: "e: Reset for event fragments", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return (hasUpgrade('pl',25))||player[this.layer].unlocked}
})
