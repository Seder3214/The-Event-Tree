let modInfo = {
	name: "Event Tree - Boostery",
	id: "eventtree",
	author: "seder3214",
	pointsName: "points",
	modFiles: ["layers/pl.js","layers/ec.js","layers/bs.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (10), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "re: 0.2",
	name: "Boosters Event!",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>re: v0.2</h3><br>`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything",'getCost','getEffect','getStyle']

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
'Endgame - Last Row 1 Booster buyed'
]

// Determines when the game "ends"
function isEndgame() {
	return player.bs.grid[107]>0
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
if (player.bs.grid[101].tier==undefined) {
for (i in player.bs.grid) {
player.bs.grid[i] = {type: "normal", tier: 0}
}}
}