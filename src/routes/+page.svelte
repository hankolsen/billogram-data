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
	<th>Invoice date</th>
	<th>Due date</th>
	<th>OCR</th>
	<th>Total sum</th>
	<th>Customer</th>
	</thead>
{#each data.data as invoice}
	<tr>
		<td>{invoice.invoice_date}</td>
		<td>{invoice.due_date}</td>
		<td>{invoice.ocr_number}</td>
		<td>{formatter.format(invoice.total_sum)}</td>
		<td>{invoice.customer.name}</td>
	</tr>
{/each}
</table>
