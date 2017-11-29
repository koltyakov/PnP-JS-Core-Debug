import { Web, setup } from './../../PnP-JS-Core/src/pnp';
import { PnpNode } from 'sp-pnp-node';

setup({
  sp: {
    headers: {
      Accept: 'application/json;odata=nometadata'
    }
  }
});

(new PnpNode()).initAmbient().then(async settings => {

  let web = new Web(settings.siteUrl);

  let regionalSettings = web.regionalSettings;

  // Get regional setting
  console.log(`\n=== RegionalSettings ===`);
  await regionalSettings.select('LocaleId,ShowWeeks').get().then(console.log);

  // Get time zone
  console.log(`\n=== TimeZone ===`);
  await regionalSettings.timeZone.get().then(console.log);

  // Get time zones
  console.log(`\n=== TimeZones (top 1) ===`);
  await regionalSettings.timeZones.top(1).get().then(console.log);

  // Get installed languages
  console.log(`\n=== InstalledLanguages (top 1) ===`);
  await regionalSettings.installedLanguages.get().then(langs => {
    console.log(langs.Items[0]);
  });

}).catch(console.log);
