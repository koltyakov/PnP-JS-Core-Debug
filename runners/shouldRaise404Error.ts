import { Web } from './../../PnP-JS-Core/src/pnp';
import { initEnvironment as init } from './../utils/pnpnode';
import './../utils/setup';

init().then(async settings => {

  let web = new Web(settings.siteUrl);
  let willFailHere = await web.lists.getByTitle('There is no such a list name for sure').get();

}).catch(err => {
  console.log(err.data.responseBody.error.message.value);
});
