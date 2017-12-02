import { Web } from './../../PnP-JS-Core/src/pnp';
import { initEnvironment as init } from './../utils/pnpnode';
import './../utils/setup';

init({
  config: {
    forcePrompts: true
  }
})
  .then(async settings => {

    console.log(`\nConnection config is save to ${settings.config.configPath}`);

    let web = new Web(settings.siteUrl);
    let { Title } = await web.select('Title').get();

    if (Title) {
      console.log('\nTest connection to SharePoint was established successfully');
    }

  })
  .catch(console.log);
