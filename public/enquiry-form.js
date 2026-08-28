/**
 * Mailto enquiry helper. No network calls, no API keys.
 * Looks for form[data-enquiry="mailto"] and opens the visitor's email client.
 *
 * Native HTML5 validation remains enabled on the form (no novalidate). This
 * script prevents default submission and uses checkValidity()/reportValidity()
 * before building the mailto URL. If JavaScript is unavailable, visitors can
 * use the direct email and phone links rendered in the form component.
 */
(function () {
	function bindEnquiryForm(form) {
		if (!(form instanceof HTMLFormElement) || form.getAttribute('data-bound') === 'true') return;
		form.setAttribute('data-bound', 'true');

		const practiceEmail = form.getAttribute('data-practice-email') || '';
		const status = document.getElementById(`${form.id}-status`);

		form.addEventListener('submit', function (event) {
			event.preventDefault();
			if (status) status.textContent = '';

			const formData = new FormData(form);
			if (String(formData.get('company') || '').trim()) {
				if (status) {
					status.textContent =
						'Unable to send this enquiry. Please contact the practice by phone or WhatsApp.';
				}
				return;
			}

			if (!form.checkValidity()) {
				form.reportValidity();
				if (status) status.textContent = 'Please complete the required fields before continuing.';
				return;
			}

			const fullName = String(formData.get('full-name') || '').trim();
			const phone = String(formData.get('phone') || '').trim();
			const emailVal = String(formData.get('email') || '').trim();
			const city = String(formData.get('city') || '').trim();
			const service = String(formData.get('service') || '').trim();
			const caseDetails = String(formData.get('case-details') || '').trim();

			const subject = `Consultation Inquiry: ${service} - ${fullName}`;
			const body =
				`New Consultation Inquiry:\n\n` +
				`- Full Name: ${fullName}\n` +
				`- Phone Number (WhatsApp): ${phone}\n` +
				`- Email: ${emailVal}\n` +
				`- City: ${city}\n` +
				`- Service Required: ${service}\n\n` +
				`Brief Case Details:\n` +
				`${caseDetails}\n\n` +
				`(Sent via the website enquiry form. This message does not create an advocate-client relationship.)`;

			if (status) {
				status.textContent =
					'Opening your email application… If nothing opens, email the practice directly or use WhatsApp.';
			}

			window.location.href = `mailto:${practiceEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
		});
	}

	function init() {
		document.querySelectorAll('form[data-enquiry="mailto"]').forEach(bindEnquiryForm);
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
})();
