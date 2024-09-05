const { expect } = require("@playwright/test");
// Constants which are often used in tests

// Login to TEST env PMP
const username = "automater.test@memos.cz";
const password = "memos";
const mainDomain = "Test Automation Domain";
const baseURL = "https://test.einhellpmp.com";
const loggedOUTpageTitle = "Log in to PMP DEV"

// Timeouts
const timeOuts = {
  timeS: 500,
  timeM: 1000,
  timeL: 2000,
  timeXL: 3000,
  timeXXL: 4000,
};

//Requests data
const statusCode200 = 200;
const statusCode201 = 201;
//Login
const loginRequest =
  "https://pm-tool-2-api-test.azurewebsites.net/api/v1/Domain";
// DGL
const dglRequest =
  "https://pm-tool-2-api-test.azurewebsites.net/api/v1/ContentBrickDefinition";

// PBB
const pbbRequest =
  "https://pm-tool-2-api-test.azurewebsites.net/api/v1/ProcessBuildingBlocks/17";

// CB
const cbRequest =
  "https://pm-tool-2-api-test.azurewebsites.net/api/v1/ContentBrickDefinition";

// SubCB
const subcbRequest =
  "https://pm-tool-2-api-test.azurewebsites.net/api/v1/SubContentBrickDefinition";

// DDM
const ddmRequest =
  "https://pm-tool-2-api-test.azurewebsites.net/api/v1/DomainDataModel?createForSure=false";

//Constants for test AccountEdit

const domain = 14;
const role = 0;
const account = "testaaFisrt";

//Creation of ContentBrick
const cbName = "Automated created Content Brick";
const cbText =
  "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,";
const contentBrickGroupName1 = "Group automatization name";
const contentBrickFieldName1 = "Field automatization name";
const contentBrickFieldName2 = "Another field automatization name";
const dropdownElement1 = "Text Box";
const dropdownElement2 = "Text Area";
const tabName = "Scripts";
const scriptExample = "var number = 5";
const labelName = "Name"

//Creation of DDM
const ddmName = "Automated created Domain Model";
const containerName = "Automatization Container";
const treeValueText = "Container"

//Creation of DGL
const dglName = "Automated created DGL";
const valueName1 = "Value field 11 automatization";
const valueName2 = "Automatization value field DGL";
const dglGroupName = "DGL Group name";
const fieldName1 = "Field name automatization";


//Creation of SubContentBrick
const scbName = "Automated created SubCB";
const scbText =
  "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,";
const subcontentBrickFieldName1 = "Field SCB automatization name";
const subcontentBrickFieldName2 = "Another SCB field automatization name";
const subCBdropdownElement1 = "Integer";
const subCBdropdownElement2 = "Decimal";

//Creation of PBB in start type
const pbbName = "Automated created PBB Start type";
const testingDDMItem = "Testing DDM";

//Creation of PBB in normal type
const pbbNameNormal = "Automated created PBB Normal type";

// Project
const projectName = "Auto test Project";

//Validation of request
async function requestAssert(page, requestURL, statusCode) {
  const response = await page.waitForResponse(
    (response) => response.url() === requestURL
  );

  if (response.status() !== statusCode) {
    throw new Error(`Expected status ${statusCode} but got ${response.status()}`);
  }
}

module.exports = {
  username,
  password,
  mainDomain,
  baseURL,
  fieldName1,
  loggedOUTpageTitle,
  timeOuts,
  statusCode200,
  statusCode201,
  loginRequest,
  dglRequest,
  pbbRequest,
  cbRequest,
  subcbRequest,
  ddmRequest,
  domain,
  role,
  account,
  cbName,
  cbText,
  contentBrickGroupName1,
  contentBrickFieldName1,
  contentBrickFieldName2,
  labelName,
  tabName,
  scriptExample,
  dropdownElement1,
  dropdownElement2,
  ddmName,
  treeValueText,
  containerName,
  dglName,
  valueName1,
  valueName2,
  dglGroupName,
  scbName,
  scbText,
  subcontentBrickFieldName1,
  subcontentBrickFieldName2,
  subCBdropdownElement1,
  subCBdropdownElement2,
  pbbName,
  testingDDMItem,
  pbbNameNormal,
  projectName,
  requestAssert,
};
