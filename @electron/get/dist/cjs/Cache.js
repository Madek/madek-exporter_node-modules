"use strict";
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
var env_paths_1 = require("env-paths");
var fs = require("fs-extra");
var path = require("path");
var sanitize = require("sanitize-filename");
var d = debug_1.default('@electron/get:cache');
var defaultCacheRoot = env_paths_1.default('electron', {
    suffix: '',
}).cache;
var Cache = /** @class */ (function () {
    function Cache(cacheRoot) {
        if (cacheRoot === void 0) { cacheRoot = defaultCacheRoot; }
        this.cacheRoot = cacheRoot;
    }
    Cache.prototype.getCachePath = function (url, fileName) {
        var sanitizedUrl = sanitize(url);
        return path.resolve(this.cacheRoot, sanitizedUrl, fileName);
    };
    Cache.prototype.getPathForFileInCache = function (url, fileName) {
        return __awaiter(this, void 0, void 0, function () {
            var cachePath;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cachePath = this.getCachePath(url, fileName);
                        return [4 /*yield*/, fs.pathExists(cachePath)];
                    case 1:
                        if (_a.sent()) {
                            return [2 /*return*/, cachePath];
                        }
                        return [2 /*return*/, null];
                }
            });
        });
    };
    Cache.prototype.putFileInCache = function (url, currentPath, fileName) {
        return __awaiter(this, void 0, void 0, function () {
            var cachePath;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cachePath = this.getCachePath(url, fileName);
                        d("Moving " + currentPath + " to " + cachePath);
                        return [4 /*yield*/, fs.pathExists(cachePath)];
                    case 1:
                        if (!_a.sent()) return [3 /*break*/, 3];
                        d('* Replacing existing file');
                        return [4 /*yield*/, fs.remove(cachePath)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [4 /*yield*/, fs.move(currentPath, cachePath)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, cachePath];
                }
            });
        });
    };
    return Cache;
}());
exports.Cache = Cache;
//# sourceMappingURL=Cache.js.map