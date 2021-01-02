"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
var ImageEncryption = /** @class */ (function () {
    function ImageEncryption(password) {
        this.hashKey = [];
        this.totalHash = 0;
        this.sha512 = sha512;
        this.MersenneTwister = MersenneTwister;
        this.createHashByPassword(password);
        this.sbox = this.createSBox();
        this.mixSBoxByHashKey();
        for (var i = 0; i < 255; i++) {
            var coordinations = this.getCoordinationByDecimal(i);
            var newNumber = this.generateRandomNumberForSBox(i, i + 1, 255);
            var newCoordinations = this.getCoordinationByDecimal(newNumber);
            var tempVal = this.sbox[coordinations[0]][coordinations[1]];
            this.sbox[coordinations[0]][coordinations[1]] = this.sbox[newCoordinations[0]][newCoordinations[1]];
            this.sbox[newCoordinations[0]][newCoordinations[1]] = tempVal;
        }
    }
    ImageEncryption.prototype.createHashByPassword = function (password) {
        this.totalHash = 1;
        this.hashKey = this.sha512.sha512(password).split("");
        for (var i = 0; i < this.hashKey.length; i++) {
            this.totalHash *= parseInt(this.hashKey[i], 16);
        }
    };
    ImageEncryption.prototype.createSBox = function () {
        var counter = 0;
        var a = [];
        for (var i = 0; i < 16; i++) {
            var b = [];
            for (var k = 0; k < 16; k++) {
                b.push(counter);
                counter++;
            }
            a.push(b);
        }
        return a;
    };
    ImageEncryption.prototype.getSBox = function () {
        return this.sbox;
    };
    ImageEncryption.prototype.reverseSBox = function () {
        var newSBox = this.createSBox();
        for (var i = 0; i < 16; i++) {
            for (var k = 0; k < 16; k++) {
                var hexX = this.decToHex(i, false);
                var hexY = this.decToHex(k, false);
                var decimalXY = this.hexToDec(hexX[0] + hexY[0]);
                var coordination = this.getCoordinationByDecimal(this.sbox[i][k]);
                newSBox[coordination[0]][coordination[1]] = decimalXY;
            }
        }
        return newSBox;
    };
    ImageEncryption.prototype.decryptionImage = function (imageData) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        try {
                            var reverseSBox = _this.reverseSBox();
                            var data = imageData.data;
                            for (var i = 0; i < data.length; i += 4) {
                                var ranNumberForX = _this.generateRandomNumberForSBox(i, 0, 15);
                                var ranNumberForY = _this.generateRandomNumberForSBox(i + 2, 0, 15);
                                var red = _this.sbox[ranNumberForX][ranNumberForY] ^ data[i];
                                var green = _this.sbox[ranNumberForX][ranNumberForY] ^ data[i + 1];
                                var blue = _this.sbox[ranNumberForX][ranNumberForY] ^ data[i + 2];
                                var coordinationRed = _this.getCoordinationByDecimal(red);
                                var coordinationGreen = _this.getCoordinationByDecimal(green);
                                var coordinationBlue = _this.getCoordinationByDecimal(blue);
                                data[i] = reverseSBox[coordinationRed[0]][coordinationRed[1]];
                                data[i + 1] = reverseSBox[coordinationGreen[0]][coordinationGreen[1]];
                                data[i + 2] = reverseSBox[coordinationBlue[0]][coordinationBlue[1]];
                            }
                            resolve(imageData);
                        }
                        catch (e) {
                            reject(e);
                        }
                    })];
            });
        });
    };
    ImageEncryption.prototype.encryptionImage = function (imageData) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        try {
                            var data = imageData.data;
                            for (var i = 0; i < data.length; i += 4) {
                                var ranNumberForX = _this.generateRandomNumberForSBox(i, 0, 15);
                                var ranNumberForY = _this.generateRandomNumberForSBox(i + 2, 0, 15);
                                var coordinationRed = _this.getCoordinationByDecimal(data[i]);
                                var coordinationGreen = _this.getCoordinationByDecimal(data[i + 1]);
                                var coordinationBlue = _this.getCoordinationByDecimal(data[i + 2]);
                                data[i] = _this.sbox[ranNumberForX][ranNumberForY] ^ _this.sbox[coordinationRed[0]][coordinationRed[1]];
                                data[i + 1] = _this.sbox[ranNumberForX][ranNumberForY] ^ _this.sbox[coordinationGreen[0]][coordinationGreen[1]];
                                data[i + 2] = _this.sbox[ranNumberForX][ranNumberForY] ^ _this.sbox[coordinationBlue[0]][coordinationBlue[1]];
                            }
                            resolve(imageData);
                        }
                        catch (e) {
                            reject(e);
                        }
                    })];
            });
        });
    };
    ImageEncryption.prototype.changeSBoxRow = function (x, y) {
        for (var i = 0; i < 16; i++) {
            var tempX = this.sbox[x][i];
            var tempY = this.sbox[y][i];
            this.sbox[x][i] = tempY;
            this.sbox[y][i] = tempX;
        }
    };
    ImageEncryption.prototype.changeSBoxColumn = function (x, y) {
        for (var i = 0; i < 16; i++) {
            var tempX = this.sbox[i][x];
            var tempY = this.sbox[i][y];
            this.sbox[i][x] = tempY;
            this.sbox[i][y] = tempX;
        }
    };
    ImageEncryption.prototype.mixSBoxByHashKey = function () {
        var counter = 1;
        for (var i = 0; i < 128; i += 2) {
            var x = parseInt(this.hashKey[i], 16);
            var y = parseInt(this.hashKey[i + 1], 16);
            if (counter % 2 === 0) {
                this.changeSBoxRow(x, y);
            }
            else {
                this.changeSBoxColumn(x, y);
            }
            counter++;
        }
    };
    ImageEncryption.prototype.hexToDec = function (value) {
        return parseInt(value, 16);
    };
    ImageEncryption.prototype.decToHex = function (value, isDouble) {
        if (isDouble === void 0) { isDouble = true; }
        var hex = value.toString(16).split('');
        if (isDouble && hex.length <= 1) {
            return [
                "0",
                hex[0]
            ];
        }
        return hex;
    };
    ImageEncryption.prototype.getCoordinationByDecimal = function (value) {
        var coordinations = [];
        var hex = this.decToHex(value);
        coordinations.push(this.hexToDec(hex[0]), this.hexToDec(hex[1]));
        return coordinations;
    };
    ImageEncryption.prototype.generateRandomNumberForSBox = function (index, min, max) {
        var generator = new this.MersenneTwister(index + this.totalHash);
        return Math.floor(generator.random() * (max - min + 1)) + min;
    };
    return ImageEncryption;
}());