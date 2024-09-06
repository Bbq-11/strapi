'use strict';

/**
 * personal-product service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::personal-product.personal-product');
