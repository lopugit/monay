<template>
	<q-layout>
		<q-page-container>
			<q-page class="flex flex-center">
				<div class="main-table-container">
					<table class="main-table">
						<tr v-if="!titleAll">
							<template v-for="(columnValue, rowKey, rowIndex) in table[0]">
								<th v-if="typeof rowKey !== 'undefined' && typeof columnValue !== 'object' && !(columnValue instanceof Array)"> {{ rowKey }} </th>
							</template>
						</tr>
						<template v-for="(row, key, index) in tableMutable">
							<tr v-if="titleAll">
								<template v-for="(columnValue, rowKey, rowIndex) in row">
									<th v-if="typeof rowKey !== 'undefined' && typeof columnValue !== 'object' && !(columnValue instanceof Array)"> {{ rowKey }} </th>
								</template>
							</tr>
							<tr>
								<template v-for="(columnValue, rowKey, rowIndex) in row">
									<td
										:style="{...columnValue.style}"
										:key="rowKey"
										v-if="typeof rowKey !== 'undefined' && typeof columnValue !== 'object' && !(columnValue instanceof Array)"
										v-html="
											typeof columnValue !== 'undefined' && typeof columnValue == 'function' 
												? 
													typeof inject({fun: columnValue, self: row, tableMutable}) == 'string' 
														? 
															inject({fun: columnValue, self: row, tableMutable}) 
														: 
															typeof inject({fun: columnValue, self: row, tableMutable}) == 'number' 
																? 
																	Math.floor(inject({fun: columnValue, self: row, tableMutable}))
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
										<!-- {{ typeof columnValue == 'function' ? typeof inject({fun: columnValue, self: row, tableMutable}) : '' }} -->
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
			tableMutable: this.table,
		}
	},
	props: {
		table: {},
		titleAll: {}
	},
	methods: {
		inject(args){
			args.that = this
			return args.fun(args)
		}
	}
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