addLayer("pl", {
    name: "planetary event", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "PL", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        time: new Decimal(0),
    }},
    color: "#342885",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "stars", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    gain() {
        let gain = new Decimal(1)
        if (player.pl.buyables[11].gte(1)) gain = gain.add(buyableEffect('pl',11).eff)
        if (player.pl.buyables[12].gte(1)) gain = gain.add(buyableEffect('pl',12).eff)
        if (player.pl.buyables[13].gte(1)) gain = gain.add(buyableEffect('pl',13).eff)
        if (player.pl.buyables[14].gte(1)) gain = gain.add(buyableEffect('pl',14).eff)
        if (hasUpgrade('pl',39)) gain = gain.mul(upgradeEffect('pl',39))
        if (hasUpgrade('pl',44)) gain = gain.pow(upgradeEffect('pl',44))
        if (player.pl.buyables[15].gte(1)) gain = gain.add(buyableEffect('pl',15).eff)
        if (player.pl.buyables[16].gte(1)) gain = gain.add(buyableEffect('pl',16).eff)
        if (player.pl.buyables[17].gte(1)) gain = gain.add(buyableEffect('pl',17).eff)
        if (player.pl.buyables[18].gte(1)) gain = gain.add(buyableEffect('pl',18).eff)
        if (player.pl.buyables[19].gte(1)) gain = gain.add(buyableEffect('pl',19).eff)
        if (hasUpgrade('ec',13)) gain = gain.mul(1e20)
        if (starredEff().gte(1)) gain = gain.mul(starredEff())
        return gain
    },
    base() {
        let base = tmp.pl.gain.mul(0.5).max(1)
        if (hasUpgrade('pl',11)) base=base.add(2)
        if (hasUpgrade('pl',12)) base=base.add(5)
        if (hasUpgrade('pl',33)||hasUpgrade('ec',12)) base=base.mul(upgradeEffect('pl',33).div(100).add(1))
        return base
    },
    tabFormat: {
        "Main": {
        content:[
            function() {if (player.tab == "pl") return "main-display"
},
            function() { if (player.tab == "pl" && player.ec.points.lt(4))  return ["column", [
            ['clickable',11],
            "blank",
            ["display-text", "<i style='color: grey'>What is <b>space</b>? And how big is our Solar System?</i> <br>Explore all planets in solar system, and <i>maybe there is something that will unlock after completing this event...</i><hr>"],
            "blank",
			["row", [ ["upgrade", 44],["blank",['170px','50px']],["upgrade", 11]]],
			["blank",'50px'],
            ["row", [ ["blank",['170px','50px']],["upgrade", 12]]],
            ["blank",'50px'],
            ["row", [["upgrade", 13],["blank",['170px','50px']]]],
            "blank",
			["row", [ ["blank",['120px','50px']],["buyable", 11],["blank",['170px','50px']],["upgrade", 17]]],
            ["blank",'80px'],
            ["row", [["upgrade", 14],["blank",['70px','50px']],["upgrade", 15],["blank",['150px','50px']]]],
            ["blank",'80px'],
            ["row", [ ["upgrade", 16],["blank",['170px','50px']]]],
            ["blank",'40px'],
            ["upgrade", 18],
            ["blank",'40px'],
            ["buyable", 12],
            ["blank",'40px'],
            ["row", [["upgrade", 19],["blank",['30px','50px']],["upgrade", 21],["blank",['30px','50px']],["upgrade", 22],["blank",['30px','50px']],["upgrade", 23]]],
            ["blank",'40px'],
            ["row", [ ["upgrade", 24],["blank",['30px','50px']],["upgrade", 25]]],
            ["display-text", (!player.ec.buyables[11].gt(0))&&(hasUpgrade('pl',25))?"<br><i>For now, the end is <b>here</b>. But also, something has been unlocked</i><hr></hr>":""],
            ["blank",'40px'],
            ["buyable", 13],
            ["blank",'40px'],
            ["upgrade", 26],
            ["blank",'40px'],
            ["row", [["blank",['70px','50px']],["upgrade", 27],["blank",['30px','50px']],["upgrade", 28],["blank",['90px','50px']],["upgrade", 29]]],
            ["blank",'70px'],
            ["row", [["blank",['320px','50px']],["upgrade", 31],["blank",['160px','50px']],["upgrade", 32],["blank",['50px','50px']],["upgrade", 33]]],
            ["blank",'100px'],
            ["row", [["blank",['430px','50px']],["upgrade", 34]]],
            ["blank",'100px'],
            ["row", [["blank",['770px','50px']],["upgrade", 35]]],
            ["blank",'40px'],
            ["row", [["upgrade", 36],["blank",['35px','50px']]]],
            ["display-text", (!player.ec.buyables[11].gt(1))&&(hasUpgrade('pl',36))?"<br><i>For now, the end is <b>here</b>. Expand to proceed.</i><hr></hr>":""],
            ["blank",'40px'],
            ["row", [["buyable", 14],["blank",['30px','50px']],["blank",['200px','50px']],["buyable", 15]]],
            ["blank",'80px'],
            ["row", [ ["upgrade", 37],["blank",['320px','50px']],["upgrade", 45],["blank",['10px','50px']]]],
            ["blank",'120px'],
            ["row", [ ["upgrade", 38],["blank",['50px','50px']],["upgrade", 39],["blank",[hasUpgrade('pl',45)?'500px':'600px','50px']],["upgrade", 46]]],
            ["blank",'80px'],
            ["row", [ ["upgrade", 40],["blank",[hasUpgrade('pl',46)?'100px':'0px','50px']],["upgrade", 47],["blank",[hasUpgrade('pl',46)?'0px':'100px','50px']]]],
            ["blank",'150px'],
            ["row", [ ["blank",[hasUpgrade('pl',47)?'180px':'0px','50px']],["upgrade", 41],["blank",[hasUpgrade('pl',47)?'510px':'430px','50px']],["upgrade", 48]]],
            ["blank",'120px'],
            ["row", [ ["upgrade", 42],["blank",['220px','50px']],["upgrade", 43],["blank",['440px','50px']]]],
            ["row", [["blank",['450px','50px']],["upgrade", 49]]],
            ["blank",'40px'],
            ["buyable", 16],
            ["blank",'40px'],
            ["row", [["blank",['70px','50px']],["upgrade", 50],["blank",['40px','50px']],["upgrade", 51],["blank",['60px','50px']],["upgrade", 52],["blank",['50px','50px']],["upgrade", 53],["blank",['40px','50px']],["upgrade", 54]]],
            ["blank",'60px'],
            ["upgrade", 55],
            ["blank",'40px'],
            ["buyable", 17],
            ["blank",'60px'],
            ["upgrade", 56],
            ["blank",'120px'],
            ["row", [ ["buyable", 18],["blank",[hasUpgrade('pl',58)?'100px':'0px','50px']],["upgrade", 57],["blank",[hasUpgrade('pl',58)?'100px':'0px','50px']],["buyable", 19]]],
            ["blank",'240px'],
            ["row", [ ["upgrade", 60],["blank",[hasUpgrade('pl',59)?'200px':'0px','50px']],["upgrade", 58],["blank",[hasUpgrade('pl',59)?'200px':'0px','50px']],["upgrade", 62]]],
            ["blank",'360px'],
            ["row", [ ["upgrade", 61],["blank",[hasUpgrade('pl',60)?'200px':'0px','50px']],["upgrade", 59],["blank",[hasUpgrade('pl',60)?'200px':'0px','50px']],["upgrade", 63]]],
            ]
			]

 },
 function() { if (player.tab == "pl" && player.ec.points.gte(4))  return ["column", [
            ['clickable',11],
            "blank",
            "buyables",
            ["blank",'50px'],
            ["row", [["upgrade", 11],["blank",['30px','50px']],["upgrade", 12],["blank",['30px','50px']],["upgrade", 13],["blank",['30px','50px']],["upgrade", 14],["blank",['30px','50px']],["upgrade", 15]]],
            ["row", [["upgrade", 16],["blank",['30px','50px']],["upgrade", 17],["blank",['30px','50px']],["upgrade", 18],["blank",['30px','50px']],["upgrade", 19],["blank",['30px','50px']],["upgrade", 21]]],
            ["row", [["upgrade", 22],["blank",['30px','50px']],["upgrade", 23],["blank",['30px','50px']],["upgrade", 24],["blank",['30px','50px']],["upgrade", 25],["blank",['30px','50px']],["upgrade", 26]]],
            ["row", [["upgrade", 27],["blank",['30px','50px']],["upgrade", 28],["blank",['30px','50px']],["upgrade", 29],["blank",['30px','50px']],["upgrade", 31],["blank",['30px','50px']],["upgrade", 32]]],
            ["row", [["upgrade", 33],["blank",['30px','50px']],["upgrade", 34],["blank",['30px','50px']],["upgrade", 35],["blank",['30px','50px']],["upgrade", 36],["blank",['30px','50px']],["upgrade", 37]]],
            ["row", [["upgrade", 38],["blank",['30px','50px']],["upgrade", 39],["blank",['30px','50px']],["upgrade", 41],["blank",['30px','50px']],["upgrade", 42],["blank",['30px','50px']],["upgrade", 43]]],
            ["row", [["upgrade", 44],["blank",['30px','50px']],["upgrade", 45],["blank",['30px','50px']],["upgrade", 46],["blank",['30px','50px']],["upgrade", 47],["blank",['30px','50px']],["upgrade", 48]]],
            ["row", [["upgrade", 49],["blank",['30px','50px']],["upgrade", 51],["blank",['30px','50px']],["upgrade", 52],["blank",['30px','50px']],["upgrade", 53],["blank",['30px','50px']],["upgrade", 54]]],
            ["row", [["upgrade", 55],["blank",['30px','50px']],["upgrade", 56],["blank",['30px','50px']],["upgrade", 57],["blank",['30px','50px']],["upgrade", 58],["blank",['30px','50px']],["upgrade", 59]]],
            ["row", [["upgrade", 61],["blank",['30px','50px']],["upgrade", 62],["blank",['30px','50px']],["upgrade", 63],["blank",['30px','50px']],["upgrade", 62]]],
            ]
			]
        },
 ]
        },
    },
    upgrades: {
        11: {
            title: "Planetary Boost I",
            description() {return "You get +2 more stars per click"},
            cost: new Decimal(30),
            unlocked() {return true},
            style() {
            if (hasUpgrade("pl", 11)) return {
                'border-color': 'lightgreen',
                'background-color': '#181818',
                'color': 'white'
            }
            if (player.pl.points.gte(this.cost)) return {
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
            branches: [11],
            title: "Solar System I",
            description() {return "You get +5 more stars per click"},
            cost: new Decimal(500),
            unlocked() {return hasUpgrade('pl',11)},
            style() {
            if (hasUpgrade("pl", 12)) return {
                'border-color': 'lightgreen',
                'background-color': '#181818',
                'color': 'white'
            }
            if (player.pl.points.gte(this.cost)) return {
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
            branches: [12],
            title: "First Planet!",
            description() {return "Pluto 100% more efficient"},
            cost: new Decimal(1000),
            unlocked() {return hasUpgrade('pl',12)},
            style() {
            if (hasUpgrade("pl", 13)) return {
                'border-color': 'lightgreen',
                'background-color': '#181818',
                'color': 'white'
            }
            if (player.pl.points.gte(this.cost)) return {
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
            branches: [13],
            title: "9th planet!",
            description() {return "Pluto 150% more efficient"},
            cost: new Decimal(8200),
            unlocked() {return player.pl.buyables[11].gte(1)},
            style() {
            if (hasUpgrade("pl", 14)) return {
                'border-color': 'lightgreen',
                'background-color': '#181818',
                'color': 'white'
            }
            if (player.pl.points.gte(this.cost)) return {
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
        15: {
            branches: [13],
            title: "Pluto Mass",
            description() {return "Pluto 50% more efficient"},
            cost: new Decimal(20000),
            unlocked() {return hasUpgrade('pl',14)},
            style() {
            if (hasUpgrade("pl", 15)) return {
                'border-color': 'lightgreen',
                'background-color': '#181818',
                'color': 'white'
            }
            if (player.pl.points.gte(this.cost)) return {
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
        16: {
            branches: [13],
            title: "Not even a 9th planet?!",
            description() {return "Pluto 500% more efficient"},
            cost: new Decimal(75000),
            unlocked() {return hasUpgrade('pl',15)},
            style() {
            if (hasUpgrade("pl", 16)) return {
                'border-color': 'lightgreen',
                'background-color': '#181818',
                'color': 'white'
            }
            if (player.pl.points.gte(this.cost)) return {
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
        17: {
            branches: [12],
            title: "Solar System II",
            description() {return "Pluto 1000% more efficient"},
            cost: new Decimal(235000),
            unlocked() {return hasUpgrade('pl',16)},
            style() {
            if (hasUpgrade("pl", 17)) return {
                'border-color': 'lightgreen',
                'background-color': '#181818',
                'color': 'white'
            }
            if (player.pl.points.gte(this.cost)) return {
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
        18: {
            branches: [17],
            title: "Second Planet!",
            description() {return "Pluto 100% more efficient"},
            cost: new Decimal(7480000),
            unlocked() {return hasUpgrade('pl',17)},
            style() {
            if (hasUpgrade("pl", 18)) return {
                'border-color': 'lightgreen',
                'background-color': '#181818',
                'color': 'white'
            }
            if (player.pl.points.gte(this.cost)) return {
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
        19: {
            branches: [18],
            title: "8th planet!",
            description() {return "Neptune 300% more efficient"},
            cost: new Decimal(1.8e8),
            unlocked() {return hasUpgrade('pl',18)},
            style() {
            if (hasUpgrade("pl", 19)) return {
                'border-color': 'lightgreen',
                'background-color': '#181818',
                'color': 'white'
            }
            if (player.pl.points.gte(this.cost)) return {
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
        21: {
            branches: [18],
            title: "Neptune Boost I",
            description() {return "Neptune 75% more efficient"},
            cost: new Decimal(1e9),
            unlocked() {return hasUpgrade('pl',19)},
            style() {
            if (hasUpgrade("pl", 21)) return {
                'border-color': 'lightgreen',
                'background-color': '#181818',
                'color': 'white'
            }
            if (player.pl.points.gte(this.cost)) return {
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
        22: {
            branches: [18],
            title: "Neptune Boost II",
            description() {return "Neptune 50% more efficient"},
            cost: new Decimal(1.25e10),
            unlocked() {return hasUpgrade('pl',21)},
            style() {
            if (hasUpgrade("pl", 22)) return {
                'border-color': 'lightgreen',
                'background-color': '#181818',
                'color': 'white'
            }
            if (player.pl.points.gte(this.cost)) return {
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
        23: {
            branches: [18],
            title: "Neptune UnBoost",
            description() {return "Neptune 100% less efficient.<br>Pluto 1000000% more efficient"},
            cost: new Decimal(2.5e10),
            unlocked() {return hasUpgrade('pl',22)},
            style() {
  if (hasUpgrade('pl',23)) return {
  'border-color': 'lightgreen',
                'background-color': '#181818',
                'color': 'white'}
            if (player.pl.points.gte(this.cost)) return {
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
        24: {
            branches: [19,21],
            title: "Neptune UnBoost",
            description() {return "Addition to Neptune Base based on Pluto Level"},
            cost: new Decimal(5e11),
            unlocked() {return hasUpgrade('pl',23)},
            effect() {
                let eff = player.pl.buyables[11].log(2).pow(10)
                return eff
            },
            effectDisplay() {return "+" + format(upgradeEffect("pl", 24))},
            style() {
                if (hasUpgrade("pl", 25)) return {
                    'border-color': 'red',
                    'background-color': '#181818',
                    'color': 'white'
                }
            if (hasUpgrade("pl", 24)) return {
                'border-color': 'lightgreen',
                'background-color': '#181818',
                'color': 'white'
            }
            if (player.pl.points.gte(this.cost)) return {
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
        25: {
            branches: [22,23],
            title: "Neptune Mastery",
            description() {return "Pluto 100% less efficient.<br> Neptune 1000% more efficient"},
            cost: new Decimal(3e13),
            unlocked() {return hasUpgrade('pl',24)},
            style() {
            if (hasUpgrade("pl", 25)) return {
                'border-color': 'lightgreen',
                'background-color': '#181818',
                'color': 'white'
            }
            if (player.pl.points.gte(this.cost)) return {
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
        26: {
            branches: [25],
            title: "Third Planet!",
            description() {return "Uranus 100% more efficient"},
            cost: new Decimal(1e17),
            unlocked() {return player.pl.buyables[13].gte(1)},
            style() {
            if (hasUpgrade("pl", 26)) return {
                'border-color': 'lightgreen',
                'background-color': '#181818',
                'color': 'white'
            }
            if (player.pl.points.gte(this.cost)) return {
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
        27: {
            branches: [26],
            title: "7th planet",
            description() {return "Uranus 200% more efficient"},
            cost: new Decimal(1e18),
            unlocked() {return hasUpgrade('pl',26)},
            style() {
            if (hasUpgrade("pl", 27)) return {
                'border-color': 'lightgreen',
                'background-color': '#181818',
                'color': 'white'
            }
            if (player.pl.points.gte(this.cost)) return {
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
        28: {
            branches: [26],
            title: "Massive Planet",
            description() {return "Uranus 300% more efficient"},
            cost: new Decimal(1e19),
            unlocked() {return hasUpgrade('pl',26)},
            style() {
            if (hasUpgrade("pl", 28)) return {
                'border-color': 'lightgreen',
                'background-color': '#181818',
                'color': 'white'
            }
            if (player.pl.points.gte(this.cost)) return {
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
        29: {
            branches: [26],
            title: "Uranus Boost I",
            description() {return "Uranus 1000% more efficient."},
            cost: new Decimal(1e20),
            unlocked() {return hasUpgrade('pl',26)},
            style() {
            if (hasUpgrade("pl", 29)) return {
                'border-color': 'lightgreen',
                'background-color': '#181818',
                'color': 'white'
            }
            if (player.pl.points.gte(this.cost)) return {
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
        31: {
            branches: [27,28],
            title: "Sacrifice I",
            description() {return "Uranus 50% less efficient.<br> Get a boost to Neptune gain based on Uranus gain after debuff.<br>To buy, you need <b>7th planet and Massive Planet</b>"},
            cost: new Decimal(1e21),
            canAfford() {return hasUpgrade('pl',28)},
            unlocked() {return hasUpgrade('pl',27)},
            effect() {
                let eff = new Decimal(1)
                if (hasUpgrade('pl',31)) eff = new Decimal(buyableEffect('pl',13).eff).add(1).log(2).pow(5)
                return eff
            },
            effectDisplay() { return format(upgradeEffect('pl',31))+"%"},
            style() {
                if (hasUpgrade("pl", 35)) return {
                    'border-color': 'red',
                    'background-color': '#181818',
                    'color': 'white'
                }
            if (hasUpgrade("pl", 31)) return {
                'border-color': 'lightgreen',
                'background-color': '#181818',
                'color': 'white'
            }
            if (player.pl.points.gte(this.cost)) return {
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
        32: {
            branches: [29],
            title: "Uranus Boost II",
            description() {return "Uranus 250000% more efficient"},
            cost: new Decimal(1e24),
            unlocked() {return hasUpgrade('pl',29)},
            style() {
            if (hasUpgrade("pl", 32)) return {
                'border-color': 'lightgreen',
                'background-color': '#181818',
                'color': 'white'
            }
            if (player.pl.points.gte(this.cost)) return {
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
        33: {
            branches: [29],
            title: "Meteor Bundle",
            description() {return "Star Fusioner is better based on stars"},
            cost: new Decimal(2e25),
            unlocked() {return hasUpgrade('pl',29)||hasUpgrade('ec',12)},
            effect() {
                let eff = new Decimal(1)
                eff = player.pl.points.add(1).log10().add(1).pow(2)
                if (hasUpgrade('pl',34)||hasUpgrade('ec',12)) eff = eff.mul(upgradeEffect('pl',34).div(100).add(1))
                return eff
            },
            effectDisplay() { return format(upgradeEffect('pl',33))+"%"},
            style() {
            if (hasUpgrade("pl", 33)) return {
                'border-color': 'lightgreen',
                'background-color': '#181818',
                'color': 'white'
            }
            if (player.pl.points.gte(this.cost)) return {
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
        34: {
            branches: [29],
            title: "Meteor Bundle II",
            description() {return "<b>Meteor Bundle</b> effect is better based on time spend this event run"},
            cost: new Decimal(3e26),
            unlocked() {return hasUpgrade('pl',32)||hasUpgrade('ec',12)},
            effect() {
                let eff = new Decimal(1)
                eff = player.points.pow(0.4).add(1).pow(2).max(1)
                return eff
            },
            effectDisplay() { return format(upgradeEffect('pl',34))+"%"},
            style() {
            if (hasUpgrade("pl", 34)) return {
                'border-color': 'lightgreen',
                'background-color': '#181818',
                'color': 'white'
            }
            if (player.pl.points.gte(this.cost)) return {
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
        35: {
            branches: [33],
            title: "Almost Mastery",
            description() {return "Uranus 10000% more efficient"},
            cost: new Decimal(1.5e27),
            unlocked() {return hasUpgrade('pl',33)},
            style() {
            if (hasUpgrade("pl", 35)) return {
                'border-color': 'lightgreen',
                'background-color': '#181818',
                'color': 'white'
            }
            if (player.pl.points.gte(this.cost)) return {
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
        36: {
            branches: [31,34,35],
            title: "Uranus Mastery",
            description() {return "Neptune 100% less efficient.<br> Uranus 100000% more efficient"},
            cost: new Decimal(2e29),
            unlocked() {return hasUpgrade('pl',24)},
            style() {
            if (hasUpgrade("pl", 36)) return {
                'border-color': 'lightgreen',
                'background-color': '#181818',
                'color': 'white'
            }
            if (player.pl.points.gte(this.cost)) return {
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
        37: {
            branches: [36],
            title: "Explore Saturn' Ring A (1/7)",
            description() {return "Saturn 300% more efficient"},
            cost: new Decimal(2e34),
            unlocked() {return player.pl.buyables[14].gte(1)},
            style() {
            if (hasUpgrade("pl", 37)) return {
                'border-color': 'lightgreen',
                'background-color': '#181818',
                'color': 'white'
            }
            if (player.pl.points.gte(this.cost)) return {
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
        38: {
            branches: [37],
            title: "Explore Saturn' Ring B (2/7)",
            description() {return "Saturn 1000% more efficient"},
            cost: new Decimal(5e35),
            unlocked() {return hasUpgrade('pl',37)},
            style() {
            if (hasUpgrade("pl", 38)) return {
                'border-color': 'lightgreen',
                'background-color': '#181818',
                'color': 'white'
            }
            if (player.pl.points.gte(this.cost)) return {
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
        39: {
            branches: [37],
            title: "Explore Saturn' Ring C (3/7)",
            description() {return "<h5>Boost Stars gain based on difference between stars gain when holding <b>Star Fusioner</b> and passive stars gain.(20x/sec)</h5>"},
            cost: new Decimal(2e37),
            unlocked() {return hasUpgrade('pl',38)},
            effect() {
                let eff = new Decimal(1)
                eff = (tmp.pl.gain.mul(20)).div(tmp.pl.gain)
                if (hasUpgrade('pl',40)) eff = eff.mul(upgradeEffect('pl',40))
                return eff
            },
            effectDisplay() { return "x"+format(upgradeEffect('pl',39))},
            style() {
            if (hasUpgrade("pl", 39)) return {
                'border-color': 'lightgreen',
                'background-color': '#181818',
                'color': 'white'
            }
            if (player.pl.points.gte(this.cost)) return {
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
        40: {
            branches: [39],
            title: "Explore Saturn' Ring D (4/7)",
            description() {return "<h5>Additionally add a boost to prev. upgrade based on amount of buyed Planetary Event upgrades. </h5>"},
            cost: new Decimal(2.5e39),
            unlocked() {return hasUpgrade('pl',38)},
            effect() { 	let ret = Decimal.pow(1.075, player[this.layer].upgrades.length)
                return ret},
            effectDisplay() { return "x"+format(upgradeEffect('pl',40))},
            style() {
            if (hasUpgrade("pl", 40)) return {
                'border-color': 'lightgreen',
                'background-color': '#181818',
                'color': 'white'
            }
            if (player.pl.points.gte(this.cost)) return {
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
        41: {
            branches: [39],
            title: "Explore Saturn' Ring E (5/7)",
            description() {return "Saturn 2500% more efficient."},
            cost: new Decimal(3e40),
            unlocked() {return hasUpgrade('pl',38)},
            style() {
            if (hasUpgrade("pl", 41)) return {
                'border-color': 'lightgreen',
                'background-color': '#181818',
                'color': 'white'
            }
            if (player.pl.points.gte(this.cost)) return {
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
        42: {
            branches: [41,38],
            title: "Explore Saturn' Ring F (6/7)",
            description() {return "Saturn 1000% more efficient."},
            cost: new Decimal(1.2e42),
            unlocked() {return hasUpgrade('pl',41)},
            style() {
            if (hasUpgrade("pl", 42)) return {
                'border-color': 'lightgreen',
                'background-color': '#181818',
                'color': 'white'
            }
            if (player.pl.points.gte(this.cost)) return {
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
        43: {
            branches: [40,41],
            title: "Explore Saturn' Ring G (7/7)",
            description() {return "Uranus 100% less efficient.<br>Get more passive gain amount of stars as while holding <b>Star Fusioner</b>."},
            cost: new Decimal(1.75e43),
            unlocked() {return hasUpgrade('pl',41)},
            style() {
            if (hasUpgrade("pl", 43)) return {
                'border-color': 'lightgreen',
                'background-color': '#181818',
                'color': 'white'
            }
            if (player.pl.points.gte(this.cost)) return {
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
        44: {
            branches: [11],
            title: "Overflow I",
            description() {return "Get exponentially more stars based on stars amount."},
            cost: new Decimal(2e46),
            unlocked() {return hasUpgrade('pl',43)},
            effect() {
                let eff = new Decimal(1)
                eff = player.pl.points.add(1).log10().add(1).log10().add(1).div(3.25).add(0.5)
                return eff
            },
            effectDisplay() { return "^"+format(upgradeEffect('pl',44))},
            style() {
            if (hasUpgrade("pl", 44)) return {
                'border-color': 'lightgreen',
                'background-color': '#181818',
                'color': 'white'
            }
            if (player.pl.points.gte(this.cost)) return {
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
        45: {
            branches: [36],
            title: "Strongest Magnetic Field",
            description() {return "Jupiter 1000% more efficient."},
            cost: new Decimal(1e65),
            unlocked() {return hasUpgrade('pl',35)},
            style() {
            if (hasUpgrade("pl", 45)) return {
                'border-color': 'lightgreen',
                'background-color': '#181818',
                'color': 'white'
            }
            if (player.pl.points.gte(this.cost)) return {
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
        46: {
            branches: [45],
            title: "Explore Satellites: Io (1/4)",
            description() {return "Jupiter 7500% more efficient."},
            cost: new Decimal(1e66),
            unlocked() {return hasUpgrade('pl',45)},
            style() {
            if (hasUpgrade("pl", 46)) return {
                'border-color': 'lightgreen',
                'background-color': '#181818',
                'color': 'white'
            }
            if (player.pl.points.gte(this.cost)) return {
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
        47: {
            branches: [46],
            title: "Explore Satellites: Callisto (2/4)",
            description() {return "Jupiter 2500% more efficient."},
            cost: new Decimal(1e68),
            unlocked() {return hasUpgrade('pl',46)},
            style() {
            if (hasUpgrade("pl", 47)) return {
                'border-color': 'lightgreen',
                'background-color': '#181818',
                'color': 'white'
            }
            if (player.pl.points.gte(this.cost)) return {
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
        48: {
            branches: [47],
            title: "Explore Satellites: Ganymede (3/4)",
            description() {return "Jupiter 1000% more efficient."},
            cost: new Decimal(3e69),
            unlocked() {return hasUpgrade('pl',47)},
            style() {
            if (hasUpgrade("pl", 48)) return {
                'border-color': 'lightgreen',
                'background-color': '#181818',
                'color': 'white'
            }
            if (player.pl.points.gte(this.cost)) return {
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
        49: {
            branches: [48,45],
            title: "Explore Satellites: Europe (4/4)",
            description() {return "Jupiter 100000% more efficient."},
            cost: new Decimal(3e69),
            unlocked() {return hasUpgrade('pl',48)},
            style() {
            if (hasUpgrade("pl", 49)) return {
                'border-color': 'lightgreen',
                'background-color': '#181818',
                'color': 'white'
            }
            if (player.pl.points.gte(this.cost)) return {
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
        50: {
            branches: [49],
            title: "Terraforming Mars: Importing Ammonia (1/6)",
            description() {return "Saturn and Jupiter 100% less efficient. <br>Mars 1000% more efficient."},
            cost: new Decimal(1e77),
            unlocked() {return hasUpgrade('pl',49)},
            style() {
            if (hasUpgrade("pl", 50)) return {
                'border-color': 'lightgreen',
                'background-color': '#181818',
                'color': 'white'
            }
            if (player.pl.points.gte(this.cost)) return {
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
        51: {
            branches: [49],
            title: "Terraforming Mars: Importing hydrocarbons (2/6)",
            description() {return "Mars 10000% more efficient."},
            cost: new Decimal(1e80),
            unlocked() {return hasUpgrade('pl',49)},
            style() {
            if (hasUpgrade("pl", 51)) return {
                'border-color': 'lightgreen',
                'background-color': '#181818',
                'color': 'white'
            }
            if (player.pl.points.gte(this.cost)) return {
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
        52: {
            branches: [49],
            title: "Terraforming Mars: Using fluorine compounds (3/6)",
            description() {return "Mars 5000% more efficient."},
            cost: new Decimal(5e81),
            unlocked() {return hasUpgrade('pl',49)},
            style() {
            if (hasUpgrade("pl", 52)) return {
                'border-color': 'lightgreen',
                'background-color': '#181818',
                'color': 'white'
            }
            if (player.pl.points.gte(this.cost)) return {
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
        53: {
            branches: [49],
            title: "Terraforming Mars: Using orbital mirrors (4/6)",
            description() {return "Mars 15000% more efficient."},
            cost: new Decimal(1e84),
            unlocked() {return hasUpgrade('pl',49)},
            style() {
            if (hasUpgrade("pl", 53)) return {
                'border-color': 'lightgreen',
                'background-color': '#181818',
                'color': 'white'
            }
            if (player.pl.points.gte(this.cost)) return {
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
        54: {
            branches: [49],
            title: "Terraforming Mars: Albedo reduction (5/6)",
            description() {return "Mars 20000% more efficient."},
            cost: new Decimal(2.35e86),
            unlocked() {return hasUpgrade('pl',49)},
            style() {
            if (hasUpgrade("pl", 54)) return {
                'border-color': 'lightgreen',
                'background-color': '#181818',
                'color': 'white'
            }
            if (player.pl.points.gte(this.cost)) return {
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
        55: {
            branches: [50,51,52,53,54],
            title: "Terraforming Mars: Protecting atmosphere (6/6)",
            description() {return "Mars 1e15% more efficient."},
            cost: new Decimal(1e88),
            unlocked() {return hasUpgrade('pl',54)},
            style() {
            if (hasUpgrade("pl", 55)) return {
                'border-color': 'lightgreen',
                'background-color': '#181818',
                'color': 'white'
            }
            if (player.pl.points.gte(this.cost)) return {
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
    56: {
        branches: [55],
        title: "Life on a planet?!",
        description() {return "Earth 1e7% more efficient."},
        cost: new Decimal(1e103),
        unlocked() {return player.pl.buyables[17].gte(1)},
        style() {
        if (hasUpgrade("pl", 56)) return {
            'border-color': 'lightgreen',
            'background-color': '#181818',
            'color': 'white'
        }
        if (player.pl.points.gte(this.cost)) return {
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
    57: {
        branches: [56],
        title: "Humans!",
        description() {return "Earth 1e10% more efficient."},
        cost: new Decimal(2e109),
        unlocked() {return  hasUpgrade('pl',56)},
        style() {
        if (hasUpgrade("pl", 57)) return {
            'border-color': 'lightgreen',
            'background-color': '#181818',
            'color': 'white'
        }
        if (player.pl.points.gte(this.cost)) return {
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
    58: {
        branches: [57],
        title: "Techonologies!",
        description() {return "Earth 1e10% more efficient."},
        cost: new Decimal(5e117),
        unlocked() {return  hasUpgrade('pl',57)},
        style() {
        if (hasUpgrade("pl", 58)) return {
            'border-color': 'lightgreen',
            'background-color': '#181818',
            'color': 'white'
        }
        if (player.pl.points.gte(this.cost)) return {
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
    59: {
        branches: [58],
        title: "Going Further!",
        description() {return "Mars 100% less efficient<br>Earth 1e20% more efficient."},
        cost: new Decimal(1e128),
        unlocked() {return  hasUpgrade('pl',58)},
        style() {
        if (hasUpgrade("pl", 59)) return {
            'border-color': 'lightgreen',
            'background-color': '#181818',
            'color': 'white'
        }
        if (player.pl.points.gte(this.cost)) return {
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
    60: {
        branches: [57],
        title: "Venus Boost I",
        description() {return "Venus 1e10% more efficient."},
        cost: new Decimal(2e153),
        unlocked() {return player.pl.buyables[18].gte(1)},
        style() {
        if (hasUpgrade("pl", 60)) return {
            'border-color': 'lightgreen',
            'background-color': '#181818',
            'color': 'white'
        }
        if (player.pl.points.gte(this.cost)) return {
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
    61: {
        branches: [60],
        title: "To the last planet!",
        description() {return "Venus 1e30% more efficient."},
        cost: new Decimal(1e161),
        unlocked() {return hasUpgrade('pl',60)},
        style() {
        if (hasUpgrade("pl", 61)) return {
            'border-color': 'lightgreen',
            'background-color': '#181818',
            'color': 'white'
        }
        if (player.pl.points.gte(this.cost)) return {
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
    62: {
        branches: [57],
        title: "Mercury Boost I",
        description() {return "Mercury 1e7% more efficient."},
        cost: new Decimal(1.75e190),
        unlocked() {return hasUpgrade('pl',61)},
        style() {
        if (hasUpgrade("pl", 62)) return {
            'border-color': 'lightgreen',
            'background-color': '#181818',
            'color': 'white'
        }
        if (player.pl.points.gte(this.cost)) return {
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
    63: {
        branches: [62],
        title: "Finish a event!",
        description() {return "Finish event! (1e10% to Mercury)."},
        cost: new Decimal(2e196),
        unlocked() {return hasUpgrade('pl',62)},
        style() {
        if (hasUpgrade("pl", 63)) return {
            'border-color': 'lightgreen',
            'background-color': '#181818',
            'color': 'white'
        }
        if (player.pl.points.gte(this.cost)) return {
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
    buyables: {
        11: {
            cost(x) {if (player.pl.buyables[11].gte(500)) return new Decimal(1e15).times(x.max(1)).pow(1.35)
                if (player.pl.buyables[11].gte(400)) return new Decimal(15000000).times(x.max(1)).pow(1.35)
                if (player.pl.buyables[11].gte(250)) return new Decimal(1000000).times(x.max(1)).pow(1.25)
                if (player.pl.buyables[11].gte(150)) return new Decimal(300000).times(x.max(1)).pow(1.25)
                if (player.pl.buyables[11].gte(70)) return new Decimal(150000).times(x.add(player.pl.buyables[11]).max(1)).pow(1.25)
                if (player.pl.buyables[11].gte(30)) return new Decimal(2000).times(x.add(player.pl.buyables[11]).max(1)).pow(1.05)
                else return new Decimal(500).times(x.max(1)).pow(1.01) },
            display() {
                    let data = tmp[this.layer].buyables[this.id]
                    return "<h2><b>Pluto</b></h2> <br>" + "Requirement: " + format(data.cost) + " Stars <br>" + "Level: " + formatWhole(player[this.layer].buyables[this.id]) + " <br> Base Effect: +" + format(data.effect.base) + " stars/s"+ " <br> Produces: +" + format(data.effect.eff) + " stars/s<br>"},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                                cost = tmp[this.layer].buyables[this.id].cost
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
                                                            style() {
                    let data = tmp[this.layer].buyables[this.id]
                    if (hasUpgrade("pl", 25)) return {
                    'border-color': 'red',
                    'background-color': '#181818',
                    'color': 'white'
                    }
                    if (player.pl.points.lt(data.cost)) return {
                            'border-color': 'gray',
                            'background-color': '#181818',
                            'color': 'white',
                        }
                    else return {
                            'border-color': 'lightgreen',
                            'background-color': '#181818',
                            'color': 'white',
                        }
                },
            effect(x) {
                let base = new Decimal(1.13)
                if (hasUpgrade("pl",13)) base = base.times(2)
                if (hasUpgrade("pl",14)) base = base.times(2.5)
                if (hasUpgrade("pl",15)) base = base.times(1.5)
                if (hasUpgrade("pl",16)) base = base.times(6)
                if (hasUpgrade("pl",17)) base = base.times(11)
                if (hasUpgrade("pl",18)) base = base.times(2)
                if (hasUpgrade("pl",23)) base = base.times(10000)
                if (hasUpgrade("pl",25)) base = base.times(0)
                if (hasUpgrade('ec',11)) base = base.mul(10)
                if (hasUpgrade('pl',31)) base = base.mul(upgradeEffect('pl',31).div(100).add(1))
                let eff = base.mul(x)
                return {eff: eff, base: base}},
                unlocked() {return hasUpgrade('pl',13)},
        },
        12: {
            cost(x) {if (player.pl.buyables[12].gte(400)) return new Decimal(1e10).times(x.max(1)).pow(new Decimal(1.35).add(player.pl.buyables[12].div(1000)))
                if (player.pl.buyables[12].gte(150)) return new Decimal(1e10).times(x.add(1)).pow(1.15)
                if (player.pl.buyables[12].gte(50)) return new Decimal(3e8).times(x.add(player.pl.buyables[12]).add(1)).pow(1.1)
                if (player.pl.buyables[12].gte(30)) return new Decimal(7e7).times(x.add(player.pl.buyables[12]).add(1)).pow(1.05)
                else return new Decimal(7e6).times(x.add(1)).pow(1.05) },
            display() {
                    let data = tmp[this.layer].buyables[this.id]
                    return "<h2><b>Neptune</b></h2> <br>" + "Requirement: " + format(data.cost) + " Stars <br>" + "Level: " + formatWhole(player[this.layer].buyables[this.id]) + " <br> Base Effect: +" + format(data.effect.base) + " stars/s"+ " <br> Produces: +" + format(data.effect.eff) + " stars/s<br>"},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                                cost = tmp[this.layer].buyables[this.id].cost
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
                                                            style() {
                                                                                let data = tmp[this.layer].buyables[this.id]
                    if (hasUpgrade("pl", 36)) return {
                    'border-color': 'red',
                    'background-color': '#181818',
                    'color': 'white'
                    }
                    if (player.pl.points.lt(data.cost)) return {
                            'border-color': 'gray',
                            'background-color': '#181818',
                            'color': 'white',
                        }
                    else return {
                            'border-color': 'lightgreen',
                            'background-color': '#181818',
                            'color': 'white',
                        }
                },
            effect(x) {
                let base = new Decimal(50000)
                if (hasUpgrade("pl",19)) base = base.times(4)
                if (hasUpgrade("pl",21)) base = base.times(1.75)
                if (hasUpgrade("pl",22)) base = base.times(1.5)
                if (hasUpgrade("pl",23)) base = base.times(0)
                if (hasUpgrade("pl",24)) base = base.add(upgradeEffect('pl',24))
                if (hasUpgrade("pl",25)) base = base.times(11)
                if (hasUpgrade('ec',11)) base = base.mul(10)
                if (hasUpgrade('pl',31)) base = base.mul(upgradeEffect('pl',31).div(100))
                if (hasUpgrade("pl",36)) base = base.times(0)
                let eff = base.mul(x)
                return {eff: eff, base: base}},
                unlocked() {return hasUpgrade('pl',18)},
        },
        13: {
            cost(x) {if (player.pl.buyables[13].gte(400)) return new Decimal(1e25).times(x.add(1)).pow(1.3)
                if (player.pl.buyables[13].gte(300)) return new Decimal(1e22).times(x.add(1)).pow(1.2)
                if (player.pl.buyables[13].gte(150)) return new Decimal(1e20).times(x.add(1)).pow(1.15)
                if (player.pl.buyables[13].gte(50)) return new Decimal(1e17).times(x.add(player.pl.buyables[13]).add(1)).pow(1.1)
                if (player.pl.buyables[13].gte(30)) return new Decimal(1e15).times(x.add(player.pl.buyables[13]).add(1)).pow(1.05)
                else return new Decimal(5e14).times(x.mul(4).add(1)).pow(1.05) },
            display() {
                    let data = tmp[this.layer].buyables[this.id]
                    return "<h2><b>Uranus</b></h2> <br>" + "Requirement: " + format(data.cost) + " Stars <br>" + "Level: " + formatWhole(player[this.layer].buyables[this.id]) + " <br> Base Effect: +" + format(data.effect.base) + " stars/s"+ " <br> Produces: +" + format(data.effect.eff) + " stars/s<br>"},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                                cost = tmp[this.layer].buyables[this.id].cost
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
                    style() {
                        if (hasUpgrade("pl", 43)) return {
                            'border-color': 'red',
                            'background-color': '#181818',
                            'color': 'white'
                            }
                    let data = tmp[this.layer].buyables[this.id]
                    if (player.pl.points.lt(data.cost)) return {
                            'border-color': 'gray',
                            'background-color': '#181818',
                            'color': 'white',
                        }
                    else return {
                            'border-color': 'lightgreen',
                            'background-color': '#181818',
                            'color': 'white',
                        }
                },
            effect(x) {
                let base = new Decimal(2e15)
                //100,200,60,1000%
                if (hasUpgrade('pl',26)) base = base.mul(2)
                if (hasUpgrade('pl',27)) base = base.mul(3)
                if (hasUpgrade('pl',28)) base = base.mul(4)
                if (hasUpgrade('pl',29)) base = base.mul(11)
                if (hasUpgrade('pl',32)) base = base.mul(2501)
                if (hasUpgrade("pl",35)) base = base.times(100)
                if (hasUpgrade("pl",36)) base = base.times(1000)
                if (hasUpgrade("pl",43)) base = base.times(0)
                let eff = base.mul(x)
                return {eff: eff, base: base}},
                unlocked() {return player.ec.buyables[11].gte(1)&&hasUpgrade('pl',25)},
        },
        14: {
            cost(x) {if (player.pl.buyables[14].gte(400)) return new Decimal(1e44).times(x.add(1)).pow(1.3)
                if (player.pl.buyables[14].gte(300)) return new Decimal(1e41).times(x.add(1)).pow(1.2)
                if (player.pl.buyables[14].gte(150)) return new Decimal(1e38).times(x.add(1)).pow(1.15)
                if (player.pl.buyables[14].gte(50)) return new Decimal(1e35).times(x.add(player.pl.buyables[14]).add(1)).pow(new Decimal(1.075).add(player.pl.buyables[14].div(1000)))
                if (player.pl.buyables[14].gte(30)) return new Decimal(1e33).times(x.add(player.pl.buyables[14]).add(1)).pow(1.05)
                else return new Decimal(3e31).times(x.mul(4).add(1)).pow(1.05) },
            display() {
                    let data = tmp[this.layer].buyables[this.id]
                    return "<h2><b>Saturn</b></h2> <br>" + "Requirement: " + format(data.cost) + " Stars <br>" + "Level: " + formatWhole(player[this.layer].buyables[this.id]) + " <br> Base Effect: +" + format(data.effect.base) + " stars/s"+ " <br> Produces: +" + format(data.effect.eff) + " stars/s<br>"},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                                cost = tmp[this.layer].buyables[this.id].cost
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
                    style() {
                    let data = tmp[this.layer].buyables[this.id]
                    if (hasUpgrade("pl", 50)) return {
                        'border-color': 'red',
                        'background-color': '#181818',
                        'color': 'white'
                        }
                    if (player.pl.points.lt(data.cost)) return {
                            'border-color': 'gray',
                            'background-color': '#181818',
                            'color': 'white',
                        }
                    else return {
                            'border-color': 'lightgreen',
                            'background-color': '#181818',
                            'color': 'white',
                        }
                },
            effect(x) {
                let base = new Decimal(5e29)
                //300,200,60,1000%
                if (hasUpgrade("pl",37)) base = base.times(4)
                if (hasUpgrade("pl",38)) base = base.times(11)
                if (hasUpgrade("pl",39)) base = base.times(7)
                if (hasUpgrade("pl",41)) base = base.times(26)
                if (hasUpgrade("pl",42)) base = base.times(11)
                if (hasUpgrade("pl",43)) base = base.times(101)
                if (hasUpgrade("pl",50)) base = base.times(0)
                let eff = base.mul(x)
                return {eff: eff, base: base}},
                unlocked() {return player.ec.buyables[11].gte(2)&&hasUpgrade('pl',36)},
        },
        15: {
            cost(x) {if (player.pl.buyables[15].gte(400)) return new Decimal(1e70).times(x.add(1)).add(1).pow(new Decimal(1.2).add(player.pl.buyables[15].div(1000)))
                if (player.pl.buyables[15].gte(300)) return new Decimal(1e67).times(x.add(1)).add(1).pow(new Decimal(1.15).add(player.pl.buyables[15].div(1000)))
                if (player.pl.buyables[15].gte(100)) return new Decimal(1e65).times(x.add(1)).add(1).pow(new Decimal(1.075).add(player.pl.buyables[15].div(1000)))
                if (player.pl.buyables[15].gte(50)) return new Decimal(1e58).times(x.add(player.pl.buyables[15]).add(1)).pow(new Decimal(1.075).add(player.pl.buyables[15].div(1000)))
                if (player.pl.buyables[15].gte(30)) return new Decimal(1e60).times(x.add(player.pl.buyables[15]).add(1)).pow(1.05)
                else return new Decimal(1e57).times(x.mul(4).add(1)).pow(1.05) },
            display() {
                    let data = tmp[this.layer].buyables[this.id]
                    return "<h2><b>Jupiter</b></h2> <br>" + "Requirement: " + format(data.cost) + " Stars <br>" + "Level: " + formatWhole(player[this.layer].buyables[this.id]) + " <br> Base Effect: +" + format(data.effect.base) + " stars/s"+ " <br> Produces: +" + format(data.effect.eff) + " stars/s<br>"},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                                cost = tmp[this.layer].buyables[this.id].cost
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let data = tmp[this.layer].buyables[this.id]
                if (hasUpgrade("pl", 50)) return {
                    'border-color': 'red',
                    'background-color': '#181818',
                    'color': 'white'
                    }
                    if (player.pl.points.lt(data.cost)) return {
                            'border-color': 'gray',
                            'background-color': '#181818',
                            'color': 'white',
                        }
                    else return {
                            'border-color': 'lightgreen',
                            'background-color': '#181818',
                            'color': 'white',
                        }
                },
            effect(x) {
                let base = new Decimal(1e57)
                if (hasUpgrade("pl",45)) base = base.times(11)
                if (hasUpgrade("pl",46)) base = base.times(76)
                if (hasUpgrade("pl",47)) base = base.times(26)
                if (hasUpgrade("pl",48)) base = base.times(11)
                if (hasUpgrade("pl",49)) base = base.times(1001)
                if (hasUpgrade("pl",50)) base = base.times(0)
                //100,200,60,1000%
                let eff = base.mul(x)
                return {eff: eff, base: base}},
                unlocked() {return player.ec.buyables[11].gte(2)&&hasUpgrade('pl',36)},
        },
        16: {
            cost(x) {if (player.pl.buyables[16].gte(400)) return new Decimal(1e78).times(x.add(1)).add(1).pow(new Decimal(1.2).add(player.pl.buyables[16].div(1000)))
                if (player.pl.buyables[16].gte(300)) return new Decimal(1e77).times(x.add(1)).add(1).pow(new Decimal(1.15).add(player.pl.buyables[16].div(1000)))
                if (player.pl.buyables[16].gte(150)) return new Decimal(1e76).times(x.add(1)).add(1).pow(new Decimal(1.075).add(player.pl.buyables[16].div(1000)))
                if (player.pl.buyables[16].gte(50)) return new Decimal(1e74).times(x.add(player.pl.buyables[16]).add(1)).pow(new Decimal(1.075).add(player.pl.buyables[16].div(1000)))
                if (player.pl.buyables[16].gte(30)) return new Decimal(1e72).times(x.add(player.pl.buyables[16]).add(1)).pow(new Decimal(1.05).add(player.pl.buyables[16].div(1000)))
                else return new Decimal(5e68).times(x.mul(4).add(1)).pow(1.05) },
            display() {
                    let data = tmp[this.layer].buyables[this.id]
                    return "<h2><b>Mars</b></h2> <br>" + "Requirement: " + format(data.cost) + " Stars <br>" + "Level: " + formatWhole(player[this.layer].buyables[this.id]) + " <br> Base Effect: +" + format(data.effect.base) + " stars/s"+ " <br> Produces: +" + format(data.effect.eff) + " stars/s<br>"},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                                cost = tmp[this.layer].buyables[this.id].cost
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
                                                            style() {
                                                                                let data = tmp[this.layer].buyables[this.id]
                    if (player.pl.points.lt(data.cost)) return {
                            'border-color': 'gray',
                            'background-color': '#181818',
                            'color': 'white',
                        }
                    else return {
                            'border-color': 'lightgreen',
                            'background-color': '#181818',
                            'color': 'white',
                        }
                },
            effect(x) {
                let base = new Decimal(1e70)
                //10000,5000,15000,20000%
                if (hasUpgrade("pl",50)) base = base.times(11)
                if (hasUpgrade("pl",51)) base = base.times(101)
                if (hasUpgrade("pl",52)) base = base.times(51)
                if (hasUpgrade("pl",53)) base = base.times(151)
                if (hasUpgrade("pl",54)) base = base.times(201)
                if (hasUpgrade("pl",55)) base = base.times(1e13)
                if (hasUpgrade("pl",59)) base = base.times(0)
                let eff = base.mul(x)
                return {eff: eff, base: base}},
                unlocked() {return player.ec.buyables[11].gte(2)&&hasUpgrade('pl',49)},
        },
        17: {
            cost(x) {if (player.pl.buyables[17].gte(400)) return new Decimal(1e120).times(x.add(1)).add(1).pow(new Decimal(1.2).add(player.pl.buyables[17].div(1000)))
                if (player.pl.buyables[17].gte(300)) return new Decimal(1e115).times(x.add(1)).add(1).pow(new Decimal(1.15).add(player.pl.buyables[17].div(1000)))
                if (player.pl.buyables[17].gte(100)) return new Decimal(1e110).times(x.add(1)).add(1).pow(new Decimal(1.075).add(player.pl.buyables[17].div(1000)))
                if (player.pl.buyables[17].gte(50)) return new Decimal(1e105).times(x.add(player.pl.buyables[17]).add(1)).pow(new Decimal(1.075).add(player.pl.buyables[17].div(1000)))
                if (player.pl.buyables[17].gte(30)) return new Decimal(1e100).times(x.add(player.pl.buyables[17]).add(1)).pow(new Decimal(1.05).add(player.pl.buyables[17].div(1000)))
                else return new Decimal(5e96).times(x.mul(4).add(1)).pow(1.05) },
            display() {
                    let data = tmp[this.layer].buyables[this.id]
                    return "<h2 style='color: green'><b>Earth</b></h2> <br>" + "Requirement: " + format(data.cost) + " Stars <br>" + "Level: " + formatWhole(player[this.layer].buyables[this.id]) + " <br> Base Effect: +" + format(data.effect.base) + " stars/s"+ " <br> Produces: +" + format(data.effect.eff) + " stars/s<br>"},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                                cost = tmp[this.layer].buyables[this.id].cost
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
                                                            style() {
                                                                                let data = tmp[this.layer].buyables[this.id]
                    if (player.pl.points.lt(data.cost)) return {
                            'border-color': 'gray',
                            'background-color': '#181818',
                            'color': 'white',
                        }
                    else return {
                            'border-color': 'lightgreen',
                            'background-color': '#181818',
                            'color': 'white',
                        }
                },
            effect(x) {
                let base = new Decimal(1e96)
                if (hasUpgrade("pl",56)) base = base.times(1e5)
                if (hasUpgrade("pl",57)) base = base.times(1e8)
                if (hasUpgrade("pl",58)) base = base.times(1e10)
                if (hasUpgrade("pl",59)) base = base.times(1e18)
                //10000,5000,15000,20000%
                let eff = base.mul(x)
                return {eff: eff, base: base}},
                unlocked() {return player.ec.buyables[11].gte(2)&&hasUpgrade('pl',55)},
        },
        18: {
            cost(x) {if (player.pl.buyables[18].gte(400)) return new Decimal(1e165).times(x.add(1)).add(1).pow(new Decimal(1.2).add(player.pl.buyables[18].div(1000)))
                if (player.pl.buyables[18].gte(300)) return new Decimal(1e160).times(x.add(1)).add(1).pow(new Decimal(1.15).add(player.pl.buyables[18].div(1000)))
                if (player.pl.buyables[18].gte(100)) return new Decimal(1e155).times(x.add(1)).add(1).pow(new Decimal(1.075).add(player.pl.buyables[18].div(1000)))
                if (player.pl.buyables[18].gte(50)) return new Decimal(1e150).times(x.add(player.pl.buyables[18]).add(1)).pow(new Decimal(1.075).add(player.pl.buyables[18].div(1000)))
                if (player.pl.buyables[18].gte(30)) return new Decimal(1e145).times(x.add(player.pl.buyables[18]).add(1)).pow(new Decimal(1.05).add(player.pl.buyables[18].div(1000)))
            else return new Decimal(5e138).times(x.mul(4).add(1)).pow(1.05) },
            display() {
                    let data = tmp[this.layer].buyables[this.id]
                    return "<h2 style='color: red'><b>Venus</b></h2> <br>" + "Requirement: " + format(data.cost) + " Stars <br>" + "Level: " + formatWhole(player[this.layer].buyables[this.id]) + " <br> Base Effect: +" + format(data.effect.base) + " stars/s"+ " <br> Produces: +" + format(data.effect.eff) + " stars/s<br>"},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                                cost = tmp[this.layer].buyables[this.id].cost
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
                                                            style() {
                                                                                let data = tmp[this.layer].buyables[this.id]
                    if (player.pl.points.lt(data.cost)) return {
                            'border-color': 'gray',
                            'background-color': '#181818',
                            'color': 'white',
                        }
                    else return {
                            'border-color': 'lightgreen',
                            'background-color': '#181818',
                            'color': 'white',
                        }
                },
            effect(x) {
                let base = new Decimal(1e145)
                if (hasUpgrade("pl",60)) base = base.times(1e8)
                if (hasUpgrade("pl",61)) base = base.times(1e28)
                //10000,5000,15000,20000%
                let eff = base.mul(x)
                return {eff: eff, base: base}},
                unlocked() {return player.ec.buyables[11].gte(2)&&hasUpgrade('pl',59)},
        },
        19: {
            cost(x) {if (player.pl.buyables[19].gte(400)) return new Decimal(1e200).times(x.add(1)).add(1).pow(new Decimal(1.2).add(player.pl.buyables[19].div(1000)))
                if (player.pl.buyables[19].gte(300)) return new Decimal(1e195).times(x.add(1)).add(1).pow(new Decimal(1.15).add(player.pl.buyables[19].div(1000)))
                if (player.pl.buyables[19].gte(100)) return new Decimal(1e190).times(x.add(1)).add(1).pow(new Decimal(1.075).add(player.pl.buyables[19].div(1000)))
                if (player.pl.buyables[19].gte(50)) return new Decimal(1e185).times(x.add(player.pl.buyables[19]).add(1)).pow(new Decimal(1.075).add(player.pl.buyables[18].div(1000)))
                if (player.pl.buyables[19].gte(30)) return new Decimal(1e180).times(x.add(player.pl.buyables[19]).add(1)).pow(new Decimal(1.05).add(player.pl.buyables[18].div(1000)))
            else return new Decimal(5e178).times(x.mul(4).add(1)).pow(1.05) },
            display() {
                    let data = tmp[this.layer].buyables[this.id]
                    return "<h2 style='color: red'><b>Mercury</b></h2> <br>" + "Requirement: " + format(data.cost) + " Stars <br>" + "Level: " + formatWhole(player[this.layer].buyables[this.id]) + " <br> Base Effect: +" + format(data.effect.base) + " stars/s"+ " <br> Produces: +" + format(data.effect.eff) + " stars/s<br>"},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                                cost = tmp[this.layer].buyables[this.id].cost
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
                                                            style() {
                                                                                let data = tmp[this.layer].buyables[this.id]
                    if (player.pl.points.lt(data.cost)) return {
                            'border-color': 'gray',
                            'background-color': '#181818',
                            'color': 'white',
                        }
                    else return {
                            'border-color': 'lightgreen',
                            'background-color': '#181818',
                            'color': 'white',
                        }
                },
            effect(x) {
                let base = new Decimal(1e183)
                if (hasUpgrade("pl",62)) base = base.times(1e5)
                if (hasUpgrade("pl",63)) base = base.times(1e8)
                //10000,5000,15000,20000%
                let eff = base.mul(x)
                return {eff: eff, base: base}},
                unlocked() {return player.ec.buyables[11].gte(2)&&hasUpgrade('pl',59)},
        },
    },
    clickables: {
    11: {
        title: "<h3>Star Fusioner</h3>",
        display() {return "Hold to get Stars. On hold you get " + format(tmp.pl.base)+ " stars. (Every tick)."},
        canClick() {return true},
        unlocked() {return true},
onHold() {
    return player.pl.points = player.pl.points.add(tmp.pl.base)	
},
                                style() {
                    return {
                        'background-color': '#181818',
                        'border-color': 'lightgreen',
                        'color': 'white'
                    }
                },
            },
        },
        update(diff) {
    if (player.pl.buyables[11].gte(1))player.pl.points = player.pl.points.add(tmp.pl.gain.mul(hasUpgrade('pl',43)?50000:1).times(diff))
           
        },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true}
})
