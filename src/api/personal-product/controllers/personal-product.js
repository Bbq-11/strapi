'use strict';

/**
 * personal-product controller
 */

const { factories, createCoreController } = require('@strapi/strapi');

// module.exports = createCoreController('api::personal-product.personal-product');

module.exports =  factories.createCoreController(
  "api::personal-product.personal-product",
  ({ strapi }) => ({
    async findOne(ctx) {
      const { id } = ctx.params;
      const entity = await strapi.db
        .query("api::personal-product.personal-product")
        .findOne({ where: { privateID: id } });
      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
      return this.transformResponse(sanitizedEntity);
    },
    async delete(ctx) {
      const { id } = ctx.params;
      return await strapi.db
        .query("api::personal-product.personal-product")
        .delete({ where: { privateID: id } });
    },
    async update(ctx) {
      const { id } = ctx.params;
      const { data } = ctx.request.body
      const entity = await strapi.db
        .query("api::personal-product.personal-product")
        .findOne({ where: { privateID: id } });
      if (!entity) return {name: `Не удалось найти запись с UID ${id}`}
      const sanitizedEntity = await this.sanitizeInput(data, entity);
      const updatedEntity = await strapi.db
        .query("api::personal-product.personal-product")
        .update({ data: sanitizedEntity, where: { privateID: id } });
      const sanitizedUpdatedEntity = await this.sanitizeOutput(updatedEntity, ctx);
      return this.transformResponse(sanitizedUpdatedEntity);
    },
  })
);
