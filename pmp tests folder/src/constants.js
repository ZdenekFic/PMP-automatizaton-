// Constants which are often used in tests 

// Login to TEST env PMP
const username = "testaa@memos.cz";
const password = "sunandmoon";
const username2 = "zdenek.fic@memos.cz"
const password2 = "memos"
const baseURL = "https://test.einhellpmp.com";
const loggedOUTpageTitle = "Log in to PMP DEV"

// Login to STAG env PMP
//const username = "synchronization.acc";
//const password = "GFFdNsylP6tW96OsXGRV";
//const baseURL = "https://stag.einhellpmp.com";
//const loggedOUTpageTitle = "Log in to PMP UAT"


//Constants for test AccountEdit
const domain = 1;
const role = 0;
const account = "testaaFisrt";

//Languages
const english = 'English';
const czech = 'Czech';
const chinese = 'Chinese';

//Creation of ContentBrick
const cbName = "TestCB Automatization";
const cbText = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,"
const contentBrickFieldName1 = "Field automatization name";
const contentBrickFieldName2 = "Another field automatization name";
const dropdownElement1 = "Text Box";
const dropdownElement2 = "Text Area";



//Creation of DDM 
const ddmNAme = "TestDDM Automatization";

// MenuButtons in Overviews page
const overviewMenuButtons = {
  taskMenuButton: "Tasks",
  activeProjectsMenuButton: "Active Projects",
  draftProjectsMenuButton: "Draft Projects",
  domainModelInstancesMenuButton: "DomainModelInstances",
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
  administrationListsMenuButton:  "Lists",
  administrationQualificationsMenuButton: "Qualifications",
  administrationTagsAndSearchIdsMenuButton: "Tags and search identifiers",
  administrationTranslationsMenuButton: "Translations",
  administrationUnitTypesMenuButton: "Unit types",
  administrationUnitsMenuButton: "Units",
  administrationUsageTypesMenuButton: "Usage types",
  
  //User Administration parts
  userAdministrationGroupsMenuButton: "Groups",
  userAdministrationOrganigramMenuButton: "Organigram",
  userAdministrationRolesMenuButton:"Roles",
  userAdministrationUsersMenuButton:"Users",
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
  administrationListsHeader:  "Lists",
  administrationQualificationsHeader: "Qualifications",
  administrationTagsAndSearchIdsHeader: "Tags and search identifiers",
  administrationTranslationsHeader: "Languages",
  administrationUnitTypesHeader: "Unit types",
  administrationUnitsHeader: "Units",
  administrationUsageTypesHeader: "Usage types",
  
  //User Administration parts
  userAdministrationGroupsHeader: "Groups",
  userAdministrationOrganigramHeader: "Organigram",
  userAdministrationRolesHeader:"Roles",
  userAdministrationUsersHeader:"Users",
};






// Parts of Urls
const pageUrls = {
    taskOverview: `${baseURL}/tasks/overview`,
    activeProjectsOverview: `${baseURL}/project/overview`,
    draftProjectsOverview: `${baseURL}/project/draft-overview`,
    domainModelInstancesOverview: `${baseURL}/domainDataModelInstances/overview`,
    reportsOverview: `${baseURL}/report/overview`,
    
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
    userAdministrationRoles:`${baseURL}/user/roles`,
    userAdministrationUsers:`${baseURL}/user/overview`,
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
    ddmNAme
    
   };