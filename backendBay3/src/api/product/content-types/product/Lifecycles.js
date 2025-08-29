module.exports = async () => {
    const products = await strapi.entityService.findMany('api::product.product', {
        filters: { slug: { $null: true } },
        populate: ['title'],
    });

    for (const product of products) {
        if (!product.title) continue;

        const generatedSlug = product.title
            .toLowerCase()
            .replace(/\s+/g, '-')        // يحول المسافات إلى -
            .replace(/[^a-z0-9\-]/g, '') // يشيل الرموز الخاصة
            .replace(/^-+|-+$/g, '');    // يشيل - من البداية والنهاية

        await strapi.entityService.update('api::product.product', product.id, {
            data: { slug: generatedSlug },
        });
    }
};
