<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;

	const formatter = new Intl.NumberFormat('se', {
		style: 'currency',
		currency: 'SEK',
		currencyDisplay: 'code',
		maximumFractionDigits: 2,
	})
</script>

<table>
	<thead>
	<th>Customer</th>
	<th>Org nr</th>
	<th>Contact Name</th>
	<th>Contact Email</th>
	<th>Contact Phone</th>
	</thead>
{#each data.data as customer}
	<tr>
		<td>{customer.name}<br>{customer.address.street_address}<br>{customer.address.zipcode} {customer.address.city}</td>
		<td>{customer.org_no}</td>
		<td>{customer.contact.name === null ? '' : customer.contact.name}</td>
		<td>{customer.contact.email}</td>
		<td>{customer.contact.phone}</td>
	</tr>
{/each}
</table>
