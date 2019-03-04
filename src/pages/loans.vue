<template>
	<q-layout>
		<q-page-container>
			<q-page class="flex flex-center">
				<div class="main-table-container">
					<table class="main-table">
						<tr>
							<template v-for="(columnValue, rowKey, rowIndex) in table[0]">
								<th v-if="typeof rowKey !== 'undefined' && typeof columnValue !== 'object' && !(columnValue instanceof Array)"> {{ rowKey }} </th>
							</template>
						</tr>
						<template v-for="(row, key, index) in table">
							<tr>
								<template v-for="(columnValue, rowKey, rowIndex) in row">
									<td
										:style="{...columnValue.style}"
										:key="rowKey"
										v-if="typeof rowKey !== 'undefined' && typeof columnValue !== 'object' && !(columnValue instanceof Array)"
										v-html="
											typeof columnValue !== 'undefined' && typeof columnValue == 'function' 
												? 
													typeof inject({fun: columnValue, self: row, table}) == 'string' 
														? 
															inject({fun: columnValue, self: row, table}) 
														: 
															typeof inject({fun: columnValue, self: row, table}) == 'number' 
																? 
																	Math.floor(inject({fun: columnValue, self: row, table}))
																: 
																	'complex object' 
												: 
													typeof columnValue == 'string' 
														? 
															columnValue 
														: 
															typeof columnValue == 'number' 
																? 
																	(Math.floor(columnValue)) 
																: 
																	'complex object'
										"
									> 
										<!-- {{ typeof columnValue == 'function' ? typeof inject({fun: columnValue, self: row, table}) : '' }} -->
									</td>
								</template>
							</tr>
						</template>
					</table>
				</div>
			</q-page>
		</q-page-container>
	</q-layout>
</template>

<script>
export default {
	data(){
		return {
			table: [
				{
					loan: "a",
					amount: 300000,
					"interest rate p.a"(args){ 
						args.self.meta["interest rate p.a"] = .06 
						return "6%"
					},
					"interest only term in years": 2,
					"term in years": 25,
					"payments per year": 12,
					"payment schedule"(args){ 
						if(args.self["payments per year"] == 1) {
							return "yearly"
						} else if(args.self["payments per year"] == 3) {
							return "quartely"
						} else if(args.self["payments per year"] == 6) {
							return "bi-quarterly"
						} else if(args.self["payments per year"] == 12){
							return "monthly"
						} else if(args.self["payments per year"] == 26) {
							return "fortnightly"
						} else if(args.self["payments per year"] == 52) {
							return "weekly"
						}
					},
					"interest rate p.p"(args){ 
						args.self.meta["interest rate p.p"] = args.self.meta["interest rate p.a"] / args.self["payments per year"]
						return `${Math.floor(parseInt(args.self["interest rate p.a"](args)) / args.self["payments per year"]*100)/100}%`
					},
					"interest only repayments"(args){ 
						return args.self["payments per year"] * args.self["interest only term in years"]
					},
					"principle repayments"(args){
						return args.self["combined repayments"](args) - args.self["interest only repayments"](args)
					},
					"combined repayments"(args){ 
						return args.self["payments per year"] * args.self["term in years"]
					},
					"first interest repayment value"(args){ 
						if(!args.money){ 
							return args.self.meta["interest rate p.a"] / args.self["payments per year"] * args.self.amount 
						} else { 
							return args.money * args.self.meta["interest rate p.a"] 
						}
					},
					"principle repayment value"(args){ 
						return args.self.amount / args.self["principle repayments"](args)
					},
					"first combined repayment value"(args){ 
						return args.self["principle repayment value"](args) + args.self["first interest repayment value"](args)
					},
					"start date": function(args){ 
						let date = new Date(2018, 8, 9, 9)
						args.that.$set(args.self.meta, "start date", date)
						if(args.self && args.self.meta && args.self.meta.init && !(args.self.meta.initd) && typeof args.self.meta.init == 'function'){ 
							args.self.meta.init(args)
						}
						return args.self.meta["start date"].toString()
					},
					"gross loan payment schedule"(args){

						args.that.$set(args.self.meta, "gross loan payment schedule meta", [])
						var paymentSchedule = args.self.meta["gross loan payment schedule meta"]
						var paymentScheduleString = ""
						var outstanding = args.self.amount
						for(var number in new Array(args.self["combined repayments"](args)).fill(0)){
							paymentSchedule.push({})
							paymentSchedule[number] = {
								"payment number": parseInt(number)+1,
								"outstanding": number > 0 ? paymentSchedule[number-1].outstanding : outstanding
							}
							let interestOnly = number < args.self["interest only repayments"](args)
							let payment
							let interestPayable = paymentSchedule[number]["outstanding"] * args.self.meta["interest rate p.p"]
							let dateOfPayment = new Date(args.self.meta["start date"])
							dateOfPayment.setMonth( dateOfPayment.getMonth() + ((12 / (args.self["payments per year"]/number))-1) )
							if(interestOnly){
								payment = interestPayable
							} else {
								payment = args.self["principle repayment value"](args)
								paymentSchedule[number].outstanding -= payment
								payment += interestPayable
							}
							paymentSchedule[number] = {
								...paymentSchedule[number],
								payment,
								dateOfPayment
							}
							paymentScheduleString += `
								<div style="white-space: nowrap">
								payment number: ${paymentSchedule[number]["payment number"]},	
								payment amount: ${Math.floor(paymentSchedule[number]["payment"]*100)/100}, 
								payment date: ${dateOfPayment.formatMMDDYYYY()},
								outstanding: ${Math.floor(paymentSchedule[number]["outstanding"])},
								</div>`
						}
						return paymentScheduleString
					},
					"share holders"(args){
						var costs = "",
								SHL = args.self["share holders list"]  
						for(var index in SHL){ 
							costs += `${SHL[index]}${parseInt(index) !== SHL.length-1 ? "," : ""} ` 
						}
						return costs
					},
					"share holders list" : [
						"thomas", "susan", "robert", "peter"
					],
					"total share holders"(args){
						return args.self["share holders list"].length
					},
					"meta": {
						init(args){
							args.self.meta.initd = true
							Date.prototype.formatMMDDYYYY = function(){
								return (this.getMonth() + 1) + 
								"/" +  this.getDate() +
								"/" +  this.getFullYear();
							}
						}
					}
				}
			],
		}
	},
	created(){
	},
	methods: {
		inject(args){
			args.that = this
			return args.fun(args)
		}
	},
  name: 'PageIndex'
}
</script>
<style lang="sass">
.q-layout-page
	display: block
.main-table-container
	overflow: auto
	overflow-x: scroll
	width: auto
.main-table
	// height: 100%
	min-height: 100vh
	min-width: 100%
	width: auto
	border-collapse: collapse
	border-spacing: 0px
	// table-layout: fixed
	// overflow-x: scroll
	text-align: left
	// overflow: auto
	// overflow-x: scroll
	// display: block
	tr
		// display: block
		// width: auto
		padding: 0px
		margin: 0px
		vertical-align: top
		border-top: 1px solid black
		border-bottom: 1px solid black
		// overflow-x: scroll
		&:nth-child(even)
			background-color: #f1f1f1
		th,td
			text-align: center
			padding: 5px
			&:nth-child(even)
				background-color: #f1f1f1
		th
			border-right: 1px solid black
			border-bottom: 1px solid black
			height: 30px
			max-height: 30px
			vertical-align: middle
			// padding: 4px
			&:first-child
				border-left: 1px solid black
		td
			// padding: 3px
			text-align: center
			border-right: 1px solid black
			border-bottom: 1px solid black
			// max-width: 140px
			// min-width: 140px
			// pre
			// 	white-space: pre-wrap
			// 	word-wrap: break-word
			&:first-child
				border-left: 1px solid black
		// :first-child
		// 	border-top: 0px !important
</style>