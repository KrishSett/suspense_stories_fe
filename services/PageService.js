import { BaseService } from './BaseService';

export class PageService extends BaseService {
	constructor() {
	super();
	this.pageEndpoint = 'page/';
	}

	/**
	 * Get page by slug
	 * @param {string} slug - Page slug (e.g., 'about-us', 'terms-conditions')
	 * @returns {Promise}
	 */
	async getPageBySlug(slug) {
	try {
		const response = await this.get(`${this.pageEndpoint}${slug}`);
		
		if (response.success && response.data?.page) {
		return {
			...response,
			sanitizedContent: this.sanitizeHTML(response.data.page)
		};
		}
		
		return response;
	} catch (error) {
		throw error;
	}
	}

	/**
	 * Basic HTML sanitization
	 * @param {string} html - HTML content
	 * @returns {string} - Sanitized HTML
	 */
	sanitizeHTML(html) {
		if (!html) {
			return '';
		}

		// Basic sanitization - remove script tags and event handlers
		let sanitized = html
			.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
			.replace(/on\w+="[^"]*"/g, '')
			.replace(/on\w+='[^']*'/g, '')
			.replace(/\\n/g, '\n')
			.replace(/\\"/g, '"')
			.replace(/\\'/g, "'")
			.replace(/\\\\/g, '\\');

		return sanitized;
	}
}

// Export singleton instance
export const pageService = new PageService();