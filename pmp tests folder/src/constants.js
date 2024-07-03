const { expect} = require("@playwright/test");
// Constants which are often used in tests

// Login to TEST env PMP
const username = "automater.test@memos.cz";
const password = "memos";
const mainDomain = "Test Automation Domain";

const username2 = "jaroslav.vomacka@memos.cz"
const password2 = "memos24"
const baseURL = "https://test.einhellpmp.com";
const loggedOUTpageTitle = "Log in to PMP DEV";



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
const loginRequest = "https://pm-tool-2-api-test.azurewebsites.net/api/v1/Domain";
// DGL
const dglRequest =  "https://pm-tool-2-api-test.azurewebsites.net/api/v1/ContentBrickDefinition"


// PBB 
const pbbRequest = "https://pm-tool-2-api-test.azurewebsites.net/api/v1/ProcessBuildingBlocks/17"

// CB
const cbRequest = "https://pm-tool-2-api-test.azurewebsites.net/api/v1/ContentBrickDefinition"



// SubCB
const subcbRequest = "https://pm-tool-2-api-test.azurewebsites.net/api/v1/SubContentBrickDefinition"


// DDM
const ddmRequest = "https://pm-tool-2-api-test.azurewebsites.net/api/v1/DomainDataModel?createForSure=false"


//Constants for test AccountEdit

const domain = 14;
const role = 0;
const account = "testaaFisrt";

//Languages
const english = "English";
const czech = "Czech";
const chinese = "Chinese";

//Creation of ContentBrick
const cbName = "Automated created Content Brick";
const cbText =
  "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,";
const contentBrickFieldName1 = "Field automatization name";
const contentBrickFieldName2 = "Another field automatization name";
const dropdownElement1 = "Text Box";
const dropdownElement2 = "Text Area";

//Creation of DDM
const ddmNAme = "Automated created Domain Model";
const containerName = "Automatization Container";

//Creation of DGL
const dglName = "Automated created DGL";
const valueName1 = "Value field 11 automatization";
const valueName2 = "Automatization value field DGL";

//Creation of SubContentBrick
const scbName = "Automated created SubCB";
const scbText =
  "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,";
const subcontentBrickFieldName1 = "Field SCB automatization name";
const subcontentBrickFieldName2 = "Another SCB field automatization name";
const subCBdropdownElement1 = "Integer";
const subCBdropdownElement2 = "Decimal";

//Creation of PBB in start type
const pbbName = "Automated created PBB type Start";

//Creation of PBB in normal type
const pbbNameNormal = "Automated created PBB type Normal";


async function requestAssert(page,requestURL,statusCode){

  const response = await page.waitForResponse(
    (response) =>
      response.url() ===
      requestURL
  );

  expect(response.status()).toBe(statusCode);
  
  if (response.status() === statusCode) {
    console.log("Request was successfull");
    
  } else {
    console.error("Unsuccessfull", response.status());
  }

};

async function requestJSONAssert(page, requestURLPattern, statusCode, expectedJson) {
  try {
    const response = await page.waitForResponse(
      response => new RegExp(requestURLPattern).test(response.url()),
      { timeout: 10000 } // Nastav timeout, aby bylo jasné, pokud čekání trvá příliš dlouho
    );

    console.log(`Received response for URL matching pattern: ${requestURLPattern}`);
    expect(response.status()).toBe(statusCode);
    
    if (response.status() === statusCode) {
      console.log("Request was successful");
      
      if (expectedJson) {
        const responseBody = await response.json();
        expect(responseBody).toEqual(expectedJson);
        console.log("JSON response matches expected");
      }

    } else {
      console.error("Unsuccessful", response.status());
    }
  } catch (error) {
    console.error(`Error while waiting for response: ${error}`);
  }
}




// MenuButtons in Overviews page
const overviewMenuButtons = {
  taskMenuButton: "Tasks",
  activeProjectsMenuButton: "Active Projects",
  draftProjectsMenuButton: "Draft Projects",
  domainModelInstancesMenuButton: "DMI",
  reportsMenuButton: "Reports",

  //Definitions parts
  definitionsContentBricksMenuButton: "Content Bricks",
  definitionsSubContentBricksMenuButton: "Sub Content Bricks",
  definitionsDomainDataModelsMenuButton: "Domain Models",
  definitionsDGLMenuButton: "Design Guidelines",
  definitionsPBBsMenuButton: "PBBs",
  definitionsPBBsQueriesMenuButton: "PBB Queries",
  definitionsGDMMenuButton: "General Models",

  //Administrations parts
  administrationCapabilitiesMenuButton: "Capabilities",
  administrationDomainsMenuButton: "Domains",
  administrationFormattingMenuButton: "Formatting",
  administrationListsMenuButton: "Lists",
  administrationQualificationsMenuButton: "Qualifications",
  administrationTagsAndSearchIdsMenuButton: "Tags and search identifiers",
  administrationTranslationsMenuButton: "Translations",
  administrationUnitTypesMenuButton: "Unit types",
  administrationUnitsMenuButton: "Units",
  administrationUsageTypesMenuButton: "Usage types",

  //User Administration parts
  userAdministrationGroupsMenuButton: "Groups",
  userAdministrationOrganigramMenuButton: "Organigram",
  userAdministrationRolesMenuButton: "Roles",
  userAdministrationUsersMenuButton: "Users",
};

// Headers in Overviews page
const overviewHeaders = {
  taskHeader: "Tasks",
  activeProjectsHeader: "Active project overview",
  draftProjectsHeader: "Draft project overview",
  domainModelInstancesHeader: "Domain data model instances",
  reportsHeader: "Reports",

  //Definitions parts
  definitionsContentBricksHeader: "Content bricks",
  definitionsSubContentBricksHeader: "Sub content bricks",
  definitionsDomainDataModelsHeader: "Domain data models",
  definitionsDGLHeader: "Design guidelines",
  definitionsPBBsHeader: "PBB Overview",
  definitionsPBBsQueriesHeader: "PBB queries overview",
  definitionsGDMHeader: "General data models",

  //Administrations parts
  administrationCapabilitiesHeader: "Capabilities",
  administrationDomainsHeader: "Domains",
  administrationFormattingHeader: "Formatting",
  administrationListsHeader: "Lists",
  administrationQualificationsHeader: "Qualifications",
  administrationTagsAndSearchIdsHeader: "Tags and search identifiers",
  administrationTranslationsHeader: "Languages",
  administrationUnitTypesHeader: "Unit types",
  administrationUnitsHeader: "Units",
  administrationUsageTypesHeader: "Usage types",

  //User Administration parts
  userAdministrationGroupsHeader: "Groups",
  userAdministrationOrganigramHeader: "Organigram",
  userAdministrationRolesHeader: "Roles",
  userAdministrationUsersHeader: "Users",
};

// Parts of Urls
const pageUrls = {
  taskOverview: `${baseURL}/tasks/overview`,
  activeProjectsOverview: `${baseURL}/project/overview`,
  draftProjectsOverview: `${baseURL}/project/draft-overview`,
  domainModelInstancesOverview: `${baseURL}/domainDataModelInstances/overview`,
  reportsOverview: `${baseURL}/report/overview/grid`,

  //Definitions parts
  definitionsContentBricks: `${baseURL}/contentBricks/overview`,
  definitionsSubContentBricks: `${baseURL}/subContentBricks/overview`,
  definitionsDomainDataModels: `${baseURL}/domainDataModels/overview`,
  definitionsDGL: `${baseURL}/designGuidelines/overview`,
  definitionsPBBs: `${baseURL}/pbb/overview`,
  definitionsPBBsQueries: `${baseURL}/pbb/queries/overview`,
  definitionsGDM: `${baseURL}/generalDataModels/overview`,

  //Administrations parts
  administrationCapabilities: `${baseURL}/capabilities/overview`,
  administrationDomains: `${baseURL}/Domains`,
  administrationFormatting: `${baseURL}/regularExpressions/overview`,
  administrationLists: `${baseURL}/List/overview`,
  administrationQualifications: `${baseURL}/qualifications/overview`,
  administrationTagsAndSearchIds: `${baseURL}/tag/overview`,
  administrationTranslations: `${baseURL}/translations/overview`,
  administrationUnitTypes: `${baseURL}/unitTypes/overview`,
  administrationUnits: `${baseURL}/units/overview`,
  administrationUsageTypes: `${baseURL}/usageTypes/overview`,

  //User Administration parts
  userAdministrationGroups: `${baseURL}/user/Groups`,
  userAdministrationOrganigram: `${baseURL}/user/orgChart`,
  userAdministrationRoles: `${baseURL}/user/roles`,
  userAdministrationUsers: `${baseURL}/user/overview`,
};

module.exports = {
  username,
  password,
  username2,
  password2,
  baseURL,
  domain,
  role,
  account,
  english,
  czech,
  chinese,
  pageUrls,
  overviewHeaders,
  loggedOUTpageTitle,
  overviewMenuButtons,
  cbName,
  cbText,
  contentBrickFieldName1,
  contentBrickFieldName2,
  dropdownElement1,
  dropdownElement2,
  ddmNAme,
  containerName,
  dglName,
  valueName1,
  valueName2,
  scbName,
  scbText,
  subcontentBrickFieldName1,
  subcontentBrickFieldName2,
  subCBdropdownElement1,
  subCBdropdownElement2,
  pbbName,
  pbbNameNormal,
  timeOuts,
  mainDomain,
  requestAssert,
  loginRequest,
  statusCode200,
  statusCode201,
  cbRequest,
  dglRequest,
  ddmRequest,
  subcbRequest,
  pbbRequest,
  requestJSONAssert,
  
};
