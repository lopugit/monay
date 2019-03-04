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
									> 
										<!-- {{ typeof columnValue == 'function' ? typeof inject({fun: columnValue, self: row, table}) : '' }} -->
										{{
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
										}} 
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
					address: 4,
					"unit number": 1,
					rooms: 1,
					bathrooms: 1,
					"parking spots": 1,
					"weekly income"(args){ return 300 }, 
					"monthly income"(args){return args.self["weekly income"](args)*4}, 
					"yearly income"(args){return args.self["weekly income"](args)*52}, 
					"yearly costs list": [
						{
							"cost": "land tax", 
							"amount": 55000,
						},
						{
							"cost": "water", 
							"amount": 5000, 
						},
						{
							"cost": "insurance", 
							"amount": 2500, 
						},
						{
							"cost": "tax", 
							"amount": 20000, 
						}
					],
					"yearly costs"(args){ 
						var totalCost = 0, 
								costsY = args.self["yearly costs list"]
						for(var index in costsY){ 
							totalCost += costsY[index].amount
						} 
						return args.formatted ? `${totalCost}` : totalCost
					},
					"yearly costs breakdown"(args){ 
						var costs = "",
								CL = args.self["yearly costs list"]  
						for(var index in CL){ 
							costs += `${CL[index].cost}: $${CL[index].amount}${parseInt(index) !== CL.length-1 ? "," : ""} ` 
						}
						return costs
					},
					"share holders list": [
						"thomas","susan","robert","peter"
					],
					"share holders"(args){
						var costs = "",
								SHL = args.self["share holders list"]  
						for(var index in SHL){ 
							costs += `${SHL[index]}${parseInt(index) !== SHL.length-1 ? "," : ""} ` 
						}
						return costs
					},
					"total share holders"(args){
						if(args.self["meta"] && !args.self.meta.initd && args.self["meta"]["init"]){
							args.self["meta"]["init"](args)
						}
						return args.self["share holders list"].length
					},
					"meta": {
						init(args){
							args.self.meta.initd = true
							args.formatted = false
							// total income for shareholders
							let thing = args.self["total share holders"](args)
							for(var index in new Array(thing).fill(0)){
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" weekly income", 
									function(args){ 
										let val = (args.self["yearly income"](args) / 52 / args.self["total share holders"](args))
										return val
									} 
								)
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" monthly income", 
									function(args){ 
										let val = (args.self["yearly income"](args) / 12 / args.self["total share holders"](args))
										return val
									} 
								)
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" yearly income", 
									function(args){ 
										let val = (args.self["yearly income"](args) / 1 / args.self["total share holders"](args))
										return val
									} 
								)
							}
							// total costs for shareholders
							let thing2 = args.self["total share holders"](args)
							for(var index in new Array(thing2).fill(0)){
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" weekly costs", 
									function(args){ 
										let val = (args.self["yearly costs"](args) / 52 / args.self["total share holders"](args))
										return val
									} 
								)
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" monthly costs", 
									function(args){ 
										let val = (args.self["yearly costs"](args) / 12 / args.self["total share holders"](args))
										return val
									} 
								)
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" yearly costs", 
									function(args){ 
										let val = (args.self["yearly costs"](args) / 1 / args.self["total share holders"](args))
										return val
									} 
								)
							}
							// total profit for shareholders
							let thing3 = args.self["total share holders"](args)
							for(var index in new Array(thing3).fill(0)){
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" weekly profit", 
									function(args){ 
										let val = args.self[args.self["share holders list"][index]+" weekly income"](args) - args.self[args.self["share holders list"][index]+" weekly costs"](args)
										return val
									} 
								)
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" monthly profit", 
									function(args){ 
										let val = args.self[args.self["share holders list"][index]+" monthly income"](args) - args.self[args.self["share holders list"][index]+" monthly costs"](args)
										return val
									} 
								)
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" yearly profit", 
									function(args){ 
										let val = args.self[args.self["share holders list"][index]+" yearly income"](args) - args.self[args.self["share holders list"][index]+" yearly costs"](args)
										return val
									} 
								)
							}
						},
						initd: false
					}, 
				},
				{
					address: 4,
					"unit number": 2,
					rooms: 1,
					bathrooms: 1,
					"parking spots": 1,
					"weekly income"(args){ return 300 }, 
					"monthly income"(args){return args.self["weekly income"](args)*4}, 
					"yearly income"(args){return args.self["weekly income"](args)*52}, 
					"yearly costs list": [
						
					],
					"yearly costs"(args){ 
						var totalCost = 0, 
								costsY = args.self["yearly costs list"]
						for(var index in costsY){ 
							totalCost += costsY[index].amount
						} 
						return args.formatted ? `${totalCost}` : totalCost
					},
					"yearly costs breakdown"(args){ 
						var costs = "",
								CL = args.self["yearly costs list"]  
						for(var index in CL){ 
							costs += `${CL[index].cost}: $${CL[index].amount}${parseInt(index) !== CL.length-1 ? "," : ""} ` 
						}
						return costs
					},
					"share holders list": [
						"thomas","susan","robert","peter"
					],
					"share holders"(args){
						var costs = "",
								SHL = args.self["share holders list"]  
						for(var index in SHL){ 
							costs += `${SHL[index]}${parseInt(index) !== SHL.length-1 ? "," : ""} ` 
						}
						return costs
					},
					"total share holders"(args){
						if(args.self["meta"] && !args.self.meta.initd && args.self["meta"]["init"]){
							args.self["meta"]["init"](args)
						}
						return args.self["share holders list"].length
					},
					"meta": {
						init(args){
							args.self.meta.initd = true
							args.formatted = false
							// total income for shareholders
							let thing = args.self["total share holders"](args)
							for(var index in new Array(thing).fill(0)){
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" weekly income", 
									function(args){ 
										let val = (args.self["yearly income"](args) / 52 / args.self["total share holders"](args))
										return val
									} 
								)
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" monthly income", 
									function(args){ 
										let val = (args.self["yearly income"](args) / 12 / args.self["total share holders"](args))
										return val
									} 
								)
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" yearly income", 
									function(args){ 
										let val = (args.self["yearly income"](args) / 1 / args.self["total share holders"](args))
										return val
									} 
								)
							}
							// total costs for shareholders
							let thing2 = args.self["total share holders"](args)
							for(var index in new Array(thing2).fill(0)){
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" weekly costs", 
									function(args){ 
										let val = (args.self["yearly costs"](args) / 52 / args.self["total share holders"](args))
										return val
									} 
								)
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" monthly costs", 
									function(args){ 
										let val = (args.self["yearly costs"](args) / 12 / args.self["total share holders"](args))
										return val
									} 
								)
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" yearly costs", 
									function(args){ 
										let val = (args.self["yearly costs"](args) / 1 / args.self["total share holders"](args))
										return val
									} 
								)
							}
							// total profit for shareholders
							let thing3 = args.self["total share holders"](args)
							for(var index in new Array(thing3).fill(0)){
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" weekly profit", 
									function(args){ 
										let val = args.self[args.self["share holders list"][index]+" weekly income"](args) - args.self[args.self["share holders list"][index]+" weekly costs"](args)
										return val
									} 
								)
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" monthly profit", 
									function(args){ 
										let val = args.self[args.self["share holders list"][index]+" monthly income"](args) - args.self[args.self["share holders list"][index]+" monthly costs"](args)
										return val
									} 
								)
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" yearly profit", 
									function(args){ 
										let val = args.self[args.self["share holders list"][index]+" yearly income"](args) - args.self[args.self["share holders list"][index]+" yearly costs"](args)
										return val
									} 
								)
							}
						},
						initd: false
					}, 
				},
				{
					address: 4,
					"unit number": 3,
					rooms: 1,
					bathrooms: 1,
					"parking spots": 1,
					"weekly income"(args){ return 300 }, 
					"monthly income"(args){return args.self["weekly income"](args)*4}, 
					"yearly income"(args){return args.self["weekly income"](args)*52}, 
					"yearly costs list": [
						
					],
					"yearly costs"(args){ 
						var totalCost = 0, 
								costsY = args.self["yearly costs list"]
						for(var index in costsY){ 
							totalCost += costsY[index].amount
						} 
						return args.formatted ? `${totalCost}` : totalCost
					},
					"yearly costs breakdown"(args){ 
						var costs = "",
								CL = args.self["yearly costs list"]  
						for(var index in CL){ 
							costs += `${CL[index].cost}: $${CL[index].amount}${parseInt(index) !== CL.length-1 ? "," : ""} ` 
						}
						return costs
					},
					"share holders list": [
						"thomas","susan","robert","peter"
					],
					"share holders"(args){
						var costs = "",
								SHL = args.self["share holders list"]  
						for(var index in SHL){ 
							costs += `${SHL[index]}${parseInt(index) !== SHL.length-1 ? "," : ""} ` 
						}
						return costs
					},
					"total share holders"(args){
						if(args.self["meta"] && !args.self.meta.initd && args.self["meta"]["init"]){
							args.self["meta"]["init"](args)
						}
						return args.self["share holders list"].length
					},
					"meta": {
						init(args){
							args.self.meta.initd = true
							args.formatted = false
							// total income for shareholders
							let thing = args.self["total share holders"](args)
							for(var index in new Array(thing).fill(0)){
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" weekly income", 
									function(args){ 
										let val = (args.self["yearly income"](args) / 52 / args.self["total share holders"](args))
										return val
									} 
								)
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" monthly income", 
									function(args){ 
										let val = (args.self["yearly income"](args) / 12 / args.self["total share holders"](args))
										return val
									} 
								)
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" yearly income", 
									function(args){ 
										let val = (args.self["yearly income"](args) / 1 / args.self["total share holders"](args))
										return val
									} 
								)
							}
							// total costs for shareholders
							let thing2 = args.self["total share holders"](args)
							for(var index in new Array(thing2).fill(0)){
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" weekly costs", 
									function(args){ 
										let val = (args.self["yearly costs"](args) / 52 / args.self["total share holders"](args))
										return val
									} 
								)
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" monthly costs", 
									function(args){ 
										let val = (args.self["yearly costs"](args) / 12 / args.self["total share holders"](args))
										return val
									} 
								)
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" yearly costs", 
									function(args){ 
										let val = (args.self["yearly costs"](args) / 1 / args.self["total share holders"](args))
										return val
									} 
								)
							}
							// total profit for shareholders
							let thing3 = args.self["total share holders"](args)
							for(var index in new Array(thing3).fill(0)){
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" weekly profit", 
									function(args){ 
										let val = args.self[args.self["share holders list"][index]+" weekly income"](args) - args.self[args.self["share holders list"][index]+" weekly costs"](args)
										return val
									} 
								)
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" monthly profit", 
									function(args){ 
										let val = args.self[args.self["share holders list"][index]+" monthly income"](args) - args.self[args.self["share holders list"][index]+" monthly costs"](args)
										return val
									} 
								)
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" yearly profit", 
									function(args){ 
										let val = args.self[args.self["share holders list"][index]+" yearly income"](args) - args.self[args.self["share holders list"][index]+" yearly costs"](args)
										return val
									} 
								)
							}
						},
						initd: false
					}, 
				},
				{
					address: 4,
					"unit number": 4,
					rooms: 1,
					bathrooms: 1,
					"parking spots": 1,
					"weekly income"(args){ return 300 }, 
					"monthly income"(args){return args.self["weekly income"](args)*4}, 
					"yearly income"(args){return args.self["weekly income"](args)*52}, 
					"yearly costs list": [
						
					],
					"yearly costs"(args){ 
						var totalCost = 0, 
								costsY = args.self["yearly costs list"]
						for(var index in costsY){ 
							totalCost += costsY[index].amount
						} 
						return args.formatted ? `${totalCost}` : totalCost
					},
					"yearly costs breakdown"(args){ 
						var costs = "",
								CL = args.self["yearly costs list"]  
						for(var index in CL){ 
							costs += `${CL[index].cost}: $${CL[index].amount}${parseInt(index) !== CL.length-1 ? "," : ""} ` 
						}
						return costs
					},
					"share holders list": [
						"thomas","susan","robert","peter"
					],
					"share holders"(args){
						var costs = "",
								SHL = args.self["share holders list"]  
						for(var index in SHL){ 
							costs += `${SHL[index]}${parseInt(index) !== SHL.length-1 ? "," : ""} ` 
						}
						return costs
					},
					"total share holders"(args){
						if(args.self["meta"] && !args.self.meta.initd && args.self["meta"]["init"]){
							args.self["meta"]["init"](args)
						}
						return args.self["share holders list"].length
					},
					"meta": {
						init(args){
							args.self.meta.initd = true
							args.formatted = false
							// total income for shareholders
							let thing = args.self["total share holders"](args)
							for(var index in new Array(thing).fill(0)){
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" weekly income", 
									function(args){ 
										let val = (args.self["yearly income"](args) / 52 / args.self["total share holders"](args))
										return val
									} 
								)
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" monthly income", 
									function(args){ 
										let val = (args.self["yearly income"](args) / 12 / args.self["total share holders"](args))
										return val
									} 
								)
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" yearly income", 
									function(args){ 
										let val = (args.self["yearly income"](args) / 1 / args.self["total share holders"](args))
										return val
									} 
								)
							}
							// total costs for shareholders
							let thing2 = args.self["total share holders"](args)
							for(var index in new Array(thing2).fill(0)){
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" weekly costs", 
									function(args){ 
										let val = (args.self["yearly costs"](args) / 52 / args.self["total share holders"](args))
										return val
									} 
								)
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" monthly costs", 
									function(args){ 
										let val = (args.self["yearly costs"](args) / 12 / args.self["total share holders"](args))
										return val
									} 
								)
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" yearly costs", 
									function(args){ 
										let val = (args.self["yearly costs"](args) / 1 / args.self["total share holders"](args))
										return val
									} 
								)
							}
							// total profit for shareholders
							let thing3 = args.self["total share holders"](args)
							for(var index in new Array(thing3).fill(0)){
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" weekly profit", 
									function(args){ 
										let val = args.self[args.self["share holders list"][index]+" weekly income"](args) - args.self[args.self["share holders list"][index]+" weekly costs"](args)
										return val
									} 
								)
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" monthly profit", 
									function(args){ 
										let val = args.self[args.self["share holders list"][index]+" monthly income"](args) - args.self[args.self["share holders list"][index]+" monthly costs"](args)
										return val
									} 
								)
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" yearly profit", 
									function(args){ 
										let val = args.self[args.self["share holders list"][index]+" yearly income"](args) - args.self[args.self["share holders list"][index]+" yearly costs"](args)
										return val
									} 
								)
							}
						},
						initd: false
					}, 
				},
				{
					address: 4,
					"unit number": 5,
					rooms: 1,
					bathrooms: 1,
					"parking spots": 1,
					"weekly income"(args){ return 300 }, 
					"monthly income"(args){return args.self["weekly income"](args)*4}, 
					"yearly income"(args){return args.self["weekly income"](args)*52}, 
					"yearly costs list": [
						
					],
					"yearly costs"(args){ 
						var totalCost = 0, 
								costsY = args.self["yearly costs list"]
						for(var index in costsY){ 
							totalCost += costsY[index].amount
						} 
						return args.formatted ? `${totalCost}` : totalCost
					},
					"yearly costs breakdown"(args){ 
						var costs = "",
								CL = args.self["yearly costs list"]  
						for(var index in CL){ 
							costs += `${CL[index].cost}: $${CL[index].amount}${parseInt(index) !== CL.length-1 ? "," : ""} ` 
						}
						return costs
					},
					"share holders list": [
						"thomas","susan","robert","peter"
					],
					"share holders"(args){
						var costs = "",
								SHL = args.self["share holders list"]  
						for(var index in SHL){ 
							costs += `${SHL[index]}${parseInt(index) !== SHL.length-1 ? "," : ""} ` 
						}
						return costs
					},
					"total share holders"(args){
						if(args.self["meta"] && !args.self.meta.initd && args.self["meta"]["init"]){
							args.self["meta"]["init"](args)
						}
						return args.self["share holders list"].length
					},
					"meta": {
						init(args){
							args.self.meta.initd = true
							args.formatted = false
							// total income for shareholders
							let thing = args.self["total share holders"](args)
							for(var index in new Array(thing).fill(0)){
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" weekly income", 
									function(args){ 
										let val = (args.self["yearly income"](args) / 52 / args.self["total share holders"](args))
										return val
									} 
								)
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" monthly income", 
									function(args){ 
										let val = (args.self["yearly income"](args) / 12 / args.self["total share holders"](args))
										return val
									} 
								)
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" yearly income", 
									function(args){ 
										let val = (args.self["yearly income"](args) / 1 / args.self["total share holders"](args))
										return val
									} 
								)
							}
							// total costs for shareholders
							let thing2 = args.self["total share holders"](args)
							for(var index in new Array(thing2).fill(0)){
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" weekly costs", 
									function(args){ 
										let val = (args.self["yearly costs"](args) / 52 / args.self["total share holders"](args))
										return val
									} 
								)
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" monthly costs", 
									function(args){ 
										let val = (args.self["yearly costs"](args) / 12 / args.self["total share holders"](args))
										return val
									} 
								)
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" yearly costs", 
									function(args){ 
										let val = (args.self["yearly costs"](args) / 1 / args.self["total share holders"](args))
										return val
									} 
								)
							}
							// total profit for shareholders
							let thing3 = args.self["total share holders"](args)
							for(var index in new Array(thing3).fill(0)){
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" weekly profit", 
									function(args){ 
										let val = args.self[args.self["share holders list"][index]+" weekly income"](args) - args.self[args.self["share holders list"][index]+" weekly costs"](args)
										return val
									} 
								)
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" monthly profit", 
									function(args){ 
										let val = args.self[args.self["share holders list"][index]+" monthly income"](args) - args.self[args.self["share holders list"][index]+" monthly costs"](args)
										return val
									} 
								)
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" yearly profit", 
									function(args){ 
										let val = args.self[args.self["share holders list"][index]+" yearly income"](args) - args.self[args.self["share holders list"][index]+" yearly costs"](args)
										return val
									} 
								)
							}
						},
						initd: false
					}, 
				},
				{
					address: 4,
					"unit number": 6,
					rooms: 1,
					bathrooms: 1,
					"parking spots": 1,
					"weekly income"(args){ return 300 }, 
					"monthly income"(args){return args.self["weekly income"](args)*4}, 
					"yearly income"(args){return args.self["weekly income"](args)*52}, 
					"yearly costs list": [
						
					],
					"yearly costs"(args){ 
						var totalCost = 0, 
								costsY = args.self["yearly costs list"]
						for(var index in costsY){ 
							totalCost += costsY[index].amount
						} 
						return args.formatted ? `${totalCost}` : totalCost
					},
					"yearly costs breakdown"(args){ 
						var costs = "",
								CL = args.self["yearly costs list"]  
						for(var index in CL){ 
							costs += `${CL[index].cost}: $${CL[index].amount}${parseInt(index) !== CL.length-1 ? "," : ""} ` 
						}
						return costs
					},
					"share holders list": [
						"thomas","susan","robert","peter"
					],
					"share holders"(args){
						var costs = "",
								SHL = args.self["share holders list"]  
						for(var index in SHL){ 
							costs += `${SHL[index]}${parseInt(index) !== SHL.length-1 ? "," : ""} ` 
						}
						return costs
					},
					"total share holders"(args){
						if(args.self["meta"] && !args.self.meta.initd && args.self["meta"]["init"]){
							args.self["meta"]["init"](args)
						}
						return args.self["share holders list"].length
					},
					"meta": {
						init(args){
							args.self.meta.initd = true
							args.formatted = false
							// total income for shareholders
							let thing = args.self["total share holders"](args)
							for(var index in new Array(thing).fill(0)){
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" weekly income", 
									function(args){ 
										let val = (args.self["yearly income"](args) / 52 / args.self["total share holders"](args))
										return val
									} 
								)
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" monthly income", 
									function(args){ 
										let val = (args.self["yearly income"](args) / 12 / args.self["total share holders"](args))
										return val
									} 
								)
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" yearly income", 
									function(args){ 
										let val = (args.self["yearly income"](args) / 1 / args.self["total share holders"](args))
										return val
									} 
								)
							}
							// total costs for shareholders
							let thing2 = args.self["total share holders"](args)
							for(var index in new Array(thing2).fill(0)){
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" weekly costs", 
									function(args){ 
										let val = (args.self["yearly costs"](args) / 52 / args.self["total share holders"](args))
										return val
									} 
								)
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" monthly costs", 
									function(args){ 
										let val = (args.self["yearly costs"](args) / 12 / args.self["total share holders"](args))
										return val
									} 
								)
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" yearly costs", 
									function(args){ 
										let val = (args.self["yearly costs"](args) / 1 / args.self["total share holders"](args))
										return val
									} 
								)
							}
							// total profit for shareholders
							let thing3 = args.self["total share holders"](args)
							for(var index in new Array(thing3).fill(0)){
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" weekly profit", 
									function(args){ 
										let val = args.self[args.self["share holders list"][index]+" weekly income"](args) - args.self[args.self["share holders list"][index]+" weekly costs"](args)
										return val
									} 
								)
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" monthly profit", 
									function(args){ 
										let val = args.self[args.self["share holders list"][index]+" monthly income"](args) - args.self[args.self["share holders list"][index]+" monthly costs"](args)
										return val
									} 
								)
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" yearly profit", 
									function(args){ 
										let val = args.self[args.self["share holders list"][index]+" yearly income"](args) - args.self[args.self["share holders list"][index]+" yearly costs"](args)
										return val
									} 
								)
							}
						},
						initd: false
					}, 
				},
				{
					address: 4,
					"unit number": 7,
					rooms: 1,
					bathrooms: 1,
					"parking spots": 1,
					"weekly income"(args){ return 300 }, 
					"monthly income"(args){return args.self["weekly income"](args)*4}, 
					"yearly income"(args){return args.self["weekly income"](args)*52}, 
					"yearly costs list": [
						
					],
					"yearly costs"(args){ 
						var totalCost = 0, 
								costsY = args.self["yearly costs list"]
						for(var index in costsY){ 
							totalCost += costsY[index].amount
						} 
						return args.formatted ? `${totalCost}` : totalCost
					},
					"yearly costs breakdown"(args){ 
						var costs = "",
								CL = args.self["yearly costs list"]  
						for(var index in CL){ 
							costs += `${CL[index].cost}: $${CL[index].amount}${parseInt(index) !== CL.length-1 ? "," : ""} ` 
						}
						return costs
					},
					"share holders list": [
						"thomas","susan","robert","peter"
					],
					"share holders"(args){
						var costs = "",
								SHL = args.self["share holders list"]  
						for(var index in SHL){ 
							costs += `${SHL[index]}${parseInt(index) !== SHL.length-1 ? "," : ""} ` 
						}
						return costs
					},
					"total share holders"(args){
						if(args.self["meta"] && !args.self.meta.initd && args.self["meta"]["init"]){
							args.self["meta"]["init"](args)
						}
						return args.self["share holders list"].length
					},
					"meta": {
						init(args){
							args.self.meta.initd = true
							args.formatted = false
							// total income for shareholders
							let thing = args.self["total share holders"](args)
							for(var index in new Array(thing).fill(0)){
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" weekly income", 
									function(args){ 
										let val = (args.self["yearly income"](args) / 52 / args.self["total share holders"](args))
										return val
									} 
								)
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" monthly income", 
									function(args){ 
										let val = (args.self["yearly income"](args) / 12 / args.self["total share holders"](args))
										return val
									} 
								)
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" yearly income", 
									function(args){ 
										let val = (args.self["yearly income"](args) / 1 / args.self["total share holders"](args))
										return val
									} 
								)
							}
							// total costs for shareholders
							let thing2 = args.self["total share holders"](args)
							for(var index in new Array(thing2).fill(0)){
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" weekly costs", 
									function(args){ 
										let val = (args.self["yearly costs"](args) / 52 / args.self["total share holders"](args))
										return val
									} 
								)
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" monthly costs", 
									function(args){ 
										let val = (args.self["yearly costs"](args) / 12 / args.self["total share holders"](args))
										return val
									} 
								)
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" yearly costs", 
									function(args){ 
										let val = (args.self["yearly costs"](args) / 1 / args.self["total share holders"](args))
										return val
									} 
								)
							}
							// total profit for shareholders
							let thing3 = args.self["total share holders"](args)
							for(var index in new Array(thing3).fill(0)){
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" weekly profit", 
									function(args){ 
										let val = args.self[args.self["share holders list"][index]+" weekly income"](args) - args.self[args.self["share holders list"][index]+" weekly costs"](args)
										return val
									} 
								)
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" monthly profit", 
									function(args){ 
										let val = args.self[args.self["share holders list"][index]+" monthly income"](args) - args.self[args.self["share holders list"][index]+" monthly costs"](args)
										return val
									} 
								)
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" yearly profit", 
									function(args){ 
										let val = args.self[args.self["share holders list"][index]+" yearly income"](args) - args.self[args.self["share holders list"][index]+" yearly costs"](args)
										return val
									} 
								)
							}
						},
						initd: false
					}, 
				},
				{
					address: 4,
					"unit number": 8,
					rooms: 1,
					bathrooms: 1,
					"parking spots": 1,
					"weekly income"(args){ return 300 }, 
					"monthly income"(args){return args.self["weekly income"](args)*4}, 
					"yearly income"(args){return args.self["weekly income"](args)*52}, 
					"yearly costs list": [
						
					],
					"yearly costs"(args){ 
						var totalCost = 0, 
								costsY = args.self["yearly costs list"]
						for(var index in costsY){ 
							totalCost += costsY[index].amount
						} 
						return args.formatted ? `${totalCost}` : totalCost
					},
					"yearly costs breakdown"(args){ 
						var costs = "",
								CL = args.self["yearly costs list"]  
						for(var index in CL){ 
							costs += `${CL[index].cost}: $${CL[index].amount}${parseInt(index) !== CL.length-1 ? "," : ""} ` 
						}
						return costs
					},
					"share holders list": [
						"thomas","susan","robert","peter"
					],
					"share holders"(args){
						var costs = "",
								SHL = args.self["share holders list"]  
						for(var index in SHL){ 
							costs += `${SHL[index]}${parseInt(index) !== SHL.length-1 ? "," : ""} ` 
						}
						return costs
					},
					"total share holders"(args){
						if(args.self["meta"] && !args.self.meta.initd && args.self["meta"]["init"]){
							args.self["meta"]["init"](args)
						}
						return args.self["share holders list"].length
					},
					"meta": {
						init(args){
							args.self.meta.initd = true
							args.formatted = false
							// total income for shareholders
							let thing = args.self["total share holders"](args)
							for(var index in new Array(thing).fill(0)){
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" weekly income", 
									function(args){ 
										let val = (args.self["yearly income"](args) / 52 / args.self["total share holders"](args))
										return val
									} 
								)
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" monthly income", 
									function(args){ 
										let val = (args.self["yearly income"](args) / 12 / args.self["total share holders"](args))
										return val
									} 
								)
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" yearly income", 
									function(args){ 
										let val = (args.self["yearly income"](args) / 1 / args.self["total share holders"](args))
										return val
									} 
								)
							}
							// total costs for shareholders
							let thing2 = args.self["total share holders"](args)
							for(var index in new Array(thing2).fill(0)){
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" weekly costs", 
									function(args){ 
										let val = (args.self["yearly costs"](args) / 52 / args.self["total share holders"](args))
										return val
									} 
								)
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" monthly costs", 
									function(args){ 
										let val = (args.self["yearly costs"](args) / 12 / args.self["total share holders"](args))
										return val
									} 
								)
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" yearly costs", 
									function(args){ 
										let val = (args.self["yearly costs"](args) / 1 / args.self["total share holders"](args))
										return val
									} 
								)
							}
							// total profit for shareholders
							let thing3 = args.self["total share holders"](args)
							for(var index in new Array(thing3).fill(0)){
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" weekly profit", 
									function(args){ 
										let val = args.self[args.self["share holders list"][index]+" weekly income"](args) - args.self[args.self["share holders list"][index]+" weekly costs"](args)
										return val
									} 
								)
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" monthly profit", 
									function(args){ 
										let val = args.self[args.self["share holders list"][index]+" monthly income"](args) - args.self[args.self["share holders list"][index]+" monthly costs"](args)
										return val
									} 
								)
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" yearly profit", 
									function(args){ 
										let val = args.self[args.self["share holders list"][index]+" yearly income"](args) - args.self[args.self["share holders list"][index]+" yearly costs"](args)
										return val
									} 
								)
							}
						},
						initd: false
					}, 
				},
				{
					address: 4,
					"unit number": 9,
					rooms: 1,
					bathrooms: 1,
					"parking spots": 1,
					"weekly income"(args){ return 300 }, 
					"monthly income"(args){return args.self["weekly income"](args)*4}, 
					"yearly income"(args){return args.self["weekly income"](args)*52}, 
					"yearly costs list": [
						
					],
					"yearly costs"(args){ 
						var totalCost = 0, 
								costsY = args.self["yearly costs list"]
						for(var index in costsY){ 
							totalCost += costsY[index].amount
						} 
						return args.formatted ? `${totalCost}` : totalCost
					},
					"yearly costs breakdown"(args){ 
						var costs = "",
								CL = args.self["yearly costs list"]  
						for(var index in CL){ 
							costs += `${CL[index].cost}: $${CL[index].amount}${parseInt(index) !== CL.length-1 ? "," : ""} ` 
						}
						return costs
					},
					"share holders list": [
						"thomas","susan","robert","peter"
					],
					"share holders"(args){
						var costs = "",
								SHL = args.self["share holders list"]  
						for(var index in SHL){ 
							costs += `${SHL[index]}${parseInt(index) !== SHL.length-1 ? "," : ""} ` 
						}
						return costs
					},
					"total share holders"(args){
						if(args.self["meta"] && !args.self.meta.initd && args.self["meta"]["init"]){
							args.self["meta"]["init"](args)
						}
						return args.self["share holders list"].length
					},
					"meta": {
						init(args){
							args.self.meta.initd = true
							args.formatted = false
							// total income for shareholders
							let thing = args.self["total share holders"](args)
							for(var index in new Array(thing).fill(0)){
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" weekly income", 
									function(args){ 
										let val = (args.self["yearly income"](args) / 52 / args.self["total share holders"](args))
										return val
									} 
								)
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" monthly income", 
									function(args){ 
										let val = (args.self["yearly income"](args) / 12 / args.self["total share holders"](args))
										return val
									} 
								)
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" yearly income", 
									function(args){ 
										let val = (args.self["yearly income"](args) / 1 / args.self["total share holders"](args))
										return val
									} 
								)
							}
							// total costs for shareholders
							let thing2 = args.self["total share holders"](args)
							for(var index in new Array(thing2).fill(0)){
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" weekly costs", 
									function(args){ 
										let val = (args.self["yearly costs"](args) / 52 / args.self["total share holders"](args))
										return val
									} 
								)
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" monthly costs", 
									function(args){ 
										let val = (args.self["yearly costs"](args) / 12 / args.self["total share holders"](args))
										return val
									} 
								)
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" yearly costs", 
									function(args){ 
										let val = (args.self["yearly costs"](args) / 1 / args.self["total share holders"](args))
										return val
									} 
								)
							}
							// total profit for shareholders
							let thing3 = args.self["total share holders"](args)
							for(var index in new Array(thing3).fill(0)){
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" weekly profit", 
									function(args){ 
										let val = args.self[args.self["share holders list"][index]+" weekly income"](args) - args.self[args.self["share holders list"][index]+" weekly costs"](args)
										return val
									} 
								)
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" monthly profit", 
									function(args){ 
										let val = args.self[args.self["share holders list"][index]+" monthly income"](args) - args.self[args.self["share holders list"][index]+" monthly costs"](args)
										return val
									} 
								)
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" yearly profit", 
									function(args){ 
										let val = args.self[args.self["share holders list"][index]+" yearly income"](args) - args.self[args.self["share holders list"][index]+" yearly costs"](args)
										return val
									} 
								)
							}
						},
						initd: false
					}, 
				},
				{
					address: 4,
					"unit number": 10,
					rooms: 1,
					bathrooms: 1,
					"parking spots": 1,
					"weekly income"(args){ return 300 }, 
					"monthly income"(args){return args.self["weekly income"](args)*4}, 
					"yearly income"(args){return args.self["weekly income"](args)*52}, 
					"yearly costs list": [
						
					],
					"yearly costs"(args){ 
						var totalCost = 0, 
								costsY = args.self["yearly costs list"]
						for(var index in costsY){ 
							totalCost += costsY[index].amount
						} 
						return args.formatted ? `${totalCost}` : totalCost
					},
					"yearly costs breakdown"(args){ 
						var costs = "",
								CL = args.self["yearly costs list"]  
						for(var index in CL){ 
							costs += `${CL[index].cost}: $${CL[index].amount}${parseInt(index) !== CL.length-1 ? "," : ""} ` 
						}
						return costs
					},
					"share holders list": [
						"thomas","susan","robert","peter"
					],
					"share holders"(args){
						var costs = "",
								SHL = args.self["share holders list"]  
						for(var index in SHL){ 
							costs += `${SHL[index]}${parseInt(index) !== SHL.length-1 ? "," : ""} ` 
						}
						return costs
					},
					"total share holders"(args){
						if(args.self["meta"] && !args.self.meta.initd && args.self["meta"]["init"]){
							args.self["meta"]["init"](args)
						}
						return args.self["share holders list"].length
					},
					"meta": {
						init(args){
							args.self.meta.initd = true
							args.formatted = false
							// total income for shareholders
							let thing = args.self["total share holders"](args)
							for(var index in new Array(thing).fill(0)){
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" weekly income", 
									function(args){ 
										let val = (args.self["yearly income"](args) / 52 / args.self["total share holders"](args))
										return val
									} 
								)
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" monthly income", 
									function(args){ 
										let val = (args.self["yearly income"](args) / 12 / args.self["total share holders"](args))
										return val
									} 
								)
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" yearly income", 
									function(args){ 
										let val = (args.self["yearly income"](args) / 1 / args.self["total share holders"](args))
										return val
									} 
								)
							}
							// total costs for shareholders
							let thing2 = args.self["total share holders"](args)
							for(var index in new Array(thing2).fill(0)){
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" weekly costs", 
									function(args){ 
										let val = (args.self["yearly costs"](args) / 52 / args.self["total share holders"](args))
										return val
									} 
								)
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" monthly costs", 
									function(args){ 
										let val = (args.self["yearly costs"](args) / 12 / args.self["total share holders"](args))
										return val
									} 
								)
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" yearly costs", 
									function(args){ 
										let val = (args.self["yearly costs"](args) / 1 / args.self["total share holders"](args))
										return val
									} 
								)
							}
							// total profit for shareholders
							let thing3 = args.self["total share holders"](args)
							for(var index in new Array(thing3).fill(0)){
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" weekly profit", 
									function(args){ 
										let val = args.self[args.self["share holders list"][index]+" weekly income"](args) - args.self[args.self["share holders list"][index]+" weekly costs"](args)
										return val
									} 
								)
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" monthly profit", 
									function(args){ 
										let val = args.self[args.self["share holders list"][index]+" monthly income"](args) - args.self[args.self["share holders list"][index]+" monthly costs"](args)
										return val
									} 
								)
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" yearly profit", 
									function(args){ 
										let val = args.self[args.self["share holders list"][index]+" yearly income"](args) - args.self[args.self["share holders list"][index]+" yearly costs"](args)
										return val
									} 
								)
							}
						},
						initd: false
					}, 
				},
				{
					address: 4,
					"unit number": 12,
					rooms: 1,
					bathrooms: 1,
					"parking spots": 1,
					"weekly income"(args){ return 300 }, 
					"monthly income"(args){return args.self["weekly income"](args)*4}, 
					"yearly income"(args){return args.self["weekly income"](args)*52}, 
					"yearly costs list": [
						
					],
					"yearly costs"(args){ 
						var totalCost = 0, 
								costsY = args.self["yearly costs list"]
						for(var index in costsY){ 
							totalCost += costsY[index].amount
						} 
						return args.formatted ? `${totalCost}` : totalCost
					},
					"yearly costs breakdown"(args){ 
						var costs = "",
								CL = args.self["yearly costs list"]  
						for(var index in CL){ 
							costs += `${CL[index].cost}: $${CL[index].amount}${parseInt(index) !== CL.length-1 ? "," : ""} ` 
						}
						return costs
					},
					"share holders list": [
						"thomas","susan","robert","peter"
					],
					"share holders"(args){
						var costs = "",
								SHL = args.self["share holders list"]  
						for(var index in SHL){ 
							costs += `${SHL[index]}${parseInt(index) !== SHL.length-1 ? "," : ""} ` 
						}
						return costs
					},
					"total share holders"(args){
						if(args.self["meta"] && !args.self.meta.initd && args.self["meta"]["init"]){
							args.self["meta"]["init"](args)
						}
						return args.self["share holders list"].length
					},
					"meta": {
						init(args){
							args.self.meta.initd = true
							args.formatted = false
							// total income for shareholders
							let thing = args.self["total share holders"](args)
							for(var index in new Array(thing).fill(0)){
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" weekly income", 
									function(args){ 
										let val = (args.self["yearly income"](args) / 52 / args.self["total share holders"](args))
										return val
									} 
								)
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" monthly income", 
									function(args){ 
										let val = (args.self["yearly income"](args) / 12 / args.self["total share holders"](args))
										return val
									} 
								)
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" yearly income", 
									function(args){ 
										let val = (args.self["yearly income"](args) / 1 / args.self["total share holders"](args))
										return val
									} 
								)
							}
							// total costs for shareholders
							let thing2 = args.self["total share holders"](args)
							for(var index in new Array(thing2).fill(0)){
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" weekly costs", 
									function(args){ 
										let val = (args.self["yearly costs"](args) / 52 / args.self["total share holders"](args))
										return val
									} 
								)
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" monthly costs", 
									function(args){ 
										let val = (args.self["yearly costs"](args) / 12 / args.self["total share holders"](args))
										return val
									} 
								)
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" yearly costs", 
									function(args){ 
										let val = (args.self["yearly costs"](args) / 1 / args.self["total share holders"](args))
										return val
									} 
								)
							}
							// total profit for shareholders
							let thing3 = args.self["total share holders"](args)
							for(var index in new Array(thing3).fill(0)){
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" weekly profit", 
									function(args){ 
										let val = args.self[args.self["share holders list"][index]+" weekly income"](args) - args.self[args.self["share holders list"][index]+" weekly costs"](args)
										return val
									} 
								)
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" monthly profit", 
									function(args){ 
										let val = args.self[args.self["share holders list"][index]+" monthly income"](args) - args.self[args.self["share holders list"][index]+" monthly costs"](args)
										return val
									} 
								)
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" yearly profit", 
									function(args){ 
										let val = args.self[args.self["share holders list"][index]+" yearly income"](args) - args.self[args.self["share holders list"][index]+" yearly costs"](args)
										return val
									} 
								)
							}
						},
						initd: false
					}, 
				},
				{
					address: 6,
					"unit number": 1,
					rooms: 1,
					bathrooms: 1,
					"parking spots": 1,
					"weekly income"(args){ return 350 }, 
					"monthly income"(args){return args.self["weekly income"](args)*4}, 
					"yearly income"(args){return args.self["weekly income"](args)*52}, 
					"yearly costs list": [
						{
							"cost": "land tax", 
							"amount": 35000,
						},
						{
							"cost": "water", 
							"amount": 4000, 
						},
						{
							"cost": "insurance", 
							"amount": 2500, 
						},
						{
							"cost": "tax", 
							"amount": 15000, 
						}
					],
					"yearly costs"(args){ 
						var totalCost = 0, 
								costsY = args.self["yearly costs list"]
						for(var index in costsY){ 
							totalCost += costsY[index].amount
						} 
						return args.formatted ? `${totalCost}` : totalCost
					},
					"yearly costs breakdown"(args){ 
						var costs = "",
								CL = args.self["yearly costs list"]  
						for(var index in CL){ 
							costs += `${CL[index].cost}: $${CL[index].amount}${parseInt(index) !== CL.length-1 ? "," : ""} ` 
						}
						return costs
					},
					"share holders list": [
						"thomas","susan","robert","peter"
					],
					"share holders"(args){
						var costs = "",
								SHL = args.self["share holders list"]  
						for(var index in SHL){ 
							costs += `${SHL[index]}${parseInt(index) !== SHL.length-1 ? "," : ""} ` 
						}
						return costs
					},
					"total share holders"(args){
						if(args.self["meta"] && !args.self.meta.initd && args.self["meta"]["init"]){
							args.self["meta"]["init"](args)
						}
						return args.self["share holders list"].length
					},
					"meta": {
						init(args){
							args.self.meta.initd = true
							args.formatted = false
							// total income for shareholders
							let thing = args.self["total share holders"](args)
							for(var index in new Array(thing).fill(0)){
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" weekly income", 
									function(args){ 
										let val = (args.self["yearly income"](args) / 52 / args.self["total share holders"](args))
										return val
									} 
								)
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" monthly income", 
									function(args){ 
										let val = (args.self["yearly income"](args) / 12 / args.self["total share holders"](args))
										return val
									} 
								)
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" yearly income", 
									function(args){ 
										let val = (args.self["yearly income"](args) / 1 / args.self["total share holders"](args))
										return val
									} 
								)
							}
							// total costs for shareholders
							let thing2 = args.self["total share holders"](args)
							for(var index in new Array(thing2).fill(0)){
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" weekly costs", 
									function(args){ 
										let val = (args.self["yearly costs"](args) / 52 / args.self["total share holders"](args))
										return val
									} 
								)
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" monthly costs", 
									function(args){ 
										let val = (args.self["yearly costs"](args) / 12 / args.self["total share holders"](args))
										return val
									} 
								)
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" yearly costs", 
									function(args){ 
										let val = (args.self["yearly costs"](args) / 1 / args.self["total share holders"](args))
										return val
									} 
								)
							}
							// total profit for shareholders
							let thing3 = args.self["total share holders"](args)
							for(var index in new Array(thing3).fill(0)){
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" weekly profit", 
									function(args){ 
										let val = args.self[args.self["share holders list"][index]+" weekly income"](args) - args.self[args.self["share holders list"][index]+" weekly costs"](args)
										return val
									} 
								)
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" monthly profit", 
									function(args){ 
										let val = args.self[args.self["share holders list"][index]+" monthly income"](args) - args.self[args.self["share holders list"][index]+" monthly costs"](args)
										return val
									} 
								)
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" yearly profit", 
									function(args){ 
										let val = args.self[args.self["share holders list"][index]+" yearly income"](args) - args.self[args.self["share holders list"][index]+" yearly costs"](args)
										return val
									} 
								)
							}
						},
						initd: false
					}, 
				},
				{
					address: 6,
					"unit number": 2,
					rooms: 1,
					bathrooms: 1,
					"parking spots": 1,
					"weekly income"(args){ return 350 }, 
					"monthly income"(args){return args.self["weekly income"](args)*4}, 
					"yearly income"(args){return args.self["weekly income"](args)*52}, 
					"yearly costs list": [
						
					],
					"yearly costs"(args){ 
						var totalCost = 0, 
								costsY = args.self["yearly costs list"]
						for(var index in costsY){ 
							totalCost += costsY[index].amount
						} 
						return args.formatted ? `${totalCost}` : totalCost
					},
					"yearly costs breakdown"(args){ 
						var costs = "",
								CL = args.self["yearly costs list"]  
						for(var index in CL){ 
							costs += `${CL[index].cost}: $${CL[index].amount}${parseInt(index) !== CL.length-1 ? "," : ""} ` 
						}
						return costs
					},
					"share holders list": [
						"thomas","susan","robert","peter"
					],
					"share holders"(args){
						var costs = "",
								SHL = args.self["share holders list"]  
						for(var index in SHL){ 
							costs += `${SHL[index]}${parseInt(index) !== SHL.length-1 ? "," : ""} ` 
						}
						return costs
					},
					"total share holders"(args){
						if(args.self["meta"] && !args.self.meta.initd && args.self["meta"]["init"]){
							args.self["meta"]["init"](args)
						}
						return args.self["share holders list"].length
					},
					"meta": {
						init(args){
							args.self.meta.initd = true
							args.formatted = false
							// total income for shareholders
							let thing = args.self["total share holders"](args)
							for(var index in new Array(thing).fill(0)){
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" weekly income", 
									function(args){ 
										let val = (args.self["yearly income"](args) / 52 / args.self["total share holders"](args))
										return val
									} 
								)
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" monthly income", 
									function(args){ 
										let val = (args.self["yearly income"](args) / 12 / args.self["total share holders"](args))
										return val
									} 
								)
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" yearly income", 
									function(args){ 
										let val = (args.self["yearly income"](args) / 1 / args.self["total share holders"](args))
										return val
									} 
								)
							}
							// total costs for shareholders
							let thing2 = args.self["total share holders"](args)
							for(var index in new Array(thing2).fill(0)){
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" weekly costs", 
									function(args){ 
										let val = (args.self["yearly costs"](args) / 52 / args.self["total share holders"](args))
										return val
									} 
								)
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" monthly costs", 
									function(args){ 
										let val = (args.self["yearly costs"](args) / 12 / args.self["total share holders"](args))
										return val
									} 
								)
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" yearly costs", 
									function(args){ 
										let val = (args.self["yearly costs"](args) / 1 / args.self["total share holders"](args))
										return val
									} 
								)
							}
							// total profit for shareholders
							let thing3 = args.self["total share holders"](args)
							for(var index in new Array(thing3).fill(0)){
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" weekly profit", 
									function(args){ 
										let val = args.self[args.self["share holders list"][index]+" weekly income"](args) - args.self[args.self["share holders list"][index]+" weekly costs"](args)
										return val
									} 
								)
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" monthly profit", 
									function(args){ 
										let val = args.self[args.self["share holders list"][index]+" monthly income"](args) - args.self[args.self["share holders list"][index]+" monthly costs"](args)
										return val
									} 
								)
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" yearly profit", 
									function(args){ 
										let val = args.self[args.self["share holders list"][index]+" yearly income"](args) - args.self[args.self["share holders list"][index]+" yearly costs"](args)
										return val
									} 
								)
							}
						},
						initd: false
					}, 
				},
				{
					address: 6,
					"unit number": 3,
					rooms: 1,
					bathrooms: 1,
					"parking spots": 1,
					"weekly income"(args){ return 350 }, 
					"monthly income"(args){return args.self["weekly income"](args)*4}, 
					"yearly income"(args){return args.self["weekly income"](args)*52}, 
					"yearly costs list": [
						
					],
					"yearly costs"(args){ 
						var totalCost = 0, 
								costsY = args.self["yearly costs list"]
						for(var index in costsY){ 
							totalCost += costsY[index].amount
						} 
						return args.formatted ? `${totalCost}` : totalCost
					},
					"yearly costs breakdown"(args){ 
						var costs = "",
								CL = args.self["yearly costs list"]  
						for(var index in CL){ 
							costs += `${CL[index].cost}: $${CL[index].amount}${parseInt(index) !== CL.length-1 ? "," : ""} ` 
						}
						return costs
					},
					"share holders list": [
						"thomas","susan","robert","peter"
					],
					"share holders"(args){
						var costs = "",
								SHL = args.self["share holders list"]  
						for(var index in SHL){ 
							costs += `${SHL[index]}${parseInt(index) !== SHL.length-1 ? "," : ""} ` 
						}
						return costs
					},
					"total share holders"(args){
						if(args.self["meta"] && !args.self.meta.initd && args.self["meta"]["init"]){
							args.self["meta"]["init"](args)
						}
						return args.self["share holders list"].length
					},
					"meta": {
						init(args){
							args.self.meta.initd = true
							args.formatted = false
							// total income for shareholders
							let thing = args.self["total share holders"](args)
							for(var index in new Array(thing).fill(0)){
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" weekly income", 
									function(args){ 
										let val = (args.self["yearly income"](args) / 52 / args.self["total share holders"](args))
										return val
									} 
								)
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" monthly income", 
									function(args){ 
										let val = (args.self["yearly income"](args) / 12 / args.self["total share holders"](args))
										return val
									} 
								)
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" yearly income", 
									function(args){ 
										let val = (args.self["yearly income"](args) / 1 / args.self["total share holders"](args))
										return val
									} 
								)
							}
							// total costs for shareholders
							let thing2 = args.self["total share holders"](args)
							for(var index in new Array(thing2).fill(0)){
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" weekly costs", 
									function(args){ 
										let val = (args.self["yearly costs"](args) / 52 / args.self["total share holders"](args))
										return val
									} 
								)
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" monthly costs", 
									function(args){ 
										let val = (args.self["yearly costs"](args) / 12 / args.self["total share holders"](args))
										return val
									} 
								)
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" yearly costs", 
									function(args){ 
										let val = (args.self["yearly costs"](args) / 1 / args.self["total share holders"](args))
										return val
									} 
								)
							}
							// total profit for shareholders
							let thing3 = args.self["total share holders"](args)
							for(var index in new Array(thing3).fill(0)){
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" weekly profit", 
									function(args){ 
										let val = args.self[args.self["share holders list"][index]+" weekly income"](args) - args.self[args.self["share holders list"][index]+" weekly costs"](args)
										return val
									} 
								)
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" monthly profit", 
									function(args){ 
										let val = args.self[args.self["share holders list"][index]+" monthly income"](args) - args.self[args.self["share holders list"][index]+" monthly costs"](args)
										return val
									} 
								)
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" yearly profit", 
									function(args){ 
										let val = args.self[args.self["share holders list"][index]+" yearly income"](args) - args.self[args.self["share holders list"][index]+" yearly costs"](args)
										return val
									} 
								)
							}
						},
						initd: false
					}, 
				},
				{
					address: 6,
					"unit number": 4,
					rooms: 1,
					bathrooms: 1,
					"parking spots": 1,
					"weekly income"(args){ return 350 }, 
					"monthly income"(args){return args.self["weekly income"](args)*4}, 
					"yearly income"(args){return args.self["weekly income"](args)*52}, 
					"yearly costs list": [
						
					],
					"yearly costs"(args){ 
						var totalCost = 0, 
								costsY = args.self["yearly costs list"]
						for(var index in costsY){ 
							totalCost += costsY[index].amount
						} 
						return args.formatted ? `${totalCost}` : totalCost
					},
					"yearly costs breakdown"(args){ 
						var costs = "",
								CL = args.self["yearly costs list"]  
						for(var index in CL){ 
							costs += `${CL[index].cost}: $${CL[index].amount}${parseInt(index) !== CL.length-1 ? "," : ""} ` 
						}
						return costs
					},
					"share holders list": [
						"thomas","susan","robert","peter"
					],
					"share holders"(args){
						var costs = "",
								SHL = args.self["share holders list"]  
						for(var index in SHL){ 
							costs += `${SHL[index]}${parseInt(index) !== SHL.length-1 ? "," : ""} ` 
						}
						return costs
					},
					"total share holders"(args){
						if(args.self["meta"] && !args.self.meta.initd && args.self["meta"]["init"]){
							args.self["meta"]["init"](args)
						}
						return args.self["share holders list"].length
					},
					"meta": {
						init(args){
							args.self.meta.initd = true
							args.formatted = false
							// total income for shareholders
							let thing = args.self["total share holders"](args)
							for(var index in new Array(thing).fill(0)){
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" weekly income", 
									function(args){ 
										let val = (args.self["yearly income"](args) / 52 / args.self["total share holders"](args))
										return val
									} 
								)
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" monthly income", 
									function(args){ 
										let val = (args.self["yearly income"](args) / 12 / args.self["total share holders"](args))
										return val
									} 
								)
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" yearly income", 
									function(args){ 
										let val = (args.self["yearly income"](args) / 1 / args.self["total share holders"](args))
										return val
									} 
								)
							}
							// total costs for shareholders
							let thing2 = args.self["total share holders"](args)
							for(var index in new Array(thing2).fill(0)){
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" weekly costs", 
									function(args){ 
										let val = (args.self["yearly costs"](args) / 52 / args.self["total share holders"](args))
										return val
									} 
								)
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" monthly costs", 
									function(args){ 
										let val = (args.self["yearly costs"](args) / 12 / args.self["total share holders"](args))
										return val
									} 
								)
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" yearly costs", 
									function(args){ 
										let val = (args.self["yearly costs"](args) / 1 / args.self["total share holders"](args))
										return val
									} 
								)
							}
							// total profit for shareholders
							let thing3 = args.self["total share holders"](args)
							for(var index in new Array(thing3).fill(0)){
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" weekly profit", 
									function(args){ 
										let val = args.self[args.self["share holders list"][index]+" weekly income"](args) - args.self[args.self["share holders list"][index]+" weekly costs"](args)
										return val
									} 
								)
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" monthly profit", 
									function(args){ 
										let val = args.self[args.self["share holders list"][index]+" monthly income"](args) - args.self[args.self["share holders list"][index]+" monthly costs"](args)
										return val
									} 
								)
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" yearly profit", 
									function(args){ 
										let val = args.self[args.self["share holders list"][index]+" yearly income"](args) - args.self[args.self["share holders list"][index]+" yearly costs"](args)
										return val
									} 
								)
							}
						},
						initd: false
					}, 
				},
				{
					address: 6,
					"unit number": 5,
					rooms: 1,
					bathrooms: 1,
					"parking spots": 1,
					"weekly income"(args){ return 700 }, 
					"monthly income"(args){return args.self["weekly income"](args)*4}, 
					"yearly income"(args){return args.self["weekly income"](args)*52}, 
					"yearly costs list": [
						
					],
					"yearly costs"(args){ 
						var totalCost = 0, 
								costsY = args.self["yearly costs list"]
						for(var index in costsY){ 
							totalCost += costsY[index].amount
						} 
						return args.formatted ? `${totalCost}` : totalCost
					},
					"yearly costs breakdown"(args){ 
						var costs = "",
								CL = args.self["yearly costs list"]  
						for(var index in CL){ 
							costs += `${CL[index].cost}: $${CL[index].amount}${parseInt(index) !== CL.length-1 ? "," : ""} ` 
						}
						return costs
					},
					"share holders list": [
						"thomas","susan","robert","peter"
					],
					"share holders"(args){
						var costs = "",
								SHL = args.self["share holders list"]  
						for(var index in SHL){ 
							costs += `${SHL[index]}${parseInt(index) !== SHL.length-1 ? "," : ""} ` 
						}
						return costs
					},
					"total share holders"(args){
						if(args.self["meta"] && !args.self.meta.initd && args.self["meta"]["init"]){
							args.self["meta"]["init"](args)
						}
						return args.self["share holders list"].length
					},
					"meta": {
						init(args){
							args.self.meta.initd = true
							args.formatted = false
							// total income for shareholders
							let thing = args.self["total share holders"](args)
							for(var index in new Array(thing).fill(0)){
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" weekly income", 
									function(args){ 
										let val = (args.self["yearly income"](args) / 52 / args.self["total share holders"](args))
										return val
									} 
								)
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" monthly income", 
									function(args){ 
										let val = (args.self["yearly income"](args) / 12 / args.self["total share holders"](args))
										return val
									} 
								)
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" yearly income", 
									function(args){ 
										let val = (args.self["yearly income"](args) / 1 / args.self["total share holders"](args))
										return val
									} 
								)
							}
							// total costs for shareholders
							let thing2 = args.self["total share holders"](args)
							for(var index in new Array(thing2).fill(0)){
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" weekly costs", 
									function(args){ 
										let val = (args.self["yearly costs"](args) / 52 / args.self["total share holders"](args))
										return val
									} 
								)
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" monthly costs", 
									function(args){ 
										let val = (args.self["yearly costs"](args) / 12 / args.self["total share holders"](args))
										return val
									} 
								)
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" yearly costs", 
									function(args){ 
										let val = (args.self["yearly costs"](args) / 1 / args.self["total share holders"](args))
										return val
									} 
								)
							}
							// total profit for shareholders
							let thing3 = args.self["total share holders"](args)
							for(var index in new Array(thing3).fill(0)){
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" weekly profit", 
									function(args){ 
										let val = args.self[args.self["share holders list"][index]+" weekly income"](args) - args.self[args.self["share holders list"][index]+" weekly costs"](args)
										return val
									} 
								)
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" monthly profit", 
									function(args){ 
										let val = args.self[args.self["share holders list"][index]+" monthly income"](args) - args.self[args.self["share holders list"][index]+" monthly costs"](args)
										return val
									} 
								)
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" yearly profit", 
									function(args){ 
										let val = args.self[args.self["share holders list"][index]+" yearly income"](args) - args.self[args.self["share holders list"][index]+" yearly costs"](args)
										return val
									} 
								)
							}
						},
						initd: false
					}, 
				},
				{
					address: 6,
					"unit number": 6,
					rooms: 1,
					bathrooms: 1,
					"parking spots": 1,
					"weekly income"(args){ return 700 }, 
					"monthly income"(args){return args.self["weekly income"](args)*4}, 
					"yearly income"(args){return args.self["weekly income"](args)*52}, 
					"yearly costs list": [
						
					],
					"yearly costs"(args){ 
						var totalCost = 0, 
								costsY = args.self["yearly costs list"]
						for(var index in costsY){ 
							totalCost += costsY[index].amount
						} 
						return args.formatted ? `${totalCost}` : totalCost
					},
					"yearly costs breakdown"(args){ 
						var costs = "",
								CL = args.self["yearly costs list"]  
						for(var index in CL){ 
							costs += `${CL[index].cost}: $${CL[index].amount}${parseInt(index) !== CL.length-1 ? "," : ""} ` 
						}
						return costs
					},
					"share holders list": [
						"thomas","susan","robert","peter"
					],
					"share holders"(args){
						var costs = "",
								SHL = args.self["share holders list"]  
						for(var index in SHL){ 
							costs += `${SHL[index]}${parseInt(index) !== SHL.length-1 ? "," : ""} ` 
						}
						return costs
					},
					"total share holders"(args){
						if(args.self["meta"] && !args.self.meta.initd && args.self["meta"]["init"]){
							args.self["meta"]["init"](args)
						}
						return args.self["share holders list"].length
					},
					"meta": {
						init(args){
							args.self.meta.initd = true
							args.formatted = false
							// total income for shareholders
							let thing = args.self["total share holders"](args)
							for(var index in new Array(thing).fill(0)){
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" weekly income", 
									function(args){ 
										let val = (args.self["yearly income"](args) / 52 / args.self["total share holders"](args))
										return val
									} 
								)
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" monthly income", 
									function(args){ 
										let val = (args.self["yearly income"](args) / 12 / args.self["total share holders"](args))
										return val
									} 
								)
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" yearly income", 
									function(args){ 
										let val = (args.self["yearly income"](args) / 1 / args.self["total share holders"](args))
										return val
									} 
								)
							}
							// total costs for shareholders
							let thing2 = args.self["total share holders"](args)
							for(var index in new Array(thing2).fill(0)){
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" weekly costs", 
									function(args){ 
										let val = (args.self["yearly costs"](args) / 52 / args.self["total share holders"](args))
										return val
									} 
								)
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" monthly costs", 
									function(args){ 
										let val = (args.self["yearly costs"](args) / 12 / args.self["total share holders"](args))
										return val
									} 
								)
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" yearly costs", 
									function(args){ 
										let val = (args.self["yearly costs"](args) / 1 / args.self["total share holders"](args))
										return val
									} 
								)
							}
							// total profit for shareholders
							let thing3 = args.self["total share holders"](args)
							for(var index in new Array(thing3).fill(0)){
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" weekly profit", 
									function(args){ 
										let val = args.self[args.self["share holders list"][index]+" weekly income"](args) - args.self[args.self["share holders list"][index]+" weekly costs"](args)
										return val
									} 
								)
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" monthly profit", 
									function(args){ 
										let val = args.self[args.self["share holders list"][index]+" monthly income"](args) - args.self[args.self["share holders list"][index]+" monthly costs"](args)
										return val
									} 
								)
								args.that.$set(
									args.self, 
									args.self["share holders list"][index]+" yearly profit", 
									function(args){ 
										let val = args.self[args.self["share holders list"][index]+" yearly income"](args) - args.self[args.self["share holders list"][index]+" yearly costs"](args)
										return val
									} 
								)
							}
						},
						initd: false
					}, 
				},
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