export const site = {
	url: 'https://nexus-alpha-ten-66.vercel.app',
	name: 'Jahanzaib Legal Services',
	tagline: 'Legal Practitioner & Corporate Consultant',
	phone: '03343108863',
	email: 'shahsyedjahanzaib828@gmail.com',
	city: 'Karachi',
	region: 'Sindh',
	country: 'Pakistan'
} as const;

export const serviceCities = [
	'Karachi',
	'Hyderabad',
	'Sukkur',
	'Lahore',
	'Islamabad',
	'Rawalpindi',
	'Faisalabad',
	'Multan',
	'Gujranwala',
	'Sialkot',
	'Bahawalpur',
	'Peshawar',
	'Quetta',
	'Abbottabad',
	'Muzaffarabad',
	'Gilgit'
] as const;

export const phoneHref = `tel:+92${site.phone.slice(1)}`;
export const whatsappHref = `https://wa.me/92${site.phone.slice(1)}`;
export const mailHref = `mailto:${site.email}`;
