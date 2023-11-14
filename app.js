const randomValue = (min, max) => {
	return Math.floor(Math.random() * (max - min) + min)
}

const app = Vue.createApp({
	data() {
		return {
			playerHealth: 100,
			monsterHealth: 100,
			currentRound: 0,
			winner: null,
			logMessages: [],
		}
	},
	watch: {
		playerHealth(value) {
			if (value < 0 && this.monsterHealth <= 0) {
				this.winner = 'draw'
			} else if (value <= 0) {
				this.winner = 'monster'
			}
		},
		monsterHealth(value) {
			if (value < 0 && this.playerHealth <= 0) {
				this.winner = 'draw'
			} else if (value <= 0) {
				this.winner = 'player'
			}
		},
	},
	computed: {
		monsterBarStyles() {
			if (this.monsterHealth < 0) {
				return { width: '0%' }
			}
			return { width: this.monsterHealth + '%' }
		},
		playerBarStyles() {
			if (this.playerHealth < 0) {
				return { width: '0%' }
			}
			return { width: this.playerHealth + '%' }
		},
		mayUseSpecialAttack() {
			return this.currentRound % 3 !== 0
		},
		mayUseHeal() {
			return this.currentRound % 5 !== 0
		},
	},
	methods: {
		attackMonster() {
			this.currentRound++
			const attackValue = randomValue(5, 12)
			this.monsterHealth -= attackValue
			this.addLogMessage('player', 'attack', attackValue)
			this.attackPlayer()
		},
		attackPlayer() {
			const attackValue = randomValue(8, 15)
			this.addLogMessage('monster', 'attack', attackValue)
			this.playerHealth -= attackValue
		},
		specialAttackMonster() {
			this.currentRound++
			const attackValue = randomValue(10, 25)
			this.monsterHealth -= attackValue
			this.addLogMessage('player', 'special-attack', attackValue)
			this.attackPlayer()
		},
		healPlayer() {
			this.currentRound++
			const healValue = randomValue(20, 30)
			if (this.playerHealth + healValue > 100) {
				this.playerHealth = 100
			}
			this.playerHealth += healValue
			this.addLogMessage('player', 'heal', healValue)
			this.attackPlayer()
		},
		startGame() {
			;(this.playerHealth = 100),
				(this.monsterHealth = 100),
				(this.currentRound = 0),
				(this.winner = null),
				(this.logMessages = [])
		},
		surrender() {
			this.winner = 'monster'
		},
		addLogMessage(who, what, value) {
			this.logMessages.unshift({
				actionBy: who,
				actionType: what,
				actionValue: value,
			})
		},
	},
})

app.mount('#game')
