module.exports = (plugin) => {
    const originalCallback = plugin.controllers.auth.callback;

    plugin.controllers.auth.callback = async (ctx) => {
        await originalCallback(ctx);

        if (ctx.response.status === 200 && ctx.response.body.jwt) {
            const { jwt } = ctx.response.body;

            ctx.cookies.set("token", jwt, {
                httpOnly: true, // مش متاح من JS
                secure: process.env.NODE_ENV === "production", // https بس في البرودكشن
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000, // أسبوع
            });

            // اختياري: شيل jwt من الـ body لو مش عايز يبان
            delete ctx.response.body.jwt;
        }
    };

    return plugin;
};
