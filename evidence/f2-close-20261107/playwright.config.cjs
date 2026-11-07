const path=require('node:path');
process.env.PLAYWRIGHT_BROWSERS_PATH=path.join(__dirname,'browser-cache');
const {defineConfig}=require('../onb038-web/node_modules/@playwright/test');
module.exports=defineConfig({testDir:'./e2e',timeout:45000,expect:{timeout:8000},retries:0,workers:1,reporter:[['line'],['json',{outputFile:'results.json'}]],outputDir:'test-results',use:{baseURL:'https://www.trifaros.com.br',browserName:'chromium',headless:true,serviceWorkers:'block',trace:'retain-on-failure'},projects:[{name:'desktop-1440',use:{viewport:{width:1440,height:900}}},{name:'desktop-1920',use:{viewport:{width:1920,height:1080}}},{name:'mobile-390',use:{viewport:{width:390,height:844}}},{name:'mobile-360',use:{viewport:{width:360,height:800}}}]});
