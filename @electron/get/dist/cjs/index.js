"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var debug_1 = require("debug");
var path = require("path");
var artifact_utils_1 = require("./artifact-utils");
var Cache_1 = require("./Cache");
var downloader_resolver_1 = require("./downloader-resolver");
var proxy_1 = require("./proxy");
var utils_1 = require("./utils");
var utils_2 = require("./utils");
exports.getHostArch = utils_2.getHostArch;
var proxy_2 = require("./proxy");
exports.initializeProxy = proxy_2.initializeProxy;
var d = debug_1.default('@electron/get:index');
var sumchecker = require('sumchecker');
if (process.env.ELECTRON_GET_USE_PROXY) {
    proxy_1.initializeProxy();
}
/**
 * Downloads a specific version of Electron and returns an absolute path to a
 * ZIP file.
 *
 * @param version - The version of Electron you want to download
 */
function download(version, options) {
    return downloadArtifact(__assign({}, options, { version: version, platform: process.platform, arch: utils_1.getHostArch(), artifactName: 'electron' }));
}
exports.download = download;
/**
 * Downloads an artifact from an Electron release and returns an absolute path
 * to the downloaded file.
 *
 * @param artifactDetails - The information required to download the artifact
 */
function downloadArtifact(_artifactDetails) {
    return __awaiter(this, void 0, void 0, function () {
        var artifactDetails, fileName, url, cache, cachedPath;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    artifactDetails = _artifactDetails.isGeneric
                        ? __assign({}, _artifactDetails) : __assign({ platform: process.platform, arch: utils_1.getHostArch() }, _artifactDetails);
                    utils_1.ensureIsTruthyString(artifactDetails, 'version');
                    artifactDetails.version = utils_1.normalizeVersion(artifactDetails.version);
                    fileName = artifact_utils_1.getArtifactFileName(artifactDetails);
                    url = artifact_utils_1.getArtifactRemoteURL(artifactDetails);
                    cache = new Cache_1.Cache(artifactDetails.cacheRoot);
                    if (!!artifactDetails.force) return [3 /*break*/, 2];
                    d("Checking the cache for " + fileName + " (" + url + ")");
                    return [4 /*yield*/, cache.getPathForFileInCache(url, fileName)];
                case 1:
                    cachedPath = _a.sent();
                    if (cachedPath === null) {
                        d('Cache miss');
                    }
                    else {
                        d('Cache hit');
                        return [2 /*return*/, cachedPath];
                    }
                    _a.label = 2;
                case 2:
                    if (!artifactDetails.isGeneric &&
                        utils_1.isOfficialLinuxIA32Download(artifactDetails.platform, artifactDetails.arch, artifactDetails.version, artifactDetails.mirrorOptions)) {
                        console.warn('Official Linux/ia32 support is deprecated.');
                        console.warn('For more info: https://electronjs.org/blog/linux-32bit-support');
                    }
                    return [4 /*yield*/, utils_1.withTempDirectoryIn(artifactDetails.tempDirectory, function (tempFolder) { return __awaiter(_this, void 0, void 0, function () {
                            var tempDownloadPath, downloader, _a, shasumPath;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        tempDownloadPath = path.resolve(tempFolder, artifact_utils_1.getArtifactFileName(artifactDetails));
                                        _a = artifactDetails.downloader;
                                        if (_a) return [3 /*break*/, 2];
                                        return [4 /*yield*/, downloader_resolver_1.getDownloaderForSystem()];
                                    case 1:
                                        _a = (_b.sent());
                                        _b.label = 2;
                                    case 2:
                                        downloader = _a;
                                        d("Downloading " + url + " to " + tempDownloadPath + " with options: " + JSON.stringify(artifactDetails.downloadOptions));
                                        return [4 /*yield*/, downloader.download(url, tempDownloadPath, artifactDetails.downloadOptions)];
                                    case 3:
                                        _b.sent();
                                        if (!(!artifactDetails.artifactName.startsWith('SHASUMS256') &&
                                            !artifactDetails.unsafelyDisableChecksums)) return [3 /*break*/, 6];
                                        return [4 /*yield*/, downloadArtifact({
                                                isGeneric: true,
                                                version: artifactDetails.version,
                                                artifactName: 'SHASUMS256.txt',
                                                force: artifactDetails.force,
                                                downloadOptions: artifactDetails.downloadOptions,
                                                downloader: artifactDetails.downloader,
                                                mirrorOptions: artifactDetails.mirrorOptions,
                                            })];
                                    case 4:
                                        shasumPath = _b.sent();
                                        return [4 /*yield*/, sumchecker('sha256', shasumPath, path.dirname(tempDownloadPath), [
                                                path.basename(tempDownloadPath),
                                            ])];
                                    case 5:
                                        _b.sent();
                                        _b.label = 6;
                                    case 6: return [4 /*yield*/, cache.putFileInCache(url, tempDownloadPath, fileName)];
                                    case 7: return [2 /*return*/, _b.sent()];
                                }
                            });
                        }); })];
                case 3: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.downloadArtifact = downloadArtifact;
//# sourceMappingURL=index.js.map