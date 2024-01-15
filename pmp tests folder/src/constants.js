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
const cbName = "TestCB Automatization"


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
    cbName
    
   };