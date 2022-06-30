/** @type {import('next-sitemap').IConfig} */
const config = {
    siteUrl: process.env.SITE_URL || 'https://kdenatankuju.cz',
    generateRobotsTxt: true, // (optional)
    // ...other options
    exclude: ["/admin/**", "/api/**", "/static/**", "/_next/**", "/_error/**"],
}

module.exports = config