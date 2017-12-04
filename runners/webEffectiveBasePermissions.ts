import { Web } from './../../PnP-JS-Core/src/pnp';
import { initEnvironment as init } from './../utils/pnpnode';
import './../utils/setup';

init().then(async settings => {

  let web = new Web(settings.siteUrl);
  let effectiveBasePermissions = await web.effectiveBasePermissions.get();

  console.log(effectiveBasePermissions);

}).catch(console.log);
