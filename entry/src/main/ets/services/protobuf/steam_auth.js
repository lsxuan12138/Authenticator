/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import { index } from '@ohos/protobufjs';
import Long from 'long';
const $protobuf = index;
$protobuf.util.Long = Long;
$protobuf.configure();

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

/**
 * EAuthTokenPlatformType enum.
 * @exports EAuthTokenPlatformType
 * @enum {number}
 * @property {number} k_EAuthTokenPlatformType_Unknown=0 k_EAuthTokenPlatformType_Unknown value
 * @property {number} k_EAuthTokenPlatformType_SteamClient=1 k_EAuthTokenPlatformType_SteamClient value
 * @property {number} k_EAuthTokenPlatformType_WebBrowser=2 k_EAuthTokenPlatformType_WebBrowser value
 * @property {number} k_EAuthTokenPlatformType_MobileApp=3 k_EAuthTokenPlatformType_MobileApp value
 */
export const EAuthTokenPlatformType = $root.EAuthTokenPlatformType = (() => {
    const valuesById = {}, values = Object.create(valuesById);
    values[valuesById[0] = "k_EAuthTokenPlatformType_Unknown"] = 0;
    values[valuesById[1] = "k_EAuthTokenPlatformType_SteamClient"] = 1;
    values[valuesById[2] = "k_EAuthTokenPlatformType_WebBrowser"] = 2;
    values[valuesById[3] = "k_EAuthTokenPlatformType_MobileApp"] = 3;
    return values;
})();

/**
 * EAuthTokenAppType enum.
 * @exports EAuthTokenAppType
 * @enum {number}
 * @property {number} k_EAuthTokenAppType_Unknown=0 k_EAuthTokenAppType_Unknown value
 * @property {number} k_EAuthTokenAppType_Mobile_SteamApp=1 k_EAuthTokenAppType_Mobile_SteamApp value
 * @property {number} k_EAuthTokenAppType_Mobile_ChatApp=2 k_EAuthTokenAppType_Mobile_ChatApp value
 */
export const EAuthTokenAppType = $root.EAuthTokenAppType = (() => {
    const valuesById = {}, values = Object.create(valuesById);
    values[valuesById[0] = "k_EAuthTokenAppType_Unknown"] = 0;
    values[valuesById[1] = "k_EAuthTokenAppType_Mobile_SteamApp"] = 1;
    values[valuesById[2] = "k_EAuthTokenAppType_Mobile_ChatApp"] = 2;
    return values;
})();

/**
 * ETwoFactorStatusFieldFlag enum.
 * @exports ETwoFactorStatusFieldFlag
 * @enum {number}
 * @property {number} k_ETwoFactorStatusFieldFlag_None=0 k_ETwoFactorStatusFieldFlag_None value
 * @property {number} k_ETwoFactorStatusFieldFlag_LastUsage=1 k_ETwoFactorStatusFieldFlag_LastUsage value
 */
export const ETwoFactorStatusFieldFlag = $root.ETwoFactorStatusFieldFlag = (() => {
    const valuesById = {}, values = Object.create(valuesById);
    values[valuesById[0] = "k_ETwoFactorStatusFieldFlag_None"] = 0;
    values[valuesById[1] = "k_ETwoFactorStatusFieldFlag_LastUsage"] = 1;
    return values;
})();

/**
 * ETwoFactorUsageType enum.
 * @exports ETwoFactorUsageType
 * @enum {number}
 * @property {number} k_ETwoFactorUsageType_Unknown=0 k_ETwoFactorUsageType_Unknown value
 * @property {number} k_ETwoFactorUsageType_None=1 k_ETwoFactorUsageType_None value
 * @property {number} k_ETwoFactorUsageType_MobileConfirmation=2 k_ETwoFactorUsageType_MobileConfirmation value
 * @property {number} k_ETwoFactorUsageType_Login=3 k_ETwoFactorUsageType_Login value
 */
export const ETwoFactorUsageType = $root.ETwoFactorUsageType = (() => {
    const valuesById = {}, values = Object.create(valuesById);
    values[valuesById[0] = "k_ETwoFactorUsageType_Unknown"] = 0;
    values[valuesById[1] = "k_ETwoFactorUsageType_None"] = 1;
    values[valuesById[2] = "k_ETwoFactorUsageType_MobileConfirmation"] = 2;
    values[valuesById[3] = "k_ETwoFactorUsageType_Login"] = 3;
    return values;
})();

/**
 * EAuthSessionGuardType enum.
 * @exports EAuthSessionGuardType
 * @enum {number}
 * @property {number} k_EAuthSessionGuardType_Unknown=0 k_EAuthSessionGuardType_Unknown value
 * @property {number} k_EAuthSessionGuardType_None=1 k_EAuthSessionGuardType_None value
 * @property {number} k_EAuthSessionGuardType_EmailCode=2 k_EAuthSessionGuardType_EmailCode value
 * @property {number} k_EAuthSessionGuardType_DeviceCode=3 k_EAuthSessionGuardType_DeviceCode value
 * @property {number} k_EAuthSessionGuardType_DeviceConfirmation=4 k_EAuthSessionGuardType_DeviceConfirmation value
 * @property {number} k_EAuthSessionGuardType_EmailConfirmation=5 k_EAuthSessionGuardType_EmailConfirmation value
 * @property {number} k_EAuthSessionGuardType_MachineToken=6 k_EAuthSessionGuardType_MachineToken value
 * @property {number} k_EAuthSessionGuardType_LegacyMachineAuth=7 k_EAuthSessionGuardType_LegacyMachineAuth value
 */
export const EAuthSessionGuardType = $root.EAuthSessionGuardType = (() => {
    const valuesById = {}, values = Object.create(valuesById);
    values[valuesById[0] = "k_EAuthSessionGuardType_Unknown"] = 0;
    values[valuesById[1] = "k_EAuthSessionGuardType_None"] = 1;
    values[valuesById[2] = "k_EAuthSessionGuardType_EmailCode"] = 2;
    values[valuesById[3] = "k_EAuthSessionGuardType_DeviceCode"] = 3;
    values[valuesById[4] = "k_EAuthSessionGuardType_DeviceConfirmation"] = 4;
    values[valuesById[5] = "k_EAuthSessionGuardType_EmailConfirmation"] = 5;
    values[valuesById[6] = "k_EAuthSessionGuardType_MachineToken"] = 6;
    values[valuesById[7] = "k_EAuthSessionGuardType_LegacyMachineAuth"] = 7;
    return values;
})();

/**
 * ESessionPersistence enum.
 * @exports ESessionPersistence
 * @enum {number}
 * @property {number} k_ESessionPersistence_Invalid=-1 k_ESessionPersistence_Invalid value
 * @property {number} k_ESessionPersistence_Ephemeral=0 k_ESessionPersistence_Ephemeral value
 * @property {number} k_ESessionPersistence_Persistent=1 k_ESessionPersistence_Persistent value
 */
export const ESessionPersistence = $root.ESessionPersistence = (() => {
    const valuesById = {}, values = Object.create(valuesById);
    values[valuesById[-1] = "k_ESessionPersistence_Invalid"] = -1;
    values[valuesById[0] = "k_ESessionPersistence_Ephemeral"] = 0;
    values[valuesById[1] = "k_ESessionPersistence_Persistent"] = 1;
    return values;
})();

/**
 * EAuthSessionSecurityHistory enum.
 * @exports EAuthSessionSecurityHistory
 * @enum {number}
 * @property {number} k_EAuthSessionSecurityHistory_Invalid=0 k_EAuthSessionSecurityHistory_Invalid value
 * @property {number} k_EAuthSessionSecurityHistory_UsedPreviously=1 k_EAuthSessionSecurityHistory_UsedPreviously value
 * @property {number} k_EAuthSessionSecurityHistory_NoPriorHistory=2 k_EAuthSessionSecurityHistory_NoPriorHistory value
 */
export const EAuthSessionSecurityHistory = $root.EAuthSessionSecurityHistory = (() => {
    const valuesById = {}, values = Object.create(valuesById);
    values[valuesById[0] = "k_EAuthSessionSecurityHistory_Invalid"] = 0;
    values[valuesById[1] = "k_EAuthSessionSecurityHistory_UsedPreviously"] = 1;
    values[valuesById[2] = "k_EAuthSessionSecurityHistory_NoPriorHistory"] = 2;
    return values;
})();

export const CAuthentication_DeviceDetails = $root.CAuthentication_DeviceDetails = (() => {

    /**
     * Properties of a CAuthentication_DeviceDetails.
     * @exports ICAuthentication_DeviceDetails
     * @interface ICAuthentication_DeviceDetails
     * @property {string|null} [deviceFriendlyName] CAuthentication_DeviceDetails deviceFriendlyName
     * @property {EAuthTokenPlatformType|null} [platformType] CAuthentication_DeviceDetails platformType
     * @property {number|null} [osType] CAuthentication_DeviceDetails osType
     * @property {number|null} [gamingDeviceType] CAuthentication_DeviceDetails gamingDeviceType
     * @property {number|null} [clientCount] CAuthentication_DeviceDetails clientCount
     * @property {Uint8Array|null} [machineId] CAuthentication_DeviceDetails machineId
     * @property {EAuthTokenAppType|null} [appType] CAuthentication_DeviceDetails appType
     */

    /**
     * Constructs a new CAuthentication_DeviceDetails.
     * @exports CAuthentication_DeviceDetails
     * @classdesc Represents a CAuthentication_DeviceDetails.
     * @implements ICAuthentication_DeviceDetails
     * @constructor
     * @param {ICAuthentication_DeviceDetails=} [properties] Properties to set
     */
    function CAuthentication_DeviceDetails(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * CAuthentication_DeviceDetails deviceFriendlyName.
     * @member {string} deviceFriendlyName
     * @memberof CAuthentication_DeviceDetails
     * @instance
     */
    CAuthentication_DeviceDetails.prototype.deviceFriendlyName = "";

    /**
     * CAuthentication_DeviceDetails platformType.
     * @member {EAuthTokenPlatformType} platformType
     * @memberof CAuthentication_DeviceDetails
     * @instance
     */
    CAuthentication_DeviceDetails.prototype.platformType = 0;

    /**
     * CAuthentication_DeviceDetails osType.
     * @member {number} osType
     * @memberof CAuthentication_DeviceDetails
     * @instance
     */
    CAuthentication_DeviceDetails.prototype.osType = 0;

    /**
     * CAuthentication_DeviceDetails gamingDeviceType.
     * @member {number} gamingDeviceType
     * @memberof CAuthentication_DeviceDetails
     * @instance
     */
    CAuthentication_DeviceDetails.prototype.gamingDeviceType = 0;

    /**
     * CAuthentication_DeviceDetails clientCount.
     * @member {number} clientCount
     * @memberof CAuthentication_DeviceDetails
     * @instance
     */
    CAuthentication_DeviceDetails.prototype.clientCount = 0;

    /**
     * CAuthentication_DeviceDetails machineId.
     * @member {Uint8Array} machineId
     * @memberof CAuthentication_DeviceDetails
     * @instance
     */
    CAuthentication_DeviceDetails.prototype.machineId = $util.newBuffer([]);

    /**
     * CAuthentication_DeviceDetails appType.
     * @member {EAuthTokenAppType} appType
     * @memberof CAuthentication_DeviceDetails
     * @instance
     */
    CAuthentication_DeviceDetails.prototype.appType = 0;

    /**
     * Creates a new CAuthentication_DeviceDetails instance using the specified properties.
     * @function create
     * @memberof CAuthentication_DeviceDetails
     * @static
     * @param {ICAuthentication_DeviceDetails=} [properties] Properties to set
     * @returns {CAuthentication_DeviceDetails} CAuthentication_DeviceDetails instance
     */
    CAuthentication_DeviceDetails.create = function create(properties) {
        return new CAuthentication_DeviceDetails(properties);
    };

    /**
     * Encodes the specified CAuthentication_DeviceDetails message. Does not implicitly {@link CAuthentication_DeviceDetails.verify|verify} messages.
     * @function encode
     * @memberof CAuthentication_DeviceDetails
     * @static
     * @param {ICAuthentication_DeviceDetails} message CAuthentication_DeviceDetails message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CAuthentication_DeviceDetails.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.deviceFriendlyName != null && Object.hasOwnProperty.call(message, "deviceFriendlyName"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.deviceFriendlyName);
        if (message.platformType != null && Object.hasOwnProperty.call(message, "platformType"))
            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.platformType);
        if (message.osType != null && Object.hasOwnProperty.call(message, "osType"))
            writer.uint32(/* id 3, wireType 0 =*/24).int32(message.osType);
        if (message.gamingDeviceType != null && Object.hasOwnProperty.call(message, "gamingDeviceType"))
            writer.uint32(/* id 4, wireType 0 =*/32).uint32(message.gamingDeviceType);
        if (message.clientCount != null && Object.hasOwnProperty.call(message, "clientCount"))
            writer.uint32(/* id 5, wireType 0 =*/40).uint32(message.clientCount);
        if (message.machineId != null && Object.hasOwnProperty.call(message, "machineId"))
            writer.uint32(/* id 6, wireType 2 =*/50).bytes(message.machineId);
        if (message.appType != null && Object.hasOwnProperty.call(message, "appType"))
            writer.uint32(/* id 7, wireType 0 =*/56).int32(message.appType);
        return writer;
    };

    /**
     * Encodes the specified CAuthentication_DeviceDetails message, length delimited. Does not implicitly {@link CAuthentication_DeviceDetails.verify|verify} messages.
     * @function encodeDelimited
     * @memberof CAuthentication_DeviceDetails
     * @static
     * @param {ICAuthentication_DeviceDetails} message CAuthentication_DeviceDetails message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CAuthentication_DeviceDetails.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a CAuthentication_DeviceDetails message from the specified reader or buffer.
     * @function decode
     * @memberof CAuthentication_DeviceDetails
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {CAuthentication_DeviceDetails} CAuthentication_DeviceDetails
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CAuthentication_DeviceDetails.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.CAuthentication_DeviceDetails();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    message.deviceFriendlyName = reader.string();
                    break;
                }
            case 2: {
                    message.platformType = reader.int32();
                    break;
                }
            case 3: {
                    message.osType = reader.int32();
                    break;
                }
            case 4: {
                    message.gamingDeviceType = reader.uint32();
                    break;
                }
            case 5: {
                    message.clientCount = reader.uint32();
                    break;
                }
            case 6: {
                    message.machineId = reader.bytes();
                    break;
                }
            case 7: {
                    message.appType = reader.int32();
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a CAuthentication_DeviceDetails message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof CAuthentication_DeviceDetails
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {CAuthentication_DeviceDetails} CAuthentication_DeviceDetails
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CAuthentication_DeviceDetails.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a CAuthentication_DeviceDetails message.
     * @function verify
     * @memberof CAuthentication_DeviceDetails
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    CAuthentication_DeviceDetails.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.deviceFriendlyName != null && message.hasOwnProperty("deviceFriendlyName"))
            if (!$util.isString(message.deviceFriendlyName))
                return "deviceFriendlyName: string expected";
        if (message.platformType != null && message.hasOwnProperty("platformType"))
            switch (message.platformType) {
            default:
                return "platformType: enum value expected";
            case 0:
            case 1:
            case 2:
            case 3:
                break;
            }
        if (message.osType != null && message.hasOwnProperty("osType"))
            if (!$util.isInteger(message.osType))
                return "osType: integer expected";
        if (message.gamingDeviceType != null && message.hasOwnProperty("gamingDeviceType"))
            if (!$util.isInteger(message.gamingDeviceType))
                return "gamingDeviceType: integer expected";
        if (message.clientCount != null && message.hasOwnProperty("clientCount"))
            if (!$util.isInteger(message.clientCount))
                return "clientCount: integer expected";
        if (message.machineId != null && message.hasOwnProperty("machineId"))
            if (!(message.machineId && typeof message.machineId.length === "number" || $util.isString(message.machineId)))
                return "machineId: buffer expected";
        if (message.appType != null && message.hasOwnProperty("appType"))
            switch (message.appType) {
            default:
                return "appType: enum value expected";
            case 0:
            case 1:
            case 2:
                break;
            }
        return null;
    };

    /**
     * Creates a CAuthentication_DeviceDetails message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof CAuthentication_DeviceDetails
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {CAuthentication_DeviceDetails} CAuthentication_DeviceDetails
     */
    CAuthentication_DeviceDetails.fromObject = function fromObject(object) {
        if (object instanceof $root.CAuthentication_DeviceDetails)
            return object;
        let message = new $root.CAuthentication_DeviceDetails();
        if (object.deviceFriendlyName != null)
            message.deviceFriendlyName = String(object.deviceFriendlyName);
        switch (object.platformType) {
        default:
            if (typeof object.platformType === "number") {
                message.platformType = object.platformType;
                break;
            }
            break;
        case "k_EAuthTokenPlatformType_Unknown":
        case 0:
            message.platformType = 0;
            break;
        case "k_EAuthTokenPlatformType_SteamClient":
        case 1:
            message.platformType = 1;
            break;
        case "k_EAuthTokenPlatformType_WebBrowser":
        case 2:
            message.platformType = 2;
            break;
        case "k_EAuthTokenPlatformType_MobileApp":
        case 3:
            message.platformType = 3;
            break;
        }
        if (object.osType != null)
            message.osType = object.osType | 0;
        if (object.gamingDeviceType != null)
            message.gamingDeviceType = object.gamingDeviceType >>> 0;
        if (object.clientCount != null)
            message.clientCount = object.clientCount >>> 0;
        if (object.machineId != null)
            if (typeof object.machineId === "string")
                $util.base64.decode(object.machineId, message.machineId = $util.newBuffer($util.base64.length(object.machineId)), 0);
            else if (object.machineId.length >= 0)
                message.machineId = object.machineId;
        switch (object.appType) {
        default:
            if (typeof object.appType === "number") {
                message.appType = object.appType;
                break;
            }
            break;
        case "k_EAuthTokenAppType_Unknown":
        case 0:
            message.appType = 0;
            break;
        case "k_EAuthTokenAppType_Mobile_SteamApp":
        case 1:
            message.appType = 1;
            break;
        case "k_EAuthTokenAppType_Mobile_ChatApp":
        case 2:
            message.appType = 2;
            break;
        }
        return message;
    };

    /**
     * Creates a plain object from a CAuthentication_DeviceDetails message. Also converts values to other types if specified.
     * @function toObject
     * @memberof CAuthentication_DeviceDetails
     * @static
     * @param {CAuthentication_DeviceDetails} message CAuthentication_DeviceDetails
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    CAuthentication_DeviceDetails.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.deviceFriendlyName = "";
            object.platformType = options.enums === String ? "k_EAuthTokenPlatformType_Unknown" : 0;
            object.osType = 0;
            object.gamingDeviceType = 0;
            object.clientCount = 0;
            if (options.bytes === String)
                object.machineId = "";
            else {
                object.machineId = [];
                if (options.bytes !== Array)
                    object.machineId = $util.newBuffer(object.machineId);
            }
            object.appType = options.enums === String ? "k_EAuthTokenAppType_Unknown" : 0;
        }
        if (message.deviceFriendlyName != null && message.hasOwnProperty("deviceFriendlyName"))
            object.deviceFriendlyName = message.deviceFriendlyName;
        if (message.platformType != null && message.hasOwnProperty("platformType"))
            object.platformType = options.enums === String ? $root.EAuthTokenPlatformType[message.platformType] === undefined ? message.platformType : $root.EAuthTokenPlatformType[message.platformType] : message.platformType;
        if (message.osType != null && message.hasOwnProperty("osType"))
            object.osType = message.osType;
        if (message.gamingDeviceType != null && message.hasOwnProperty("gamingDeviceType"))
            object.gamingDeviceType = message.gamingDeviceType;
        if (message.clientCount != null && message.hasOwnProperty("clientCount"))
            object.clientCount = message.clientCount;
        if (message.machineId != null && message.hasOwnProperty("machineId"))
            object.machineId = options.bytes === String ? $util.base64.encode(message.machineId, 0, message.machineId.length) : options.bytes === Array ? Array.prototype.slice.call(message.machineId) : message.machineId;
        if (message.appType != null && message.hasOwnProperty("appType"))
            object.appType = options.enums === String ? $root.EAuthTokenAppType[message.appType] === undefined ? message.appType : $root.EAuthTokenAppType[message.appType] : message.appType;
        return object;
    };

    /**
     * Converts this CAuthentication_DeviceDetails to JSON.
     * @function toJSON
     * @memberof CAuthentication_DeviceDetails
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    CAuthentication_DeviceDetails.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for CAuthentication_DeviceDetails
     * @function getTypeUrl
     * @memberof CAuthentication_DeviceDetails
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    CAuthentication_DeviceDetails.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/CAuthentication_DeviceDetails";
    };

    return CAuthentication_DeviceDetails;
})();

export const CAuthentication_AllowedConfirmation = $root.CAuthentication_AllowedConfirmation = (() => {

    /**
     * Properties of a CAuthentication_AllowedConfirmation.
     * @exports ICAuthentication_AllowedConfirmation
     * @interface ICAuthentication_AllowedConfirmation
     * @property {EAuthSessionGuardType|null} [confirmationType] CAuthentication_AllowedConfirmation confirmationType
     * @property {string|null} [associatedMessage] CAuthentication_AllowedConfirmation associatedMessage
     */

    /**
     * Constructs a new CAuthentication_AllowedConfirmation.
     * @exports CAuthentication_AllowedConfirmation
     * @classdesc Represents a CAuthentication_AllowedConfirmation.
     * @implements ICAuthentication_AllowedConfirmation
     * @constructor
     * @param {ICAuthentication_AllowedConfirmation=} [properties] Properties to set
     */
    function CAuthentication_AllowedConfirmation(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * CAuthentication_AllowedConfirmation confirmationType.
     * @member {EAuthSessionGuardType} confirmationType
     * @memberof CAuthentication_AllowedConfirmation
     * @instance
     */
    CAuthentication_AllowedConfirmation.prototype.confirmationType = 0;

    /**
     * CAuthentication_AllowedConfirmation associatedMessage.
     * @member {string} associatedMessage
     * @memberof CAuthentication_AllowedConfirmation
     * @instance
     */
    CAuthentication_AllowedConfirmation.prototype.associatedMessage = "";

    /**
     * Creates a new CAuthentication_AllowedConfirmation instance using the specified properties.
     * @function create
     * @memberof CAuthentication_AllowedConfirmation
     * @static
     * @param {ICAuthentication_AllowedConfirmation=} [properties] Properties to set
     * @returns {CAuthentication_AllowedConfirmation} CAuthentication_AllowedConfirmation instance
     */
    CAuthentication_AllowedConfirmation.create = function create(properties) {
        return new CAuthentication_AllowedConfirmation(properties);
    };

    /**
     * Encodes the specified CAuthentication_AllowedConfirmation message. Does not implicitly {@link CAuthentication_AllowedConfirmation.verify|verify} messages.
     * @function encode
     * @memberof CAuthentication_AllowedConfirmation
     * @static
     * @param {ICAuthentication_AllowedConfirmation} message CAuthentication_AllowedConfirmation message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CAuthentication_AllowedConfirmation.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.confirmationType != null && Object.hasOwnProperty.call(message, "confirmationType"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.confirmationType);
        if (message.associatedMessage != null && Object.hasOwnProperty.call(message, "associatedMessage"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.associatedMessage);
        return writer;
    };

    /**
     * Encodes the specified CAuthentication_AllowedConfirmation message, length delimited. Does not implicitly {@link CAuthentication_AllowedConfirmation.verify|verify} messages.
     * @function encodeDelimited
     * @memberof CAuthentication_AllowedConfirmation
     * @static
     * @param {ICAuthentication_AllowedConfirmation} message CAuthentication_AllowedConfirmation message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CAuthentication_AllowedConfirmation.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a CAuthentication_AllowedConfirmation message from the specified reader or buffer.
     * @function decode
     * @memberof CAuthentication_AllowedConfirmation
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {CAuthentication_AllowedConfirmation} CAuthentication_AllowedConfirmation
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CAuthentication_AllowedConfirmation.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.CAuthentication_AllowedConfirmation();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    message.confirmationType = reader.int32();
                    break;
                }
            case 2: {
                    message.associatedMessage = reader.string();
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a CAuthentication_AllowedConfirmation message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof CAuthentication_AllowedConfirmation
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {CAuthentication_AllowedConfirmation} CAuthentication_AllowedConfirmation
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CAuthentication_AllowedConfirmation.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a CAuthentication_AllowedConfirmation message.
     * @function verify
     * @memberof CAuthentication_AllowedConfirmation
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    CAuthentication_AllowedConfirmation.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.confirmationType != null && message.hasOwnProperty("confirmationType"))
            switch (message.confirmationType) {
            default:
                return "confirmationType: enum value expected";
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
                break;
            }
        if (message.associatedMessage != null && message.hasOwnProperty("associatedMessage"))
            if (!$util.isString(message.associatedMessage))
                return "associatedMessage: string expected";
        return null;
    };

    /**
     * Creates a CAuthentication_AllowedConfirmation message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof CAuthentication_AllowedConfirmation
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {CAuthentication_AllowedConfirmation} CAuthentication_AllowedConfirmation
     */
    CAuthentication_AllowedConfirmation.fromObject = function fromObject(object) {
        if (object instanceof $root.CAuthentication_AllowedConfirmation)
            return object;
        let message = new $root.CAuthentication_AllowedConfirmation();
        switch (object.confirmationType) {
        default:
            if (typeof object.confirmationType === "number") {
                message.confirmationType = object.confirmationType;
                break;
            }
            break;
        case "k_EAuthSessionGuardType_Unknown":
        case 0:
            message.confirmationType = 0;
            break;
        case "k_EAuthSessionGuardType_None":
        case 1:
            message.confirmationType = 1;
            break;
        case "k_EAuthSessionGuardType_EmailCode":
        case 2:
            message.confirmationType = 2;
            break;
        case "k_EAuthSessionGuardType_DeviceCode":
        case 3:
            message.confirmationType = 3;
            break;
        case "k_EAuthSessionGuardType_DeviceConfirmation":
        case 4:
            message.confirmationType = 4;
            break;
        case "k_EAuthSessionGuardType_EmailConfirmation":
        case 5:
            message.confirmationType = 5;
            break;
        case "k_EAuthSessionGuardType_MachineToken":
        case 6:
            message.confirmationType = 6;
            break;
        case "k_EAuthSessionGuardType_LegacyMachineAuth":
        case 7:
            message.confirmationType = 7;
            break;
        }
        if (object.associatedMessage != null)
            message.associatedMessage = String(object.associatedMessage);
        return message;
    };

    /**
     * Creates a plain object from a CAuthentication_AllowedConfirmation message. Also converts values to other types if specified.
     * @function toObject
     * @memberof CAuthentication_AllowedConfirmation
     * @static
     * @param {CAuthentication_AllowedConfirmation} message CAuthentication_AllowedConfirmation
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    CAuthentication_AllowedConfirmation.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.confirmationType = options.enums === String ? "k_EAuthSessionGuardType_Unknown" : 0;
            object.associatedMessage = "";
        }
        if (message.confirmationType != null && message.hasOwnProperty("confirmationType"))
            object.confirmationType = options.enums === String ? $root.EAuthSessionGuardType[message.confirmationType] === undefined ? message.confirmationType : $root.EAuthSessionGuardType[message.confirmationType] : message.confirmationType;
        if (message.associatedMessage != null && message.hasOwnProperty("associatedMessage"))
            object.associatedMessage = message.associatedMessage;
        return object;
    };

    /**
     * Converts this CAuthentication_AllowedConfirmation to JSON.
     * @function toJSON
     * @memberof CAuthentication_AllowedConfirmation
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    CAuthentication_AllowedConfirmation.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for CAuthentication_AllowedConfirmation
     * @function getTypeUrl
     * @memberof CAuthentication_AllowedConfirmation
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    CAuthentication_AllowedConfirmation.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/CAuthentication_AllowedConfirmation";
    };

    return CAuthentication_AllowedConfirmation;
})();

export const CAuthentication_BeginAuthSessionViaCredentials_Request = $root.CAuthentication_BeginAuthSessionViaCredentials_Request = (() => {

    /**
     * Properties of a CAuthentication_BeginAuthSessionViaCredentials_Request.
     * @exports ICAuthentication_BeginAuthSessionViaCredentials_Request
     * @interface ICAuthentication_BeginAuthSessionViaCredentials_Request
     * @property {string|null} [deviceFriendlyName] CAuthentication_BeginAuthSessionViaCredentials_Request deviceFriendlyName
     * @property {string|null} [accountName] CAuthentication_BeginAuthSessionViaCredentials_Request accountName
     * @property {string|null} [encryptedPassword] CAuthentication_BeginAuthSessionViaCredentials_Request encryptedPassword
     * @property {Long|null} [encryptionTimestamp] CAuthentication_BeginAuthSessionViaCredentials_Request encryptionTimestamp
     * @property {boolean|null} [rememberLogin] CAuthentication_BeginAuthSessionViaCredentials_Request rememberLogin
     * @property {EAuthTokenPlatformType|null} [platformType] CAuthentication_BeginAuthSessionViaCredentials_Request platformType
     * @property {ESessionPersistence|null} [persistence] CAuthentication_BeginAuthSessionViaCredentials_Request persistence
     * @property {string|null} [websiteId] CAuthentication_BeginAuthSessionViaCredentials_Request websiteId
     * @property {ICAuthentication_DeviceDetails|null} [deviceDetails] CAuthentication_BeginAuthSessionViaCredentials_Request deviceDetails
     * @property {string|null} [guardData] CAuthentication_BeginAuthSessionViaCredentials_Request guardData
     * @property {number|null} [language] CAuthentication_BeginAuthSessionViaCredentials_Request language
     * @property {number|null} [qosLevel] CAuthentication_BeginAuthSessionViaCredentials_Request qosLevel
     */

    /**
     * Constructs a new CAuthentication_BeginAuthSessionViaCredentials_Request.
     * @exports CAuthentication_BeginAuthSessionViaCredentials_Request
     * @classdesc Represents a CAuthentication_BeginAuthSessionViaCredentials_Request.
     * @implements ICAuthentication_BeginAuthSessionViaCredentials_Request
     * @constructor
     * @param {ICAuthentication_BeginAuthSessionViaCredentials_Request=} [properties] Properties to set
     */
    function CAuthentication_BeginAuthSessionViaCredentials_Request(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * CAuthentication_BeginAuthSessionViaCredentials_Request deviceFriendlyName.
     * @member {string} deviceFriendlyName
     * @memberof CAuthentication_BeginAuthSessionViaCredentials_Request
     * @instance
     */
    CAuthentication_BeginAuthSessionViaCredentials_Request.prototype.deviceFriendlyName = "";

    /**
     * CAuthentication_BeginAuthSessionViaCredentials_Request accountName.
     * @member {string} accountName
     * @memberof CAuthentication_BeginAuthSessionViaCredentials_Request
     * @instance
     */
    CAuthentication_BeginAuthSessionViaCredentials_Request.prototype.accountName = "";

    /**
     * CAuthentication_BeginAuthSessionViaCredentials_Request encryptedPassword.
     * @member {string} encryptedPassword
     * @memberof CAuthentication_BeginAuthSessionViaCredentials_Request
     * @instance
     */
    CAuthentication_BeginAuthSessionViaCredentials_Request.prototype.encryptedPassword = "";

    /**
     * CAuthentication_BeginAuthSessionViaCredentials_Request encryptionTimestamp.
     * @member {Long} encryptionTimestamp
     * @memberof CAuthentication_BeginAuthSessionViaCredentials_Request
     * @instance
     */
    CAuthentication_BeginAuthSessionViaCredentials_Request.prototype.encryptionTimestamp = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

    /**
     * CAuthentication_BeginAuthSessionViaCredentials_Request rememberLogin.
     * @member {boolean} rememberLogin
     * @memberof CAuthentication_BeginAuthSessionViaCredentials_Request
     * @instance
     */
    CAuthentication_BeginAuthSessionViaCredentials_Request.prototype.rememberLogin = false;

    /**
     * CAuthentication_BeginAuthSessionViaCredentials_Request platformType.
     * @member {EAuthTokenPlatformType} platformType
     * @memberof CAuthentication_BeginAuthSessionViaCredentials_Request
     * @instance
     */
    CAuthentication_BeginAuthSessionViaCredentials_Request.prototype.platformType = 0;

    /**
     * CAuthentication_BeginAuthSessionViaCredentials_Request persistence.
     * @member {ESessionPersistence} persistence
     * @memberof CAuthentication_BeginAuthSessionViaCredentials_Request
     * @instance
     */
    CAuthentication_BeginAuthSessionViaCredentials_Request.prototype.persistence = 1;

    /**
     * CAuthentication_BeginAuthSessionViaCredentials_Request websiteId.
     * @member {string} websiteId
     * @memberof CAuthentication_BeginAuthSessionViaCredentials_Request
     * @instance
     */
    CAuthentication_BeginAuthSessionViaCredentials_Request.prototype.websiteId = "Unknown";

    /**
     * CAuthentication_BeginAuthSessionViaCredentials_Request deviceDetails.
     * @member {ICAuthentication_DeviceDetails|null|undefined} deviceDetails
     * @memberof CAuthentication_BeginAuthSessionViaCredentials_Request
     * @instance
     */
    CAuthentication_BeginAuthSessionViaCredentials_Request.prototype.deviceDetails = null;

    /**
     * CAuthentication_BeginAuthSessionViaCredentials_Request guardData.
     * @member {string} guardData
     * @memberof CAuthentication_BeginAuthSessionViaCredentials_Request
     * @instance
     */
    CAuthentication_BeginAuthSessionViaCredentials_Request.prototype.guardData = "";

    /**
     * CAuthentication_BeginAuthSessionViaCredentials_Request language.
     * @member {number} language
     * @memberof CAuthentication_BeginAuthSessionViaCredentials_Request
     * @instance
     */
    CAuthentication_BeginAuthSessionViaCredentials_Request.prototype.language = 0;

    /**
     * CAuthentication_BeginAuthSessionViaCredentials_Request qosLevel.
     * @member {number} qosLevel
     * @memberof CAuthentication_BeginAuthSessionViaCredentials_Request
     * @instance
     */
    CAuthentication_BeginAuthSessionViaCredentials_Request.prototype.qosLevel = 2;

    /**
     * Creates a new CAuthentication_BeginAuthSessionViaCredentials_Request instance using the specified properties.
     * @function create
     * @memberof CAuthentication_BeginAuthSessionViaCredentials_Request
     * @static
     * @param {ICAuthentication_BeginAuthSessionViaCredentials_Request=} [properties] Properties to set
     * @returns {CAuthentication_BeginAuthSessionViaCredentials_Request} CAuthentication_BeginAuthSessionViaCredentials_Request instance
     */
    CAuthentication_BeginAuthSessionViaCredentials_Request.create = function create(properties) {
        return new CAuthentication_BeginAuthSessionViaCredentials_Request(properties);
    };

    /**
     * Encodes the specified CAuthentication_BeginAuthSessionViaCredentials_Request message. Does not implicitly {@link CAuthentication_BeginAuthSessionViaCredentials_Request.verify|verify} messages.
     * @function encode
     * @memberof CAuthentication_BeginAuthSessionViaCredentials_Request
     * @static
     * @param {ICAuthentication_BeginAuthSessionViaCredentials_Request} message CAuthentication_BeginAuthSessionViaCredentials_Request message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CAuthentication_BeginAuthSessionViaCredentials_Request.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.deviceFriendlyName != null && Object.hasOwnProperty.call(message, "deviceFriendlyName"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.deviceFriendlyName);
        if (message.accountName != null && Object.hasOwnProperty.call(message, "accountName"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.accountName);
        if (message.encryptedPassword != null && Object.hasOwnProperty.call(message, "encryptedPassword"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.encryptedPassword);
        if (message.encryptionTimestamp != null && Object.hasOwnProperty.call(message, "encryptionTimestamp"))
            writer.uint32(/* id 4, wireType 0 =*/32).uint64(message.encryptionTimestamp);
        if (message.rememberLogin != null && Object.hasOwnProperty.call(message, "rememberLogin"))
            writer.uint32(/* id 5, wireType 0 =*/40).bool(message.rememberLogin);
        if (message.platformType != null && Object.hasOwnProperty.call(message, "platformType"))
            writer.uint32(/* id 6, wireType 0 =*/48).int32(message.platformType);
        if (message.persistence != null && Object.hasOwnProperty.call(message, "persistence"))
            writer.uint32(/* id 7, wireType 0 =*/56).int32(message.persistence);
        if (message.websiteId != null && Object.hasOwnProperty.call(message, "websiteId"))
            writer.uint32(/* id 8, wireType 2 =*/66).string(message.websiteId);
        if (message.deviceDetails != null && Object.hasOwnProperty.call(message, "deviceDetails"))
            $root.CAuthentication_DeviceDetails.encode(message.deviceDetails, writer.uint32(/* id 9, wireType 2 =*/74).fork()).ldelim();
        if (message.guardData != null && Object.hasOwnProperty.call(message, "guardData"))
            writer.uint32(/* id 10, wireType 2 =*/82).string(message.guardData);
        if (message.language != null && Object.hasOwnProperty.call(message, "language"))
            writer.uint32(/* id 11, wireType 0 =*/88).uint32(message.language);
        if (message.qosLevel != null && Object.hasOwnProperty.call(message, "qosLevel"))
            writer.uint32(/* id 12, wireType 0 =*/96).int32(message.qosLevel);
        return writer;
    };

    /**
     * Encodes the specified CAuthentication_BeginAuthSessionViaCredentials_Request message, length delimited. Does not implicitly {@link CAuthentication_BeginAuthSessionViaCredentials_Request.verify|verify} messages.
     * @function encodeDelimited
     * @memberof CAuthentication_BeginAuthSessionViaCredentials_Request
     * @static
     * @param {ICAuthentication_BeginAuthSessionViaCredentials_Request} message CAuthentication_BeginAuthSessionViaCredentials_Request message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CAuthentication_BeginAuthSessionViaCredentials_Request.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a CAuthentication_BeginAuthSessionViaCredentials_Request message from the specified reader or buffer.
     * @function decode
     * @memberof CAuthentication_BeginAuthSessionViaCredentials_Request
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {CAuthentication_BeginAuthSessionViaCredentials_Request} CAuthentication_BeginAuthSessionViaCredentials_Request
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CAuthentication_BeginAuthSessionViaCredentials_Request.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.CAuthentication_BeginAuthSessionViaCredentials_Request();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    message.deviceFriendlyName = reader.string();
                    break;
                }
            case 2: {
                    message.accountName = reader.string();
                    break;
                }
            case 3: {
                    message.encryptedPassword = reader.string();
                    break;
                }
            case 4: {
                    message.encryptionTimestamp = reader.uint64();
                    break;
                }
            case 5: {
                    message.rememberLogin = reader.bool();
                    break;
                }
            case 6: {
                    message.platformType = reader.int32();
                    break;
                }
            case 7: {
                    message.persistence = reader.int32();
                    break;
                }
            case 8: {
                    message.websiteId = reader.string();
                    break;
                }
            case 9: {
                    message.deviceDetails = $root.CAuthentication_DeviceDetails.decode(reader, reader.uint32());
                    break;
                }
            case 10: {
                    message.guardData = reader.string();
                    break;
                }
            case 11: {
                    message.language = reader.uint32();
                    break;
                }
            case 12: {
                    message.qosLevel = reader.int32();
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a CAuthentication_BeginAuthSessionViaCredentials_Request message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof CAuthentication_BeginAuthSessionViaCredentials_Request
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {CAuthentication_BeginAuthSessionViaCredentials_Request} CAuthentication_BeginAuthSessionViaCredentials_Request
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CAuthentication_BeginAuthSessionViaCredentials_Request.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a CAuthentication_BeginAuthSessionViaCredentials_Request message.
     * @function verify
     * @memberof CAuthentication_BeginAuthSessionViaCredentials_Request
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    CAuthentication_BeginAuthSessionViaCredentials_Request.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.deviceFriendlyName != null && message.hasOwnProperty("deviceFriendlyName"))
            if (!$util.isString(message.deviceFriendlyName))
                return "deviceFriendlyName: string expected";
        if (message.accountName != null && message.hasOwnProperty("accountName"))
            if (!$util.isString(message.accountName))
                return "accountName: string expected";
        if (message.encryptedPassword != null && message.hasOwnProperty("encryptedPassword"))
            if (!$util.isString(message.encryptedPassword))
                return "encryptedPassword: string expected";
        if (message.encryptionTimestamp != null && message.hasOwnProperty("encryptionTimestamp"))
            if (!$util.isInteger(message.encryptionTimestamp) && !(message.encryptionTimestamp && $util.isInteger(message.encryptionTimestamp.low) && $util.isInteger(message.encryptionTimestamp.high)))
                return "encryptionTimestamp: integer|Long expected";
        if (message.rememberLogin != null && message.hasOwnProperty("rememberLogin"))
            if (typeof message.rememberLogin !== "boolean")
                return "rememberLogin: boolean expected";
        if (message.platformType != null && message.hasOwnProperty("platformType"))
            switch (message.platformType) {
            default:
                return "platformType: enum value expected";
            case 0:
            case 1:
            case 2:
            case 3:
                break;
            }
        if (message.persistence != null && message.hasOwnProperty("persistence"))
            switch (message.persistence) {
            default:
                return "persistence: enum value expected";
            case -1:
            case 0:
            case 1:
                break;
            }
        if (message.websiteId != null && message.hasOwnProperty("websiteId"))
            if (!$util.isString(message.websiteId))
                return "websiteId: string expected";
        if (message.deviceDetails != null && message.hasOwnProperty("deviceDetails")) {
            let error = $root.CAuthentication_DeviceDetails.verify(message.deviceDetails);
            if (error)
                return "deviceDetails." + error;
        }
        if (message.guardData != null && message.hasOwnProperty("guardData"))
            if (!$util.isString(message.guardData))
                return "guardData: string expected";
        if (message.language != null && message.hasOwnProperty("language"))
            if (!$util.isInteger(message.language))
                return "language: integer expected";
        if (message.qosLevel != null && message.hasOwnProperty("qosLevel"))
            if (!$util.isInteger(message.qosLevel))
                return "qosLevel: integer expected";
        return null;
    };

    /**
     * Creates a CAuthentication_BeginAuthSessionViaCredentials_Request message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof CAuthentication_BeginAuthSessionViaCredentials_Request
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {CAuthentication_BeginAuthSessionViaCredentials_Request} CAuthentication_BeginAuthSessionViaCredentials_Request
     */
    CAuthentication_BeginAuthSessionViaCredentials_Request.fromObject = function fromObject(object) {
        if (object instanceof $root.CAuthentication_BeginAuthSessionViaCredentials_Request)
            return object;
        let message = new $root.CAuthentication_BeginAuthSessionViaCredentials_Request();
        if (object.deviceFriendlyName != null)
            message.deviceFriendlyName = String(object.deviceFriendlyName);
        if (object.accountName != null)
            message.accountName = String(object.accountName);
        if (object.encryptedPassword != null)
            message.encryptedPassword = String(object.encryptedPassword);
        if (object.encryptionTimestamp != null)
            if ($util.Long)
                (message.encryptionTimestamp = $util.Long.fromValue(object.encryptionTimestamp)).unsigned = true;
            else if (typeof object.encryptionTimestamp === "string")
                message.encryptionTimestamp = parseInt(object.encryptionTimestamp, 10);
            else if (typeof object.encryptionTimestamp === "number")
                message.encryptionTimestamp = object.encryptionTimestamp;
            else if (typeof object.encryptionTimestamp === "object")
                message.encryptionTimestamp = new $util.LongBits(object.encryptionTimestamp.low >>> 0, object.encryptionTimestamp.high >>> 0).toNumber(true);
        if (object.rememberLogin != null)
            message.rememberLogin = Boolean(object.rememberLogin);
        switch (object.platformType) {
        default:
            if (typeof object.platformType === "number") {
                message.platformType = object.platformType;
                break;
            }
            break;
        case "k_EAuthTokenPlatformType_Unknown":
        case 0:
            message.platformType = 0;
            break;
        case "k_EAuthTokenPlatformType_SteamClient":
        case 1:
            message.platformType = 1;
            break;
        case "k_EAuthTokenPlatformType_WebBrowser":
        case 2:
            message.platformType = 2;
            break;
        case "k_EAuthTokenPlatformType_MobileApp":
        case 3:
            message.platformType = 3;
            break;
        }
        switch (object.persistence) {
        case "k_ESessionPersistence_Invalid":
        case -1:
            message.persistence = -1;
            break;
        case "k_ESessionPersistence_Ephemeral":
        case 0:
            message.persistence = 0;
            break;
        default:
            if (typeof object.persistence === "number") {
                message.persistence = object.persistence;
                break;
            }
            break;
        case "k_ESessionPersistence_Persistent":
        case 1:
            message.persistence = 1;
            break;
        }
        if (object.websiteId != null)
            message.websiteId = String(object.websiteId);
        if (object.deviceDetails != null) {
            if (typeof object.deviceDetails !== "object")
                throw TypeError(".CAuthentication_BeginAuthSessionViaCredentials_Request.deviceDetails: object expected");
            message.deviceDetails = $root.CAuthentication_DeviceDetails.fromObject(object.deviceDetails);
        }
        if (object.guardData != null)
            message.guardData = String(object.guardData);
        if (object.language != null)
            message.language = object.language >>> 0;
        if (object.qosLevel != null)
            message.qosLevel = object.qosLevel | 0;
        return message;
    };

    /**
     * Creates a plain object from a CAuthentication_BeginAuthSessionViaCredentials_Request message. Also converts values to other types if specified.
     * @function toObject
     * @memberof CAuthentication_BeginAuthSessionViaCredentials_Request
     * @static
     * @param {CAuthentication_BeginAuthSessionViaCredentials_Request} message CAuthentication_BeginAuthSessionViaCredentials_Request
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    CAuthentication_BeginAuthSessionViaCredentials_Request.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.deviceFriendlyName = "";
            object.accountName = "";
            object.encryptedPassword = "";
            if ($util.Long) {
                let long = new $util.Long(0, 0, true);
                object.encryptionTimestamp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.encryptionTimestamp = options.longs === String ? "0" : 0;
            object.rememberLogin = false;
            object.platformType = options.enums === String ? "k_EAuthTokenPlatformType_Unknown" : 0;
            object.persistence = options.enums === String ? "k_ESessionPersistence_Persistent" : 1;
            object.websiteId = "Unknown";
            object.deviceDetails = null;
            object.guardData = "";
            object.language = 0;
            object.qosLevel = 2;
        }
        if (message.deviceFriendlyName != null && message.hasOwnProperty("deviceFriendlyName"))
            object.deviceFriendlyName = message.deviceFriendlyName;
        if (message.accountName != null && message.hasOwnProperty("accountName"))
            object.accountName = message.accountName;
        if (message.encryptedPassword != null && message.hasOwnProperty("encryptedPassword"))
            object.encryptedPassword = message.encryptedPassword;
        if (message.encryptionTimestamp != null && message.hasOwnProperty("encryptionTimestamp"))
            if (typeof message.encryptionTimestamp === "number")
                object.encryptionTimestamp = options.longs === String ? String(message.encryptionTimestamp) : message.encryptionTimestamp;
            else
                object.encryptionTimestamp = options.longs === String ? $util.Long.prototype.toString.call(message.encryptionTimestamp) : options.longs === Number ? new $util.LongBits(message.encryptionTimestamp.low >>> 0, message.encryptionTimestamp.high >>> 0).toNumber(true) : message.encryptionTimestamp;
        if (message.rememberLogin != null && message.hasOwnProperty("rememberLogin"))
            object.rememberLogin = message.rememberLogin;
        if (message.platformType != null && message.hasOwnProperty("platformType"))
            object.platformType = options.enums === String ? $root.EAuthTokenPlatformType[message.platformType] === undefined ? message.platformType : $root.EAuthTokenPlatformType[message.platformType] : message.platformType;
        if (message.persistence != null && message.hasOwnProperty("persistence"))
            object.persistence = options.enums === String ? $root.ESessionPersistence[message.persistence] === undefined ? message.persistence : $root.ESessionPersistence[message.persistence] : message.persistence;
        if (message.websiteId != null && message.hasOwnProperty("websiteId"))
            object.websiteId = message.websiteId;
        if (message.deviceDetails != null && message.hasOwnProperty("deviceDetails"))
            object.deviceDetails = $root.CAuthentication_DeviceDetails.toObject(message.deviceDetails, options);
        if (message.guardData != null && message.hasOwnProperty("guardData"))
            object.guardData = message.guardData;
        if (message.language != null && message.hasOwnProperty("language"))
            object.language = message.language;
        if (message.qosLevel != null && message.hasOwnProperty("qosLevel"))
            object.qosLevel = message.qosLevel;
        return object;
    };

    /**
     * Converts this CAuthentication_BeginAuthSessionViaCredentials_Request to JSON.
     * @function toJSON
     * @memberof CAuthentication_BeginAuthSessionViaCredentials_Request
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    CAuthentication_BeginAuthSessionViaCredentials_Request.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for CAuthentication_BeginAuthSessionViaCredentials_Request
     * @function getTypeUrl
     * @memberof CAuthentication_BeginAuthSessionViaCredentials_Request
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    CAuthentication_BeginAuthSessionViaCredentials_Request.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/CAuthentication_BeginAuthSessionViaCredentials_Request";
    };

    return CAuthentication_BeginAuthSessionViaCredentials_Request;
})();

export const CAuthentication_BeginAuthSessionViaCredentials_Response = $root.CAuthentication_BeginAuthSessionViaCredentials_Response = (() => {

    /**
     * Properties of a CAuthentication_BeginAuthSessionViaCredentials_Response.
     * @exports ICAuthentication_BeginAuthSessionViaCredentials_Response
     * @interface ICAuthentication_BeginAuthSessionViaCredentials_Response
     * @property {Long|null} [clientId] CAuthentication_BeginAuthSessionViaCredentials_Response clientId
     * @property {Uint8Array|null} [requestId] CAuthentication_BeginAuthSessionViaCredentials_Response requestId
     * @property {number|null} [interval] CAuthentication_BeginAuthSessionViaCredentials_Response interval
     * @property {Array.<ICAuthentication_AllowedConfirmation>|null} [allowedConfirmations] CAuthentication_BeginAuthSessionViaCredentials_Response allowedConfirmations
     * @property {Long|null} [steamid] CAuthentication_BeginAuthSessionViaCredentials_Response steamid
     * @property {string|null} [weakToken] CAuthentication_BeginAuthSessionViaCredentials_Response weakToken
     * @property {string|null} [agreementSessionUrl] CAuthentication_BeginAuthSessionViaCredentials_Response agreementSessionUrl
     * @property {string|null} [extendedErrorMessage] CAuthentication_BeginAuthSessionViaCredentials_Response extendedErrorMessage
     */

    /**
     * Constructs a new CAuthentication_BeginAuthSessionViaCredentials_Response.
     * @exports CAuthentication_BeginAuthSessionViaCredentials_Response
     * @classdesc Represents a CAuthentication_BeginAuthSessionViaCredentials_Response.
     * @implements ICAuthentication_BeginAuthSessionViaCredentials_Response
     * @constructor
     * @param {ICAuthentication_BeginAuthSessionViaCredentials_Response=} [properties] Properties to set
     */
    function CAuthentication_BeginAuthSessionViaCredentials_Response(properties) {
        this.allowedConfirmations = [];
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * CAuthentication_BeginAuthSessionViaCredentials_Response clientId.
     * @member {Long} clientId
     * @memberof CAuthentication_BeginAuthSessionViaCredentials_Response
     * @instance
     */
    CAuthentication_BeginAuthSessionViaCredentials_Response.prototype.clientId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

    /**
     * CAuthentication_BeginAuthSessionViaCredentials_Response requestId.
     * @member {Uint8Array} requestId
     * @memberof CAuthentication_BeginAuthSessionViaCredentials_Response
     * @instance
     */
    CAuthentication_BeginAuthSessionViaCredentials_Response.prototype.requestId = $util.newBuffer([]);

    /**
     * CAuthentication_BeginAuthSessionViaCredentials_Response interval.
     * @member {number} interval
     * @memberof CAuthentication_BeginAuthSessionViaCredentials_Response
     * @instance
     */
    CAuthentication_BeginAuthSessionViaCredentials_Response.prototype.interval = 0;

    /**
     * CAuthentication_BeginAuthSessionViaCredentials_Response allowedConfirmations.
     * @member {Array.<ICAuthentication_AllowedConfirmation>} allowedConfirmations
     * @memberof CAuthentication_BeginAuthSessionViaCredentials_Response
     * @instance
     */
    CAuthentication_BeginAuthSessionViaCredentials_Response.prototype.allowedConfirmations = $util.emptyArray;

    /**
     * CAuthentication_BeginAuthSessionViaCredentials_Response steamid.
     * @member {Long} steamid
     * @memberof CAuthentication_BeginAuthSessionViaCredentials_Response
     * @instance
     */
    CAuthentication_BeginAuthSessionViaCredentials_Response.prototype.steamid = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

    /**
     * CAuthentication_BeginAuthSessionViaCredentials_Response weakToken.
     * @member {string} weakToken
     * @memberof CAuthentication_BeginAuthSessionViaCredentials_Response
     * @instance
     */
    CAuthentication_BeginAuthSessionViaCredentials_Response.prototype.weakToken = "";

    /**
     * CAuthentication_BeginAuthSessionViaCredentials_Response agreementSessionUrl.
     * @member {string} agreementSessionUrl
     * @memberof CAuthentication_BeginAuthSessionViaCredentials_Response
     * @instance
     */
    CAuthentication_BeginAuthSessionViaCredentials_Response.prototype.agreementSessionUrl = "";

    /**
     * CAuthentication_BeginAuthSessionViaCredentials_Response extendedErrorMessage.
     * @member {string} extendedErrorMessage
     * @memberof CAuthentication_BeginAuthSessionViaCredentials_Response
     * @instance
     */
    CAuthentication_BeginAuthSessionViaCredentials_Response.prototype.extendedErrorMessage = "";

    /**
     * Creates a new CAuthentication_BeginAuthSessionViaCredentials_Response instance using the specified properties.
     * @function create
     * @memberof CAuthentication_BeginAuthSessionViaCredentials_Response
     * @static
     * @param {ICAuthentication_BeginAuthSessionViaCredentials_Response=} [properties] Properties to set
     * @returns {CAuthentication_BeginAuthSessionViaCredentials_Response} CAuthentication_BeginAuthSessionViaCredentials_Response instance
     */
    CAuthentication_BeginAuthSessionViaCredentials_Response.create = function create(properties) {
        return new CAuthentication_BeginAuthSessionViaCredentials_Response(properties);
    };

    /**
     * Encodes the specified CAuthentication_BeginAuthSessionViaCredentials_Response message. Does not implicitly {@link CAuthentication_BeginAuthSessionViaCredentials_Response.verify|verify} messages.
     * @function encode
     * @memberof CAuthentication_BeginAuthSessionViaCredentials_Response
     * @static
     * @param {ICAuthentication_BeginAuthSessionViaCredentials_Response} message CAuthentication_BeginAuthSessionViaCredentials_Response message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CAuthentication_BeginAuthSessionViaCredentials_Response.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.clientId != null && Object.hasOwnProperty.call(message, "clientId"))
            writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.clientId);
        if (message.requestId != null && Object.hasOwnProperty.call(message, "requestId"))
            writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.requestId);
        if (message.interval != null && Object.hasOwnProperty.call(message, "interval"))
            writer.uint32(/* id 3, wireType 5 =*/29).float(message.interval);
        if (message.allowedConfirmations != null && message.allowedConfirmations.length)
            for (let i = 0; i < message.allowedConfirmations.length; ++i)
                $root.CAuthentication_AllowedConfirmation.encode(message.allowedConfirmations[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
        if (message.steamid != null && Object.hasOwnProperty.call(message, "steamid"))
            writer.uint32(/* id 5, wireType 0 =*/40).uint64(message.steamid);
        if (message.weakToken != null && Object.hasOwnProperty.call(message, "weakToken"))
            writer.uint32(/* id 6, wireType 2 =*/50).string(message.weakToken);
        if (message.agreementSessionUrl != null && Object.hasOwnProperty.call(message, "agreementSessionUrl"))
            writer.uint32(/* id 7, wireType 2 =*/58).string(message.agreementSessionUrl);
        if (message.extendedErrorMessage != null && Object.hasOwnProperty.call(message, "extendedErrorMessage"))
            writer.uint32(/* id 8, wireType 2 =*/66).string(message.extendedErrorMessage);
        return writer;
    };

    /**
     * Encodes the specified CAuthentication_BeginAuthSessionViaCredentials_Response message, length delimited. Does not implicitly {@link CAuthentication_BeginAuthSessionViaCredentials_Response.verify|verify} messages.
     * @function encodeDelimited
     * @memberof CAuthentication_BeginAuthSessionViaCredentials_Response
     * @static
     * @param {ICAuthentication_BeginAuthSessionViaCredentials_Response} message CAuthentication_BeginAuthSessionViaCredentials_Response message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CAuthentication_BeginAuthSessionViaCredentials_Response.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a CAuthentication_BeginAuthSessionViaCredentials_Response message from the specified reader or buffer.
     * @function decode
     * @memberof CAuthentication_BeginAuthSessionViaCredentials_Response
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {CAuthentication_BeginAuthSessionViaCredentials_Response} CAuthentication_BeginAuthSessionViaCredentials_Response
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CAuthentication_BeginAuthSessionViaCredentials_Response.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.CAuthentication_BeginAuthSessionViaCredentials_Response();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    message.clientId = reader.uint64();
                    break;
                }
            case 2: {
                    message.requestId = reader.bytes();
                    break;
                }
            case 3: {
                    message.interval = reader.float();
                    break;
                }
            case 4: {
                    if (!(message.allowedConfirmations && message.allowedConfirmations.length))
                        message.allowedConfirmations = [];
                    message.allowedConfirmations.push($root.CAuthentication_AllowedConfirmation.decode(reader, reader.uint32()));
                    break;
                }
            case 5: {
                    message.steamid = reader.uint64();
                    break;
                }
            case 6: {
                    message.weakToken = reader.string();
                    break;
                }
            case 7: {
                    message.agreementSessionUrl = reader.string();
                    break;
                }
            case 8: {
                    message.extendedErrorMessage = reader.string();
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a CAuthentication_BeginAuthSessionViaCredentials_Response message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof CAuthentication_BeginAuthSessionViaCredentials_Response
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {CAuthentication_BeginAuthSessionViaCredentials_Response} CAuthentication_BeginAuthSessionViaCredentials_Response
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CAuthentication_BeginAuthSessionViaCredentials_Response.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a CAuthentication_BeginAuthSessionViaCredentials_Response message.
     * @function verify
     * @memberof CAuthentication_BeginAuthSessionViaCredentials_Response
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    CAuthentication_BeginAuthSessionViaCredentials_Response.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.clientId != null && message.hasOwnProperty("clientId"))
            if (!$util.isInteger(message.clientId) && !(message.clientId && $util.isInteger(message.clientId.low) && $util.isInteger(message.clientId.high)))
                return "clientId: integer|Long expected";
        if (message.requestId != null && message.hasOwnProperty("requestId"))
            if (!(message.requestId && typeof message.requestId.length === "number" || $util.isString(message.requestId)))
                return "requestId: buffer expected";
        if (message.interval != null && message.hasOwnProperty("interval"))
            if (typeof message.interval !== "number")
                return "interval: number expected";
        if (message.allowedConfirmations != null && message.hasOwnProperty("allowedConfirmations")) {
            if (!Array.isArray(message.allowedConfirmations))
                return "allowedConfirmations: array expected";
            for (let i = 0; i < message.allowedConfirmations.length; ++i) {
                let error = $root.CAuthentication_AllowedConfirmation.verify(message.allowedConfirmations[i]);
                if (error)
                    return "allowedConfirmations." + error;
            }
        }
        if (message.steamid != null && message.hasOwnProperty("steamid"))
            if (!$util.isInteger(message.steamid) && !(message.steamid && $util.isInteger(message.steamid.low) && $util.isInteger(message.steamid.high)))
                return "steamid: integer|Long expected";
        if (message.weakToken != null && message.hasOwnProperty("weakToken"))
            if (!$util.isString(message.weakToken))
                return "weakToken: string expected";
        if (message.agreementSessionUrl != null && message.hasOwnProperty("agreementSessionUrl"))
            if (!$util.isString(message.agreementSessionUrl))
                return "agreementSessionUrl: string expected";
        if (message.extendedErrorMessage != null && message.hasOwnProperty("extendedErrorMessage"))
            if (!$util.isString(message.extendedErrorMessage))
                return "extendedErrorMessage: string expected";
        return null;
    };

    /**
     * Creates a CAuthentication_BeginAuthSessionViaCredentials_Response message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof CAuthentication_BeginAuthSessionViaCredentials_Response
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {CAuthentication_BeginAuthSessionViaCredentials_Response} CAuthentication_BeginAuthSessionViaCredentials_Response
     */
    CAuthentication_BeginAuthSessionViaCredentials_Response.fromObject = function fromObject(object) {
        if (object instanceof $root.CAuthentication_BeginAuthSessionViaCredentials_Response)
            return object;
        let message = new $root.CAuthentication_BeginAuthSessionViaCredentials_Response();
        if (object.clientId != null)
            if ($util.Long)
                (message.clientId = $util.Long.fromValue(object.clientId)).unsigned = true;
            else if (typeof object.clientId === "string")
                message.clientId = parseInt(object.clientId, 10);
            else if (typeof object.clientId === "number")
                message.clientId = object.clientId;
            else if (typeof object.clientId === "object")
                message.clientId = new $util.LongBits(object.clientId.low >>> 0, object.clientId.high >>> 0).toNumber(true);
        if (object.requestId != null)
            if (typeof object.requestId === "string")
                $util.base64.decode(object.requestId, message.requestId = $util.newBuffer($util.base64.length(object.requestId)), 0);
            else if (object.requestId.length >= 0)
                message.requestId = object.requestId;
        if (object.interval != null)
            message.interval = Number(object.interval);
        if (object.allowedConfirmations) {
            if (!Array.isArray(object.allowedConfirmations))
                throw TypeError(".CAuthentication_BeginAuthSessionViaCredentials_Response.allowedConfirmations: array expected");
            message.allowedConfirmations = [];
            for (let i = 0; i < object.allowedConfirmations.length; ++i) {
                if (typeof object.allowedConfirmations[i] !== "object")
                    throw TypeError(".CAuthentication_BeginAuthSessionViaCredentials_Response.allowedConfirmations: object expected");
                message.allowedConfirmations[i] = $root.CAuthentication_AllowedConfirmation.fromObject(object.allowedConfirmations[i]);
            }
        }
        if (object.steamid != null)
            if ($util.Long)
                (message.steamid = $util.Long.fromValue(object.steamid)).unsigned = true;
            else if (typeof object.steamid === "string")
                message.steamid = parseInt(object.steamid, 10);
            else if (typeof object.steamid === "number")
                message.steamid = object.steamid;
            else if (typeof object.steamid === "object")
                message.steamid = new $util.LongBits(object.steamid.low >>> 0, object.steamid.high >>> 0).toNumber(true);
        if (object.weakToken != null)
            message.weakToken = String(object.weakToken);
        if (object.agreementSessionUrl != null)
            message.agreementSessionUrl = String(object.agreementSessionUrl);
        if (object.extendedErrorMessage != null)
            message.extendedErrorMessage = String(object.extendedErrorMessage);
        return message;
    };

    /**
     * Creates a plain object from a CAuthentication_BeginAuthSessionViaCredentials_Response message. Also converts values to other types if specified.
     * @function toObject
     * @memberof CAuthentication_BeginAuthSessionViaCredentials_Response
     * @static
     * @param {CAuthentication_BeginAuthSessionViaCredentials_Response} message CAuthentication_BeginAuthSessionViaCredentials_Response
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    CAuthentication_BeginAuthSessionViaCredentials_Response.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.arrays || options.defaults)
            object.allowedConfirmations = [];
        if (options.defaults) {
            if ($util.Long) {
                let long = new $util.Long(0, 0, true);
                object.clientId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.clientId = options.longs === String ? "0" : 0;
            if (options.bytes === String)
                object.requestId = "";
            else {
                object.requestId = [];
                if (options.bytes !== Array)
                    object.requestId = $util.newBuffer(object.requestId);
            }
            object.interval = 0;
            if ($util.Long) {
                let long = new $util.Long(0, 0, true);
                object.steamid = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.steamid = options.longs === String ? "0" : 0;
            object.weakToken = "";
            object.agreementSessionUrl = "";
            object.extendedErrorMessage = "";
        }
        if (message.clientId != null && message.hasOwnProperty("clientId"))
            if (typeof message.clientId === "number")
                object.clientId = options.longs === String ? String(message.clientId) : message.clientId;
            else
                object.clientId = options.longs === String ? $util.Long.prototype.toString.call(message.clientId) : options.longs === Number ? new $util.LongBits(message.clientId.low >>> 0, message.clientId.high >>> 0).toNumber(true) : message.clientId;
        if (message.requestId != null && message.hasOwnProperty("requestId"))
            object.requestId = options.bytes === String ? $util.base64.encode(message.requestId, 0, message.requestId.length) : options.bytes === Array ? Array.prototype.slice.call(message.requestId) : message.requestId;
        if (message.interval != null && message.hasOwnProperty("interval"))
            object.interval = options.json && !isFinite(message.interval) ? String(message.interval) : message.interval;
        if (message.allowedConfirmations && message.allowedConfirmations.length) {
            object.allowedConfirmations = [];
            for (let j = 0; j < message.allowedConfirmations.length; ++j)
                object.allowedConfirmations[j] = $root.CAuthentication_AllowedConfirmation.toObject(message.allowedConfirmations[j], options);
        }
        if (message.steamid != null && message.hasOwnProperty("steamid"))
            if (typeof message.steamid === "number")
                object.steamid = options.longs === String ? String(message.steamid) : message.steamid;
            else
                object.steamid = options.longs === String ? $util.Long.prototype.toString.call(message.steamid) : options.longs === Number ? new $util.LongBits(message.steamid.low >>> 0, message.steamid.high >>> 0).toNumber(true) : message.steamid;
        if (message.weakToken != null && message.hasOwnProperty("weakToken"))
            object.weakToken = message.weakToken;
        if (message.agreementSessionUrl != null && message.hasOwnProperty("agreementSessionUrl"))
            object.agreementSessionUrl = message.agreementSessionUrl;
        if (message.extendedErrorMessage != null && message.hasOwnProperty("extendedErrorMessage"))
            object.extendedErrorMessage = message.extendedErrorMessage;
        return object;
    };

    /**
     * Converts this CAuthentication_BeginAuthSessionViaCredentials_Response to JSON.
     * @function toJSON
     * @memberof CAuthentication_BeginAuthSessionViaCredentials_Response
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    CAuthentication_BeginAuthSessionViaCredentials_Response.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for CAuthentication_BeginAuthSessionViaCredentials_Response
     * @function getTypeUrl
     * @memberof CAuthentication_BeginAuthSessionViaCredentials_Response
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    CAuthentication_BeginAuthSessionViaCredentials_Response.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/CAuthentication_BeginAuthSessionViaCredentials_Response";
    };

    return CAuthentication_BeginAuthSessionViaCredentials_Response;
})();

export const CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request = $root.CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request = (() => {

    /**
     * Properties of a CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request.
     * @exports ICAuthentication_UpdateAuthSessionWithSteamGuardCode_Request
     * @interface ICAuthentication_UpdateAuthSessionWithSteamGuardCode_Request
     * @property {Long|null} [clientId] CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request clientId
     * @property {Long|null} [steamid] CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request steamid
     * @property {string|null} [code] CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request code
     * @property {EAuthSessionGuardType|null} [codeType] CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request codeType
     */

    /**
     * Constructs a new CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request.
     * @exports CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request
     * @classdesc Represents a CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request.
     * @implements ICAuthentication_UpdateAuthSessionWithSteamGuardCode_Request
     * @constructor
     * @param {ICAuthentication_UpdateAuthSessionWithSteamGuardCode_Request=} [properties] Properties to set
     */
    function CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request clientId.
     * @member {Long} clientId
     * @memberof CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request
     * @instance
     */
    CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request.prototype.clientId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

    /**
     * CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request steamid.
     * @member {Long} steamid
     * @memberof CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request
     * @instance
     */
    CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request.prototype.steamid = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request code.
     * @member {string} code
     * @memberof CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request
     * @instance
     */
    CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request.prototype.code = "";

    /**
     * CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request codeType.
     * @member {EAuthSessionGuardType} codeType
     * @memberof CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request
     * @instance
     */
    CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request.prototype.codeType = 0;

    /**
     * Creates a new CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request instance using the specified properties.
     * @function create
     * @memberof CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request
     * @static
     * @param {ICAuthentication_UpdateAuthSessionWithSteamGuardCode_Request=} [properties] Properties to set
     * @returns {CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request} CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request instance
     */
    CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request.create = function create(properties) {
        return new CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request(properties);
    };

    /**
     * Encodes the specified CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request message. Does not implicitly {@link CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request.verify|verify} messages.
     * @function encode
     * @memberof CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request
     * @static
     * @param {ICAuthentication_UpdateAuthSessionWithSteamGuardCode_Request} message CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.clientId != null && Object.hasOwnProperty.call(message, "clientId"))
            writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.clientId);
        if (message.steamid != null && Object.hasOwnProperty.call(message, "steamid"))
            writer.uint32(/* id 2, wireType 1 =*/17).fixed64(message.steamid);
        if (message.code != null && Object.hasOwnProperty.call(message, "code"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.code);
        if (message.codeType != null && Object.hasOwnProperty.call(message, "codeType"))
            writer.uint32(/* id 4, wireType 0 =*/32).int32(message.codeType);
        return writer;
    };

    /**
     * Encodes the specified CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request message, length delimited. Does not implicitly {@link CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request.verify|verify} messages.
     * @function encodeDelimited
     * @memberof CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request
     * @static
     * @param {ICAuthentication_UpdateAuthSessionWithSteamGuardCode_Request} message CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request message from the specified reader or buffer.
     * @function decode
     * @memberof CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request} CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    message.clientId = reader.uint64();
                    break;
                }
            case 2: {
                    message.steamid = reader.fixed64();
                    break;
                }
            case 3: {
                    message.code = reader.string();
                    break;
                }
            case 4: {
                    message.codeType = reader.int32();
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request} CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request message.
     * @function verify
     * @memberof CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.clientId != null && message.hasOwnProperty("clientId"))
            if (!$util.isInteger(message.clientId) && !(message.clientId && $util.isInteger(message.clientId.low) && $util.isInteger(message.clientId.high)))
                return "clientId: integer|Long expected";
        if (message.steamid != null && message.hasOwnProperty("steamid"))
            if (!$util.isInteger(message.steamid) && !(message.steamid && $util.isInteger(message.steamid.low) && $util.isInteger(message.steamid.high)))
                return "steamid: integer|Long expected";
        if (message.code != null && message.hasOwnProperty("code"))
            if (!$util.isString(message.code))
                return "code: string expected";
        if (message.codeType != null && message.hasOwnProperty("codeType"))
            switch (message.codeType) {
            default:
                return "codeType: enum value expected";
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
                break;
            }
        return null;
    };

    /**
     * Creates a CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request} CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request
     */
    CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request.fromObject = function fromObject(object) {
        if (object instanceof $root.CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request)
            return object;
        let message = new $root.CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request();
        if (object.clientId != null)
            if ($util.Long)
                (message.clientId = $util.Long.fromValue(object.clientId)).unsigned = true;
            else if (typeof object.clientId === "string")
                message.clientId = parseInt(object.clientId, 10);
            else if (typeof object.clientId === "number")
                message.clientId = object.clientId;
            else if (typeof object.clientId === "object")
                message.clientId = new $util.LongBits(object.clientId.low >>> 0, object.clientId.high >>> 0).toNumber(true);
        if (object.steamid != null)
            if ($util.Long)
                (message.steamid = $util.Long.fromValue(object.steamid)).unsigned = false;
            else if (typeof object.steamid === "string")
                message.steamid = parseInt(object.steamid, 10);
            else if (typeof object.steamid === "number")
                message.steamid = object.steamid;
            else if (typeof object.steamid === "object")
                message.steamid = new $util.LongBits(object.steamid.low >>> 0, object.steamid.high >>> 0).toNumber();
        if (object.code != null)
            message.code = String(object.code);
        switch (object.codeType) {
        default:
            if (typeof object.codeType === "number") {
                message.codeType = object.codeType;
                break;
            }
            break;
        case "k_EAuthSessionGuardType_Unknown":
        case 0:
            message.codeType = 0;
            break;
        case "k_EAuthSessionGuardType_None":
        case 1:
            message.codeType = 1;
            break;
        case "k_EAuthSessionGuardType_EmailCode":
        case 2:
            message.codeType = 2;
            break;
        case "k_EAuthSessionGuardType_DeviceCode":
        case 3:
            message.codeType = 3;
            break;
        case "k_EAuthSessionGuardType_DeviceConfirmation":
        case 4:
            message.codeType = 4;
            break;
        case "k_EAuthSessionGuardType_EmailConfirmation":
        case 5:
            message.codeType = 5;
            break;
        case "k_EAuthSessionGuardType_MachineToken":
        case 6:
            message.codeType = 6;
            break;
        case "k_EAuthSessionGuardType_LegacyMachineAuth":
        case 7:
            message.codeType = 7;
            break;
        }
        return message;
    };

    /**
     * Creates a plain object from a CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request message. Also converts values to other types if specified.
     * @function toObject
     * @memberof CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request
     * @static
     * @param {CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request} message CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            if ($util.Long) {
                let long = new $util.Long(0, 0, true);
                object.clientId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.clientId = options.longs === String ? "0" : 0;
            if ($util.Long) {
                let long = new $util.Long(0, 0, false);
                object.steamid = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.steamid = options.longs === String ? "0" : 0;
            object.code = "";
            object.codeType = options.enums === String ? "k_EAuthSessionGuardType_Unknown" : 0;
        }
        if (message.clientId != null && message.hasOwnProperty("clientId"))
            if (typeof message.clientId === "number")
                object.clientId = options.longs === String ? String(message.clientId) : message.clientId;
            else
                object.clientId = options.longs === String ? $util.Long.prototype.toString.call(message.clientId) : options.longs === Number ? new $util.LongBits(message.clientId.low >>> 0, message.clientId.high >>> 0).toNumber(true) : message.clientId;
        if (message.steamid != null && message.hasOwnProperty("steamid"))
            if (typeof message.steamid === "number")
                object.steamid = options.longs === String ? String(message.steamid) : message.steamid;
            else
                object.steamid = options.longs === String ? $util.Long.prototype.toString.call(message.steamid) : options.longs === Number ? new $util.LongBits(message.steamid.low >>> 0, message.steamid.high >>> 0).toNumber() : message.steamid;
        if (message.code != null && message.hasOwnProperty("code"))
            object.code = message.code;
        if (message.codeType != null && message.hasOwnProperty("codeType"))
            object.codeType = options.enums === String ? $root.EAuthSessionGuardType[message.codeType] === undefined ? message.codeType : $root.EAuthSessionGuardType[message.codeType] : message.codeType;
        return object;
    };

    /**
     * Converts this CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request to JSON.
     * @function toJSON
     * @memberof CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request
     * @function getTypeUrl
     * @memberof CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request";
    };

    return CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request;
})();

export const CAuthentication_UpdateAuthSessionWithSteamGuardCode_Response = $root.CAuthentication_UpdateAuthSessionWithSteamGuardCode_Response = (() => {

    /**
     * Properties of a CAuthentication_UpdateAuthSessionWithSteamGuardCode_Response.
     * @exports ICAuthentication_UpdateAuthSessionWithSteamGuardCode_Response
     * @interface ICAuthentication_UpdateAuthSessionWithSteamGuardCode_Response
     * @property {string|null} [agreementSessionUrl] CAuthentication_UpdateAuthSessionWithSteamGuardCode_Response agreementSessionUrl
     */

    /**
     * Constructs a new CAuthentication_UpdateAuthSessionWithSteamGuardCode_Response.
     * @exports CAuthentication_UpdateAuthSessionWithSteamGuardCode_Response
     * @classdesc Represents a CAuthentication_UpdateAuthSessionWithSteamGuardCode_Response.
     * @implements ICAuthentication_UpdateAuthSessionWithSteamGuardCode_Response
     * @constructor
     * @param {ICAuthentication_UpdateAuthSessionWithSteamGuardCode_Response=} [properties] Properties to set
     */
    function CAuthentication_UpdateAuthSessionWithSteamGuardCode_Response(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * CAuthentication_UpdateAuthSessionWithSteamGuardCode_Response agreementSessionUrl.
     * @member {string} agreementSessionUrl
     * @memberof CAuthentication_UpdateAuthSessionWithSteamGuardCode_Response
     * @instance
     */
    CAuthentication_UpdateAuthSessionWithSteamGuardCode_Response.prototype.agreementSessionUrl = "";

    /**
     * Creates a new CAuthentication_UpdateAuthSessionWithSteamGuardCode_Response instance using the specified properties.
     * @function create
     * @memberof CAuthentication_UpdateAuthSessionWithSteamGuardCode_Response
     * @static
     * @param {ICAuthentication_UpdateAuthSessionWithSteamGuardCode_Response=} [properties] Properties to set
     * @returns {CAuthentication_UpdateAuthSessionWithSteamGuardCode_Response} CAuthentication_UpdateAuthSessionWithSteamGuardCode_Response instance
     */
    CAuthentication_UpdateAuthSessionWithSteamGuardCode_Response.create = function create(properties) {
        return new CAuthentication_UpdateAuthSessionWithSteamGuardCode_Response(properties);
    };

    /**
     * Encodes the specified CAuthentication_UpdateAuthSessionWithSteamGuardCode_Response message. Does not implicitly {@link CAuthentication_UpdateAuthSessionWithSteamGuardCode_Response.verify|verify} messages.
     * @function encode
     * @memberof CAuthentication_UpdateAuthSessionWithSteamGuardCode_Response
     * @static
     * @param {ICAuthentication_UpdateAuthSessionWithSteamGuardCode_Response} message CAuthentication_UpdateAuthSessionWithSteamGuardCode_Response message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CAuthentication_UpdateAuthSessionWithSteamGuardCode_Response.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.agreementSessionUrl != null && Object.hasOwnProperty.call(message, "agreementSessionUrl"))
            writer.uint32(/* id 7, wireType 2 =*/58).string(message.agreementSessionUrl);
        return writer;
    };

    /**
     * Encodes the specified CAuthentication_UpdateAuthSessionWithSteamGuardCode_Response message, length delimited. Does not implicitly {@link CAuthentication_UpdateAuthSessionWithSteamGuardCode_Response.verify|verify} messages.
     * @function encodeDelimited
     * @memberof CAuthentication_UpdateAuthSessionWithSteamGuardCode_Response
     * @static
     * @param {ICAuthentication_UpdateAuthSessionWithSteamGuardCode_Response} message CAuthentication_UpdateAuthSessionWithSteamGuardCode_Response message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CAuthentication_UpdateAuthSessionWithSteamGuardCode_Response.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a CAuthentication_UpdateAuthSessionWithSteamGuardCode_Response message from the specified reader or buffer.
     * @function decode
     * @memberof CAuthentication_UpdateAuthSessionWithSteamGuardCode_Response
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {CAuthentication_UpdateAuthSessionWithSteamGuardCode_Response} CAuthentication_UpdateAuthSessionWithSteamGuardCode_Response
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CAuthentication_UpdateAuthSessionWithSteamGuardCode_Response.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.CAuthentication_UpdateAuthSessionWithSteamGuardCode_Response();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 7: {
                    message.agreementSessionUrl = reader.string();
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a CAuthentication_UpdateAuthSessionWithSteamGuardCode_Response message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof CAuthentication_UpdateAuthSessionWithSteamGuardCode_Response
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {CAuthentication_UpdateAuthSessionWithSteamGuardCode_Response} CAuthentication_UpdateAuthSessionWithSteamGuardCode_Response
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CAuthentication_UpdateAuthSessionWithSteamGuardCode_Response.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a CAuthentication_UpdateAuthSessionWithSteamGuardCode_Response message.
     * @function verify
     * @memberof CAuthentication_UpdateAuthSessionWithSteamGuardCode_Response
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    CAuthentication_UpdateAuthSessionWithSteamGuardCode_Response.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.agreementSessionUrl != null && message.hasOwnProperty("agreementSessionUrl"))
            if (!$util.isString(message.agreementSessionUrl))
                return "agreementSessionUrl: string expected";
        return null;
    };

    /**
     * Creates a CAuthentication_UpdateAuthSessionWithSteamGuardCode_Response message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof CAuthentication_UpdateAuthSessionWithSteamGuardCode_Response
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {CAuthentication_UpdateAuthSessionWithSteamGuardCode_Response} CAuthentication_UpdateAuthSessionWithSteamGuardCode_Response
     */
    CAuthentication_UpdateAuthSessionWithSteamGuardCode_Response.fromObject = function fromObject(object) {
        if (object instanceof $root.CAuthentication_UpdateAuthSessionWithSteamGuardCode_Response)
            return object;
        let message = new $root.CAuthentication_UpdateAuthSessionWithSteamGuardCode_Response();
        if (object.agreementSessionUrl != null)
            message.agreementSessionUrl = String(object.agreementSessionUrl);
        return message;
    };

    /**
     * Creates a plain object from a CAuthentication_UpdateAuthSessionWithSteamGuardCode_Response message. Also converts values to other types if specified.
     * @function toObject
     * @memberof CAuthentication_UpdateAuthSessionWithSteamGuardCode_Response
     * @static
     * @param {CAuthentication_UpdateAuthSessionWithSteamGuardCode_Response} message CAuthentication_UpdateAuthSessionWithSteamGuardCode_Response
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    CAuthentication_UpdateAuthSessionWithSteamGuardCode_Response.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults)
            object.agreementSessionUrl = "";
        if (message.agreementSessionUrl != null && message.hasOwnProperty("agreementSessionUrl"))
            object.agreementSessionUrl = message.agreementSessionUrl;
        return object;
    };

    /**
     * Converts this CAuthentication_UpdateAuthSessionWithSteamGuardCode_Response to JSON.
     * @function toJSON
     * @memberof CAuthentication_UpdateAuthSessionWithSteamGuardCode_Response
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    CAuthentication_UpdateAuthSessionWithSteamGuardCode_Response.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for CAuthentication_UpdateAuthSessionWithSteamGuardCode_Response
     * @function getTypeUrl
     * @memberof CAuthentication_UpdateAuthSessionWithSteamGuardCode_Response
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    CAuthentication_UpdateAuthSessionWithSteamGuardCode_Response.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/CAuthentication_UpdateAuthSessionWithSteamGuardCode_Response";
    };

    return CAuthentication_UpdateAuthSessionWithSteamGuardCode_Response;
})();

export const CAuthentication_PollAuthSessionStatus_Request = $root.CAuthentication_PollAuthSessionStatus_Request = (() => {

    /**
     * Properties of a CAuthentication_PollAuthSessionStatus_Request.
     * @exports ICAuthentication_PollAuthSessionStatus_Request
     * @interface ICAuthentication_PollAuthSessionStatus_Request
     * @property {Long|null} [clientId] CAuthentication_PollAuthSessionStatus_Request clientId
     * @property {Uint8Array|null} [requestId] CAuthentication_PollAuthSessionStatus_Request requestId
     * @property {Long|null} [tokenToRevoke] CAuthentication_PollAuthSessionStatus_Request tokenToRevoke
     */

    /**
     * Constructs a new CAuthentication_PollAuthSessionStatus_Request.
     * @exports CAuthentication_PollAuthSessionStatus_Request
     * @classdesc Represents a CAuthentication_PollAuthSessionStatus_Request.
     * @implements ICAuthentication_PollAuthSessionStatus_Request
     * @constructor
     * @param {ICAuthentication_PollAuthSessionStatus_Request=} [properties] Properties to set
     */
    function CAuthentication_PollAuthSessionStatus_Request(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * CAuthentication_PollAuthSessionStatus_Request clientId.
     * @member {Long} clientId
     * @memberof CAuthentication_PollAuthSessionStatus_Request
     * @instance
     */
    CAuthentication_PollAuthSessionStatus_Request.prototype.clientId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

    /**
     * CAuthentication_PollAuthSessionStatus_Request requestId.
     * @member {Uint8Array} requestId
     * @memberof CAuthentication_PollAuthSessionStatus_Request
     * @instance
     */
    CAuthentication_PollAuthSessionStatus_Request.prototype.requestId = $util.newBuffer([]);

    /**
     * CAuthentication_PollAuthSessionStatus_Request tokenToRevoke.
     * @member {Long} tokenToRevoke
     * @memberof CAuthentication_PollAuthSessionStatus_Request
     * @instance
     */
    CAuthentication_PollAuthSessionStatus_Request.prototype.tokenToRevoke = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * Creates a new CAuthentication_PollAuthSessionStatus_Request instance using the specified properties.
     * @function create
     * @memberof CAuthentication_PollAuthSessionStatus_Request
     * @static
     * @param {ICAuthentication_PollAuthSessionStatus_Request=} [properties] Properties to set
     * @returns {CAuthentication_PollAuthSessionStatus_Request} CAuthentication_PollAuthSessionStatus_Request instance
     */
    CAuthentication_PollAuthSessionStatus_Request.create = function create(properties) {
        return new CAuthentication_PollAuthSessionStatus_Request(properties);
    };

    /**
     * Encodes the specified CAuthentication_PollAuthSessionStatus_Request message. Does not implicitly {@link CAuthentication_PollAuthSessionStatus_Request.verify|verify} messages.
     * @function encode
     * @memberof CAuthentication_PollAuthSessionStatus_Request
     * @static
     * @param {ICAuthentication_PollAuthSessionStatus_Request} message CAuthentication_PollAuthSessionStatus_Request message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CAuthentication_PollAuthSessionStatus_Request.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.clientId != null && Object.hasOwnProperty.call(message, "clientId"))
            writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.clientId);
        if (message.requestId != null && Object.hasOwnProperty.call(message, "requestId"))
            writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.requestId);
        if (message.tokenToRevoke != null && Object.hasOwnProperty.call(message, "tokenToRevoke"))
            writer.uint32(/* id 3, wireType 1 =*/25).fixed64(message.tokenToRevoke);
        return writer;
    };

    /**
     * Encodes the specified CAuthentication_PollAuthSessionStatus_Request message, length delimited. Does not implicitly {@link CAuthentication_PollAuthSessionStatus_Request.verify|verify} messages.
     * @function encodeDelimited
     * @memberof CAuthentication_PollAuthSessionStatus_Request
     * @static
     * @param {ICAuthentication_PollAuthSessionStatus_Request} message CAuthentication_PollAuthSessionStatus_Request message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CAuthentication_PollAuthSessionStatus_Request.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a CAuthentication_PollAuthSessionStatus_Request message from the specified reader or buffer.
     * @function decode
     * @memberof CAuthentication_PollAuthSessionStatus_Request
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {CAuthentication_PollAuthSessionStatus_Request} CAuthentication_PollAuthSessionStatus_Request
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CAuthentication_PollAuthSessionStatus_Request.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.CAuthentication_PollAuthSessionStatus_Request();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    message.clientId = reader.uint64();
                    break;
                }
            case 2: {
                    message.requestId = reader.bytes();
                    break;
                }
            case 3: {
                    message.tokenToRevoke = reader.fixed64();
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a CAuthentication_PollAuthSessionStatus_Request message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof CAuthentication_PollAuthSessionStatus_Request
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {CAuthentication_PollAuthSessionStatus_Request} CAuthentication_PollAuthSessionStatus_Request
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CAuthentication_PollAuthSessionStatus_Request.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a CAuthentication_PollAuthSessionStatus_Request message.
     * @function verify
     * @memberof CAuthentication_PollAuthSessionStatus_Request
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    CAuthentication_PollAuthSessionStatus_Request.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.clientId != null && message.hasOwnProperty("clientId"))
            if (!$util.isInteger(message.clientId) && !(message.clientId && $util.isInteger(message.clientId.low) && $util.isInteger(message.clientId.high)))
                return "clientId: integer|Long expected";
        if (message.requestId != null && message.hasOwnProperty("requestId"))
            if (!(message.requestId && typeof message.requestId.length === "number" || $util.isString(message.requestId)))
                return "requestId: buffer expected";
        if (message.tokenToRevoke != null && message.hasOwnProperty("tokenToRevoke"))
            if (!$util.isInteger(message.tokenToRevoke) && !(message.tokenToRevoke && $util.isInteger(message.tokenToRevoke.low) && $util.isInteger(message.tokenToRevoke.high)))
                return "tokenToRevoke: integer|Long expected";
        return null;
    };

    /**
     * Creates a CAuthentication_PollAuthSessionStatus_Request message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof CAuthentication_PollAuthSessionStatus_Request
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {CAuthentication_PollAuthSessionStatus_Request} CAuthentication_PollAuthSessionStatus_Request
     */
    CAuthentication_PollAuthSessionStatus_Request.fromObject = function fromObject(object) {
        if (object instanceof $root.CAuthentication_PollAuthSessionStatus_Request)
            return object;
        let message = new $root.CAuthentication_PollAuthSessionStatus_Request();
        if (object.clientId != null)
            if ($util.Long)
                (message.clientId = $util.Long.fromValue(object.clientId)).unsigned = true;
            else if (typeof object.clientId === "string")
                message.clientId = parseInt(object.clientId, 10);
            else if (typeof object.clientId === "number")
                message.clientId = object.clientId;
            else if (typeof object.clientId === "object")
                message.clientId = new $util.LongBits(object.clientId.low >>> 0, object.clientId.high >>> 0).toNumber(true);
        if (object.requestId != null)
            if (typeof object.requestId === "string")
                $util.base64.decode(object.requestId, message.requestId = $util.newBuffer($util.base64.length(object.requestId)), 0);
            else if (object.requestId.length >= 0)
                message.requestId = object.requestId;
        if (object.tokenToRevoke != null)
            if ($util.Long)
                (message.tokenToRevoke = $util.Long.fromValue(object.tokenToRevoke)).unsigned = false;
            else if (typeof object.tokenToRevoke === "string")
                message.tokenToRevoke = parseInt(object.tokenToRevoke, 10);
            else if (typeof object.tokenToRevoke === "number")
                message.tokenToRevoke = object.tokenToRevoke;
            else if (typeof object.tokenToRevoke === "object")
                message.tokenToRevoke = new $util.LongBits(object.tokenToRevoke.low >>> 0, object.tokenToRevoke.high >>> 0).toNumber();
        return message;
    };

    /**
     * Creates a plain object from a CAuthentication_PollAuthSessionStatus_Request message. Also converts values to other types if specified.
     * @function toObject
     * @memberof CAuthentication_PollAuthSessionStatus_Request
     * @static
     * @param {CAuthentication_PollAuthSessionStatus_Request} message CAuthentication_PollAuthSessionStatus_Request
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    CAuthentication_PollAuthSessionStatus_Request.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            if ($util.Long) {
                let long = new $util.Long(0, 0, true);
                object.clientId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.clientId = options.longs === String ? "0" : 0;
            if (options.bytes === String)
                object.requestId = "";
            else {
                object.requestId = [];
                if (options.bytes !== Array)
                    object.requestId = $util.newBuffer(object.requestId);
            }
            if ($util.Long) {
                let long = new $util.Long(0, 0, false);
                object.tokenToRevoke = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.tokenToRevoke = options.longs === String ? "0" : 0;
        }
        if (message.clientId != null && message.hasOwnProperty("clientId"))
            if (typeof message.clientId === "number")
                object.clientId = options.longs === String ? String(message.clientId) : message.clientId;
            else
                object.clientId = options.longs === String ? $util.Long.prototype.toString.call(message.clientId) : options.longs === Number ? new $util.LongBits(message.clientId.low >>> 0, message.clientId.high >>> 0).toNumber(true) : message.clientId;
        if (message.requestId != null && message.hasOwnProperty("requestId"))
            object.requestId = options.bytes === String ? $util.base64.encode(message.requestId, 0, message.requestId.length) : options.bytes === Array ? Array.prototype.slice.call(message.requestId) : message.requestId;
        if (message.tokenToRevoke != null && message.hasOwnProperty("tokenToRevoke"))
            if (typeof message.tokenToRevoke === "number")
                object.tokenToRevoke = options.longs === String ? String(message.tokenToRevoke) : message.tokenToRevoke;
            else
                object.tokenToRevoke = options.longs === String ? $util.Long.prototype.toString.call(message.tokenToRevoke) : options.longs === Number ? new $util.LongBits(message.tokenToRevoke.low >>> 0, message.tokenToRevoke.high >>> 0).toNumber() : message.tokenToRevoke;
        return object;
    };

    /**
     * Converts this CAuthentication_PollAuthSessionStatus_Request to JSON.
     * @function toJSON
     * @memberof CAuthentication_PollAuthSessionStatus_Request
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    CAuthentication_PollAuthSessionStatus_Request.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for CAuthentication_PollAuthSessionStatus_Request
     * @function getTypeUrl
     * @memberof CAuthentication_PollAuthSessionStatus_Request
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    CAuthentication_PollAuthSessionStatus_Request.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/CAuthentication_PollAuthSessionStatus_Request";
    };

    return CAuthentication_PollAuthSessionStatus_Request;
})();

export const CAuthentication_PollAuthSessionStatus_Response = $root.CAuthentication_PollAuthSessionStatus_Response = (() => {

    /**
     * Properties of a CAuthentication_PollAuthSessionStatus_Response.
     * @exports ICAuthentication_PollAuthSessionStatus_Response
     * @interface ICAuthentication_PollAuthSessionStatus_Response
     * @property {Long|null} [newClientId] CAuthentication_PollAuthSessionStatus_Response newClientId
     * @property {string|null} [newChallengeUrl] CAuthentication_PollAuthSessionStatus_Response newChallengeUrl
     * @property {string|null} [refreshToken] CAuthentication_PollAuthSessionStatus_Response refreshToken
     * @property {string|null} [accessToken] CAuthentication_PollAuthSessionStatus_Response accessToken
     * @property {boolean|null} [hadRemoteInteraction] CAuthentication_PollAuthSessionStatus_Response hadRemoteInteraction
     * @property {string|null} [accountName] CAuthentication_PollAuthSessionStatus_Response accountName
     * @property {string|null} [newGuardData] CAuthentication_PollAuthSessionStatus_Response newGuardData
     * @property {string|null} [agreementSessionUrl] CAuthentication_PollAuthSessionStatus_Response agreementSessionUrl
     */

    /**
     * Constructs a new CAuthentication_PollAuthSessionStatus_Response.
     * @exports CAuthentication_PollAuthSessionStatus_Response
     * @classdesc Represents a CAuthentication_PollAuthSessionStatus_Response.
     * @implements ICAuthentication_PollAuthSessionStatus_Response
     * @constructor
     * @param {ICAuthentication_PollAuthSessionStatus_Response=} [properties] Properties to set
     */
    function CAuthentication_PollAuthSessionStatus_Response(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * CAuthentication_PollAuthSessionStatus_Response newClientId.
     * @member {Long} newClientId
     * @memberof CAuthentication_PollAuthSessionStatus_Response
     * @instance
     */
    CAuthentication_PollAuthSessionStatus_Response.prototype.newClientId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

    /**
     * CAuthentication_PollAuthSessionStatus_Response newChallengeUrl.
     * @member {string} newChallengeUrl
     * @memberof CAuthentication_PollAuthSessionStatus_Response
     * @instance
     */
    CAuthentication_PollAuthSessionStatus_Response.prototype.newChallengeUrl = "";

    /**
     * CAuthentication_PollAuthSessionStatus_Response refreshToken.
     * @member {string} refreshToken
     * @memberof CAuthentication_PollAuthSessionStatus_Response
     * @instance
     */
    CAuthentication_PollAuthSessionStatus_Response.prototype.refreshToken = "";

    /**
     * CAuthentication_PollAuthSessionStatus_Response accessToken.
     * @member {string} accessToken
     * @memberof CAuthentication_PollAuthSessionStatus_Response
     * @instance
     */
    CAuthentication_PollAuthSessionStatus_Response.prototype.accessToken = "";

    /**
     * CAuthentication_PollAuthSessionStatus_Response hadRemoteInteraction.
     * @member {boolean} hadRemoteInteraction
     * @memberof CAuthentication_PollAuthSessionStatus_Response
     * @instance
     */
    CAuthentication_PollAuthSessionStatus_Response.prototype.hadRemoteInteraction = false;

    /**
     * CAuthentication_PollAuthSessionStatus_Response accountName.
     * @member {string} accountName
     * @memberof CAuthentication_PollAuthSessionStatus_Response
     * @instance
     */
    CAuthentication_PollAuthSessionStatus_Response.prototype.accountName = "";

    /**
     * CAuthentication_PollAuthSessionStatus_Response newGuardData.
     * @member {string} newGuardData
     * @memberof CAuthentication_PollAuthSessionStatus_Response
     * @instance
     */
    CAuthentication_PollAuthSessionStatus_Response.prototype.newGuardData = "";

    /**
     * CAuthentication_PollAuthSessionStatus_Response agreementSessionUrl.
     * @member {string} agreementSessionUrl
     * @memberof CAuthentication_PollAuthSessionStatus_Response
     * @instance
     */
    CAuthentication_PollAuthSessionStatus_Response.prototype.agreementSessionUrl = "";

    /**
     * Creates a new CAuthentication_PollAuthSessionStatus_Response instance using the specified properties.
     * @function create
     * @memberof CAuthentication_PollAuthSessionStatus_Response
     * @static
     * @param {ICAuthentication_PollAuthSessionStatus_Response=} [properties] Properties to set
     * @returns {CAuthentication_PollAuthSessionStatus_Response} CAuthentication_PollAuthSessionStatus_Response instance
     */
    CAuthentication_PollAuthSessionStatus_Response.create = function create(properties) {
        return new CAuthentication_PollAuthSessionStatus_Response(properties);
    };

    /**
     * Encodes the specified CAuthentication_PollAuthSessionStatus_Response message. Does not implicitly {@link CAuthentication_PollAuthSessionStatus_Response.verify|verify} messages.
     * @function encode
     * @memberof CAuthentication_PollAuthSessionStatus_Response
     * @static
     * @param {ICAuthentication_PollAuthSessionStatus_Response} message CAuthentication_PollAuthSessionStatus_Response message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CAuthentication_PollAuthSessionStatus_Response.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.newClientId != null && Object.hasOwnProperty.call(message, "newClientId"))
            writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.newClientId);
        if (message.newChallengeUrl != null && Object.hasOwnProperty.call(message, "newChallengeUrl"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.newChallengeUrl);
        if (message.refreshToken != null && Object.hasOwnProperty.call(message, "refreshToken"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.refreshToken);
        if (message.accessToken != null && Object.hasOwnProperty.call(message, "accessToken"))
            writer.uint32(/* id 4, wireType 2 =*/34).string(message.accessToken);
        if (message.hadRemoteInteraction != null && Object.hasOwnProperty.call(message, "hadRemoteInteraction"))
            writer.uint32(/* id 5, wireType 0 =*/40).bool(message.hadRemoteInteraction);
        if (message.accountName != null && Object.hasOwnProperty.call(message, "accountName"))
            writer.uint32(/* id 6, wireType 2 =*/50).string(message.accountName);
        if (message.newGuardData != null && Object.hasOwnProperty.call(message, "newGuardData"))
            writer.uint32(/* id 7, wireType 2 =*/58).string(message.newGuardData);
        if (message.agreementSessionUrl != null && Object.hasOwnProperty.call(message, "agreementSessionUrl"))
            writer.uint32(/* id 8, wireType 2 =*/66).string(message.agreementSessionUrl);
        return writer;
    };

    /**
     * Encodes the specified CAuthentication_PollAuthSessionStatus_Response message, length delimited. Does not implicitly {@link CAuthentication_PollAuthSessionStatus_Response.verify|verify} messages.
     * @function encodeDelimited
     * @memberof CAuthentication_PollAuthSessionStatus_Response
     * @static
     * @param {ICAuthentication_PollAuthSessionStatus_Response} message CAuthentication_PollAuthSessionStatus_Response message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CAuthentication_PollAuthSessionStatus_Response.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a CAuthentication_PollAuthSessionStatus_Response message from the specified reader or buffer.
     * @function decode
     * @memberof CAuthentication_PollAuthSessionStatus_Response
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {CAuthentication_PollAuthSessionStatus_Response} CAuthentication_PollAuthSessionStatus_Response
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CAuthentication_PollAuthSessionStatus_Response.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.CAuthentication_PollAuthSessionStatus_Response();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    message.newClientId = reader.uint64();
                    break;
                }
            case 2: {
                    message.newChallengeUrl = reader.string();
                    break;
                }
            case 3: {
                    message.refreshToken = reader.string();
                    break;
                }
            case 4: {
                    message.accessToken = reader.string();
                    break;
                }
            case 5: {
                    message.hadRemoteInteraction = reader.bool();
                    break;
                }
            case 6: {
                    message.accountName = reader.string();
                    break;
                }
            case 7: {
                    message.newGuardData = reader.string();
                    break;
                }
            case 8: {
                    message.agreementSessionUrl = reader.string();
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a CAuthentication_PollAuthSessionStatus_Response message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof CAuthentication_PollAuthSessionStatus_Response
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {CAuthentication_PollAuthSessionStatus_Response} CAuthentication_PollAuthSessionStatus_Response
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CAuthentication_PollAuthSessionStatus_Response.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a CAuthentication_PollAuthSessionStatus_Response message.
     * @function verify
     * @memberof CAuthentication_PollAuthSessionStatus_Response
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    CAuthentication_PollAuthSessionStatus_Response.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.newClientId != null && message.hasOwnProperty("newClientId"))
            if (!$util.isInteger(message.newClientId) && !(message.newClientId && $util.isInteger(message.newClientId.low) && $util.isInteger(message.newClientId.high)))
                return "newClientId: integer|Long expected";
        if (message.newChallengeUrl != null && message.hasOwnProperty("newChallengeUrl"))
            if (!$util.isString(message.newChallengeUrl))
                return "newChallengeUrl: string expected";
        if (message.refreshToken != null && message.hasOwnProperty("refreshToken"))
            if (!$util.isString(message.refreshToken))
                return "refreshToken: string expected";
        if (message.accessToken != null && message.hasOwnProperty("accessToken"))
            if (!$util.isString(message.accessToken))
                return "accessToken: string expected";
        if (message.hadRemoteInteraction != null && message.hasOwnProperty("hadRemoteInteraction"))
            if (typeof message.hadRemoteInteraction !== "boolean")
                return "hadRemoteInteraction: boolean expected";
        if (message.accountName != null && message.hasOwnProperty("accountName"))
            if (!$util.isString(message.accountName))
                return "accountName: string expected";
        if (message.newGuardData != null && message.hasOwnProperty("newGuardData"))
            if (!$util.isString(message.newGuardData))
                return "newGuardData: string expected";
        if (message.agreementSessionUrl != null && message.hasOwnProperty("agreementSessionUrl"))
            if (!$util.isString(message.agreementSessionUrl))
                return "agreementSessionUrl: string expected";
        return null;
    };

    /**
     * Creates a CAuthentication_PollAuthSessionStatus_Response message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof CAuthentication_PollAuthSessionStatus_Response
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {CAuthentication_PollAuthSessionStatus_Response} CAuthentication_PollAuthSessionStatus_Response
     */
    CAuthentication_PollAuthSessionStatus_Response.fromObject = function fromObject(object) {
        if (object instanceof $root.CAuthentication_PollAuthSessionStatus_Response)
            return object;
        let message = new $root.CAuthentication_PollAuthSessionStatus_Response();
        if (object.newClientId != null)
            if ($util.Long)
                (message.newClientId = $util.Long.fromValue(object.newClientId)).unsigned = true;
            else if (typeof object.newClientId === "string")
                message.newClientId = parseInt(object.newClientId, 10);
            else if (typeof object.newClientId === "number")
                message.newClientId = object.newClientId;
            else if (typeof object.newClientId === "object")
                message.newClientId = new $util.LongBits(object.newClientId.low >>> 0, object.newClientId.high >>> 0).toNumber(true);
        if (object.newChallengeUrl != null)
            message.newChallengeUrl = String(object.newChallengeUrl);
        if (object.refreshToken != null)
            message.refreshToken = String(object.refreshToken);
        if (object.accessToken != null)
            message.accessToken = String(object.accessToken);
        if (object.hadRemoteInteraction != null)
            message.hadRemoteInteraction = Boolean(object.hadRemoteInteraction);
        if (object.accountName != null)
            message.accountName = String(object.accountName);
        if (object.newGuardData != null)
            message.newGuardData = String(object.newGuardData);
        if (object.agreementSessionUrl != null)
            message.agreementSessionUrl = String(object.agreementSessionUrl);
        return message;
    };

    /**
     * Creates a plain object from a CAuthentication_PollAuthSessionStatus_Response message. Also converts values to other types if specified.
     * @function toObject
     * @memberof CAuthentication_PollAuthSessionStatus_Response
     * @static
     * @param {CAuthentication_PollAuthSessionStatus_Response} message CAuthentication_PollAuthSessionStatus_Response
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    CAuthentication_PollAuthSessionStatus_Response.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            if ($util.Long) {
                let long = new $util.Long(0, 0, true);
                object.newClientId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.newClientId = options.longs === String ? "0" : 0;
            object.newChallengeUrl = "";
            object.refreshToken = "";
            object.accessToken = "";
            object.hadRemoteInteraction = false;
            object.accountName = "";
            object.newGuardData = "";
            object.agreementSessionUrl = "";
        }
        if (message.newClientId != null && message.hasOwnProperty("newClientId"))
            if (typeof message.newClientId === "number")
                object.newClientId = options.longs === String ? String(message.newClientId) : message.newClientId;
            else
                object.newClientId = options.longs === String ? $util.Long.prototype.toString.call(message.newClientId) : options.longs === Number ? new $util.LongBits(message.newClientId.low >>> 0, message.newClientId.high >>> 0).toNumber(true) : message.newClientId;
        if (message.newChallengeUrl != null && message.hasOwnProperty("newChallengeUrl"))
            object.newChallengeUrl = message.newChallengeUrl;
        if (message.refreshToken != null && message.hasOwnProperty("refreshToken"))
            object.refreshToken = message.refreshToken;
        if (message.accessToken != null && message.hasOwnProperty("accessToken"))
            object.accessToken = message.accessToken;
        if (message.hadRemoteInteraction != null && message.hasOwnProperty("hadRemoteInteraction"))
            object.hadRemoteInteraction = message.hadRemoteInteraction;
        if (message.accountName != null && message.hasOwnProperty("accountName"))
            object.accountName = message.accountName;
        if (message.newGuardData != null && message.hasOwnProperty("newGuardData"))
            object.newGuardData = message.newGuardData;
        if (message.agreementSessionUrl != null && message.hasOwnProperty("agreementSessionUrl"))
            object.agreementSessionUrl = message.agreementSessionUrl;
        return object;
    };

    /**
     * Converts this CAuthentication_PollAuthSessionStatus_Response to JSON.
     * @function toJSON
     * @memberof CAuthentication_PollAuthSessionStatus_Response
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    CAuthentication_PollAuthSessionStatus_Response.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for CAuthentication_PollAuthSessionStatus_Response
     * @function getTypeUrl
     * @memberof CAuthentication_PollAuthSessionStatus_Response
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    CAuthentication_PollAuthSessionStatus_Response.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/CAuthentication_PollAuthSessionStatus_Response";
    };

    return CAuthentication_PollAuthSessionStatus_Response;
})();

export const CAuthentication_GetAuthSessionInfo_Request = $root.CAuthentication_GetAuthSessionInfo_Request = (() => {

    /**
     * Properties of a CAuthentication_GetAuthSessionInfo_Request.
     * @exports ICAuthentication_GetAuthSessionInfo_Request
     * @interface ICAuthentication_GetAuthSessionInfo_Request
     * @property {Long|null} [clientId] CAuthentication_GetAuthSessionInfo_Request clientId
     */

    /**
     * Constructs a new CAuthentication_GetAuthSessionInfo_Request.
     * @exports CAuthentication_GetAuthSessionInfo_Request
     * @classdesc Represents a CAuthentication_GetAuthSessionInfo_Request.
     * @implements ICAuthentication_GetAuthSessionInfo_Request
     * @constructor
     * @param {ICAuthentication_GetAuthSessionInfo_Request=} [properties] Properties to set
     */
    function CAuthentication_GetAuthSessionInfo_Request(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * CAuthentication_GetAuthSessionInfo_Request clientId.
     * @member {Long} clientId
     * @memberof CAuthentication_GetAuthSessionInfo_Request
     * @instance
     */
    CAuthentication_GetAuthSessionInfo_Request.prototype.clientId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

    /**
     * Creates a new CAuthentication_GetAuthSessionInfo_Request instance using the specified properties.
     * @function create
     * @memberof CAuthentication_GetAuthSessionInfo_Request
     * @static
     * @param {ICAuthentication_GetAuthSessionInfo_Request=} [properties] Properties to set
     * @returns {CAuthentication_GetAuthSessionInfo_Request} CAuthentication_GetAuthSessionInfo_Request instance
     */
    CAuthentication_GetAuthSessionInfo_Request.create = function create(properties) {
        return new CAuthentication_GetAuthSessionInfo_Request(properties);
    };

    /**
     * Encodes the specified CAuthentication_GetAuthSessionInfo_Request message. Does not implicitly {@link CAuthentication_GetAuthSessionInfo_Request.verify|verify} messages.
     * @function encode
     * @memberof CAuthentication_GetAuthSessionInfo_Request
     * @static
     * @param {ICAuthentication_GetAuthSessionInfo_Request} message CAuthentication_GetAuthSessionInfo_Request message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CAuthentication_GetAuthSessionInfo_Request.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.clientId != null && Object.hasOwnProperty.call(message, "clientId"))
            writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.clientId);
        return writer;
    };

    /**
     * Encodes the specified CAuthentication_GetAuthSessionInfo_Request message, length delimited. Does not implicitly {@link CAuthentication_GetAuthSessionInfo_Request.verify|verify} messages.
     * @function encodeDelimited
     * @memberof CAuthentication_GetAuthSessionInfo_Request
     * @static
     * @param {ICAuthentication_GetAuthSessionInfo_Request} message CAuthentication_GetAuthSessionInfo_Request message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CAuthentication_GetAuthSessionInfo_Request.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a CAuthentication_GetAuthSessionInfo_Request message from the specified reader or buffer.
     * @function decode
     * @memberof CAuthentication_GetAuthSessionInfo_Request
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {CAuthentication_GetAuthSessionInfo_Request} CAuthentication_GetAuthSessionInfo_Request
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CAuthentication_GetAuthSessionInfo_Request.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.CAuthentication_GetAuthSessionInfo_Request();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    message.clientId = reader.uint64();
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a CAuthentication_GetAuthSessionInfo_Request message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof CAuthentication_GetAuthSessionInfo_Request
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {CAuthentication_GetAuthSessionInfo_Request} CAuthentication_GetAuthSessionInfo_Request
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CAuthentication_GetAuthSessionInfo_Request.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a CAuthentication_GetAuthSessionInfo_Request message.
     * @function verify
     * @memberof CAuthentication_GetAuthSessionInfo_Request
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    CAuthentication_GetAuthSessionInfo_Request.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.clientId != null && message.hasOwnProperty("clientId"))
            if (!$util.isInteger(message.clientId) && !(message.clientId && $util.isInteger(message.clientId.low) && $util.isInteger(message.clientId.high)))
                return "clientId: integer|Long expected";
        return null;
    };

    /**
     * Creates a CAuthentication_GetAuthSessionInfo_Request message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof CAuthentication_GetAuthSessionInfo_Request
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {CAuthentication_GetAuthSessionInfo_Request} CAuthentication_GetAuthSessionInfo_Request
     */
    CAuthentication_GetAuthSessionInfo_Request.fromObject = function fromObject(object) {
        if (object instanceof $root.CAuthentication_GetAuthSessionInfo_Request)
            return object;
        let message = new $root.CAuthentication_GetAuthSessionInfo_Request();
        if (object.clientId != null)
            if ($util.Long)
                (message.clientId = $util.Long.fromValue(object.clientId)).unsigned = true;
            else if (typeof object.clientId === "string")
                message.clientId = parseInt(object.clientId, 10);
            else if (typeof object.clientId === "number")
                message.clientId = object.clientId;
            else if (typeof object.clientId === "object")
                message.clientId = new $util.LongBits(object.clientId.low >>> 0, object.clientId.high >>> 0).toNumber(true);
        return message;
    };

    /**
     * Creates a plain object from a CAuthentication_GetAuthSessionInfo_Request message. Also converts values to other types if specified.
     * @function toObject
     * @memberof CAuthentication_GetAuthSessionInfo_Request
     * @static
     * @param {CAuthentication_GetAuthSessionInfo_Request} message CAuthentication_GetAuthSessionInfo_Request
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    CAuthentication_GetAuthSessionInfo_Request.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults)
            if ($util.Long) {
                let long = new $util.Long(0, 0, true);
                object.clientId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.clientId = options.longs === String ? "0" : 0;
        if (message.clientId != null && message.hasOwnProperty("clientId"))
            if (typeof message.clientId === "number")
                object.clientId = options.longs === String ? String(message.clientId) : message.clientId;
            else
                object.clientId = options.longs === String ? $util.Long.prototype.toString.call(message.clientId) : options.longs === Number ? new $util.LongBits(message.clientId.low >>> 0, message.clientId.high >>> 0).toNumber(true) : message.clientId;
        return object;
    };

    /**
     * Converts this CAuthentication_GetAuthSessionInfo_Request to JSON.
     * @function toJSON
     * @memberof CAuthentication_GetAuthSessionInfo_Request
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    CAuthentication_GetAuthSessionInfo_Request.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for CAuthentication_GetAuthSessionInfo_Request
     * @function getTypeUrl
     * @memberof CAuthentication_GetAuthSessionInfo_Request
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    CAuthentication_GetAuthSessionInfo_Request.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/CAuthentication_GetAuthSessionInfo_Request";
    };

    return CAuthentication_GetAuthSessionInfo_Request;
})();

export const CAuthentication_GetAuthSessionsForAccount_Request = $root.CAuthentication_GetAuthSessionsForAccount_Request = (() => {

    /**
     * Properties of a CAuthentication_GetAuthSessionsForAccount_Request.
     * @exports ICAuthentication_GetAuthSessionsForAccount_Request
     * @interface ICAuthentication_GetAuthSessionsForAccount_Request
     */

    /**
     * Constructs a new CAuthentication_GetAuthSessionsForAccount_Request.
     * @exports CAuthentication_GetAuthSessionsForAccount_Request
     * @classdesc Represents a CAuthentication_GetAuthSessionsForAccount_Request.
     * @implements ICAuthentication_GetAuthSessionsForAccount_Request
     * @constructor
     * @param {ICAuthentication_GetAuthSessionsForAccount_Request=} [properties] Properties to set
     */
    function CAuthentication_GetAuthSessionsForAccount_Request(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Creates a new CAuthentication_GetAuthSessionsForAccount_Request instance using the specified properties.
     * @function create
     * @memberof CAuthentication_GetAuthSessionsForAccount_Request
     * @static
     * @param {ICAuthentication_GetAuthSessionsForAccount_Request=} [properties] Properties to set
     * @returns {CAuthentication_GetAuthSessionsForAccount_Request} CAuthentication_GetAuthSessionsForAccount_Request instance
     */
    CAuthentication_GetAuthSessionsForAccount_Request.create = function create(properties) {
        return new CAuthentication_GetAuthSessionsForAccount_Request(properties);
    };

    /**
     * Encodes the specified CAuthentication_GetAuthSessionsForAccount_Request message. Does not implicitly {@link CAuthentication_GetAuthSessionsForAccount_Request.verify|verify} messages.
     * @function encode
     * @memberof CAuthentication_GetAuthSessionsForAccount_Request
     * @static
     * @param {ICAuthentication_GetAuthSessionsForAccount_Request} message CAuthentication_GetAuthSessionsForAccount_Request message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CAuthentication_GetAuthSessionsForAccount_Request.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        return writer;
    };

    /**
     * Encodes the specified CAuthentication_GetAuthSessionsForAccount_Request message, length delimited. Does not implicitly {@link CAuthentication_GetAuthSessionsForAccount_Request.verify|verify} messages.
     * @function encodeDelimited
     * @memberof CAuthentication_GetAuthSessionsForAccount_Request
     * @static
     * @param {ICAuthentication_GetAuthSessionsForAccount_Request} message CAuthentication_GetAuthSessionsForAccount_Request message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CAuthentication_GetAuthSessionsForAccount_Request.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a CAuthentication_GetAuthSessionsForAccount_Request message from the specified reader or buffer.
     * @function decode
     * @memberof CAuthentication_GetAuthSessionsForAccount_Request
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {CAuthentication_GetAuthSessionsForAccount_Request} CAuthentication_GetAuthSessionsForAccount_Request
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CAuthentication_GetAuthSessionsForAccount_Request.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.CAuthentication_GetAuthSessionsForAccount_Request();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a CAuthentication_GetAuthSessionsForAccount_Request message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof CAuthentication_GetAuthSessionsForAccount_Request
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {CAuthentication_GetAuthSessionsForAccount_Request} CAuthentication_GetAuthSessionsForAccount_Request
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CAuthentication_GetAuthSessionsForAccount_Request.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a CAuthentication_GetAuthSessionsForAccount_Request message.
     * @function verify
     * @memberof CAuthentication_GetAuthSessionsForAccount_Request
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    CAuthentication_GetAuthSessionsForAccount_Request.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        return null;
    };

    /**
     * Creates a CAuthentication_GetAuthSessionsForAccount_Request message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof CAuthentication_GetAuthSessionsForAccount_Request
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {CAuthentication_GetAuthSessionsForAccount_Request} CAuthentication_GetAuthSessionsForAccount_Request
     */
    CAuthentication_GetAuthSessionsForAccount_Request.fromObject = function fromObject(object) {
        if (object instanceof $root.CAuthentication_GetAuthSessionsForAccount_Request)
            return object;
        return new $root.CAuthentication_GetAuthSessionsForAccount_Request();
    };

    /**
     * Creates a plain object from a CAuthentication_GetAuthSessionsForAccount_Request message. Also converts values to other types if specified.
     * @function toObject
     * @memberof CAuthentication_GetAuthSessionsForAccount_Request
     * @static
     * @param {CAuthentication_GetAuthSessionsForAccount_Request} message CAuthentication_GetAuthSessionsForAccount_Request
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    CAuthentication_GetAuthSessionsForAccount_Request.toObject = function toObject() {
        return {};
    };

    /**
     * Converts this CAuthentication_GetAuthSessionsForAccount_Request to JSON.
     * @function toJSON
     * @memberof CAuthentication_GetAuthSessionsForAccount_Request
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    CAuthentication_GetAuthSessionsForAccount_Request.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for CAuthentication_GetAuthSessionsForAccount_Request
     * @function getTypeUrl
     * @memberof CAuthentication_GetAuthSessionsForAccount_Request
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    CAuthentication_GetAuthSessionsForAccount_Request.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/CAuthentication_GetAuthSessionsForAccount_Request";
    };

    return CAuthentication_GetAuthSessionsForAccount_Request;
})();

export const CAuthentication_GetAuthSessionsForAccount_Response = $root.CAuthentication_GetAuthSessionsForAccount_Response = (() => {

    /**
     * Properties of a CAuthentication_GetAuthSessionsForAccount_Response.
     * @exports ICAuthentication_GetAuthSessionsForAccount_Response
     * @interface ICAuthentication_GetAuthSessionsForAccount_Response
     * @property {Array.<Long>|null} [clientIds] CAuthentication_GetAuthSessionsForAccount_Response clientIds
     */

    /**
     * Constructs a new CAuthentication_GetAuthSessionsForAccount_Response.
     * @exports CAuthentication_GetAuthSessionsForAccount_Response
     * @classdesc Represents a CAuthentication_GetAuthSessionsForAccount_Response.
     * @implements ICAuthentication_GetAuthSessionsForAccount_Response
     * @constructor
     * @param {ICAuthentication_GetAuthSessionsForAccount_Response=} [properties] Properties to set
     */
    function CAuthentication_GetAuthSessionsForAccount_Response(properties) {
        this.clientIds = [];
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * CAuthentication_GetAuthSessionsForAccount_Response clientIds.
     * @member {Array.<Long>} clientIds
     * @memberof CAuthentication_GetAuthSessionsForAccount_Response
     * @instance
     */
    CAuthentication_GetAuthSessionsForAccount_Response.prototype.clientIds = $util.emptyArray;

    /**
     * Creates a new CAuthentication_GetAuthSessionsForAccount_Response instance using the specified properties.
     * @function create
     * @memberof CAuthentication_GetAuthSessionsForAccount_Response
     * @static
     * @param {ICAuthentication_GetAuthSessionsForAccount_Response=} [properties] Properties to set
     * @returns {CAuthentication_GetAuthSessionsForAccount_Response} CAuthentication_GetAuthSessionsForAccount_Response instance
     */
    CAuthentication_GetAuthSessionsForAccount_Response.create = function create(properties) {
        return new CAuthentication_GetAuthSessionsForAccount_Response(properties);
    };

    /**
     * Encodes the specified CAuthentication_GetAuthSessionsForAccount_Response message. Does not implicitly {@link CAuthentication_GetAuthSessionsForAccount_Response.verify|verify} messages.
     * @function encode
     * @memberof CAuthentication_GetAuthSessionsForAccount_Response
     * @static
     * @param {ICAuthentication_GetAuthSessionsForAccount_Response} message CAuthentication_GetAuthSessionsForAccount_Response message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CAuthentication_GetAuthSessionsForAccount_Response.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.clientIds != null && message.clientIds.length)
            for (let i = 0; i < message.clientIds.length; ++i)
                writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.clientIds[i]);
        return writer;
    };

    /**
     * Encodes the specified CAuthentication_GetAuthSessionsForAccount_Response message, length delimited. Does not implicitly {@link CAuthentication_GetAuthSessionsForAccount_Response.verify|verify} messages.
     * @function encodeDelimited
     * @memberof CAuthentication_GetAuthSessionsForAccount_Response
     * @static
     * @param {ICAuthentication_GetAuthSessionsForAccount_Response} message CAuthentication_GetAuthSessionsForAccount_Response message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CAuthentication_GetAuthSessionsForAccount_Response.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a CAuthentication_GetAuthSessionsForAccount_Response message from the specified reader or buffer.
     * @function decode
     * @memberof CAuthentication_GetAuthSessionsForAccount_Response
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {CAuthentication_GetAuthSessionsForAccount_Response} CAuthentication_GetAuthSessionsForAccount_Response
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CAuthentication_GetAuthSessionsForAccount_Response.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.CAuthentication_GetAuthSessionsForAccount_Response();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    if (!(message.clientIds && message.clientIds.length))
                        message.clientIds = [];
                    if ((tag & 7) === 2) {
                        let end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.clientIds.push(reader.uint64());
                    } else
                        message.clientIds.push(reader.uint64());
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a CAuthentication_GetAuthSessionsForAccount_Response message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof CAuthentication_GetAuthSessionsForAccount_Response
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {CAuthentication_GetAuthSessionsForAccount_Response} CAuthentication_GetAuthSessionsForAccount_Response
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CAuthentication_GetAuthSessionsForAccount_Response.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a CAuthentication_GetAuthSessionsForAccount_Response message.
     * @function verify
     * @memberof CAuthentication_GetAuthSessionsForAccount_Response
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    CAuthentication_GetAuthSessionsForAccount_Response.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.clientIds != null && message.hasOwnProperty("clientIds")) {
            if (!Array.isArray(message.clientIds))
                return "clientIds: array expected";
            for (let i = 0; i < message.clientIds.length; ++i)
                if (!$util.isInteger(message.clientIds[i]) && !(message.clientIds[i] && $util.isInteger(message.clientIds[i].low) && $util.isInteger(message.clientIds[i].high)))
                    return "clientIds: integer|Long[] expected";
        }
        return null;
    };

    /**
     * Creates a CAuthentication_GetAuthSessionsForAccount_Response message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof CAuthentication_GetAuthSessionsForAccount_Response
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {CAuthentication_GetAuthSessionsForAccount_Response} CAuthentication_GetAuthSessionsForAccount_Response
     */
    CAuthentication_GetAuthSessionsForAccount_Response.fromObject = function fromObject(object) {
        if (object instanceof $root.CAuthentication_GetAuthSessionsForAccount_Response)
            return object;
        let message = new $root.CAuthentication_GetAuthSessionsForAccount_Response();
        if (object.clientIds) {
            if (!Array.isArray(object.clientIds))
                throw TypeError(".CAuthentication_GetAuthSessionsForAccount_Response.clientIds: array expected");
            message.clientIds = [];
            for (let i = 0; i < object.clientIds.length; ++i)
                if ($util.Long)
                    (message.clientIds[i] = $util.Long.fromValue(object.clientIds[i])).unsigned = true;
                else if (typeof object.clientIds[i] === "string")
                    message.clientIds[i] = parseInt(object.clientIds[i], 10);
                else if (typeof object.clientIds[i] === "number")
                    message.clientIds[i] = object.clientIds[i];
                else if (typeof object.clientIds[i] === "object")
                    message.clientIds[i] = new $util.LongBits(object.clientIds[i].low >>> 0, object.clientIds[i].high >>> 0).toNumber(true);
        }
        return message;
    };

    /**
     * Creates a plain object from a CAuthentication_GetAuthSessionsForAccount_Response message. Also converts values to other types if specified.
     * @function toObject
     * @memberof CAuthentication_GetAuthSessionsForAccount_Response
     * @static
     * @param {CAuthentication_GetAuthSessionsForAccount_Response} message CAuthentication_GetAuthSessionsForAccount_Response
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    CAuthentication_GetAuthSessionsForAccount_Response.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.arrays || options.defaults)
            object.clientIds = [];
        if (message.clientIds && message.clientIds.length) {
            object.clientIds = [];
            for (let j = 0; j < message.clientIds.length; ++j)
                if (typeof message.clientIds[j] === "number")
                    object.clientIds[j] = options.longs === String ? String(message.clientIds[j]) : message.clientIds[j];
                else
                    object.clientIds[j] = options.longs === String ? $util.Long.prototype.toString.call(message.clientIds[j]) : options.longs === Number ? new $util.LongBits(message.clientIds[j].low >>> 0, message.clientIds[j].high >>> 0).toNumber(true) : message.clientIds[j];
        }
        return object;
    };

    /**
     * Converts this CAuthentication_GetAuthSessionsForAccount_Response to JSON.
     * @function toJSON
     * @memberof CAuthentication_GetAuthSessionsForAccount_Response
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    CAuthentication_GetAuthSessionsForAccount_Response.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for CAuthentication_GetAuthSessionsForAccount_Response
     * @function getTypeUrl
     * @memberof CAuthentication_GetAuthSessionsForAccount_Response
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    CAuthentication_GetAuthSessionsForAccount_Response.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/CAuthentication_GetAuthSessionsForAccount_Response";
    };

    return CAuthentication_GetAuthSessionsForAccount_Response;
})();

export const CAuthentication_GetAuthSessionInfo_Response = $root.CAuthentication_GetAuthSessionInfo_Response = (() => {

    /**
     * Properties of a CAuthentication_GetAuthSessionInfo_Response.
     * @exports ICAuthentication_GetAuthSessionInfo_Response
     * @interface ICAuthentication_GetAuthSessionInfo_Response
     * @property {string|null} [ip] CAuthentication_GetAuthSessionInfo_Response ip
     * @property {string|null} [geoloc] CAuthentication_GetAuthSessionInfo_Response geoloc
     * @property {string|null} [city] CAuthentication_GetAuthSessionInfo_Response city
     * @property {string|null} [state] CAuthentication_GetAuthSessionInfo_Response state
     * @property {string|null} [country] CAuthentication_GetAuthSessionInfo_Response country
     * @property {EAuthTokenPlatformType|null} [platformType] CAuthentication_GetAuthSessionInfo_Response platformType
     * @property {string|null} [deviceFriendlyName] CAuthentication_GetAuthSessionInfo_Response deviceFriendlyName
     * @property {number|null} [version] CAuthentication_GetAuthSessionInfo_Response version
     * @property {EAuthSessionSecurityHistory|null} [loginHistory] CAuthentication_GetAuthSessionInfo_Response loginHistory
     * @property {boolean|null} [requestorLocationMismatch] CAuthentication_GetAuthSessionInfo_Response requestorLocationMismatch
     * @property {boolean|null} [highUsageLogin] CAuthentication_GetAuthSessionInfo_Response highUsageLogin
     * @property {ESessionPersistence|null} [requestedPersistence] CAuthentication_GetAuthSessionInfo_Response requestedPersistence
     * @property {number|null} [deviceTrust] CAuthentication_GetAuthSessionInfo_Response deviceTrust
     * @property {EAuthTokenAppType|null} [appType] CAuthentication_GetAuthSessionInfo_Response appType
     */

    /**
     * Constructs a new CAuthentication_GetAuthSessionInfo_Response.
     * @exports CAuthentication_GetAuthSessionInfo_Response
     * @classdesc Represents a CAuthentication_GetAuthSessionInfo_Response.
     * @implements ICAuthentication_GetAuthSessionInfo_Response
     * @constructor
     * @param {ICAuthentication_GetAuthSessionInfo_Response=} [properties] Properties to set
     */
    function CAuthentication_GetAuthSessionInfo_Response(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * CAuthentication_GetAuthSessionInfo_Response ip.
     * @member {string} ip
     * @memberof CAuthentication_GetAuthSessionInfo_Response
     * @instance
     */
    CAuthentication_GetAuthSessionInfo_Response.prototype.ip = "";

    /**
     * CAuthentication_GetAuthSessionInfo_Response geoloc.
     * @member {string} geoloc
     * @memberof CAuthentication_GetAuthSessionInfo_Response
     * @instance
     */
    CAuthentication_GetAuthSessionInfo_Response.prototype.geoloc = "";

    /**
     * CAuthentication_GetAuthSessionInfo_Response city.
     * @member {string} city
     * @memberof CAuthentication_GetAuthSessionInfo_Response
     * @instance
     */
    CAuthentication_GetAuthSessionInfo_Response.prototype.city = "";

    /**
     * CAuthentication_GetAuthSessionInfo_Response state.
     * @member {string} state
     * @memberof CAuthentication_GetAuthSessionInfo_Response
     * @instance
     */
    CAuthentication_GetAuthSessionInfo_Response.prototype.state = "";

    /**
     * CAuthentication_GetAuthSessionInfo_Response country.
     * @member {string} country
     * @memberof CAuthentication_GetAuthSessionInfo_Response
     * @instance
     */
    CAuthentication_GetAuthSessionInfo_Response.prototype.country = "";

    /**
     * CAuthentication_GetAuthSessionInfo_Response platformType.
     * @member {EAuthTokenPlatformType} platformType
     * @memberof CAuthentication_GetAuthSessionInfo_Response
     * @instance
     */
    CAuthentication_GetAuthSessionInfo_Response.prototype.platformType = 0;

    /**
     * CAuthentication_GetAuthSessionInfo_Response deviceFriendlyName.
     * @member {string} deviceFriendlyName
     * @memberof CAuthentication_GetAuthSessionInfo_Response
     * @instance
     */
    CAuthentication_GetAuthSessionInfo_Response.prototype.deviceFriendlyName = "";

    /**
     * CAuthentication_GetAuthSessionInfo_Response version.
     * @member {number} version
     * @memberof CAuthentication_GetAuthSessionInfo_Response
     * @instance
     */
    CAuthentication_GetAuthSessionInfo_Response.prototype.version = 0;

    /**
     * CAuthentication_GetAuthSessionInfo_Response loginHistory.
     * @member {EAuthSessionSecurityHistory} loginHistory
     * @memberof CAuthentication_GetAuthSessionInfo_Response
     * @instance
     */
    CAuthentication_GetAuthSessionInfo_Response.prototype.loginHistory = 0;

    /**
     * CAuthentication_GetAuthSessionInfo_Response requestorLocationMismatch.
     * @member {boolean} requestorLocationMismatch
     * @memberof CAuthentication_GetAuthSessionInfo_Response
     * @instance
     */
    CAuthentication_GetAuthSessionInfo_Response.prototype.requestorLocationMismatch = false;

    /**
     * CAuthentication_GetAuthSessionInfo_Response highUsageLogin.
     * @member {boolean} highUsageLogin
     * @memberof CAuthentication_GetAuthSessionInfo_Response
     * @instance
     */
    CAuthentication_GetAuthSessionInfo_Response.prototype.highUsageLogin = false;

    /**
     * CAuthentication_GetAuthSessionInfo_Response requestedPersistence.
     * @member {ESessionPersistence} requestedPersistence
     * @memberof CAuthentication_GetAuthSessionInfo_Response
     * @instance
     */
    CAuthentication_GetAuthSessionInfo_Response.prototype.requestedPersistence = -1;

    /**
     * CAuthentication_GetAuthSessionInfo_Response deviceTrust.
     * @member {number} deviceTrust
     * @memberof CAuthentication_GetAuthSessionInfo_Response
     * @instance
     */
    CAuthentication_GetAuthSessionInfo_Response.prototype.deviceTrust = 0;

    /**
     * CAuthentication_GetAuthSessionInfo_Response appType.
     * @member {EAuthTokenAppType} appType
     * @memberof CAuthentication_GetAuthSessionInfo_Response
     * @instance
     */
    CAuthentication_GetAuthSessionInfo_Response.prototype.appType = 0;

    /**
     * Creates a new CAuthentication_GetAuthSessionInfo_Response instance using the specified properties.
     * @function create
     * @memberof CAuthentication_GetAuthSessionInfo_Response
     * @static
     * @param {ICAuthentication_GetAuthSessionInfo_Response=} [properties] Properties to set
     * @returns {CAuthentication_GetAuthSessionInfo_Response} CAuthentication_GetAuthSessionInfo_Response instance
     */
    CAuthentication_GetAuthSessionInfo_Response.create = function create(properties) {
        return new CAuthentication_GetAuthSessionInfo_Response(properties);
    };

    /**
     * Encodes the specified CAuthentication_GetAuthSessionInfo_Response message. Does not implicitly {@link CAuthentication_GetAuthSessionInfo_Response.verify|verify} messages.
     * @function encode
     * @memberof CAuthentication_GetAuthSessionInfo_Response
     * @static
     * @param {ICAuthentication_GetAuthSessionInfo_Response} message CAuthentication_GetAuthSessionInfo_Response message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CAuthentication_GetAuthSessionInfo_Response.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.ip != null && Object.hasOwnProperty.call(message, "ip"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.ip);
        if (message.geoloc != null && Object.hasOwnProperty.call(message, "geoloc"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.geoloc);
        if (message.city != null && Object.hasOwnProperty.call(message, "city"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.city);
        if (message.state != null && Object.hasOwnProperty.call(message, "state"))
            writer.uint32(/* id 4, wireType 2 =*/34).string(message.state);
        if (message.country != null && Object.hasOwnProperty.call(message, "country"))
            writer.uint32(/* id 5, wireType 2 =*/42).string(message.country);
        if (message.platformType != null && Object.hasOwnProperty.call(message, "platformType"))
            writer.uint32(/* id 6, wireType 0 =*/48).int32(message.platformType);
        if (message.deviceFriendlyName != null && Object.hasOwnProperty.call(message, "deviceFriendlyName"))
            writer.uint32(/* id 7, wireType 2 =*/58).string(message.deviceFriendlyName);
        if (message.version != null && Object.hasOwnProperty.call(message, "version"))
            writer.uint32(/* id 8, wireType 0 =*/64).int32(message.version);
        if (message.loginHistory != null && Object.hasOwnProperty.call(message, "loginHistory"))
            writer.uint32(/* id 9, wireType 0 =*/72).int32(message.loginHistory);
        if (message.requestorLocationMismatch != null && Object.hasOwnProperty.call(message, "requestorLocationMismatch"))
            writer.uint32(/* id 10, wireType 0 =*/80).bool(message.requestorLocationMismatch);
        if (message.highUsageLogin != null && Object.hasOwnProperty.call(message, "highUsageLogin"))
            writer.uint32(/* id 11, wireType 0 =*/88).bool(message.highUsageLogin);
        if (message.requestedPersistence != null && Object.hasOwnProperty.call(message, "requestedPersistence"))
            writer.uint32(/* id 12, wireType 0 =*/96).int32(message.requestedPersistence);
        if (message.deviceTrust != null && Object.hasOwnProperty.call(message, "deviceTrust"))
            writer.uint32(/* id 13, wireType 0 =*/104).int32(message.deviceTrust);
        if (message.appType != null && Object.hasOwnProperty.call(message, "appType"))
            writer.uint32(/* id 14, wireType 0 =*/112).int32(message.appType);
        return writer;
    };

    /**
     * Encodes the specified CAuthentication_GetAuthSessionInfo_Response message, length delimited. Does not implicitly {@link CAuthentication_GetAuthSessionInfo_Response.verify|verify} messages.
     * @function encodeDelimited
     * @memberof CAuthentication_GetAuthSessionInfo_Response
     * @static
     * @param {ICAuthentication_GetAuthSessionInfo_Response} message CAuthentication_GetAuthSessionInfo_Response message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CAuthentication_GetAuthSessionInfo_Response.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a CAuthentication_GetAuthSessionInfo_Response message from the specified reader or buffer.
     * @function decode
     * @memberof CAuthentication_GetAuthSessionInfo_Response
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {CAuthentication_GetAuthSessionInfo_Response} CAuthentication_GetAuthSessionInfo_Response
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CAuthentication_GetAuthSessionInfo_Response.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.CAuthentication_GetAuthSessionInfo_Response();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    message.ip = reader.string();
                    break;
                }
            case 2: {
                    message.geoloc = reader.string();
                    break;
                }
            case 3: {
                    message.city = reader.string();
                    break;
                }
            case 4: {
                    message.state = reader.string();
                    break;
                }
            case 5: {
                    message.country = reader.string();
                    break;
                }
            case 6: {
                    message.platformType = reader.int32();
                    break;
                }
            case 7: {
                    message.deviceFriendlyName = reader.string();
                    break;
                }
            case 8: {
                    message.version = reader.int32();
                    break;
                }
            case 9: {
                    message.loginHistory = reader.int32();
                    break;
                }
            case 10: {
                    message.requestorLocationMismatch = reader.bool();
                    break;
                }
            case 11: {
                    message.highUsageLogin = reader.bool();
                    break;
                }
            case 12: {
                    message.requestedPersistence = reader.int32();
                    break;
                }
            case 13: {
                    message.deviceTrust = reader.int32();
                    break;
                }
            case 14: {
                    message.appType = reader.int32();
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a CAuthentication_GetAuthSessionInfo_Response message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof CAuthentication_GetAuthSessionInfo_Response
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {CAuthentication_GetAuthSessionInfo_Response} CAuthentication_GetAuthSessionInfo_Response
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CAuthentication_GetAuthSessionInfo_Response.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a CAuthentication_GetAuthSessionInfo_Response message.
     * @function verify
     * @memberof CAuthentication_GetAuthSessionInfo_Response
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    CAuthentication_GetAuthSessionInfo_Response.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.ip != null && message.hasOwnProperty("ip"))
            if (!$util.isString(message.ip))
                return "ip: string expected";
        if (message.geoloc != null && message.hasOwnProperty("geoloc"))
            if (!$util.isString(message.geoloc))
                return "geoloc: string expected";
        if (message.city != null && message.hasOwnProperty("city"))
            if (!$util.isString(message.city))
                return "city: string expected";
        if (message.state != null && message.hasOwnProperty("state"))
            if (!$util.isString(message.state))
                return "state: string expected";
        if (message.country != null && message.hasOwnProperty("country"))
            if (!$util.isString(message.country))
                return "country: string expected";
        if (message.platformType != null && message.hasOwnProperty("platformType"))
            switch (message.platformType) {
            default:
                return "platformType: enum value expected";
            case 0:
            case 1:
            case 2:
            case 3:
                break;
            }
        if (message.deviceFriendlyName != null && message.hasOwnProperty("deviceFriendlyName"))
            if (!$util.isString(message.deviceFriendlyName))
                return "deviceFriendlyName: string expected";
        if (message.version != null && message.hasOwnProperty("version"))
            if (!$util.isInteger(message.version))
                return "version: integer expected";
        if (message.loginHistory != null && message.hasOwnProperty("loginHistory"))
            switch (message.loginHistory) {
            default:
                return "loginHistory: enum value expected";
            case 0:
            case 1:
            case 2:
                break;
            }
        if (message.requestorLocationMismatch != null && message.hasOwnProperty("requestorLocationMismatch"))
            if (typeof message.requestorLocationMismatch !== "boolean")
                return "requestorLocationMismatch: boolean expected";
        if (message.highUsageLogin != null && message.hasOwnProperty("highUsageLogin"))
            if (typeof message.highUsageLogin !== "boolean")
                return "highUsageLogin: boolean expected";
        if (message.requestedPersistence != null && message.hasOwnProperty("requestedPersistence"))
            switch (message.requestedPersistence) {
            default:
                return "requestedPersistence: enum value expected";
            case -1:
            case 0:
            case 1:
                break;
            }
        if (message.deviceTrust != null && message.hasOwnProperty("deviceTrust"))
            if (!$util.isInteger(message.deviceTrust))
                return "deviceTrust: integer expected";
        if (message.appType != null && message.hasOwnProperty("appType"))
            switch (message.appType) {
            default:
                return "appType: enum value expected";
            case 0:
            case 1:
            case 2:
                break;
            }
        return null;
    };

    /**
     * Creates a CAuthentication_GetAuthSessionInfo_Response message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof CAuthentication_GetAuthSessionInfo_Response
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {CAuthentication_GetAuthSessionInfo_Response} CAuthentication_GetAuthSessionInfo_Response
     */
    CAuthentication_GetAuthSessionInfo_Response.fromObject = function fromObject(object) {
        if (object instanceof $root.CAuthentication_GetAuthSessionInfo_Response)
            return object;
        let message = new $root.CAuthentication_GetAuthSessionInfo_Response();
        if (object.ip != null)
            message.ip = String(object.ip);
        if (object.geoloc != null)
            message.geoloc = String(object.geoloc);
        if (object.city != null)
            message.city = String(object.city);
        if (object.state != null)
            message.state = String(object.state);
        if (object.country != null)
            message.country = String(object.country);
        switch (object.platformType) {
        default:
            if (typeof object.platformType === "number") {
                message.platformType = object.platformType;
                break;
            }
            break;
        case "k_EAuthTokenPlatformType_Unknown":
        case 0:
            message.platformType = 0;
            break;
        case "k_EAuthTokenPlatformType_SteamClient":
        case 1:
            message.platformType = 1;
            break;
        case "k_EAuthTokenPlatformType_WebBrowser":
        case 2:
            message.platformType = 2;
            break;
        case "k_EAuthTokenPlatformType_MobileApp":
        case 3:
            message.platformType = 3;
            break;
        }
        if (object.deviceFriendlyName != null)
            message.deviceFriendlyName = String(object.deviceFriendlyName);
        if (object.version != null)
            message.version = object.version | 0;
        switch (object.loginHistory) {
        default:
            if (typeof object.loginHistory === "number") {
                message.loginHistory = object.loginHistory;
                break;
            }
            break;
        case "k_EAuthSessionSecurityHistory_Invalid":
        case 0:
            message.loginHistory = 0;
            break;
        case "k_EAuthSessionSecurityHistory_UsedPreviously":
        case 1:
            message.loginHistory = 1;
            break;
        case "k_EAuthSessionSecurityHistory_NoPriorHistory":
        case 2:
            message.loginHistory = 2;
            break;
        }
        if (object.requestorLocationMismatch != null)
            message.requestorLocationMismatch = Boolean(object.requestorLocationMismatch);
        if (object.highUsageLogin != null)
            message.highUsageLogin = Boolean(object.highUsageLogin);
        switch (object.requestedPersistence) {
        default:
            if (typeof object.requestedPersistence === "number") {
                message.requestedPersistence = object.requestedPersistence;
                break;
            }
            break;
        case "k_ESessionPersistence_Invalid":
        case -1:
            message.requestedPersistence = -1;
            break;
        case "k_ESessionPersistence_Ephemeral":
        case 0:
            message.requestedPersistence = 0;
            break;
        case "k_ESessionPersistence_Persistent":
        case 1:
            message.requestedPersistence = 1;
            break;
        }
        if (object.deviceTrust != null)
            message.deviceTrust = object.deviceTrust | 0;
        switch (object.appType) {
        default:
            if (typeof object.appType === "number") {
                message.appType = object.appType;
                break;
            }
            break;
        case "k_EAuthTokenAppType_Unknown":
        case 0:
            message.appType = 0;
            break;
        case "k_EAuthTokenAppType_Mobile_SteamApp":
        case 1:
            message.appType = 1;
            break;
        case "k_EAuthTokenAppType_Mobile_ChatApp":
        case 2:
            message.appType = 2;
            break;
        }
        return message;
    };

    /**
     * Creates a plain object from a CAuthentication_GetAuthSessionInfo_Response message. Also converts values to other types if specified.
     * @function toObject
     * @memberof CAuthentication_GetAuthSessionInfo_Response
     * @static
     * @param {CAuthentication_GetAuthSessionInfo_Response} message CAuthentication_GetAuthSessionInfo_Response
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    CAuthentication_GetAuthSessionInfo_Response.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.ip = "";
            object.geoloc = "";
            object.city = "";
            object.state = "";
            object.country = "";
            object.platformType = options.enums === String ? "k_EAuthTokenPlatformType_Unknown" : 0;
            object.deviceFriendlyName = "";
            object.version = 0;
            object.loginHistory = options.enums === String ? "k_EAuthSessionSecurityHistory_Invalid" : 0;
            object.requestorLocationMismatch = false;
            object.highUsageLogin = false;
            object.requestedPersistence = options.enums === String ? "k_ESessionPersistence_Invalid" : -1;
            object.deviceTrust = 0;
            object.appType = options.enums === String ? "k_EAuthTokenAppType_Unknown" : 0;
        }
        if (message.ip != null && message.hasOwnProperty("ip"))
            object.ip = message.ip;
        if (message.geoloc != null && message.hasOwnProperty("geoloc"))
            object.geoloc = message.geoloc;
        if (message.city != null && message.hasOwnProperty("city"))
            object.city = message.city;
        if (message.state != null && message.hasOwnProperty("state"))
            object.state = message.state;
        if (message.country != null && message.hasOwnProperty("country"))
            object.country = message.country;
        if (message.platformType != null && message.hasOwnProperty("platformType"))
            object.platformType = options.enums === String ? $root.EAuthTokenPlatformType[message.platformType] === undefined ? message.platformType : $root.EAuthTokenPlatformType[message.platformType] : message.platformType;
        if (message.deviceFriendlyName != null && message.hasOwnProperty("deviceFriendlyName"))
            object.deviceFriendlyName = message.deviceFriendlyName;
        if (message.version != null && message.hasOwnProperty("version"))
            object.version = message.version;
        if (message.loginHistory != null && message.hasOwnProperty("loginHistory"))
            object.loginHistory = options.enums === String ? $root.EAuthSessionSecurityHistory[message.loginHistory] === undefined ? message.loginHistory : $root.EAuthSessionSecurityHistory[message.loginHistory] : message.loginHistory;
        if (message.requestorLocationMismatch != null && message.hasOwnProperty("requestorLocationMismatch"))
            object.requestorLocationMismatch = message.requestorLocationMismatch;
        if (message.highUsageLogin != null && message.hasOwnProperty("highUsageLogin"))
            object.highUsageLogin = message.highUsageLogin;
        if (message.requestedPersistence != null && message.hasOwnProperty("requestedPersistence"))
            object.requestedPersistence = options.enums === String ? $root.ESessionPersistence[message.requestedPersistence] === undefined ? message.requestedPersistence : $root.ESessionPersistence[message.requestedPersistence] : message.requestedPersistence;
        if (message.deviceTrust != null && message.hasOwnProperty("deviceTrust"))
            object.deviceTrust = message.deviceTrust;
        if (message.appType != null && message.hasOwnProperty("appType"))
            object.appType = options.enums === String ? $root.EAuthTokenAppType[message.appType] === undefined ? message.appType : $root.EAuthTokenAppType[message.appType] : message.appType;
        return object;
    };

    /**
     * Converts this CAuthentication_GetAuthSessionInfo_Response to JSON.
     * @function toJSON
     * @memberof CAuthentication_GetAuthSessionInfo_Response
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    CAuthentication_GetAuthSessionInfo_Response.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for CAuthentication_GetAuthSessionInfo_Response
     * @function getTypeUrl
     * @memberof CAuthentication_GetAuthSessionInfo_Response
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    CAuthentication_GetAuthSessionInfo_Response.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/CAuthentication_GetAuthSessionInfo_Response";
    };

    return CAuthentication_GetAuthSessionInfo_Response;
})();

export const CAuthentication_UpdateAuthSessionWithMobileConfirmation_Request = $root.CAuthentication_UpdateAuthSessionWithMobileConfirmation_Request = (() => {

    /**
     * Properties of a CAuthentication_UpdateAuthSessionWithMobileConfirmation_Request.
     * @exports ICAuthentication_UpdateAuthSessionWithMobileConfirmation_Request
     * @interface ICAuthentication_UpdateAuthSessionWithMobileConfirmation_Request
     * @property {number|null} [version] CAuthentication_UpdateAuthSessionWithMobileConfirmation_Request version
     * @property {Long|null} [clientId] CAuthentication_UpdateAuthSessionWithMobileConfirmation_Request clientId
     * @property {Long|null} [steamid] CAuthentication_UpdateAuthSessionWithMobileConfirmation_Request steamid
     * @property {Uint8Array|null} [signature] CAuthentication_UpdateAuthSessionWithMobileConfirmation_Request signature
     * @property {boolean|null} [confirm] CAuthentication_UpdateAuthSessionWithMobileConfirmation_Request confirm
     * @property {ESessionPersistence|null} [persistence] CAuthentication_UpdateAuthSessionWithMobileConfirmation_Request persistence
     */

    /**
     * Constructs a new CAuthentication_UpdateAuthSessionWithMobileConfirmation_Request.
     * @exports CAuthentication_UpdateAuthSessionWithMobileConfirmation_Request
     * @classdesc Represents a CAuthentication_UpdateAuthSessionWithMobileConfirmation_Request.
     * @implements ICAuthentication_UpdateAuthSessionWithMobileConfirmation_Request
     * @constructor
     * @param {ICAuthentication_UpdateAuthSessionWithMobileConfirmation_Request=} [properties] Properties to set
     */
    function CAuthentication_UpdateAuthSessionWithMobileConfirmation_Request(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * CAuthentication_UpdateAuthSessionWithMobileConfirmation_Request version.
     * @member {number} version
     * @memberof CAuthentication_UpdateAuthSessionWithMobileConfirmation_Request
     * @instance
     */
    CAuthentication_UpdateAuthSessionWithMobileConfirmation_Request.prototype.version = 0;

    /**
     * CAuthentication_UpdateAuthSessionWithMobileConfirmation_Request clientId.
     * @member {Long} clientId
     * @memberof CAuthentication_UpdateAuthSessionWithMobileConfirmation_Request
     * @instance
     */
    CAuthentication_UpdateAuthSessionWithMobileConfirmation_Request.prototype.clientId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

    /**
     * CAuthentication_UpdateAuthSessionWithMobileConfirmation_Request steamid.
     * @member {Long} steamid
     * @memberof CAuthentication_UpdateAuthSessionWithMobileConfirmation_Request
     * @instance
     */
    CAuthentication_UpdateAuthSessionWithMobileConfirmation_Request.prototype.steamid = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * CAuthentication_UpdateAuthSessionWithMobileConfirmation_Request signature.
     * @member {Uint8Array} signature
     * @memberof CAuthentication_UpdateAuthSessionWithMobileConfirmation_Request
     * @instance
     */
    CAuthentication_UpdateAuthSessionWithMobileConfirmation_Request.prototype.signature = $util.newBuffer([]);

    /**
     * CAuthentication_UpdateAuthSessionWithMobileConfirmation_Request confirm.
     * @member {boolean} confirm
     * @memberof CAuthentication_UpdateAuthSessionWithMobileConfirmation_Request
     * @instance
     */
    CAuthentication_UpdateAuthSessionWithMobileConfirmation_Request.prototype.confirm = false;

    /**
     * CAuthentication_UpdateAuthSessionWithMobileConfirmation_Request persistence.
     * @member {ESessionPersistence} persistence
     * @memberof CAuthentication_UpdateAuthSessionWithMobileConfirmation_Request
     * @instance
     */
    CAuthentication_UpdateAuthSessionWithMobileConfirmation_Request.prototype.persistence = 1;

    /**
     * Creates a new CAuthentication_UpdateAuthSessionWithMobileConfirmation_Request instance using the specified properties.
     * @function create
     * @memberof CAuthentication_UpdateAuthSessionWithMobileConfirmation_Request
     * @static
     * @param {ICAuthentication_UpdateAuthSessionWithMobileConfirmation_Request=} [properties] Properties to set
     * @returns {CAuthentication_UpdateAuthSessionWithMobileConfirmation_Request} CAuthentication_UpdateAuthSessionWithMobileConfirmation_Request instance
     */
    CAuthentication_UpdateAuthSessionWithMobileConfirmation_Request.create = function create(properties) {
        return new CAuthentication_UpdateAuthSessionWithMobileConfirmation_Request(properties);
    };

    /**
     * Encodes the specified CAuthentication_UpdateAuthSessionWithMobileConfirmation_Request message. Does not implicitly {@link CAuthentication_UpdateAuthSessionWithMobileConfirmation_Request.verify|verify} messages.
     * @function encode
     * @memberof CAuthentication_UpdateAuthSessionWithMobileConfirmation_Request
     * @static
     * @param {ICAuthentication_UpdateAuthSessionWithMobileConfirmation_Request} message CAuthentication_UpdateAuthSessionWithMobileConfirmation_Request message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CAuthentication_UpdateAuthSessionWithMobileConfirmation_Request.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.version != null && Object.hasOwnProperty.call(message, "version"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.version);
        if (message.clientId != null && Object.hasOwnProperty.call(message, "clientId"))
            writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.clientId);
        if (message.steamid != null && Object.hasOwnProperty.call(message, "steamid"))
            writer.uint32(/* id 3, wireType 1 =*/25).fixed64(message.steamid);
        if (message.signature != null && Object.hasOwnProperty.call(message, "signature"))
            writer.uint32(/* id 4, wireType 2 =*/34).bytes(message.signature);
        if (message.confirm != null && Object.hasOwnProperty.call(message, "confirm"))
            writer.uint32(/* id 5, wireType 0 =*/40).bool(message.confirm);
        if (message.persistence != null && Object.hasOwnProperty.call(message, "persistence"))
            writer.uint32(/* id 6, wireType 0 =*/48).int32(message.persistence);
        return writer;
    };

    /**
     * Encodes the specified CAuthentication_UpdateAuthSessionWithMobileConfirmation_Request message, length delimited. Does not implicitly {@link CAuthentication_UpdateAuthSessionWithMobileConfirmation_Request.verify|verify} messages.
     * @function encodeDelimited
     * @memberof CAuthentication_UpdateAuthSessionWithMobileConfirmation_Request
     * @static
     * @param {ICAuthentication_UpdateAuthSessionWithMobileConfirmation_Request} message CAuthentication_UpdateAuthSessionWithMobileConfirmation_Request message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CAuthentication_UpdateAuthSessionWithMobileConfirmation_Request.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a CAuthentication_UpdateAuthSessionWithMobileConfirmation_Request message from the specified reader or buffer.
     * @function decode
     * @memberof CAuthentication_UpdateAuthSessionWithMobileConfirmation_Request
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {CAuthentication_UpdateAuthSessionWithMobileConfirmation_Request} CAuthentication_UpdateAuthSessionWithMobileConfirmation_Request
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CAuthentication_UpdateAuthSessionWithMobileConfirmation_Request.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.CAuthentication_UpdateAuthSessionWithMobileConfirmation_Request();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    message.version = reader.int32();
                    break;
                }
            case 2: {
                    message.clientId = reader.uint64();
                    break;
                }
            case 3: {
                    message.steamid = reader.fixed64();
                    break;
                }
            case 4: {
                    message.signature = reader.bytes();
                    break;
                }
            case 5: {
                    message.confirm = reader.bool();
                    break;
                }
            case 6: {
                    message.persistence = reader.int32();
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a CAuthentication_UpdateAuthSessionWithMobileConfirmation_Request message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof CAuthentication_UpdateAuthSessionWithMobileConfirmation_Request
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {CAuthentication_UpdateAuthSessionWithMobileConfirmation_Request} CAuthentication_UpdateAuthSessionWithMobileConfirmation_Request
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CAuthentication_UpdateAuthSessionWithMobileConfirmation_Request.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a CAuthentication_UpdateAuthSessionWithMobileConfirmation_Request message.
     * @function verify
     * @memberof CAuthentication_UpdateAuthSessionWithMobileConfirmation_Request
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    CAuthentication_UpdateAuthSessionWithMobileConfirmation_Request.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.version != null && message.hasOwnProperty("version"))
            if (!$util.isInteger(message.version))
                return "version: integer expected";
        if (message.clientId != null && message.hasOwnProperty("clientId"))
            if (!$util.isInteger(message.clientId) && !(message.clientId && $util.isInteger(message.clientId.low) && $util.isInteger(message.clientId.high)))
                return "clientId: integer|Long expected";
        if (message.steamid != null && message.hasOwnProperty("steamid"))
            if (!$util.isInteger(message.steamid) && !(message.steamid && $util.isInteger(message.steamid.low) && $util.isInteger(message.steamid.high)))
                return "steamid: integer|Long expected";
        if (message.signature != null && message.hasOwnProperty("signature"))
            if (!(message.signature && typeof message.signature.length === "number" || $util.isString(message.signature)))
                return "signature: buffer expected";
        if (message.confirm != null && message.hasOwnProperty("confirm"))
            if (typeof message.confirm !== "boolean")
                return "confirm: boolean expected";
        if (message.persistence != null && message.hasOwnProperty("persistence"))
            switch (message.persistence) {
            default:
                return "persistence: enum value expected";
            case -1:
            case 0:
            case 1:
                break;
            }
        return null;
    };

    /**
     * Creates a CAuthentication_UpdateAuthSessionWithMobileConfirmation_Request message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof CAuthentication_UpdateAuthSessionWithMobileConfirmation_Request
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {CAuthentication_UpdateAuthSessionWithMobileConfirmation_Request} CAuthentication_UpdateAuthSessionWithMobileConfirmation_Request
     */
    CAuthentication_UpdateAuthSessionWithMobileConfirmation_Request.fromObject = function fromObject(object) {
        if (object instanceof $root.CAuthentication_UpdateAuthSessionWithMobileConfirmation_Request)
            return object;
        let message = new $root.CAuthentication_UpdateAuthSessionWithMobileConfirmation_Request();
        if (object.version != null)
            message.version = object.version | 0;
        if (object.clientId != null)
            if ($util.Long)
                (message.clientId = $util.Long.fromValue(object.clientId)).unsigned = true;
            else if (typeof object.clientId === "string")
                message.clientId = parseInt(object.clientId, 10);
            else if (typeof object.clientId === "number")
                message.clientId = object.clientId;
            else if (typeof object.clientId === "object")
                message.clientId = new $util.LongBits(object.clientId.low >>> 0, object.clientId.high >>> 0).toNumber(true);
        if (object.steamid != null)
            if ($util.Long)
                (message.steamid = $util.Long.fromValue(object.steamid)).unsigned = false;
            else if (typeof object.steamid === "string")
                message.steamid = parseInt(object.steamid, 10);
            else if (typeof object.steamid === "number")
                message.steamid = object.steamid;
            else if (typeof object.steamid === "object")
                message.steamid = new $util.LongBits(object.steamid.low >>> 0, object.steamid.high >>> 0).toNumber();
        if (object.signature != null)
            if (typeof object.signature === "string")
                $util.base64.decode(object.signature, message.signature = $util.newBuffer($util.base64.length(object.signature)), 0);
            else if (object.signature.length >= 0)
                message.signature = object.signature;
        if (object.confirm != null)
            message.confirm = Boolean(object.confirm);
        switch (object.persistence) {
        case "k_ESessionPersistence_Invalid":
        case -1:
            message.persistence = -1;
            break;
        case "k_ESessionPersistence_Ephemeral":
        case 0:
            message.persistence = 0;
            break;
        default:
            if (typeof object.persistence === "number") {
                message.persistence = object.persistence;
                break;
            }
            break;
        case "k_ESessionPersistence_Persistent":
        case 1:
            message.persistence = 1;
            break;
        }
        return message;
    };

    /**
     * Creates a plain object from a CAuthentication_UpdateAuthSessionWithMobileConfirmation_Request message. Also converts values to other types if specified.
     * @function toObject
     * @memberof CAuthentication_UpdateAuthSessionWithMobileConfirmation_Request
     * @static
     * @param {CAuthentication_UpdateAuthSessionWithMobileConfirmation_Request} message CAuthentication_UpdateAuthSessionWithMobileConfirmation_Request
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    CAuthentication_UpdateAuthSessionWithMobileConfirmation_Request.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.version = 0;
            if ($util.Long) {
                let long = new $util.Long(0, 0, true);
                object.clientId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.clientId = options.longs === String ? "0" : 0;
            if ($util.Long) {
                let long = new $util.Long(0, 0, false);
                object.steamid = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.steamid = options.longs === String ? "0" : 0;
            if (options.bytes === String)
                object.signature = "";
            else {
                object.signature = [];
                if (options.bytes !== Array)
                    object.signature = $util.newBuffer(object.signature);
            }
            object.confirm = false;
            object.persistence = options.enums === String ? "k_ESessionPersistence_Persistent" : 1;
        }
        if (message.version != null && message.hasOwnProperty("version"))
            object.version = message.version;
        if (message.clientId != null && message.hasOwnProperty("clientId"))
            if (typeof message.clientId === "number")
                object.clientId = options.longs === String ? String(message.clientId) : message.clientId;
            else
                object.clientId = options.longs === String ? $util.Long.prototype.toString.call(message.clientId) : options.longs === Number ? new $util.LongBits(message.clientId.low >>> 0, message.clientId.high >>> 0).toNumber(true) : message.clientId;
        if (message.steamid != null && message.hasOwnProperty("steamid"))
            if (typeof message.steamid === "number")
                object.steamid = options.longs === String ? String(message.steamid) : message.steamid;
            else
                object.steamid = options.longs === String ? $util.Long.prototype.toString.call(message.steamid) : options.longs === Number ? new $util.LongBits(message.steamid.low >>> 0, message.steamid.high >>> 0).toNumber() : message.steamid;
        if (message.signature != null && message.hasOwnProperty("signature"))
            object.signature = options.bytes === String ? $util.base64.encode(message.signature, 0, message.signature.length) : options.bytes === Array ? Array.prototype.slice.call(message.signature) : message.signature;
        if (message.confirm != null && message.hasOwnProperty("confirm"))
            object.confirm = message.confirm;
        if (message.persistence != null && message.hasOwnProperty("persistence"))
            object.persistence = options.enums === String ? $root.ESessionPersistence[message.persistence] === undefined ? message.persistence : $root.ESessionPersistence[message.persistence] : message.persistence;
        return object;
    };

    /**
     * Converts this CAuthentication_UpdateAuthSessionWithMobileConfirmation_Request to JSON.
     * @function toJSON
     * @memberof CAuthentication_UpdateAuthSessionWithMobileConfirmation_Request
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    CAuthentication_UpdateAuthSessionWithMobileConfirmation_Request.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for CAuthentication_UpdateAuthSessionWithMobileConfirmation_Request
     * @function getTypeUrl
     * @memberof CAuthentication_UpdateAuthSessionWithMobileConfirmation_Request
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    CAuthentication_UpdateAuthSessionWithMobileConfirmation_Request.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/CAuthentication_UpdateAuthSessionWithMobileConfirmation_Request";
    };

    return CAuthentication_UpdateAuthSessionWithMobileConfirmation_Request;
})();

export const CAuthentication_UpdateAuthSessionWithMobileConfirmation_Response = $root.CAuthentication_UpdateAuthSessionWithMobileConfirmation_Response = (() => {

    /**
     * Properties of a CAuthentication_UpdateAuthSessionWithMobileConfirmation_Response.
     * @exports ICAuthentication_UpdateAuthSessionWithMobileConfirmation_Response
     * @interface ICAuthentication_UpdateAuthSessionWithMobileConfirmation_Response
     */

    /**
     * Constructs a new CAuthentication_UpdateAuthSessionWithMobileConfirmation_Response.
     * @exports CAuthentication_UpdateAuthSessionWithMobileConfirmation_Response
     * @classdesc Represents a CAuthentication_UpdateAuthSessionWithMobileConfirmation_Response.
     * @implements ICAuthentication_UpdateAuthSessionWithMobileConfirmation_Response
     * @constructor
     * @param {ICAuthentication_UpdateAuthSessionWithMobileConfirmation_Response=} [properties] Properties to set
     */
    function CAuthentication_UpdateAuthSessionWithMobileConfirmation_Response(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Creates a new CAuthentication_UpdateAuthSessionWithMobileConfirmation_Response instance using the specified properties.
     * @function create
     * @memberof CAuthentication_UpdateAuthSessionWithMobileConfirmation_Response
     * @static
     * @param {ICAuthentication_UpdateAuthSessionWithMobileConfirmation_Response=} [properties] Properties to set
     * @returns {CAuthentication_UpdateAuthSessionWithMobileConfirmation_Response} CAuthentication_UpdateAuthSessionWithMobileConfirmation_Response instance
     */
    CAuthentication_UpdateAuthSessionWithMobileConfirmation_Response.create = function create(properties) {
        return new CAuthentication_UpdateAuthSessionWithMobileConfirmation_Response(properties);
    };

    /**
     * Encodes the specified CAuthentication_UpdateAuthSessionWithMobileConfirmation_Response message. Does not implicitly {@link CAuthentication_UpdateAuthSessionWithMobileConfirmation_Response.verify|verify} messages.
     * @function encode
     * @memberof CAuthentication_UpdateAuthSessionWithMobileConfirmation_Response
     * @static
     * @param {ICAuthentication_UpdateAuthSessionWithMobileConfirmation_Response} message CAuthentication_UpdateAuthSessionWithMobileConfirmation_Response message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CAuthentication_UpdateAuthSessionWithMobileConfirmation_Response.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        return writer;
    };

    /**
     * Encodes the specified CAuthentication_UpdateAuthSessionWithMobileConfirmation_Response message, length delimited. Does not implicitly {@link CAuthentication_UpdateAuthSessionWithMobileConfirmation_Response.verify|verify} messages.
     * @function encodeDelimited
     * @memberof CAuthentication_UpdateAuthSessionWithMobileConfirmation_Response
     * @static
     * @param {ICAuthentication_UpdateAuthSessionWithMobileConfirmation_Response} message CAuthentication_UpdateAuthSessionWithMobileConfirmation_Response message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CAuthentication_UpdateAuthSessionWithMobileConfirmation_Response.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a CAuthentication_UpdateAuthSessionWithMobileConfirmation_Response message from the specified reader or buffer.
     * @function decode
     * @memberof CAuthentication_UpdateAuthSessionWithMobileConfirmation_Response
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {CAuthentication_UpdateAuthSessionWithMobileConfirmation_Response} CAuthentication_UpdateAuthSessionWithMobileConfirmation_Response
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CAuthentication_UpdateAuthSessionWithMobileConfirmation_Response.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.CAuthentication_UpdateAuthSessionWithMobileConfirmation_Response();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a CAuthentication_UpdateAuthSessionWithMobileConfirmation_Response message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof CAuthentication_UpdateAuthSessionWithMobileConfirmation_Response
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {CAuthentication_UpdateAuthSessionWithMobileConfirmation_Response} CAuthentication_UpdateAuthSessionWithMobileConfirmation_Response
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CAuthentication_UpdateAuthSessionWithMobileConfirmation_Response.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a CAuthentication_UpdateAuthSessionWithMobileConfirmation_Response message.
     * @function verify
     * @memberof CAuthentication_UpdateAuthSessionWithMobileConfirmation_Response
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    CAuthentication_UpdateAuthSessionWithMobileConfirmation_Response.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        return null;
    };

    /**
     * Creates a CAuthentication_UpdateAuthSessionWithMobileConfirmation_Response message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof CAuthentication_UpdateAuthSessionWithMobileConfirmation_Response
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {CAuthentication_UpdateAuthSessionWithMobileConfirmation_Response} CAuthentication_UpdateAuthSessionWithMobileConfirmation_Response
     */
    CAuthentication_UpdateAuthSessionWithMobileConfirmation_Response.fromObject = function fromObject(object) {
        if (object instanceof $root.CAuthentication_UpdateAuthSessionWithMobileConfirmation_Response)
            return object;
        return new $root.CAuthentication_UpdateAuthSessionWithMobileConfirmation_Response();
    };

    /**
     * Creates a plain object from a CAuthentication_UpdateAuthSessionWithMobileConfirmation_Response message. Also converts values to other types if specified.
     * @function toObject
     * @memberof CAuthentication_UpdateAuthSessionWithMobileConfirmation_Response
     * @static
     * @param {CAuthentication_UpdateAuthSessionWithMobileConfirmation_Response} message CAuthentication_UpdateAuthSessionWithMobileConfirmation_Response
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    CAuthentication_UpdateAuthSessionWithMobileConfirmation_Response.toObject = function toObject() {
        return {};
    };

    /**
     * Converts this CAuthentication_UpdateAuthSessionWithMobileConfirmation_Response to JSON.
     * @function toJSON
     * @memberof CAuthentication_UpdateAuthSessionWithMobileConfirmation_Response
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    CAuthentication_UpdateAuthSessionWithMobileConfirmation_Response.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for CAuthentication_UpdateAuthSessionWithMobileConfirmation_Response
     * @function getTypeUrl
     * @memberof CAuthentication_UpdateAuthSessionWithMobileConfirmation_Response
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    CAuthentication_UpdateAuthSessionWithMobileConfirmation_Response.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/CAuthentication_UpdateAuthSessionWithMobileConfirmation_Response";
    };

    return CAuthentication_UpdateAuthSessionWithMobileConfirmation_Response;
})();

export const CTwoFactor_Time_Request = $root.CTwoFactor_Time_Request = (() => {

    /**
     * Properties of a CTwoFactor_Time_Request.
     * @exports ICTwoFactor_Time_Request
     * @interface ICTwoFactor_Time_Request
     * @property {Long|null} [senderTime] CTwoFactor_Time_Request senderTime
     */

    /**
     * Constructs a new CTwoFactor_Time_Request.
     * @exports CTwoFactor_Time_Request
     * @classdesc Represents a CTwoFactor_Time_Request.
     * @implements ICTwoFactor_Time_Request
     * @constructor
     * @param {ICTwoFactor_Time_Request=} [properties] Properties to set
     */
    function CTwoFactor_Time_Request(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * CTwoFactor_Time_Request senderTime.
     * @member {Long} senderTime
     * @memberof CTwoFactor_Time_Request
     * @instance
     */
    CTwoFactor_Time_Request.prototype.senderTime = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

    /**
     * Creates a new CTwoFactor_Time_Request instance using the specified properties.
     * @function create
     * @memberof CTwoFactor_Time_Request
     * @static
     * @param {ICTwoFactor_Time_Request=} [properties] Properties to set
     * @returns {CTwoFactor_Time_Request} CTwoFactor_Time_Request instance
     */
    CTwoFactor_Time_Request.create = function create(properties) {
        return new CTwoFactor_Time_Request(properties);
    };

    /**
     * Encodes the specified CTwoFactor_Time_Request message. Does not implicitly {@link CTwoFactor_Time_Request.verify|verify} messages.
     * @function encode
     * @memberof CTwoFactor_Time_Request
     * @static
     * @param {ICTwoFactor_Time_Request} message CTwoFactor_Time_Request message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CTwoFactor_Time_Request.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.senderTime != null && Object.hasOwnProperty.call(message, "senderTime"))
            writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.senderTime);
        return writer;
    };

    /**
     * Encodes the specified CTwoFactor_Time_Request message, length delimited. Does not implicitly {@link CTwoFactor_Time_Request.verify|verify} messages.
     * @function encodeDelimited
     * @memberof CTwoFactor_Time_Request
     * @static
     * @param {ICTwoFactor_Time_Request} message CTwoFactor_Time_Request message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CTwoFactor_Time_Request.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a CTwoFactor_Time_Request message from the specified reader or buffer.
     * @function decode
     * @memberof CTwoFactor_Time_Request
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {CTwoFactor_Time_Request} CTwoFactor_Time_Request
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CTwoFactor_Time_Request.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.CTwoFactor_Time_Request();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    message.senderTime = reader.uint64();
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a CTwoFactor_Time_Request message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof CTwoFactor_Time_Request
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {CTwoFactor_Time_Request} CTwoFactor_Time_Request
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CTwoFactor_Time_Request.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a CTwoFactor_Time_Request message.
     * @function verify
     * @memberof CTwoFactor_Time_Request
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    CTwoFactor_Time_Request.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.senderTime != null && message.hasOwnProperty("senderTime"))
            if (!$util.isInteger(message.senderTime) && !(message.senderTime && $util.isInteger(message.senderTime.low) && $util.isInteger(message.senderTime.high)))
                return "senderTime: integer|Long expected";
        return null;
    };

    /**
     * Creates a CTwoFactor_Time_Request message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof CTwoFactor_Time_Request
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {CTwoFactor_Time_Request} CTwoFactor_Time_Request
     */
    CTwoFactor_Time_Request.fromObject = function fromObject(object) {
        if (object instanceof $root.CTwoFactor_Time_Request)
            return object;
        let message = new $root.CTwoFactor_Time_Request();
        if (object.senderTime != null)
            if ($util.Long)
                (message.senderTime = $util.Long.fromValue(object.senderTime)).unsigned = true;
            else if (typeof object.senderTime === "string")
                message.senderTime = parseInt(object.senderTime, 10);
            else if (typeof object.senderTime === "number")
                message.senderTime = object.senderTime;
            else if (typeof object.senderTime === "object")
                message.senderTime = new $util.LongBits(object.senderTime.low >>> 0, object.senderTime.high >>> 0).toNumber(true);
        return message;
    };

    /**
     * Creates a plain object from a CTwoFactor_Time_Request message. Also converts values to other types if specified.
     * @function toObject
     * @memberof CTwoFactor_Time_Request
     * @static
     * @param {CTwoFactor_Time_Request} message CTwoFactor_Time_Request
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    CTwoFactor_Time_Request.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults)
            if ($util.Long) {
                let long = new $util.Long(0, 0, true);
                object.senderTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.senderTime = options.longs === String ? "0" : 0;
        if (message.senderTime != null && message.hasOwnProperty("senderTime"))
            if (typeof message.senderTime === "number")
                object.senderTime = options.longs === String ? String(message.senderTime) : message.senderTime;
            else
                object.senderTime = options.longs === String ? $util.Long.prototype.toString.call(message.senderTime) : options.longs === Number ? new $util.LongBits(message.senderTime.low >>> 0, message.senderTime.high >>> 0).toNumber(true) : message.senderTime;
        return object;
    };

    /**
     * Converts this CTwoFactor_Time_Request to JSON.
     * @function toJSON
     * @memberof CTwoFactor_Time_Request
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    CTwoFactor_Time_Request.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for CTwoFactor_Time_Request
     * @function getTypeUrl
     * @memberof CTwoFactor_Time_Request
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    CTwoFactor_Time_Request.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/CTwoFactor_Time_Request";
    };

    return CTwoFactor_Time_Request;
})();

export const CTwoFactor_Time_Response = $root.CTwoFactor_Time_Response = (() => {

    /**
     * Properties of a CTwoFactor_Time_Response.
     * @exports ICTwoFactor_Time_Response
     * @interface ICTwoFactor_Time_Response
     * @property {Long|null} [serverTime] CTwoFactor_Time_Response serverTime
     * @property {Long|null} [skewToleranceSeconds] CTwoFactor_Time_Response skewToleranceSeconds
     * @property {Long|null} [largeTimeJink] CTwoFactor_Time_Response largeTimeJink
     * @property {number|null} [probeFrequencySeconds] CTwoFactor_Time_Response probeFrequencySeconds
     * @property {number|null} [adjustedTimeProbeFrequencySeconds] CTwoFactor_Time_Response adjustedTimeProbeFrequencySeconds
     * @property {number|null} [hintProbeFrequencySeconds] CTwoFactor_Time_Response hintProbeFrequencySeconds
     * @property {number|null} [syncTimeout] CTwoFactor_Time_Response syncTimeout
     * @property {number|null} [tryAgainSeconds] CTwoFactor_Time_Response tryAgainSeconds
     * @property {number|null} [maxAttempts] CTwoFactor_Time_Response maxAttempts
     */

    /**
     * Constructs a new CTwoFactor_Time_Response.
     * @exports CTwoFactor_Time_Response
     * @classdesc Represents a CTwoFactor_Time_Response.
     * @implements ICTwoFactor_Time_Response
     * @constructor
     * @param {ICTwoFactor_Time_Response=} [properties] Properties to set
     */
    function CTwoFactor_Time_Response(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * CTwoFactor_Time_Response serverTime.
     * @member {Long} serverTime
     * @memberof CTwoFactor_Time_Response
     * @instance
     */
    CTwoFactor_Time_Response.prototype.serverTime = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

    /**
     * CTwoFactor_Time_Response skewToleranceSeconds.
     * @member {Long} skewToleranceSeconds
     * @memberof CTwoFactor_Time_Response
     * @instance
     */
    CTwoFactor_Time_Response.prototype.skewToleranceSeconds = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

    /**
     * CTwoFactor_Time_Response largeTimeJink.
     * @member {Long} largeTimeJink
     * @memberof CTwoFactor_Time_Response
     * @instance
     */
    CTwoFactor_Time_Response.prototype.largeTimeJink = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

    /**
     * CTwoFactor_Time_Response probeFrequencySeconds.
     * @member {number} probeFrequencySeconds
     * @memberof CTwoFactor_Time_Response
     * @instance
     */
    CTwoFactor_Time_Response.prototype.probeFrequencySeconds = 0;

    /**
     * CTwoFactor_Time_Response adjustedTimeProbeFrequencySeconds.
     * @member {number} adjustedTimeProbeFrequencySeconds
     * @memberof CTwoFactor_Time_Response
     * @instance
     */
    CTwoFactor_Time_Response.prototype.adjustedTimeProbeFrequencySeconds = 0;

    /**
     * CTwoFactor_Time_Response hintProbeFrequencySeconds.
     * @member {number} hintProbeFrequencySeconds
     * @memberof CTwoFactor_Time_Response
     * @instance
     */
    CTwoFactor_Time_Response.prototype.hintProbeFrequencySeconds = 0;

    /**
     * CTwoFactor_Time_Response syncTimeout.
     * @member {number} syncTimeout
     * @memberof CTwoFactor_Time_Response
     * @instance
     */
    CTwoFactor_Time_Response.prototype.syncTimeout = 0;

    /**
     * CTwoFactor_Time_Response tryAgainSeconds.
     * @member {number} tryAgainSeconds
     * @memberof CTwoFactor_Time_Response
     * @instance
     */
    CTwoFactor_Time_Response.prototype.tryAgainSeconds = 0;

    /**
     * CTwoFactor_Time_Response maxAttempts.
     * @member {number} maxAttempts
     * @memberof CTwoFactor_Time_Response
     * @instance
     */
    CTwoFactor_Time_Response.prototype.maxAttempts = 0;

    /**
     * Creates a new CTwoFactor_Time_Response instance using the specified properties.
     * @function create
     * @memberof CTwoFactor_Time_Response
     * @static
     * @param {ICTwoFactor_Time_Response=} [properties] Properties to set
     * @returns {CTwoFactor_Time_Response} CTwoFactor_Time_Response instance
     */
    CTwoFactor_Time_Response.create = function create(properties) {
        return new CTwoFactor_Time_Response(properties);
    };

    /**
     * Encodes the specified CTwoFactor_Time_Response message. Does not implicitly {@link CTwoFactor_Time_Response.verify|verify} messages.
     * @function encode
     * @memberof CTwoFactor_Time_Response
     * @static
     * @param {ICTwoFactor_Time_Response} message CTwoFactor_Time_Response message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CTwoFactor_Time_Response.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.serverTime != null && Object.hasOwnProperty.call(message, "serverTime"))
            writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.serverTime);
        if (message.skewToleranceSeconds != null && Object.hasOwnProperty.call(message, "skewToleranceSeconds"))
            writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.skewToleranceSeconds);
        if (message.largeTimeJink != null && Object.hasOwnProperty.call(message, "largeTimeJink"))
            writer.uint32(/* id 3, wireType 0 =*/24).uint64(message.largeTimeJink);
        if (message.probeFrequencySeconds != null && Object.hasOwnProperty.call(message, "probeFrequencySeconds"))
            writer.uint32(/* id 4, wireType 0 =*/32).uint32(message.probeFrequencySeconds);
        if (message.adjustedTimeProbeFrequencySeconds != null && Object.hasOwnProperty.call(message, "adjustedTimeProbeFrequencySeconds"))
            writer.uint32(/* id 5, wireType 0 =*/40).uint32(message.adjustedTimeProbeFrequencySeconds);
        if (message.hintProbeFrequencySeconds != null && Object.hasOwnProperty.call(message, "hintProbeFrequencySeconds"))
            writer.uint32(/* id 6, wireType 0 =*/48).uint32(message.hintProbeFrequencySeconds);
        if (message.syncTimeout != null && Object.hasOwnProperty.call(message, "syncTimeout"))
            writer.uint32(/* id 7, wireType 0 =*/56).uint32(message.syncTimeout);
        if (message.tryAgainSeconds != null && Object.hasOwnProperty.call(message, "tryAgainSeconds"))
            writer.uint32(/* id 8, wireType 0 =*/64).uint32(message.tryAgainSeconds);
        if (message.maxAttempts != null && Object.hasOwnProperty.call(message, "maxAttempts"))
            writer.uint32(/* id 9, wireType 0 =*/72).uint32(message.maxAttempts);
        return writer;
    };

    /**
     * Encodes the specified CTwoFactor_Time_Response message, length delimited. Does not implicitly {@link CTwoFactor_Time_Response.verify|verify} messages.
     * @function encodeDelimited
     * @memberof CTwoFactor_Time_Response
     * @static
     * @param {ICTwoFactor_Time_Response} message CTwoFactor_Time_Response message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CTwoFactor_Time_Response.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a CTwoFactor_Time_Response message from the specified reader or buffer.
     * @function decode
     * @memberof CTwoFactor_Time_Response
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {CTwoFactor_Time_Response} CTwoFactor_Time_Response
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CTwoFactor_Time_Response.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.CTwoFactor_Time_Response();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    message.serverTime = reader.uint64();
                    break;
                }
            case 2: {
                    message.skewToleranceSeconds = reader.uint64();
                    break;
                }
            case 3: {
                    message.largeTimeJink = reader.uint64();
                    break;
                }
            case 4: {
                    message.probeFrequencySeconds = reader.uint32();
                    break;
                }
            case 5: {
                    message.adjustedTimeProbeFrequencySeconds = reader.uint32();
                    break;
                }
            case 6: {
                    message.hintProbeFrequencySeconds = reader.uint32();
                    break;
                }
            case 7: {
                    message.syncTimeout = reader.uint32();
                    break;
                }
            case 8: {
                    message.tryAgainSeconds = reader.uint32();
                    break;
                }
            case 9: {
                    message.maxAttempts = reader.uint32();
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a CTwoFactor_Time_Response message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof CTwoFactor_Time_Response
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {CTwoFactor_Time_Response} CTwoFactor_Time_Response
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CTwoFactor_Time_Response.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a CTwoFactor_Time_Response message.
     * @function verify
     * @memberof CTwoFactor_Time_Response
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    CTwoFactor_Time_Response.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.serverTime != null && message.hasOwnProperty("serverTime"))
            if (!$util.isInteger(message.serverTime) && !(message.serverTime && $util.isInteger(message.serverTime.low) && $util.isInteger(message.serverTime.high)))
                return "serverTime: integer|Long expected";
        if (message.skewToleranceSeconds != null && message.hasOwnProperty("skewToleranceSeconds"))
            if (!$util.isInteger(message.skewToleranceSeconds) && !(message.skewToleranceSeconds && $util.isInteger(message.skewToleranceSeconds.low) && $util.isInteger(message.skewToleranceSeconds.high)))
                return "skewToleranceSeconds: integer|Long expected";
        if (message.largeTimeJink != null && message.hasOwnProperty("largeTimeJink"))
            if (!$util.isInteger(message.largeTimeJink) && !(message.largeTimeJink && $util.isInteger(message.largeTimeJink.low) && $util.isInteger(message.largeTimeJink.high)))
                return "largeTimeJink: integer|Long expected";
        if (message.probeFrequencySeconds != null && message.hasOwnProperty("probeFrequencySeconds"))
            if (!$util.isInteger(message.probeFrequencySeconds))
                return "probeFrequencySeconds: integer expected";
        if (message.adjustedTimeProbeFrequencySeconds != null && message.hasOwnProperty("adjustedTimeProbeFrequencySeconds"))
            if (!$util.isInteger(message.adjustedTimeProbeFrequencySeconds))
                return "adjustedTimeProbeFrequencySeconds: integer expected";
        if (message.hintProbeFrequencySeconds != null && message.hasOwnProperty("hintProbeFrequencySeconds"))
            if (!$util.isInteger(message.hintProbeFrequencySeconds))
                return "hintProbeFrequencySeconds: integer expected";
        if (message.syncTimeout != null && message.hasOwnProperty("syncTimeout"))
            if (!$util.isInteger(message.syncTimeout))
                return "syncTimeout: integer expected";
        if (message.tryAgainSeconds != null && message.hasOwnProperty("tryAgainSeconds"))
            if (!$util.isInteger(message.tryAgainSeconds))
                return "tryAgainSeconds: integer expected";
        if (message.maxAttempts != null && message.hasOwnProperty("maxAttempts"))
            if (!$util.isInteger(message.maxAttempts))
                return "maxAttempts: integer expected";
        return null;
    };

    /**
     * Creates a CTwoFactor_Time_Response message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof CTwoFactor_Time_Response
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {CTwoFactor_Time_Response} CTwoFactor_Time_Response
     */
    CTwoFactor_Time_Response.fromObject = function fromObject(object) {
        if (object instanceof $root.CTwoFactor_Time_Response)
            return object;
        let message = new $root.CTwoFactor_Time_Response();
        if (object.serverTime != null)
            if ($util.Long)
                (message.serverTime = $util.Long.fromValue(object.serverTime)).unsigned = true;
            else if (typeof object.serverTime === "string")
                message.serverTime = parseInt(object.serverTime, 10);
            else if (typeof object.serverTime === "number")
                message.serverTime = object.serverTime;
            else if (typeof object.serverTime === "object")
                message.serverTime = new $util.LongBits(object.serverTime.low >>> 0, object.serverTime.high >>> 0).toNumber(true);
        if (object.skewToleranceSeconds != null)
            if ($util.Long)
                (message.skewToleranceSeconds = $util.Long.fromValue(object.skewToleranceSeconds)).unsigned = true;
            else if (typeof object.skewToleranceSeconds === "string")
                message.skewToleranceSeconds = parseInt(object.skewToleranceSeconds, 10);
            else if (typeof object.skewToleranceSeconds === "number")
                message.skewToleranceSeconds = object.skewToleranceSeconds;
            else if (typeof object.skewToleranceSeconds === "object")
                message.skewToleranceSeconds = new $util.LongBits(object.skewToleranceSeconds.low >>> 0, object.skewToleranceSeconds.high >>> 0).toNumber(true);
        if (object.largeTimeJink != null)
            if ($util.Long)
                (message.largeTimeJink = $util.Long.fromValue(object.largeTimeJink)).unsigned = true;
            else if (typeof object.largeTimeJink === "string")
                message.largeTimeJink = parseInt(object.largeTimeJink, 10);
            else if (typeof object.largeTimeJink === "number")
                message.largeTimeJink = object.largeTimeJink;
            else if (typeof object.largeTimeJink === "object")
                message.largeTimeJink = new $util.LongBits(object.largeTimeJink.low >>> 0, object.largeTimeJink.high >>> 0).toNumber(true);
        if (object.probeFrequencySeconds != null)
            message.probeFrequencySeconds = object.probeFrequencySeconds >>> 0;
        if (object.adjustedTimeProbeFrequencySeconds != null)
            message.adjustedTimeProbeFrequencySeconds = object.adjustedTimeProbeFrequencySeconds >>> 0;
        if (object.hintProbeFrequencySeconds != null)
            message.hintProbeFrequencySeconds = object.hintProbeFrequencySeconds >>> 0;
        if (object.syncTimeout != null)
            message.syncTimeout = object.syncTimeout >>> 0;
        if (object.tryAgainSeconds != null)
            message.tryAgainSeconds = object.tryAgainSeconds >>> 0;
        if (object.maxAttempts != null)
            message.maxAttempts = object.maxAttempts >>> 0;
        return message;
    };

    /**
     * Creates a plain object from a CTwoFactor_Time_Response message. Also converts values to other types if specified.
     * @function toObject
     * @memberof CTwoFactor_Time_Response
     * @static
     * @param {CTwoFactor_Time_Response} message CTwoFactor_Time_Response
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    CTwoFactor_Time_Response.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            if ($util.Long) {
                let long = new $util.Long(0, 0, true);
                object.serverTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.serverTime = options.longs === String ? "0" : 0;
            if ($util.Long) {
                let long = new $util.Long(0, 0, true);
                object.skewToleranceSeconds = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.skewToleranceSeconds = options.longs === String ? "0" : 0;
            if ($util.Long) {
                let long = new $util.Long(0, 0, true);
                object.largeTimeJink = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.largeTimeJink = options.longs === String ? "0" : 0;
            object.probeFrequencySeconds = 0;
            object.adjustedTimeProbeFrequencySeconds = 0;
            object.hintProbeFrequencySeconds = 0;
            object.syncTimeout = 0;
            object.tryAgainSeconds = 0;
            object.maxAttempts = 0;
        }
        if (message.serverTime != null && message.hasOwnProperty("serverTime"))
            if (typeof message.serverTime === "number")
                object.serverTime = options.longs === String ? String(message.serverTime) : message.serverTime;
            else
                object.serverTime = options.longs === String ? $util.Long.prototype.toString.call(message.serverTime) : options.longs === Number ? new $util.LongBits(message.serverTime.low >>> 0, message.serverTime.high >>> 0).toNumber(true) : message.serverTime;
        if (message.skewToleranceSeconds != null && message.hasOwnProperty("skewToleranceSeconds"))
            if (typeof message.skewToleranceSeconds === "number")
                object.skewToleranceSeconds = options.longs === String ? String(message.skewToleranceSeconds) : message.skewToleranceSeconds;
            else
                object.skewToleranceSeconds = options.longs === String ? $util.Long.prototype.toString.call(message.skewToleranceSeconds) : options.longs === Number ? new $util.LongBits(message.skewToleranceSeconds.low >>> 0, message.skewToleranceSeconds.high >>> 0).toNumber(true) : message.skewToleranceSeconds;
        if (message.largeTimeJink != null && message.hasOwnProperty("largeTimeJink"))
            if (typeof message.largeTimeJink === "number")
                object.largeTimeJink = options.longs === String ? String(message.largeTimeJink) : message.largeTimeJink;
            else
                object.largeTimeJink = options.longs === String ? $util.Long.prototype.toString.call(message.largeTimeJink) : options.longs === Number ? new $util.LongBits(message.largeTimeJink.low >>> 0, message.largeTimeJink.high >>> 0).toNumber(true) : message.largeTimeJink;
        if (message.probeFrequencySeconds != null && message.hasOwnProperty("probeFrequencySeconds"))
            object.probeFrequencySeconds = message.probeFrequencySeconds;
        if (message.adjustedTimeProbeFrequencySeconds != null && message.hasOwnProperty("adjustedTimeProbeFrequencySeconds"))
            object.adjustedTimeProbeFrequencySeconds = message.adjustedTimeProbeFrequencySeconds;
        if (message.hintProbeFrequencySeconds != null && message.hasOwnProperty("hintProbeFrequencySeconds"))
            object.hintProbeFrequencySeconds = message.hintProbeFrequencySeconds;
        if (message.syncTimeout != null && message.hasOwnProperty("syncTimeout"))
            object.syncTimeout = message.syncTimeout;
        if (message.tryAgainSeconds != null && message.hasOwnProperty("tryAgainSeconds"))
            object.tryAgainSeconds = message.tryAgainSeconds;
        if (message.maxAttempts != null && message.hasOwnProperty("maxAttempts"))
            object.maxAttempts = message.maxAttempts;
        return object;
    };

    /**
     * Converts this CTwoFactor_Time_Response to JSON.
     * @function toJSON
     * @memberof CTwoFactor_Time_Response
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    CTwoFactor_Time_Response.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for CTwoFactor_Time_Response
     * @function getTypeUrl
     * @memberof CTwoFactor_Time_Response
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    CTwoFactor_Time_Response.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/CTwoFactor_Time_Response";
    };

    return CTwoFactor_Time_Response;
})();

export const CTwoFactor_AddAuthenticator_Request = $root.CTwoFactor_AddAuthenticator_Request = (() => {

    /**
     * Properties of a CTwoFactor_AddAuthenticator_Request.
     * @exports ICTwoFactor_AddAuthenticator_Request
     * @interface ICTwoFactor_AddAuthenticator_Request
     * @property {Long|null} [steamid] CTwoFactor_AddAuthenticator_Request steamid
     * @property {Long|null} [authenticatorTime] CTwoFactor_AddAuthenticator_Request authenticatorTime
     * @property {Long|null} [serialNumber] CTwoFactor_AddAuthenticator_Request serialNumber
     * @property {number|null} [authenticatorType] CTwoFactor_AddAuthenticator_Request authenticatorType
     * @property {string|null} [deviceIdentifier] CTwoFactor_AddAuthenticator_Request deviceIdentifier
     * @property {Array.<string>|null} [httpHeaders] CTwoFactor_AddAuthenticator_Request httpHeaders
     * @property {number|null} [version] CTwoFactor_AddAuthenticator_Request version
     */

    /**
     * Constructs a new CTwoFactor_AddAuthenticator_Request.
     * @exports CTwoFactor_AddAuthenticator_Request
     * @classdesc Represents a CTwoFactor_AddAuthenticator_Request.
     * @implements ICTwoFactor_AddAuthenticator_Request
     * @constructor
     * @param {ICTwoFactor_AddAuthenticator_Request=} [properties] Properties to set
     */
    function CTwoFactor_AddAuthenticator_Request(properties) {
        this.httpHeaders = [];
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * CTwoFactor_AddAuthenticator_Request steamid.
     * @member {Long} steamid
     * @memberof CTwoFactor_AddAuthenticator_Request
     * @instance
     */
    CTwoFactor_AddAuthenticator_Request.prototype.steamid = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * CTwoFactor_AddAuthenticator_Request authenticatorTime.
     * @member {Long} authenticatorTime
     * @memberof CTwoFactor_AddAuthenticator_Request
     * @instance
     */
    CTwoFactor_AddAuthenticator_Request.prototype.authenticatorTime = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

    /**
     * CTwoFactor_AddAuthenticator_Request serialNumber.
     * @member {Long} serialNumber
     * @memberof CTwoFactor_AddAuthenticator_Request
     * @instance
     */
    CTwoFactor_AddAuthenticator_Request.prototype.serialNumber = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * CTwoFactor_AddAuthenticator_Request authenticatorType.
     * @member {number} authenticatorType
     * @memberof CTwoFactor_AddAuthenticator_Request
     * @instance
     */
    CTwoFactor_AddAuthenticator_Request.prototype.authenticatorType = 0;

    /**
     * CTwoFactor_AddAuthenticator_Request deviceIdentifier.
     * @member {string} deviceIdentifier
     * @memberof CTwoFactor_AddAuthenticator_Request
     * @instance
     */
    CTwoFactor_AddAuthenticator_Request.prototype.deviceIdentifier = "";

    /**
     * CTwoFactor_AddAuthenticator_Request httpHeaders.
     * @member {Array.<string>} httpHeaders
     * @memberof CTwoFactor_AddAuthenticator_Request
     * @instance
     */
    CTwoFactor_AddAuthenticator_Request.prototype.httpHeaders = $util.emptyArray;

    /**
     * CTwoFactor_AddAuthenticator_Request version.
     * @member {number} version
     * @memberof CTwoFactor_AddAuthenticator_Request
     * @instance
     */
    CTwoFactor_AddAuthenticator_Request.prototype.version = 1;

    /**
     * Creates a new CTwoFactor_AddAuthenticator_Request instance using the specified properties.
     * @function create
     * @memberof CTwoFactor_AddAuthenticator_Request
     * @static
     * @param {ICTwoFactor_AddAuthenticator_Request=} [properties] Properties to set
     * @returns {CTwoFactor_AddAuthenticator_Request} CTwoFactor_AddAuthenticator_Request instance
     */
    CTwoFactor_AddAuthenticator_Request.create = function create(properties) {
        return new CTwoFactor_AddAuthenticator_Request(properties);
    };

    /**
     * Encodes the specified CTwoFactor_AddAuthenticator_Request message. Does not implicitly {@link CTwoFactor_AddAuthenticator_Request.verify|verify} messages.
     * @function encode
     * @memberof CTwoFactor_AddAuthenticator_Request
     * @static
     * @param {ICTwoFactor_AddAuthenticator_Request} message CTwoFactor_AddAuthenticator_Request message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CTwoFactor_AddAuthenticator_Request.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.steamid != null && Object.hasOwnProperty.call(message, "steamid"))
            writer.uint32(/* id 1, wireType 1 =*/9).fixed64(message.steamid);
        if (message.authenticatorTime != null && Object.hasOwnProperty.call(message, "authenticatorTime"))
            writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.authenticatorTime);
        if (message.serialNumber != null && Object.hasOwnProperty.call(message, "serialNumber"))
            writer.uint32(/* id 3, wireType 1 =*/25).fixed64(message.serialNumber);
        if (message.authenticatorType != null && Object.hasOwnProperty.call(message, "authenticatorType"))
            writer.uint32(/* id 4, wireType 0 =*/32).uint32(message.authenticatorType);
        if (message.deviceIdentifier != null && Object.hasOwnProperty.call(message, "deviceIdentifier"))
            writer.uint32(/* id 5, wireType 2 =*/42).string(message.deviceIdentifier);
        if (message.httpHeaders != null && message.httpHeaders.length)
            for (let i = 0; i < message.httpHeaders.length; ++i)
                writer.uint32(/* id 7, wireType 2 =*/58).string(message.httpHeaders[i]);
        if (message.version != null && Object.hasOwnProperty.call(message, "version"))
            writer.uint32(/* id 8, wireType 0 =*/64).uint32(message.version);
        return writer;
    };

    /**
     * Encodes the specified CTwoFactor_AddAuthenticator_Request message, length delimited. Does not implicitly {@link CTwoFactor_AddAuthenticator_Request.verify|verify} messages.
     * @function encodeDelimited
     * @memberof CTwoFactor_AddAuthenticator_Request
     * @static
     * @param {ICTwoFactor_AddAuthenticator_Request} message CTwoFactor_AddAuthenticator_Request message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CTwoFactor_AddAuthenticator_Request.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a CTwoFactor_AddAuthenticator_Request message from the specified reader or buffer.
     * @function decode
     * @memberof CTwoFactor_AddAuthenticator_Request
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {CTwoFactor_AddAuthenticator_Request} CTwoFactor_AddAuthenticator_Request
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CTwoFactor_AddAuthenticator_Request.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.CTwoFactor_AddAuthenticator_Request();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    message.steamid = reader.fixed64();
                    break;
                }
            case 2: {
                    message.authenticatorTime = reader.uint64();
                    break;
                }
            case 3: {
                    message.serialNumber = reader.fixed64();
                    break;
                }
            case 4: {
                    message.authenticatorType = reader.uint32();
                    break;
                }
            case 5: {
                    message.deviceIdentifier = reader.string();
                    break;
                }
            case 7: {
                    if (!(message.httpHeaders && message.httpHeaders.length))
                        message.httpHeaders = [];
                    message.httpHeaders.push(reader.string());
                    break;
                }
            case 8: {
                    message.version = reader.uint32();
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a CTwoFactor_AddAuthenticator_Request message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof CTwoFactor_AddAuthenticator_Request
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {CTwoFactor_AddAuthenticator_Request} CTwoFactor_AddAuthenticator_Request
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CTwoFactor_AddAuthenticator_Request.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a CTwoFactor_AddAuthenticator_Request message.
     * @function verify
     * @memberof CTwoFactor_AddAuthenticator_Request
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    CTwoFactor_AddAuthenticator_Request.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.steamid != null && message.hasOwnProperty("steamid"))
            if (!$util.isInteger(message.steamid) && !(message.steamid && $util.isInteger(message.steamid.low) && $util.isInteger(message.steamid.high)))
                return "steamid: integer|Long expected";
        if (message.authenticatorTime != null && message.hasOwnProperty("authenticatorTime"))
            if (!$util.isInteger(message.authenticatorTime) && !(message.authenticatorTime && $util.isInteger(message.authenticatorTime.low) && $util.isInteger(message.authenticatorTime.high)))
                return "authenticatorTime: integer|Long expected";
        if (message.serialNumber != null && message.hasOwnProperty("serialNumber"))
            if (!$util.isInteger(message.serialNumber) && !(message.serialNumber && $util.isInteger(message.serialNumber.low) && $util.isInteger(message.serialNumber.high)))
                return "serialNumber: integer|Long expected";
        if (message.authenticatorType != null && message.hasOwnProperty("authenticatorType"))
            if (!$util.isInteger(message.authenticatorType))
                return "authenticatorType: integer expected";
        if (message.deviceIdentifier != null && message.hasOwnProperty("deviceIdentifier"))
            if (!$util.isString(message.deviceIdentifier))
                return "deviceIdentifier: string expected";
        if (message.httpHeaders != null && message.hasOwnProperty("httpHeaders")) {
            if (!Array.isArray(message.httpHeaders))
                return "httpHeaders: array expected";
            for (let i = 0; i < message.httpHeaders.length; ++i)
                if (!$util.isString(message.httpHeaders[i]))
                    return "httpHeaders: string[] expected";
        }
        if (message.version != null && message.hasOwnProperty("version"))
            if (!$util.isInteger(message.version))
                return "version: integer expected";
        return null;
    };

    /**
     * Creates a CTwoFactor_AddAuthenticator_Request message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof CTwoFactor_AddAuthenticator_Request
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {CTwoFactor_AddAuthenticator_Request} CTwoFactor_AddAuthenticator_Request
     */
    CTwoFactor_AddAuthenticator_Request.fromObject = function fromObject(object) {
        if (object instanceof $root.CTwoFactor_AddAuthenticator_Request)
            return object;
        let message = new $root.CTwoFactor_AddAuthenticator_Request();
        if (object.steamid != null)
            if ($util.Long)
                (message.steamid = $util.Long.fromValue(object.steamid)).unsigned = false;
            else if (typeof object.steamid === "string")
                message.steamid = parseInt(object.steamid, 10);
            else if (typeof object.steamid === "number")
                message.steamid = object.steamid;
            else if (typeof object.steamid === "object")
                message.steamid = new $util.LongBits(object.steamid.low >>> 0, object.steamid.high >>> 0).toNumber();
        if (object.authenticatorTime != null)
            if ($util.Long)
                (message.authenticatorTime = $util.Long.fromValue(object.authenticatorTime)).unsigned = true;
            else if (typeof object.authenticatorTime === "string")
                message.authenticatorTime = parseInt(object.authenticatorTime, 10);
            else if (typeof object.authenticatorTime === "number")
                message.authenticatorTime = object.authenticatorTime;
            else if (typeof object.authenticatorTime === "object")
                message.authenticatorTime = new $util.LongBits(object.authenticatorTime.low >>> 0, object.authenticatorTime.high >>> 0).toNumber(true);
        if (object.serialNumber != null)
            if ($util.Long)
                (message.serialNumber = $util.Long.fromValue(object.serialNumber)).unsigned = false;
            else if (typeof object.serialNumber === "string")
                message.serialNumber = parseInt(object.serialNumber, 10);
            else if (typeof object.serialNumber === "number")
                message.serialNumber = object.serialNumber;
            else if (typeof object.serialNumber === "object")
                message.serialNumber = new $util.LongBits(object.serialNumber.low >>> 0, object.serialNumber.high >>> 0).toNumber();
        if (object.authenticatorType != null)
            message.authenticatorType = object.authenticatorType >>> 0;
        if (object.deviceIdentifier != null)
            message.deviceIdentifier = String(object.deviceIdentifier);
        if (object.httpHeaders) {
            if (!Array.isArray(object.httpHeaders))
                throw TypeError(".CTwoFactor_AddAuthenticator_Request.httpHeaders: array expected");
            message.httpHeaders = [];
            for (let i = 0; i < object.httpHeaders.length; ++i)
                message.httpHeaders[i] = String(object.httpHeaders[i]);
        }
        if (object.version != null)
            message.version = object.version >>> 0;
        return message;
    };

    /**
     * Creates a plain object from a CTwoFactor_AddAuthenticator_Request message. Also converts values to other types if specified.
     * @function toObject
     * @memberof CTwoFactor_AddAuthenticator_Request
     * @static
     * @param {CTwoFactor_AddAuthenticator_Request} message CTwoFactor_AddAuthenticator_Request
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    CTwoFactor_AddAuthenticator_Request.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.arrays || options.defaults)
            object.httpHeaders = [];
        if (options.defaults) {
            if ($util.Long) {
                let long = new $util.Long(0, 0, false);
                object.steamid = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.steamid = options.longs === String ? "0" : 0;
            if ($util.Long) {
                let long = new $util.Long(0, 0, true);
                object.authenticatorTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.authenticatorTime = options.longs === String ? "0" : 0;
            if ($util.Long) {
                let long = new $util.Long(0, 0, false);
                object.serialNumber = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.serialNumber = options.longs === String ? "0" : 0;
            object.authenticatorType = 0;
            object.deviceIdentifier = "";
            object.version = 1;
        }
        if (message.steamid != null && message.hasOwnProperty("steamid"))
            if (typeof message.steamid === "number")
                object.steamid = options.longs === String ? String(message.steamid) : message.steamid;
            else
                object.steamid = options.longs === String ? $util.Long.prototype.toString.call(message.steamid) : options.longs === Number ? new $util.LongBits(message.steamid.low >>> 0, message.steamid.high >>> 0).toNumber() : message.steamid;
        if (message.authenticatorTime != null && message.hasOwnProperty("authenticatorTime"))
            if (typeof message.authenticatorTime === "number")
                object.authenticatorTime = options.longs === String ? String(message.authenticatorTime) : message.authenticatorTime;
            else
                object.authenticatorTime = options.longs === String ? $util.Long.prototype.toString.call(message.authenticatorTime) : options.longs === Number ? new $util.LongBits(message.authenticatorTime.low >>> 0, message.authenticatorTime.high >>> 0).toNumber(true) : message.authenticatorTime;
        if (message.serialNumber != null && message.hasOwnProperty("serialNumber"))
            if (typeof message.serialNumber === "number")
                object.serialNumber = options.longs === String ? String(message.serialNumber) : message.serialNumber;
            else
                object.serialNumber = options.longs === String ? $util.Long.prototype.toString.call(message.serialNumber) : options.longs === Number ? new $util.LongBits(message.serialNumber.low >>> 0, message.serialNumber.high >>> 0).toNumber() : message.serialNumber;
        if (message.authenticatorType != null && message.hasOwnProperty("authenticatorType"))
            object.authenticatorType = message.authenticatorType;
        if (message.deviceIdentifier != null && message.hasOwnProperty("deviceIdentifier"))
            object.deviceIdentifier = message.deviceIdentifier;
        if (message.httpHeaders && message.httpHeaders.length) {
            object.httpHeaders = [];
            for (let j = 0; j < message.httpHeaders.length; ++j)
                object.httpHeaders[j] = message.httpHeaders[j];
        }
        if (message.version != null && message.hasOwnProperty("version"))
            object.version = message.version;
        return object;
    };

    /**
     * Converts this CTwoFactor_AddAuthenticator_Request to JSON.
     * @function toJSON
     * @memberof CTwoFactor_AddAuthenticator_Request
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    CTwoFactor_AddAuthenticator_Request.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for CTwoFactor_AddAuthenticator_Request
     * @function getTypeUrl
     * @memberof CTwoFactor_AddAuthenticator_Request
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    CTwoFactor_AddAuthenticator_Request.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/CTwoFactor_AddAuthenticator_Request";
    };

    return CTwoFactor_AddAuthenticator_Request;
})();

export const CTwoFactor_AddAuthenticator_Response = $root.CTwoFactor_AddAuthenticator_Response = (() => {

    /**
     * Properties of a CTwoFactor_AddAuthenticator_Response.
     * @exports ICTwoFactor_AddAuthenticator_Response
     * @interface ICTwoFactor_AddAuthenticator_Response
     * @property {Uint8Array|null} [sharedSecret] CTwoFactor_AddAuthenticator_Response sharedSecret
     * @property {Long|null} [serialNumber] CTwoFactor_AddAuthenticator_Response serialNumber
     * @property {string|null} [revocationCode] CTwoFactor_AddAuthenticator_Response revocationCode
     * @property {string|null} [uri] CTwoFactor_AddAuthenticator_Response uri
     * @property {Long|null} [serverTime] CTwoFactor_AddAuthenticator_Response serverTime
     * @property {string|null} [accountName] CTwoFactor_AddAuthenticator_Response accountName
     * @property {string|null} [tokenGid] CTwoFactor_AddAuthenticator_Response tokenGid
     * @property {Uint8Array|null} [identitySecret] CTwoFactor_AddAuthenticator_Response identitySecret
     * @property {Uint8Array|null} [secret_1] CTwoFactor_AddAuthenticator_Response secret_1
     * @property {number|null} [status] CTwoFactor_AddAuthenticator_Response status
     * @property {string|null} [phoneNumberHint] CTwoFactor_AddAuthenticator_Response phoneNumberHint
     * @property {number|null} [confirmType] CTwoFactor_AddAuthenticator_Response confirmType
     */

    /**
     * Constructs a new CTwoFactor_AddAuthenticator_Response.
     * @exports CTwoFactor_AddAuthenticator_Response
     * @classdesc Represents a CTwoFactor_AddAuthenticator_Response.
     * @implements ICTwoFactor_AddAuthenticator_Response
     * @constructor
     * @param {ICTwoFactor_AddAuthenticator_Response=} [properties] Properties to set
     */
    function CTwoFactor_AddAuthenticator_Response(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * CTwoFactor_AddAuthenticator_Response sharedSecret.
     * @member {Uint8Array} sharedSecret
     * @memberof CTwoFactor_AddAuthenticator_Response
     * @instance
     */
    CTwoFactor_AddAuthenticator_Response.prototype.sharedSecret = $util.newBuffer([]);

    /**
     * CTwoFactor_AddAuthenticator_Response serialNumber.
     * @member {Long} serialNumber
     * @memberof CTwoFactor_AddAuthenticator_Response
     * @instance
     */
    CTwoFactor_AddAuthenticator_Response.prototype.serialNumber = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * CTwoFactor_AddAuthenticator_Response revocationCode.
     * @member {string} revocationCode
     * @memberof CTwoFactor_AddAuthenticator_Response
     * @instance
     */
    CTwoFactor_AddAuthenticator_Response.prototype.revocationCode = "";

    /**
     * CTwoFactor_AddAuthenticator_Response uri.
     * @member {string} uri
     * @memberof CTwoFactor_AddAuthenticator_Response
     * @instance
     */
    CTwoFactor_AddAuthenticator_Response.prototype.uri = "";

    /**
     * CTwoFactor_AddAuthenticator_Response serverTime.
     * @member {Long} serverTime
     * @memberof CTwoFactor_AddAuthenticator_Response
     * @instance
     */
    CTwoFactor_AddAuthenticator_Response.prototype.serverTime = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

    /**
     * CTwoFactor_AddAuthenticator_Response accountName.
     * @member {string} accountName
     * @memberof CTwoFactor_AddAuthenticator_Response
     * @instance
     */
    CTwoFactor_AddAuthenticator_Response.prototype.accountName = "";

    /**
     * CTwoFactor_AddAuthenticator_Response tokenGid.
     * @member {string} tokenGid
     * @memberof CTwoFactor_AddAuthenticator_Response
     * @instance
     */
    CTwoFactor_AddAuthenticator_Response.prototype.tokenGid = "";

    /**
     * CTwoFactor_AddAuthenticator_Response identitySecret.
     * @member {Uint8Array} identitySecret
     * @memberof CTwoFactor_AddAuthenticator_Response
     * @instance
     */
    CTwoFactor_AddAuthenticator_Response.prototype.identitySecret = $util.newBuffer([]);

    /**
     * CTwoFactor_AddAuthenticator_Response secret_1.
     * @member {Uint8Array} secret_1
     * @memberof CTwoFactor_AddAuthenticator_Response
     * @instance
     */
    CTwoFactor_AddAuthenticator_Response.prototype.secret_1 = $util.newBuffer([]);

    /**
     * CTwoFactor_AddAuthenticator_Response status.
     * @member {number} status
     * @memberof CTwoFactor_AddAuthenticator_Response
     * @instance
     */
    CTwoFactor_AddAuthenticator_Response.prototype.status = 0;

    /**
     * CTwoFactor_AddAuthenticator_Response phoneNumberHint.
     * @member {string} phoneNumberHint
     * @memberof CTwoFactor_AddAuthenticator_Response
     * @instance
     */
    CTwoFactor_AddAuthenticator_Response.prototype.phoneNumberHint = "";

    /**
     * CTwoFactor_AddAuthenticator_Response confirmType.
     * @member {number} confirmType
     * @memberof CTwoFactor_AddAuthenticator_Response
     * @instance
     */
    CTwoFactor_AddAuthenticator_Response.prototype.confirmType = 0;

    /**
     * Creates a new CTwoFactor_AddAuthenticator_Response instance using the specified properties.
     * @function create
     * @memberof CTwoFactor_AddAuthenticator_Response
     * @static
     * @param {ICTwoFactor_AddAuthenticator_Response=} [properties] Properties to set
     * @returns {CTwoFactor_AddAuthenticator_Response} CTwoFactor_AddAuthenticator_Response instance
     */
    CTwoFactor_AddAuthenticator_Response.create = function create(properties) {
        return new CTwoFactor_AddAuthenticator_Response(properties);
    };

    /**
     * Encodes the specified CTwoFactor_AddAuthenticator_Response message. Does not implicitly {@link CTwoFactor_AddAuthenticator_Response.verify|verify} messages.
     * @function encode
     * @memberof CTwoFactor_AddAuthenticator_Response
     * @static
     * @param {ICTwoFactor_AddAuthenticator_Response} message CTwoFactor_AddAuthenticator_Response message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CTwoFactor_AddAuthenticator_Response.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.sharedSecret != null && Object.hasOwnProperty.call(message, "sharedSecret"))
            writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.sharedSecret);
        if (message.serialNumber != null && Object.hasOwnProperty.call(message, "serialNumber"))
            writer.uint32(/* id 2, wireType 1 =*/17).fixed64(message.serialNumber);
        if (message.revocationCode != null && Object.hasOwnProperty.call(message, "revocationCode"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.revocationCode);
        if (message.uri != null && Object.hasOwnProperty.call(message, "uri"))
            writer.uint32(/* id 4, wireType 2 =*/34).string(message.uri);
        if (message.serverTime != null && Object.hasOwnProperty.call(message, "serverTime"))
            writer.uint32(/* id 5, wireType 0 =*/40).uint64(message.serverTime);
        if (message.accountName != null && Object.hasOwnProperty.call(message, "accountName"))
            writer.uint32(/* id 6, wireType 2 =*/50).string(message.accountName);
        if (message.tokenGid != null && Object.hasOwnProperty.call(message, "tokenGid"))
            writer.uint32(/* id 7, wireType 2 =*/58).string(message.tokenGid);
        if (message.identitySecret != null && Object.hasOwnProperty.call(message, "identitySecret"))
            writer.uint32(/* id 8, wireType 2 =*/66).bytes(message.identitySecret);
        if (message.secret_1 != null && Object.hasOwnProperty.call(message, "secret_1"))
            writer.uint32(/* id 9, wireType 2 =*/74).bytes(message.secret_1);
        if (message.status != null && Object.hasOwnProperty.call(message, "status"))
            writer.uint32(/* id 10, wireType 0 =*/80).int32(message.status);
        if (message.phoneNumberHint != null && Object.hasOwnProperty.call(message, "phoneNumberHint"))
            writer.uint32(/* id 11, wireType 2 =*/90).string(message.phoneNumberHint);
        if (message.confirmType != null && Object.hasOwnProperty.call(message, "confirmType"))
            writer.uint32(/* id 12, wireType 0 =*/96).int32(message.confirmType);
        return writer;
    };

    /**
     * Encodes the specified CTwoFactor_AddAuthenticator_Response message, length delimited. Does not implicitly {@link CTwoFactor_AddAuthenticator_Response.verify|verify} messages.
     * @function encodeDelimited
     * @memberof CTwoFactor_AddAuthenticator_Response
     * @static
     * @param {ICTwoFactor_AddAuthenticator_Response} message CTwoFactor_AddAuthenticator_Response message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CTwoFactor_AddAuthenticator_Response.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a CTwoFactor_AddAuthenticator_Response message from the specified reader or buffer.
     * @function decode
     * @memberof CTwoFactor_AddAuthenticator_Response
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {CTwoFactor_AddAuthenticator_Response} CTwoFactor_AddAuthenticator_Response
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CTwoFactor_AddAuthenticator_Response.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.CTwoFactor_AddAuthenticator_Response();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    message.sharedSecret = reader.bytes();
                    break;
                }
            case 2: {
                    message.serialNumber = reader.fixed64();
                    break;
                }
            case 3: {
                    message.revocationCode = reader.string();
                    break;
                }
            case 4: {
                    message.uri = reader.string();
                    break;
                }
            case 5: {
                    message.serverTime = reader.uint64();
                    break;
                }
            case 6: {
                    message.accountName = reader.string();
                    break;
                }
            case 7: {
                    message.tokenGid = reader.string();
                    break;
                }
            case 8: {
                    message.identitySecret = reader.bytes();
                    break;
                }
            case 9: {
                    message.secret_1 = reader.bytes();
                    break;
                }
            case 10: {
                    message.status = reader.int32();
                    break;
                }
            case 11: {
                    message.phoneNumberHint = reader.string();
                    break;
                }
            case 12: {
                    message.confirmType = reader.int32();
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a CTwoFactor_AddAuthenticator_Response message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof CTwoFactor_AddAuthenticator_Response
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {CTwoFactor_AddAuthenticator_Response} CTwoFactor_AddAuthenticator_Response
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CTwoFactor_AddAuthenticator_Response.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a CTwoFactor_AddAuthenticator_Response message.
     * @function verify
     * @memberof CTwoFactor_AddAuthenticator_Response
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    CTwoFactor_AddAuthenticator_Response.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.sharedSecret != null && message.hasOwnProperty("sharedSecret"))
            if (!(message.sharedSecret && typeof message.sharedSecret.length === "number" || $util.isString(message.sharedSecret)))
                return "sharedSecret: buffer expected";
        if (message.serialNumber != null && message.hasOwnProperty("serialNumber"))
            if (!$util.isInteger(message.serialNumber) && !(message.serialNumber && $util.isInteger(message.serialNumber.low) && $util.isInteger(message.serialNumber.high)))
                return "serialNumber: integer|Long expected";
        if (message.revocationCode != null && message.hasOwnProperty("revocationCode"))
            if (!$util.isString(message.revocationCode))
                return "revocationCode: string expected";
        if (message.uri != null && message.hasOwnProperty("uri"))
            if (!$util.isString(message.uri))
                return "uri: string expected";
        if (message.serverTime != null && message.hasOwnProperty("serverTime"))
            if (!$util.isInteger(message.serverTime) && !(message.serverTime && $util.isInteger(message.serverTime.low) && $util.isInteger(message.serverTime.high)))
                return "serverTime: integer|Long expected";
        if (message.accountName != null && message.hasOwnProperty("accountName"))
            if (!$util.isString(message.accountName))
                return "accountName: string expected";
        if (message.tokenGid != null && message.hasOwnProperty("tokenGid"))
            if (!$util.isString(message.tokenGid))
                return "tokenGid: string expected";
        if (message.identitySecret != null && message.hasOwnProperty("identitySecret"))
            if (!(message.identitySecret && typeof message.identitySecret.length === "number" || $util.isString(message.identitySecret)))
                return "identitySecret: buffer expected";
        if (message.secret_1 != null && message.hasOwnProperty("secret_1"))
            if (!(message.secret_1 && typeof message.secret_1.length === "number" || $util.isString(message.secret_1)))
                return "secret_1: buffer expected";
        if (message.status != null && message.hasOwnProperty("status"))
            if (!$util.isInteger(message.status))
                return "status: integer expected";
        if (message.phoneNumberHint != null && message.hasOwnProperty("phoneNumberHint"))
            if (!$util.isString(message.phoneNumberHint))
                return "phoneNumberHint: string expected";
        if (message.confirmType != null && message.hasOwnProperty("confirmType"))
            if (!$util.isInteger(message.confirmType))
                return "confirmType: integer expected";
        return null;
    };

    /**
     * Creates a CTwoFactor_AddAuthenticator_Response message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof CTwoFactor_AddAuthenticator_Response
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {CTwoFactor_AddAuthenticator_Response} CTwoFactor_AddAuthenticator_Response
     */
    CTwoFactor_AddAuthenticator_Response.fromObject = function fromObject(object) {
        if (object instanceof $root.CTwoFactor_AddAuthenticator_Response)
            return object;
        let message = new $root.CTwoFactor_AddAuthenticator_Response();
        if (object.sharedSecret != null)
            if (typeof object.sharedSecret === "string")
                $util.base64.decode(object.sharedSecret, message.sharedSecret = $util.newBuffer($util.base64.length(object.sharedSecret)), 0);
            else if (object.sharedSecret.length >= 0)
                message.sharedSecret = object.sharedSecret;
        if (object.serialNumber != null)
            if ($util.Long)
                (message.serialNumber = $util.Long.fromValue(object.serialNumber)).unsigned = false;
            else if (typeof object.serialNumber === "string")
                message.serialNumber = parseInt(object.serialNumber, 10);
            else if (typeof object.serialNumber === "number")
                message.serialNumber = object.serialNumber;
            else if (typeof object.serialNumber === "object")
                message.serialNumber = new $util.LongBits(object.serialNumber.low >>> 0, object.serialNumber.high >>> 0).toNumber();
        if (object.revocationCode != null)
            message.revocationCode = String(object.revocationCode);
        if (object.uri != null)
            message.uri = String(object.uri);
        if (object.serverTime != null)
            if ($util.Long)
                (message.serverTime = $util.Long.fromValue(object.serverTime)).unsigned = true;
            else if (typeof object.serverTime === "string")
                message.serverTime = parseInt(object.serverTime, 10);
            else if (typeof object.serverTime === "number")
                message.serverTime = object.serverTime;
            else if (typeof object.serverTime === "object")
                message.serverTime = new $util.LongBits(object.serverTime.low >>> 0, object.serverTime.high >>> 0).toNumber(true);
        if (object.accountName != null)
            message.accountName = String(object.accountName);
        if (object.tokenGid != null)
            message.tokenGid = String(object.tokenGid);
        if (object.identitySecret != null)
            if (typeof object.identitySecret === "string")
                $util.base64.decode(object.identitySecret, message.identitySecret = $util.newBuffer($util.base64.length(object.identitySecret)), 0);
            else if (object.identitySecret.length >= 0)
                message.identitySecret = object.identitySecret;
        if (object.secret_1 != null)
            if (typeof object.secret_1 === "string")
                $util.base64.decode(object.secret_1, message.secret_1 = $util.newBuffer($util.base64.length(object.secret_1)), 0);
            else if (object.secret_1.length >= 0)
                message.secret_1 = object.secret_1;
        if (object.status != null)
            message.status = object.status | 0;
        if (object.phoneNumberHint != null)
            message.phoneNumberHint = String(object.phoneNumberHint);
        if (object.confirmType != null)
            message.confirmType = object.confirmType | 0;
        return message;
    };

    /**
     * Creates a plain object from a CTwoFactor_AddAuthenticator_Response message. Also converts values to other types if specified.
     * @function toObject
     * @memberof CTwoFactor_AddAuthenticator_Response
     * @static
     * @param {CTwoFactor_AddAuthenticator_Response} message CTwoFactor_AddAuthenticator_Response
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    CTwoFactor_AddAuthenticator_Response.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            if (options.bytes === String)
                object.sharedSecret = "";
            else {
                object.sharedSecret = [];
                if (options.bytes !== Array)
                    object.sharedSecret = $util.newBuffer(object.sharedSecret);
            }
            if ($util.Long) {
                let long = new $util.Long(0, 0, false);
                object.serialNumber = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.serialNumber = options.longs === String ? "0" : 0;
            object.revocationCode = "";
            object.uri = "";
            if ($util.Long) {
                let long = new $util.Long(0, 0, true);
                object.serverTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.serverTime = options.longs === String ? "0" : 0;
            object.accountName = "";
            object.tokenGid = "";
            if (options.bytes === String)
                object.identitySecret = "";
            else {
                object.identitySecret = [];
                if (options.bytes !== Array)
                    object.identitySecret = $util.newBuffer(object.identitySecret);
            }
            if (options.bytes === String)
                object.secret_1 = "";
            else {
                object.secret_1 = [];
                if (options.bytes !== Array)
                    object.secret_1 = $util.newBuffer(object.secret_1);
            }
            object.status = 0;
            object.phoneNumberHint = "";
            object.confirmType = 0;
        }
        if (message.sharedSecret != null && message.hasOwnProperty("sharedSecret"))
            object.sharedSecret = options.bytes === String ? $util.base64.encode(message.sharedSecret, 0, message.sharedSecret.length) : options.bytes === Array ? Array.prototype.slice.call(message.sharedSecret) : message.sharedSecret;
        if (message.serialNumber != null && message.hasOwnProperty("serialNumber"))
            if (typeof message.serialNumber === "number")
                object.serialNumber = options.longs === String ? String(message.serialNumber) : message.serialNumber;
            else
                object.serialNumber = options.longs === String ? $util.Long.prototype.toString.call(message.serialNumber) : options.longs === Number ? new $util.LongBits(message.serialNumber.low >>> 0, message.serialNumber.high >>> 0).toNumber() : message.serialNumber;
        if (message.revocationCode != null && message.hasOwnProperty("revocationCode"))
            object.revocationCode = message.revocationCode;
        if (message.uri != null && message.hasOwnProperty("uri"))
            object.uri = message.uri;
        if (message.serverTime != null && message.hasOwnProperty("serverTime"))
            if (typeof message.serverTime === "number")
                object.serverTime = options.longs === String ? String(message.serverTime) : message.serverTime;
            else
                object.serverTime = options.longs === String ? $util.Long.prototype.toString.call(message.serverTime) : options.longs === Number ? new $util.LongBits(message.serverTime.low >>> 0, message.serverTime.high >>> 0).toNumber(true) : message.serverTime;
        if (message.accountName != null && message.hasOwnProperty("accountName"))
            object.accountName = message.accountName;
        if (message.tokenGid != null && message.hasOwnProperty("tokenGid"))
            object.tokenGid = message.tokenGid;
        if (message.identitySecret != null && message.hasOwnProperty("identitySecret"))
            object.identitySecret = options.bytes === String ? $util.base64.encode(message.identitySecret, 0, message.identitySecret.length) : options.bytes === Array ? Array.prototype.slice.call(message.identitySecret) : message.identitySecret;
        if (message.secret_1 != null && message.hasOwnProperty("secret_1"))
            object.secret_1 = options.bytes === String ? $util.base64.encode(message.secret_1, 0, message.secret_1.length) : options.bytes === Array ? Array.prototype.slice.call(message.secret_1) : message.secret_1;
        if (message.status != null && message.hasOwnProperty("status"))
            object.status = message.status;
        if (message.phoneNumberHint != null && message.hasOwnProperty("phoneNumberHint"))
            object.phoneNumberHint = message.phoneNumberHint;
        if (message.confirmType != null && message.hasOwnProperty("confirmType"))
            object.confirmType = message.confirmType;
        return object;
    };

    /**
     * Converts this CTwoFactor_AddAuthenticator_Response to JSON.
     * @function toJSON
     * @memberof CTwoFactor_AddAuthenticator_Response
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    CTwoFactor_AddAuthenticator_Response.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for CTwoFactor_AddAuthenticator_Response
     * @function getTypeUrl
     * @memberof CTwoFactor_AddAuthenticator_Response
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    CTwoFactor_AddAuthenticator_Response.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/CTwoFactor_AddAuthenticator_Response";
    };

    return CTwoFactor_AddAuthenticator_Response;
})();

export const CTwoFactor_FinalizeAddAuthenticator_Request = $root.CTwoFactor_FinalizeAddAuthenticator_Request = (() => {

    /**
     * Properties of a CTwoFactor_FinalizeAddAuthenticator_Request.
     * @exports ICTwoFactor_FinalizeAddAuthenticator_Request
     * @interface ICTwoFactor_FinalizeAddAuthenticator_Request
     * @property {Long|null} [steamid] CTwoFactor_FinalizeAddAuthenticator_Request steamid
     * @property {string|null} [authenticatorCode] CTwoFactor_FinalizeAddAuthenticator_Request authenticatorCode
     * @property {Long|null} [authenticatorTime] CTwoFactor_FinalizeAddAuthenticator_Request authenticatorTime
     * @property {string|null} [activationCode] CTwoFactor_FinalizeAddAuthenticator_Request activationCode
     * @property {Array.<string>|null} [httpHeaders] CTwoFactor_FinalizeAddAuthenticator_Request httpHeaders
     * @property {boolean|null} [validateSmsCode] CTwoFactor_FinalizeAddAuthenticator_Request validateSmsCode
     */

    /**
     * Constructs a new CTwoFactor_FinalizeAddAuthenticator_Request.
     * @exports CTwoFactor_FinalizeAddAuthenticator_Request
     * @classdesc Represents a CTwoFactor_FinalizeAddAuthenticator_Request.
     * @implements ICTwoFactor_FinalizeAddAuthenticator_Request
     * @constructor
     * @param {ICTwoFactor_FinalizeAddAuthenticator_Request=} [properties] Properties to set
     */
    function CTwoFactor_FinalizeAddAuthenticator_Request(properties) {
        this.httpHeaders = [];
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * CTwoFactor_FinalizeAddAuthenticator_Request steamid.
     * @member {Long} steamid
     * @memberof CTwoFactor_FinalizeAddAuthenticator_Request
     * @instance
     */
    CTwoFactor_FinalizeAddAuthenticator_Request.prototype.steamid = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * CTwoFactor_FinalizeAddAuthenticator_Request authenticatorCode.
     * @member {string} authenticatorCode
     * @memberof CTwoFactor_FinalizeAddAuthenticator_Request
     * @instance
     */
    CTwoFactor_FinalizeAddAuthenticator_Request.prototype.authenticatorCode = "";

    /**
     * CTwoFactor_FinalizeAddAuthenticator_Request authenticatorTime.
     * @member {Long} authenticatorTime
     * @memberof CTwoFactor_FinalizeAddAuthenticator_Request
     * @instance
     */
    CTwoFactor_FinalizeAddAuthenticator_Request.prototype.authenticatorTime = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

    /**
     * CTwoFactor_FinalizeAddAuthenticator_Request activationCode.
     * @member {string} activationCode
     * @memberof CTwoFactor_FinalizeAddAuthenticator_Request
     * @instance
     */
    CTwoFactor_FinalizeAddAuthenticator_Request.prototype.activationCode = "";

    /**
     * CTwoFactor_FinalizeAddAuthenticator_Request httpHeaders.
     * @member {Array.<string>} httpHeaders
     * @memberof CTwoFactor_FinalizeAddAuthenticator_Request
     * @instance
     */
    CTwoFactor_FinalizeAddAuthenticator_Request.prototype.httpHeaders = $util.emptyArray;

    /**
     * CTwoFactor_FinalizeAddAuthenticator_Request validateSmsCode.
     * @member {boolean} validateSmsCode
     * @memberof CTwoFactor_FinalizeAddAuthenticator_Request
     * @instance
     */
    CTwoFactor_FinalizeAddAuthenticator_Request.prototype.validateSmsCode = false;

    /**
     * Creates a new CTwoFactor_FinalizeAddAuthenticator_Request instance using the specified properties.
     * @function create
     * @memberof CTwoFactor_FinalizeAddAuthenticator_Request
     * @static
     * @param {ICTwoFactor_FinalizeAddAuthenticator_Request=} [properties] Properties to set
     * @returns {CTwoFactor_FinalizeAddAuthenticator_Request} CTwoFactor_FinalizeAddAuthenticator_Request instance
     */
    CTwoFactor_FinalizeAddAuthenticator_Request.create = function create(properties) {
        return new CTwoFactor_FinalizeAddAuthenticator_Request(properties);
    };

    /**
     * Encodes the specified CTwoFactor_FinalizeAddAuthenticator_Request message. Does not implicitly {@link CTwoFactor_FinalizeAddAuthenticator_Request.verify|verify} messages.
     * @function encode
     * @memberof CTwoFactor_FinalizeAddAuthenticator_Request
     * @static
     * @param {ICTwoFactor_FinalizeAddAuthenticator_Request} message CTwoFactor_FinalizeAddAuthenticator_Request message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CTwoFactor_FinalizeAddAuthenticator_Request.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.steamid != null && Object.hasOwnProperty.call(message, "steamid"))
            writer.uint32(/* id 1, wireType 1 =*/9).fixed64(message.steamid);
        if (message.authenticatorCode != null && Object.hasOwnProperty.call(message, "authenticatorCode"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.authenticatorCode);
        if (message.authenticatorTime != null && Object.hasOwnProperty.call(message, "authenticatorTime"))
            writer.uint32(/* id 3, wireType 0 =*/24).uint64(message.authenticatorTime);
        if (message.activationCode != null && Object.hasOwnProperty.call(message, "activationCode"))
            writer.uint32(/* id 4, wireType 2 =*/34).string(message.activationCode);
        if (message.httpHeaders != null && message.httpHeaders.length)
            for (let i = 0; i < message.httpHeaders.length; ++i)
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.httpHeaders[i]);
        if (message.validateSmsCode != null && Object.hasOwnProperty.call(message, "validateSmsCode"))
            writer.uint32(/* id 6, wireType 0 =*/48).bool(message.validateSmsCode);
        return writer;
    };

    /**
     * Encodes the specified CTwoFactor_FinalizeAddAuthenticator_Request message, length delimited. Does not implicitly {@link CTwoFactor_FinalizeAddAuthenticator_Request.verify|verify} messages.
     * @function encodeDelimited
     * @memberof CTwoFactor_FinalizeAddAuthenticator_Request
     * @static
     * @param {ICTwoFactor_FinalizeAddAuthenticator_Request} message CTwoFactor_FinalizeAddAuthenticator_Request message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CTwoFactor_FinalizeAddAuthenticator_Request.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a CTwoFactor_FinalizeAddAuthenticator_Request message from the specified reader or buffer.
     * @function decode
     * @memberof CTwoFactor_FinalizeAddAuthenticator_Request
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {CTwoFactor_FinalizeAddAuthenticator_Request} CTwoFactor_FinalizeAddAuthenticator_Request
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CTwoFactor_FinalizeAddAuthenticator_Request.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.CTwoFactor_FinalizeAddAuthenticator_Request();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    message.steamid = reader.fixed64();
                    break;
                }
            case 2: {
                    message.authenticatorCode = reader.string();
                    break;
                }
            case 3: {
                    message.authenticatorTime = reader.uint64();
                    break;
                }
            case 4: {
                    message.activationCode = reader.string();
                    break;
                }
            case 5: {
                    if (!(message.httpHeaders && message.httpHeaders.length))
                        message.httpHeaders = [];
                    message.httpHeaders.push(reader.string());
                    break;
                }
            case 6: {
                    message.validateSmsCode = reader.bool();
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a CTwoFactor_FinalizeAddAuthenticator_Request message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof CTwoFactor_FinalizeAddAuthenticator_Request
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {CTwoFactor_FinalizeAddAuthenticator_Request} CTwoFactor_FinalizeAddAuthenticator_Request
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CTwoFactor_FinalizeAddAuthenticator_Request.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a CTwoFactor_FinalizeAddAuthenticator_Request message.
     * @function verify
     * @memberof CTwoFactor_FinalizeAddAuthenticator_Request
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    CTwoFactor_FinalizeAddAuthenticator_Request.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.steamid != null && message.hasOwnProperty("steamid"))
            if (!$util.isInteger(message.steamid) && !(message.steamid && $util.isInteger(message.steamid.low) && $util.isInteger(message.steamid.high)))
                return "steamid: integer|Long expected";
        if (message.authenticatorCode != null && message.hasOwnProperty("authenticatorCode"))
            if (!$util.isString(message.authenticatorCode))
                return "authenticatorCode: string expected";
        if (message.authenticatorTime != null && message.hasOwnProperty("authenticatorTime"))
            if (!$util.isInteger(message.authenticatorTime) && !(message.authenticatorTime && $util.isInteger(message.authenticatorTime.low) && $util.isInteger(message.authenticatorTime.high)))
                return "authenticatorTime: integer|Long expected";
        if (message.activationCode != null && message.hasOwnProperty("activationCode"))
            if (!$util.isString(message.activationCode))
                return "activationCode: string expected";
        if (message.httpHeaders != null && message.hasOwnProperty("httpHeaders")) {
            if (!Array.isArray(message.httpHeaders))
                return "httpHeaders: array expected";
            for (let i = 0; i < message.httpHeaders.length; ++i)
                if (!$util.isString(message.httpHeaders[i]))
                    return "httpHeaders: string[] expected";
        }
        if (message.validateSmsCode != null && message.hasOwnProperty("validateSmsCode"))
            if (typeof message.validateSmsCode !== "boolean")
                return "validateSmsCode: boolean expected";
        return null;
    };

    /**
     * Creates a CTwoFactor_FinalizeAddAuthenticator_Request message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof CTwoFactor_FinalizeAddAuthenticator_Request
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {CTwoFactor_FinalizeAddAuthenticator_Request} CTwoFactor_FinalizeAddAuthenticator_Request
     */
    CTwoFactor_FinalizeAddAuthenticator_Request.fromObject = function fromObject(object) {
        if (object instanceof $root.CTwoFactor_FinalizeAddAuthenticator_Request)
            return object;
        let message = new $root.CTwoFactor_FinalizeAddAuthenticator_Request();
        if (object.steamid != null)
            if ($util.Long)
                (message.steamid = $util.Long.fromValue(object.steamid)).unsigned = false;
            else if (typeof object.steamid === "string")
                message.steamid = parseInt(object.steamid, 10);
            else if (typeof object.steamid === "number")
                message.steamid = object.steamid;
            else if (typeof object.steamid === "object")
                message.steamid = new $util.LongBits(object.steamid.low >>> 0, object.steamid.high >>> 0).toNumber();
        if (object.authenticatorCode != null)
            message.authenticatorCode = String(object.authenticatorCode);
        if (object.authenticatorTime != null)
            if ($util.Long)
                (message.authenticatorTime = $util.Long.fromValue(object.authenticatorTime)).unsigned = true;
            else if (typeof object.authenticatorTime === "string")
                message.authenticatorTime = parseInt(object.authenticatorTime, 10);
            else if (typeof object.authenticatorTime === "number")
                message.authenticatorTime = object.authenticatorTime;
            else if (typeof object.authenticatorTime === "object")
                message.authenticatorTime = new $util.LongBits(object.authenticatorTime.low >>> 0, object.authenticatorTime.high >>> 0).toNumber(true);
        if (object.activationCode != null)
            message.activationCode = String(object.activationCode);
        if (object.httpHeaders) {
            if (!Array.isArray(object.httpHeaders))
                throw TypeError(".CTwoFactor_FinalizeAddAuthenticator_Request.httpHeaders: array expected");
            message.httpHeaders = [];
            for (let i = 0; i < object.httpHeaders.length; ++i)
                message.httpHeaders[i] = String(object.httpHeaders[i]);
        }
        if (object.validateSmsCode != null)
            message.validateSmsCode = Boolean(object.validateSmsCode);
        return message;
    };

    /**
     * Creates a plain object from a CTwoFactor_FinalizeAddAuthenticator_Request message. Also converts values to other types if specified.
     * @function toObject
     * @memberof CTwoFactor_FinalizeAddAuthenticator_Request
     * @static
     * @param {CTwoFactor_FinalizeAddAuthenticator_Request} message CTwoFactor_FinalizeAddAuthenticator_Request
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    CTwoFactor_FinalizeAddAuthenticator_Request.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.arrays || options.defaults)
            object.httpHeaders = [];
        if (options.defaults) {
            if ($util.Long) {
                let long = new $util.Long(0, 0, false);
                object.steamid = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.steamid = options.longs === String ? "0" : 0;
            object.authenticatorCode = "";
            if ($util.Long) {
                let long = new $util.Long(0, 0, true);
                object.authenticatorTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.authenticatorTime = options.longs === String ? "0" : 0;
            object.activationCode = "";
            object.validateSmsCode = false;
        }
        if (message.steamid != null && message.hasOwnProperty("steamid"))
            if (typeof message.steamid === "number")
                object.steamid = options.longs === String ? String(message.steamid) : message.steamid;
            else
                object.steamid = options.longs === String ? $util.Long.prototype.toString.call(message.steamid) : options.longs === Number ? new $util.LongBits(message.steamid.low >>> 0, message.steamid.high >>> 0).toNumber() : message.steamid;
        if (message.authenticatorCode != null && message.hasOwnProperty("authenticatorCode"))
            object.authenticatorCode = message.authenticatorCode;
        if (message.authenticatorTime != null && message.hasOwnProperty("authenticatorTime"))
            if (typeof message.authenticatorTime === "number")
                object.authenticatorTime = options.longs === String ? String(message.authenticatorTime) : message.authenticatorTime;
            else
                object.authenticatorTime = options.longs === String ? $util.Long.prototype.toString.call(message.authenticatorTime) : options.longs === Number ? new $util.LongBits(message.authenticatorTime.low >>> 0, message.authenticatorTime.high >>> 0).toNumber(true) : message.authenticatorTime;
        if (message.activationCode != null && message.hasOwnProperty("activationCode"))
            object.activationCode = message.activationCode;
        if (message.httpHeaders && message.httpHeaders.length) {
            object.httpHeaders = [];
            for (let j = 0; j < message.httpHeaders.length; ++j)
                object.httpHeaders[j] = message.httpHeaders[j];
        }
        if (message.validateSmsCode != null && message.hasOwnProperty("validateSmsCode"))
            object.validateSmsCode = message.validateSmsCode;
        return object;
    };

    /**
     * Converts this CTwoFactor_FinalizeAddAuthenticator_Request to JSON.
     * @function toJSON
     * @memberof CTwoFactor_FinalizeAddAuthenticator_Request
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    CTwoFactor_FinalizeAddAuthenticator_Request.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for CTwoFactor_FinalizeAddAuthenticator_Request
     * @function getTypeUrl
     * @memberof CTwoFactor_FinalizeAddAuthenticator_Request
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    CTwoFactor_FinalizeAddAuthenticator_Request.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/CTwoFactor_FinalizeAddAuthenticator_Request";
    };

    return CTwoFactor_FinalizeAddAuthenticator_Request;
})();

export const CTwoFactor_FinalizeAddAuthenticator_Response = $root.CTwoFactor_FinalizeAddAuthenticator_Response = (() => {

    /**
     * Properties of a CTwoFactor_FinalizeAddAuthenticator_Response.
     * @exports ICTwoFactor_FinalizeAddAuthenticator_Response
     * @interface ICTwoFactor_FinalizeAddAuthenticator_Response
     * @property {boolean|null} [success] CTwoFactor_FinalizeAddAuthenticator_Response success
     * @property {Long|null} [serverTime] CTwoFactor_FinalizeAddAuthenticator_Response serverTime
     * @property {number|null} [status] CTwoFactor_FinalizeAddAuthenticator_Response status
     */

    /**
     * Constructs a new CTwoFactor_FinalizeAddAuthenticator_Response.
     * @exports CTwoFactor_FinalizeAddAuthenticator_Response
     * @classdesc Represents a CTwoFactor_FinalizeAddAuthenticator_Response.
     * @implements ICTwoFactor_FinalizeAddAuthenticator_Response
     * @constructor
     * @param {ICTwoFactor_FinalizeAddAuthenticator_Response=} [properties] Properties to set
     */
    function CTwoFactor_FinalizeAddAuthenticator_Response(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * CTwoFactor_FinalizeAddAuthenticator_Response success.
     * @member {boolean} success
     * @memberof CTwoFactor_FinalizeAddAuthenticator_Response
     * @instance
     */
    CTwoFactor_FinalizeAddAuthenticator_Response.prototype.success = false;

    /**
     * CTwoFactor_FinalizeAddAuthenticator_Response serverTime.
     * @member {Long} serverTime
     * @memberof CTwoFactor_FinalizeAddAuthenticator_Response
     * @instance
     */
    CTwoFactor_FinalizeAddAuthenticator_Response.prototype.serverTime = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

    /**
     * CTwoFactor_FinalizeAddAuthenticator_Response status.
     * @member {number} status
     * @memberof CTwoFactor_FinalizeAddAuthenticator_Response
     * @instance
     */
    CTwoFactor_FinalizeAddAuthenticator_Response.prototype.status = 0;

    /**
     * Creates a new CTwoFactor_FinalizeAddAuthenticator_Response instance using the specified properties.
     * @function create
     * @memberof CTwoFactor_FinalizeAddAuthenticator_Response
     * @static
     * @param {ICTwoFactor_FinalizeAddAuthenticator_Response=} [properties] Properties to set
     * @returns {CTwoFactor_FinalizeAddAuthenticator_Response} CTwoFactor_FinalizeAddAuthenticator_Response instance
     */
    CTwoFactor_FinalizeAddAuthenticator_Response.create = function create(properties) {
        return new CTwoFactor_FinalizeAddAuthenticator_Response(properties);
    };

    /**
     * Encodes the specified CTwoFactor_FinalizeAddAuthenticator_Response message. Does not implicitly {@link CTwoFactor_FinalizeAddAuthenticator_Response.verify|verify} messages.
     * @function encode
     * @memberof CTwoFactor_FinalizeAddAuthenticator_Response
     * @static
     * @param {ICTwoFactor_FinalizeAddAuthenticator_Response} message CTwoFactor_FinalizeAddAuthenticator_Response message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CTwoFactor_FinalizeAddAuthenticator_Response.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.success != null && Object.hasOwnProperty.call(message, "success"))
            writer.uint32(/* id 1, wireType 0 =*/8).bool(message.success);
        if (message.serverTime != null && Object.hasOwnProperty.call(message, "serverTime"))
            writer.uint32(/* id 3, wireType 0 =*/24).uint64(message.serverTime);
        if (message.status != null && Object.hasOwnProperty.call(message, "status"))
            writer.uint32(/* id 4, wireType 0 =*/32).int32(message.status);
        return writer;
    };

    /**
     * Encodes the specified CTwoFactor_FinalizeAddAuthenticator_Response message, length delimited. Does not implicitly {@link CTwoFactor_FinalizeAddAuthenticator_Response.verify|verify} messages.
     * @function encodeDelimited
     * @memberof CTwoFactor_FinalizeAddAuthenticator_Response
     * @static
     * @param {ICTwoFactor_FinalizeAddAuthenticator_Response} message CTwoFactor_FinalizeAddAuthenticator_Response message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CTwoFactor_FinalizeAddAuthenticator_Response.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a CTwoFactor_FinalizeAddAuthenticator_Response message from the specified reader or buffer.
     * @function decode
     * @memberof CTwoFactor_FinalizeAddAuthenticator_Response
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {CTwoFactor_FinalizeAddAuthenticator_Response} CTwoFactor_FinalizeAddAuthenticator_Response
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CTwoFactor_FinalizeAddAuthenticator_Response.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.CTwoFactor_FinalizeAddAuthenticator_Response();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    message.success = reader.bool();
                    break;
                }
            case 3: {
                    message.serverTime = reader.uint64();
                    break;
                }
            case 4: {
                    message.status = reader.int32();
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a CTwoFactor_FinalizeAddAuthenticator_Response message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof CTwoFactor_FinalizeAddAuthenticator_Response
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {CTwoFactor_FinalizeAddAuthenticator_Response} CTwoFactor_FinalizeAddAuthenticator_Response
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CTwoFactor_FinalizeAddAuthenticator_Response.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a CTwoFactor_FinalizeAddAuthenticator_Response message.
     * @function verify
     * @memberof CTwoFactor_FinalizeAddAuthenticator_Response
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    CTwoFactor_FinalizeAddAuthenticator_Response.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.success != null && message.hasOwnProperty("success"))
            if (typeof message.success !== "boolean")
                return "success: boolean expected";
        if (message.serverTime != null && message.hasOwnProperty("serverTime"))
            if (!$util.isInteger(message.serverTime) && !(message.serverTime && $util.isInteger(message.serverTime.low) && $util.isInteger(message.serverTime.high)))
                return "serverTime: integer|Long expected";
        if (message.status != null && message.hasOwnProperty("status"))
            if (!$util.isInteger(message.status))
                return "status: integer expected";
        return null;
    };

    /**
     * Creates a CTwoFactor_FinalizeAddAuthenticator_Response message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof CTwoFactor_FinalizeAddAuthenticator_Response
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {CTwoFactor_FinalizeAddAuthenticator_Response} CTwoFactor_FinalizeAddAuthenticator_Response
     */
    CTwoFactor_FinalizeAddAuthenticator_Response.fromObject = function fromObject(object) {
        if (object instanceof $root.CTwoFactor_FinalizeAddAuthenticator_Response)
            return object;
        let message = new $root.CTwoFactor_FinalizeAddAuthenticator_Response();
        if (object.success != null)
            message.success = Boolean(object.success);
        if (object.serverTime != null)
            if ($util.Long)
                (message.serverTime = $util.Long.fromValue(object.serverTime)).unsigned = true;
            else if (typeof object.serverTime === "string")
                message.serverTime = parseInt(object.serverTime, 10);
            else if (typeof object.serverTime === "number")
                message.serverTime = object.serverTime;
            else if (typeof object.serverTime === "object")
                message.serverTime = new $util.LongBits(object.serverTime.low >>> 0, object.serverTime.high >>> 0).toNumber(true);
        if (object.status != null)
            message.status = object.status | 0;
        return message;
    };

    /**
     * Creates a plain object from a CTwoFactor_FinalizeAddAuthenticator_Response message. Also converts values to other types if specified.
     * @function toObject
     * @memberof CTwoFactor_FinalizeAddAuthenticator_Response
     * @static
     * @param {CTwoFactor_FinalizeAddAuthenticator_Response} message CTwoFactor_FinalizeAddAuthenticator_Response
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    CTwoFactor_FinalizeAddAuthenticator_Response.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.success = false;
            if ($util.Long) {
                let long = new $util.Long(0, 0, true);
                object.serverTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.serverTime = options.longs === String ? "0" : 0;
            object.status = 0;
        }
        if (message.success != null && message.hasOwnProperty("success"))
            object.success = message.success;
        if (message.serverTime != null && message.hasOwnProperty("serverTime"))
            if (typeof message.serverTime === "number")
                object.serverTime = options.longs === String ? String(message.serverTime) : message.serverTime;
            else
                object.serverTime = options.longs === String ? $util.Long.prototype.toString.call(message.serverTime) : options.longs === Number ? new $util.LongBits(message.serverTime.low >>> 0, message.serverTime.high >>> 0).toNumber(true) : message.serverTime;
        if (message.status != null && message.hasOwnProperty("status"))
            object.status = message.status;
        return object;
    };

    /**
     * Converts this CTwoFactor_FinalizeAddAuthenticator_Response to JSON.
     * @function toJSON
     * @memberof CTwoFactor_FinalizeAddAuthenticator_Response
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    CTwoFactor_FinalizeAddAuthenticator_Response.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for CTwoFactor_FinalizeAddAuthenticator_Response
     * @function getTypeUrl
     * @memberof CTwoFactor_FinalizeAddAuthenticator_Response
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    CTwoFactor_FinalizeAddAuthenticator_Response.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/CTwoFactor_FinalizeAddAuthenticator_Response";
    };

    return CTwoFactor_FinalizeAddAuthenticator_Response;
})();

export const CTwoFactor_Status_Request = $root.CTwoFactor_Status_Request = (() => {

    /**
     * Properties of a CTwoFactor_Status_Request.
     * @exports ICTwoFactor_Status_Request
     * @interface ICTwoFactor_Status_Request
     * @property {Long|null} [steamid] CTwoFactor_Status_Request steamid
     * @property {ETwoFactorStatusFieldFlag|null} [include] CTwoFactor_Status_Request include
     */

    /**
     * Constructs a new CTwoFactor_Status_Request.
     * @exports CTwoFactor_Status_Request
     * @classdesc Represents a CTwoFactor_Status_Request.
     * @implements ICTwoFactor_Status_Request
     * @constructor
     * @param {ICTwoFactor_Status_Request=} [properties] Properties to set
     */
    function CTwoFactor_Status_Request(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * CTwoFactor_Status_Request steamid.
     * @member {Long} steamid
     * @memberof CTwoFactor_Status_Request
     * @instance
     */
    CTwoFactor_Status_Request.prototype.steamid = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * CTwoFactor_Status_Request include.
     * @member {ETwoFactorStatusFieldFlag} include
     * @memberof CTwoFactor_Status_Request
     * @instance
     */
    CTwoFactor_Status_Request.prototype.include = 0;

    /**
     * Creates a new CTwoFactor_Status_Request instance using the specified properties.
     * @function create
     * @memberof CTwoFactor_Status_Request
     * @static
     * @param {ICTwoFactor_Status_Request=} [properties] Properties to set
     * @returns {CTwoFactor_Status_Request} CTwoFactor_Status_Request instance
     */
    CTwoFactor_Status_Request.create = function create(properties) {
        return new CTwoFactor_Status_Request(properties);
    };

    /**
     * Encodes the specified CTwoFactor_Status_Request message. Does not implicitly {@link CTwoFactor_Status_Request.verify|verify} messages.
     * @function encode
     * @memberof CTwoFactor_Status_Request
     * @static
     * @param {ICTwoFactor_Status_Request} message CTwoFactor_Status_Request message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CTwoFactor_Status_Request.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.steamid != null && Object.hasOwnProperty.call(message, "steamid"))
            writer.uint32(/* id 1, wireType 1 =*/9).fixed64(message.steamid);
        if (message.include != null && Object.hasOwnProperty.call(message, "include"))
            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.include);
        return writer;
    };

    /**
     * Encodes the specified CTwoFactor_Status_Request message, length delimited. Does not implicitly {@link CTwoFactor_Status_Request.verify|verify} messages.
     * @function encodeDelimited
     * @memberof CTwoFactor_Status_Request
     * @static
     * @param {ICTwoFactor_Status_Request} message CTwoFactor_Status_Request message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CTwoFactor_Status_Request.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a CTwoFactor_Status_Request message from the specified reader or buffer.
     * @function decode
     * @memberof CTwoFactor_Status_Request
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {CTwoFactor_Status_Request} CTwoFactor_Status_Request
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CTwoFactor_Status_Request.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.CTwoFactor_Status_Request();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    message.steamid = reader.fixed64();
                    break;
                }
            case 2: {
                    message.include = reader.int32();
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a CTwoFactor_Status_Request message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof CTwoFactor_Status_Request
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {CTwoFactor_Status_Request} CTwoFactor_Status_Request
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CTwoFactor_Status_Request.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a CTwoFactor_Status_Request message.
     * @function verify
     * @memberof CTwoFactor_Status_Request
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    CTwoFactor_Status_Request.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.steamid != null && message.hasOwnProperty("steamid"))
            if (!$util.isInteger(message.steamid) && !(message.steamid && $util.isInteger(message.steamid.low) && $util.isInteger(message.steamid.high)))
                return "steamid: integer|Long expected";
        if (message.include != null && message.hasOwnProperty("include"))
            switch (message.include) {
            default:
                return "include: enum value expected";
            case 0:
            case 1:
                break;
            }
        return null;
    };

    /**
     * Creates a CTwoFactor_Status_Request message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof CTwoFactor_Status_Request
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {CTwoFactor_Status_Request} CTwoFactor_Status_Request
     */
    CTwoFactor_Status_Request.fromObject = function fromObject(object) {
        if (object instanceof $root.CTwoFactor_Status_Request)
            return object;
        let message = new $root.CTwoFactor_Status_Request();
        if (object.steamid != null)
            if ($util.Long)
                (message.steamid = $util.Long.fromValue(object.steamid)).unsigned = false;
            else if (typeof object.steamid === "string")
                message.steamid = parseInt(object.steamid, 10);
            else if (typeof object.steamid === "number")
                message.steamid = object.steamid;
            else if (typeof object.steamid === "object")
                message.steamid = new $util.LongBits(object.steamid.low >>> 0, object.steamid.high >>> 0).toNumber();
        switch (object.include) {
        default:
            if (typeof object.include === "number") {
                message.include = object.include;
                break;
            }
            break;
        case "k_ETwoFactorStatusFieldFlag_None":
        case 0:
            message.include = 0;
            break;
        case "k_ETwoFactorStatusFieldFlag_LastUsage":
        case 1:
            message.include = 1;
            break;
        }
        return message;
    };

    /**
     * Creates a plain object from a CTwoFactor_Status_Request message. Also converts values to other types if specified.
     * @function toObject
     * @memberof CTwoFactor_Status_Request
     * @static
     * @param {CTwoFactor_Status_Request} message CTwoFactor_Status_Request
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    CTwoFactor_Status_Request.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            if ($util.Long) {
                let long = new $util.Long(0, 0, false);
                object.steamid = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.steamid = options.longs === String ? "0" : 0;
            object.include = options.enums === String ? "k_ETwoFactorStatusFieldFlag_None" : 0;
        }
        if (message.steamid != null && message.hasOwnProperty("steamid"))
            if (typeof message.steamid === "number")
                object.steamid = options.longs === String ? String(message.steamid) : message.steamid;
            else
                object.steamid = options.longs === String ? $util.Long.prototype.toString.call(message.steamid) : options.longs === Number ? new $util.LongBits(message.steamid.low >>> 0, message.steamid.high >>> 0).toNumber() : message.steamid;
        if (message.include != null && message.hasOwnProperty("include"))
            object.include = options.enums === String ? $root.ETwoFactorStatusFieldFlag[message.include] === undefined ? message.include : $root.ETwoFactorStatusFieldFlag[message.include] : message.include;
        return object;
    };

    /**
     * Converts this CTwoFactor_Status_Request to JSON.
     * @function toJSON
     * @memberof CTwoFactor_Status_Request
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    CTwoFactor_Status_Request.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for CTwoFactor_Status_Request
     * @function getTypeUrl
     * @memberof CTwoFactor_Status_Request
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    CTwoFactor_Status_Request.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/CTwoFactor_Status_Request";
    };

    return CTwoFactor_Status_Request;
})();

export const CTwoFactor_UsageEvent = $root.CTwoFactor_UsageEvent = (() => {

    /**
     * Properties of a CTwoFactor_UsageEvent.
     * @exports ICTwoFactor_UsageEvent
     * @interface ICTwoFactor_UsageEvent
     * @property {number|null} [time] CTwoFactor_UsageEvent time
     * @property {ETwoFactorUsageType|null} [usageType] CTwoFactor_UsageEvent usageType
     * @property {number|null} [confirmationType] CTwoFactor_UsageEvent confirmationType
     * @property {number|null} [confirmationAction] CTwoFactor_UsageEvent confirmationAction
     */

    /**
     * Constructs a new CTwoFactor_UsageEvent.
     * @exports CTwoFactor_UsageEvent
     * @classdesc Represents a CTwoFactor_UsageEvent.
     * @implements ICTwoFactor_UsageEvent
     * @constructor
     * @param {ICTwoFactor_UsageEvent=} [properties] Properties to set
     */
    function CTwoFactor_UsageEvent(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * CTwoFactor_UsageEvent time.
     * @member {number} time
     * @memberof CTwoFactor_UsageEvent
     * @instance
     */
    CTwoFactor_UsageEvent.prototype.time = 0;

    /**
     * CTwoFactor_UsageEvent usageType.
     * @member {ETwoFactorUsageType} usageType
     * @memberof CTwoFactor_UsageEvent
     * @instance
     */
    CTwoFactor_UsageEvent.prototype.usageType = 0;

    /**
     * CTwoFactor_UsageEvent confirmationType.
     * @member {number} confirmationType
     * @memberof CTwoFactor_UsageEvent
     * @instance
     */
    CTwoFactor_UsageEvent.prototype.confirmationType = 0;

    /**
     * CTwoFactor_UsageEvent confirmationAction.
     * @member {number} confirmationAction
     * @memberof CTwoFactor_UsageEvent
     * @instance
     */
    CTwoFactor_UsageEvent.prototype.confirmationAction = 0;

    /**
     * Creates a new CTwoFactor_UsageEvent instance using the specified properties.
     * @function create
     * @memberof CTwoFactor_UsageEvent
     * @static
     * @param {ICTwoFactor_UsageEvent=} [properties] Properties to set
     * @returns {CTwoFactor_UsageEvent} CTwoFactor_UsageEvent instance
     */
    CTwoFactor_UsageEvent.create = function create(properties) {
        return new CTwoFactor_UsageEvent(properties);
    };

    /**
     * Encodes the specified CTwoFactor_UsageEvent message. Does not implicitly {@link CTwoFactor_UsageEvent.verify|verify} messages.
     * @function encode
     * @memberof CTwoFactor_UsageEvent
     * @static
     * @param {ICTwoFactor_UsageEvent} message CTwoFactor_UsageEvent message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CTwoFactor_UsageEvent.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.time != null && Object.hasOwnProperty.call(message, "time"))
            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.time);
        if (message.usageType != null && Object.hasOwnProperty.call(message, "usageType"))
            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.usageType);
        if (message.confirmationType != null && Object.hasOwnProperty.call(message, "confirmationType"))
            writer.uint32(/* id 3, wireType 0 =*/24).int32(message.confirmationType);
        if (message.confirmationAction != null && Object.hasOwnProperty.call(message, "confirmationAction"))
            writer.uint32(/* id 4, wireType 0 =*/32).int32(message.confirmationAction);
        return writer;
    };

    /**
     * Encodes the specified CTwoFactor_UsageEvent message, length delimited. Does not implicitly {@link CTwoFactor_UsageEvent.verify|verify} messages.
     * @function encodeDelimited
     * @memberof CTwoFactor_UsageEvent
     * @static
     * @param {ICTwoFactor_UsageEvent} message CTwoFactor_UsageEvent message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CTwoFactor_UsageEvent.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a CTwoFactor_UsageEvent message from the specified reader or buffer.
     * @function decode
     * @memberof CTwoFactor_UsageEvent
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {CTwoFactor_UsageEvent} CTwoFactor_UsageEvent
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CTwoFactor_UsageEvent.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.CTwoFactor_UsageEvent();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    message.time = reader.uint32();
                    break;
                }
            case 2: {
                    message.usageType = reader.int32();
                    break;
                }
            case 3: {
                    message.confirmationType = reader.int32();
                    break;
                }
            case 4: {
                    message.confirmationAction = reader.int32();
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a CTwoFactor_UsageEvent message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof CTwoFactor_UsageEvent
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {CTwoFactor_UsageEvent} CTwoFactor_UsageEvent
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CTwoFactor_UsageEvent.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a CTwoFactor_UsageEvent message.
     * @function verify
     * @memberof CTwoFactor_UsageEvent
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    CTwoFactor_UsageEvent.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.time != null && message.hasOwnProperty("time"))
            if (!$util.isInteger(message.time))
                return "time: integer expected";
        if (message.usageType != null && message.hasOwnProperty("usageType"))
            switch (message.usageType) {
            default:
                return "usageType: enum value expected";
            case 0:
            case 1:
            case 2:
            case 3:
                break;
            }
        if (message.confirmationType != null && message.hasOwnProperty("confirmationType"))
            if (!$util.isInteger(message.confirmationType))
                return "confirmationType: integer expected";
        if (message.confirmationAction != null && message.hasOwnProperty("confirmationAction"))
            if (!$util.isInteger(message.confirmationAction))
                return "confirmationAction: integer expected";
        return null;
    };

    /**
     * Creates a CTwoFactor_UsageEvent message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof CTwoFactor_UsageEvent
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {CTwoFactor_UsageEvent} CTwoFactor_UsageEvent
     */
    CTwoFactor_UsageEvent.fromObject = function fromObject(object) {
        if (object instanceof $root.CTwoFactor_UsageEvent)
            return object;
        let message = new $root.CTwoFactor_UsageEvent();
        if (object.time != null)
            message.time = object.time >>> 0;
        switch (object.usageType) {
        default:
            if (typeof object.usageType === "number") {
                message.usageType = object.usageType;
                break;
            }
            break;
        case "k_ETwoFactorUsageType_Unknown":
        case 0:
            message.usageType = 0;
            break;
        case "k_ETwoFactorUsageType_None":
        case 1:
            message.usageType = 1;
            break;
        case "k_ETwoFactorUsageType_MobileConfirmation":
        case 2:
            message.usageType = 2;
            break;
        case "k_ETwoFactorUsageType_Login":
        case 3:
            message.usageType = 3;
            break;
        }
        if (object.confirmationType != null)
            message.confirmationType = object.confirmationType | 0;
        if (object.confirmationAction != null)
            message.confirmationAction = object.confirmationAction | 0;
        return message;
    };

    /**
     * Creates a plain object from a CTwoFactor_UsageEvent message. Also converts values to other types if specified.
     * @function toObject
     * @memberof CTwoFactor_UsageEvent
     * @static
     * @param {CTwoFactor_UsageEvent} message CTwoFactor_UsageEvent
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    CTwoFactor_UsageEvent.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.time = 0;
            object.usageType = options.enums === String ? "k_ETwoFactorUsageType_Unknown" : 0;
            object.confirmationType = 0;
            object.confirmationAction = 0;
        }
        if (message.time != null && message.hasOwnProperty("time"))
            object.time = message.time;
        if (message.usageType != null && message.hasOwnProperty("usageType"))
            object.usageType = options.enums === String ? $root.ETwoFactorUsageType[message.usageType] === undefined ? message.usageType : $root.ETwoFactorUsageType[message.usageType] : message.usageType;
        if (message.confirmationType != null && message.hasOwnProperty("confirmationType"))
            object.confirmationType = message.confirmationType;
        if (message.confirmationAction != null && message.hasOwnProperty("confirmationAction"))
            object.confirmationAction = message.confirmationAction;
        return object;
    };

    /**
     * Converts this CTwoFactor_UsageEvent to JSON.
     * @function toJSON
     * @memberof CTwoFactor_UsageEvent
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    CTwoFactor_UsageEvent.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for CTwoFactor_UsageEvent
     * @function getTypeUrl
     * @memberof CTwoFactor_UsageEvent
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    CTwoFactor_UsageEvent.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/CTwoFactor_UsageEvent";
    };

    return CTwoFactor_UsageEvent;
})();

export const CTwoFactor_Status_Response = $root.CTwoFactor_Status_Response = (() => {

    /**
     * Properties of a CTwoFactor_Status_Response.
     * @exports ICTwoFactor_Status_Response
     * @interface ICTwoFactor_Status_Response
     * @property {number|null} [state] CTwoFactor_Status_Response state
     * @property {number|null} [inactivationReason] CTwoFactor_Status_Response inactivationReason
     * @property {number|null} [authenticatorType] CTwoFactor_Status_Response authenticatorType
     * @property {boolean|null} [authenticatorAllowed] CTwoFactor_Status_Response authenticatorAllowed
     * @property {number|null} [steamguardScheme] CTwoFactor_Status_Response steamguardScheme
     * @property {string|null} [tokenGid] CTwoFactor_Status_Response tokenGid
     * @property {boolean|null} [emailValidated] CTwoFactor_Status_Response emailValidated
     * @property {string|null} [deviceIdentifier] CTwoFactor_Status_Response deviceIdentifier
     * @property {number|null} [timeCreated] CTwoFactor_Status_Response timeCreated
     * @property {number|null} [revocationAttemptsRemaining] CTwoFactor_Status_Response revocationAttemptsRemaining
     * @property {string|null} [classifiedAgent] CTwoFactor_Status_Response classifiedAgent
     * @property {boolean|null} [allowExternalAuthenticator] CTwoFactor_Status_Response allowExternalAuthenticator
     * @property {number|null} [timeTransferred] CTwoFactor_Status_Response timeTransferred
     * @property {number|null} [version] CTwoFactor_Status_Response version
     * @property {Long|null} [lastSeenAuthTokenId] CTwoFactor_Status_Response lastSeenAuthTokenId
     * @property {Array.<ICTwoFactor_UsageEvent>|null} [usages] CTwoFactor_Status_Response usages
     */

    /**
     * Constructs a new CTwoFactor_Status_Response.
     * @exports CTwoFactor_Status_Response
     * @classdesc Represents a CTwoFactor_Status_Response.
     * @implements ICTwoFactor_Status_Response
     * @constructor
     * @param {ICTwoFactor_Status_Response=} [properties] Properties to set
     */
    function CTwoFactor_Status_Response(properties) {
        this.usages = [];
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * CTwoFactor_Status_Response state.
     * @member {number} state
     * @memberof CTwoFactor_Status_Response
     * @instance
     */
    CTwoFactor_Status_Response.prototype.state = 0;

    /**
     * CTwoFactor_Status_Response inactivationReason.
     * @member {number} inactivationReason
     * @memberof CTwoFactor_Status_Response
     * @instance
     */
    CTwoFactor_Status_Response.prototype.inactivationReason = 0;

    /**
     * CTwoFactor_Status_Response authenticatorType.
     * @member {number} authenticatorType
     * @memberof CTwoFactor_Status_Response
     * @instance
     */
    CTwoFactor_Status_Response.prototype.authenticatorType = 0;

    /**
     * CTwoFactor_Status_Response authenticatorAllowed.
     * @member {boolean} authenticatorAllowed
     * @memberof CTwoFactor_Status_Response
     * @instance
     */
    CTwoFactor_Status_Response.prototype.authenticatorAllowed = false;

    /**
     * CTwoFactor_Status_Response steamguardScheme.
     * @member {number} steamguardScheme
     * @memberof CTwoFactor_Status_Response
     * @instance
     */
    CTwoFactor_Status_Response.prototype.steamguardScheme = 0;

    /**
     * CTwoFactor_Status_Response tokenGid.
     * @member {string} tokenGid
     * @memberof CTwoFactor_Status_Response
     * @instance
     */
    CTwoFactor_Status_Response.prototype.tokenGid = "";

    /**
     * CTwoFactor_Status_Response emailValidated.
     * @member {boolean} emailValidated
     * @memberof CTwoFactor_Status_Response
     * @instance
     */
    CTwoFactor_Status_Response.prototype.emailValidated = false;

    /**
     * CTwoFactor_Status_Response deviceIdentifier.
     * @member {string} deviceIdentifier
     * @memberof CTwoFactor_Status_Response
     * @instance
     */
    CTwoFactor_Status_Response.prototype.deviceIdentifier = "";

    /**
     * CTwoFactor_Status_Response timeCreated.
     * @member {number} timeCreated
     * @memberof CTwoFactor_Status_Response
     * @instance
     */
    CTwoFactor_Status_Response.prototype.timeCreated = 0;

    /**
     * CTwoFactor_Status_Response revocationAttemptsRemaining.
     * @member {number} revocationAttemptsRemaining
     * @memberof CTwoFactor_Status_Response
     * @instance
     */
    CTwoFactor_Status_Response.prototype.revocationAttemptsRemaining = 0;

    /**
     * CTwoFactor_Status_Response classifiedAgent.
     * @member {string} classifiedAgent
     * @memberof CTwoFactor_Status_Response
     * @instance
     */
    CTwoFactor_Status_Response.prototype.classifiedAgent = "";

    /**
     * CTwoFactor_Status_Response allowExternalAuthenticator.
     * @member {boolean} allowExternalAuthenticator
     * @memberof CTwoFactor_Status_Response
     * @instance
     */
    CTwoFactor_Status_Response.prototype.allowExternalAuthenticator = false;

    /**
     * CTwoFactor_Status_Response timeTransferred.
     * @member {number} timeTransferred
     * @memberof CTwoFactor_Status_Response
     * @instance
     */
    CTwoFactor_Status_Response.prototype.timeTransferred = 0;

    /**
     * CTwoFactor_Status_Response version.
     * @member {number} version
     * @memberof CTwoFactor_Status_Response
     * @instance
     */
    CTwoFactor_Status_Response.prototype.version = 0;

    /**
     * CTwoFactor_Status_Response lastSeenAuthTokenId.
     * @member {Long} lastSeenAuthTokenId
     * @memberof CTwoFactor_Status_Response
     * @instance
     */
    CTwoFactor_Status_Response.prototype.lastSeenAuthTokenId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * CTwoFactor_Status_Response usages.
     * @member {Array.<ICTwoFactor_UsageEvent>} usages
     * @memberof CTwoFactor_Status_Response
     * @instance
     */
    CTwoFactor_Status_Response.prototype.usages = $util.emptyArray;

    /**
     * Creates a new CTwoFactor_Status_Response instance using the specified properties.
     * @function create
     * @memberof CTwoFactor_Status_Response
     * @static
     * @param {ICTwoFactor_Status_Response=} [properties] Properties to set
     * @returns {CTwoFactor_Status_Response} CTwoFactor_Status_Response instance
     */
    CTwoFactor_Status_Response.create = function create(properties) {
        return new CTwoFactor_Status_Response(properties);
    };

    /**
     * Encodes the specified CTwoFactor_Status_Response message. Does not implicitly {@link CTwoFactor_Status_Response.verify|verify} messages.
     * @function encode
     * @memberof CTwoFactor_Status_Response
     * @static
     * @param {ICTwoFactor_Status_Response} message CTwoFactor_Status_Response message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CTwoFactor_Status_Response.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.state != null && Object.hasOwnProperty.call(message, "state"))
            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.state);
        if (message.inactivationReason != null && Object.hasOwnProperty.call(message, "inactivationReason"))
            writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.inactivationReason);
        if (message.authenticatorType != null && Object.hasOwnProperty.call(message, "authenticatorType"))
            writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.authenticatorType);
        if (message.authenticatorAllowed != null && Object.hasOwnProperty.call(message, "authenticatorAllowed"))
            writer.uint32(/* id 4, wireType 0 =*/32).bool(message.authenticatorAllowed);
        if (message.steamguardScheme != null && Object.hasOwnProperty.call(message, "steamguardScheme"))
            writer.uint32(/* id 5, wireType 0 =*/40).uint32(message.steamguardScheme);
        if (message.tokenGid != null && Object.hasOwnProperty.call(message, "tokenGid"))
            writer.uint32(/* id 6, wireType 2 =*/50).string(message.tokenGid);
        if (message.emailValidated != null && Object.hasOwnProperty.call(message, "emailValidated"))
            writer.uint32(/* id 7, wireType 0 =*/56).bool(message.emailValidated);
        if (message.deviceIdentifier != null && Object.hasOwnProperty.call(message, "deviceIdentifier"))
            writer.uint32(/* id 8, wireType 2 =*/66).string(message.deviceIdentifier);
        if (message.timeCreated != null && Object.hasOwnProperty.call(message, "timeCreated"))
            writer.uint32(/* id 9, wireType 0 =*/72).uint32(message.timeCreated);
        if (message.revocationAttemptsRemaining != null && Object.hasOwnProperty.call(message, "revocationAttemptsRemaining"))
            writer.uint32(/* id 10, wireType 0 =*/80).uint32(message.revocationAttemptsRemaining);
        if (message.classifiedAgent != null && Object.hasOwnProperty.call(message, "classifiedAgent"))
            writer.uint32(/* id 11, wireType 2 =*/90).string(message.classifiedAgent);
        if (message.allowExternalAuthenticator != null && Object.hasOwnProperty.call(message, "allowExternalAuthenticator"))
            writer.uint32(/* id 12, wireType 0 =*/96).bool(message.allowExternalAuthenticator);
        if (message.timeTransferred != null && Object.hasOwnProperty.call(message, "timeTransferred"))
            writer.uint32(/* id 13, wireType 0 =*/104).uint32(message.timeTransferred);
        if (message.version != null && Object.hasOwnProperty.call(message, "version"))
            writer.uint32(/* id 14, wireType 0 =*/112).uint32(message.version);
        if (message.lastSeenAuthTokenId != null && Object.hasOwnProperty.call(message, "lastSeenAuthTokenId"))
            writer.uint32(/* id 15, wireType 1 =*/121).fixed64(message.lastSeenAuthTokenId);
        if (message.usages != null && message.usages.length)
            for (let i = 0; i < message.usages.length; ++i)
                $root.CTwoFactor_UsageEvent.encode(message.usages[i], writer.uint32(/* id 16, wireType 2 =*/130).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified CTwoFactor_Status_Response message, length delimited. Does not implicitly {@link CTwoFactor_Status_Response.verify|verify} messages.
     * @function encodeDelimited
     * @memberof CTwoFactor_Status_Response
     * @static
     * @param {ICTwoFactor_Status_Response} message CTwoFactor_Status_Response message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CTwoFactor_Status_Response.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a CTwoFactor_Status_Response message from the specified reader or buffer.
     * @function decode
     * @memberof CTwoFactor_Status_Response
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {CTwoFactor_Status_Response} CTwoFactor_Status_Response
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CTwoFactor_Status_Response.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.CTwoFactor_Status_Response();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    message.state = reader.uint32();
                    break;
                }
            case 2: {
                    message.inactivationReason = reader.uint32();
                    break;
                }
            case 3: {
                    message.authenticatorType = reader.uint32();
                    break;
                }
            case 4: {
                    message.authenticatorAllowed = reader.bool();
                    break;
                }
            case 5: {
                    message.steamguardScheme = reader.uint32();
                    break;
                }
            case 6: {
                    message.tokenGid = reader.string();
                    break;
                }
            case 7: {
                    message.emailValidated = reader.bool();
                    break;
                }
            case 8: {
                    message.deviceIdentifier = reader.string();
                    break;
                }
            case 9: {
                    message.timeCreated = reader.uint32();
                    break;
                }
            case 10: {
                    message.revocationAttemptsRemaining = reader.uint32();
                    break;
                }
            case 11: {
                    message.classifiedAgent = reader.string();
                    break;
                }
            case 12: {
                    message.allowExternalAuthenticator = reader.bool();
                    break;
                }
            case 13: {
                    message.timeTransferred = reader.uint32();
                    break;
                }
            case 14: {
                    message.version = reader.uint32();
                    break;
                }
            case 15: {
                    message.lastSeenAuthTokenId = reader.fixed64();
                    break;
                }
            case 16: {
                    if (!(message.usages && message.usages.length))
                        message.usages = [];
                    message.usages.push($root.CTwoFactor_UsageEvent.decode(reader, reader.uint32()));
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a CTwoFactor_Status_Response message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof CTwoFactor_Status_Response
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {CTwoFactor_Status_Response} CTwoFactor_Status_Response
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CTwoFactor_Status_Response.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a CTwoFactor_Status_Response message.
     * @function verify
     * @memberof CTwoFactor_Status_Response
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    CTwoFactor_Status_Response.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.state != null && message.hasOwnProperty("state"))
            if (!$util.isInteger(message.state))
                return "state: integer expected";
        if (message.inactivationReason != null && message.hasOwnProperty("inactivationReason"))
            if (!$util.isInteger(message.inactivationReason))
                return "inactivationReason: integer expected";
        if (message.authenticatorType != null && message.hasOwnProperty("authenticatorType"))
            if (!$util.isInteger(message.authenticatorType))
                return "authenticatorType: integer expected";
        if (message.authenticatorAllowed != null && message.hasOwnProperty("authenticatorAllowed"))
            if (typeof message.authenticatorAllowed !== "boolean")
                return "authenticatorAllowed: boolean expected";
        if (message.steamguardScheme != null && message.hasOwnProperty("steamguardScheme"))
            if (!$util.isInteger(message.steamguardScheme))
                return "steamguardScheme: integer expected";
        if (message.tokenGid != null && message.hasOwnProperty("tokenGid"))
            if (!$util.isString(message.tokenGid))
                return "tokenGid: string expected";
        if (message.emailValidated != null && message.hasOwnProperty("emailValidated"))
            if (typeof message.emailValidated !== "boolean")
                return "emailValidated: boolean expected";
        if (message.deviceIdentifier != null && message.hasOwnProperty("deviceIdentifier"))
            if (!$util.isString(message.deviceIdentifier))
                return "deviceIdentifier: string expected";
        if (message.timeCreated != null && message.hasOwnProperty("timeCreated"))
            if (!$util.isInteger(message.timeCreated))
                return "timeCreated: integer expected";
        if (message.revocationAttemptsRemaining != null && message.hasOwnProperty("revocationAttemptsRemaining"))
            if (!$util.isInteger(message.revocationAttemptsRemaining))
                return "revocationAttemptsRemaining: integer expected";
        if (message.classifiedAgent != null && message.hasOwnProperty("classifiedAgent"))
            if (!$util.isString(message.classifiedAgent))
                return "classifiedAgent: string expected";
        if (message.allowExternalAuthenticator != null && message.hasOwnProperty("allowExternalAuthenticator"))
            if (typeof message.allowExternalAuthenticator !== "boolean")
                return "allowExternalAuthenticator: boolean expected";
        if (message.timeTransferred != null && message.hasOwnProperty("timeTransferred"))
            if (!$util.isInteger(message.timeTransferred))
                return "timeTransferred: integer expected";
        if (message.version != null && message.hasOwnProperty("version"))
            if (!$util.isInteger(message.version))
                return "version: integer expected";
        if (message.lastSeenAuthTokenId != null && message.hasOwnProperty("lastSeenAuthTokenId"))
            if (!$util.isInteger(message.lastSeenAuthTokenId) && !(message.lastSeenAuthTokenId && $util.isInteger(message.lastSeenAuthTokenId.low) && $util.isInteger(message.lastSeenAuthTokenId.high)))
                return "lastSeenAuthTokenId: integer|Long expected";
        if (message.usages != null && message.hasOwnProperty("usages")) {
            if (!Array.isArray(message.usages))
                return "usages: array expected";
            for (let i = 0; i < message.usages.length; ++i) {
                let error = $root.CTwoFactor_UsageEvent.verify(message.usages[i]);
                if (error)
                    return "usages." + error;
            }
        }
        return null;
    };

    /**
     * Creates a CTwoFactor_Status_Response message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof CTwoFactor_Status_Response
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {CTwoFactor_Status_Response} CTwoFactor_Status_Response
     */
    CTwoFactor_Status_Response.fromObject = function fromObject(object) {
        if (object instanceof $root.CTwoFactor_Status_Response)
            return object;
        let message = new $root.CTwoFactor_Status_Response();
        if (object.state != null)
            message.state = object.state >>> 0;
        if (object.inactivationReason != null)
            message.inactivationReason = object.inactivationReason >>> 0;
        if (object.authenticatorType != null)
            message.authenticatorType = object.authenticatorType >>> 0;
        if (object.authenticatorAllowed != null)
            message.authenticatorAllowed = Boolean(object.authenticatorAllowed);
        if (object.steamguardScheme != null)
            message.steamguardScheme = object.steamguardScheme >>> 0;
        if (object.tokenGid != null)
            message.tokenGid = String(object.tokenGid);
        if (object.emailValidated != null)
            message.emailValidated = Boolean(object.emailValidated);
        if (object.deviceIdentifier != null)
            message.deviceIdentifier = String(object.deviceIdentifier);
        if (object.timeCreated != null)
            message.timeCreated = object.timeCreated >>> 0;
        if (object.revocationAttemptsRemaining != null)
            message.revocationAttemptsRemaining = object.revocationAttemptsRemaining >>> 0;
        if (object.classifiedAgent != null)
            message.classifiedAgent = String(object.classifiedAgent);
        if (object.allowExternalAuthenticator != null)
            message.allowExternalAuthenticator = Boolean(object.allowExternalAuthenticator);
        if (object.timeTransferred != null)
            message.timeTransferred = object.timeTransferred >>> 0;
        if (object.version != null)
            message.version = object.version >>> 0;
        if (object.lastSeenAuthTokenId != null)
            if ($util.Long)
                (message.lastSeenAuthTokenId = $util.Long.fromValue(object.lastSeenAuthTokenId)).unsigned = false;
            else if (typeof object.lastSeenAuthTokenId === "string")
                message.lastSeenAuthTokenId = parseInt(object.lastSeenAuthTokenId, 10);
            else if (typeof object.lastSeenAuthTokenId === "number")
                message.lastSeenAuthTokenId = object.lastSeenAuthTokenId;
            else if (typeof object.lastSeenAuthTokenId === "object")
                message.lastSeenAuthTokenId = new $util.LongBits(object.lastSeenAuthTokenId.low >>> 0, object.lastSeenAuthTokenId.high >>> 0).toNumber();
        if (object.usages) {
            if (!Array.isArray(object.usages))
                throw TypeError(".CTwoFactor_Status_Response.usages: array expected");
            message.usages = [];
            for (let i = 0; i < object.usages.length; ++i) {
                if (typeof object.usages[i] !== "object")
                    throw TypeError(".CTwoFactor_Status_Response.usages: object expected");
                message.usages[i] = $root.CTwoFactor_UsageEvent.fromObject(object.usages[i]);
            }
        }
        return message;
    };

    /**
     * Creates a plain object from a CTwoFactor_Status_Response message. Also converts values to other types if specified.
     * @function toObject
     * @memberof CTwoFactor_Status_Response
     * @static
     * @param {CTwoFactor_Status_Response} message CTwoFactor_Status_Response
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    CTwoFactor_Status_Response.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.arrays || options.defaults)
            object.usages = [];
        if (options.defaults) {
            object.state = 0;
            object.inactivationReason = 0;
            object.authenticatorType = 0;
            object.authenticatorAllowed = false;
            object.steamguardScheme = 0;
            object.tokenGid = "";
            object.emailValidated = false;
            object.deviceIdentifier = "";
            object.timeCreated = 0;
            object.revocationAttemptsRemaining = 0;
            object.classifiedAgent = "";
            object.allowExternalAuthenticator = false;
            object.timeTransferred = 0;
            object.version = 0;
            if ($util.Long) {
                let long = new $util.Long(0, 0, false);
                object.lastSeenAuthTokenId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.lastSeenAuthTokenId = options.longs === String ? "0" : 0;
        }
        if (message.state != null && message.hasOwnProperty("state"))
            object.state = message.state;
        if (message.inactivationReason != null && message.hasOwnProperty("inactivationReason"))
            object.inactivationReason = message.inactivationReason;
        if (message.authenticatorType != null && message.hasOwnProperty("authenticatorType"))
            object.authenticatorType = message.authenticatorType;
        if (message.authenticatorAllowed != null && message.hasOwnProperty("authenticatorAllowed"))
            object.authenticatorAllowed = message.authenticatorAllowed;
        if (message.steamguardScheme != null && message.hasOwnProperty("steamguardScheme"))
            object.steamguardScheme = message.steamguardScheme;
        if (message.tokenGid != null && message.hasOwnProperty("tokenGid"))
            object.tokenGid = message.tokenGid;
        if (message.emailValidated != null && message.hasOwnProperty("emailValidated"))
            object.emailValidated = message.emailValidated;
        if (message.deviceIdentifier != null && message.hasOwnProperty("deviceIdentifier"))
            object.deviceIdentifier = message.deviceIdentifier;
        if (message.timeCreated != null && message.hasOwnProperty("timeCreated"))
            object.timeCreated = message.timeCreated;
        if (message.revocationAttemptsRemaining != null && message.hasOwnProperty("revocationAttemptsRemaining"))
            object.revocationAttemptsRemaining = message.revocationAttemptsRemaining;
        if (message.classifiedAgent != null && message.hasOwnProperty("classifiedAgent"))
            object.classifiedAgent = message.classifiedAgent;
        if (message.allowExternalAuthenticator != null && message.hasOwnProperty("allowExternalAuthenticator"))
            object.allowExternalAuthenticator = message.allowExternalAuthenticator;
        if (message.timeTransferred != null && message.hasOwnProperty("timeTransferred"))
            object.timeTransferred = message.timeTransferred;
        if (message.version != null && message.hasOwnProperty("version"))
            object.version = message.version;
        if (message.lastSeenAuthTokenId != null && message.hasOwnProperty("lastSeenAuthTokenId"))
            if (typeof message.lastSeenAuthTokenId === "number")
                object.lastSeenAuthTokenId = options.longs === String ? String(message.lastSeenAuthTokenId) : message.lastSeenAuthTokenId;
            else
                object.lastSeenAuthTokenId = options.longs === String ? $util.Long.prototype.toString.call(message.lastSeenAuthTokenId) : options.longs === Number ? new $util.LongBits(message.lastSeenAuthTokenId.low >>> 0, message.lastSeenAuthTokenId.high >>> 0).toNumber() : message.lastSeenAuthTokenId;
        if (message.usages && message.usages.length) {
            object.usages = [];
            for (let j = 0; j < message.usages.length; ++j)
                object.usages[j] = $root.CTwoFactor_UsageEvent.toObject(message.usages[j], options);
        }
        return object;
    };

    /**
     * Converts this CTwoFactor_Status_Response to JSON.
     * @function toJSON
     * @memberof CTwoFactor_Status_Response
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    CTwoFactor_Status_Response.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for CTwoFactor_Status_Response
     * @function getTypeUrl
     * @memberof CTwoFactor_Status_Response
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    CTwoFactor_Status_Response.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/CTwoFactor_Status_Response";
    };

    return CTwoFactor_Status_Response;
})();

export const CTwoFactor_RemoveAuthenticator_Request = $root.CTwoFactor_RemoveAuthenticator_Request = (() => {

    /**
     * Properties of a CTwoFactor_RemoveAuthenticator_Request.
     * @exports ICTwoFactor_RemoveAuthenticator_Request
     * @interface ICTwoFactor_RemoveAuthenticator_Request
     * @property {string|null} [revocationCode] CTwoFactor_RemoveAuthenticator_Request revocationCode
     * @property {number|null} [revocationReason] CTwoFactor_RemoveAuthenticator_Request revocationReason
     * @property {number|null} [steamguardScheme] CTwoFactor_RemoveAuthenticator_Request steamguardScheme
     * @property {boolean|null} [removeAllSteamguardCookies] CTwoFactor_RemoveAuthenticator_Request removeAllSteamguardCookies
     */

    /**
     * Constructs a new CTwoFactor_RemoveAuthenticator_Request.
     * @exports CTwoFactor_RemoveAuthenticator_Request
     * @classdesc Represents a CTwoFactor_RemoveAuthenticator_Request.
     * @implements ICTwoFactor_RemoveAuthenticator_Request
     * @constructor
     * @param {ICTwoFactor_RemoveAuthenticator_Request=} [properties] Properties to set
     */
    function CTwoFactor_RemoveAuthenticator_Request(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * CTwoFactor_RemoveAuthenticator_Request revocationCode.
     * @member {string} revocationCode
     * @memberof CTwoFactor_RemoveAuthenticator_Request
     * @instance
     */
    CTwoFactor_RemoveAuthenticator_Request.prototype.revocationCode = "";

    /**
     * CTwoFactor_RemoveAuthenticator_Request revocationReason.
     * @member {number} revocationReason
     * @memberof CTwoFactor_RemoveAuthenticator_Request
     * @instance
     */
    CTwoFactor_RemoveAuthenticator_Request.prototype.revocationReason = 0;

    /**
     * CTwoFactor_RemoveAuthenticator_Request steamguardScheme.
     * @member {number} steamguardScheme
     * @memberof CTwoFactor_RemoveAuthenticator_Request
     * @instance
     */
    CTwoFactor_RemoveAuthenticator_Request.prototype.steamguardScheme = 0;

    /**
     * CTwoFactor_RemoveAuthenticator_Request removeAllSteamguardCookies.
     * @member {boolean} removeAllSteamguardCookies
     * @memberof CTwoFactor_RemoveAuthenticator_Request
     * @instance
     */
    CTwoFactor_RemoveAuthenticator_Request.prototype.removeAllSteamguardCookies = false;

    /**
     * Creates a new CTwoFactor_RemoveAuthenticator_Request instance using the specified properties.
     * @function create
     * @memberof CTwoFactor_RemoveAuthenticator_Request
     * @static
     * @param {ICTwoFactor_RemoveAuthenticator_Request=} [properties] Properties to set
     * @returns {CTwoFactor_RemoveAuthenticator_Request} CTwoFactor_RemoveAuthenticator_Request instance
     */
    CTwoFactor_RemoveAuthenticator_Request.create = function create(properties) {
        return new CTwoFactor_RemoveAuthenticator_Request(properties);
    };

    /**
     * Encodes the specified CTwoFactor_RemoveAuthenticator_Request message. Does not implicitly {@link CTwoFactor_RemoveAuthenticator_Request.verify|verify} messages.
     * @function encode
     * @memberof CTwoFactor_RemoveAuthenticator_Request
     * @static
     * @param {ICTwoFactor_RemoveAuthenticator_Request} message CTwoFactor_RemoveAuthenticator_Request message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CTwoFactor_RemoveAuthenticator_Request.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.revocationCode != null && Object.hasOwnProperty.call(message, "revocationCode"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.revocationCode);
        if (message.revocationReason != null && Object.hasOwnProperty.call(message, "revocationReason"))
            writer.uint32(/* id 5, wireType 0 =*/40).uint32(message.revocationReason);
        if (message.steamguardScheme != null && Object.hasOwnProperty.call(message, "steamguardScheme"))
            writer.uint32(/* id 6, wireType 0 =*/48).uint32(message.steamguardScheme);
        if (message.removeAllSteamguardCookies != null && Object.hasOwnProperty.call(message, "removeAllSteamguardCookies"))
            writer.uint32(/* id 7, wireType 0 =*/56).bool(message.removeAllSteamguardCookies);
        return writer;
    };

    /**
     * Encodes the specified CTwoFactor_RemoveAuthenticator_Request message, length delimited. Does not implicitly {@link CTwoFactor_RemoveAuthenticator_Request.verify|verify} messages.
     * @function encodeDelimited
     * @memberof CTwoFactor_RemoveAuthenticator_Request
     * @static
     * @param {ICTwoFactor_RemoveAuthenticator_Request} message CTwoFactor_RemoveAuthenticator_Request message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CTwoFactor_RemoveAuthenticator_Request.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a CTwoFactor_RemoveAuthenticator_Request message from the specified reader or buffer.
     * @function decode
     * @memberof CTwoFactor_RemoveAuthenticator_Request
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {CTwoFactor_RemoveAuthenticator_Request} CTwoFactor_RemoveAuthenticator_Request
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CTwoFactor_RemoveAuthenticator_Request.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.CTwoFactor_RemoveAuthenticator_Request();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 2: {
                    message.revocationCode = reader.string();
                    break;
                }
            case 5: {
                    message.revocationReason = reader.uint32();
                    break;
                }
            case 6: {
                    message.steamguardScheme = reader.uint32();
                    break;
                }
            case 7: {
                    message.removeAllSteamguardCookies = reader.bool();
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a CTwoFactor_RemoveAuthenticator_Request message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof CTwoFactor_RemoveAuthenticator_Request
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {CTwoFactor_RemoveAuthenticator_Request} CTwoFactor_RemoveAuthenticator_Request
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CTwoFactor_RemoveAuthenticator_Request.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a CTwoFactor_RemoveAuthenticator_Request message.
     * @function verify
     * @memberof CTwoFactor_RemoveAuthenticator_Request
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    CTwoFactor_RemoveAuthenticator_Request.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.revocationCode != null && message.hasOwnProperty("revocationCode"))
            if (!$util.isString(message.revocationCode))
                return "revocationCode: string expected";
        if (message.revocationReason != null && message.hasOwnProperty("revocationReason"))
            if (!$util.isInteger(message.revocationReason))
                return "revocationReason: integer expected";
        if (message.steamguardScheme != null && message.hasOwnProperty("steamguardScheme"))
            if (!$util.isInteger(message.steamguardScheme))
                return "steamguardScheme: integer expected";
        if (message.removeAllSteamguardCookies != null && message.hasOwnProperty("removeAllSteamguardCookies"))
            if (typeof message.removeAllSteamguardCookies !== "boolean")
                return "removeAllSteamguardCookies: boolean expected";
        return null;
    };

    /**
     * Creates a CTwoFactor_RemoveAuthenticator_Request message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof CTwoFactor_RemoveAuthenticator_Request
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {CTwoFactor_RemoveAuthenticator_Request} CTwoFactor_RemoveAuthenticator_Request
     */
    CTwoFactor_RemoveAuthenticator_Request.fromObject = function fromObject(object) {
        if (object instanceof $root.CTwoFactor_RemoveAuthenticator_Request)
            return object;
        let message = new $root.CTwoFactor_RemoveAuthenticator_Request();
        if (object.revocationCode != null)
            message.revocationCode = String(object.revocationCode);
        if (object.revocationReason != null)
            message.revocationReason = object.revocationReason >>> 0;
        if (object.steamguardScheme != null)
            message.steamguardScheme = object.steamguardScheme >>> 0;
        if (object.removeAllSteamguardCookies != null)
            message.removeAllSteamguardCookies = Boolean(object.removeAllSteamguardCookies);
        return message;
    };

    /**
     * Creates a plain object from a CTwoFactor_RemoveAuthenticator_Request message. Also converts values to other types if specified.
     * @function toObject
     * @memberof CTwoFactor_RemoveAuthenticator_Request
     * @static
     * @param {CTwoFactor_RemoveAuthenticator_Request} message CTwoFactor_RemoveAuthenticator_Request
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    CTwoFactor_RemoveAuthenticator_Request.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.revocationCode = "";
            object.revocationReason = 0;
            object.steamguardScheme = 0;
            object.removeAllSteamguardCookies = false;
        }
        if (message.revocationCode != null && message.hasOwnProperty("revocationCode"))
            object.revocationCode = message.revocationCode;
        if (message.revocationReason != null && message.hasOwnProperty("revocationReason"))
            object.revocationReason = message.revocationReason;
        if (message.steamguardScheme != null && message.hasOwnProperty("steamguardScheme"))
            object.steamguardScheme = message.steamguardScheme;
        if (message.removeAllSteamguardCookies != null && message.hasOwnProperty("removeAllSteamguardCookies"))
            object.removeAllSteamguardCookies = message.removeAllSteamguardCookies;
        return object;
    };

    /**
     * Converts this CTwoFactor_RemoveAuthenticator_Request to JSON.
     * @function toJSON
     * @memberof CTwoFactor_RemoveAuthenticator_Request
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    CTwoFactor_RemoveAuthenticator_Request.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for CTwoFactor_RemoveAuthenticator_Request
     * @function getTypeUrl
     * @memberof CTwoFactor_RemoveAuthenticator_Request
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    CTwoFactor_RemoveAuthenticator_Request.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/CTwoFactor_RemoveAuthenticator_Request";
    };

    return CTwoFactor_RemoveAuthenticator_Request;
})();

export const CTwoFactor_RemoveAuthenticator_Response = $root.CTwoFactor_RemoveAuthenticator_Response = (() => {

    /**
     * Properties of a CTwoFactor_RemoveAuthenticator_Response.
     * @exports ICTwoFactor_RemoveAuthenticator_Response
     * @interface ICTwoFactor_RemoveAuthenticator_Response
     * @property {boolean|null} [success] CTwoFactor_RemoveAuthenticator_Response success
     * @property {Long|null} [serverTime] CTwoFactor_RemoveAuthenticator_Response serverTime
     * @property {number|null} [revocationAttemptsRemaining] CTwoFactor_RemoveAuthenticator_Response revocationAttemptsRemaining
     */

    /**
     * Constructs a new CTwoFactor_RemoveAuthenticator_Response.
     * @exports CTwoFactor_RemoveAuthenticator_Response
     * @classdesc Represents a CTwoFactor_RemoveAuthenticator_Response.
     * @implements ICTwoFactor_RemoveAuthenticator_Response
     * @constructor
     * @param {ICTwoFactor_RemoveAuthenticator_Response=} [properties] Properties to set
     */
    function CTwoFactor_RemoveAuthenticator_Response(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * CTwoFactor_RemoveAuthenticator_Response success.
     * @member {boolean} success
     * @memberof CTwoFactor_RemoveAuthenticator_Response
     * @instance
     */
    CTwoFactor_RemoveAuthenticator_Response.prototype.success = false;

    /**
     * CTwoFactor_RemoveAuthenticator_Response serverTime.
     * @member {Long} serverTime
     * @memberof CTwoFactor_RemoveAuthenticator_Response
     * @instance
     */
    CTwoFactor_RemoveAuthenticator_Response.prototype.serverTime = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

    /**
     * CTwoFactor_RemoveAuthenticator_Response revocationAttemptsRemaining.
     * @member {number} revocationAttemptsRemaining
     * @memberof CTwoFactor_RemoveAuthenticator_Response
     * @instance
     */
    CTwoFactor_RemoveAuthenticator_Response.prototype.revocationAttemptsRemaining = 0;

    /**
     * Creates a new CTwoFactor_RemoveAuthenticator_Response instance using the specified properties.
     * @function create
     * @memberof CTwoFactor_RemoveAuthenticator_Response
     * @static
     * @param {ICTwoFactor_RemoveAuthenticator_Response=} [properties] Properties to set
     * @returns {CTwoFactor_RemoveAuthenticator_Response} CTwoFactor_RemoveAuthenticator_Response instance
     */
    CTwoFactor_RemoveAuthenticator_Response.create = function create(properties) {
        return new CTwoFactor_RemoveAuthenticator_Response(properties);
    };

    /**
     * Encodes the specified CTwoFactor_RemoveAuthenticator_Response message. Does not implicitly {@link CTwoFactor_RemoveAuthenticator_Response.verify|verify} messages.
     * @function encode
     * @memberof CTwoFactor_RemoveAuthenticator_Response
     * @static
     * @param {ICTwoFactor_RemoveAuthenticator_Response} message CTwoFactor_RemoveAuthenticator_Response message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CTwoFactor_RemoveAuthenticator_Response.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.success != null && Object.hasOwnProperty.call(message, "success"))
            writer.uint32(/* id 1, wireType 0 =*/8).bool(message.success);
        if (message.serverTime != null && Object.hasOwnProperty.call(message, "serverTime"))
            writer.uint32(/* id 3, wireType 0 =*/24).uint64(message.serverTime);
        if (message.revocationAttemptsRemaining != null && Object.hasOwnProperty.call(message, "revocationAttemptsRemaining"))
            writer.uint32(/* id 5, wireType 0 =*/40).uint32(message.revocationAttemptsRemaining);
        return writer;
    };

    /**
     * Encodes the specified CTwoFactor_RemoveAuthenticator_Response message, length delimited. Does not implicitly {@link CTwoFactor_RemoveAuthenticator_Response.verify|verify} messages.
     * @function encodeDelimited
     * @memberof CTwoFactor_RemoveAuthenticator_Response
     * @static
     * @param {ICTwoFactor_RemoveAuthenticator_Response} message CTwoFactor_RemoveAuthenticator_Response message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CTwoFactor_RemoveAuthenticator_Response.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a CTwoFactor_RemoveAuthenticator_Response message from the specified reader or buffer.
     * @function decode
     * @memberof CTwoFactor_RemoveAuthenticator_Response
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {CTwoFactor_RemoveAuthenticator_Response} CTwoFactor_RemoveAuthenticator_Response
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CTwoFactor_RemoveAuthenticator_Response.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.CTwoFactor_RemoveAuthenticator_Response();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    message.success = reader.bool();
                    break;
                }
            case 3: {
                    message.serverTime = reader.uint64();
                    break;
                }
            case 5: {
                    message.revocationAttemptsRemaining = reader.uint32();
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a CTwoFactor_RemoveAuthenticator_Response message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof CTwoFactor_RemoveAuthenticator_Response
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {CTwoFactor_RemoveAuthenticator_Response} CTwoFactor_RemoveAuthenticator_Response
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CTwoFactor_RemoveAuthenticator_Response.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a CTwoFactor_RemoveAuthenticator_Response message.
     * @function verify
     * @memberof CTwoFactor_RemoveAuthenticator_Response
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    CTwoFactor_RemoveAuthenticator_Response.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.success != null && message.hasOwnProperty("success"))
            if (typeof message.success !== "boolean")
                return "success: boolean expected";
        if (message.serverTime != null && message.hasOwnProperty("serverTime"))
            if (!$util.isInteger(message.serverTime) && !(message.serverTime && $util.isInteger(message.serverTime.low) && $util.isInteger(message.serverTime.high)))
                return "serverTime: integer|Long expected";
        if (message.revocationAttemptsRemaining != null && message.hasOwnProperty("revocationAttemptsRemaining"))
            if (!$util.isInteger(message.revocationAttemptsRemaining))
                return "revocationAttemptsRemaining: integer expected";
        return null;
    };

    /**
     * Creates a CTwoFactor_RemoveAuthenticator_Response message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof CTwoFactor_RemoveAuthenticator_Response
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {CTwoFactor_RemoveAuthenticator_Response} CTwoFactor_RemoveAuthenticator_Response
     */
    CTwoFactor_RemoveAuthenticator_Response.fromObject = function fromObject(object) {
        if (object instanceof $root.CTwoFactor_RemoveAuthenticator_Response)
            return object;
        let message = new $root.CTwoFactor_RemoveAuthenticator_Response();
        if (object.success != null)
            message.success = Boolean(object.success);
        if (object.serverTime != null)
            if ($util.Long)
                (message.serverTime = $util.Long.fromValue(object.serverTime)).unsigned = true;
            else if (typeof object.serverTime === "string")
                message.serverTime = parseInt(object.serverTime, 10);
            else if (typeof object.serverTime === "number")
                message.serverTime = object.serverTime;
            else if (typeof object.serverTime === "object")
                message.serverTime = new $util.LongBits(object.serverTime.low >>> 0, object.serverTime.high >>> 0).toNumber(true);
        if (object.revocationAttemptsRemaining != null)
            message.revocationAttemptsRemaining = object.revocationAttemptsRemaining >>> 0;
        return message;
    };

    /**
     * Creates a plain object from a CTwoFactor_RemoveAuthenticator_Response message. Also converts values to other types if specified.
     * @function toObject
     * @memberof CTwoFactor_RemoveAuthenticator_Response
     * @static
     * @param {CTwoFactor_RemoveAuthenticator_Response} message CTwoFactor_RemoveAuthenticator_Response
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    CTwoFactor_RemoveAuthenticator_Response.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.success = false;
            if ($util.Long) {
                let long = new $util.Long(0, 0, true);
                object.serverTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.serverTime = options.longs === String ? "0" : 0;
            object.revocationAttemptsRemaining = 0;
        }
        if (message.success != null && message.hasOwnProperty("success"))
            object.success = message.success;
        if (message.serverTime != null && message.hasOwnProperty("serverTime"))
            if (typeof message.serverTime === "number")
                object.serverTime = options.longs === String ? String(message.serverTime) : message.serverTime;
            else
                object.serverTime = options.longs === String ? $util.Long.prototype.toString.call(message.serverTime) : options.longs === Number ? new $util.LongBits(message.serverTime.low >>> 0, message.serverTime.high >>> 0).toNumber(true) : message.serverTime;
        if (message.revocationAttemptsRemaining != null && message.hasOwnProperty("revocationAttemptsRemaining"))
            object.revocationAttemptsRemaining = message.revocationAttemptsRemaining;
        return object;
    };

    /**
     * Converts this CTwoFactor_RemoveAuthenticator_Response to JSON.
     * @function toJSON
     * @memberof CTwoFactor_RemoveAuthenticator_Response
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    CTwoFactor_RemoveAuthenticator_Response.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for CTwoFactor_RemoveAuthenticator_Response
     * @function getTypeUrl
     * @memberof CTwoFactor_RemoveAuthenticator_Response
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    CTwoFactor_RemoveAuthenticator_Response.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/CTwoFactor_RemoveAuthenticator_Response";
    };

    return CTwoFactor_RemoveAuthenticator_Response;
})();

export const CRemoveAuthenticatorViaChallengeContinue_Replacement_Token = $root.CRemoveAuthenticatorViaChallengeContinue_Replacement_Token = (() => {

    /**
     * Properties of a CRemoveAuthenticatorViaChallengeContinue_Replacement_Token.
     * @exports ICRemoveAuthenticatorViaChallengeContinue_Replacement_Token
     * @interface ICRemoveAuthenticatorViaChallengeContinue_Replacement_Token
     * @property {Uint8Array|null} [sharedSecret] CRemoveAuthenticatorViaChallengeContinue_Replacement_Token sharedSecret
     * @property {Long|null} [serialNumber] CRemoveAuthenticatorViaChallengeContinue_Replacement_Token serialNumber
     * @property {string|null} [revocationCode] CRemoveAuthenticatorViaChallengeContinue_Replacement_Token revocationCode
     * @property {string|null} [uri] CRemoveAuthenticatorViaChallengeContinue_Replacement_Token uri
     * @property {Long|null} [serverTime] CRemoveAuthenticatorViaChallengeContinue_Replacement_Token serverTime
     * @property {string|null} [accountName] CRemoveAuthenticatorViaChallengeContinue_Replacement_Token accountName
     * @property {string|null} [tokenGid] CRemoveAuthenticatorViaChallengeContinue_Replacement_Token tokenGid
     * @property {Uint8Array|null} [identitySecret] CRemoveAuthenticatorViaChallengeContinue_Replacement_Token identitySecret
     * @property {Uint8Array|null} [secret_1] CRemoveAuthenticatorViaChallengeContinue_Replacement_Token secret_1
     * @property {number|null} [status] CRemoveAuthenticatorViaChallengeContinue_Replacement_Token status
     * @property {number|null} [steamguardScheme] CRemoveAuthenticatorViaChallengeContinue_Replacement_Token steamguardScheme
     * @property {Long|null} [steamid] CRemoveAuthenticatorViaChallengeContinue_Replacement_Token steamid
     */

    /**
     * Constructs a new CRemoveAuthenticatorViaChallengeContinue_Replacement_Token.
     * @exports CRemoveAuthenticatorViaChallengeContinue_Replacement_Token
     * @classdesc Represents a CRemoveAuthenticatorViaChallengeContinue_Replacement_Token.
     * @implements ICRemoveAuthenticatorViaChallengeContinue_Replacement_Token
     * @constructor
     * @param {ICRemoveAuthenticatorViaChallengeContinue_Replacement_Token=} [properties] Properties to set
     */
    function CRemoveAuthenticatorViaChallengeContinue_Replacement_Token(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * CRemoveAuthenticatorViaChallengeContinue_Replacement_Token sharedSecret.
     * @member {Uint8Array} sharedSecret
     * @memberof CRemoveAuthenticatorViaChallengeContinue_Replacement_Token
     * @instance
     */
    CRemoveAuthenticatorViaChallengeContinue_Replacement_Token.prototype.sharedSecret = $util.newBuffer([]);

    /**
     * CRemoveAuthenticatorViaChallengeContinue_Replacement_Token serialNumber.
     * @member {Long} serialNumber
     * @memberof CRemoveAuthenticatorViaChallengeContinue_Replacement_Token
     * @instance
     */
    CRemoveAuthenticatorViaChallengeContinue_Replacement_Token.prototype.serialNumber = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * CRemoveAuthenticatorViaChallengeContinue_Replacement_Token revocationCode.
     * @member {string} revocationCode
     * @memberof CRemoveAuthenticatorViaChallengeContinue_Replacement_Token
     * @instance
     */
    CRemoveAuthenticatorViaChallengeContinue_Replacement_Token.prototype.revocationCode = "";

    /**
     * CRemoveAuthenticatorViaChallengeContinue_Replacement_Token uri.
     * @member {string} uri
     * @memberof CRemoveAuthenticatorViaChallengeContinue_Replacement_Token
     * @instance
     */
    CRemoveAuthenticatorViaChallengeContinue_Replacement_Token.prototype.uri = "";

    /**
     * CRemoveAuthenticatorViaChallengeContinue_Replacement_Token serverTime.
     * @member {Long} serverTime
     * @memberof CRemoveAuthenticatorViaChallengeContinue_Replacement_Token
     * @instance
     */
    CRemoveAuthenticatorViaChallengeContinue_Replacement_Token.prototype.serverTime = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

    /**
     * CRemoveAuthenticatorViaChallengeContinue_Replacement_Token accountName.
     * @member {string} accountName
     * @memberof CRemoveAuthenticatorViaChallengeContinue_Replacement_Token
     * @instance
     */
    CRemoveAuthenticatorViaChallengeContinue_Replacement_Token.prototype.accountName = "";

    /**
     * CRemoveAuthenticatorViaChallengeContinue_Replacement_Token tokenGid.
     * @member {string} tokenGid
     * @memberof CRemoveAuthenticatorViaChallengeContinue_Replacement_Token
     * @instance
     */
    CRemoveAuthenticatorViaChallengeContinue_Replacement_Token.prototype.tokenGid = "";

    /**
     * CRemoveAuthenticatorViaChallengeContinue_Replacement_Token identitySecret.
     * @member {Uint8Array} identitySecret
     * @memberof CRemoveAuthenticatorViaChallengeContinue_Replacement_Token
     * @instance
     */
    CRemoveAuthenticatorViaChallengeContinue_Replacement_Token.prototype.identitySecret = $util.newBuffer([]);

    /**
     * CRemoveAuthenticatorViaChallengeContinue_Replacement_Token secret_1.
     * @member {Uint8Array} secret_1
     * @memberof CRemoveAuthenticatorViaChallengeContinue_Replacement_Token
     * @instance
     */
    CRemoveAuthenticatorViaChallengeContinue_Replacement_Token.prototype.secret_1 = $util.newBuffer([]);

    /**
     * CRemoveAuthenticatorViaChallengeContinue_Replacement_Token status.
     * @member {number} status
     * @memberof CRemoveAuthenticatorViaChallengeContinue_Replacement_Token
     * @instance
     */
    CRemoveAuthenticatorViaChallengeContinue_Replacement_Token.prototype.status = 0;

    /**
     * CRemoveAuthenticatorViaChallengeContinue_Replacement_Token steamguardScheme.
     * @member {number} steamguardScheme
     * @memberof CRemoveAuthenticatorViaChallengeContinue_Replacement_Token
     * @instance
     */
    CRemoveAuthenticatorViaChallengeContinue_Replacement_Token.prototype.steamguardScheme = 0;

    /**
     * CRemoveAuthenticatorViaChallengeContinue_Replacement_Token steamid.
     * @member {Long} steamid
     * @memberof CRemoveAuthenticatorViaChallengeContinue_Replacement_Token
     * @instance
     */
    CRemoveAuthenticatorViaChallengeContinue_Replacement_Token.prototype.steamid = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * Creates a new CRemoveAuthenticatorViaChallengeContinue_Replacement_Token instance using the specified properties.
     * @function create
     * @memberof CRemoveAuthenticatorViaChallengeContinue_Replacement_Token
     * @static
     * @param {ICRemoveAuthenticatorViaChallengeContinue_Replacement_Token=} [properties] Properties to set
     * @returns {CRemoveAuthenticatorViaChallengeContinue_Replacement_Token} CRemoveAuthenticatorViaChallengeContinue_Replacement_Token instance
     */
    CRemoveAuthenticatorViaChallengeContinue_Replacement_Token.create = function create(properties) {
        return new CRemoveAuthenticatorViaChallengeContinue_Replacement_Token(properties);
    };

    /**
     * Encodes the specified CRemoveAuthenticatorViaChallengeContinue_Replacement_Token message. Does not implicitly {@link CRemoveAuthenticatorViaChallengeContinue_Replacement_Token.verify|verify} messages.
     * @function encode
     * @memberof CRemoveAuthenticatorViaChallengeContinue_Replacement_Token
     * @static
     * @param {ICRemoveAuthenticatorViaChallengeContinue_Replacement_Token} message CRemoveAuthenticatorViaChallengeContinue_Replacement_Token message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CRemoveAuthenticatorViaChallengeContinue_Replacement_Token.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.sharedSecret != null && Object.hasOwnProperty.call(message, "sharedSecret"))
            writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.sharedSecret);
        if (message.serialNumber != null && Object.hasOwnProperty.call(message, "serialNumber"))
            writer.uint32(/* id 2, wireType 1 =*/17).fixed64(message.serialNumber);
        if (message.revocationCode != null && Object.hasOwnProperty.call(message, "revocationCode"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.revocationCode);
        if (message.uri != null && Object.hasOwnProperty.call(message, "uri"))
            writer.uint32(/* id 4, wireType 2 =*/34).string(message.uri);
        if (message.serverTime != null && Object.hasOwnProperty.call(message, "serverTime"))
            writer.uint32(/* id 5, wireType 0 =*/40).uint64(message.serverTime);
        if (message.accountName != null && Object.hasOwnProperty.call(message, "accountName"))
            writer.uint32(/* id 6, wireType 2 =*/50).string(message.accountName);
        if (message.tokenGid != null && Object.hasOwnProperty.call(message, "tokenGid"))
            writer.uint32(/* id 7, wireType 2 =*/58).string(message.tokenGid);
        if (message.identitySecret != null && Object.hasOwnProperty.call(message, "identitySecret"))
            writer.uint32(/* id 8, wireType 2 =*/66).bytes(message.identitySecret);
        if (message.secret_1 != null && Object.hasOwnProperty.call(message, "secret_1"))
            writer.uint32(/* id 9, wireType 2 =*/74).bytes(message.secret_1);
        if (message.status != null && Object.hasOwnProperty.call(message, "status"))
            writer.uint32(/* id 10, wireType 0 =*/80).int32(message.status);
        if (message.steamguardScheme != null && Object.hasOwnProperty.call(message, "steamguardScheme"))
            writer.uint32(/* id 11, wireType 0 =*/88).uint32(message.steamguardScheme);
        if (message.steamid != null && Object.hasOwnProperty.call(message, "steamid"))
            writer.uint32(/* id 12, wireType 1 =*/97).fixed64(message.steamid);
        return writer;
    };

    /**
     * Encodes the specified CRemoveAuthenticatorViaChallengeContinue_Replacement_Token message, length delimited. Does not implicitly {@link CRemoveAuthenticatorViaChallengeContinue_Replacement_Token.verify|verify} messages.
     * @function encodeDelimited
     * @memberof CRemoveAuthenticatorViaChallengeContinue_Replacement_Token
     * @static
     * @param {ICRemoveAuthenticatorViaChallengeContinue_Replacement_Token} message CRemoveAuthenticatorViaChallengeContinue_Replacement_Token message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CRemoveAuthenticatorViaChallengeContinue_Replacement_Token.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a CRemoveAuthenticatorViaChallengeContinue_Replacement_Token message from the specified reader or buffer.
     * @function decode
     * @memberof CRemoveAuthenticatorViaChallengeContinue_Replacement_Token
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {CRemoveAuthenticatorViaChallengeContinue_Replacement_Token} CRemoveAuthenticatorViaChallengeContinue_Replacement_Token
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CRemoveAuthenticatorViaChallengeContinue_Replacement_Token.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.CRemoveAuthenticatorViaChallengeContinue_Replacement_Token();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    message.sharedSecret = reader.bytes();
                    break;
                }
            case 2: {
                    message.serialNumber = reader.fixed64();
                    break;
                }
            case 3: {
                    message.revocationCode = reader.string();
                    break;
                }
            case 4: {
                    message.uri = reader.string();
                    break;
                }
            case 5: {
                    message.serverTime = reader.uint64();
                    break;
                }
            case 6: {
                    message.accountName = reader.string();
                    break;
                }
            case 7: {
                    message.tokenGid = reader.string();
                    break;
                }
            case 8: {
                    message.identitySecret = reader.bytes();
                    break;
                }
            case 9: {
                    message.secret_1 = reader.bytes();
                    break;
                }
            case 10: {
                    message.status = reader.int32();
                    break;
                }
            case 11: {
                    message.steamguardScheme = reader.uint32();
                    break;
                }
            case 12: {
                    message.steamid = reader.fixed64();
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a CRemoveAuthenticatorViaChallengeContinue_Replacement_Token message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof CRemoveAuthenticatorViaChallengeContinue_Replacement_Token
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {CRemoveAuthenticatorViaChallengeContinue_Replacement_Token} CRemoveAuthenticatorViaChallengeContinue_Replacement_Token
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CRemoveAuthenticatorViaChallengeContinue_Replacement_Token.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a CRemoveAuthenticatorViaChallengeContinue_Replacement_Token message.
     * @function verify
     * @memberof CRemoveAuthenticatorViaChallengeContinue_Replacement_Token
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    CRemoveAuthenticatorViaChallengeContinue_Replacement_Token.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.sharedSecret != null && message.hasOwnProperty("sharedSecret"))
            if (!(message.sharedSecret && typeof message.sharedSecret.length === "number" || $util.isString(message.sharedSecret)))
                return "sharedSecret: buffer expected";
        if (message.serialNumber != null && message.hasOwnProperty("serialNumber"))
            if (!$util.isInteger(message.serialNumber) && !(message.serialNumber && $util.isInteger(message.serialNumber.low) && $util.isInteger(message.serialNumber.high)))
                return "serialNumber: integer|Long expected";
        if (message.revocationCode != null && message.hasOwnProperty("revocationCode"))
            if (!$util.isString(message.revocationCode))
                return "revocationCode: string expected";
        if (message.uri != null && message.hasOwnProperty("uri"))
            if (!$util.isString(message.uri))
                return "uri: string expected";
        if (message.serverTime != null && message.hasOwnProperty("serverTime"))
            if (!$util.isInteger(message.serverTime) && !(message.serverTime && $util.isInteger(message.serverTime.low) && $util.isInteger(message.serverTime.high)))
                return "serverTime: integer|Long expected";
        if (message.accountName != null && message.hasOwnProperty("accountName"))
            if (!$util.isString(message.accountName))
                return "accountName: string expected";
        if (message.tokenGid != null && message.hasOwnProperty("tokenGid"))
            if (!$util.isString(message.tokenGid))
                return "tokenGid: string expected";
        if (message.identitySecret != null && message.hasOwnProperty("identitySecret"))
            if (!(message.identitySecret && typeof message.identitySecret.length === "number" || $util.isString(message.identitySecret)))
                return "identitySecret: buffer expected";
        if (message.secret_1 != null && message.hasOwnProperty("secret_1"))
            if (!(message.secret_1 && typeof message.secret_1.length === "number" || $util.isString(message.secret_1)))
                return "secret_1: buffer expected";
        if (message.status != null && message.hasOwnProperty("status"))
            if (!$util.isInteger(message.status))
                return "status: integer expected";
        if (message.steamguardScheme != null && message.hasOwnProperty("steamguardScheme"))
            if (!$util.isInteger(message.steamguardScheme))
                return "steamguardScheme: integer expected";
        if (message.steamid != null && message.hasOwnProperty("steamid"))
            if (!$util.isInteger(message.steamid) && !(message.steamid && $util.isInteger(message.steamid.low) && $util.isInteger(message.steamid.high)))
                return "steamid: integer|Long expected";
        return null;
    };

    /**
     * Creates a CRemoveAuthenticatorViaChallengeContinue_Replacement_Token message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof CRemoveAuthenticatorViaChallengeContinue_Replacement_Token
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {CRemoveAuthenticatorViaChallengeContinue_Replacement_Token} CRemoveAuthenticatorViaChallengeContinue_Replacement_Token
     */
    CRemoveAuthenticatorViaChallengeContinue_Replacement_Token.fromObject = function fromObject(object) {
        if (object instanceof $root.CRemoveAuthenticatorViaChallengeContinue_Replacement_Token)
            return object;
        let message = new $root.CRemoveAuthenticatorViaChallengeContinue_Replacement_Token();
        if (object.sharedSecret != null)
            if (typeof object.sharedSecret === "string")
                $util.base64.decode(object.sharedSecret, message.sharedSecret = $util.newBuffer($util.base64.length(object.sharedSecret)), 0);
            else if (object.sharedSecret.length >= 0)
                message.sharedSecret = object.sharedSecret;
        if (object.serialNumber != null)
            if ($util.Long)
                (message.serialNumber = $util.Long.fromValue(object.serialNumber)).unsigned = false;
            else if (typeof object.serialNumber === "string")
                message.serialNumber = parseInt(object.serialNumber, 10);
            else if (typeof object.serialNumber === "number")
                message.serialNumber = object.serialNumber;
            else if (typeof object.serialNumber === "object")
                message.serialNumber = new $util.LongBits(object.serialNumber.low >>> 0, object.serialNumber.high >>> 0).toNumber();
        if (object.revocationCode != null)
            message.revocationCode = String(object.revocationCode);
        if (object.uri != null)
            message.uri = String(object.uri);
        if (object.serverTime != null)
            if ($util.Long)
                (message.serverTime = $util.Long.fromValue(object.serverTime)).unsigned = true;
            else if (typeof object.serverTime === "string")
                message.serverTime = parseInt(object.serverTime, 10);
            else if (typeof object.serverTime === "number")
                message.serverTime = object.serverTime;
            else if (typeof object.serverTime === "object")
                message.serverTime = new $util.LongBits(object.serverTime.low >>> 0, object.serverTime.high >>> 0).toNumber(true);
        if (object.accountName != null)
            message.accountName = String(object.accountName);
        if (object.tokenGid != null)
            message.tokenGid = String(object.tokenGid);
        if (object.identitySecret != null)
            if (typeof object.identitySecret === "string")
                $util.base64.decode(object.identitySecret, message.identitySecret = $util.newBuffer($util.base64.length(object.identitySecret)), 0);
            else if (object.identitySecret.length >= 0)
                message.identitySecret = object.identitySecret;
        if (object.secret_1 != null)
            if (typeof object.secret_1 === "string")
                $util.base64.decode(object.secret_1, message.secret_1 = $util.newBuffer($util.base64.length(object.secret_1)), 0);
            else if (object.secret_1.length >= 0)
                message.secret_1 = object.secret_1;
        if (object.status != null)
            message.status = object.status | 0;
        if (object.steamguardScheme != null)
            message.steamguardScheme = object.steamguardScheme >>> 0;
        if (object.steamid != null)
            if ($util.Long)
                (message.steamid = $util.Long.fromValue(object.steamid)).unsigned = false;
            else if (typeof object.steamid === "string")
                message.steamid = parseInt(object.steamid, 10);
            else if (typeof object.steamid === "number")
                message.steamid = object.steamid;
            else if (typeof object.steamid === "object")
                message.steamid = new $util.LongBits(object.steamid.low >>> 0, object.steamid.high >>> 0).toNumber();
        return message;
    };

    /**
     * Creates a plain object from a CRemoveAuthenticatorViaChallengeContinue_Replacement_Token message. Also converts values to other types if specified.
     * @function toObject
     * @memberof CRemoveAuthenticatorViaChallengeContinue_Replacement_Token
     * @static
     * @param {CRemoveAuthenticatorViaChallengeContinue_Replacement_Token} message CRemoveAuthenticatorViaChallengeContinue_Replacement_Token
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    CRemoveAuthenticatorViaChallengeContinue_Replacement_Token.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            if (options.bytes === String)
                object.sharedSecret = "";
            else {
                object.sharedSecret = [];
                if (options.bytes !== Array)
                    object.sharedSecret = $util.newBuffer(object.sharedSecret);
            }
            if ($util.Long) {
                let long = new $util.Long(0, 0, false);
                object.serialNumber = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.serialNumber = options.longs === String ? "0" : 0;
            object.revocationCode = "";
            object.uri = "";
            if ($util.Long) {
                let long = new $util.Long(0, 0, true);
                object.serverTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.serverTime = options.longs === String ? "0" : 0;
            object.accountName = "";
            object.tokenGid = "";
            if (options.bytes === String)
                object.identitySecret = "";
            else {
                object.identitySecret = [];
                if (options.bytes !== Array)
                    object.identitySecret = $util.newBuffer(object.identitySecret);
            }
            if (options.bytes === String)
                object.secret_1 = "";
            else {
                object.secret_1 = [];
                if (options.bytes !== Array)
                    object.secret_1 = $util.newBuffer(object.secret_1);
            }
            object.status = 0;
            object.steamguardScheme = 0;
            if ($util.Long) {
                let long = new $util.Long(0, 0, false);
                object.steamid = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.steamid = options.longs === String ? "0" : 0;
        }
        if (message.sharedSecret != null && message.hasOwnProperty("sharedSecret"))
            object.sharedSecret = options.bytes === String ? $util.base64.encode(message.sharedSecret, 0, message.sharedSecret.length) : options.bytes === Array ? Array.prototype.slice.call(message.sharedSecret) : message.sharedSecret;
        if (message.serialNumber != null && message.hasOwnProperty("serialNumber"))
            if (typeof message.serialNumber === "number")
                object.serialNumber = options.longs === String ? String(message.serialNumber) : message.serialNumber;
            else
                object.serialNumber = options.longs === String ? $util.Long.prototype.toString.call(message.serialNumber) : options.longs === Number ? new $util.LongBits(message.serialNumber.low >>> 0, message.serialNumber.high >>> 0).toNumber() : message.serialNumber;
        if (message.revocationCode != null && message.hasOwnProperty("revocationCode"))
            object.revocationCode = message.revocationCode;
        if (message.uri != null && message.hasOwnProperty("uri"))
            object.uri = message.uri;
        if (message.serverTime != null && message.hasOwnProperty("serverTime"))
            if (typeof message.serverTime === "number")
                object.serverTime = options.longs === String ? String(message.serverTime) : message.serverTime;
            else
                object.serverTime = options.longs === String ? $util.Long.prototype.toString.call(message.serverTime) : options.longs === Number ? new $util.LongBits(message.serverTime.low >>> 0, message.serverTime.high >>> 0).toNumber(true) : message.serverTime;
        if (message.accountName != null && message.hasOwnProperty("accountName"))
            object.accountName = message.accountName;
        if (message.tokenGid != null && message.hasOwnProperty("tokenGid"))
            object.tokenGid = message.tokenGid;
        if (message.identitySecret != null && message.hasOwnProperty("identitySecret"))
            object.identitySecret = options.bytes === String ? $util.base64.encode(message.identitySecret, 0, message.identitySecret.length) : options.bytes === Array ? Array.prototype.slice.call(message.identitySecret) : message.identitySecret;
        if (message.secret_1 != null && message.hasOwnProperty("secret_1"))
            object.secret_1 = options.bytes === String ? $util.base64.encode(message.secret_1, 0, message.secret_1.length) : options.bytes === Array ? Array.prototype.slice.call(message.secret_1) : message.secret_1;
        if (message.status != null && message.hasOwnProperty("status"))
            object.status = message.status;
        if (message.steamguardScheme != null && message.hasOwnProperty("steamguardScheme"))
            object.steamguardScheme = message.steamguardScheme;
        if (message.steamid != null && message.hasOwnProperty("steamid"))
            if (typeof message.steamid === "number")
                object.steamid = options.longs === String ? String(message.steamid) : message.steamid;
            else
                object.steamid = options.longs === String ? $util.Long.prototype.toString.call(message.steamid) : options.longs === Number ? new $util.LongBits(message.steamid.low >>> 0, message.steamid.high >>> 0).toNumber() : message.steamid;
        return object;
    };

    /**
     * Converts this CRemoveAuthenticatorViaChallengeContinue_Replacement_Token to JSON.
     * @function toJSON
     * @memberof CRemoveAuthenticatorViaChallengeContinue_Replacement_Token
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    CRemoveAuthenticatorViaChallengeContinue_Replacement_Token.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for CRemoveAuthenticatorViaChallengeContinue_Replacement_Token
     * @function getTypeUrl
     * @memberof CRemoveAuthenticatorViaChallengeContinue_Replacement_Token
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    CRemoveAuthenticatorViaChallengeContinue_Replacement_Token.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/CRemoveAuthenticatorViaChallengeContinue_Replacement_Token";
    };

    return CRemoveAuthenticatorViaChallengeContinue_Replacement_Token;
})();

export const CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request = $root.CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request = (() => {

    /**
     * Properties of a CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request.
     * @exports ICTwoFactor_RemoveAuthenticatorViaChallengeStart_Request
     * @interface ICTwoFactor_RemoveAuthenticatorViaChallengeStart_Request
     */

    /**
     * Constructs a new CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request.
     * @exports CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request
     * @classdesc Represents a CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request.
     * @implements ICTwoFactor_RemoveAuthenticatorViaChallengeStart_Request
     * @constructor
     * @param {ICTwoFactor_RemoveAuthenticatorViaChallengeStart_Request=} [properties] Properties to set
     */
    function CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Creates a new CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request instance using the specified properties.
     * @function create
     * @memberof CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request
     * @static
     * @param {ICTwoFactor_RemoveAuthenticatorViaChallengeStart_Request=} [properties] Properties to set
     * @returns {CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request} CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request instance
     */
    CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request.create = function create(properties) {
        return new CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request(properties);
    };

    /**
     * Encodes the specified CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request message. Does not implicitly {@link CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request.verify|verify} messages.
     * @function encode
     * @memberof CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request
     * @static
     * @param {ICTwoFactor_RemoveAuthenticatorViaChallengeStart_Request} message CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        return writer;
    };

    /**
     * Encodes the specified CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request message, length delimited. Does not implicitly {@link CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request.verify|verify} messages.
     * @function encodeDelimited
     * @memberof CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request
     * @static
     * @param {ICTwoFactor_RemoveAuthenticatorViaChallengeStart_Request} message CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request message from the specified reader or buffer.
     * @function decode
     * @memberof CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request} CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request} CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request message.
     * @function verify
     * @memberof CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        return null;
    };

    /**
     * Creates a CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request} CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request
     */
    CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request.fromObject = function fromObject(object) {
        if (object instanceof $root.CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request)
            return object;
        return new $root.CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request();
    };

    /**
     * Creates a plain object from a CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request message. Also converts values to other types if specified.
     * @function toObject
     * @memberof CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request
     * @static
     * @param {CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request} message CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request.toObject = function toObject() {
        return {};
    };

    /**
     * Converts this CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request to JSON.
     * @function toJSON
     * @memberof CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request
     * @function getTypeUrl
     * @memberof CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request";
    };

    return CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request;
})();

export const CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response = $root.CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response = (() => {

    /**
     * Properties of a CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response.
     * @exports ICTwoFactor_RemoveAuthenticatorViaChallengeStart_Response
     * @interface ICTwoFactor_RemoveAuthenticatorViaChallengeStart_Response
     * @property {boolean|null} [success] CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response success
     */

    /**
     * Constructs a new CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response.
     * @exports CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response
     * @classdesc Represents a CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response.
     * @implements ICTwoFactor_RemoveAuthenticatorViaChallengeStart_Response
     * @constructor
     * @param {ICTwoFactor_RemoveAuthenticatorViaChallengeStart_Response=} [properties] Properties to set
     */
    function CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response success.
     * @member {boolean} success
     * @memberof CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response
     * @instance
     */
    CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response.prototype.success = false;

    /**
     * Creates a new CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response instance using the specified properties.
     * @function create
     * @memberof CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response
     * @static
     * @param {ICTwoFactor_RemoveAuthenticatorViaChallengeStart_Response=} [properties] Properties to set
     * @returns {CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response} CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response instance
     */
    CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response.create = function create(properties) {
        return new CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response(properties);
    };

    /**
     * Encodes the specified CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response message. Does not implicitly {@link CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response.verify|verify} messages.
     * @function encode
     * @memberof CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response
     * @static
     * @param {ICTwoFactor_RemoveAuthenticatorViaChallengeStart_Response} message CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.success != null && Object.hasOwnProperty.call(message, "success"))
            writer.uint32(/* id 1, wireType 0 =*/8).bool(message.success);
        return writer;
    };

    /**
     * Encodes the specified CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response message, length delimited. Does not implicitly {@link CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response.verify|verify} messages.
     * @function encodeDelimited
     * @memberof CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response
     * @static
     * @param {ICTwoFactor_RemoveAuthenticatorViaChallengeStart_Response} message CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response message from the specified reader or buffer.
     * @function decode
     * @memberof CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response} CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    message.success = reader.bool();
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response} CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response message.
     * @function verify
     * @memberof CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.success != null && message.hasOwnProperty("success"))
            if (typeof message.success !== "boolean")
                return "success: boolean expected";
        return null;
    };

    /**
     * Creates a CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response} CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response
     */
    CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response.fromObject = function fromObject(object) {
        if (object instanceof $root.CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response)
            return object;
        let message = new $root.CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response();
        if (object.success != null)
            message.success = Boolean(object.success);
        return message;
    };

    /**
     * Creates a plain object from a CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response message. Also converts values to other types if specified.
     * @function toObject
     * @memberof CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response
     * @static
     * @param {CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response} message CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults)
            object.success = false;
        if (message.success != null && message.hasOwnProperty("success"))
            object.success = message.success;
        return object;
    };

    /**
     * Converts this CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response to JSON.
     * @function toJSON
     * @memberof CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response
     * @function getTypeUrl
     * @memberof CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response";
    };

    return CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response;
})();

export const CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request = $root.CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request = (() => {

    /**
     * Properties of a CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request.
     * @exports ICTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request
     * @interface ICTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request
     * @property {string|null} [smsCode] CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request smsCode
     * @property {boolean|null} [generateNewToken] CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request generateNewToken
     * @property {number|null} [version] CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request version
     */

    /**
     * Constructs a new CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request.
     * @exports CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request
     * @classdesc Represents a CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request.
     * @implements ICTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request
     * @constructor
     * @param {ICTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request=} [properties] Properties to set
     */
    function CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request smsCode.
     * @member {string} smsCode
     * @memberof CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request
     * @instance
     */
    CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request.prototype.smsCode = "";

    /**
     * CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request generateNewToken.
     * @member {boolean} generateNewToken
     * @memberof CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request
     * @instance
     */
    CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request.prototype.generateNewToken = false;

    /**
     * CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request version.
     * @member {number} version
     * @memberof CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request
     * @instance
     */
    CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request.prototype.version = 1;

    /**
     * Creates a new CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request instance using the specified properties.
     * @function create
     * @memberof CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request
     * @static
     * @param {ICTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request=} [properties] Properties to set
     * @returns {CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request} CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request instance
     */
    CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request.create = function create(properties) {
        return new CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request(properties);
    };

    /**
     * Encodes the specified CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request message. Does not implicitly {@link CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request.verify|verify} messages.
     * @function encode
     * @memberof CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request
     * @static
     * @param {ICTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request} message CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.smsCode != null && Object.hasOwnProperty.call(message, "smsCode"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.smsCode);
        if (message.generateNewToken != null && Object.hasOwnProperty.call(message, "generateNewToken"))
            writer.uint32(/* id 2, wireType 0 =*/16).bool(message.generateNewToken);
        if (message.version != null && Object.hasOwnProperty.call(message, "version"))
            writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.version);
        return writer;
    };

    /**
     * Encodes the specified CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request message, length delimited. Does not implicitly {@link CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request.verify|verify} messages.
     * @function encodeDelimited
     * @memberof CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request
     * @static
     * @param {ICTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request} message CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request message from the specified reader or buffer.
     * @function decode
     * @memberof CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request} CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    message.smsCode = reader.string();
                    break;
                }
            case 2: {
                    message.generateNewToken = reader.bool();
                    break;
                }
            case 3: {
                    message.version = reader.uint32();
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request} CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request message.
     * @function verify
     * @memberof CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.smsCode != null && message.hasOwnProperty("smsCode"))
            if (!$util.isString(message.smsCode))
                return "smsCode: string expected";
        if (message.generateNewToken != null && message.hasOwnProperty("generateNewToken"))
            if (typeof message.generateNewToken !== "boolean")
                return "generateNewToken: boolean expected";
        if (message.version != null && message.hasOwnProperty("version"))
            if (!$util.isInteger(message.version))
                return "version: integer expected";
        return null;
    };

    /**
     * Creates a CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request} CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request
     */
    CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request.fromObject = function fromObject(object) {
        if (object instanceof $root.CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request)
            return object;
        let message = new $root.CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request();
        if (object.smsCode != null)
            message.smsCode = String(object.smsCode);
        if (object.generateNewToken != null)
            message.generateNewToken = Boolean(object.generateNewToken);
        if (object.version != null)
            message.version = object.version >>> 0;
        return message;
    };

    /**
     * Creates a plain object from a CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request message. Also converts values to other types if specified.
     * @function toObject
     * @memberof CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request
     * @static
     * @param {CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request} message CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.smsCode = "";
            object.generateNewToken = false;
            object.version = 1;
        }
        if (message.smsCode != null && message.hasOwnProperty("smsCode"))
            object.smsCode = message.smsCode;
        if (message.generateNewToken != null && message.hasOwnProperty("generateNewToken"))
            object.generateNewToken = message.generateNewToken;
        if (message.version != null && message.hasOwnProperty("version"))
            object.version = message.version;
        return object;
    };

    /**
     * Converts this CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request to JSON.
     * @function toJSON
     * @memberof CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request
     * @function getTypeUrl
     * @memberof CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request";
    };

    return CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request;
})();

export const CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response = $root.CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response = (() => {

    /**
     * Properties of a CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response.
     * @exports ICTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response
     * @interface ICTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response
     * @property {boolean|null} [success] CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response success
     * @property {ICRemoveAuthenticatorViaChallengeContinue_Replacement_Token|null} [replacementToken] CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response replacementToken
     */

    /**
     * Constructs a new CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response.
     * @exports CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response
     * @classdesc Represents a CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response.
     * @implements ICTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response
     * @constructor
     * @param {ICTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response=} [properties] Properties to set
     */
    function CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response success.
     * @member {boolean} success
     * @memberof CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response
     * @instance
     */
    CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response.prototype.success = false;

    /**
     * CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response replacementToken.
     * @member {ICRemoveAuthenticatorViaChallengeContinue_Replacement_Token|null|undefined} replacementToken
     * @memberof CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response
     * @instance
     */
    CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response.prototype.replacementToken = null;

    /**
     * Creates a new CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response instance using the specified properties.
     * @function create
     * @memberof CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response
     * @static
     * @param {ICTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response=} [properties] Properties to set
     * @returns {CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response} CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response instance
     */
    CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response.create = function create(properties) {
        return new CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response(properties);
    };

    /**
     * Encodes the specified CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response message. Does not implicitly {@link CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response.verify|verify} messages.
     * @function encode
     * @memberof CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response
     * @static
     * @param {ICTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response} message CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.success != null && Object.hasOwnProperty.call(message, "success"))
            writer.uint32(/* id 1, wireType 0 =*/8).bool(message.success);
        if (message.replacementToken != null && Object.hasOwnProperty.call(message, "replacementToken"))
            $root.CRemoveAuthenticatorViaChallengeContinue_Replacement_Token.encode(message.replacementToken, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response message, length delimited. Does not implicitly {@link CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response.verify|verify} messages.
     * @function encodeDelimited
     * @memberof CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response
     * @static
     * @param {ICTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response} message CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response message from the specified reader or buffer.
     * @function decode
     * @memberof CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response} CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    message.success = reader.bool();
                    break;
                }
            case 2: {
                    message.replacementToken = $root.CRemoveAuthenticatorViaChallengeContinue_Replacement_Token.decode(reader, reader.uint32());
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response} CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response message.
     * @function verify
     * @memberof CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.success != null && message.hasOwnProperty("success"))
            if (typeof message.success !== "boolean")
                return "success: boolean expected";
        if (message.replacementToken != null && message.hasOwnProperty("replacementToken")) {
            let error = $root.CRemoveAuthenticatorViaChallengeContinue_Replacement_Token.verify(message.replacementToken);
            if (error)
                return "replacementToken." + error;
        }
        return null;
    };

    /**
     * Creates a CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response} CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response
     */
    CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response.fromObject = function fromObject(object) {
        if (object instanceof $root.CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response)
            return object;
        let message = new $root.CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response();
        if (object.success != null)
            message.success = Boolean(object.success);
        if (object.replacementToken != null) {
            if (typeof object.replacementToken !== "object")
                throw TypeError(".CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response.replacementToken: object expected");
            message.replacementToken = $root.CRemoveAuthenticatorViaChallengeContinue_Replacement_Token.fromObject(object.replacementToken);
        }
        return message;
    };

    /**
     * Creates a plain object from a CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response message. Also converts values to other types if specified.
     * @function toObject
     * @memberof CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response
     * @static
     * @param {CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response} message CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.success = false;
            object.replacementToken = null;
        }
        if (message.success != null && message.hasOwnProperty("success"))
            object.success = message.success;
        if (message.replacementToken != null && message.hasOwnProperty("replacementToken"))
            object.replacementToken = $root.CRemoveAuthenticatorViaChallengeContinue_Replacement_Token.toObject(message.replacementToken, options);
        return object;
    };

    /**
     * Converts this CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response to JSON.
     * @function toJSON
     * @memberof CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response
     * @function getTypeUrl
     * @memberof CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response";
    };

    return CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response;
})();

export { $root as default };
