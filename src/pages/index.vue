<template>
	<q-layout>
		<q-page-container>
			<q-page class="flex flex-center">
				<tabel :table="tables.rentals"></tabel>
				<tabel :table="tables.loans" :titleAll="true"></tabel>
			</q-page>
		</q-page-container>
	</q-layout>
</template>

<script>
import tabel from './tabel.vue'
export default {
	data(){
		return {
			tables: {
				"rentals": [
					{
						address: 4,
						"unit number": 1,
						rooms: 1,
						bathrooms: 1,
						"rental start date"(args){
							let date = new Date(2018, 0, 1)
							return ( date.getDate() + 
									"/" +  ( date.getMonth() + 1 ) +
									"/" +  date.getFullYear() )
						},
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
						"rental start date"(args){
							let date = new Date(2018, 0, 1)
							return ( date.getDate() + 
									"/" +  ( date.getMonth() + 1 ) +
									"/" +  date.getFullYear() )
						},
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
						"rental start date"(args){
							let date = new Date(2018, 0, 1)
							return ( date.getDate() + 
									"/" +  ( date.getMonth() + 1 ) +
									"/" +  date.getFullYear() )
						},
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
						"rental start date"(args){
							let date = new Date(2018, 0, 1)
							return ( date.getDate() + 
									"/" +  ( date.getMonth() + 1 ) +
									"/" +  date.getFullYear() )
						},
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
						"rental start date"(args){
							let date = new Date(2018, 0, 1)
							return ( date.getDate() + 
									"/" +  ( date.getMonth() + 1 ) +
									"/" +  date.getFullYear() )
						},
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
						"rental start date"(args){
							let date = new Date(2018, 0, 1)
							return ( date.getDate() + 
									"/" +  ( date.getMonth() + 1 ) +
									"/" +  date.getFullYear() )
						},
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
						"rental start date"(args){
							let date = new Date(2018, 0, 1)
							return ( date.getDate() + 
									"/" +  ( date.getMonth() + 1 ) +
									"/" +  date.getFullYear() )
						},
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
						"rental start date"(args){
							let date = new Date(2018, 0, 1)
							return ( date.getDate() + 
									"/" +  ( date.getMonth() + 1 ) +
									"/" +  date.getFullYear() )
						},
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
						"rental start date"(args){
							let date = new Date(2018, 0, 1)
							return ( date.getDate() + 
									"/" +  ( date.getMonth() + 1 ) +
									"/" +  date.getFullYear() )
						},
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
						"rental start date"(args){
							let date = new Date(2018, 0, 1)
							return ( date.getDate() + 
									"/" +  ( date.getMonth() + 1 ) +
									"/" +  date.getFullYear() )
						},
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
						"rental start date"(args){
							let date = new Date(2018, 0, 1)
							return ( date.getDate() + 
									"/" +  ( date.getMonth() + 1 ) +
									"/" +  date.getFullYear() )
						},
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
						"rental start date"(args){
							let date = new Date(2018, 0, 1)
							return ( date.getDate() + 
									"/" +  ( date.getMonth() + 1 ) +
									"/" +  date.getFullYear() )
						},
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
						"rental start date"(args){
							let date = new Date(2018, 0, 1)
							return ( date.getDate() + 
									"/" +  ( date.getMonth() + 1 ) +
									"/" +  date.getFullYear() )
						},
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
						"rental start date"(args){
							let date = new Date(2018, 0, 1)
							return ( date.getDate() + 
									"/" +  ( date.getMonth() + 1 ) +
									"/" +  date.getFullYear() )
						},
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
						"rental start date"(args){
							let date = new Date(2018, 0, 1)
							return ( date.getDate() + 
									"/" +  ( date.getMonth() + 1 ) +
									"/" +  date.getFullYear() )
						},
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
						"rental start date"(args){
							let date = new Date(2018, 0, 1)
							return ( date.getDate() + 
									"/" +  ( date.getMonth() + 1 ) +
									"/" +  date.getFullYear() )
						},
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
						"rental start date"(args){
							let date = new Date(2018, 0, 1)
							return ( date.getDate() + 
									"/" +  ( date.getMonth() + 1 ) +
									"/" +  date.getFullYear() )
						},
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
				"loans": [
					{
						loan: "b",
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
							return args.self.meta["start date"].toDDMMYYYY()
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
									payment date: ${dateOfPayment.toDDMMYYYY()},
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
								Date.prototype.toDDMMYYYY = function(){
									return  + this.getDate()
									"/" +  (this.getMonth() + 1) +
									"/" +  this.getFullYear() 
								}
							}
						}
					},
					{
						loan: "b",
						amount: 500000,
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
							let date = new Date(2019, 4, 9, 9)
							args.that.$set(args.self.meta, "start date", date)
							if(args.self && args.self.meta && args.self.meta.init && !(args.self.meta.initd) && typeof args.self.meta.init == 'function'){ 
								args.self.meta.init(args)
							}
							return args.self.meta["start date"].toDDMMYYYY()
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
									payment date: ${dateOfPayment.toDDMMYYYY()},
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
								Date.prototype.toDDMMYYYY = function(){
									return  + this.getDate()
									"/" +  (this.getMonth() + 1) +
									"/" +  this.getFullYear() 
								}
							}
						}
					},
				],
				"timeline": [
				]
			},
		}
	},
	created(){
		for(var loanI in this.tables.loans){
			let loan = this.tables.loans[loanI]
			// for(var loan in loan)
		}
		// Date.prototype.toDDMMYYYY = function(){
		// 	return (date.getMonth() + 1) + 
		// 	"/" +  date.getDate() +
		// 	"/" +  date.getFullYear() )
		// }
	},
	components: {
		tabel
	},
  name: 'PageIndex'
}
</script>
<style lang="sass">
</style>