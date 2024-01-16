import { env } from '$env/dynamic/private';
import fs from 'node:fs';
import type { PageServerLoad } from './$types';

const { BILLOGRAM_API_URL, BILLOGRAM_USER, BILLOGRAM_PASSWORD } = env;

const authorization = Buffer.from(BILLOGRAM_USER + ':' + BILLOGRAM_PASSWORD).toString('base64');
export const load = (async ({ fetch }) => {
	const response = await fetch(`${BILLOGRAM_API_URL}/billogram?page=1&page_size=100`, {
		headers: { Authorization: `Basic ${authorization}` }
	});
	if (response.ok) {
		const { data } = await response.json();

		for (const invoice of data) {
			const response = await fetch(`${BILLOGRAM_API_URL}/billogram/${invoice.id}.pdf`, {
				headers: { Authorization: `Basic ${authorization}` }
			});
			const { data } = await response.json();
			const bitmap = Buffer.from(data.content, 'base64');
			fs.writeFileSync(`output/${invoice.ocr_number}.pdf`, bitmap);
		}

		return {
			result: 'success'
		};
	} else {
		console.log({ response });
	}
}) satisfies PageServerLoad;
