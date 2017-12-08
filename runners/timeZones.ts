import { Web } from './../../PnP-JS-Core/src/pnp';
import { initEnvironment as init } from './../utils/pnpnode';
import './../utils/setup';

init().then(async settings => {

  let web = new Web(settings.siteUrl);

  let regionalSettings = web.regionalSettings;

  console.log(`\n=== TimeZone ===`);
  let timeZone = await regionalSettings.timeZones.getById(15).get();
  // console.log(timeZone);

  let date = '2017-12-08T13:20:00';

  let { localTime } = await regionalSettings.timeZone.utcToLocalTime(date);
  console.log(localTime);

  let { utcTime } = await regionalSettings.timeZones.getById(15).localTimeToUTC(new Date());
  console.log(utcTime);

}).catch(console.log);
