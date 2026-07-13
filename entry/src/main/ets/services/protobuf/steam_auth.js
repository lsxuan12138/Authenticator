/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-mixed-operators, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars, default-case, jsdoc/require-param*/
import { index } from "@ohos/protobufjs";
import Long from "long";

const $protobuf = index;
$protobuf.util.Long = Long;
$protobuf.configure();

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;
const $Object = $util.global.Object, $undefined = $util.global.undefined, $Error = $util.global.Error, $TypeError = $util.global.TypeError, $String = $util.global.String, $Array = $util.global.Array, $parseInt = $util.global.parseInt, $Boolean = $util.global.Boolean, $Number = $util.global.Number, $BigInt = $util.global.BigInt, $isFinite = $util.global.isFinite;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

/**
 * EAuthTokenPlatformType enum.
 * @name EAuthTokenPlatformType
 * @enum {number}
 * @property {number} k_EAuthTokenPlatformType_Unknown=0 k_EAuthTokenPlatformType_Unknown value
 * @property {number} k_EAuthTokenPlatformType_SteamClient=1 k_EAuthTokenPlatformType_SteamClient value
 * @property {number} k_EAuthTokenPlatformType_WebBrowser=2 k_EAuthTokenPlatformType_WebBrowser value
 * @property {number} k_EAuthTokenPlatformType_MobileApp=3 k_EAuthTokenPlatformType_MobileApp value
 */
export const EAuthTokenPlatformType = $root.EAuthTokenPlatformType = (() => {
    const valuesById = $Object.create(null), values = $Object.create(valuesById);
    values[valuesById[0] = "k_EAuthTokenPlatformType_Unknown"] = 0;
    values[valuesById[1] = "k_EAuthTokenPlatformType_SteamClient"] = 1;
    values[valuesById[2] = "k_EAuthTokenPlatformType_WebBrowser"] = 2;
    values[valuesById[3] = "k_EAuthTokenPlatformType_MobileApp"] = 3;
    return values;
})();

/**
 * EAuthSessionGuardType enum.
 * @name EAuthSessionGuardType
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
    const valuesById = $Object.create(null), values = $Object.create(valuesById);
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
 * @name ESessionPersistence
 * @enum {number}
 * @property {number} k_ESessionPersistence_Invalid=-1 k_ESessionPersistence_Invalid value
 * @property {number} k_ESessionPersistence_Ephemeral=0 k_ESessionPersistence_Ephemeral value
 * @property {number} k_ESessionPersistence_Persistent=1 k_ESessionPersistence_Persistent value
 */
export const ESessionPersistence = $root.ESessionPersistence = (() => {
    const valuesById = $Object.create(null), values = $Object.create(valuesById);
    values[valuesById[-1] = "k_ESessionPersistence_Invalid"] = -1;
    values[valuesById[0] = "k_ESessionPersistence_Ephemeral"] = 0;
    values[valuesById[1] = "k_ESessionPersistence_Persistent"] = 1;
    return values;
})();

export const CAuthentication_DeviceDetails = $root.CAuthentication_DeviceDetails = (() => {

    /**
     * Properties of a CAuthentication_DeviceDetails.
     * @typedef {Object} CAuthentication_DeviceDetails.$Properties
     * @property {string|null} [deviceFriendlyName] CAuthentication_DeviceDetails deviceFriendlyName
     * @property {EAuthTokenPlatformType|null} [platformType] CAuthentication_DeviceDetails platformType
     * @property {number|null} [osType] CAuthentication_DeviceDetails osType
     * @property {number|null} [gamingDeviceType] CAuthentication_DeviceDetails gamingDeviceType
     * @property {number|null} [clientCount] CAuthentication_DeviceDetails clientCount
     * @property {Uint8Array|null} [machineId] CAuthentication_DeviceDetails machineId
     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
     */

    /**
     * Properties of a CAuthentication_DeviceDetails.
     * @exports ICAuthentication_DeviceDetails
     * @interface ICAuthentication_DeviceDetails
     * @augments CAuthentication_DeviceDetails.$Properties
     * @deprecated Use CAuthentication_DeviceDetails.$Properties instead.
     */

    /**
     * Shape of a CAuthentication_DeviceDetails.
     * @typedef {CAuthentication_DeviceDetails.$Properties} CAuthentication_DeviceDetails.$Shape
     */

    /**
     * Constructs a new CAuthentication_DeviceDetails.
     * @exports CAuthentication_DeviceDetails
     * @classdesc Represents a CAuthentication_DeviceDetails.
     * @constructor
     * @param {CAuthentication_DeviceDetails.$Properties=} [properties] Properties to set
     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
     */
    const CAuthentication_DeviceDetails = function (properties) {
        if (properties)
            for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null && keys[i] !== "__proto__")
                    this[keys[i]] = properties[keys[i]];
    };

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
     * Creates a new CAuthentication_DeviceDetails instance using the specified properties.
     * @function create
     * @memberof CAuthentication_DeviceDetails
     * @static
     * @param {CAuthentication_DeviceDetails.$Properties=} [properties] Properties to set
     * @returns {CAuthentication_DeviceDetails} CAuthentication_DeviceDetails instance
     * @type {{
     *   (properties: CAuthentication_DeviceDetails.$Shape): CAuthentication_DeviceDetails & CAuthentication_DeviceDetails.$Shape;
     *   (properties?: CAuthentication_DeviceDetails.$Properties): CAuthentication_DeviceDetails;
     * }}
     */
    CAuthentication_DeviceDetails.create = function(properties) {
        return new CAuthentication_DeviceDetails(properties);
    };

    /**
     * Encodes the specified CAuthentication_DeviceDetails message. Does not implicitly {@link CAuthentication_DeviceDetails.verify|verify} messages.
     * @function encode
     * @memberof CAuthentication_DeviceDetails
     * @static
     * @param {CAuthentication_DeviceDetails.$Properties} message CAuthentication_DeviceDetails message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CAuthentication_DeviceDetails.encode = function (message, writer, _depth) {
        if (!writer)
            writer = $Writer.create();
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw $Error("max depth exceeded");
        if (message.deviceFriendlyName != null && $Object.hasOwnProperty.call(message, "deviceFriendlyName"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.deviceFriendlyName);
        if (message.platformType != null && $Object.hasOwnProperty.call(message, "platformType"))
            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.platformType);
        if (message.osType != null && $Object.hasOwnProperty.call(message, "osType"))
            writer.uint32(/* id 3, wireType 0 =*/24).int32(message.osType);
        if (message.gamingDeviceType != null && $Object.hasOwnProperty.call(message, "gamingDeviceType"))
            writer.uint32(/* id 4, wireType 0 =*/32).uint32(message.gamingDeviceType);
        if (message.clientCount != null && $Object.hasOwnProperty.call(message, "clientCount"))
            writer.uint32(/* id 5, wireType 0 =*/40).uint32(message.clientCount);
        if (message.machineId != null && $Object.hasOwnProperty.call(message, "machineId"))
            writer.uint32(/* id 6, wireType 2 =*/50).bytes(message.machineId);
        if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
            for (let i = 0; i < message.$unknowns.length; ++i)
                writer.raw(message.$unknowns[i]);
        return writer;
    };

    /**
     * Encodes the specified CAuthentication_DeviceDetails message, length delimited. Does not implicitly {@link CAuthentication_DeviceDetails.verify|verify} messages.
     * @function encodeDelimited
     * @memberof CAuthentication_DeviceDetails
     * @static
     * @param {CAuthentication_DeviceDetails.$Properties} message CAuthentication_DeviceDetails message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CAuthentication_DeviceDetails.encodeDelimited = function(message, writer) {
        return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
    };

    /**
     * Decodes a CAuthentication_DeviceDetails message from the specified reader or buffer.
     * @function decode
     * @memberof CAuthentication_DeviceDetails
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {CAuthentication_DeviceDetails & CAuthentication_DeviceDetails.$Shape} CAuthentication_DeviceDetails
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CAuthentication_DeviceDetails.decode = function (reader, length, _end, _depth, _target) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $Reader.recursionLimit)
            throw $Error("max depth exceeded");
        let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.CAuthentication_DeviceDetails(), value;
        while (reader.pos < end) {
            let start = reader.pos;
            let tag = reader.tag();
            if (tag === _end) {
                _end = $undefined;
                break;
            }
            let wireType = tag & 7;
            switch (tag >>>= 3) {
            case 1: {
                    if (wireType !== 2)
                        break;
                    message.deviceFriendlyName = reader.string();
                    continue;
                }
            case 2: {
                    if (wireType !== 0)
                        break;
                    value = reader.int32();
                    if ($root.EAuthTokenPlatformType[value] !== $undefined)
                        message.platformType = value;
                    else if (!reader.discardUnknown) {
                        $util.makeProp(message, "$unknowns", false);
                        (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                    }
                    continue;
                }
            case 3: {
                    if (wireType !== 0)
                        break;
                    message.osType = reader.int32();
                    continue;
                }
            case 4: {
                    if (wireType !== 0)
                        break;
                    message.gamingDeviceType = reader.uint32();
                    continue;
                }
            case 5: {
                    if (wireType !== 0)
                        break;
                    message.clientCount = reader.uint32();
                    continue;
                }
            case 6: {
                    if (wireType !== 2)
                        break;
                    message.machineId = reader.bytes();
                    continue;
                }
            }
            reader.skipType(wireType, _depth, tag);
            if (!reader.discardUnknown) {
                $util.makeProp(message, "$unknowns", false);
                (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
            }
        }
        if (_end !== $undefined)
            throw $Error("missing end group");
        return message;
    };

    /**
     * Decodes a CAuthentication_DeviceDetails message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof CAuthentication_DeviceDetails
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {CAuthentication_DeviceDetails & CAuthentication_DeviceDetails.$Shape} CAuthentication_DeviceDetails
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CAuthentication_DeviceDetails.decodeDelimited = function(reader) {
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
    CAuthentication_DeviceDetails.verify = function (message, _depth) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            return "max depth exceeded";
        if (message.deviceFriendlyName != null && $Object.hasOwnProperty.call(message, "deviceFriendlyName"))
            if (!$util.isString(message.deviceFriendlyName))
                return "deviceFriendlyName: string expected";
        if (message.platformType != null && $Object.hasOwnProperty.call(message, "platformType"))
            switch (message.platformType) {
            default:
                return "platformType: enum value expected";
            case 0:
            case 1:
            case 2:
            case 3:
                break;
            }
        if (message.osType != null && $Object.hasOwnProperty.call(message, "osType"))
            if (!$util.isInteger(message.osType))
                return "osType: integer expected";
        if (message.gamingDeviceType != null && $Object.hasOwnProperty.call(message, "gamingDeviceType"))
            if (!$util.isInteger(message.gamingDeviceType))
                return "gamingDeviceType: integer expected";
        if (message.clientCount != null && $Object.hasOwnProperty.call(message, "clientCount"))
            if (!$util.isInteger(message.clientCount))
                return "clientCount: integer expected";
        if (message.machineId != null && $Object.hasOwnProperty.call(message, "machineId"))
            if (!(message.machineId && typeof message.machineId.length === "number" || $util.isString(message.machineId)))
                return "machineId: buffer expected";
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
    CAuthentication_DeviceDetails.fromObject = function (object, _depth) {
        if (object instanceof $root.CAuthentication_DeviceDetails)
            return object;
        if (!$util.isObject(object))
            throw $TypeError(".CAuthentication_DeviceDetails: object expected");
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw $Error("max depth exceeded");
        let message = new $root.CAuthentication_DeviceDetails();
        if (object.deviceFriendlyName != null)
            message.deviceFriendlyName = $String(object.deviceFriendlyName);
        switch (object.platformType) {
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
        default:
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
    CAuthentication_DeviceDetails.toObject = function (message, options, _depth) {
        if (!options)
            options = {};
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw $Error("max depth exceeded");
        let object = {};
        if (options.defaults) {
            object.deviceFriendlyName = "";
            object.platformType = options.enums === $String ? "k_EAuthTokenPlatformType_Unknown" : 0;
            object.osType = 0;
            object.gamingDeviceType = 0;
            object.clientCount = 0;
            if (options.bytes === $String)
                object.machineId = "";
            else {
                object.machineId = [];
                if (options.bytes !== $Array)
                    object.machineId = $util.newBuffer(object.machineId);
            }
        }
        if (message.deviceFriendlyName != null && $Object.hasOwnProperty.call(message, "deviceFriendlyName"))
            object.deviceFriendlyName = message.deviceFriendlyName;
        if (message.platformType != null && $Object.hasOwnProperty.call(message, "platformType"))
            object.platformType = options.enums === $String ? $root.EAuthTokenPlatformType[message.platformType] === $undefined ? message.platformType : $root.EAuthTokenPlatformType[message.platformType] : message.platformType;
        if (message.osType != null && $Object.hasOwnProperty.call(message, "osType"))
            object.osType = message.osType;
        if (message.gamingDeviceType != null && $Object.hasOwnProperty.call(message, "gamingDeviceType"))
            object.gamingDeviceType = message.gamingDeviceType;
        if (message.clientCount != null && $Object.hasOwnProperty.call(message, "clientCount"))
            object.clientCount = message.clientCount;
        if (message.machineId != null && $Object.hasOwnProperty.call(message, "machineId"))
            object.machineId = options.bytes === $String ? $util.base64.encode(message.machineId, 0, message.machineId.length) : options.bytes === $Array ? $Array.prototype.slice.call(message.machineId) : message.machineId;
        return object;
    };

    /**
     * Converts this CAuthentication_DeviceDetails to JSON.
     * @function toJSON
     * @memberof CAuthentication_DeviceDetails
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    CAuthentication_DeviceDetails.prototype.toJSON = function() {
        return CAuthentication_DeviceDetails.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the type url for CAuthentication_DeviceDetails
     * @function getTypeUrl
     * @memberof CAuthentication_DeviceDetails
     * @static
     * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
     * @returns {string} The type url
     */
    CAuthentication_DeviceDetails.getTypeUrl = function(prefix) {
        if (prefix === $undefined)
            prefix = "type.googleapis.com";
        return prefix + "/CAuthentication_DeviceDetails";
    };

    return CAuthentication_DeviceDetails;
})();

export const CAuthentication_AllowedConfirmation = $root.CAuthentication_AllowedConfirmation = (() => {

    /**
     * Properties of a CAuthentication_AllowedConfirmation.
     * @typedef {Object} CAuthentication_AllowedConfirmation.$Properties
     * @property {EAuthSessionGuardType|null} [confirmationType] CAuthentication_AllowedConfirmation confirmationType
     * @property {string|null} [associatedMessage] CAuthentication_AllowedConfirmation associatedMessage
     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
     */

    /**
     * Properties of a CAuthentication_AllowedConfirmation.
     * @exports ICAuthentication_AllowedConfirmation
     * @interface ICAuthentication_AllowedConfirmation
     * @augments CAuthentication_AllowedConfirmation.$Properties
     * @deprecated Use CAuthentication_AllowedConfirmation.$Properties instead.
     */

    /**
     * Shape of a CAuthentication_AllowedConfirmation.
     * @typedef {CAuthentication_AllowedConfirmation.$Properties} CAuthentication_AllowedConfirmation.$Shape
     */

    /**
     * Constructs a new CAuthentication_AllowedConfirmation.
     * @exports CAuthentication_AllowedConfirmation
     * @classdesc Represents a CAuthentication_AllowedConfirmation.
     * @constructor
     * @param {CAuthentication_AllowedConfirmation.$Properties=} [properties] Properties to set
     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
     */
    const CAuthentication_AllowedConfirmation = function (properties) {
        if (properties)
            for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null && keys[i] !== "__proto__")
                    this[keys[i]] = properties[keys[i]];
    };

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
     * @param {CAuthentication_AllowedConfirmation.$Properties=} [properties] Properties to set
     * @returns {CAuthentication_AllowedConfirmation} CAuthentication_AllowedConfirmation instance
     * @type {{
     *   (properties: CAuthentication_AllowedConfirmation.$Shape): CAuthentication_AllowedConfirmation & CAuthentication_AllowedConfirmation.$Shape;
     *   (properties?: CAuthentication_AllowedConfirmation.$Properties): CAuthentication_AllowedConfirmation;
     * }}
     */
    CAuthentication_AllowedConfirmation.create = function(properties) {
        return new CAuthentication_AllowedConfirmation(properties);
    };

    /**
     * Encodes the specified CAuthentication_AllowedConfirmation message. Does not implicitly {@link CAuthentication_AllowedConfirmation.verify|verify} messages.
     * @function encode
     * @memberof CAuthentication_AllowedConfirmation
     * @static
     * @param {CAuthentication_AllowedConfirmation.$Properties} message CAuthentication_AllowedConfirmation message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CAuthentication_AllowedConfirmation.encode = function (message, writer, _depth) {
        if (!writer)
            writer = $Writer.create();
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw $Error("max depth exceeded");
        if (message.confirmationType != null && $Object.hasOwnProperty.call(message, "confirmationType"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.confirmationType);
        if (message.associatedMessage != null && $Object.hasOwnProperty.call(message, "associatedMessage"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.associatedMessage);
        if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
            for (let i = 0; i < message.$unknowns.length; ++i)
                writer.raw(message.$unknowns[i]);
        return writer;
    };

    /**
     * Encodes the specified CAuthentication_AllowedConfirmation message, length delimited. Does not implicitly {@link CAuthentication_AllowedConfirmation.verify|verify} messages.
     * @function encodeDelimited
     * @memberof CAuthentication_AllowedConfirmation
     * @static
     * @param {CAuthentication_AllowedConfirmation.$Properties} message CAuthentication_AllowedConfirmation message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CAuthentication_AllowedConfirmation.encodeDelimited = function(message, writer) {
        return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
    };

    /**
     * Decodes a CAuthentication_AllowedConfirmation message from the specified reader or buffer.
     * @function decode
     * @memberof CAuthentication_AllowedConfirmation
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {CAuthentication_AllowedConfirmation & CAuthentication_AllowedConfirmation.$Shape} CAuthentication_AllowedConfirmation
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CAuthentication_AllowedConfirmation.decode = function (reader, length, _end, _depth, _target) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $Reader.recursionLimit)
            throw $Error("max depth exceeded");
        let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.CAuthentication_AllowedConfirmation(), value;
        while (reader.pos < end) {
            let start = reader.pos;
            let tag = reader.tag();
            if (tag === _end) {
                _end = $undefined;
                break;
            }
            let wireType = tag & 7;
            switch (tag >>>= 3) {
            case 1: {
                    if (wireType !== 0)
                        break;
                    value = reader.int32();
                    if ($root.EAuthSessionGuardType[value] !== $undefined)
                        message.confirmationType = value;
                    else if (!reader.discardUnknown) {
                        $util.makeProp(message, "$unknowns", false);
                        (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                    }
                    continue;
                }
            case 2: {
                    if (wireType !== 2)
                        break;
                    message.associatedMessage = reader.string();
                    continue;
                }
            }
            reader.skipType(wireType, _depth, tag);
            if (!reader.discardUnknown) {
                $util.makeProp(message, "$unknowns", false);
                (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
            }
        }
        if (_end !== $undefined)
            throw $Error("missing end group");
        return message;
    };

    /**
     * Decodes a CAuthentication_AllowedConfirmation message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof CAuthentication_AllowedConfirmation
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {CAuthentication_AllowedConfirmation & CAuthentication_AllowedConfirmation.$Shape} CAuthentication_AllowedConfirmation
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CAuthentication_AllowedConfirmation.decodeDelimited = function(reader) {
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
    CAuthentication_AllowedConfirmation.verify = function (message, _depth) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            return "max depth exceeded";
        if (message.confirmationType != null && $Object.hasOwnProperty.call(message, "confirmationType"))
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
        if (message.associatedMessage != null && $Object.hasOwnProperty.call(message, "associatedMessage"))
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
    CAuthentication_AllowedConfirmation.fromObject = function (object, _depth) {
        if (object instanceof $root.CAuthentication_AllowedConfirmation)
            return object;
        if (!$util.isObject(object))
            throw $TypeError(".CAuthentication_AllowedConfirmation: object expected");
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw $Error("max depth exceeded");
        let message = new $root.CAuthentication_AllowedConfirmation();
        switch (object.confirmationType) {
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
        default:
        }
        if (object.associatedMessage != null)
            message.associatedMessage = $String(object.associatedMessage);
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
    CAuthentication_AllowedConfirmation.toObject = function (message, options, _depth) {
        if (!options)
            options = {};
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw $Error("max depth exceeded");
        let object = {};
        if (options.defaults) {
            object.confirmationType = options.enums === $String ? "k_EAuthSessionGuardType_Unknown" : 0;
            object.associatedMessage = "";
        }
        if (message.confirmationType != null && $Object.hasOwnProperty.call(message, "confirmationType"))
            object.confirmationType = options.enums === $String ? $root.EAuthSessionGuardType[message.confirmationType] === $undefined ? message.confirmationType : $root.EAuthSessionGuardType[message.confirmationType] : message.confirmationType;
        if (message.associatedMessage != null && $Object.hasOwnProperty.call(message, "associatedMessage"))
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
    CAuthentication_AllowedConfirmation.prototype.toJSON = function() {
        return CAuthentication_AllowedConfirmation.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the type url for CAuthentication_AllowedConfirmation
     * @function getTypeUrl
     * @memberof CAuthentication_AllowedConfirmation
     * @static
     * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
     * @returns {string} The type url
     */
    CAuthentication_AllowedConfirmation.getTypeUrl = function(prefix) {
        if (prefix === $undefined)
            prefix = "type.googleapis.com";
        return prefix + "/CAuthentication_AllowedConfirmation";
    };

    return CAuthentication_AllowedConfirmation;
})();

export const CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData = $root.CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData = (() => {

    /**
     * Properties of a CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData.
     * @typedef {Object} CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData.$Properties
     * @property {string|null} [deviceFriendlyName] CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData deviceFriendlyName
     * @property {string|null} [accountName] CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData accountName
     * @property {string|null} [encryptedPassword] CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData encryptedPassword
     * @property {number|Long|null} [encryptionTimestamp] CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData encryptionTimestamp
     * @property {boolean|null} [rememberLogin] CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData rememberLogin
     * @property {EAuthTokenPlatformType|null} [platformType] CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData platformType
     * @property {ESessionPersistence|null} [persistence] CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData persistence
     * @property {string|null} [websiteId] CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData websiteId
     * @property {CAuthentication_DeviceDetails.$Properties|null} [deviceDetails] CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData deviceDetails
     * @property {Uint8Array|null} [guardData] CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData guardData
     * @property {number|null} [language] CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData language
     * @property {number|null} [qosLevel] CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData qosLevel
     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
     */

    /**
     * Properties of a CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData.
     * @exports ICAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData
     * @interface ICAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData
     * @augments CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData.$Properties
     * @deprecated Use CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData.$Properties instead.
     */

    /**
     * Shape of a CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData.
     * @typedef {CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData.$Properties} CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData.$Shape
     */

    /**
     * Constructs a new CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData.
     * @exports CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData
     * @classdesc Represents a CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData.
     * @constructor
     * @param {CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData.$Properties=} [properties] Properties to set
     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
     */
    const CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData = function (properties) {
        if (properties)
            for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null && keys[i] !== "__proto__")
                    this[keys[i]] = properties[keys[i]];
    };

    /**
     * CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData deviceFriendlyName.
     * @member {string} deviceFriendlyName
     * @memberof CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData
     * @instance
     */
    CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData.prototype.deviceFriendlyName = "";

    /**
     * CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData accountName.
     * @member {string} accountName
     * @memberof CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData
     * @instance
     */
    CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData.prototype.accountName = "";

    /**
     * CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData encryptedPassword.
     * @member {string} encryptedPassword
     * @memberof CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData
     * @instance
     */
    CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData.prototype.encryptedPassword = "";

    /**
     * CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData encryptionTimestamp.
     * @member {number|Long} encryptionTimestamp
     * @memberof CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData
     * @instance
     */
    CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData.prototype.encryptionTimestamp = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

    /**
     * CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData rememberLogin.
     * @member {boolean} rememberLogin
     * @memberof CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData
     * @instance
     */
    CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData.prototype.rememberLogin = false;

    /**
     * CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData platformType.
     * @member {EAuthTokenPlatformType} platformType
     * @memberof CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData
     * @instance
     */
    CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData.prototype.platformType = 0;

    /**
     * CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData persistence.
     * @member {ESessionPersistence} persistence
     * @memberof CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData
     * @instance
     */
    CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData.prototype.persistence = 1;

    /**
     * CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData websiteId.
     * @member {string} websiteId
     * @memberof CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData
     * @instance
     */
    CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData.prototype.websiteId = "Unknown";

    /**
     * CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData deviceDetails.
     * @member {CAuthentication_DeviceDetails.$Properties|null|undefined} deviceDetails
     * @memberof CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData
     * @instance
     */
    CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData.prototype.deviceDetails = null;

    /**
     * CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData guardData.
     * @member {Uint8Array} guardData
     * @memberof CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData
     * @instance
     */
    CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData.prototype.guardData = $util.newBuffer([]);

    /**
     * CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData language.
     * @member {number} language
     * @memberof CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData
     * @instance
     */
    CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData.prototype.language = 0;

    /**
     * CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData qosLevel.
     * @member {number} qosLevel
     * @memberof CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData
     * @instance
     */
    CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData.prototype.qosLevel = 2;

    /**
     * Creates a new CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData instance using the specified properties.
     * @function create
     * @memberof CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData
     * @static
     * @param {CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData.$Properties=} [properties] Properties to set
     * @returns {CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData} CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData instance
     * @type {{
     *   (properties: CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData.$Shape): CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData & CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData.$Shape;
     *   (properties?: CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData.$Properties): CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData;
     * }}
     */
    CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData.create = function(properties) {
        return new CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData(properties);
    };

    /**
     * Encodes the specified CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData message. Does not implicitly {@link CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData.verify|verify} messages.
     * @function encode
     * @memberof CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData
     * @static
     * @param {CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData.$Properties} message CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData.encode = function (message, writer, _depth) {
        if (!writer)
            writer = $Writer.create();
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw $Error("max depth exceeded");
        if (message.deviceFriendlyName != null && $Object.hasOwnProperty.call(message, "deviceFriendlyName"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.deviceFriendlyName);
        if (message.accountName != null && $Object.hasOwnProperty.call(message, "accountName"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.accountName);
        if (message.encryptedPassword != null && $Object.hasOwnProperty.call(message, "encryptedPassword"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.encryptedPassword);
        if (message.encryptionTimestamp != null && $Object.hasOwnProperty.call(message, "encryptionTimestamp"))
            writer.uint32(/* id 4, wireType 0 =*/32).uint64(message.encryptionTimestamp);
        if (message.rememberLogin != null && $Object.hasOwnProperty.call(message, "rememberLogin"))
            writer.uint32(/* id 5, wireType 0 =*/40).bool(message.rememberLogin);
        if (message.platformType != null && $Object.hasOwnProperty.call(message, "platformType"))
            writer.uint32(/* id 6, wireType 0 =*/48).int32(message.platformType);
        if (message.persistence != null && $Object.hasOwnProperty.call(message, "persistence"))
            writer.uint32(/* id 7, wireType 0 =*/56).int32(message.persistence);
        if (message.websiteId != null && $Object.hasOwnProperty.call(message, "websiteId"))
            writer.uint32(/* id 8, wireType 2 =*/66).string(message.websiteId);
        if (message.deviceDetails != null && $Object.hasOwnProperty.call(message, "deviceDetails"))
            $root.CAuthentication_DeviceDetails.encode(message.deviceDetails, writer.uint32(/* id 9, wireType 2 =*/74).fork(), _depth + 1).ldelim();
        if (message.guardData != null && $Object.hasOwnProperty.call(message, "guardData"))
            writer.uint32(/* id 10, wireType 2 =*/82).bytes(message.guardData);
        if (message.language != null && $Object.hasOwnProperty.call(message, "language"))
            writer.uint32(/* id 11, wireType 0 =*/88).uint32(message.language);
        if (message.qosLevel != null && $Object.hasOwnProperty.call(message, "qosLevel"))
            writer.uint32(/* id 12, wireType 0 =*/96).int32(message.qosLevel);
        if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
            for (let i = 0; i < message.$unknowns.length; ++i)
                writer.raw(message.$unknowns[i]);
        return writer;
    };

    /**
     * Encodes the specified CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData message, length delimited. Does not implicitly {@link CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData.verify|verify} messages.
     * @function encodeDelimited
     * @memberof CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData
     * @static
     * @param {CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData.$Properties} message CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData.encodeDelimited = function(message, writer) {
        return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
    };

    /**
     * Decodes a CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData message from the specified reader or buffer.
     * @function decode
     * @memberof CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData & CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData.$Shape} CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData.decode = function (reader, length, _end, _depth, _target) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $Reader.recursionLimit)
            throw $Error("max depth exceeded");
        let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData(), value;
        while (reader.pos < end) {
            let start = reader.pos;
            let tag = reader.tag();
            if (tag === _end) {
                _end = $undefined;
                break;
            }
            let wireType = tag & 7;
            switch (tag >>>= 3) {
            case 1: {
                    if (wireType !== 2)
                        break;
                    message.deviceFriendlyName = reader.string();
                    continue;
                }
            case 2: {
                    if (wireType !== 2)
                        break;
                    message.accountName = reader.string();
                    continue;
                }
            case 3: {
                    if (wireType !== 2)
                        break;
                    message.encryptedPassword = reader.string();
                    continue;
                }
            case 4: {
                    if (wireType !== 0)
                        break;
                    message.encryptionTimestamp = reader.uint64();
                    continue;
                }
            case 5: {
                    if (wireType !== 0)
                        break;
                    message.rememberLogin = reader.bool();
                    continue;
                }
            case 6: {
                    if (wireType !== 0)
                        break;
                    value = reader.int32();
                    if ($root.EAuthTokenPlatformType[value] !== $undefined)
                        message.platformType = value;
                    else if (!reader.discardUnknown) {
                        $util.makeProp(message, "$unknowns", false);
                        (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                    }
                    continue;
                }
            case 7: {
                    if (wireType !== 0)
                        break;
                    value = reader.int32();
                    if ($root.ESessionPersistence[value] !== $undefined)
                        message.persistence = value;
                    else if (!reader.discardUnknown) {
                        $util.makeProp(message, "$unknowns", false);
                        (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                    }
                    continue;
                }
            case 8: {
                    if (wireType !== 2)
                        break;
                    message.websiteId = reader.string();
                    continue;
                }
            case 9: {
                    if (wireType !== 2)
                        break;
                    message.deviceDetails = $root.CAuthentication_DeviceDetails.decode(reader, reader.uint32(), $undefined, _depth + 1, message.deviceDetails);
                    continue;
                }
            case 10: {
                    if (wireType !== 2)
                        break;
                    message.guardData = reader.bytes();
                    continue;
                }
            case 11: {
                    if (wireType !== 0)
                        break;
                    message.language = reader.uint32();
                    continue;
                }
            case 12: {
                    if (wireType !== 0)
                        break;
                    message.qosLevel = reader.int32();
                    continue;
                }
            }
            reader.skipType(wireType, _depth, tag);
            if (!reader.discardUnknown) {
                $util.makeProp(message, "$unknowns", false);
                (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
            }
        }
        if (_end !== $undefined)
            throw $Error("missing end group");
        return message;
    };

    /**
     * Decodes a CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData & CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData.$Shape} CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData.decodeDelimited = function(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData message.
     * @function verify
     * @memberof CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData.verify = function (message, _depth) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            return "max depth exceeded";
        if (message.deviceFriendlyName != null && $Object.hasOwnProperty.call(message, "deviceFriendlyName"))
            if (!$util.isString(message.deviceFriendlyName))
                return "deviceFriendlyName: string expected";
        if (message.accountName != null && $Object.hasOwnProperty.call(message, "accountName"))
            if (!$util.isString(message.accountName))
                return "accountName: string expected";
        if (message.encryptedPassword != null && $Object.hasOwnProperty.call(message, "encryptedPassword"))
            if (!$util.isString(message.encryptedPassword))
                return "encryptedPassword: string expected";
        if (message.encryptionTimestamp != null && $Object.hasOwnProperty.call(message, "encryptionTimestamp"))
            if (!$util.isInteger(message.encryptionTimestamp) && !(message.encryptionTimestamp && $util.isInteger(message.encryptionTimestamp.low) && $util.isInteger(message.encryptionTimestamp.high)))
                return "encryptionTimestamp: integer|Long expected";
        if (message.rememberLogin != null && $Object.hasOwnProperty.call(message, "rememberLogin"))
            if (typeof message.rememberLogin !== "boolean")
                return "rememberLogin: boolean expected";
        if (message.platformType != null && $Object.hasOwnProperty.call(message, "platformType"))
            switch (message.platformType) {
            default:
                return "platformType: enum value expected";
            case 0:
            case 1:
            case 2:
            case 3:
                break;
            }
        if (message.persistence != null && $Object.hasOwnProperty.call(message, "persistence"))
            switch (message.persistence) {
            default:
                return "persistence: enum value expected";
            case -1:
            case 0:
            case 1:
                break;
            }
        if (message.websiteId != null && $Object.hasOwnProperty.call(message, "websiteId"))
            if (!$util.isString(message.websiteId))
                return "websiteId: string expected";
        if (message.deviceDetails != null && $Object.hasOwnProperty.call(message, "deviceDetails")) {
            let error = $root.CAuthentication_DeviceDetails.verify(message.deviceDetails, _depth + 1);
            if (error)
                return "deviceDetails." + error;
        }
        if (message.guardData != null && $Object.hasOwnProperty.call(message, "guardData"))
            if (!(message.guardData && typeof message.guardData.length === "number" || $util.isString(message.guardData)))
                return "guardData: buffer expected";
        if (message.language != null && $Object.hasOwnProperty.call(message, "language"))
            if (!$util.isInteger(message.language))
                return "language: integer expected";
        if (message.qosLevel != null && $Object.hasOwnProperty.call(message, "qosLevel"))
            if (!$util.isInteger(message.qosLevel))
                return "qosLevel: integer expected";
        return null;
    };

    /**
     * Creates a CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData} CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData
     */
    CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData.fromObject = function (object, _depth) {
        if (object instanceof $root.CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData)
            return object;
        if (!$util.isObject(object))
            throw $TypeError(".CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData: object expected");
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw $Error("max depth exceeded");
        let message = new $root.CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData();
        if (object.deviceFriendlyName != null)
            message.deviceFriendlyName = $String(object.deviceFriendlyName);
        if (object.accountName != null)
            message.accountName = $String(object.accountName);
        if (object.encryptedPassword != null)
            message.encryptedPassword = $String(object.encryptedPassword);
        if (object.encryptionTimestamp != null)
            if ($util.Long)
                message.encryptionTimestamp = $util.Long.fromValue(object.encryptionTimestamp, true);
            else if (typeof object.encryptionTimestamp === "string")
                message.encryptionTimestamp = $parseInt(object.encryptionTimestamp, 10);
            else if (typeof object.encryptionTimestamp === "number")
                message.encryptionTimestamp = object.encryptionTimestamp;
            else if (typeof object.encryptionTimestamp === "object")
                message.encryptionTimestamp = new $util.LongBits(object.encryptionTimestamp.low >>> 0, object.encryptionTimestamp.high >>> 0).toNumber(true);
        if (object.rememberLogin != null)
            message.rememberLogin = $Boolean(object.rememberLogin);
        switch (object.platformType) {
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
        default:
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
        case "k_ESessionPersistence_Persistent":
        case 1:
            message.persistence = 1;
            break;
        default:
        }
        if (object.websiteId != null)
            message.websiteId = $String(object.websiteId);
        if (object.deviceDetails != null) {
            if (!$util.isObject(object.deviceDetails))
                throw $TypeError(".CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData.deviceDetails: object expected");
            message.deviceDetails = $root.CAuthentication_DeviceDetails.fromObject(object.deviceDetails, _depth + 1);
        }
        if (object.guardData != null)
            if (typeof object.guardData === "string")
                $util.base64.decode(object.guardData, message.guardData = $util.newBuffer($util.base64.length(object.guardData)), 0);
            else if (object.guardData.length >= 0)
                message.guardData = object.guardData;
        if (object.language != null)
            message.language = object.language >>> 0;
        if (object.qosLevel != null)
            message.qosLevel = object.qosLevel | 0;
        return message;
    };

    /**
     * Creates a plain object from a CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData message. Also converts values to other types if specified.
     * @function toObject
     * @memberof CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData
     * @static
     * @param {CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData} message CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData.toObject = function (message, options, _depth) {
        if (!options)
            options = {};
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw $Error("max depth exceeded");
        let object = {};
        if (options.defaults) {
            object.deviceFriendlyName = "";
            object.accountName = "";
            object.encryptedPassword = "";
            if ($util.Long) {
                let long = new $util.Long(0, 0, true);
                object.encryptionTimestamp = options.longs === $String ? long.toString() : options.longs === $Number ? long.toNumber() : typeof $BigInt !== "undefined" && options.longs === $BigInt ? long.toBigInt() : long;
            } else
                object.encryptionTimestamp = options.longs === $String ? "0" : typeof $BigInt !== "undefined" && options.longs === $BigInt ? $BigInt("0") : 0;
            object.rememberLogin = false;
            object.platformType = options.enums === $String ? "k_EAuthTokenPlatformType_Unknown" : 0;
            object.persistence = options.enums === $String ? "k_ESessionPersistence_Persistent" : 1;
            object.websiteId = "Unknown";
            object.deviceDetails = null;
            if (options.bytes === $String)
                object.guardData = "";
            else {
                object.guardData = [];
                if (options.bytes !== $Array)
                    object.guardData = $util.newBuffer(object.guardData);
            }
            object.language = 0;
            object.qosLevel = 2;
        }
        if (message.deviceFriendlyName != null && $Object.hasOwnProperty.call(message, "deviceFriendlyName"))
            object.deviceFriendlyName = message.deviceFriendlyName;
        if (message.accountName != null && $Object.hasOwnProperty.call(message, "accountName"))
            object.accountName = message.accountName;
        if (message.encryptedPassword != null && $Object.hasOwnProperty.call(message, "encryptedPassword"))
            object.encryptedPassword = message.encryptedPassword;
        if (message.encryptionTimestamp != null && $Object.hasOwnProperty.call(message, "encryptionTimestamp"))
            if (typeof $BigInt !== "undefined" && options.longs === $BigInt)
                object.encryptionTimestamp = typeof message.encryptionTimestamp === "number" ? $BigInt(message.encryptionTimestamp) : $util.Long.fromBits(message.encryptionTimestamp.low >>> 0, message.encryptionTimestamp.high >>> 0, true).toBigInt();
            else if (typeof message.encryptionTimestamp === "number")
                object.encryptionTimestamp = options.longs === $String ? $String(message.encryptionTimestamp) : message.encryptionTimestamp;
            else
                object.encryptionTimestamp = options.longs === $String ? $util.Long.prototype.toString.call(message.encryptionTimestamp) : options.longs === $Number ? new $util.LongBits(message.encryptionTimestamp.low >>> 0, message.encryptionTimestamp.high >>> 0).toNumber(true) : message.encryptionTimestamp;
        if (message.rememberLogin != null && $Object.hasOwnProperty.call(message, "rememberLogin"))
            object.rememberLogin = message.rememberLogin;
        if (message.platformType != null && $Object.hasOwnProperty.call(message, "platformType"))
            object.platformType = options.enums === $String ? $root.EAuthTokenPlatformType[message.platformType] === $undefined ? message.platformType : $root.EAuthTokenPlatformType[message.platformType] : message.platformType;
        if (message.persistence != null && $Object.hasOwnProperty.call(message, "persistence"))
            object.persistence = options.enums === $String ? $root.ESessionPersistence[message.persistence] === $undefined ? message.persistence : $root.ESessionPersistence[message.persistence] : message.persistence;
        if (message.websiteId != null && $Object.hasOwnProperty.call(message, "websiteId"))
            object.websiteId = message.websiteId;
        if (message.deviceDetails != null && $Object.hasOwnProperty.call(message, "deviceDetails"))
            object.deviceDetails = $root.CAuthentication_DeviceDetails.toObject(message.deviceDetails, options, _depth + 1);
        if (message.guardData != null && $Object.hasOwnProperty.call(message, "guardData"))
            object.guardData = options.bytes === $String ? $util.base64.encode(message.guardData, 0, message.guardData.length) : options.bytes === $Array ? $Array.prototype.slice.call(message.guardData) : message.guardData;
        if (message.language != null && $Object.hasOwnProperty.call(message, "language"))
            object.language = message.language;
        if (message.qosLevel != null && $Object.hasOwnProperty.call(message, "qosLevel"))
            object.qosLevel = message.qosLevel;
        return object;
    };

    /**
     * Converts this CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData to JSON.
     * @function toJSON
     * @memberof CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData.prototype.toJSON = function() {
        return CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the type url for CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData
     * @function getTypeUrl
     * @memberof CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData
     * @static
     * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
     * @returns {string} The type url
     */
    CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData.getTypeUrl = function(prefix) {
        if (prefix === $undefined)
            prefix = "type.googleapis.com";
        return prefix + "/CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData";
    };

    return CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData;
})();

export const CAuthentication_BeginAuthSessionViaCredentials_Response = $root.CAuthentication_BeginAuthSessionViaCredentials_Response = (() => {

    /**
     * Properties of a CAuthentication_BeginAuthSessionViaCredentials_Response.
     * @typedef {Object} CAuthentication_BeginAuthSessionViaCredentials_Response.$Properties
     * @property {number|Long|null} [clientId] CAuthentication_BeginAuthSessionViaCredentials_Response clientId
     * @property {Uint8Array|null} [requestId] CAuthentication_BeginAuthSessionViaCredentials_Response requestId
     * @property {number|null} [interval] CAuthentication_BeginAuthSessionViaCredentials_Response interval
     * @property {Array.<CAuthentication_AllowedConfirmation.$Properties>|null} [allowedConfirmations] CAuthentication_BeginAuthSessionViaCredentials_Response allowedConfirmations
     * @property {number|Long|null} [steamid] CAuthentication_BeginAuthSessionViaCredentials_Response steamid
     * @property {string|null} [weakToken] CAuthentication_BeginAuthSessionViaCredentials_Response weakToken
     * @property {string|null} [agreementSessionUrl] CAuthentication_BeginAuthSessionViaCredentials_Response agreementSessionUrl
     * @property {string|null} [extendedErrorMessage] CAuthentication_BeginAuthSessionViaCredentials_Response extendedErrorMessage
     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
     */

    /**
     * Properties of a CAuthentication_BeginAuthSessionViaCredentials_Response.
     * @exports ICAuthentication_BeginAuthSessionViaCredentials_Response
     * @interface ICAuthentication_BeginAuthSessionViaCredentials_Response
     * @augments CAuthentication_BeginAuthSessionViaCredentials_Response.$Properties
     * @deprecated Use CAuthentication_BeginAuthSessionViaCredentials_Response.$Properties instead.
     */

    /**
     * Shape of a CAuthentication_BeginAuthSessionViaCredentials_Response.
     * @typedef {CAuthentication_BeginAuthSessionViaCredentials_Response.$Properties} CAuthentication_BeginAuthSessionViaCredentials_Response.$Shape
     */

    /**
     * Constructs a new CAuthentication_BeginAuthSessionViaCredentials_Response.
     * @exports CAuthentication_BeginAuthSessionViaCredentials_Response
     * @classdesc Represents a CAuthentication_BeginAuthSessionViaCredentials_Response.
     * @constructor
     * @param {CAuthentication_BeginAuthSessionViaCredentials_Response.$Properties=} [properties] Properties to set
     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
     */
    const CAuthentication_BeginAuthSessionViaCredentials_Response = function (properties) {
        this.allowedConfirmations = [];
        if (properties)
            for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null && keys[i] !== "__proto__")
                    this[keys[i]] = properties[keys[i]];
    };

    /**
     * CAuthentication_BeginAuthSessionViaCredentials_Response clientId.
     * @member {number|Long} clientId
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
     * @member {Array.<CAuthentication_AllowedConfirmation.$Properties>} allowedConfirmations
     * @memberof CAuthentication_BeginAuthSessionViaCredentials_Response
     * @instance
     */
    CAuthentication_BeginAuthSessionViaCredentials_Response.prototype.allowedConfirmations = $util.emptyArray;

    /**
     * CAuthentication_BeginAuthSessionViaCredentials_Response steamid.
     * @member {number|Long} steamid
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
     * @param {CAuthentication_BeginAuthSessionViaCredentials_Response.$Properties=} [properties] Properties to set
     * @returns {CAuthentication_BeginAuthSessionViaCredentials_Response} CAuthentication_BeginAuthSessionViaCredentials_Response instance
     * @type {{
     *   (properties: CAuthentication_BeginAuthSessionViaCredentials_Response.$Shape): CAuthentication_BeginAuthSessionViaCredentials_Response & CAuthentication_BeginAuthSessionViaCredentials_Response.$Shape;
     *   (properties?: CAuthentication_BeginAuthSessionViaCredentials_Response.$Properties): CAuthentication_BeginAuthSessionViaCredentials_Response;
     * }}
     */
    CAuthentication_BeginAuthSessionViaCredentials_Response.create = function(properties) {
        return new CAuthentication_BeginAuthSessionViaCredentials_Response(properties);
    };

    /**
     * Encodes the specified CAuthentication_BeginAuthSessionViaCredentials_Response message. Does not implicitly {@link CAuthentication_BeginAuthSessionViaCredentials_Response.verify|verify} messages.
     * @function encode
     * @memberof CAuthentication_BeginAuthSessionViaCredentials_Response
     * @static
     * @param {CAuthentication_BeginAuthSessionViaCredentials_Response.$Properties} message CAuthentication_BeginAuthSessionViaCredentials_Response message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CAuthentication_BeginAuthSessionViaCredentials_Response.encode = function (message, writer, _depth) {
        if (!writer)
            writer = $Writer.create();
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw $Error("max depth exceeded");
        if (message.clientId != null && $Object.hasOwnProperty.call(message, "clientId"))
            writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.clientId);
        if (message.requestId != null && $Object.hasOwnProperty.call(message, "requestId"))
            writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.requestId);
        if (message.interval != null && $Object.hasOwnProperty.call(message, "interval"))
            writer.uint32(/* id 3, wireType 5 =*/29).float(message.interval);
        if (message.allowedConfirmations != null && message.allowedConfirmations.length)
            for (let i = 0; i < message.allowedConfirmations.length; ++i)
                $root.CAuthentication_AllowedConfirmation.encode(message.allowedConfirmations[i], writer.uint32(/* id 4, wireType 2 =*/34).fork(), _depth + 1).ldelim();
        if (message.steamid != null && $Object.hasOwnProperty.call(message, "steamid"))
            writer.uint32(/* id 5, wireType 0 =*/40).uint64(message.steamid);
        if (message.weakToken != null && $Object.hasOwnProperty.call(message, "weakToken"))
            writer.uint32(/* id 6, wireType 2 =*/50).string(message.weakToken);
        if (message.agreementSessionUrl != null && $Object.hasOwnProperty.call(message, "agreementSessionUrl"))
            writer.uint32(/* id 7, wireType 2 =*/58).string(message.agreementSessionUrl);
        if (message.extendedErrorMessage != null && $Object.hasOwnProperty.call(message, "extendedErrorMessage"))
            writer.uint32(/* id 8, wireType 2 =*/66).string(message.extendedErrorMessage);
        if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
            for (let i = 0; i < message.$unknowns.length; ++i)
                writer.raw(message.$unknowns[i]);
        return writer;
    };

    /**
     * Encodes the specified CAuthentication_BeginAuthSessionViaCredentials_Response message, length delimited. Does not implicitly {@link CAuthentication_BeginAuthSessionViaCredentials_Response.verify|verify} messages.
     * @function encodeDelimited
     * @memberof CAuthentication_BeginAuthSessionViaCredentials_Response
     * @static
     * @param {CAuthentication_BeginAuthSessionViaCredentials_Response.$Properties} message CAuthentication_BeginAuthSessionViaCredentials_Response message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CAuthentication_BeginAuthSessionViaCredentials_Response.encodeDelimited = function(message, writer) {
        return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
    };

    /**
     * Decodes a CAuthentication_BeginAuthSessionViaCredentials_Response message from the specified reader or buffer.
     * @function decode
     * @memberof CAuthentication_BeginAuthSessionViaCredentials_Response
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {CAuthentication_BeginAuthSessionViaCredentials_Response & CAuthentication_BeginAuthSessionViaCredentials_Response.$Shape} CAuthentication_BeginAuthSessionViaCredentials_Response
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CAuthentication_BeginAuthSessionViaCredentials_Response.decode = function (reader, length, _end, _depth, _target) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $Reader.recursionLimit)
            throw $Error("max depth exceeded");
        let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.CAuthentication_BeginAuthSessionViaCredentials_Response();
        while (reader.pos < end) {
            let start = reader.pos;
            let tag = reader.tag();
            if (tag === _end) {
                _end = $undefined;
                break;
            }
            let wireType = tag & 7;
            switch (tag >>>= 3) {
            case 1: {
                    if (wireType !== 0)
                        break;
                    message.clientId = reader.uint64();
                    continue;
                }
            case 2: {
                    if (wireType !== 2)
                        break;
                    message.requestId = reader.bytes();
                    continue;
                }
            case 3: {
                    if (wireType !== 5)
                        break;
                    message.interval = reader.float();
                    continue;
                }
            case 4: {
                    if (wireType !== 2)
                        break;
                    if (!(message.allowedConfirmations && message.allowedConfirmations.length))
                        message.allowedConfirmations = [];
                    message.allowedConfirmations.push($root.CAuthentication_AllowedConfirmation.decode(reader, reader.uint32(), $undefined, _depth + 1));
                    continue;
                }
            case 5: {
                    if (wireType !== 0)
                        break;
                    message.steamid = reader.uint64();
                    continue;
                }
            case 6: {
                    if (wireType !== 2)
                        break;
                    message.weakToken = reader.string();
                    continue;
                }
            case 7: {
                    if (wireType !== 2)
                        break;
                    message.agreementSessionUrl = reader.string();
                    continue;
                }
            case 8: {
                    if (wireType !== 2)
                        break;
                    message.extendedErrorMessage = reader.string();
                    continue;
                }
            }
            reader.skipType(wireType, _depth, tag);
            if (!reader.discardUnknown) {
                $util.makeProp(message, "$unknowns", false);
                (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
            }
        }
        if (_end !== $undefined)
            throw $Error("missing end group");
        return message;
    };

    /**
     * Decodes a CAuthentication_BeginAuthSessionViaCredentials_Response message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof CAuthentication_BeginAuthSessionViaCredentials_Response
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {CAuthentication_BeginAuthSessionViaCredentials_Response & CAuthentication_BeginAuthSessionViaCredentials_Response.$Shape} CAuthentication_BeginAuthSessionViaCredentials_Response
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CAuthentication_BeginAuthSessionViaCredentials_Response.decodeDelimited = function(reader) {
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
    CAuthentication_BeginAuthSessionViaCredentials_Response.verify = function (message, _depth) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            return "max depth exceeded";
        if (message.clientId != null && $Object.hasOwnProperty.call(message, "clientId"))
            if (!$util.isInteger(message.clientId) && !(message.clientId && $util.isInteger(message.clientId.low) && $util.isInteger(message.clientId.high)))
                return "clientId: integer|Long expected";
        if (message.requestId != null && $Object.hasOwnProperty.call(message, "requestId"))
            if (!(message.requestId && typeof message.requestId.length === "number" || $util.isString(message.requestId)))
                return "requestId: buffer expected";
        if (message.interval != null && $Object.hasOwnProperty.call(message, "interval"))
            if (typeof message.interval !== "number")
                return "interval: number expected";
        if (message.allowedConfirmations != null && $Object.hasOwnProperty.call(message, "allowedConfirmations")) {
            if (!$Array.isArray(message.allowedConfirmations))
                return "allowedConfirmations: array expected";
            for (let i = 0; i < message.allowedConfirmations.length; ++i) {
                let error = $root.CAuthentication_AllowedConfirmation.verify(message.allowedConfirmations[i], _depth + 1);
                if (error)
                    return "allowedConfirmations." + error;
            }
        }
        if (message.steamid != null && $Object.hasOwnProperty.call(message, "steamid"))
            if (!$util.isInteger(message.steamid) && !(message.steamid && $util.isInteger(message.steamid.low) && $util.isInteger(message.steamid.high)))
                return "steamid: integer|Long expected";
        if (message.weakToken != null && $Object.hasOwnProperty.call(message, "weakToken"))
            if (!$util.isString(message.weakToken))
                return "weakToken: string expected";
        if (message.agreementSessionUrl != null && $Object.hasOwnProperty.call(message, "agreementSessionUrl"))
            if (!$util.isString(message.agreementSessionUrl))
                return "agreementSessionUrl: string expected";
        if (message.extendedErrorMessage != null && $Object.hasOwnProperty.call(message, "extendedErrorMessage"))
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
    CAuthentication_BeginAuthSessionViaCredentials_Response.fromObject = function (object, _depth) {
        if (object instanceof $root.CAuthentication_BeginAuthSessionViaCredentials_Response)
            return object;
        if (!$util.isObject(object))
            throw $TypeError(".CAuthentication_BeginAuthSessionViaCredentials_Response: object expected");
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw $Error("max depth exceeded");
        let message = new $root.CAuthentication_BeginAuthSessionViaCredentials_Response();
        if (object.clientId != null)
            if ($util.Long)
                message.clientId = $util.Long.fromValue(object.clientId, true);
            else if (typeof object.clientId === "string")
                message.clientId = $parseInt(object.clientId, 10);
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
            message.interval = $Number(object.interval);
        if (object.allowedConfirmations) {
            if (!$Array.isArray(object.allowedConfirmations))
                throw $TypeError(".CAuthentication_BeginAuthSessionViaCredentials_Response.allowedConfirmations: array expected");
            message.allowedConfirmations = $Array(object.allowedConfirmations.length);
            for (let i = 0; i < object.allowedConfirmations.length; ++i) {
                if (!$util.isObject(object.allowedConfirmations[i]))
                    throw $TypeError(".CAuthentication_BeginAuthSessionViaCredentials_Response.allowedConfirmations: object expected");
                message.allowedConfirmations[i] = $root.CAuthentication_AllowedConfirmation.fromObject(object.allowedConfirmations[i], _depth + 1);
            }
        }
        if (object.steamid != null)
            if ($util.Long)
                message.steamid = $util.Long.fromValue(object.steamid, true);
            else if (typeof object.steamid === "string")
                message.steamid = $parseInt(object.steamid, 10);
            else if (typeof object.steamid === "number")
                message.steamid = object.steamid;
            else if (typeof object.steamid === "object")
                message.steamid = new $util.LongBits(object.steamid.low >>> 0, object.steamid.high >>> 0).toNumber(true);
        if (object.weakToken != null)
            message.weakToken = $String(object.weakToken);
        if (object.agreementSessionUrl != null)
            message.agreementSessionUrl = $String(object.agreementSessionUrl);
        if (object.extendedErrorMessage != null)
            message.extendedErrorMessage = $String(object.extendedErrorMessage);
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
    CAuthentication_BeginAuthSessionViaCredentials_Response.toObject = function (message, options, _depth) {
        if (!options)
            options = {};
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw $Error("max depth exceeded");
        let object = {};
        if (options.arrays || options.defaults)
            object.allowedConfirmations = [];
        if (options.defaults) {
            if ($util.Long) {
                let long = new $util.Long(0, 0, true);
                object.clientId = options.longs === $String ? long.toString() : options.longs === $Number ? long.toNumber() : typeof $BigInt !== "undefined" && options.longs === $BigInt ? long.toBigInt() : long;
            } else
                object.clientId = options.longs === $String ? "0" : typeof $BigInt !== "undefined" && options.longs === $BigInt ? $BigInt("0") : 0;
            if (options.bytes === $String)
                object.requestId = "";
            else {
                object.requestId = [];
                if (options.bytes !== $Array)
                    object.requestId = $util.newBuffer(object.requestId);
            }
            object.interval = 0;
            if ($util.Long) {
                let long = new $util.Long(0, 0, true);
                object.steamid = options.longs === $String ? long.toString() : options.longs === $Number ? long.toNumber() : typeof $BigInt !== "undefined" && options.longs === $BigInt ? long.toBigInt() : long;
            } else
                object.steamid = options.longs === $String ? "0" : typeof $BigInt !== "undefined" && options.longs === $BigInt ? $BigInt("0") : 0;
            object.weakToken = "";
            object.agreementSessionUrl = "";
            object.extendedErrorMessage = "";
        }
        if (message.clientId != null && $Object.hasOwnProperty.call(message, "clientId"))
            if (typeof $BigInt !== "undefined" && options.longs === $BigInt)
                object.clientId = typeof message.clientId === "number" ? $BigInt(message.clientId) : $util.Long.fromBits(message.clientId.low >>> 0, message.clientId.high >>> 0, true).toBigInt();
            else if (typeof message.clientId === "number")
                object.clientId = options.longs === $String ? $String(message.clientId) : message.clientId;
            else
                object.clientId = options.longs === $String ? $util.Long.prototype.toString.call(message.clientId) : options.longs === $Number ? new $util.LongBits(message.clientId.low >>> 0, message.clientId.high >>> 0).toNumber(true) : message.clientId;
        if (message.requestId != null && $Object.hasOwnProperty.call(message, "requestId"))
            object.requestId = options.bytes === $String ? $util.base64.encode(message.requestId, 0, message.requestId.length) : options.bytes === $Array ? $Array.prototype.slice.call(message.requestId) : message.requestId;
        if (message.interval != null && $Object.hasOwnProperty.call(message, "interval"))
            object.interval = options.json && !$isFinite(message.interval) ? $String(message.interval) : message.interval;
        if (message.allowedConfirmations && message.allowedConfirmations.length) {
            object.allowedConfirmations = $Array(message.allowedConfirmations.length);
            for (let j = 0; j < message.allowedConfirmations.length; ++j)
                object.allowedConfirmations[j] = $root.CAuthentication_AllowedConfirmation.toObject(message.allowedConfirmations[j], options, _depth + 1);
        }
        if (message.steamid != null && $Object.hasOwnProperty.call(message, "steamid"))
            if (typeof $BigInt !== "undefined" && options.longs === $BigInt)
                object.steamid = typeof message.steamid === "number" ? $BigInt(message.steamid) : $util.Long.fromBits(message.steamid.low >>> 0, message.steamid.high >>> 0, true).toBigInt();
            else if (typeof message.steamid === "number")
                object.steamid = options.longs === $String ? $String(message.steamid) : message.steamid;
            else
                object.steamid = options.longs === $String ? $util.Long.prototype.toString.call(message.steamid) : options.longs === $Number ? new $util.LongBits(message.steamid.low >>> 0, message.steamid.high >>> 0).toNumber(true) : message.steamid;
        if (message.weakToken != null && $Object.hasOwnProperty.call(message, "weakToken"))
            object.weakToken = message.weakToken;
        if (message.agreementSessionUrl != null && $Object.hasOwnProperty.call(message, "agreementSessionUrl"))
            object.agreementSessionUrl = message.agreementSessionUrl;
        if (message.extendedErrorMessage != null && $Object.hasOwnProperty.call(message, "extendedErrorMessage"))
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
    CAuthentication_BeginAuthSessionViaCredentials_Response.prototype.toJSON = function() {
        return CAuthentication_BeginAuthSessionViaCredentials_Response.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the type url for CAuthentication_BeginAuthSessionViaCredentials_Response
     * @function getTypeUrl
     * @memberof CAuthentication_BeginAuthSessionViaCredentials_Response
     * @static
     * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
     * @returns {string} The type url
     */
    CAuthentication_BeginAuthSessionViaCredentials_Response.getTypeUrl = function(prefix) {
        if (prefix === $undefined)
            prefix = "type.googleapis.com";
        return prefix + "/CAuthentication_BeginAuthSessionViaCredentials_Response";
    };

    return CAuthentication_BeginAuthSessionViaCredentials_Response;
})();

export const CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request = $root.CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request = (() => {

    /**
     * Properties of a CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request.
     * @typedef {Object} CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request.$Properties
     * @property {number|Long|null} [clientId] CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request clientId
     * @property {number|Long|null} [steamid] CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request steamid
     * @property {string|null} [code] CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request code
     * @property {EAuthSessionGuardType|null} [codeType] CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request codeType
     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
     */

    /**
     * Properties of a CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request.
     * @exports ICAuthentication_UpdateAuthSessionWithSteamGuardCode_Request
     * @interface ICAuthentication_UpdateAuthSessionWithSteamGuardCode_Request
     * @augments CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request.$Properties
     * @deprecated Use CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request.$Properties instead.
     */

    /**
     * Shape of a CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request.
     * @typedef {CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request.$Properties} CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request.$Shape
     */

    /**
     * Constructs a new CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request.
     * @exports CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request
     * @classdesc Represents a CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request.
     * @constructor
     * @param {CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request.$Properties=} [properties] Properties to set
     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
     */
    const CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request = function (properties) {
        if (properties)
            for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null && keys[i] !== "__proto__")
                    this[keys[i]] = properties[keys[i]];
    };

    /**
     * CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request clientId.
     * @member {number|Long} clientId
     * @memberof CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request
     * @instance
     */
    CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request.prototype.clientId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

    /**
     * CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request steamid.
     * @member {number|Long} steamid
     * @memberof CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request
     * @instance
     */
    CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request.prototype.steamid = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

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
     * @param {CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request.$Properties=} [properties] Properties to set
     * @returns {CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request} CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request instance
     * @type {{
     *   (properties: CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request.$Shape): CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request & CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request.$Shape;
     *   (properties?: CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request.$Properties): CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request;
     * }}
     */
    CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request.create = function(properties) {
        return new CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request(properties);
    };

    /**
     * Encodes the specified CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request message. Does not implicitly {@link CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request.verify|verify} messages.
     * @function encode
     * @memberof CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request
     * @static
     * @param {CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request.$Properties} message CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request.encode = function (message, writer, _depth) {
        if (!writer)
            writer = $Writer.create();
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw $Error("max depth exceeded");
        if (message.clientId != null && $Object.hasOwnProperty.call(message, "clientId"))
            writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.clientId);
        if (message.steamid != null && $Object.hasOwnProperty.call(message, "steamid"))
            writer.uint32(/* id 2, wireType 1 =*/17).fixed64(message.steamid);
        if (message.code != null && $Object.hasOwnProperty.call(message, "code"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.code);
        if (message.codeType != null && $Object.hasOwnProperty.call(message, "codeType"))
            writer.uint32(/* id 4, wireType 0 =*/32).int32(message.codeType);
        if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
            for (let i = 0; i < message.$unknowns.length; ++i)
                writer.raw(message.$unknowns[i]);
        return writer;
    };

    /**
     * Encodes the specified CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request message, length delimited. Does not implicitly {@link CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request.verify|verify} messages.
     * @function encodeDelimited
     * @memberof CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request
     * @static
     * @param {CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request.$Properties} message CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request.encodeDelimited = function(message, writer) {
        return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
    };

    /**
     * Decodes a CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request message from the specified reader or buffer.
     * @function decode
     * @memberof CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request & CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request.$Shape} CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request.decode = function (reader, length, _end, _depth, _target) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $Reader.recursionLimit)
            throw $Error("max depth exceeded");
        let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request(), value;
        while (reader.pos < end) {
            let start = reader.pos;
            let tag = reader.tag();
            if (tag === _end) {
                _end = $undefined;
                break;
            }
            let wireType = tag & 7;
            switch (tag >>>= 3) {
            case 1: {
                    if (wireType !== 0)
                        break;
                    message.clientId = reader.uint64();
                    continue;
                }
            case 2: {
                    if (wireType !== 1)
                        break;
                    message.steamid = reader.fixed64();
                    continue;
                }
            case 3: {
                    if (wireType !== 2)
                        break;
                    message.code = reader.string();
                    continue;
                }
            case 4: {
                    if (wireType !== 0)
                        break;
                    value = reader.int32();
                    if ($root.EAuthSessionGuardType[value] !== $undefined)
                        message.codeType = value;
                    else if (!reader.discardUnknown) {
                        $util.makeProp(message, "$unknowns", false);
                        (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                    }
                    continue;
                }
            }
            reader.skipType(wireType, _depth, tag);
            if (!reader.discardUnknown) {
                $util.makeProp(message, "$unknowns", false);
                (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
            }
        }
        if (_end !== $undefined)
            throw $Error("missing end group");
        return message;
    };

    /**
     * Decodes a CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request & CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request.$Shape} CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request.decodeDelimited = function(reader) {
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
    CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request.verify = function (message, _depth) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            return "max depth exceeded";
        if (message.clientId != null && $Object.hasOwnProperty.call(message, "clientId"))
            if (!$util.isInteger(message.clientId) && !(message.clientId && $util.isInteger(message.clientId.low) && $util.isInteger(message.clientId.high)))
                return "clientId: integer|Long expected";
        if (message.steamid != null && $Object.hasOwnProperty.call(message, "steamid"))
            if (!$util.isInteger(message.steamid) && !(message.steamid && $util.isInteger(message.steamid.low) && $util.isInteger(message.steamid.high)))
                return "steamid: integer|Long expected";
        if (message.code != null && $Object.hasOwnProperty.call(message, "code"))
            if (!$util.isString(message.code))
                return "code: string expected";
        if (message.codeType != null && $Object.hasOwnProperty.call(message, "codeType"))
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
    CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request.fromObject = function (object, _depth) {
        if (object instanceof $root.CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request)
            return object;
        if (!$util.isObject(object))
            throw $TypeError(".CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request: object expected");
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw $Error("max depth exceeded");
        let message = new $root.CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request();
        if (object.clientId != null)
            if ($util.Long)
                message.clientId = $util.Long.fromValue(object.clientId, true);
            else if (typeof object.clientId === "string")
                message.clientId = $parseInt(object.clientId, 10);
            else if (typeof object.clientId === "number")
                message.clientId = object.clientId;
            else if (typeof object.clientId === "object")
                message.clientId = new $util.LongBits(object.clientId.low >>> 0, object.clientId.high >>> 0).toNumber(true);
        if (object.steamid != null)
            if ($util.Long)
                message.steamid = $util.Long.fromValue(object.steamid, true);
            else if (typeof object.steamid === "string")
                message.steamid = $parseInt(object.steamid, 10);
            else if (typeof object.steamid === "number")
                message.steamid = object.steamid;
            else if (typeof object.steamid === "object")
                message.steamid = new $util.LongBits(object.steamid.low >>> 0, object.steamid.high >>> 0).toNumber(true);
        if (object.code != null)
            message.code = $String(object.code);
        switch (object.codeType) {
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
        default:
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
    CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request.toObject = function (message, options, _depth) {
        if (!options)
            options = {};
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw $Error("max depth exceeded");
        let object = {};
        if (options.defaults) {
            if ($util.Long) {
                let long = new $util.Long(0, 0, true);
                object.clientId = options.longs === $String ? long.toString() : options.longs === $Number ? long.toNumber() : typeof $BigInt !== "undefined" && options.longs === $BigInt ? long.toBigInt() : long;
            } else
                object.clientId = options.longs === $String ? "0" : typeof $BigInt !== "undefined" && options.longs === $BigInt ? $BigInt("0") : 0;
            if ($util.Long) {
                let long = new $util.Long(0, 0, true);
                object.steamid = options.longs === $String ? long.toString() : options.longs === $Number ? long.toNumber() : typeof $BigInt !== "undefined" && options.longs === $BigInt ? long.toBigInt() : long;
            } else
                object.steamid = options.longs === $String ? "0" : typeof $BigInt !== "undefined" && options.longs === $BigInt ? $BigInt("0") : 0;
            object.code = "";
            object.codeType = options.enums === $String ? "k_EAuthSessionGuardType_Unknown" : 0;
        }
        if (message.clientId != null && $Object.hasOwnProperty.call(message, "clientId"))
            if (typeof $BigInt !== "undefined" && options.longs === $BigInt)
                object.clientId = typeof message.clientId === "number" ? $BigInt(message.clientId) : $util.Long.fromBits(message.clientId.low >>> 0, message.clientId.high >>> 0, true).toBigInt();
            else if (typeof message.clientId === "number")
                object.clientId = options.longs === $String ? $String(message.clientId) : message.clientId;
            else
                object.clientId = options.longs === $String ? $util.Long.prototype.toString.call(message.clientId) : options.longs === $Number ? new $util.LongBits(message.clientId.low >>> 0, message.clientId.high >>> 0).toNumber(true) : message.clientId;
        if (message.steamid != null && $Object.hasOwnProperty.call(message, "steamid"))
            if (typeof $BigInt !== "undefined" && options.longs === $BigInt)
                object.steamid = typeof message.steamid === "number" ? $BigInt(message.steamid) : $util.Long.fromBits(message.steamid.low >>> 0, message.steamid.high >>> 0, true).toBigInt();
            else if (typeof message.steamid === "number")
                object.steamid = options.longs === $String ? $String(message.steamid) : message.steamid;
            else
                object.steamid = options.longs === $String ? $util.Long.prototype.toString.call(message.steamid) : options.longs === $Number ? new $util.LongBits(message.steamid.low >>> 0, message.steamid.high >>> 0).toNumber(true) : message.steamid;
        if (message.code != null && $Object.hasOwnProperty.call(message, "code"))
            object.code = message.code;
        if (message.codeType != null && $Object.hasOwnProperty.call(message, "codeType"))
            object.codeType = options.enums === $String ? $root.EAuthSessionGuardType[message.codeType] === $undefined ? message.codeType : $root.EAuthSessionGuardType[message.codeType] : message.codeType;
        return object;
    };

    /**
     * Converts this CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request to JSON.
     * @function toJSON
     * @memberof CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request.prototype.toJSON = function() {
        return CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the type url for CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request
     * @function getTypeUrl
     * @memberof CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request
     * @static
     * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
     * @returns {string} The type url
     */
    CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request.getTypeUrl = function(prefix) {
        if (prefix === $undefined)
            prefix = "type.googleapis.com";
        return prefix + "/CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request";
    };

    return CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request;
})();

export const CAuthentication_PollAuthSessionStatus_Request = $root.CAuthentication_PollAuthSessionStatus_Request = (() => {

    /**
     * Properties of a CAuthentication_PollAuthSessionStatus_Request.
     * @typedef {Object} CAuthentication_PollAuthSessionStatus_Request.$Properties
     * @property {number|Long|null} [clientId] CAuthentication_PollAuthSessionStatus_Request clientId
     * @property {Uint8Array|null} [requestId] CAuthentication_PollAuthSessionStatus_Request requestId
     * @property {number|Long|null} [tokenToRevoke] CAuthentication_PollAuthSessionStatus_Request tokenToRevoke
     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
     */

    /**
     * Properties of a CAuthentication_PollAuthSessionStatus_Request.
     * @exports ICAuthentication_PollAuthSessionStatus_Request
     * @interface ICAuthentication_PollAuthSessionStatus_Request
     * @augments CAuthentication_PollAuthSessionStatus_Request.$Properties
     * @deprecated Use CAuthentication_PollAuthSessionStatus_Request.$Properties instead.
     */

    /**
     * Shape of a CAuthentication_PollAuthSessionStatus_Request.
     * @typedef {CAuthentication_PollAuthSessionStatus_Request.$Properties} CAuthentication_PollAuthSessionStatus_Request.$Shape
     */

    /**
     * Constructs a new CAuthentication_PollAuthSessionStatus_Request.
     * @exports CAuthentication_PollAuthSessionStatus_Request
     * @classdesc Represents a CAuthentication_PollAuthSessionStatus_Request.
     * @constructor
     * @param {CAuthentication_PollAuthSessionStatus_Request.$Properties=} [properties] Properties to set
     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
     */
    const CAuthentication_PollAuthSessionStatus_Request = function (properties) {
        if (properties)
            for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null && keys[i] !== "__proto__")
                    this[keys[i]] = properties[keys[i]];
    };

    /**
     * CAuthentication_PollAuthSessionStatus_Request clientId.
     * @member {number|Long} clientId
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
     * @member {number|Long} tokenToRevoke
     * @memberof CAuthentication_PollAuthSessionStatus_Request
     * @instance
     */
    CAuthentication_PollAuthSessionStatus_Request.prototype.tokenToRevoke = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

    /**
     * Creates a new CAuthentication_PollAuthSessionStatus_Request instance using the specified properties.
     * @function create
     * @memberof CAuthentication_PollAuthSessionStatus_Request
     * @static
     * @param {CAuthentication_PollAuthSessionStatus_Request.$Properties=} [properties] Properties to set
     * @returns {CAuthentication_PollAuthSessionStatus_Request} CAuthentication_PollAuthSessionStatus_Request instance
     * @type {{
     *   (properties: CAuthentication_PollAuthSessionStatus_Request.$Shape): CAuthentication_PollAuthSessionStatus_Request & CAuthentication_PollAuthSessionStatus_Request.$Shape;
     *   (properties?: CAuthentication_PollAuthSessionStatus_Request.$Properties): CAuthentication_PollAuthSessionStatus_Request;
     * }}
     */
    CAuthentication_PollAuthSessionStatus_Request.create = function(properties) {
        return new CAuthentication_PollAuthSessionStatus_Request(properties);
    };

    /**
     * Encodes the specified CAuthentication_PollAuthSessionStatus_Request message. Does not implicitly {@link CAuthentication_PollAuthSessionStatus_Request.verify|verify} messages.
     * @function encode
     * @memberof CAuthentication_PollAuthSessionStatus_Request
     * @static
     * @param {CAuthentication_PollAuthSessionStatus_Request.$Properties} message CAuthentication_PollAuthSessionStatus_Request message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CAuthentication_PollAuthSessionStatus_Request.encode = function (message, writer, _depth) {
        if (!writer)
            writer = $Writer.create();
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw $Error("max depth exceeded");
        if (message.clientId != null && $Object.hasOwnProperty.call(message, "clientId"))
            writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.clientId);
        if (message.requestId != null && $Object.hasOwnProperty.call(message, "requestId"))
            writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.requestId);
        if (message.tokenToRevoke != null && $Object.hasOwnProperty.call(message, "tokenToRevoke"))
            writer.uint32(/* id 3, wireType 1 =*/25).fixed64(message.tokenToRevoke);
        if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
            for (let i = 0; i < message.$unknowns.length; ++i)
                writer.raw(message.$unknowns[i]);
        return writer;
    };

    /**
     * Encodes the specified CAuthentication_PollAuthSessionStatus_Request message, length delimited. Does not implicitly {@link CAuthentication_PollAuthSessionStatus_Request.verify|verify} messages.
     * @function encodeDelimited
     * @memberof CAuthentication_PollAuthSessionStatus_Request
     * @static
     * @param {CAuthentication_PollAuthSessionStatus_Request.$Properties} message CAuthentication_PollAuthSessionStatus_Request message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CAuthentication_PollAuthSessionStatus_Request.encodeDelimited = function(message, writer) {
        return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
    };

    /**
     * Decodes a CAuthentication_PollAuthSessionStatus_Request message from the specified reader or buffer.
     * @function decode
     * @memberof CAuthentication_PollAuthSessionStatus_Request
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {CAuthentication_PollAuthSessionStatus_Request & CAuthentication_PollAuthSessionStatus_Request.$Shape} CAuthentication_PollAuthSessionStatus_Request
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CAuthentication_PollAuthSessionStatus_Request.decode = function (reader, length, _end, _depth, _target) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $Reader.recursionLimit)
            throw $Error("max depth exceeded");
        let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.CAuthentication_PollAuthSessionStatus_Request();
        while (reader.pos < end) {
            let start = reader.pos;
            let tag = reader.tag();
            if (tag === _end) {
                _end = $undefined;
                break;
            }
            let wireType = tag & 7;
            switch (tag >>>= 3) {
            case 1: {
                    if (wireType !== 0)
                        break;
                    message.clientId = reader.uint64();
                    continue;
                }
            case 2: {
                    if (wireType !== 2)
                        break;
                    message.requestId = reader.bytes();
                    continue;
                }
            case 3: {
                    if (wireType !== 1)
                        break;
                    message.tokenToRevoke = reader.fixed64();
                    continue;
                }
            }
            reader.skipType(wireType, _depth, tag);
            if (!reader.discardUnknown) {
                $util.makeProp(message, "$unknowns", false);
                (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
            }
        }
        if (_end !== $undefined)
            throw $Error("missing end group");
        return message;
    };

    /**
     * Decodes a CAuthentication_PollAuthSessionStatus_Request message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof CAuthentication_PollAuthSessionStatus_Request
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {CAuthentication_PollAuthSessionStatus_Request & CAuthentication_PollAuthSessionStatus_Request.$Shape} CAuthentication_PollAuthSessionStatus_Request
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CAuthentication_PollAuthSessionStatus_Request.decodeDelimited = function(reader) {
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
    CAuthentication_PollAuthSessionStatus_Request.verify = function (message, _depth) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            return "max depth exceeded";
        if (message.clientId != null && $Object.hasOwnProperty.call(message, "clientId"))
            if (!$util.isInteger(message.clientId) && !(message.clientId && $util.isInteger(message.clientId.low) && $util.isInteger(message.clientId.high)))
                return "clientId: integer|Long expected";
        if (message.requestId != null && $Object.hasOwnProperty.call(message, "requestId"))
            if (!(message.requestId && typeof message.requestId.length === "number" || $util.isString(message.requestId)))
                return "requestId: buffer expected";
        if (message.tokenToRevoke != null && $Object.hasOwnProperty.call(message, "tokenToRevoke"))
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
    CAuthentication_PollAuthSessionStatus_Request.fromObject = function (object, _depth) {
        if (object instanceof $root.CAuthentication_PollAuthSessionStatus_Request)
            return object;
        if (!$util.isObject(object))
            throw $TypeError(".CAuthentication_PollAuthSessionStatus_Request: object expected");
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw $Error("max depth exceeded");
        let message = new $root.CAuthentication_PollAuthSessionStatus_Request();
        if (object.clientId != null)
            if ($util.Long)
                message.clientId = $util.Long.fromValue(object.clientId, true);
            else if (typeof object.clientId === "string")
                message.clientId = $parseInt(object.clientId, 10);
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
                message.tokenToRevoke = $util.Long.fromValue(object.tokenToRevoke, true);
            else if (typeof object.tokenToRevoke === "string")
                message.tokenToRevoke = $parseInt(object.tokenToRevoke, 10);
            else if (typeof object.tokenToRevoke === "number")
                message.tokenToRevoke = object.tokenToRevoke;
            else if (typeof object.tokenToRevoke === "object")
                message.tokenToRevoke = new $util.LongBits(object.tokenToRevoke.low >>> 0, object.tokenToRevoke.high >>> 0).toNumber(true);
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
    CAuthentication_PollAuthSessionStatus_Request.toObject = function (message, options, _depth) {
        if (!options)
            options = {};
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw $Error("max depth exceeded");
        let object = {};
        if (options.defaults) {
            if ($util.Long) {
                let long = new $util.Long(0, 0, true);
                object.clientId = options.longs === $String ? long.toString() : options.longs === $Number ? long.toNumber() : typeof $BigInt !== "undefined" && options.longs === $BigInt ? long.toBigInt() : long;
            } else
                object.clientId = options.longs === $String ? "0" : typeof $BigInt !== "undefined" && options.longs === $BigInt ? $BigInt("0") : 0;
            if (options.bytes === $String)
                object.requestId = "";
            else {
                object.requestId = [];
                if (options.bytes !== $Array)
                    object.requestId = $util.newBuffer(object.requestId);
            }
            if ($util.Long) {
                let long = new $util.Long(0, 0, true);
                object.tokenToRevoke = options.longs === $String ? long.toString() : options.longs === $Number ? long.toNumber() : typeof $BigInt !== "undefined" && options.longs === $BigInt ? long.toBigInt() : long;
            } else
                object.tokenToRevoke = options.longs === $String ? "0" : typeof $BigInt !== "undefined" && options.longs === $BigInt ? $BigInt("0") : 0;
        }
        if (message.clientId != null && $Object.hasOwnProperty.call(message, "clientId"))
            if (typeof $BigInt !== "undefined" && options.longs === $BigInt)
                object.clientId = typeof message.clientId === "number" ? $BigInt(message.clientId) : $util.Long.fromBits(message.clientId.low >>> 0, message.clientId.high >>> 0, true).toBigInt();
            else if (typeof message.clientId === "number")
                object.clientId = options.longs === $String ? $String(message.clientId) : message.clientId;
            else
                object.clientId = options.longs === $String ? $util.Long.prototype.toString.call(message.clientId) : options.longs === $Number ? new $util.LongBits(message.clientId.low >>> 0, message.clientId.high >>> 0).toNumber(true) : message.clientId;
        if (message.requestId != null && $Object.hasOwnProperty.call(message, "requestId"))
            object.requestId = options.bytes === $String ? $util.base64.encode(message.requestId, 0, message.requestId.length) : options.bytes === $Array ? $Array.prototype.slice.call(message.requestId) : message.requestId;
        if (message.tokenToRevoke != null && $Object.hasOwnProperty.call(message, "tokenToRevoke"))
            if (typeof $BigInt !== "undefined" && options.longs === $BigInt)
                object.tokenToRevoke = typeof message.tokenToRevoke === "number" ? $BigInt(message.tokenToRevoke) : $util.Long.fromBits(message.tokenToRevoke.low >>> 0, message.tokenToRevoke.high >>> 0, true).toBigInt();
            else if (typeof message.tokenToRevoke === "number")
                object.tokenToRevoke = options.longs === $String ? $String(message.tokenToRevoke) : message.tokenToRevoke;
            else
                object.tokenToRevoke = options.longs === $String ? $util.Long.prototype.toString.call(message.tokenToRevoke) : options.longs === $Number ? new $util.LongBits(message.tokenToRevoke.low >>> 0, message.tokenToRevoke.high >>> 0).toNumber(true) : message.tokenToRevoke;
        return object;
    };

    /**
     * Converts this CAuthentication_PollAuthSessionStatus_Request to JSON.
     * @function toJSON
     * @memberof CAuthentication_PollAuthSessionStatus_Request
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    CAuthentication_PollAuthSessionStatus_Request.prototype.toJSON = function() {
        return CAuthentication_PollAuthSessionStatus_Request.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the type url for CAuthentication_PollAuthSessionStatus_Request
     * @function getTypeUrl
     * @memberof CAuthentication_PollAuthSessionStatus_Request
     * @static
     * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
     * @returns {string} The type url
     */
    CAuthentication_PollAuthSessionStatus_Request.getTypeUrl = function(prefix) {
        if (prefix === $undefined)
            prefix = "type.googleapis.com";
        return prefix + "/CAuthentication_PollAuthSessionStatus_Request";
    };

    return CAuthentication_PollAuthSessionStatus_Request;
})();

export const CAuthentication_PollAuthSessionStatus_Response = $root.CAuthentication_PollAuthSessionStatus_Response = (() => {

    /**
     * Properties of a CAuthentication_PollAuthSessionStatus_Response.
     * @typedef {Object} CAuthentication_PollAuthSessionStatus_Response.$Properties
     * @property {number|Long|null} [newClientId] CAuthentication_PollAuthSessionStatus_Response newClientId
     * @property {string|null} [newChallengeUrl] CAuthentication_PollAuthSessionStatus_Response newChallengeUrl
     * @property {string|null} [refreshToken] CAuthentication_PollAuthSessionStatus_Response refreshToken
     * @property {string|null} [accessToken] CAuthentication_PollAuthSessionStatus_Response accessToken
     * @property {boolean|null} [hadRemoteInteraction] CAuthentication_PollAuthSessionStatus_Response hadRemoteInteraction
     * @property {string|null} [accountName] CAuthentication_PollAuthSessionStatus_Response accountName
     * @property {string|null} [newGuardData] CAuthentication_PollAuthSessionStatus_Response newGuardData
     * @property {string|null} [agreementSessionUrl] CAuthentication_PollAuthSessionStatus_Response agreementSessionUrl
     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
     */

    /**
     * Properties of a CAuthentication_PollAuthSessionStatus_Response.
     * @exports ICAuthentication_PollAuthSessionStatus_Response
     * @interface ICAuthentication_PollAuthSessionStatus_Response
     * @augments CAuthentication_PollAuthSessionStatus_Response.$Properties
     * @deprecated Use CAuthentication_PollAuthSessionStatus_Response.$Properties instead.
     */

    /**
     * Shape of a CAuthentication_PollAuthSessionStatus_Response.
     * @typedef {CAuthentication_PollAuthSessionStatus_Response.$Properties} CAuthentication_PollAuthSessionStatus_Response.$Shape
     */

    /**
     * Constructs a new CAuthentication_PollAuthSessionStatus_Response.
     * @exports CAuthentication_PollAuthSessionStatus_Response
     * @classdesc Represents a CAuthentication_PollAuthSessionStatus_Response.
     * @constructor
     * @param {CAuthentication_PollAuthSessionStatus_Response.$Properties=} [properties] Properties to set
     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
     */
    const CAuthentication_PollAuthSessionStatus_Response = function (properties) {
        if (properties)
            for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null && keys[i] !== "__proto__")
                    this[keys[i]] = properties[keys[i]];
    };

    /**
     * CAuthentication_PollAuthSessionStatus_Response newClientId.
     * @member {number|Long} newClientId
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
     * @param {CAuthentication_PollAuthSessionStatus_Response.$Properties=} [properties] Properties to set
     * @returns {CAuthentication_PollAuthSessionStatus_Response} CAuthentication_PollAuthSessionStatus_Response instance
     * @type {{
     *   (properties: CAuthentication_PollAuthSessionStatus_Response.$Shape): CAuthentication_PollAuthSessionStatus_Response & CAuthentication_PollAuthSessionStatus_Response.$Shape;
     *   (properties?: CAuthentication_PollAuthSessionStatus_Response.$Properties): CAuthentication_PollAuthSessionStatus_Response;
     * }}
     */
    CAuthentication_PollAuthSessionStatus_Response.create = function(properties) {
        return new CAuthentication_PollAuthSessionStatus_Response(properties);
    };

    /**
     * Encodes the specified CAuthentication_PollAuthSessionStatus_Response message. Does not implicitly {@link CAuthentication_PollAuthSessionStatus_Response.verify|verify} messages.
     * @function encode
     * @memberof CAuthentication_PollAuthSessionStatus_Response
     * @static
     * @param {CAuthentication_PollAuthSessionStatus_Response.$Properties} message CAuthentication_PollAuthSessionStatus_Response message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CAuthentication_PollAuthSessionStatus_Response.encode = function (message, writer, _depth) {
        if (!writer)
            writer = $Writer.create();
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw $Error("max depth exceeded");
        if (message.newClientId != null && $Object.hasOwnProperty.call(message, "newClientId"))
            writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.newClientId);
        if (message.newChallengeUrl != null && $Object.hasOwnProperty.call(message, "newChallengeUrl"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.newChallengeUrl);
        if (message.refreshToken != null && $Object.hasOwnProperty.call(message, "refreshToken"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.refreshToken);
        if (message.accessToken != null && $Object.hasOwnProperty.call(message, "accessToken"))
            writer.uint32(/* id 4, wireType 2 =*/34).string(message.accessToken);
        if (message.hadRemoteInteraction != null && $Object.hasOwnProperty.call(message, "hadRemoteInteraction"))
            writer.uint32(/* id 5, wireType 0 =*/40).bool(message.hadRemoteInteraction);
        if (message.accountName != null && $Object.hasOwnProperty.call(message, "accountName"))
            writer.uint32(/* id 6, wireType 2 =*/50).string(message.accountName);
        if (message.newGuardData != null && $Object.hasOwnProperty.call(message, "newGuardData"))
            writer.uint32(/* id 7, wireType 2 =*/58).string(message.newGuardData);
        if (message.agreementSessionUrl != null && $Object.hasOwnProperty.call(message, "agreementSessionUrl"))
            writer.uint32(/* id 8, wireType 2 =*/66).string(message.agreementSessionUrl);
        if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
            for (let i = 0; i < message.$unknowns.length; ++i)
                writer.raw(message.$unknowns[i]);
        return writer;
    };

    /**
     * Encodes the specified CAuthentication_PollAuthSessionStatus_Response message, length delimited. Does not implicitly {@link CAuthentication_PollAuthSessionStatus_Response.verify|verify} messages.
     * @function encodeDelimited
     * @memberof CAuthentication_PollAuthSessionStatus_Response
     * @static
     * @param {CAuthentication_PollAuthSessionStatus_Response.$Properties} message CAuthentication_PollAuthSessionStatus_Response message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CAuthentication_PollAuthSessionStatus_Response.encodeDelimited = function(message, writer) {
        return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
    };

    /**
     * Decodes a CAuthentication_PollAuthSessionStatus_Response message from the specified reader or buffer.
     * @function decode
     * @memberof CAuthentication_PollAuthSessionStatus_Response
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {CAuthentication_PollAuthSessionStatus_Response & CAuthentication_PollAuthSessionStatus_Response.$Shape} CAuthentication_PollAuthSessionStatus_Response
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CAuthentication_PollAuthSessionStatus_Response.decode = function (reader, length, _end, _depth, _target) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $Reader.recursionLimit)
            throw $Error("max depth exceeded");
        let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.CAuthentication_PollAuthSessionStatus_Response();
        while (reader.pos < end) {
            let start = reader.pos;
            let tag = reader.tag();
            if (tag === _end) {
                _end = $undefined;
                break;
            }
            let wireType = tag & 7;
            switch (tag >>>= 3) {
            case 1: {
                    if (wireType !== 0)
                        break;
                    message.newClientId = reader.uint64();
                    continue;
                }
            case 2: {
                    if (wireType !== 2)
                        break;
                    message.newChallengeUrl = reader.string();
                    continue;
                }
            case 3: {
                    if (wireType !== 2)
                        break;
                    message.refreshToken = reader.string();
                    continue;
                }
            case 4: {
                    if (wireType !== 2)
                        break;
                    message.accessToken = reader.string();
                    continue;
                }
            case 5: {
                    if (wireType !== 0)
                        break;
                    message.hadRemoteInteraction = reader.bool();
                    continue;
                }
            case 6: {
                    if (wireType !== 2)
                        break;
                    message.accountName = reader.string();
                    continue;
                }
            case 7: {
                    if (wireType !== 2)
                        break;
                    message.newGuardData = reader.string();
                    continue;
                }
            case 8: {
                    if (wireType !== 2)
                        break;
                    message.agreementSessionUrl = reader.string();
                    continue;
                }
            }
            reader.skipType(wireType, _depth, tag);
            if (!reader.discardUnknown) {
                $util.makeProp(message, "$unknowns", false);
                (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
            }
        }
        if (_end !== $undefined)
            throw $Error("missing end group");
        return message;
    };

    /**
     * Decodes a CAuthentication_PollAuthSessionStatus_Response message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof CAuthentication_PollAuthSessionStatus_Response
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {CAuthentication_PollAuthSessionStatus_Response & CAuthentication_PollAuthSessionStatus_Response.$Shape} CAuthentication_PollAuthSessionStatus_Response
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CAuthentication_PollAuthSessionStatus_Response.decodeDelimited = function(reader) {
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
    CAuthentication_PollAuthSessionStatus_Response.verify = function (message, _depth) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            return "max depth exceeded";
        if (message.newClientId != null && $Object.hasOwnProperty.call(message, "newClientId"))
            if (!$util.isInteger(message.newClientId) && !(message.newClientId && $util.isInteger(message.newClientId.low) && $util.isInteger(message.newClientId.high)))
                return "newClientId: integer|Long expected";
        if (message.newChallengeUrl != null && $Object.hasOwnProperty.call(message, "newChallengeUrl"))
            if (!$util.isString(message.newChallengeUrl))
                return "newChallengeUrl: string expected";
        if (message.refreshToken != null && $Object.hasOwnProperty.call(message, "refreshToken"))
            if (!$util.isString(message.refreshToken))
                return "refreshToken: string expected";
        if (message.accessToken != null && $Object.hasOwnProperty.call(message, "accessToken"))
            if (!$util.isString(message.accessToken))
                return "accessToken: string expected";
        if (message.hadRemoteInteraction != null && $Object.hasOwnProperty.call(message, "hadRemoteInteraction"))
            if (typeof message.hadRemoteInteraction !== "boolean")
                return "hadRemoteInteraction: boolean expected";
        if (message.accountName != null && $Object.hasOwnProperty.call(message, "accountName"))
            if (!$util.isString(message.accountName))
                return "accountName: string expected";
        if (message.newGuardData != null && $Object.hasOwnProperty.call(message, "newGuardData"))
            if (!$util.isString(message.newGuardData))
                return "newGuardData: string expected";
        if (message.agreementSessionUrl != null && $Object.hasOwnProperty.call(message, "agreementSessionUrl"))
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
    CAuthentication_PollAuthSessionStatus_Response.fromObject = function (object, _depth) {
        if (object instanceof $root.CAuthentication_PollAuthSessionStatus_Response)
            return object;
        if (!$util.isObject(object))
            throw $TypeError(".CAuthentication_PollAuthSessionStatus_Response: object expected");
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw $Error("max depth exceeded");
        let message = new $root.CAuthentication_PollAuthSessionStatus_Response();
        if (object.newClientId != null)
            if ($util.Long)
                message.newClientId = $util.Long.fromValue(object.newClientId, true);
            else if (typeof object.newClientId === "string")
                message.newClientId = $parseInt(object.newClientId, 10);
            else if (typeof object.newClientId === "number")
                message.newClientId = object.newClientId;
            else if (typeof object.newClientId === "object")
                message.newClientId = new $util.LongBits(object.newClientId.low >>> 0, object.newClientId.high >>> 0).toNumber(true);
        if (object.newChallengeUrl != null)
            message.newChallengeUrl = $String(object.newChallengeUrl);
        if (object.refreshToken != null)
            message.refreshToken = $String(object.refreshToken);
        if (object.accessToken != null)
            message.accessToken = $String(object.accessToken);
        if (object.hadRemoteInteraction != null)
            message.hadRemoteInteraction = $Boolean(object.hadRemoteInteraction);
        if (object.accountName != null)
            message.accountName = $String(object.accountName);
        if (object.newGuardData != null)
            message.newGuardData = $String(object.newGuardData);
        if (object.agreementSessionUrl != null)
            message.agreementSessionUrl = $String(object.agreementSessionUrl);
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
    CAuthentication_PollAuthSessionStatus_Response.toObject = function (message, options, _depth) {
        if (!options)
            options = {};
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw $Error("max depth exceeded");
        let object = {};
        if (options.defaults) {
            if ($util.Long) {
                let long = new $util.Long(0, 0, true);
                object.newClientId = options.longs === $String ? long.toString() : options.longs === $Number ? long.toNumber() : typeof $BigInt !== "undefined" && options.longs === $BigInt ? long.toBigInt() : long;
            } else
                object.newClientId = options.longs === $String ? "0" : typeof $BigInt !== "undefined" && options.longs === $BigInt ? $BigInt("0") : 0;
            object.newChallengeUrl = "";
            object.refreshToken = "";
            object.accessToken = "";
            object.hadRemoteInteraction = false;
            object.accountName = "";
            object.newGuardData = "";
            object.agreementSessionUrl = "";
        }
        if (message.newClientId != null && $Object.hasOwnProperty.call(message, "newClientId"))
            if (typeof $BigInt !== "undefined" && options.longs === $BigInt)
                object.newClientId = typeof message.newClientId === "number" ? $BigInt(message.newClientId) : $util.Long.fromBits(message.newClientId.low >>> 0, message.newClientId.high >>> 0, true).toBigInt();
            else if (typeof message.newClientId === "number")
                object.newClientId = options.longs === $String ? $String(message.newClientId) : message.newClientId;
            else
                object.newClientId = options.longs === $String ? $util.Long.prototype.toString.call(message.newClientId) : options.longs === $Number ? new $util.LongBits(message.newClientId.low >>> 0, message.newClientId.high >>> 0).toNumber(true) : message.newClientId;
        if (message.newChallengeUrl != null && $Object.hasOwnProperty.call(message, "newChallengeUrl"))
            object.newChallengeUrl = message.newChallengeUrl;
        if (message.refreshToken != null && $Object.hasOwnProperty.call(message, "refreshToken"))
            object.refreshToken = message.refreshToken;
        if (message.accessToken != null && $Object.hasOwnProperty.call(message, "accessToken"))
            object.accessToken = message.accessToken;
        if (message.hadRemoteInteraction != null && $Object.hasOwnProperty.call(message, "hadRemoteInteraction"))
            object.hadRemoteInteraction = message.hadRemoteInteraction;
        if (message.accountName != null && $Object.hasOwnProperty.call(message, "accountName"))
            object.accountName = message.accountName;
        if (message.newGuardData != null && $Object.hasOwnProperty.call(message, "newGuardData"))
            object.newGuardData = message.newGuardData;
        if (message.agreementSessionUrl != null && $Object.hasOwnProperty.call(message, "agreementSessionUrl"))
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
    CAuthentication_PollAuthSessionStatus_Response.prototype.toJSON = function() {
        return CAuthentication_PollAuthSessionStatus_Response.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the type url for CAuthentication_PollAuthSessionStatus_Response
     * @function getTypeUrl
     * @memberof CAuthentication_PollAuthSessionStatus_Response
     * @static
     * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
     * @returns {string} The type url
     */
    CAuthentication_PollAuthSessionStatus_Response.getTypeUrl = function(prefix) {
        if (prefix === $undefined)
            prefix = "type.googleapis.com";
        return prefix + "/CAuthentication_PollAuthSessionStatus_Response";
    };

    return CAuthentication_PollAuthSessionStatus_Response;
})();

export const CTwoFactor_AddAuthenticator_Request = $root.CTwoFactor_AddAuthenticator_Request = (() => {

    /**
     * Properties of a CTwoFactor_AddAuthenticator_Request.
     * @typedef {Object} CTwoFactor_AddAuthenticator_Request.$Properties
     * @property {number|Long|null} [steamid] CTwoFactor_AddAuthenticator_Request steamid
     * @property {number|Long|null} [authenticatorTime] CTwoFactor_AddAuthenticator_Request authenticatorTime
     * @property {number|Long|null} [serialNumber] CTwoFactor_AddAuthenticator_Request serialNumber
     * @property {number|null} [authenticatorType] CTwoFactor_AddAuthenticator_Request authenticatorType
     * @property {string|null} [deviceIdentifier] CTwoFactor_AddAuthenticator_Request deviceIdentifier
     * @property {string|null} [smsPhoneId] CTwoFactor_AddAuthenticator_Request smsPhoneId
     * @property {Array.<string>|null} [httpHeaders] CTwoFactor_AddAuthenticator_Request httpHeaders
     * @property {number|null} [version] CTwoFactor_AddAuthenticator_Request version
     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
     */

    /**
     * Properties of a CTwoFactor_AddAuthenticator_Request.
     * @exports ICTwoFactor_AddAuthenticator_Request
     * @interface ICTwoFactor_AddAuthenticator_Request
     * @augments CTwoFactor_AddAuthenticator_Request.$Properties
     * @deprecated Use CTwoFactor_AddAuthenticator_Request.$Properties instead.
     */

    /**
     * Shape of a CTwoFactor_AddAuthenticator_Request.
     * @typedef {CTwoFactor_AddAuthenticator_Request.$Properties} CTwoFactor_AddAuthenticator_Request.$Shape
     */

    /**
     * Constructs a new CTwoFactor_AddAuthenticator_Request.
     * @exports CTwoFactor_AddAuthenticator_Request
     * @classdesc Represents a CTwoFactor_AddAuthenticator_Request.
     * @constructor
     * @param {CTwoFactor_AddAuthenticator_Request.$Properties=} [properties] Properties to set
     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
     */
    const CTwoFactor_AddAuthenticator_Request = function (properties) {
        this.httpHeaders = [];
        if (properties)
            for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null && keys[i] !== "__proto__")
                    this[keys[i]] = properties[keys[i]];
    };

    /**
     * CTwoFactor_AddAuthenticator_Request steamid.
     * @member {number|Long} steamid
     * @memberof CTwoFactor_AddAuthenticator_Request
     * @instance
     */
    CTwoFactor_AddAuthenticator_Request.prototype.steamid = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

    /**
     * CTwoFactor_AddAuthenticator_Request authenticatorTime.
     * @member {number|Long} authenticatorTime
     * @memberof CTwoFactor_AddAuthenticator_Request
     * @instance
     */
    CTwoFactor_AddAuthenticator_Request.prototype.authenticatorTime = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

    /**
     * CTwoFactor_AddAuthenticator_Request serialNumber.
     * @member {number|Long} serialNumber
     * @memberof CTwoFactor_AddAuthenticator_Request
     * @instance
     */
    CTwoFactor_AddAuthenticator_Request.prototype.serialNumber = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

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
     * CTwoFactor_AddAuthenticator_Request smsPhoneId.
     * @member {string} smsPhoneId
     * @memberof CTwoFactor_AddAuthenticator_Request
     * @instance
     */
    CTwoFactor_AddAuthenticator_Request.prototype.smsPhoneId = "";

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
     * @param {CTwoFactor_AddAuthenticator_Request.$Properties=} [properties] Properties to set
     * @returns {CTwoFactor_AddAuthenticator_Request} CTwoFactor_AddAuthenticator_Request instance
     * @type {{
     *   (properties: CTwoFactor_AddAuthenticator_Request.$Shape): CTwoFactor_AddAuthenticator_Request & CTwoFactor_AddAuthenticator_Request.$Shape;
     *   (properties?: CTwoFactor_AddAuthenticator_Request.$Properties): CTwoFactor_AddAuthenticator_Request;
     * }}
     */
    CTwoFactor_AddAuthenticator_Request.create = function(properties) {
        return new CTwoFactor_AddAuthenticator_Request(properties);
    };

    /**
     * Encodes the specified CTwoFactor_AddAuthenticator_Request message. Does not implicitly {@link CTwoFactor_AddAuthenticator_Request.verify|verify} messages.
     * @function encode
     * @memberof CTwoFactor_AddAuthenticator_Request
     * @static
     * @param {CTwoFactor_AddAuthenticator_Request.$Properties} message CTwoFactor_AddAuthenticator_Request message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CTwoFactor_AddAuthenticator_Request.encode = function (message, writer, _depth) {
        if (!writer)
            writer = $Writer.create();
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw $Error("max depth exceeded");
        if (message.steamid != null && $Object.hasOwnProperty.call(message, "steamid"))
            writer.uint32(/* id 1, wireType 1 =*/9).fixed64(message.steamid);
        if (message.authenticatorTime != null && $Object.hasOwnProperty.call(message, "authenticatorTime"))
            writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.authenticatorTime);
        if (message.serialNumber != null && $Object.hasOwnProperty.call(message, "serialNumber"))
            writer.uint32(/* id 3, wireType 1 =*/25).fixed64(message.serialNumber);
        if (message.authenticatorType != null && $Object.hasOwnProperty.call(message, "authenticatorType"))
            writer.uint32(/* id 4, wireType 0 =*/32).uint32(message.authenticatorType);
        if (message.deviceIdentifier != null && $Object.hasOwnProperty.call(message, "deviceIdentifier"))
            writer.uint32(/* id 5, wireType 2 =*/42).string(message.deviceIdentifier);
        if (message.smsPhoneId != null && $Object.hasOwnProperty.call(message, "smsPhoneId"))
            writer.uint32(/* id 6, wireType 2 =*/50).string(message.smsPhoneId);
        if (message.httpHeaders != null && message.httpHeaders.length)
            for (let i = 0; i < message.httpHeaders.length; ++i)
                writer.uint32(/* id 7, wireType 2 =*/58).string(message.httpHeaders[i]);
        if (message.version != null && $Object.hasOwnProperty.call(message, "version"))
            writer.uint32(/* id 8, wireType 0 =*/64).uint32(message.version);
        if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
            for (let i = 0; i < message.$unknowns.length; ++i)
                writer.raw(message.$unknowns[i]);
        return writer;
    };

    /**
     * Encodes the specified CTwoFactor_AddAuthenticator_Request message, length delimited. Does not implicitly {@link CTwoFactor_AddAuthenticator_Request.verify|verify} messages.
     * @function encodeDelimited
     * @memberof CTwoFactor_AddAuthenticator_Request
     * @static
     * @param {CTwoFactor_AddAuthenticator_Request.$Properties} message CTwoFactor_AddAuthenticator_Request message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CTwoFactor_AddAuthenticator_Request.encodeDelimited = function(message, writer) {
        return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
    };

    /**
     * Decodes a CTwoFactor_AddAuthenticator_Request message from the specified reader or buffer.
     * @function decode
     * @memberof CTwoFactor_AddAuthenticator_Request
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {CTwoFactor_AddAuthenticator_Request & CTwoFactor_AddAuthenticator_Request.$Shape} CTwoFactor_AddAuthenticator_Request
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CTwoFactor_AddAuthenticator_Request.decode = function (reader, length, _end, _depth, _target) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $Reader.recursionLimit)
            throw $Error("max depth exceeded");
        let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.CTwoFactor_AddAuthenticator_Request();
        while (reader.pos < end) {
            let start = reader.pos;
            let tag = reader.tag();
            if (tag === _end) {
                _end = $undefined;
                break;
            }
            let wireType = tag & 7;
            switch (tag >>>= 3) {
            case 1: {
                    if (wireType !== 1)
                        break;
                    message.steamid = reader.fixed64();
                    continue;
                }
            case 2: {
                    if (wireType !== 0)
                        break;
                    message.authenticatorTime = reader.uint64();
                    continue;
                }
            case 3: {
                    if (wireType !== 1)
                        break;
                    message.serialNumber = reader.fixed64();
                    continue;
                }
            case 4: {
                    if (wireType !== 0)
                        break;
                    message.authenticatorType = reader.uint32();
                    continue;
                }
            case 5: {
                    if (wireType !== 2)
                        break;
                    message.deviceIdentifier = reader.string();
                    continue;
                }
            case 6: {
                    if (wireType !== 2)
                        break;
                    message.smsPhoneId = reader.string();
                    continue;
                }
            case 7: {
                    if (wireType !== 2)
                        break;
                    if (!(message.httpHeaders && message.httpHeaders.length))
                        message.httpHeaders = [];
                    message.httpHeaders.push(reader.string());
                    continue;
                }
            case 8: {
                    if (wireType !== 0)
                        break;
                    message.version = reader.uint32();
                    continue;
                }
            }
            reader.skipType(wireType, _depth, tag);
            if (!reader.discardUnknown) {
                $util.makeProp(message, "$unknowns", false);
                (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
            }
        }
        if (_end !== $undefined)
            throw $Error("missing end group");
        return message;
    };

    /**
     * Decodes a CTwoFactor_AddAuthenticator_Request message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof CTwoFactor_AddAuthenticator_Request
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {CTwoFactor_AddAuthenticator_Request & CTwoFactor_AddAuthenticator_Request.$Shape} CTwoFactor_AddAuthenticator_Request
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CTwoFactor_AddAuthenticator_Request.decodeDelimited = function(reader) {
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
    CTwoFactor_AddAuthenticator_Request.verify = function (message, _depth) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            return "max depth exceeded";
        if (message.steamid != null && $Object.hasOwnProperty.call(message, "steamid"))
            if (!$util.isInteger(message.steamid) && !(message.steamid && $util.isInteger(message.steamid.low) && $util.isInteger(message.steamid.high)))
                return "steamid: integer|Long expected";
        if (message.authenticatorTime != null && $Object.hasOwnProperty.call(message, "authenticatorTime"))
            if (!$util.isInteger(message.authenticatorTime) && !(message.authenticatorTime && $util.isInteger(message.authenticatorTime.low) && $util.isInteger(message.authenticatorTime.high)))
                return "authenticatorTime: integer|Long expected";
        if (message.serialNumber != null && $Object.hasOwnProperty.call(message, "serialNumber"))
            if (!$util.isInteger(message.serialNumber) && !(message.serialNumber && $util.isInteger(message.serialNumber.low) && $util.isInteger(message.serialNumber.high)))
                return "serialNumber: integer|Long expected";
        if (message.authenticatorType != null && $Object.hasOwnProperty.call(message, "authenticatorType"))
            if (!$util.isInteger(message.authenticatorType))
                return "authenticatorType: integer expected";
        if (message.deviceIdentifier != null && $Object.hasOwnProperty.call(message, "deviceIdentifier"))
            if (!$util.isString(message.deviceIdentifier))
                return "deviceIdentifier: string expected";
        if (message.smsPhoneId != null && $Object.hasOwnProperty.call(message, "smsPhoneId"))
            if (!$util.isString(message.smsPhoneId))
                return "smsPhoneId: string expected";
        if (message.httpHeaders != null && $Object.hasOwnProperty.call(message, "httpHeaders")) {
            if (!$Array.isArray(message.httpHeaders))
                return "httpHeaders: array expected";
            for (let i = 0; i < message.httpHeaders.length; ++i)
                if (!$util.isString(message.httpHeaders[i]))
                    return "httpHeaders: string[] expected";
        }
        if (message.version != null && $Object.hasOwnProperty.call(message, "version"))
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
    CTwoFactor_AddAuthenticator_Request.fromObject = function (object, _depth) {
        if (object instanceof $root.CTwoFactor_AddAuthenticator_Request)
            return object;
        if (!$util.isObject(object))
            throw $TypeError(".CTwoFactor_AddAuthenticator_Request: object expected");
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw $Error("max depth exceeded");
        let message = new $root.CTwoFactor_AddAuthenticator_Request();
        if (object.steamid != null)
            if ($util.Long)
                message.steamid = $util.Long.fromValue(object.steamid, true);
            else if (typeof object.steamid === "string")
                message.steamid = $parseInt(object.steamid, 10);
            else if (typeof object.steamid === "number")
                message.steamid = object.steamid;
            else if (typeof object.steamid === "object")
                message.steamid = new $util.LongBits(object.steamid.low >>> 0, object.steamid.high >>> 0).toNumber(true);
        if (object.authenticatorTime != null)
            if ($util.Long)
                message.authenticatorTime = $util.Long.fromValue(object.authenticatorTime, true);
            else if (typeof object.authenticatorTime === "string")
                message.authenticatorTime = $parseInt(object.authenticatorTime, 10);
            else if (typeof object.authenticatorTime === "number")
                message.authenticatorTime = object.authenticatorTime;
            else if (typeof object.authenticatorTime === "object")
                message.authenticatorTime = new $util.LongBits(object.authenticatorTime.low >>> 0, object.authenticatorTime.high >>> 0).toNumber(true);
        if (object.serialNumber != null)
            if ($util.Long)
                message.serialNumber = $util.Long.fromValue(object.serialNumber, true);
            else if (typeof object.serialNumber === "string")
                message.serialNumber = $parseInt(object.serialNumber, 10);
            else if (typeof object.serialNumber === "number")
                message.serialNumber = object.serialNumber;
            else if (typeof object.serialNumber === "object")
                message.serialNumber = new $util.LongBits(object.serialNumber.low >>> 0, object.serialNumber.high >>> 0).toNumber(true);
        if (object.authenticatorType != null)
            message.authenticatorType = object.authenticatorType >>> 0;
        if (object.deviceIdentifier != null)
            message.deviceIdentifier = $String(object.deviceIdentifier);
        if (object.smsPhoneId != null)
            message.smsPhoneId = $String(object.smsPhoneId);
        if (object.httpHeaders) {
            if (!$Array.isArray(object.httpHeaders))
                throw $TypeError(".CTwoFactor_AddAuthenticator_Request.httpHeaders: array expected");
            message.httpHeaders = $Array(object.httpHeaders.length);
            for (let i = 0; i < object.httpHeaders.length; ++i)
                message.httpHeaders[i] = $String(object.httpHeaders[i]);
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
    CTwoFactor_AddAuthenticator_Request.toObject = function (message, options, _depth) {
        if (!options)
            options = {};
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw $Error("max depth exceeded");
        let object = {};
        if (options.arrays || options.defaults)
            object.httpHeaders = [];
        if (options.defaults) {
            if ($util.Long) {
                let long = new $util.Long(0, 0, true);
                object.steamid = options.longs === $String ? long.toString() : options.longs === $Number ? long.toNumber() : typeof $BigInt !== "undefined" && options.longs === $BigInt ? long.toBigInt() : long;
            } else
                object.steamid = options.longs === $String ? "0" : typeof $BigInt !== "undefined" && options.longs === $BigInt ? $BigInt("0") : 0;
            if ($util.Long) {
                let long = new $util.Long(0, 0, true);
                object.authenticatorTime = options.longs === $String ? long.toString() : options.longs === $Number ? long.toNumber() : typeof $BigInt !== "undefined" && options.longs === $BigInt ? long.toBigInt() : long;
            } else
                object.authenticatorTime = options.longs === $String ? "0" : typeof $BigInt !== "undefined" && options.longs === $BigInt ? $BigInt("0") : 0;
            if ($util.Long) {
                let long = new $util.Long(0, 0, true);
                object.serialNumber = options.longs === $String ? long.toString() : options.longs === $Number ? long.toNumber() : typeof $BigInt !== "undefined" && options.longs === $BigInt ? long.toBigInt() : long;
            } else
                object.serialNumber = options.longs === $String ? "0" : typeof $BigInt !== "undefined" && options.longs === $BigInt ? $BigInt("0") : 0;
            object.authenticatorType = 0;
            object.deviceIdentifier = "";
            object.smsPhoneId = "";
            object.version = 1;
        }
        if (message.steamid != null && $Object.hasOwnProperty.call(message, "steamid"))
            if (typeof $BigInt !== "undefined" && options.longs === $BigInt)
                object.steamid = typeof message.steamid === "number" ? $BigInt(message.steamid) : $util.Long.fromBits(message.steamid.low >>> 0, message.steamid.high >>> 0, true).toBigInt();
            else if (typeof message.steamid === "number")
                object.steamid = options.longs === $String ? $String(message.steamid) : message.steamid;
            else
                object.steamid = options.longs === $String ? $util.Long.prototype.toString.call(message.steamid) : options.longs === $Number ? new $util.LongBits(message.steamid.low >>> 0, message.steamid.high >>> 0).toNumber(true) : message.steamid;
        if (message.authenticatorTime != null && $Object.hasOwnProperty.call(message, "authenticatorTime"))
            if (typeof $BigInt !== "undefined" && options.longs === $BigInt)
                object.authenticatorTime = typeof message.authenticatorTime === "number" ? $BigInt(message.authenticatorTime) : $util.Long.fromBits(message.authenticatorTime.low >>> 0, message.authenticatorTime.high >>> 0, true).toBigInt();
            else if (typeof message.authenticatorTime === "number")
                object.authenticatorTime = options.longs === $String ? $String(message.authenticatorTime) : message.authenticatorTime;
            else
                object.authenticatorTime = options.longs === $String ? $util.Long.prototype.toString.call(message.authenticatorTime) : options.longs === $Number ? new $util.LongBits(message.authenticatorTime.low >>> 0, message.authenticatorTime.high >>> 0).toNumber(true) : message.authenticatorTime;
        if (message.serialNumber != null && $Object.hasOwnProperty.call(message, "serialNumber"))
            if (typeof $BigInt !== "undefined" && options.longs === $BigInt)
                object.serialNumber = typeof message.serialNumber === "number" ? $BigInt(message.serialNumber) : $util.Long.fromBits(message.serialNumber.low >>> 0, message.serialNumber.high >>> 0, true).toBigInt();
            else if (typeof message.serialNumber === "number")
                object.serialNumber = options.longs === $String ? $String(message.serialNumber) : message.serialNumber;
            else
                object.serialNumber = options.longs === $String ? $util.Long.prototype.toString.call(message.serialNumber) : options.longs === $Number ? new $util.LongBits(message.serialNumber.low >>> 0, message.serialNumber.high >>> 0).toNumber(true) : message.serialNumber;
        if (message.authenticatorType != null && $Object.hasOwnProperty.call(message, "authenticatorType"))
            object.authenticatorType = message.authenticatorType;
        if (message.deviceIdentifier != null && $Object.hasOwnProperty.call(message, "deviceIdentifier"))
            object.deviceIdentifier = message.deviceIdentifier;
        if (message.smsPhoneId != null && $Object.hasOwnProperty.call(message, "smsPhoneId"))
            object.smsPhoneId = message.smsPhoneId;
        if (message.httpHeaders && message.httpHeaders.length) {
            object.httpHeaders = $Array(message.httpHeaders.length);
            for (let j = 0; j < message.httpHeaders.length; ++j)
                object.httpHeaders[j] = message.httpHeaders[j];
        }
        if (message.version != null && $Object.hasOwnProperty.call(message, "version"))
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
    CTwoFactor_AddAuthenticator_Request.prototype.toJSON = function() {
        return CTwoFactor_AddAuthenticator_Request.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the type url for CTwoFactor_AddAuthenticator_Request
     * @function getTypeUrl
     * @memberof CTwoFactor_AddAuthenticator_Request
     * @static
     * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
     * @returns {string} The type url
     */
    CTwoFactor_AddAuthenticator_Request.getTypeUrl = function(prefix) {
        if (prefix === $undefined)
            prefix = "type.googleapis.com";
        return prefix + "/CTwoFactor_AddAuthenticator_Request";
    };

    return CTwoFactor_AddAuthenticator_Request;
})();

export const CTwoFactor_AddAuthenticator_Response = $root.CTwoFactor_AddAuthenticator_Response = (() => {

    /**
     * Properties of a CTwoFactor_AddAuthenticator_Response.
     * @typedef {Object} CTwoFactor_AddAuthenticator_Response.$Properties
     * @property {Uint8Array|null} [sharedSecret] CTwoFactor_AddAuthenticator_Response sharedSecret
     * @property {number|Long|null} [serialNumber] CTwoFactor_AddAuthenticator_Response serialNumber
     * @property {string|null} [revocationCode] CTwoFactor_AddAuthenticator_Response revocationCode
     * @property {string|null} [uri] CTwoFactor_AddAuthenticator_Response uri
     * @property {number|Long|null} [serverTime] CTwoFactor_AddAuthenticator_Response serverTime
     * @property {string|null} [accountName] CTwoFactor_AddAuthenticator_Response accountName
     * @property {string|null} [tokenGid] CTwoFactor_AddAuthenticator_Response tokenGid
     * @property {Uint8Array|null} [identitySecret] CTwoFactor_AddAuthenticator_Response identitySecret
     * @property {Uint8Array|null} [secret_1] CTwoFactor_AddAuthenticator_Response secret_1
     * @property {number|null} [status] CTwoFactor_AddAuthenticator_Response status
     * @property {string|null} [phoneNumberHint] CTwoFactor_AddAuthenticator_Response phoneNumberHint
     * @property {number|null} [confirmType] CTwoFactor_AddAuthenticator_Response confirmType
     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
     */

    /**
     * Properties of a CTwoFactor_AddAuthenticator_Response.
     * @exports ICTwoFactor_AddAuthenticator_Response
     * @interface ICTwoFactor_AddAuthenticator_Response
     * @augments CTwoFactor_AddAuthenticator_Response.$Properties
     * @deprecated Use CTwoFactor_AddAuthenticator_Response.$Properties instead.
     */

    /**
     * Shape of a CTwoFactor_AddAuthenticator_Response.
     * @typedef {CTwoFactor_AddAuthenticator_Response.$Properties} CTwoFactor_AddAuthenticator_Response.$Shape
     */

    /**
     * Constructs a new CTwoFactor_AddAuthenticator_Response.
     * @exports CTwoFactor_AddAuthenticator_Response
     * @classdesc Represents a CTwoFactor_AddAuthenticator_Response.
     * @constructor
     * @param {CTwoFactor_AddAuthenticator_Response.$Properties=} [properties] Properties to set
     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
     */
    const CTwoFactor_AddAuthenticator_Response = function (properties) {
        if (properties)
            for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null && keys[i] !== "__proto__")
                    this[keys[i]] = properties[keys[i]];
    };

    /**
     * CTwoFactor_AddAuthenticator_Response sharedSecret.
     * @member {Uint8Array} sharedSecret
     * @memberof CTwoFactor_AddAuthenticator_Response
     * @instance
     */
    CTwoFactor_AddAuthenticator_Response.prototype.sharedSecret = $util.newBuffer([]);

    /**
     * CTwoFactor_AddAuthenticator_Response serialNumber.
     * @member {number|Long} serialNumber
     * @memberof CTwoFactor_AddAuthenticator_Response
     * @instance
     */
    CTwoFactor_AddAuthenticator_Response.prototype.serialNumber = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

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
     * @member {number|Long} serverTime
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
     * @param {CTwoFactor_AddAuthenticator_Response.$Properties=} [properties] Properties to set
     * @returns {CTwoFactor_AddAuthenticator_Response} CTwoFactor_AddAuthenticator_Response instance
     * @type {{
     *   (properties: CTwoFactor_AddAuthenticator_Response.$Shape): CTwoFactor_AddAuthenticator_Response & CTwoFactor_AddAuthenticator_Response.$Shape;
     *   (properties?: CTwoFactor_AddAuthenticator_Response.$Properties): CTwoFactor_AddAuthenticator_Response;
     * }}
     */
    CTwoFactor_AddAuthenticator_Response.create = function(properties) {
        return new CTwoFactor_AddAuthenticator_Response(properties);
    };

    /**
     * Encodes the specified CTwoFactor_AddAuthenticator_Response message. Does not implicitly {@link CTwoFactor_AddAuthenticator_Response.verify|verify} messages.
     * @function encode
     * @memberof CTwoFactor_AddAuthenticator_Response
     * @static
     * @param {CTwoFactor_AddAuthenticator_Response.$Properties} message CTwoFactor_AddAuthenticator_Response message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CTwoFactor_AddAuthenticator_Response.encode = function (message, writer, _depth) {
        if (!writer)
            writer = $Writer.create();
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw $Error("max depth exceeded");
        if (message.sharedSecret != null && $Object.hasOwnProperty.call(message, "sharedSecret"))
            writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.sharedSecret);
        if (message.serialNumber != null && $Object.hasOwnProperty.call(message, "serialNumber"))
            writer.uint32(/* id 2, wireType 1 =*/17).fixed64(message.serialNumber);
        if (message.revocationCode != null && $Object.hasOwnProperty.call(message, "revocationCode"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.revocationCode);
        if (message.uri != null && $Object.hasOwnProperty.call(message, "uri"))
            writer.uint32(/* id 4, wireType 2 =*/34).string(message.uri);
        if (message.serverTime != null && $Object.hasOwnProperty.call(message, "serverTime"))
            writer.uint32(/* id 5, wireType 0 =*/40).uint64(message.serverTime);
        if (message.accountName != null && $Object.hasOwnProperty.call(message, "accountName"))
            writer.uint32(/* id 6, wireType 2 =*/50).string(message.accountName);
        if (message.tokenGid != null && $Object.hasOwnProperty.call(message, "tokenGid"))
            writer.uint32(/* id 7, wireType 2 =*/58).string(message.tokenGid);
        if (message.identitySecret != null && $Object.hasOwnProperty.call(message, "identitySecret"))
            writer.uint32(/* id 8, wireType 2 =*/66).bytes(message.identitySecret);
        if (message.secret_1 != null && $Object.hasOwnProperty.call(message, "secret_1"))
            writer.uint32(/* id 9, wireType 2 =*/74).bytes(message.secret_1);
        if (message.status != null && $Object.hasOwnProperty.call(message, "status"))
            writer.uint32(/* id 10, wireType 0 =*/80).int32(message.status);
        if (message.phoneNumberHint != null && $Object.hasOwnProperty.call(message, "phoneNumberHint"))
            writer.uint32(/* id 11, wireType 2 =*/90).string(message.phoneNumberHint);
        if (message.confirmType != null && $Object.hasOwnProperty.call(message, "confirmType"))
            writer.uint32(/* id 12, wireType 0 =*/96).int32(message.confirmType);
        if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
            for (let i = 0; i < message.$unknowns.length; ++i)
                writer.raw(message.$unknowns[i]);
        return writer;
    };

    /**
     * Encodes the specified CTwoFactor_AddAuthenticator_Response message, length delimited. Does not implicitly {@link CTwoFactor_AddAuthenticator_Response.verify|verify} messages.
     * @function encodeDelimited
     * @memberof CTwoFactor_AddAuthenticator_Response
     * @static
     * @param {CTwoFactor_AddAuthenticator_Response.$Properties} message CTwoFactor_AddAuthenticator_Response message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CTwoFactor_AddAuthenticator_Response.encodeDelimited = function(message, writer) {
        return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
    };

    /**
     * Decodes a CTwoFactor_AddAuthenticator_Response message from the specified reader or buffer.
     * @function decode
     * @memberof CTwoFactor_AddAuthenticator_Response
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {CTwoFactor_AddAuthenticator_Response & CTwoFactor_AddAuthenticator_Response.$Shape} CTwoFactor_AddAuthenticator_Response
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CTwoFactor_AddAuthenticator_Response.decode = function (reader, length, _end, _depth, _target) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $Reader.recursionLimit)
            throw $Error("max depth exceeded");
        let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.CTwoFactor_AddAuthenticator_Response();
        while (reader.pos < end) {
            let start = reader.pos;
            let tag = reader.tag();
            if (tag === _end) {
                _end = $undefined;
                break;
            }
            let wireType = tag & 7;
            switch (tag >>>= 3) {
            case 1: {
                    if (wireType !== 2)
                        break;
                    message.sharedSecret = reader.bytes();
                    continue;
                }
            case 2: {
                    if (wireType !== 1)
                        break;
                    message.serialNumber = reader.fixed64();
                    continue;
                }
            case 3: {
                    if (wireType !== 2)
                        break;
                    message.revocationCode = reader.string();
                    continue;
                }
            case 4: {
                    if (wireType !== 2)
                        break;
                    message.uri = reader.string();
                    continue;
                }
            case 5: {
                    if (wireType !== 0)
                        break;
                    message.serverTime = reader.uint64();
                    continue;
                }
            case 6: {
                    if (wireType !== 2)
                        break;
                    message.accountName = reader.string();
                    continue;
                }
            case 7: {
                    if (wireType !== 2)
                        break;
                    message.tokenGid = reader.string();
                    continue;
                }
            case 8: {
                    if (wireType !== 2)
                        break;
                    message.identitySecret = reader.bytes();
                    continue;
                }
            case 9: {
                    if (wireType !== 2)
                        break;
                    message.secret_1 = reader.bytes();
                    continue;
                }
            case 10: {
                    if (wireType !== 0)
                        break;
                    message.status = reader.int32();
                    continue;
                }
            case 11: {
                    if (wireType !== 2)
                        break;
                    message.phoneNumberHint = reader.string();
                    continue;
                }
            case 12: {
                    if (wireType !== 0)
                        break;
                    message.confirmType = reader.int32();
                    continue;
                }
            }
            reader.skipType(wireType, _depth, tag);
            if (!reader.discardUnknown) {
                $util.makeProp(message, "$unknowns", false);
                (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
            }
        }
        if (_end !== $undefined)
            throw $Error("missing end group");
        return message;
    };

    /**
     * Decodes a CTwoFactor_AddAuthenticator_Response message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof CTwoFactor_AddAuthenticator_Response
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {CTwoFactor_AddAuthenticator_Response & CTwoFactor_AddAuthenticator_Response.$Shape} CTwoFactor_AddAuthenticator_Response
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CTwoFactor_AddAuthenticator_Response.decodeDelimited = function(reader) {
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
    CTwoFactor_AddAuthenticator_Response.verify = function (message, _depth) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            return "max depth exceeded";
        if (message.sharedSecret != null && $Object.hasOwnProperty.call(message, "sharedSecret"))
            if (!(message.sharedSecret && typeof message.sharedSecret.length === "number" || $util.isString(message.sharedSecret)))
                return "sharedSecret: buffer expected";
        if (message.serialNumber != null && $Object.hasOwnProperty.call(message, "serialNumber"))
            if (!$util.isInteger(message.serialNumber) && !(message.serialNumber && $util.isInteger(message.serialNumber.low) && $util.isInteger(message.serialNumber.high)))
                return "serialNumber: integer|Long expected";
        if (message.revocationCode != null && $Object.hasOwnProperty.call(message, "revocationCode"))
            if (!$util.isString(message.revocationCode))
                return "revocationCode: string expected";
        if (message.uri != null && $Object.hasOwnProperty.call(message, "uri"))
            if (!$util.isString(message.uri))
                return "uri: string expected";
        if (message.serverTime != null && $Object.hasOwnProperty.call(message, "serverTime"))
            if (!$util.isInteger(message.serverTime) && !(message.serverTime && $util.isInteger(message.serverTime.low) && $util.isInteger(message.serverTime.high)))
                return "serverTime: integer|Long expected";
        if (message.accountName != null && $Object.hasOwnProperty.call(message, "accountName"))
            if (!$util.isString(message.accountName))
                return "accountName: string expected";
        if (message.tokenGid != null && $Object.hasOwnProperty.call(message, "tokenGid"))
            if (!$util.isString(message.tokenGid))
                return "tokenGid: string expected";
        if (message.identitySecret != null && $Object.hasOwnProperty.call(message, "identitySecret"))
            if (!(message.identitySecret && typeof message.identitySecret.length === "number" || $util.isString(message.identitySecret)))
                return "identitySecret: buffer expected";
        if (message.secret_1 != null && $Object.hasOwnProperty.call(message, "secret_1"))
            if (!(message.secret_1 && typeof message.secret_1.length === "number" || $util.isString(message.secret_1)))
                return "secret_1: buffer expected";
        if (message.status != null && $Object.hasOwnProperty.call(message, "status"))
            if (!$util.isInteger(message.status))
                return "status: integer expected";
        if (message.phoneNumberHint != null && $Object.hasOwnProperty.call(message, "phoneNumberHint"))
            if (!$util.isString(message.phoneNumberHint))
                return "phoneNumberHint: string expected";
        if (message.confirmType != null && $Object.hasOwnProperty.call(message, "confirmType"))
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
    CTwoFactor_AddAuthenticator_Response.fromObject = function (object, _depth) {
        if (object instanceof $root.CTwoFactor_AddAuthenticator_Response)
            return object;
        if (!$util.isObject(object))
            throw $TypeError(".CTwoFactor_AddAuthenticator_Response: object expected");
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw $Error("max depth exceeded");
        let message = new $root.CTwoFactor_AddAuthenticator_Response();
        if (object.sharedSecret != null)
            if (typeof object.sharedSecret === "string")
                $util.base64.decode(object.sharedSecret, message.sharedSecret = $util.newBuffer($util.base64.length(object.sharedSecret)), 0);
            else if (object.sharedSecret.length >= 0)
                message.sharedSecret = object.sharedSecret;
        if (object.serialNumber != null)
            if ($util.Long)
                message.serialNumber = $util.Long.fromValue(object.serialNumber, true);
            else if (typeof object.serialNumber === "string")
                message.serialNumber = $parseInt(object.serialNumber, 10);
            else if (typeof object.serialNumber === "number")
                message.serialNumber = object.serialNumber;
            else if (typeof object.serialNumber === "object")
                message.serialNumber = new $util.LongBits(object.serialNumber.low >>> 0, object.serialNumber.high >>> 0).toNumber(true);
        if (object.revocationCode != null)
            message.revocationCode = $String(object.revocationCode);
        if (object.uri != null)
            message.uri = $String(object.uri);
        if (object.serverTime != null)
            if ($util.Long)
                message.serverTime = $util.Long.fromValue(object.serverTime, true);
            else if (typeof object.serverTime === "string")
                message.serverTime = $parseInt(object.serverTime, 10);
            else if (typeof object.serverTime === "number")
                message.serverTime = object.serverTime;
            else if (typeof object.serverTime === "object")
                message.serverTime = new $util.LongBits(object.serverTime.low >>> 0, object.serverTime.high >>> 0).toNumber(true);
        if (object.accountName != null)
            message.accountName = $String(object.accountName);
        if (object.tokenGid != null)
            message.tokenGid = $String(object.tokenGid);
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
            message.phoneNumberHint = $String(object.phoneNumberHint);
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
    CTwoFactor_AddAuthenticator_Response.toObject = function (message, options, _depth) {
        if (!options)
            options = {};
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw $Error("max depth exceeded");
        let object = {};
        if (options.defaults) {
            if (options.bytes === $String)
                object.sharedSecret = "";
            else {
                object.sharedSecret = [];
                if (options.bytes !== $Array)
                    object.sharedSecret = $util.newBuffer(object.sharedSecret);
            }
            if ($util.Long) {
                let long = new $util.Long(0, 0, true);
                object.serialNumber = options.longs === $String ? long.toString() : options.longs === $Number ? long.toNumber() : typeof $BigInt !== "undefined" && options.longs === $BigInt ? long.toBigInt() : long;
            } else
                object.serialNumber = options.longs === $String ? "0" : typeof $BigInt !== "undefined" && options.longs === $BigInt ? $BigInt("0") : 0;
            object.revocationCode = "";
            object.uri = "";
            if ($util.Long) {
                let long = new $util.Long(0, 0, true);
                object.serverTime = options.longs === $String ? long.toString() : options.longs === $Number ? long.toNumber() : typeof $BigInt !== "undefined" && options.longs === $BigInt ? long.toBigInt() : long;
            } else
                object.serverTime = options.longs === $String ? "0" : typeof $BigInt !== "undefined" && options.longs === $BigInt ? $BigInt("0") : 0;
            object.accountName = "";
            object.tokenGid = "";
            if (options.bytes === $String)
                object.identitySecret = "";
            else {
                object.identitySecret = [];
                if (options.bytes !== $Array)
                    object.identitySecret = $util.newBuffer(object.identitySecret);
            }
            if (options.bytes === $String)
                object.secret_1 = "";
            else {
                object.secret_1 = [];
                if (options.bytes !== $Array)
                    object.secret_1 = $util.newBuffer(object.secret_1);
            }
            object.status = 0;
            object.phoneNumberHint = "";
            object.confirmType = 0;
        }
        if (message.sharedSecret != null && $Object.hasOwnProperty.call(message, "sharedSecret"))
            object.sharedSecret = options.bytes === $String ? $util.base64.encode(message.sharedSecret, 0, message.sharedSecret.length) : options.bytes === $Array ? $Array.prototype.slice.call(message.sharedSecret) : message.sharedSecret;
        if (message.serialNumber != null && $Object.hasOwnProperty.call(message, "serialNumber"))
            if (typeof $BigInt !== "undefined" && options.longs === $BigInt)
                object.serialNumber = typeof message.serialNumber === "number" ? $BigInt(message.serialNumber) : $util.Long.fromBits(message.serialNumber.low >>> 0, message.serialNumber.high >>> 0, true).toBigInt();
            else if (typeof message.serialNumber === "number")
                object.serialNumber = options.longs === $String ? $String(message.serialNumber) : message.serialNumber;
            else
                object.serialNumber = options.longs === $String ? $util.Long.prototype.toString.call(message.serialNumber) : options.longs === $Number ? new $util.LongBits(message.serialNumber.low >>> 0, message.serialNumber.high >>> 0).toNumber(true) : message.serialNumber;
        if (message.revocationCode != null && $Object.hasOwnProperty.call(message, "revocationCode"))
            object.revocationCode = message.revocationCode;
        if (message.uri != null && $Object.hasOwnProperty.call(message, "uri"))
            object.uri = message.uri;
        if (message.serverTime != null && $Object.hasOwnProperty.call(message, "serverTime"))
            if (typeof $BigInt !== "undefined" && options.longs === $BigInt)
                object.serverTime = typeof message.serverTime === "number" ? $BigInt(message.serverTime) : $util.Long.fromBits(message.serverTime.low >>> 0, message.serverTime.high >>> 0, true).toBigInt();
            else if (typeof message.serverTime === "number")
                object.serverTime = options.longs === $String ? $String(message.serverTime) : message.serverTime;
            else
                object.serverTime = options.longs === $String ? $util.Long.prototype.toString.call(message.serverTime) : options.longs === $Number ? new $util.LongBits(message.serverTime.low >>> 0, message.serverTime.high >>> 0).toNumber(true) : message.serverTime;
        if (message.accountName != null && $Object.hasOwnProperty.call(message, "accountName"))
            object.accountName = message.accountName;
        if (message.tokenGid != null && $Object.hasOwnProperty.call(message, "tokenGid"))
            object.tokenGid = message.tokenGid;
        if (message.identitySecret != null && $Object.hasOwnProperty.call(message, "identitySecret"))
            object.identitySecret = options.bytes === $String ? $util.base64.encode(message.identitySecret, 0, message.identitySecret.length) : options.bytes === $Array ? $Array.prototype.slice.call(message.identitySecret) : message.identitySecret;
        if (message.secret_1 != null && $Object.hasOwnProperty.call(message, "secret_1"))
            object.secret_1 = options.bytes === $String ? $util.base64.encode(message.secret_1, 0, message.secret_1.length) : options.bytes === $Array ? $Array.prototype.slice.call(message.secret_1) : message.secret_1;
        if (message.status != null && $Object.hasOwnProperty.call(message, "status"))
            object.status = message.status;
        if (message.phoneNumberHint != null && $Object.hasOwnProperty.call(message, "phoneNumberHint"))
            object.phoneNumberHint = message.phoneNumberHint;
        if (message.confirmType != null && $Object.hasOwnProperty.call(message, "confirmType"))
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
    CTwoFactor_AddAuthenticator_Response.prototype.toJSON = function() {
        return CTwoFactor_AddAuthenticator_Response.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the type url for CTwoFactor_AddAuthenticator_Response
     * @function getTypeUrl
     * @memberof CTwoFactor_AddAuthenticator_Response
     * @static
     * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
     * @returns {string} The type url
     */
    CTwoFactor_AddAuthenticator_Response.getTypeUrl = function(prefix) {
        if (prefix === $undefined)
            prefix = "type.googleapis.com";
        return prefix + "/CTwoFactor_AddAuthenticator_Response";
    };

    return CTwoFactor_AddAuthenticator_Response;
})();

export const CTwoFactor_FinalizeAddAuthenticator_Request = $root.CTwoFactor_FinalizeAddAuthenticator_Request = (() => {

    /**
     * Properties of a CTwoFactor_FinalizeAddAuthenticator_Request.
     * @typedef {Object} CTwoFactor_FinalizeAddAuthenticator_Request.$Properties
     * @property {number|Long|null} [steamid] CTwoFactor_FinalizeAddAuthenticator_Request steamid
     * @property {string|null} [authenticatorCode] CTwoFactor_FinalizeAddAuthenticator_Request authenticatorCode
     * @property {number|Long|null} [authenticatorTime] CTwoFactor_FinalizeAddAuthenticator_Request authenticatorTime
     * @property {string|null} [activationCode] CTwoFactor_FinalizeAddAuthenticator_Request activationCode
     * @property {Array.<string>|null} [httpHeaders] CTwoFactor_FinalizeAddAuthenticator_Request httpHeaders
     * @property {boolean|null} [validateSmsCode] CTwoFactor_FinalizeAddAuthenticator_Request validateSmsCode
     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
     */

    /**
     * Properties of a CTwoFactor_FinalizeAddAuthenticator_Request.
     * @exports ICTwoFactor_FinalizeAddAuthenticator_Request
     * @interface ICTwoFactor_FinalizeAddAuthenticator_Request
     * @augments CTwoFactor_FinalizeAddAuthenticator_Request.$Properties
     * @deprecated Use CTwoFactor_FinalizeAddAuthenticator_Request.$Properties instead.
     */

    /**
     * Shape of a CTwoFactor_FinalizeAddAuthenticator_Request.
     * @typedef {CTwoFactor_FinalizeAddAuthenticator_Request.$Properties} CTwoFactor_FinalizeAddAuthenticator_Request.$Shape
     */

    /**
     * Constructs a new CTwoFactor_FinalizeAddAuthenticator_Request.
     * @exports CTwoFactor_FinalizeAddAuthenticator_Request
     * @classdesc Represents a CTwoFactor_FinalizeAddAuthenticator_Request.
     * @constructor
     * @param {CTwoFactor_FinalizeAddAuthenticator_Request.$Properties=} [properties] Properties to set
     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
     */
    const CTwoFactor_FinalizeAddAuthenticator_Request = function (properties) {
        this.httpHeaders = [];
        if (properties)
            for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null && keys[i] !== "__proto__")
                    this[keys[i]] = properties[keys[i]];
    };

    /**
     * CTwoFactor_FinalizeAddAuthenticator_Request steamid.
     * @member {number|Long} steamid
     * @memberof CTwoFactor_FinalizeAddAuthenticator_Request
     * @instance
     */
    CTwoFactor_FinalizeAddAuthenticator_Request.prototype.steamid = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

    /**
     * CTwoFactor_FinalizeAddAuthenticator_Request authenticatorCode.
     * @member {string} authenticatorCode
     * @memberof CTwoFactor_FinalizeAddAuthenticator_Request
     * @instance
     */
    CTwoFactor_FinalizeAddAuthenticator_Request.prototype.authenticatorCode = "";

    /**
     * CTwoFactor_FinalizeAddAuthenticator_Request authenticatorTime.
     * @member {number|Long} authenticatorTime
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
     * @param {CTwoFactor_FinalizeAddAuthenticator_Request.$Properties=} [properties] Properties to set
     * @returns {CTwoFactor_FinalizeAddAuthenticator_Request} CTwoFactor_FinalizeAddAuthenticator_Request instance
     * @type {{
     *   (properties: CTwoFactor_FinalizeAddAuthenticator_Request.$Shape): CTwoFactor_FinalizeAddAuthenticator_Request & CTwoFactor_FinalizeAddAuthenticator_Request.$Shape;
     *   (properties?: CTwoFactor_FinalizeAddAuthenticator_Request.$Properties): CTwoFactor_FinalizeAddAuthenticator_Request;
     * }}
     */
    CTwoFactor_FinalizeAddAuthenticator_Request.create = function(properties) {
        return new CTwoFactor_FinalizeAddAuthenticator_Request(properties);
    };

    /**
     * Encodes the specified CTwoFactor_FinalizeAddAuthenticator_Request message. Does not implicitly {@link CTwoFactor_FinalizeAddAuthenticator_Request.verify|verify} messages.
     * @function encode
     * @memberof CTwoFactor_FinalizeAddAuthenticator_Request
     * @static
     * @param {CTwoFactor_FinalizeAddAuthenticator_Request.$Properties} message CTwoFactor_FinalizeAddAuthenticator_Request message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CTwoFactor_FinalizeAddAuthenticator_Request.encode = function (message, writer, _depth) {
        if (!writer)
            writer = $Writer.create();
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw $Error("max depth exceeded");
        if (message.steamid != null && $Object.hasOwnProperty.call(message, "steamid"))
            writer.uint32(/* id 1, wireType 1 =*/9).fixed64(message.steamid);
        if (message.authenticatorCode != null && $Object.hasOwnProperty.call(message, "authenticatorCode"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.authenticatorCode);
        if (message.authenticatorTime != null && $Object.hasOwnProperty.call(message, "authenticatorTime"))
            writer.uint32(/* id 3, wireType 0 =*/24).uint64(message.authenticatorTime);
        if (message.activationCode != null && $Object.hasOwnProperty.call(message, "activationCode"))
            writer.uint32(/* id 4, wireType 2 =*/34).string(message.activationCode);
        if (message.httpHeaders != null && message.httpHeaders.length)
            for (let i = 0; i < message.httpHeaders.length; ++i)
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.httpHeaders[i]);
        if (message.validateSmsCode != null && $Object.hasOwnProperty.call(message, "validateSmsCode"))
            writer.uint32(/* id 6, wireType 0 =*/48).bool(message.validateSmsCode);
        if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
            for (let i = 0; i < message.$unknowns.length; ++i)
                writer.raw(message.$unknowns[i]);
        return writer;
    };

    /**
     * Encodes the specified CTwoFactor_FinalizeAddAuthenticator_Request message, length delimited. Does not implicitly {@link CTwoFactor_FinalizeAddAuthenticator_Request.verify|verify} messages.
     * @function encodeDelimited
     * @memberof CTwoFactor_FinalizeAddAuthenticator_Request
     * @static
     * @param {CTwoFactor_FinalizeAddAuthenticator_Request.$Properties} message CTwoFactor_FinalizeAddAuthenticator_Request message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CTwoFactor_FinalizeAddAuthenticator_Request.encodeDelimited = function(message, writer) {
        return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
    };

    /**
     * Decodes a CTwoFactor_FinalizeAddAuthenticator_Request message from the specified reader or buffer.
     * @function decode
     * @memberof CTwoFactor_FinalizeAddAuthenticator_Request
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {CTwoFactor_FinalizeAddAuthenticator_Request & CTwoFactor_FinalizeAddAuthenticator_Request.$Shape} CTwoFactor_FinalizeAddAuthenticator_Request
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CTwoFactor_FinalizeAddAuthenticator_Request.decode = function (reader, length, _end, _depth, _target) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $Reader.recursionLimit)
            throw $Error("max depth exceeded");
        let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.CTwoFactor_FinalizeAddAuthenticator_Request();
        while (reader.pos < end) {
            let start = reader.pos;
            let tag = reader.tag();
            if (tag === _end) {
                _end = $undefined;
                break;
            }
            let wireType = tag & 7;
            switch (tag >>>= 3) {
            case 1: {
                    if (wireType !== 1)
                        break;
                    message.steamid = reader.fixed64();
                    continue;
                }
            case 2: {
                    if (wireType !== 2)
                        break;
                    message.authenticatorCode = reader.string();
                    continue;
                }
            case 3: {
                    if (wireType !== 0)
                        break;
                    message.authenticatorTime = reader.uint64();
                    continue;
                }
            case 4: {
                    if (wireType !== 2)
                        break;
                    message.activationCode = reader.string();
                    continue;
                }
            case 5: {
                    if (wireType !== 2)
                        break;
                    if (!(message.httpHeaders && message.httpHeaders.length))
                        message.httpHeaders = [];
                    message.httpHeaders.push(reader.string());
                    continue;
                }
            case 6: {
                    if (wireType !== 0)
                        break;
                    message.validateSmsCode = reader.bool();
                    continue;
                }
            }
            reader.skipType(wireType, _depth, tag);
            if (!reader.discardUnknown) {
                $util.makeProp(message, "$unknowns", false);
                (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
            }
        }
        if (_end !== $undefined)
            throw $Error("missing end group");
        return message;
    };

    /**
     * Decodes a CTwoFactor_FinalizeAddAuthenticator_Request message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof CTwoFactor_FinalizeAddAuthenticator_Request
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {CTwoFactor_FinalizeAddAuthenticator_Request & CTwoFactor_FinalizeAddAuthenticator_Request.$Shape} CTwoFactor_FinalizeAddAuthenticator_Request
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CTwoFactor_FinalizeAddAuthenticator_Request.decodeDelimited = function(reader) {
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
    CTwoFactor_FinalizeAddAuthenticator_Request.verify = function (message, _depth) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            return "max depth exceeded";
        if (message.steamid != null && $Object.hasOwnProperty.call(message, "steamid"))
            if (!$util.isInteger(message.steamid) && !(message.steamid && $util.isInteger(message.steamid.low) && $util.isInteger(message.steamid.high)))
                return "steamid: integer|Long expected";
        if (message.authenticatorCode != null && $Object.hasOwnProperty.call(message, "authenticatorCode"))
            if (!$util.isString(message.authenticatorCode))
                return "authenticatorCode: string expected";
        if (message.authenticatorTime != null && $Object.hasOwnProperty.call(message, "authenticatorTime"))
            if (!$util.isInteger(message.authenticatorTime) && !(message.authenticatorTime && $util.isInteger(message.authenticatorTime.low) && $util.isInteger(message.authenticatorTime.high)))
                return "authenticatorTime: integer|Long expected";
        if (message.activationCode != null && $Object.hasOwnProperty.call(message, "activationCode"))
            if (!$util.isString(message.activationCode))
                return "activationCode: string expected";
        if (message.httpHeaders != null && $Object.hasOwnProperty.call(message, "httpHeaders")) {
            if (!$Array.isArray(message.httpHeaders))
                return "httpHeaders: array expected";
            for (let i = 0; i < message.httpHeaders.length; ++i)
                if (!$util.isString(message.httpHeaders[i]))
                    return "httpHeaders: string[] expected";
        }
        if (message.validateSmsCode != null && $Object.hasOwnProperty.call(message, "validateSmsCode"))
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
    CTwoFactor_FinalizeAddAuthenticator_Request.fromObject = function (object, _depth) {
        if (object instanceof $root.CTwoFactor_FinalizeAddAuthenticator_Request)
            return object;
        if (!$util.isObject(object))
            throw $TypeError(".CTwoFactor_FinalizeAddAuthenticator_Request: object expected");
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw $Error("max depth exceeded");
        let message = new $root.CTwoFactor_FinalizeAddAuthenticator_Request();
        if (object.steamid != null)
            if ($util.Long)
                message.steamid = $util.Long.fromValue(object.steamid, true);
            else if (typeof object.steamid === "string")
                message.steamid = $parseInt(object.steamid, 10);
            else if (typeof object.steamid === "number")
                message.steamid = object.steamid;
            else if (typeof object.steamid === "object")
                message.steamid = new $util.LongBits(object.steamid.low >>> 0, object.steamid.high >>> 0).toNumber(true);
        if (object.authenticatorCode != null)
            message.authenticatorCode = $String(object.authenticatorCode);
        if (object.authenticatorTime != null)
            if ($util.Long)
                message.authenticatorTime = $util.Long.fromValue(object.authenticatorTime, true);
            else if (typeof object.authenticatorTime === "string")
                message.authenticatorTime = $parseInt(object.authenticatorTime, 10);
            else if (typeof object.authenticatorTime === "number")
                message.authenticatorTime = object.authenticatorTime;
            else if (typeof object.authenticatorTime === "object")
                message.authenticatorTime = new $util.LongBits(object.authenticatorTime.low >>> 0, object.authenticatorTime.high >>> 0).toNumber(true);
        if (object.activationCode != null)
            message.activationCode = $String(object.activationCode);
        if (object.httpHeaders) {
            if (!$Array.isArray(object.httpHeaders))
                throw $TypeError(".CTwoFactor_FinalizeAddAuthenticator_Request.httpHeaders: array expected");
            message.httpHeaders = $Array(object.httpHeaders.length);
            for (let i = 0; i < object.httpHeaders.length; ++i)
                message.httpHeaders[i] = $String(object.httpHeaders[i]);
        }
        if (object.validateSmsCode != null)
            message.validateSmsCode = $Boolean(object.validateSmsCode);
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
    CTwoFactor_FinalizeAddAuthenticator_Request.toObject = function (message, options, _depth) {
        if (!options)
            options = {};
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw $Error("max depth exceeded");
        let object = {};
        if (options.arrays || options.defaults)
            object.httpHeaders = [];
        if (options.defaults) {
            if ($util.Long) {
                let long = new $util.Long(0, 0, true);
                object.steamid = options.longs === $String ? long.toString() : options.longs === $Number ? long.toNumber() : typeof $BigInt !== "undefined" && options.longs === $BigInt ? long.toBigInt() : long;
            } else
                object.steamid = options.longs === $String ? "0" : typeof $BigInt !== "undefined" && options.longs === $BigInt ? $BigInt("0") : 0;
            object.authenticatorCode = "";
            if ($util.Long) {
                let long = new $util.Long(0, 0, true);
                object.authenticatorTime = options.longs === $String ? long.toString() : options.longs === $Number ? long.toNumber() : typeof $BigInt !== "undefined" && options.longs === $BigInt ? long.toBigInt() : long;
            } else
                object.authenticatorTime = options.longs === $String ? "0" : typeof $BigInt !== "undefined" && options.longs === $BigInt ? $BigInt("0") : 0;
            object.activationCode = "";
            object.validateSmsCode = false;
        }
        if (message.steamid != null && $Object.hasOwnProperty.call(message, "steamid"))
            if (typeof $BigInt !== "undefined" && options.longs === $BigInt)
                object.steamid = typeof message.steamid === "number" ? $BigInt(message.steamid) : $util.Long.fromBits(message.steamid.low >>> 0, message.steamid.high >>> 0, true).toBigInt();
            else if (typeof message.steamid === "number")
                object.steamid = options.longs === $String ? $String(message.steamid) : message.steamid;
            else
                object.steamid = options.longs === $String ? $util.Long.prototype.toString.call(message.steamid) : options.longs === $Number ? new $util.LongBits(message.steamid.low >>> 0, message.steamid.high >>> 0).toNumber(true) : message.steamid;
        if (message.authenticatorCode != null && $Object.hasOwnProperty.call(message, "authenticatorCode"))
            object.authenticatorCode = message.authenticatorCode;
        if (message.authenticatorTime != null && $Object.hasOwnProperty.call(message, "authenticatorTime"))
            if (typeof $BigInt !== "undefined" && options.longs === $BigInt)
                object.authenticatorTime = typeof message.authenticatorTime === "number" ? $BigInt(message.authenticatorTime) : $util.Long.fromBits(message.authenticatorTime.low >>> 0, message.authenticatorTime.high >>> 0, true).toBigInt();
            else if (typeof message.authenticatorTime === "number")
                object.authenticatorTime = options.longs === $String ? $String(message.authenticatorTime) : message.authenticatorTime;
            else
                object.authenticatorTime = options.longs === $String ? $util.Long.prototype.toString.call(message.authenticatorTime) : options.longs === $Number ? new $util.LongBits(message.authenticatorTime.low >>> 0, message.authenticatorTime.high >>> 0).toNumber(true) : message.authenticatorTime;
        if (message.activationCode != null && $Object.hasOwnProperty.call(message, "activationCode"))
            object.activationCode = message.activationCode;
        if (message.httpHeaders && message.httpHeaders.length) {
            object.httpHeaders = $Array(message.httpHeaders.length);
            for (let j = 0; j < message.httpHeaders.length; ++j)
                object.httpHeaders[j] = message.httpHeaders[j];
        }
        if (message.validateSmsCode != null && $Object.hasOwnProperty.call(message, "validateSmsCode"))
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
    CTwoFactor_FinalizeAddAuthenticator_Request.prototype.toJSON = function() {
        return CTwoFactor_FinalizeAddAuthenticator_Request.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the type url for CTwoFactor_FinalizeAddAuthenticator_Request
     * @function getTypeUrl
     * @memberof CTwoFactor_FinalizeAddAuthenticator_Request
     * @static
     * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
     * @returns {string} The type url
     */
    CTwoFactor_FinalizeAddAuthenticator_Request.getTypeUrl = function(prefix) {
        if (prefix === $undefined)
            prefix = "type.googleapis.com";
        return prefix + "/CTwoFactor_FinalizeAddAuthenticator_Request";
    };

    return CTwoFactor_FinalizeAddAuthenticator_Request;
})();

export const CTwoFactor_FinalizeAddAuthenticator_Response = $root.CTwoFactor_FinalizeAddAuthenticator_Response = (() => {

    /**
     * Properties of a CTwoFactor_FinalizeAddAuthenticator_Response.
     * @typedef {Object} CTwoFactor_FinalizeAddAuthenticator_Response.$Properties
     * @property {boolean|null} [success] CTwoFactor_FinalizeAddAuthenticator_Response success
     * @property {boolean|null} [wantMore] CTwoFactor_FinalizeAddAuthenticator_Response wantMore
     * @property {number|Long|null} [serverTime] CTwoFactor_FinalizeAddAuthenticator_Response serverTime
     * @property {number|null} [status] CTwoFactor_FinalizeAddAuthenticator_Response status
     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
     */

    /**
     * Properties of a CTwoFactor_FinalizeAddAuthenticator_Response.
     * @exports ICTwoFactor_FinalizeAddAuthenticator_Response
     * @interface ICTwoFactor_FinalizeAddAuthenticator_Response
     * @augments CTwoFactor_FinalizeAddAuthenticator_Response.$Properties
     * @deprecated Use CTwoFactor_FinalizeAddAuthenticator_Response.$Properties instead.
     */

    /**
     * Shape of a CTwoFactor_FinalizeAddAuthenticator_Response.
     * @typedef {CTwoFactor_FinalizeAddAuthenticator_Response.$Properties} CTwoFactor_FinalizeAddAuthenticator_Response.$Shape
     */

    /**
     * Constructs a new CTwoFactor_FinalizeAddAuthenticator_Response.
     * @exports CTwoFactor_FinalizeAddAuthenticator_Response
     * @classdesc Represents a CTwoFactor_FinalizeAddAuthenticator_Response.
     * @constructor
     * @param {CTwoFactor_FinalizeAddAuthenticator_Response.$Properties=} [properties] Properties to set
     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
     */
    const CTwoFactor_FinalizeAddAuthenticator_Response = function (properties) {
        if (properties)
            for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null && keys[i] !== "__proto__")
                    this[keys[i]] = properties[keys[i]];
    };

    /**
     * CTwoFactor_FinalizeAddAuthenticator_Response success.
     * @member {boolean} success
     * @memberof CTwoFactor_FinalizeAddAuthenticator_Response
     * @instance
     */
    CTwoFactor_FinalizeAddAuthenticator_Response.prototype.success = false;

    /**
     * CTwoFactor_FinalizeAddAuthenticator_Response wantMore.
     * @member {boolean} wantMore
     * @memberof CTwoFactor_FinalizeAddAuthenticator_Response
     * @instance
     */
    CTwoFactor_FinalizeAddAuthenticator_Response.prototype.wantMore = false;

    /**
     * CTwoFactor_FinalizeAddAuthenticator_Response serverTime.
     * @member {number|Long} serverTime
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
     * @param {CTwoFactor_FinalizeAddAuthenticator_Response.$Properties=} [properties] Properties to set
     * @returns {CTwoFactor_FinalizeAddAuthenticator_Response} CTwoFactor_FinalizeAddAuthenticator_Response instance
     * @type {{
     *   (properties: CTwoFactor_FinalizeAddAuthenticator_Response.$Shape): CTwoFactor_FinalizeAddAuthenticator_Response & CTwoFactor_FinalizeAddAuthenticator_Response.$Shape;
     *   (properties?: CTwoFactor_FinalizeAddAuthenticator_Response.$Properties): CTwoFactor_FinalizeAddAuthenticator_Response;
     * }}
     */
    CTwoFactor_FinalizeAddAuthenticator_Response.create = function(properties) {
        return new CTwoFactor_FinalizeAddAuthenticator_Response(properties);
    };

    /**
     * Encodes the specified CTwoFactor_FinalizeAddAuthenticator_Response message. Does not implicitly {@link CTwoFactor_FinalizeAddAuthenticator_Response.verify|verify} messages.
     * @function encode
     * @memberof CTwoFactor_FinalizeAddAuthenticator_Response
     * @static
     * @param {CTwoFactor_FinalizeAddAuthenticator_Response.$Properties} message CTwoFactor_FinalizeAddAuthenticator_Response message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CTwoFactor_FinalizeAddAuthenticator_Response.encode = function (message, writer, _depth) {
        if (!writer)
            writer = $Writer.create();
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw $Error("max depth exceeded");
        if (message.success != null && $Object.hasOwnProperty.call(message, "success"))
            writer.uint32(/* id 1, wireType 0 =*/8).bool(message.success);
        if (message.wantMore != null && $Object.hasOwnProperty.call(message, "wantMore"))
            writer.uint32(/* id 2, wireType 0 =*/16).bool(message.wantMore);
        if (message.serverTime != null && $Object.hasOwnProperty.call(message, "serverTime"))
            writer.uint32(/* id 3, wireType 0 =*/24).uint64(message.serverTime);
        if (message.status != null && $Object.hasOwnProperty.call(message, "status"))
            writer.uint32(/* id 4, wireType 0 =*/32).int32(message.status);
        if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
            for (let i = 0; i < message.$unknowns.length; ++i)
                writer.raw(message.$unknowns[i]);
        return writer;
    };

    /**
     * Encodes the specified CTwoFactor_FinalizeAddAuthenticator_Response message, length delimited. Does not implicitly {@link CTwoFactor_FinalizeAddAuthenticator_Response.verify|verify} messages.
     * @function encodeDelimited
     * @memberof CTwoFactor_FinalizeAddAuthenticator_Response
     * @static
     * @param {CTwoFactor_FinalizeAddAuthenticator_Response.$Properties} message CTwoFactor_FinalizeAddAuthenticator_Response message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CTwoFactor_FinalizeAddAuthenticator_Response.encodeDelimited = function(message, writer) {
        return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
    };

    /**
     * Decodes a CTwoFactor_FinalizeAddAuthenticator_Response message from the specified reader or buffer.
     * @function decode
     * @memberof CTwoFactor_FinalizeAddAuthenticator_Response
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {CTwoFactor_FinalizeAddAuthenticator_Response & CTwoFactor_FinalizeAddAuthenticator_Response.$Shape} CTwoFactor_FinalizeAddAuthenticator_Response
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CTwoFactor_FinalizeAddAuthenticator_Response.decode = function (reader, length, _end, _depth, _target) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $Reader.recursionLimit)
            throw $Error("max depth exceeded");
        let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.CTwoFactor_FinalizeAddAuthenticator_Response();
        while (reader.pos < end) {
            let start = reader.pos;
            let tag = reader.tag();
            if (tag === _end) {
                _end = $undefined;
                break;
            }
            let wireType = tag & 7;
            switch (tag >>>= 3) {
            case 1: {
                    if (wireType !== 0)
                        break;
                    message.success = reader.bool();
                    continue;
                }
            case 2: {
                    if (wireType !== 0)
                        break;
                    message.wantMore = reader.bool();
                    continue;
                }
            case 3: {
                    if (wireType !== 0)
                        break;
                    message.serverTime = reader.uint64();
                    continue;
                }
            case 4: {
                    if (wireType !== 0)
                        break;
                    message.status = reader.int32();
                    continue;
                }
            }
            reader.skipType(wireType, _depth, tag);
            if (!reader.discardUnknown) {
                $util.makeProp(message, "$unknowns", false);
                (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
            }
        }
        if (_end !== $undefined)
            throw $Error("missing end group");
        return message;
    };

    /**
     * Decodes a CTwoFactor_FinalizeAddAuthenticator_Response message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof CTwoFactor_FinalizeAddAuthenticator_Response
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {CTwoFactor_FinalizeAddAuthenticator_Response & CTwoFactor_FinalizeAddAuthenticator_Response.$Shape} CTwoFactor_FinalizeAddAuthenticator_Response
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CTwoFactor_FinalizeAddAuthenticator_Response.decodeDelimited = function(reader) {
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
    CTwoFactor_FinalizeAddAuthenticator_Response.verify = function (message, _depth) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            return "max depth exceeded";
        if (message.success != null && $Object.hasOwnProperty.call(message, "success"))
            if (typeof message.success !== "boolean")
                return "success: boolean expected";
        if (message.wantMore != null && $Object.hasOwnProperty.call(message, "wantMore"))
            if (typeof message.wantMore !== "boolean")
                return "wantMore: boolean expected";
        if (message.serverTime != null && $Object.hasOwnProperty.call(message, "serverTime"))
            if (!$util.isInteger(message.serverTime) && !(message.serverTime && $util.isInteger(message.serverTime.low) && $util.isInteger(message.serverTime.high)))
                return "serverTime: integer|Long expected";
        if (message.status != null && $Object.hasOwnProperty.call(message, "status"))
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
    CTwoFactor_FinalizeAddAuthenticator_Response.fromObject = function (object, _depth) {
        if (object instanceof $root.CTwoFactor_FinalizeAddAuthenticator_Response)
            return object;
        if (!$util.isObject(object))
            throw $TypeError(".CTwoFactor_FinalizeAddAuthenticator_Response: object expected");
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw $Error("max depth exceeded");
        let message = new $root.CTwoFactor_FinalizeAddAuthenticator_Response();
        if (object.success != null)
            message.success = $Boolean(object.success);
        if (object.wantMore != null)
            message.wantMore = $Boolean(object.wantMore);
        if (object.serverTime != null)
            if ($util.Long)
                message.serverTime = $util.Long.fromValue(object.serverTime, true);
            else if (typeof object.serverTime === "string")
                message.serverTime = $parseInt(object.serverTime, 10);
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
    CTwoFactor_FinalizeAddAuthenticator_Response.toObject = function (message, options, _depth) {
        if (!options)
            options = {};
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw $Error("max depth exceeded");
        let object = {};
        if (options.defaults) {
            object.success = false;
            object.wantMore = false;
            if ($util.Long) {
                let long = new $util.Long(0, 0, true);
                object.serverTime = options.longs === $String ? long.toString() : options.longs === $Number ? long.toNumber() : typeof $BigInt !== "undefined" && options.longs === $BigInt ? long.toBigInt() : long;
            } else
                object.serverTime = options.longs === $String ? "0" : typeof $BigInt !== "undefined" && options.longs === $BigInt ? $BigInt("0") : 0;
            object.status = 0;
        }
        if (message.success != null && $Object.hasOwnProperty.call(message, "success"))
            object.success = message.success;
        if (message.wantMore != null && $Object.hasOwnProperty.call(message, "wantMore"))
            object.wantMore = message.wantMore;
        if (message.serverTime != null && $Object.hasOwnProperty.call(message, "serverTime"))
            if (typeof $BigInt !== "undefined" && options.longs === $BigInt)
                object.serverTime = typeof message.serverTime === "number" ? $BigInt(message.serverTime) : $util.Long.fromBits(message.serverTime.low >>> 0, message.serverTime.high >>> 0, true).toBigInt();
            else if (typeof message.serverTime === "number")
                object.serverTime = options.longs === $String ? $String(message.serverTime) : message.serverTime;
            else
                object.serverTime = options.longs === $String ? $util.Long.prototype.toString.call(message.serverTime) : options.longs === $Number ? new $util.LongBits(message.serverTime.low >>> 0, message.serverTime.high >>> 0).toNumber(true) : message.serverTime;
        if (message.status != null && $Object.hasOwnProperty.call(message, "status"))
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
    CTwoFactor_FinalizeAddAuthenticator_Response.prototype.toJSON = function() {
        return CTwoFactor_FinalizeAddAuthenticator_Response.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the type url for CTwoFactor_FinalizeAddAuthenticator_Response
     * @function getTypeUrl
     * @memberof CTwoFactor_FinalizeAddAuthenticator_Response
     * @static
     * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
     * @returns {string} The type url
     */
    CTwoFactor_FinalizeAddAuthenticator_Response.getTypeUrl = function(prefix) {
        if (prefix === $undefined)
            prefix = "type.googleapis.com";
        return prefix + "/CTwoFactor_FinalizeAddAuthenticator_Response";
    };

    return CTwoFactor_FinalizeAddAuthenticator_Response;
})();

export const CRemoveAuthenticatorViaChallengeContinue_Replacement_Token = $root.CRemoveAuthenticatorViaChallengeContinue_Replacement_Token = (() => {

    /**
     * Properties of a CRemoveAuthenticatorViaChallengeContinue_Replacement_Token.
     * @typedef {Object} CRemoveAuthenticatorViaChallengeContinue_Replacement_Token.$Properties
     * @property {Uint8Array|null} [sharedSecret] CRemoveAuthenticatorViaChallengeContinue_Replacement_Token sharedSecret
     * @property {number|Long|null} [serialNumber] CRemoveAuthenticatorViaChallengeContinue_Replacement_Token serialNumber
     * @property {string|null} [revocationCode] CRemoveAuthenticatorViaChallengeContinue_Replacement_Token revocationCode
     * @property {string|null} [uri] CRemoveAuthenticatorViaChallengeContinue_Replacement_Token uri
     * @property {number|Long|null} [serverTime] CRemoveAuthenticatorViaChallengeContinue_Replacement_Token serverTime
     * @property {string|null} [accountName] CRemoveAuthenticatorViaChallengeContinue_Replacement_Token accountName
     * @property {string|null} [tokenGid] CRemoveAuthenticatorViaChallengeContinue_Replacement_Token tokenGid
     * @property {Uint8Array|null} [identitySecret] CRemoveAuthenticatorViaChallengeContinue_Replacement_Token identitySecret
     * @property {Uint8Array|null} [secret_1] CRemoveAuthenticatorViaChallengeContinue_Replacement_Token secret_1
     * @property {number|null} [status] CRemoveAuthenticatorViaChallengeContinue_Replacement_Token status
     * @property {number|null} [steamguardScheme] CRemoveAuthenticatorViaChallengeContinue_Replacement_Token steamguardScheme
     * @property {number|Long|null} [steamid] CRemoveAuthenticatorViaChallengeContinue_Replacement_Token steamid
     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
     */

    /**
     * Properties of a CRemoveAuthenticatorViaChallengeContinue_Replacement_Token.
     * @exports ICRemoveAuthenticatorViaChallengeContinue_Replacement_Token
     * @interface ICRemoveAuthenticatorViaChallengeContinue_Replacement_Token
     * @augments CRemoveAuthenticatorViaChallengeContinue_Replacement_Token.$Properties
     * @deprecated Use CRemoveAuthenticatorViaChallengeContinue_Replacement_Token.$Properties instead.
     */

    /**
     * Shape of a CRemoveAuthenticatorViaChallengeContinue_Replacement_Token.
     * @typedef {CRemoveAuthenticatorViaChallengeContinue_Replacement_Token.$Properties} CRemoveAuthenticatorViaChallengeContinue_Replacement_Token.$Shape
     */

    /**
     * Constructs a new CRemoveAuthenticatorViaChallengeContinue_Replacement_Token.
     * @exports CRemoveAuthenticatorViaChallengeContinue_Replacement_Token
     * @classdesc Represents a CRemoveAuthenticatorViaChallengeContinue_Replacement_Token.
     * @constructor
     * @param {CRemoveAuthenticatorViaChallengeContinue_Replacement_Token.$Properties=} [properties] Properties to set
     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
     */
    const CRemoveAuthenticatorViaChallengeContinue_Replacement_Token = function (properties) {
        if (properties)
            for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null && keys[i] !== "__proto__")
                    this[keys[i]] = properties[keys[i]];
    };

    /**
     * CRemoveAuthenticatorViaChallengeContinue_Replacement_Token sharedSecret.
     * @member {Uint8Array} sharedSecret
     * @memberof CRemoveAuthenticatorViaChallengeContinue_Replacement_Token
     * @instance
     */
    CRemoveAuthenticatorViaChallengeContinue_Replacement_Token.prototype.sharedSecret = $util.newBuffer([]);

    /**
     * CRemoveAuthenticatorViaChallengeContinue_Replacement_Token serialNumber.
     * @member {number|Long} serialNumber
     * @memberof CRemoveAuthenticatorViaChallengeContinue_Replacement_Token
     * @instance
     */
    CRemoveAuthenticatorViaChallengeContinue_Replacement_Token.prototype.serialNumber = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

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
     * @member {number|Long} serverTime
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
     * @member {number|Long} steamid
     * @memberof CRemoveAuthenticatorViaChallengeContinue_Replacement_Token
     * @instance
     */
    CRemoveAuthenticatorViaChallengeContinue_Replacement_Token.prototype.steamid = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

    /**
     * Creates a new CRemoveAuthenticatorViaChallengeContinue_Replacement_Token instance using the specified properties.
     * @function create
     * @memberof CRemoveAuthenticatorViaChallengeContinue_Replacement_Token
     * @static
     * @param {CRemoveAuthenticatorViaChallengeContinue_Replacement_Token.$Properties=} [properties] Properties to set
     * @returns {CRemoveAuthenticatorViaChallengeContinue_Replacement_Token} CRemoveAuthenticatorViaChallengeContinue_Replacement_Token instance
     * @type {{
     *   (properties: CRemoveAuthenticatorViaChallengeContinue_Replacement_Token.$Shape): CRemoveAuthenticatorViaChallengeContinue_Replacement_Token & CRemoveAuthenticatorViaChallengeContinue_Replacement_Token.$Shape;
     *   (properties?: CRemoveAuthenticatorViaChallengeContinue_Replacement_Token.$Properties): CRemoveAuthenticatorViaChallengeContinue_Replacement_Token;
     * }}
     */
    CRemoveAuthenticatorViaChallengeContinue_Replacement_Token.create = function(properties) {
        return new CRemoveAuthenticatorViaChallengeContinue_Replacement_Token(properties);
    };

    /**
     * Encodes the specified CRemoveAuthenticatorViaChallengeContinue_Replacement_Token message. Does not implicitly {@link CRemoveAuthenticatorViaChallengeContinue_Replacement_Token.verify|verify} messages.
     * @function encode
     * @memberof CRemoveAuthenticatorViaChallengeContinue_Replacement_Token
     * @static
     * @param {CRemoveAuthenticatorViaChallengeContinue_Replacement_Token.$Properties} message CRemoveAuthenticatorViaChallengeContinue_Replacement_Token message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CRemoveAuthenticatorViaChallengeContinue_Replacement_Token.encode = function (message, writer, _depth) {
        if (!writer)
            writer = $Writer.create();
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw $Error("max depth exceeded");
        if (message.sharedSecret != null && $Object.hasOwnProperty.call(message, "sharedSecret"))
            writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.sharedSecret);
        if (message.serialNumber != null && $Object.hasOwnProperty.call(message, "serialNumber"))
            writer.uint32(/* id 2, wireType 1 =*/17).fixed64(message.serialNumber);
        if (message.revocationCode != null && $Object.hasOwnProperty.call(message, "revocationCode"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.revocationCode);
        if (message.uri != null && $Object.hasOwnProperty.call(message, "uri"))
            writer.uint32(/* id 4, wireType 2 =*/34).string(message.uri);
        if (message.serverTime != null && $Object.hasOwnProperty.call(message, "serverTime"))
            writer.uint32(/* id 5, wireType 0 =*/40).uint64(message.serverTime);
        if (message.accountName != null && $Object.hasOwnProperty.call(message, "accountName"))
            writer.uint32(/* id 6, wireType 2 =*/50).string(message.accountName);
        if (message.tokenGid != null && $Object.hasOwnProperty.call(message, "tokenGid"))
            writer.uint32(/* id 7, wireType 2 =*/58).string(message.tokenGid);
        if (message.identitySecret != null && $Object.hasOwnProperty.call(message, "identitySecret"))
            writer.uint32(/* id 8, wireType 2 =*/66).bytes(message.identitySecret);
        if (message.secret_1 != null && $Object.hasOwnProperty.call(message, "secret_1"))
            writer.uint32(/* id 9, wireType 2 =*/74).bytes(message.secret_1);
        if (message.status != null && $Object.hasOwnProperty.call(message, "status"))
            writer.uint32(/* id 10, wireType 0 =*/80).int32(message.status);
        if (message.steamguardScheme != null && $Object.hasOwnProperty.call(message, "steamguardScheme"))
            writer.uint32(/* id 11, wireType 0 =*/88).uint32(message.steamguardScheme);
        if (message.steamid != null && $Object.hasOwnProperty.call(message, "steamid"))
            writer.uint32(/* id 12, wireType 1 =*/97).fixed64(message.steamid);
        if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
            for (let i = 0; i < message.$unknowns.length; ++i)
                writer.raw(message.$unknowns[i]);
        return writer;
    };

    /**
     * Encodes the specified CRemoveAuthenticatorViaChallengeContinue_Replacement_Token message, length delimited. Does not implicitly {@link CRemoveAuthenticatorViaChallengeContinue_Replacement_Token.verify|verify} messages.
     * @function encodeDelimited
     * @memberof CRemoveAuthenticatorViaChallengeContinue_Replacement_Token
     * @static
     * @param {CRemoveAuthenticatorViaChallengeContinue_Replacement_Token.$Properties} message CRemoveAuthenticatorViaChallengeContinue_Replacement_Token message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CRemoveAuthenticatorViaChallengeContinue_Replacement_Token.encodeDelimited = function(message, writer) {
        return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
    };

    /**
     * Decodes a CRemoveAuthenticatorViaChallengeContinue_Replacement_Token message from the specified reader or buffer.
     * @function decode
     * @memberof CRemoveAuthenticatorViaChallengeContinue_Replacement_Token
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {CRemoveAuthenticatorViaChallengeContinue_Replacement_Token & CRemoveAuthenticatorViaChallengeContinue_Replacement_Token.$Shape} CRemoveAuthenticatorViaChallengeContinue_Replacement_Token
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CRemoveAuthenticatorViaChallengeContinue_Replacement_Token.decode = function (reader, length, _end, _depth, _target) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $Reader.recursionLimit)
            throw $Error("max depth exceeded");
        let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.CRemoveAuthenticatorViaChallengeContinue_Replacement_Token();
        while (reader.pos < end) {
            let start = reader.pos;
            let tag = reader.tag();
            if (tag === _end) {
                _end = $undefined;
                break;
            }
            let wireType = tag & 7;
            switch (tag >>>= 3) {
            case 1: {
                    if (wireType !== 2)
                        break;
                    message.sharedSecret = reader.bytes();
                    continue;
                }
            case 2: {
                    if (wireType !== 1)
                        break;
                    message.serialNumber = reader.fixed64();
                    continue;
                }
            case 3: {
                    if (wireType !== 2)
                        break;
                    message.revocationCode = reader.string();
                    continue;
                }
            case 4: {
                    if (wireType !== 2)
                        break;
                    message.uri = reader.string();
                    continue;
                }
            case 5: {
                    if (wireType !== 0)
                        break;
                    message.serverTime = reader.uint64();
                    continue;
                }
            case 6: {
                    if (wireType !== 2)
                        break;
                    message.accountName = reader.string();
                    continue;
                }
            case 7: {
                    if (wireType !== 2)
                        break;
                    message.tokenGid = reader.string();
                    continue;
                }
            case 8: {
                    if (wireType !== 2)
                        break;
                    message.identitySecret = reader.bytes();
                    continue;
                }
            case 9: {
                    if (wireType !== 2)
                        break;
                    message.secret_1 = reader.bytes();
                    continue;
                }
            case 10: {
                    if (wireType !== 0)
                        break;
                    message.status = reader.int32();
                    continue;
                }
            case 11: {
                    if (wireType !== 0)
                        break;
                    message.steamguardScheme = reader.uint32();
                    continue;
                }
            case 12: {
                    if (wireType !== 1)
                        break;
                    message.steamid = reader.fixed64();
                    continue;
                }
            }
            reader.skipType(wireType, _depth, tag);
            if (!reader.discardUnknown) {
                $util.makeProp(message, "$unknowns", false);
                (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
            }
        }
        if (_end !== $undefined)
            throw $Error("missing end group");
        return message;
    };

    /**
     * Decodes a CRemoveAuthenticatorViaChallengeContinue_Replacement_Token message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof CRemoveAuthenticatorViaChallengeContinue_Replacement_Token
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {CRemoveAuthenticatorViaChallengeContinue_Replacement_Token & CRemoveAuthenticatorViaChallengeContinue_Replacement_Token.$Shape} CRemoveAuthenticatorViaChallengeContinue_Replacement_Token
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CRemoveAuthenticatorViaChallengeContinue_Replacement_Token.decodeDelimited = function(reader) {
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
    CRemoveAuthenticatorViaChallengeContinue_Replacement_Token.verify = function (message, _depth) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            return "max depth exceeded";
        if (message.sharedSecret != null && $Object.hasOwnProperty.call(message, "sharedSecret"))
            if (!(message.sharedSecret && typeof message.sharedSecret.length === "number" || $util.isString(message.sharedSecret)))
                return "sharedSecret: buffer expected";
        if (message.serialNumber != null && $Object.hasOwnProperty.call(message, "serialNumber"))
            if (!$util.isInteger(message.serialNumber) && !(message.serialNumber && $util.isInteger(message.serialNumber.low) && $util.isInteger(message.serialNumber.high)))
                return "serialNumber: integer|Long expected";
        if (message.revocationCode != null && $Object.hasOwnProperty.call(message, "revocationCode"))
            if (!$util.isString(message.revocationCode))
                return "revocationCode: string expected";
        if (message.uri != null && $Object.hasOwnProperty.call(message, "uri"))
            if (!$util.isString(message.uri))
                return "uri: string expected";
        if (message.serverTime != null && $Object.hasOwnProperty.call(message, "serverTime"))
            if (!$util.isInteger(message.serverTime) && !(message.serverTime && $util.isInteger(message.serverTime.low) && $util.isInteger(message.serverTime.high)))
                return "serverTime: integer|Long expected";
        if (message.accountName != null && $Object.hasOwnProperty.call(message, "accountName"))
            if (!$util.isString(message.accountName))
                return "accountName: string expected";
        if (message.tokenGid != null && $Object.hasOwnProperty.call(message, "tokenGid"))
            if (!$util.isString(message.tokenGid))
                return "tokenGid: string expected";
        if (message.identitySecret != null && $Object.hasOwnProperty.call(message, "identitySecret"))
            if (!(message.identitySecret && typeof message.identitySecret.length === "number" || $util.isString(message.identitySecret)))
                return "identitySecret: buffer expected";
        if (message.secret_1 != null && $Object.hasOwnProperty.call(message, "secret_1"))
            if (!(message.secret_1 && typeof message.secret_1.length === "number" || $util.isString(message.secret_1)))
                return "secret_1: buffer expected";
        if (message.status != null && $Object.hasOwnProperty.call(message, "status"))
            if (!$util.isInteger(message.status))
                return "status: integer expected";
        if (message.steamguardScheme != null && $Object.hasOwnProperty.call(message, "steamguardScheme"))
            if (!$util.isInteger(message.steamguardScheme))
                return "steamguardScheme: integer expected";
        if (message.steamid != null && $Object.hasOwnProperty.call(message, "steamid"))
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
    CRemoveAuthenticatorViaChallengeContinue_Replacement_Token.fromObject = function (object, _depth) {
        if (object instanceof $root.CRemoveAuthenticatorViaChallengeContinue_Replacement_Token)
            return object;
        if (!$util.isObject(object))
            throw $TypeError(".CRemoveAuthenticatorViaChallengeContinue_Replacement_Token: object expected");
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw $Error("max depth exceeded");
        let message = new $root.CRemoveAuthenticatorViaChallengeContinue_Replacement_Token();
        if (object.sharedSecret != null)
            if (typeof object.sharedSecret === "string")
                $util.base64.decode(object.sharedSecret, message.sharedSecret = $util.newBuffer($util.base64.length(object.sharedSecret)), 0);
            else if (object.sharedSecret.length >= 0)
                message.sharedSecret = object.sharedSecret;
        if (object.serialNumber != null)
            if ($util.Long)
                message.serialNumber = $util.Long.fromValue(object.serialNumber, true);
            else if (typeof object.serialNumber === "string")
                message.serialNumber = $parseInt(object.serialNumber, 10);
            else if (typeof object.serialNumber === "number")
                message.serialNumber = object.serialNumber;
            else if (typeof object.serialNumber === "object")
                message.serialNumber = new $util.LongBits(object.serialNumber.low >>> 0, object.serialNumber.high >>> 0).toNumber(true);
        if (object.revocationCode != null)
            message.revocationCode = $String(object.revocationCode);
        if (object.uri != null)
            message.uri = $String(object.uri);
        if (object.serverTime != null)
            if ($util.Long)
                message.serverTime = $util.Long.fromValue(object.serverTime, true);
            else if (typeof object.serverTime === "string")
                message.serverTime = $parseInt(object.serverTime, 10);
            else if (typeof object.serverTime === "number")
                message.serverTime = object.serverTime;
            else if (typeof object.serverTime === "object")
                message.serverTime = new $util.LongBits(object.serverTime.low >>> 0, object.serverTime.high >>> 0).toNumber(true);
        if (object.accountName != null)
            message.accountName = $String(object.accountName);
        if (object.tokenGid != null)
            message.tokenGid = $String(object.tokenGid);
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
                message.steamid = $util.Long.fromValue(object.steamid, true);
            else if (typeof object.steamid === "string")
                message.steamid = $parseInt(object.steamid, 10);
            else if (typeof object.steamid === "number")
                message.steamid = object.steamid;
            else if (typeof object.steamid === "object")
                message.steamid = new $util.LongBits(object.steamid.low >>> 0, object.steamid.high >>> 0).toNumber(true);
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
    CRemoveAuthenticatorViaChallengeContinue_Replacement_Token.toObject = function (message, options, _depth) {
        if (!options)
            options = {};
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw $Error("max depth exceeded");
        let object = {};
        if (options.defaults) {
            if (options.bytes === $String)
                object.sharedSecret = "";
            else {
                object.sharedSecret = [];
                if (options.bytes !== $Array)
                    object.sharedSecret = $util.newBuffer(object.sharedSecret);
            }
            if ($util.Long) {
                let long = new $util.Long(0, 0, true);
                object.serialNumber = options.longs === $String ? long.toString() : options.longs === $Number ? long.toNumber() : typeof $BigInt !== "undefined" && options.longs === $BigInt ? long.toBigInt() : long;
            } else
                object.serialNumber = options.longs === $String ? "0" : typeof $BigInt !== "undefined" && options.longs === $BigInt ? $BigInt("0") : 0;
            object.revocationCode = "";
            object.uri = "";
            if ($util.Long) {
                let long = new $util.Long(0, 0, true);
                object.serverTime = options.longs === $String ? long.toString() : options.longs === $Number ? long.toNumber() : typeof $BigInt !== "undefined" && options.longs === $BigInt ? long.toBigInt() : long;
            } else
                object.serverTime = options.longs === $String ? "0" : typeof $BigInt !== "undefined" && options.longs === $BigInt ? $BigInt("0") : 0;
            object.accountName = "";
            object.tokenGid = "";
            if (options.bytes === $String)
                object.identitySecret = "";
            else {
                object.identitySecret = [];
                if (options.bytes !== $Array)
                    object.identitySecret = $util.newBuffer(object.identitySecret);
            }
            if (options.bytes === $String)
                object.secret_1 = "";
            else {
                object.secret_1 = [];
                if (options.bytes !== $Array)
                    object.secret_1 = $util.newBuffer(object.secret_1);
            }
            object.status = 0;
            object.steamguardScheme = 0;
            if ($util.Long) {
                let long = new $util.Long(0, 0, true);
                object.steamid = options.longs === $String ? long.toString() : options.longs === $Number ? long.toNumber() : typeof $BigInt !== "undefined" && options.longs === $BigInt ? long.toBigInt() : long;
            } else
                object.steamid = options.longs === $String ? "0" : typeof $BigInt !== "undefined" && options.longs === $BigInt ? $BigInt("0") : 0;
        }
        if (message.sharedSecret != null && $Object.hasOwnProperty.call(message, "sharedSecret"))
            object.sharedSecret = options.bytes === $String ? $util.base64.encode(message.sharedSecret, 0, message.sharedSecret.length) : options.bytes === $Array ? $Array.prototype.slice.call(message.sharedSecret) : message.sharedSecret;
        if (message.serialNumber != null && $Object.hasOwnProperty.call(message, "serialNumber"))
            if (typeof $BigInt !== "undefined" && options.longs === $BigInt)
                object.serialNumber = typeof message.serialNumber === "number" ? $BigInt(message.serialNumber) : $util.Long.fromBits(message.serialNumber.low >>> 0, message.serialNumber.high >>> 0, true).toBigInt();
            else if (typeof message.serialNumber === "number")
                object.serialNumber = options.longs === $String ? $String(message.serialNumber) : message.serialNumber;
            else
                object.serialNumber = options.longs === $String ? $util.Long.prototype.toString.call(message.serialNumber) : options.longs === $Number ? new $util.LongBits(message.serialNumber.low >>> 0, message.serialNumber.high >>> 0).toNumber(true) : message.serialNumber;
        if (message.revocationCode != null && $Object.hasOwnProperty.call(message, "revocationCode"))
            object.revocationCode = message.revocationCode;
        if (message.uri != null && $Object.hasOwnProperty.call(message, "uri"))
            object.uri = message.uri;
        if (message.serverTime != null && $Object.hasOwnProperty.call(message, "serverTime"))
            if (typeof $BigInt !== "undefined" && options.longs === $BigInt)
                object.serverTime = typeof message.serverTime === "number" ? $BigInt(message.serverTime) : $util.Long.fromBits(message.serverTime.low >>> 0, message.serverTime.high >>> 0, true).toBigInt();
            else if (typeof message.serverTime === "number")
                object.serverTime = options.longs === $String ? $String(message.serverTime) : message.serverTime;
            else
                object.serverTime = options.longs === $String ? $util.Long.prototype.toString.call(message.serverTime) : options.longs === $Number ? new $util.LongBits(message.serverTime.low >>> 0, message.serverTime.high >>> 0).toNumber(true) : message.serverTime;
        if (message.accountName != null && $Object.hasOwnProperty.call(message, "accountName"))
            object.accountName = message.accountName;
        if (message.tokenGid != null && $Object.hasOwnProperty.call(message, "tokenGid"))
            object.tokenGid = message.tokenGid;
        if (message.identitySecret != null && $Object.hasOwnProperty.call(message, "identitySecret"))
            object.identitySecret = options.bytes === $String ? $util.base64.encode(message.identitySecret, 0, message.identitySecret.length) : options.bytes === $Array ? $Array.prototype.slice.call(message.identitySecret) : message.identitySecret;
        if (message.secret_1 != null && $Object.hasOwnProperty.call(message, "secret_1"))
            object.secret_1 = options.bytes === $String ? $util.base64.encode(message.secret_1, 0, message.secret_1.length) : options.bytes === $Array ? $Array.prototype.slice.call(message.secret_1) : message.secret_1;
        if (message.status != null && $Object.hasOwnProperty.call(message, "status"))
            object.status = message.status;
        if (message.steamguardScheme != null && $Object.hasOwnProperty.call(message, "steamguardScheme"))
            object.steamguardScheme = message.steamguardScheme;
        if (message.steamid != null && $Object.hasOwnProperty.call(message, "steamid"))
            if (typeof $BigInt !== "undefined" && options.longs === $BigInt)
                object.steamid = typeof message.steamid === "number" ? $BigInt(message.steamid) : $util.Long.fromBits(message.steamid.low >>> 0, message.steamid.high >>> 0, true).toBigInt();
            else if (typeof message.steamid === "number")
                object.steamid = options.longs === $String ? $String(message.steamid) : message.steamid;
            else
                object.steamid = options.longs === $String ? $util.Long.prototype.toString.call(message.steamid) : options.longs === $Number ? new $util.LongBits(message.steamid.low >>> 0, message.steamid.high >>> 0).toNumber(true) : message.steamid;
        return object;
    };

    /**
     * Converts this CRemoveAuthenticatorViaChallengeContinue_Replacement_Token to JSON.
     * @function toJSON
     * @memberof CRemoveAuthenticatorViaChallengeContinue_Replacement_Token
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    CRemoveAuthenticatorViaChallengeContinue_Replacement_Token.prototype.toJSON = function() {
        return CRemoveAuthenticatorViaChallengeContinue_Replacement_Token.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the type url for CRemoveAuthenticatorViaChallengeContinue_Replacement_Token
     * @function getTypeUrl
     * @memberof CRemoveAuthenticatorViaChallengeContinue_Replacement_Token
     * @static
     * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
     * @returns {string} The type url
     */
    CRemoveAuthenticatorViaChallengeContinue_Replacement_Token.getTypeUrl = function(prefix) {
        if (prefix === $undefined)
            prefix = "type.googleapis.com";
        return prefix + "/CRemoveAuthenticatorViaChallengeContinue_Replacement_Token";
    };

    return CRemoveAuthenticatorViaChallengeContinue_Replacement_Token;
})();

export const CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request = $root.CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request = (() => {

    /**
     * Properties of a CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request.
     * @typedef {Object} CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request.$Properties
     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
     */

    /**
     * Properties of a CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request.
     * @exports ICTwoFactor_RemoveAuthenticatorViaChallengeStart_Request
     * @interface ICTwoFactor_RemoveAuthenticatorViaChallengeStart_Request
     * @augments CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request.$Properties
     * @deprecated Use CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request.$Properties instead.
     */

    /**
     * Shape of a CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request.
     * @typedef {CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request.$Properties} CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request.$Shape
     */

    /**
     * Constructs a new CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request.
     * @exports CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request
     * @classdesc Represents a CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request.
     * @constructor
     * @param {CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request.$Properties=} [properties] Properties to set
     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
     */
    const CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request = function (properties) {
        if (properties)
            for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null && keys[i] !== "__proto__")
                    this[keys[i]] = properties[keys[i]];
    };

    /**
     * Creates a new CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request instance using the specified properties.
     * @function create
     * @memberof CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request
     * @static
     * @param {CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request.$Properties=} [properties] Properties to set
     * @returns {CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request} CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request instance
     * @type {{
     *   (properties: CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request.$Shape): CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request & CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request.$Shape;
     *   (properties?: CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request.$Properties): CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request;
     * }}
     */
    CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request.create = function(properties) {
        return new CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request(properties);
    };

    /**
     * Encodes the specified CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request message. Does not implicitly {@link CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request.verify|verify} messages.
     * @function encode
     * @memberof CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request
     * @static
     * @param {CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request.$Properties} message CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request.encode = function (message, writer, _depth) {
        if (!writer)
            writer = $Writer.create();
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw $Error("max depth exceeded");
        if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
            for (let i = 0; i < message.$unknowns.length; ++i)
                writer.raw(message.$unknowns[i]);
        return writer;
    };

    /**
     * Encodes the specified CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request message, length delimited. Does not implicitly {@link CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request.verify|verify} messages.
     * @function encodeDelimited
     * @memberof CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request
     * @static
     * @param {CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request.$Properties} message CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request.encodeDelimited = function(message, writer) {
        return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
    };

    /**
     * Decodes a CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request message from the specified reader or buffer.
     * @function decode
     * @memberof CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request & CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request.$Shape} CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request.decode = function (reader, length, _end, _depth, _target) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $Reader.recursionLimit)
            throw $Error("max depth exceeded");
        let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request();
        while (reader.pos < end) {
            let start = reader.pos;
            let tag = reader.tag();
            if (tag === _end) {
                _end = $undefined;
                break;
            }
            reader.skipType(tag & 7, _depth, tag);
            if (!reader.discardUnknown) {
                $util.makeProp(message, "$unknowns", false);
                (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
            }
        }
        if (_end !== $undefined)
            throw $Error("missing end group");
        return message;
    };

    /**
     * Decodes a CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request & CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request.$Shape} CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request.decodeDelimited = function(reader) {
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
    CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request.verify = function (message, _depth) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            return "max depth exceeded";
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
    CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request.fromObject = function (object, _depth) {
        if (object instanceof $root.CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request)
            return object;
        if (!$util.isObject(object))
            throw $TypeError(".CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request: object expected");
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw $Error("max depth exceeded");
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
    CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request.toObject = function () {
        return {};
    };

    /**
     * Converts this CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request to JSON.
     * @function toJSON
     * @memberof CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request.prototype.toJSON = function() {
        return CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the type url for CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request
     * @function getTypeUrl
     * @memberof CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request
     * @static
     * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
     * @returns {string} The type url
     */
    CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request.getTypeUrl = function(prefix) {
        if (prefix === $undefined)
            prefix = "type.googleapis.com";
        return prefix + "/CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request";
    };

    return CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request;
})();

export const CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response = $root.CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response = (() => {

    /**
     * Properties of a CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response.
     * @typedef {Object} CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response.$Properties
     * @property {boolean|null} [success] CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response success
     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
     */

    /**
     * Properties of a CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response.
     * @exports ICTwoFactor_RemoveAuthenticatorViaChallengeStart_Response
     * @interface ICTwoFactor_RemoveAuthenticatorViaChallengeStart_Response
     * @augments CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response.$Properties
     * @deprecated Use CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response.$Properties instead.
     */

    /**
     * Shape of a CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response.
     * @typedef {CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response.$Properties} CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response.$Shape
     */

    /**
     * Constructs a new CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response.
     * @exports CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response
     * @classdesc Represents a CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response.
     * @constructor
     * @param {CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response.$Properties=} [properties] Properties to set
     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
     */
    const CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response = function (properties) {
        if (properties)
            for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null && keys[i] !== "__proto__")
                    this[keys[i]] = properties[keys[i]];
    };

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
     * @param {CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response.$Properties=} [properties] Properties to set
     * @returns {CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response} CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response instance
     * @type {{
     *   (properties: CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response.$Shape): CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response & CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response.$Shape;
     *   (properties?: CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response.$Properties): CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response;
     * }}
     */
    CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response.create = function(properties) {
        return new CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response(properties);
    };

    /**
     * Encodes the specified CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response message. Does not implicitly {@link CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response.verify|verify} messages.
     * @function encode
     * @memberof CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response
     * @static
     * @param {CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response.$Properties} message CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response.encode = function (message, writer, _depth) {
        if (!writer)
            writer = $Writer.create();
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw $Error("max depth exceeded");
        if (message.success != null && $Object.hasOwnProperty.call(message, "success"))
            writer.uint32(/* id 1, wireType 0 =*/8).bool(message.success);
        if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
            for (let i = 0; i < message.$unknowns.length; ++i)
                writer.raw(message.$unknowns[i]);
        return writer;
    };

    /**
     * Encodes the specified CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response message, length delimited. Does not implicitly {@link CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response.verify|verify} messages.
     * @function encodeDelimited
     * @memberof CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response
     * @static
     * @param {CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response.$Properties} message CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response.encodeDelimited = function(message, writer) {
        return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
    };

    /**
     * Decodes a CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response message from the specified reader or buffer.
     * @function decode
     * @memberof CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response & CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response.$Shape} CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response.decode = function (reader, length, _end, _depth, _target) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $Reader.recursionLimit)
            throw $Error("max depth exceeded");
        let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response();
        while (reader.pos < end) {
            let start = reader.pos;
            let tag = reader.tag();
            if (tag === _end) {
                _end = $undefined;
                break;
            }
            let wireType = tag & 7;
            switch (tag >>>= 3) {
            case 1: {
                    if (wireType !== 0)
                        break;
                    message.success = reader.bool();
                    continue;
                }
            }
            reader.skipType(wireType, _depth, tag);
            if (!reader.discardUnknown) {
                $util.makeProp(message, "$unknowns", false);
                (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
            }
        }
        if (_end !== $undefined)
            throw $Error("missing end group");
        return message;
    };

    /**
     * Decodes a CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response & CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response.$Shape} CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response.decodeDelimited = function(reader) {
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
    CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response.verify = function (message, _depth) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            return "max depth exceeded";
        if (message.success != null && $Object.hasOwnProperty.call(message, "success"))
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
    CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response.fromObject = function (object, _depth) {
        if (object instanceof $root.CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response)
            return object;
        if (!$util.isObject(object))
            throw $TypeError(".CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response: object expected");
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw $Error("max depth exceeded");
        let message = new $root.CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response();
        if (object.success != null)
            message.success = $Boolean(object.success);
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
    CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response.toObject = function (message, options, _depth) {
        if (!options)
            options = {};
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw $Error("max depth exceeded");
        let object = {};
        if (options.defaults)
            object.success = false;
        if (message.success != null && $Object.hasOwnProperty.call(message, "success"))
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
    CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response.prototype.toJSON = function() {
        return CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the type url for CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response
     * @function getTypeUrl
     * @memberof CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response
     * @static
     * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
     * @returns {string} The type url
     */
    CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response.getTypeUrl = function(prefix) {
        if (prefix === $undefined)
            prefix = "type.googleapis.com";
        return prefix + "/CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response";
    };

    return CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response;
})();

export const CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request = $root.CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request = (() => {

    /**
     * Properties of a CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request.
     * @typedef {Object} CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request.$Properties
     * @property {string|null} [smsCode] CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request smsCode
     * @property {boolean|null} [generateNewToken] CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request generateNewToken
     * @property {number|null} [version] CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request version
     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
     */

    /**
     * Properties of a CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request.
     * @exports ICTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request
     * @interface ICTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request
     * @augments CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request.$Properties
     * @deprecated Use CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request.$Properties instead.
     */

    /**
     * Shape of a CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request.
     * @typedef {CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request.$Properties} CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request.$Shape
     */

    /**
     * Constructs a new CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request.
     * @exports CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request
     * @classdesc Represents a CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request.
     * @constructor
     * @param {CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request.$Properties=} [properties] Properties to set
     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
     */
    const CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request = function (properties) {
        if (properties)
            for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null && keys[i] !== "__proto__")
                    this[keys[i]] = properties[keys[i]];
    };

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
     * @param {CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request.$Properties=} [properties] Properties to set
     * @returns {CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request} CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request instance
     * @type {{
     *   (properties: CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request.$Shape): CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request & CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request.$Shape;
     *   (properties?: CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request.$Properties): CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request;
     * }}
     */
    CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request.create = function(properties) {
        return new CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request(properties);
    };

    /**
     * Encodes the specified CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request message. Does not implicitly {@link CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request.verify|verify} messages.
     * @function encode
     * @memberof CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request
     * @static
     * @param {CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request.$Properties} message CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request.encode = function (message, writer, _depth) {
        if (!writer)
            writer = $Writer.create();
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw $Error("max depth exceeded");
        if (message.smsCode != null && $Object.hasOwnProperty.call(message, "smsCode"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.smsCode);
        if (message.generateNewToken != null && $Object.hasOwnProperty.call(message, "generateNewToken"))
            writer.uint32(/* id 2, wireType 0 =*/16).bool(message.generateNewToken);
        if (message.version != null && $Object.hasOwnProperty.call(message, "version"))
            writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.version);
        if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
            for (let i = 0; i < message.$unknowns.length; ++i)
                writer.raw(message.$unknowns[i]);
        return writer;
    };

    /**
     * Encodes the specified CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request message, length delimited. Does not implicitly {@link CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request.verify|verify} messages.
     * @function encodeDelimited
     * @memberof CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request
     * @static
     * @param {CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request.$Properties} message CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request.encodeDelimited = function(message, writer) {
        return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
    };

    /**
     * Decodes a CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request message from the specified reader or buffer.
     * @function decode
     * @memberof CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request & CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request.$Shape} CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request.decode = function (reader, length, _end, _depth, _target) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $Reader.recursionLimit)
            throw $Error("max depth exceeded");
        let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request();
        while (reader.pos < end) {
            let start = reader.pos;
            let tag = reader.tag();
            if (tag === _end) {
                _end = $undefined;
                break;
            }
            let wireType = tag & 7;
            switch (tag >>>= 3) {
            case 1: {
                    if (wireType !== 2)
                        break;
                    message.smsCode = reader.string();
                    continue;
                }
            case 2: {
                    if (wireType !== 0)
                        break;
                    message.generateNewToken = reader.bool();
                    continue;
                }
            case 3: {
                    if (wireType !== 0)
                        break;
                    message.version = reader.uint32();
                    continue;
                }
            }
            reader.skipType(wireType, _depth, tag);
            if (!reader.discardUnknown) {
                $util.makeProp(message, "$unknowns", false);
                (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
            }
        }
        if (_end !== $undefined)
            throw $Error("missing end group");
        return message;
    };

    /**
     * Decodes a CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request & CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request.$Shape} CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request.decodeDelimited = function(reader) {
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
    CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request.verify = function (message, _depth) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            return "max depth exceeded";
        if (message.smsCode != null && $Object.hasOwnProperty.call(message, "smsCode"))
            if (!$util.isString(message.smsCode))
                return "smsCode: string expected";
        if (message.generateNewToken != null && $Object.hasOwnProperty.call(message, "generateNewToken"))
            if (typeof message.generateNewToken !== "boolean")
                return "generateNewToken: boolean expected";
        if (message.version != null && $Object.hasOwnProperty.call(message, "version"))
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
    CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request.fromObject = function (object, _depth) {
        if (object instanceof $root.CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request)
            return object;
        if (!$util.isObject(object))
            throw $TypeError(".CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request: object expected");
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw $Error("max depth exceeded");
        let message = new $root.CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request();
        if (object.smsCode != null)
            message.smsCode = $String(object.smsCode);
        if (object.generateNewToken != null)
            message.generateNewToken = $Boolean(object.generateNewToken);
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
    CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request.toObject = function (message, options, _depth) {
        if (!options)
            options = {};
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw $Error("max depth exceeded");
        let object = {};
        if (options.defaults) {
            object.smsCode = "";
            object.generateNewToken = false;
            object.version = 1;
        }
        if (message.smsCode != null && $Object.hasOwnProperty.call(message, "smsCode"))
            object.smsCode = message.smsCode;
        if (message.generateNewToken != null && $Object.hasOwnProperty.call(message, "generateNewToken"))
            object.generateNewToken = message.generateNewToken;
        if (message.version != null && $Object.hasOwnProperty.call(message, "version"))
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
    CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request.prototype.toJSON = function() {
        return CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the type url for CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request
     * @function getTypeUrl
     * @memberof CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request
     * @static
     * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
     * @returns {string} The type url
     */
    CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request.getTypeUrl = function(prefix) {
        if (prefix === $undefined)
            prefix = "type.googleapis.com";
        return prefix + "/CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request";
    };

    return CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request;
})();

export const CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response = $root.CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response = (() => {

    /**
     * Properties of a CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response.
     * @typedef {Object} CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response.$Properties
     * @property {boolean|null} [success] CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response success
     * @property {CRemoveAuthenticatorViaChallengeContinue_Replacement_Token.$Properties|null} [replacementToken] CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response replacementToken
     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
     */

    /**
     * Properties of a CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response.
     * @exports ICTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response
     * @interface ICTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response
     * @augments CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response.$Properties
     * @deprecated Use CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response.$Properties instead.
     */

    /**
     * Shape of a CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response.
     * @typedef {CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response.$Properties} CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response.$Shape
     */

    /**
     * Constructs a new CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response.
     * @exports CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response
     * @classdesc Represents a CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response.
     * @constructor
     * @param {CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response.$Properties=} [properties] Properties to set
     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
     */
    const CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response = function (properties) {
        if (properties)
            for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null && keys[i] !== "__proto__")
                    this[keys[i]] = properties[keys[i]];
    };

    /**
     * CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response success.
     * @member {boolean} success
     * @memberof CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response
     * @instance
     */
    CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response.prototype.success = false;

    /**
     * CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response replacementToken.
     * @member {CRemoveAuthenticatorViaChallengeContinue_Replacement_Token.$Properties|null|undefined} replacementToken
     * @memberof CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response
     * @instance
     */
    CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response.prototype.replacementToken = null;

    /**
     * Creates a new CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response instance using the specified properties.
     * @function create
     * @memberof CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response
     * @static
     * @param {CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response.$Properties=} [properties] Properties to set
     * @returns {CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response} CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response instance
     * @type {{
     *   (properties: CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response.$Shape): CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response & CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response.$Shape;
     *   (properties?: CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response.$Properties): CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response;
     * }}
     */
    CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response.create = function(properties) {
        return new CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response(properties);
    };

    /**
     * Encodes the specified CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response message. Does not implicitly {@link CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response.verify|verify} messages.
     * @function encode
     * @memberof CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response
     * @static
     * @param {CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response.$Properties} message CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response.encode = function (message, writer, _depth) {
        if (!writer)
            writer = $Writer.create();
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw $Error("max depth exceeded");
        if (message.success != null && $Object.hasOwnProperty.call(message, "success"))
            writer.uint32(/* id 1, wireType 0 =*/8).bool(message.success);
        if (message.replacementToken != null && $Object.hasOwnProperty.call(message, "replacementToken"))
            $root.CRemoveAuthenticatorViaChallengeContinue_Replacement_Token.encode(message.replacementToken, writer.uint32(/* id 2, wireType 2 =*/18).fork(), _depth + 1).ldelim();
        if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
            for (let i = 0; i < message.$unknowns.length; ++i)
                writer.raw(message.$unknowns[i]);
        return writer;
    };

    /**
     * Encodes the specified CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response message, length delimited. Does not implicitly {@link CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response.verify|verify} messages.
     * @function encodeDelimited
     * @memberof CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response
     * @static
     * @param {CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response.$Properties} message CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response.encodeDelimited = function(message, writer) {
        return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
    };

    /**
     * Decodes a CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response message from the specified reader or buffer.
     * @function decode
     * @memberof CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response & CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response.$Shape} CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response.decode = function (reader, length, _end, _depth, _target) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $Reader.recursionLimit)
            throw $Error("max depth exceeded");
        let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response();
        while (reader.pos < end) {
            let start = reader.pos;
            let tag = reader.tag();
            if (tag === _end) {
                _end = $undefined;
                break;
            }
            let wireType = tag & 7;
            switch (tag >>>= 3) {
            case 1: {
                    if (wireType !== 0)
                        break;
                    message.success = reader.bool();
                    continue;
                }
            case 2: {
                    if (wireType !== 2)
                        break;
                    message.replacementToken = $root.CRemoveAuthenticatorViaChallengeContinue_Replacement_Token.decode(reader, reader.uint32(), $undefined, _depth + 1, message.replacementToken);
                    continue;
                }
            }
            reader.skipType(wireType, _depth, tag);
            if (!reader.discardUnknown) {
                $util.makeProp(message, "$unknowns", false);
                (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
            }
        }
        if (_end !== $undefined)
            throw $Error("missing end group");
        return message;
    };

    /**
     * Decodes a CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response & CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response.$Shape} CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response.decodeDelimited = function(reader) {
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
    CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response.verify = function (message, _depth) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            return "max depth exceeded";
        if (message.success != null && $Object.hasOwnProperty.call(message, "success"))
            if (typeof message.success !== "boolean")
                return "success: boolean expected";
        if (message.replacementToken != null && $Object.hasOwnProperty.call(message, "replacementToken")) {
            let error = $root.CRemoveAuthenticatorViaChallengeContinue_Replacement_Token.verify(message.replacementToken, _depth + 1);
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
    CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response.fromObject = function (object, _depth) {
        if (object instanceof $root.CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response)
            return object;
        if (!$util.isObject(object))
            throw $TypeError(".CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response: object expected");
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw $Error("max depth exceeded");
        let message = new $root.CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response();
        if (object.success != null)
            message.success = $Boolean(object.success);
        if (object.replacementToken != null) {
            if (!$util.isObject(object.replacementToken))
                throw $TypeError(".CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response.replacementToken: object expected");
            message.replacementToken = $root.CRemoveAuthenticatorViaChallengeContinue_Replacement_Token.fromObject(object.replacementToken, _depth + 1);
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
    CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response.toObject = function (message, options, _depth) {
        if (!options)
            options = {};
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw $Error("max depth exceeded");
        let object = {};
        if (options.defaults) {
            object.success = false;
            object.replacementToken = null;
        }
        if (message.success != null && $Object.hasOwnProperty.call(message, "success"))
            object.success = message.success;
        if (message.replacementToken != null && $Object.hasOwnProperty.call(message, "replacementToken"))
            object.replacementToken = $root.CRemoveAuthenticatorViaChallengeContinue_Replacement_Token.toObject(message.replacementToken, options, _depth + 1);
        return object;
    };

    /**
     * Converts this CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response to JSON.
     * @function toJSON
     * @memberof CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response.prototype.toJSON = function() {
        return CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the type url for CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response
     * @function getTypeUrl
     * @memberof CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response
     * @static
     * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
     * @returns {string} The type url
     */
    CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response.getTypeUrl = function(prefix) {
        if (prefix === $undefined)
            prefix = "type.googleapis.com";
        return prefix + "/CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response";
    };

    return CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response;
})();

export {
  $root as default
};
