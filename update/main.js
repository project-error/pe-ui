const fetch = require("node-fetch");
const semver = require("semver");
const { stripIndents } = require("common-tags");

const GITHUB_USER = "project-error";
const REPO_NAME = "pe-ui";
const DEFAULT_BRANCH = "master";

const CURRENT_RESOURCE_NAME = GetCurrentResourceName();
const RESOURCE_PREFIX = `^3[pe-ui]^0`;
const RELEASE_URL = "https://github.com/project-error/pe-ui/releases";

const messageTemplates = {
  outOfDate: (remoteVersion, localVersion, diffType) => stripIndents`
    ^1===============================================================================^0
      Your version of ${RESOURCE_PREFIX} is currently ^1outdated^0
      The latest version is ^2${remoteVersion}^0, your version is ^1${localVersion}^0
      This is considered a ^3"${diffType.toUpperCase()}"^0 version change.
      You can find the latest version at ^2${RELEASE_URL}^0
    ^1===============================================================================^0
  `,
  prerelease: (remoteVersion, localVersion) => stripIndents`
    ^1===============================================================================^0
      You may be using a pre-release version of ${RESOURCE_PREFIX} as your version
      is higher than the latest stable GitHub release.
      Your version: ^1${localVersion}^0
      GitHub version: ^2${remoteVersion}^0
    ^1===============================================================================^0
  `,
  isUpdated: (version) =>
    `${RESOURCE_PREFIX} (v${version}) is up to date and has started sucessfully!`,
  badResponseCode: (respCode) =>
    `${RESOURCE_PREFIX} ^1There was an error while attempting to check for updates. Code: ${respCode}^0`,
  genericError: (e) =>
    stripIndents`
      ^1===============================================================================^0
        An unexpected error occured in ${RESOURCE_PREFIX} while checking for updates.
        If you see this message consistently, please file a report with the given information.
        Error: ^1${e.message}^0
      ^1===============================================================================^0
    `,
};

const getVersionFromRawManifest = (manifestContent) => {
  const rawResults = manifestContent.match(/^[\s]*version.*['"]$/m);
  if (!rawResults || !rawResults[0])
    throw new Error("Unable to find parse version in fxmanifest");

  // debugLog("Raw Remote Regex Result:", rawResults);

  // Improve this parsing to be adaptable & maintable for the future
  return rawResults[0].split(" ")[1].replace(/["']/g, "");
};

const getVersionFromMetadata = () => {
  return GetResourceMetadata(CURRENT_RESOURCE_NAME, "version", 0);
};

const fetchManifestVersionFromGitHub = async () => {
  try {
    const rawRes = await fetch(
      `https://raw.githubusercontent.com/${GITHUB_USER}/${REPO_NAME}/${DEFAULT_BRANCH}/fxmanifest.lua`
    );

    const textConversion = await rawRes.text();
    // debugLog("Ret Text:", textConversion);

    return {
      version: getVersionFromRawManifest(textConversion),
      statusCode: rawRes.status,
    };
  } catch (e) {
    return { error: e };
  }
};

const startUpdateCheck = async () => {
  const localVersion = getVersionFromMetadata();
  const {
    version: remoteVersion,
    error,
    statusCode: respStatusCode,
  } = await fetchManifestVersionFromGitHub();

  if (error) {
    return console.log(messageTemplates.genericError(error));
  }

  if (!respStatusCode || !remoteVersion) {
    return console.log(
      messageTemplates.genericError(
        new Error(
          "The version or response status code is undefined after error checks"
        )
      )
    );
  }

  // debugLog("Fetched RemoteVer:", remoteVersion);
  // debugLog("Local Ver:", localVersion);

  // This set of conditionals, should handle all the possible returns
  // from GH adequately.

  // Non 200 status code handling
  if (respStatusCode < 200 || respStatusCode > 200) {
    return console.log(messageTemplates.badResponseCode(respStatusCode));
  }

  // Local version is equal to remote
  if (semver.eq(localVersion, remoteVersion)) {
    return console.log(messageTemplates.isUpdated(localVersion));
  }

  // Local version is below remote
  if (semver.lt(localVersion, remoteVersion)) {
    // Non-null assert as we have already confirmed that localVersion < remoteVersion
    const verDiffType = semver.diff(localVersion, remoteVersion);

    return console.log(
      messageTemplates.outOfDate(remoteVersion, localVersion, verDiffType)
    );
  }

  // Local version is ahead of remote
  if (semver.gt(localVersion, remoteVersion)) {
    return console.log(
      messageTemplates.prerelease(remoteVersion, localVersion)
    );
  }
};

const updateCheckDisabled = GetConvarInt("qb-core:disableUpdateCheck", 0) == 1;

on("onResourceStart", async (resName) => {
  if (resName !== CURRENT_RESOURCE_NAME) return;

  if (updateCheckDisabled) {
    // debugLog("Update checking disabled by convar");
    return;
  }

  // debugLog("Beginning update check");
  await startUpdateCheck();
});
