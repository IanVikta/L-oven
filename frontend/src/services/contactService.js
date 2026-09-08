import api from './api';

/**
 * Submit contact form details to the backend API.
 *
 * @param {Object} contactData
 * @param {string} contactData.name
 * @param {string} contactData.email
 * @param {string} [contactData.phone]
 * @param {string} contactData.subject
 * @param {string} [contactData.category]
 * @param {string} contactData.message
 * @returns {Promise<Object>}
 */
export const sendContactMessage = async (contactData) => {
  const response = await api.post('/v1/contact', contactData);
  return response.data;
};
