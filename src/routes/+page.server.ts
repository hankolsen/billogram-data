import { env } from '$env/dynamic/private';
import type { PageServerLoad } from './$types';

const { BILLOGRAM_API_URL, BILLOGRAM_USER, BILLOGRAM_PASSWORD } = env;

const authorization = Buffer.from(BILLOGRAM_USER + ':' + BILLOGRAM_PASSWORD).toString('base64');
export const load = (async ({ fetch }) => {
	const response = await fetch(`${BILLOGRAM_API_URL}/billogram?page=1&page_size=100`, {
		headers: { Authorization: `Basic ${authorization}` }
	});
	if (response.ok) {
		const { data } = await response.json();

		return {
			data
		};
	} else {
		console.log({ response });
	}
}) satisfies PageServerLoad;
