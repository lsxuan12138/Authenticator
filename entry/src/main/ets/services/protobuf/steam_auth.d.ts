import * as $protobuf from "@ohos/protobufjs";
import Long = require("long");

/** EAuthTokenPlatformType enum. */
export enum EAuthTokenPlatformType {

    /** k_EAuthTokenPlatformType_Unknown value */
    k_EAuthTokenPlatformType_Unknown = 0,

    /** k_EAuthTokenPlatformType_SteamClient value */
    k_EAuthTokenPlatformType_SteamClient = 1,

    /** k_EAuthTokenPlatformType_WebBrowser value */
    k_EAuthTokenPlatformType_WebBrowser = 2,

    /** k_EAuthTokenPlatformType_MobileApp value */
    k_EAuthTokenPlatformType_MobileApp = 3
}

/** EAuthSessionGuardType enum. */
export enum EAuthSessionGuardType {

    /** k_EAuthSessionGuardType_Unknown value */
    k_EAuthSessionGuardType_Unknown = 0,

    /** k_EAuthSessionGuardType_None value */
    k_EAuthSessionGuardType_None = 1,

    /** k_EAuthSessionGuardType_EmailCode value */
    k_EAuthSessionGuardType_EmailCode = 2,

    /** k_EAuthSessionGuardType_DeviceCode value */
    k_EAuthSessionGuardType_DeviceCode = 3,

    /** k_EAuthSessionGuardType_DeviceConfirmation value */
    k_EAuthSessionGuardType_DeviceConfirmation = 4,

    /** k_EAuthSessionGuardType_EmailConfirmation value */
    k_EAuthSessionGuardType_EmailConfirmation = 5,

    /** k_EAuthSessionGuardType_MachineToken value */
    k_EAuthSessionGuardType_MachineToken = 6,

    /** k_EAuthSessionGuardType_LegacyMachineAuth value */
    k_EAuthSessionGuardType_LegacyMachineAuth = 7
}

/** ESessionPersistence enum. */
export enum ESessionPersistence {

    /** k_ESessionPersistence_Invalid value */
    k_ESessionPersistence_Invalid = -1,

    /** k_ESessionPersistence_Ephemeral value */
    k_ESessionPersistence_Ephemeral = 0,

    /** k_ESessionPersistence_Persistent value */
    k_ESessionPersistence_Persistent = 1
}

/**
 * Properties of a CAuthentication_DeviceDetails.
 * @deprecated Use CAuthentication_DeviceDetails.$Properties instead.
 */
export interface ICAuthentication_DeviceDetails extends CAuthentication_DeviceDetails.$Properties {
}

/** Represents a CAuthentication_DeviceDetails. */
export class CAuthentication_DeviceDetails {

    /**
     * Constructs a new CAuthentication_DeviceDetails.
     * @param [properties] Properties to set
     */
    constructor(properties?: CAuthentication_DeviceDetails.$Properties);

    /** Unknown fields preserved while decoding when enabled */
    $unknowns?: Uint8Array[];

    /** CAuthentication_DeviceDetails deviceFriendlyName. */
    deviceFriendlyName: string;

    /** CAuthentication_DeviceDetails platformType. */
    platformType: EAuthTokenPlatformType;

    /** CAuthentication_DeviceDetails osType. */
    osType: number;

    /** CAuthentication_DeviceDetails gamingDeviceType. */
    gamingDeviceType: number;

    /** CAuthentication_DeviceDetails clientCount. */
    clientCount: number;

    /** CAuthentication_DeviceDetails machineId. */
    machineId: Uint8Array;

    /**
     * Creates a new CAuthentication_DeviceDetails instance using the specified properties.
     * @param [properties] Properties to set
     * @returns CAuthentication_DeviceDetails instance
     */
    static create(properties: CAuthentication_DeviceDetails.$Shape): CAuthentication_DeviceDetails & CAuthentication_DeviceDetails.$Shape;
    static create(properties?: CAuthentication_DeviceDetails.$Properties): CAuthentication_DeviceDetails;

    /**
     * Encodes the specified CAuthentication_DeviceDetails message. Does not implicitly {@link CAuthentication_DeviceDetails.verify|verify} messages.
     * @param message CAuthentication_DeviceDetails message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    static encode(message: CAuthentication_DeviceDetails.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified CAuthentication_DeviceDetails message, length delimited. Does not implicitly {@link CAuthentication_DeviceDetails.verify|verify} messages.
     * @param message CAuthentication_DeviceDetails message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    static encodeDelimited(message: CAuthentication_DeviceDetails.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a CAuthentication_DeviceDetails message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns {CAuthentication_DeviceDetails & CAuthentication_DeviceDetails.$Shape} CAuthentication_DeviceDetails
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CAuthentication_DeviceDetails & CAuthentication_DeviceDetails.$Shape;

    /**
     * Decodes a CAuthentication_DeviceDetails message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns {CAuthentication_DeviceDetails & CAuthentication_DeviceDetails.$Shape} CAuthentication_DeviceDetails
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CAuthentication_DeviceDetails & CAuthentication_DeviceDetails.$Shape;

    /**
     * Verifies a CAuthentication_DeviceDetails message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a CAuthentication_DeviceDetails message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns CAuthentication_DeviceDetails
     */
    static fromObject(object: { [k: string]: any }): CAuthentication_DeviceDetails;

    /**
     * Creates a plain object from a CAuthentication_DeviceDetails message. Also converts values to other types if specified.
     * @param message CAuthentication_DeviceDetails
     * @param [options] Conversion options
     * @returns Plain object
     */
    static toObject(message: CAuthentication_DeviceDetails, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this CAuthentication_DeviceDetails to JSON.
     * @returns JSON object
     */
    toJSON(): { [k: string]: any };

    /**
     * Gets the type url for CAuthentication_DeviceDetails
     * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
     * @returns The type url
     */
    static getTypeUrl(prefix?: string): string;
}

export namespace CAuthentication_DeviceDetails {

    /** Properties of a CAuthentication_DeviceDetails. */
    interface $Properties {

        /** CAuthentication_DeviceDetails deviceFriendlyName */
        deviceFriendlyName?: (string|null);

        /** CAuthentication_DeviceDetails platformType */
        platformType?: (EAuthTokenPlatformType|null);

        /** CAuthentication_DeviceDetails osType */
        osType?: (number|null);

        /** CAuthentication_DeviceDetails gamingDeviceType */
        gamingDeviceType?: (number|null);

        /** CAuthentication_DeviceDetails clientCount */
        clientCount?: (number|null);

        /** CAuthentication_DeviceDetails machineId */
        machineId?: (Uint8Array|null);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];
    }

    /** Shape of a CAuthentication_DeviceDetails. */
    type $Shape = CAuthentication_DeviceDetails.$Properties;
}

/**
 * Properties of a CAuthentication_AllowedConfirmation.
 * @deprecated Use CAuthentication_AllowedConfirmation.$Properties instead.
 */
export interface ICAuthentication_AllowedConfirmation extends CAuthentication_AllowedConfirmation.$Properties {
}

/** Represents a CAuthentication_AllowedConfirmation. */
export class CAuthentication_AllowedConfirmation {

    /**
     * Constructs a new CAuthentication_AllowedConfirmation.
     * @param [properties] Properties to set
     */
    constructor(properties?: CAuthentication_AllowedConfirmation.$Properties);

    /** Unknown fields preserved while decoding when enabled */
    $unknowns?: Uint8Array[];

    /** CAuthentication_AllowedConfirmation confirmationType. */
    confirmationType: EAuthSessionGuardType;

    /** CAuthentication_AllowedConfirmation associatedMessage. */
    associatedMessage: string;

    /**
     * Creates a new CAuthentication_AllowedConfirmation instance using the specified properties.
     * @param [properties] Properties to set
     * @returns CAuthentication_AllowedConfirmation instance
     */
    static create(properties: CAuthentication_AllowedConfirmation.$Shape): CAuthentication_AllowedConfirmation & CAuthentication_AllowedConfirmation.$Shape;
    static create(properties?: CAuthentication_AllowedConfirmation.$Properties): CAuthentication_AllowedConfirmation;

    /**
     * Encodes the specified CAuthentication_AllowedConfirmation message. Does not implicitly {@link CAuthentication_AllowedConfirmation.verify|verify} messages.
     * @param message CAuthentication_AllowedConfirmation message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    static encode(message: CAuthentication_AllowedConfirmation.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified CAuthentication_AllowedConfirmation message, length delimited. Does not implicitly {@link CAuthentication_AllowedConfirmation.verify|verify} messages.
     * @param message CAuthentication_AllowedConfirmation message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    static encodeDelimited(message: CAuthentication_AllowedConfirmation.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a CAuthentication_AllowedConfirmation message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns {CAuthentication_AllowedConfirmation & CAuthentication_AllowedConfirmation.$Shape} CAuthentication_AllowedConfirmation
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CAuthentication_AllowedConfirmation & CAuthentication_AllowedConfirmation.$Shape;

    /**
     * Decodes a CAuthentication_AllowedConfirmation message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns {CAuthentication_AllowedConfirmation & CAuthentication_AllowedConfirmation.$Shape} CAuthentication_AllowedConfirmation
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CAuthentication_AllowedConfirmation & CAuthentication_AllowedConfirmation.$Shape;

    /**
     * Verifies a CAuthentication_AllowedConfirmation message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a CAuthentication_AllowedConfirmation message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns CAuthentication_AllowedConfirmation
     */
    static fromObject(object: { [k: string]: any }): CAuthentication_AllowedConfirmation;

    /**
     * Creates a plain object from a CAuthentication_AllowedConfirmation message. Also converts values to other types if specified.
     * @param message CAuthentication_AllowedConfirmation
     * @param [options] Conversion options
     * @returns Plain object
     */
    static toObject(message: CAuthentication_AllowedConfirmation, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this CAuthentication_AllowedConfirmation to JSON.
     * @returns JSON object
     */
    toJSON(): { [k: string]: any };

    /**
     * Gets the type url for CAuthentication_AllowedConfirmation
     * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
     * @returns The type url
     */
    static getTypeUrl(prefix?: string): string;
}

export namespace CAuthentication_AllowedConfirmation {

    /** Properties of a CAuthentication_AllowedConfirmation. */
    interface $Properties {

        /** CAuthentication_AllowedConfirmation confirmationType */
        confirmationType?: (EAuthSessionGuardType|null);

        /** CAuthentication_AllowedConfirmation associatedMessage */
        associatedMessage?: (string|null);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];
    }

    /** Shape of a CAuthentication_AllowedConfirmation. */
    type $Shape = CAuthentication_AllowedConfirmation.$Properties;
}

/**
 * Properties of a CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData.
 * @deprecated Use CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData.$Properties instead.
 */
export interface ICAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData extends CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData.$Properties {
}

/** Represents a CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData. */
export class CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData {

    /**
     * Constructs a new CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData.
     * @param [properties] Properties to set
     */
    constructor(properties?: CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData.$Properties);

    /** Unknown fields preserved while decoding when enabled */
    $unknowns?: Uint8Array[];

    /** CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData deviceFriendlyName. */
    deviceFriendlyName: string;

    /** CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData accountName. */
    accountName: string;

    /** CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData encryptedPassword. */
    encryptedPassword: string;

    /** CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData encryptionTimestamp. */
    encryptionTimestamp: (number|Long);

    /** CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData rememberLogin. */
    rememberLogin: boolean;

    /** CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData platformType. */
    platformType: EAuthTokenPlatformType;

    /** CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData persistence. */
    persistence: ESessionPersistence;

    /** CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData websiteId. */
    websiteId: string;

    /** CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData deviceDetails. */
    deviceDetails?: (CAuthentication_DeviceDetails.$Properties|null);

    /** CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData guardData. */
    guardData: Uint8Array;

    /** CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData language. */
    language: number;

    /** CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData qosLevel. */
    qosLevel: number;

    /**
     * Creates a new CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData instance using the specified properties.
     * @param [properties] Properties to set
     * @returns CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData instance
     */
    static create(properties: CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData.$Shape): CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData & CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData.$Shape;
    static create(properties?: CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData.$Properties): CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData;

    /**
     * Encodes the specified CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData message. Does not implicitly {@link CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData.verify|verify} messages.
     * @param message CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    static encode(message: CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData message, length delimited. Does not implicitly {@link CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData.verify|verify} messages.
     * @param message CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    static encodeDelimited(message: CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns {CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData & CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData.$Shape} CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData & CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData.$Shape;

    /**
     * Decodes a CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns {CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData & CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData.$Shape} CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData & CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData.$Shape;

    /**
     * Verifies a CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData
     */
    static fromObject(object: { [k: string]: any }): CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData;

    /**
     * Creates a plain object from a CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData message. Also converts values to other types if specified.
     * @param message CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData
     * @param [options] Conversion options
     * @returns Plain object
     */
    static toObject(message: CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData to JSON.
     * @returns JSON object
     */
    toJSON(): { [k: string]: any };

    /**
     * Gets the type url for CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData
     * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
     * @returns The type url
     */
    static getTypeUrl(prefix?: string): string;
}

export namespace CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData {

    /** Properties of a CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData. */
    interface $Properties {

        /** CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData deviceFriendlyName */
        deviceFriendlyName?: (string|null);

        /** CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData accountName */
        accountName?: (string|null);

        /** CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData encryptedPassword */
        encryptedPassword?: (string|null);

        /** CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData encryptionTimestamp */
        encryptionTimestamp?: (number|Long|null);

        /** CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData rememberLogin */
        rememberLogin?: (boolean|null);

        /** CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData platformType */
        platformType?: (EAuthTokenPlatformType|null);

        /** CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData persistence */
        persistence?: (ESessionPersistence|null);

        /** CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData websiteId */
        websiteId?: (string|null);

        /** CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData deviceDetails */
        deviceDetails?: (CAuthentication_DeviceDetails.$Properties|null);

        /** CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData guardData */
        guardData?: (Uint8Array|null);

        /** CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData language */
        language?: (number|null);

        /** CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData qosLevel */
        qosLevel?: (number|null);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];
    }

    /** Shape of a CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData. */
    type $Shape = CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData.$Properties;
}

/**
 * Properties of a CAuthentication_BeginAuthSessionViaCredentials_Response.
 * @deprecated Use CAuthentication_BeginAuthSessionViaCredentials_Response.$Properties instead.
 */
export interface ICAuthentication_BeginAuthSessionViaCredentials_Response extends CAuthentication_BeginAuthSessionViaCredentials_Response.$Properties {
}

/** Represents a CAuthentication_BeginAuthSessionViaCredentials_Response. */
export class CAuthentication_BeginAuthSessionViaCredentials_Response {

    /**
     * Constructs a new CAuthentication_BeginAuthSessionViaCredentials_Response.
     * @param [properties] Properties to set
     */
    constructor(properties?: CAuthentication_BeginAuthSessionViaCredentials_Response.$Properties);

    /** Unknown fields preserved while decoding when enabled */
    $unknowns?: Uint8Array[];

    /** CAuthentication_BeginAuthSessionViaCredentials_Response clientId. */
    clientId: (number|Long);

    /** CAuthentication_BeginAuthSessionViaCredentials_Response requestId. */
    requestId: Uint8Array;

    /** CAuthentication_BeginAuthSessionViaCredentials_Response interval. */
    interval: number;

    /** CAuthentication_BeginAuthSessionViaCredentials_Response allowedConfirmations. */
    allowedConfirmations: CAuthentication_AllowedConfirmation.$Properties[];

    /** CAuthentication_BeginAuthSessionViaCredentials_Response steamid. */
    steamid: (number|Long);

    /** CAuthentication_BeginAuthSessionViaCredentials_Response weakToken. */
    weakToken: string;

    /** CAuthentication_BeginAuthSessionViaCredentials_Response agreementSessionUrl. */
    agreementSessionUrl: string;

    /** CAuthentication_BeginAuthSessionViaCredentials_Response extendedErrorMessage. */
    extendedErrorMessage: string;

    /**
     * Creates a new CAuthentication_BeginAuthSessionViaCredentials_Response instance using the specified properties.
     * @param [properties] Properties to set
     * @returns CAuthentication_BeginAuthSessionViaCredentials_Response instance
     */
    static create(properties: CAuthentication_BeginAuthSessionViaCredentials_Response.$Shape): CAuthentication_BeginAuthSessionViaCredentials_Response & CAuthentication_BeginAuthSessionViaCredentials_Response.$Shape;
    static create(properties?: CAuthentication_BeginAuthSessionViaCredentials_Response.$Properties): CAuthentication_BeginAuthSessionViaCredentials_Response;

    /**
     * Encodes the specified CAuthentication_BeginAuthSessionViaCredentials_Response message. Does not implicitly {@link CAuthentication_BeginAuthSessionViaCredentials_Response.verify|verify} messages.
     * @param message CAuthentication_BeginAuthSessionViaCredentials_Response message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    static encode(message: CAuthentication_BeginAuthSessionViaCredentials_Response.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified CAuthentication_BeginAuthSessionViaCredentials_Response message, length delimited. Does not implicitly {@link CAuthentication_BeginAuthSessionViaCredentials_Response.verify|verify} messages.
     * @param message CAuthentication_BeginAuthSessionViaCredentials_Response message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    static encodeDelimited(message: CAuthentication_BeginAuthSessionViaCredentials_Response.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a CAuthentication_BeginAuthSessionViaCredentials_Response message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns {CAuthentication_BeginAuthSessionViaCredentials_Response & CAuthentication_BeginAuthSessionViaCredentials_Response.$Shape} CAuthentication_BeginAuthSessionViaCredentials_Response
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CAuthentication_BeginAuthSessionViaCredentials_Response & CAuthentication_BeginAuthSessionViaCredentials_Response.$Shape;

    /**
     * Decodes a CAuthentication_BeginAuthSessionViaCredentials_Response message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns {CAuthentication_BeginAuthSessionViaCredentials_Response & CAuthentication_BeginAuthSessionViaCredentials_Response.$Shape} CAuthentication_BeginAuthSessionViaCredentials_Response
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CAuthentication_BeginAuthSessionViaCredentials_Response & CAuthentication_BeginAuthSessionViaCredentials_Response.$Shape;

    /**
     * Verifies a CAuthentication_BeginAuthSessionViaCredentials_Response message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a CAuthentication_BeginAuthSessionViaCredentials_Response message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns CAuthentication_BeginAuthSessionViaCredentials_Response
     */
    static fromObject(object: { [k: string]: any }): CAuthentication_BeginAuthSessionViaCredentials_Response;

    /**
     * Creates a plain object from a CAuthentication_BeginAuthSessionViaCredentials_Response message. Also converts values to other types if specified.
     * @param message CAuthentication_BeginAuthSessionViaCredentials_Response
     * @param [options] Conversion options
     * @returns Plain object
     */
    static toObject(message: CAuthentication_BeginAuthSessionViaCredentials_Response, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this CAuthentication_BeginAuthSessionViaCredentials_Response to JSON.
     * @returns JSON object
     */
    toJSON(): { [k: string]: any };

    /**
     * Gets the type url for CAuthentication_BeginAuthSessionViaCredentials_Response
     * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
     * @returns The type url
     */
    static getTypeUrl(prefix?: string): string;
}

export namespace CAuthentication_BeginAuthSessionViaCredentials_Response {

    /** Properties of a CAuthentication_BeginAuthSessionViaCredentials_Response. */
    interface $Properties {

        /** CAuthentication_BeginAuthSessionViaCredentials_Response clientId */
        clientId?: (number|Long|null);

        /** CAuthentication_BeginAuthSessionViaCredentials_Response requestId */
        requestId?: (Uint8Array|null);

        /** CAuthentication_BeginAuthSessionViaCredentials_Response interval */
        interval?: (number|null);

        /** CAuthentication_BeginAuthSessionViaCredentials_Response allowedConfirmations */
        allowedConfirmations?: (CAuthentication_AllowedConfirmation.$Properties[]|null);

        /** CAuthentication_BeginAuthSessionViaCredentials_Response steamid */
        steamid?: (number|Long|null);

        /** CAuthentication_BeginAuthSessionViaCredentials_Response weakToken */
        weakToken?: (string|null);

        /** CAuthentication_BeginAuthSessionViaCredentials_Response agreementSessionUrl */
        agreementSessionUrl?: (string|null);

        /** CAuthentication_BeginAuthSessionViaCredentials_Response extendedErrorMessage */
        extendedErrorMessage?: (string|null);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];
    }

    /** Shape of a CAuthentication_BeginAuthSessionViaCredentials_Response. */
    type $Shape = CAuthentication_BeginAuthSessionViaCredentials_Response.$Properties;
}

/**
 * Properties of a CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request.
 * @deprecated Use CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request.$Properties instead.
 */
export interface ICAuthentication_UpdateAuthSessionWithSteamGuardCode_Request extends CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request.$Properties {
}

/** Represents a CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request. */
export class CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request {

    /**
     * Constructs a new CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request.
     * @param [properties] Properties to set
     */
    constructor(properties?: CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request.$Properties);

    /** Unknown fields preserved while decoding when enabled */
    $unknowns?: Uint8Array[];

    /** CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request clientId. */
    clientId: (number|Long);

    /** CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request steamid. */
    steamid: (number|Long);

    /** CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request code. */
    code: string;

    /** CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request codeType. */
    codeType: EAuthSessionGuardType;

    /**
     * Creates a new CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request instance using the specified properties.
     * @param [properties] Properties to set
     * @returns CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request instance
     */
    static create(properties: CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request.$Shape): CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request & CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request.$Shape;
    static create(properties?: CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request.$Properties): CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request;

    /**
     * Encodes the specified CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request message. Does not implicitly {@link CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request.verify|verify} messages.
     * @param message CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    static encode(message: CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request message, length delimited. Does not implicitly {@link CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request.verify|verify} messages.
     * @param message CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    static encodeDelimited(message: CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns {CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request & CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request.$Shape} CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request & CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request.$Shape;

    /**
     * Decodes a CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns {CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request & CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request.$Shape} CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request & CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request.$Shape;

    /**
     * Verifies a CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request
     */
    static fromObject(object: { [k: string]: any }): CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request;

    /**
     * Creates a plain object from a CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request message. Also converts values to other types if specified.
     * @param message CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request
     * @param [options] Conversion options
     * @returns Plain object
     */
    static toObject(message: CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request to JSON.
     * @returns JSON object
     */
    toJSON(): { [k: string]: any };

    /**
     * Gets the type url for CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request
     * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
     * @returns The type url
     */
    static getTypeUrl(prefix?: string): string;
}

export namespace CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request {

    /** Properties of a CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request. */
    interface $Properties {

        /** CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request clientId */
        clientId?: (number|Long|null);

        /** CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request steamid */
        steamid?: (number|Long|null);

        /** CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request code */
        code?: (string|null);

        /** CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request codeType */
        codeType?: (EAuthSessionGuardType|null);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];
    }

    /** Shape of a CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request. */
    type $Shape = CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request.$Properties;
}

/**
 * Properties of a CAuthentication_PollAuthSessionStatus_Request.
 * @deprecated Use CAuthentication_PollAuthSessionStatus_Request.$Properties instead.
 */
export interface ICAuthentication_PollAuthSessionStatus_Request extends CAuthentication_PollAuthSessionStatus_Request.$Properties {
}

/** Represents a CAuthentication_PollAuthSessionStatus_Request. */
export class CAuthentication_PollAuthSessionStatus_Request {

    /**
     * Constructs a new CAuthentication_PollAuthSessionStatus_Request.
     * @param [properties] Properties to set
     */
    constructor(properties?: CAuthentication_PollAuthSessionStatus_Request.$Properties);

    /** Unknown fields preserved while decoding when enabled */
    $unknowns?: Uint8Array[];

    /** CAuthentication_PollAuthSessionStatus_Request clientId. */
    clientId: (number|Long);

    /** CAuthentication_PollAuthSessionStatus_Request requestId. */
    requestId: Uint8Array;

    /** CAuthentication_PollAuthSessionStatus_Request tokenToRevoke. */
    tokenToRevoke: (number|Long);

    /**
     * Creates a new CAuthentication_PollAuthSessionStatus_Request instance using the specified properties.
     * @param [properties] Properties to set
     * @returns CAuthentication_PollAuthSessionStatus_Request instance
     */
    static create(properties: CAuthentication_PollAuthSessionStatus_Request.$Shape): CAuthentication_PollAuthSessionStatus_Request & CAuthentication_PollAuthSessionStatus_Request.$Shape;
    static create(properties?: CAuthentication_PollAuthSessionStatus_Request.$Properties): CAuthentication_PollAuthSessionStatus_Request;

    /**
     * Encodes the specified CAuthentication_PollAuthSessionStatus_Request message. Does not implicitly {@link CAuthentication_PollAuthSessionStatus_Request.verify|verify} messages.
     * @param message CAuthentication_PollAuthSessionStatus_Request message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    static encode(message: CAuthentication_PollAuthSessionStatus_Request.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified CAuthentication_PollAuthSessionStatus_Request message, length delimited. Does not implicitly {@link CAuthentication_PollAuthSessionStatus_Request.verify|verify} messages.
     * @param message CAuthentication_PollAuthSessionStatus_Request message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    static encodeDelimited(message: CAuthentication_PollAuthSessionStatus_Request.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a CAuthentication_PollAuthSessionStatus_Request message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns {CAuthentication_PollAuthSessionStatus_Request & CAuthentication_PollAuthSessionStatus_Request.$Shape} CAuthentication_PollAuthSessionStatus_Request
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CAuthentication_PollAuthSessionStatus_Request & CAuthentication_PollAuthSessionStatus_Request.$Shape;

    /**
     * Decodes a CAuthentication_PollAuthSessionStatus_Request message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns {CAuthentication_PollAuthSessionStatus_Request & CAuthentication_PollAuthSessionStatus_Request.$Shape} CAuthentication_PollAuthSessionStatus_Request
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CAuthentication_PollAuthSessionStatus_Request & CAuthentication_PollAuthSessionStatus_Request.$Shape;

    /**
     * Verifies a CAuthentication_PollAuthSessionStatus_Request message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a CAuthentication_PollAuthSessionStatus_Request message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns CAuthentication_PollAuthSessionStatus_Request
     */
    static fromObject(object: { [k: string]: any }): CAuthentication_PollAuthSessionStatus_Request;

    /**
     * Creates a plain object from a CAuthentication_PollAuthSessionStatus_Request message. Also converts values to other types if specified.
     * @param message CAuthentication_PollAuthSessionStatus_Request
     * @param [options] Conversion options
     * @returns Plain object
     */
    static toObject(message: CAuthentication_PollAuthSessionStatus_Request, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this CAuthentication_PollAuthSessionStatus_Request to JSON.
     * @returns JSON object
     */
    toJSON(): { [k: string]: any };

    /**
     * Gets the type url for CAuthentication_PollAuthSessionStatus_Request
     * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
     * @returns The type url
     */
    static getTypeUrl(prefix?: string): string;
}

export namespace CAuthentication_PollAuthSessionStatus_Request {

    /** Properties of a CAuthentication_PollAuthSessionStatus_Request. */
    interface $Properties {

        /** CAuthentication_PollAuthSessionStatus_Request clientId */
        clientId?: (number|Long|null);

        /** CAuthentication_PollAuthSessionStatus_Request requestId */
        requestId?: (Uint8Array|null);

        /** CAuthentication_PollAuthSessionStatus_Request tokenToRevoke */
        tokenToRevoke?: (number|Long|null);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];
    }

    /** Shape of a CAuthentication_PollAuthSessionStatus_Request. */
    type $Shape = CAuthentication_PollAuthSessionStatus_Request.$Properties;
}

/**
 * Properties of a CAuthentication_PollAuthSessionStatus_Response.
 * @deprecated Use CAuthentication_PollAuthSessionStatus_Response.$Properties instead.
 */
export interface ICAuthentication_PollAuthSessionStatus_Response extends CAuthentication_PollAuthSessionStatus_Response.$Properties {
}

/** Represents a CAuthentication_PollAuthSessionStatus_Response. */
export class CAuthentication_PollAuthSessionStatus_Response {

    /**
     * Constructs a new CAuthentication_PollAuthSessionStatus_Response.
     * @param [properties] Properties to set
     */
    constructor(properties?: CAuthentication_PollAuthSessionStatus_Response.$Properties);

    /** Unknown fields preserved while decoding when enabled */
    $unknowns?: Uint8Array[];

    /** CAuthentication_PollAuthSessionStatus_Response newClientId. */
    newClientId: (number|Long);

    /** CAuthentication_PollAuthSessionStatus_Response newChallengeUrl. */
    newChallengeUrl: string;

    /** CAuthentication_PollAuthSessionStatus_Response refreshToken. */
    refreshToken: string;

    /** CAuthentication_PollAuthSessionStatus_Response accessToken. */
    accessToken: string;

    /** CAuthentication_PollAuthSessionStatus_Response hadRemoteInteraction. */
    hadRemoteInteraction: boolean;

    /** CAuthentication_PollAuthSessionStatus_Response accountName. */
    accountName: string;

    /** CAuthentication_PollAuthSessionStatus_Response newGuardData. */
    newGuardData: string;

    /** CAuthentication_PollAuthSessionStatus_Response agreementSessionUrl. */
    agreementSessionUrl: string;

    /**
     * Creates a new CAuthentication_PollAuthSessionStatus_Response instance using the specified properties.
     * @param [properties] Properties to set
     * @returns CAuthentication_PollAuthSessionStatus_Response instance
     */
    static create(properties: CAuthentication_PollAuthSessionStatus_Response.$Shape): CAuthentication_PollAuthSessionStatus_Response & CAuthentication_PollAuthSessionStatus_Response.$Shape;
    static create(properties?: CAuthentication_PollAuthSessionStatus_Response.$Properties): CAuthentication_PollAuthSessionStatus_Response;

    /**
     * Encodes the specified CAuthentication_PollAuthSessionStatus_Response message. Does not implicitly {@link CAuthentication_PollAuthSessionStatus_Response.verify|verify} messages.
     * @param message CAuthentication_PollAuthSessionStatus_Response message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    static encode(message: CAuthentication_PollAuthSessionStatus_Response.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified CAuthentication_PollAuthSessionStatus_Response message, length delimited. Does not implicitly {@link CAuthentication_PollAuthSessionStatus_Response.verify|verify} messages.
     * @param message CAuthentication_PollAuthSessionStatus_Response message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    static encodeDelimited(message: CAuthentication_PollAuthSessionStatus_Response.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a CAuthentication_PollAuthSessionStatus_Response message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns {CAuthentication_PollAuthSessionStatus_Response & CAuthentication_PollAuthSessionStatus_Response.$Shape} CAuthentication_PollAuthSessionStatus_Response
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CAuthentication_PollAuthSessionStatus_Response & CAuthentication_PollAuthSessionStatus_Response.$Shape;

    /**
     * Decodes a CAuthentication_PollAuthSessionStatus_Response message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns {CAuthentication_PollAuthSessionStatus_Response & CAuthentication_PollAuthSessionStatus_Response.$Shape} CAuthentication_PollAuthSessionStatus_Response
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CAuthentication_PollAuthSessionStatus_Response & CAuthentication_PollAuthSessionStatus_Response.$Shape;

    /**
     * Verifies a CAuthentication_PollAuthSessionStatus_Response message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a CAuthentication_PollAuthSessionStatus_Response message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns CAuthentication_PollAuthSessionStatus_Response
     */
    static fromObject(object: { [k: string]: any }): CAuthentication_PollAuthSessionStatus_Response;

    /**
     * Creates a plain object from a CAuthentication_PollAuthSessionStatus_Response message. Also converts values to other types if specified.
     * @param message CAuthentication_PollAuthSessionStatus_Response
     * @param [options] Conversion options
     * @returns Plain object
     */
    static toObject(message: CAuthentication_PollAuthSessionStatus_Response, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this CAuthentication_PollAuthSessionStatus_Response to JSON.
     * @returns JSON object
     */
    toJSON(): { [k: string]: any };

    /**
     * Gets the type url for CAuthentication_PollAuthSessionStatus_Response
     * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
     * @returns The type url
     */
    static getTypeUrl(prefix?: string): string;
}

export namespace CAuthentication_PollAuthSessionStatus_Response {

    /** Properties of a CAuthentication_PollAuthSessionStatus_Response. */
    interface $Properties {

        /** CAuthentication_PollAuthSessionStatus_Response newClientId */
        newClientId?: (number|Long|null);

        /** CAuthentication_PollAuthSessionStatus_Response newChallengeUrl */
        newChallengeUrl?: (string|null);

        /** CAuthentication_PollAuthSessionStatus_Response refreshToken */
        refreshToken?: (string|null);

        /** CAuthentication_PollAuthSessionStatus_Response accessToken */
        accessToken?: (string|null);

        /** CAuthentication_PollAuthSessionStatus_Response hadRemoteInteraction */
        hadRemoteInteraction?: (boolean|null);

        /** CAuthentication_PollAuthSessionStatus_Response accountName */
        accountName?: (string|null);

        /** CAuthentication_PollAuthSessionStatus_Response newGuardData */
        newGuardData?: (string|null);

        /** CAuthentication_PollAuthSessionStatus_Response agreementSessionUrl */
        agreementSessionUrl?: (string|null);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];
    }

    /** Shape of a CAuthentication_PollAuthSessionStatus_Response. */
    type $Shape = CAuthentication_PollAuthSessionStatus_Response.$Properties;
}

/**
 * Properties of a CTwoFactor_AddAuthenticator_Request.
 * @deprecated Use CTwoFactor_AddAuthenticator_Request.$Properties instead.
 */
export interface ICTwoFactor_AddAuthenticator_Request extends CTwoFactor_AddAuthenticator_Request.$Properties {
}

/** Represents a CTwoFactor_AddAuthenticator_Request. */
export class CTwoFactor_AddAuthenticator_Request {

    /**
     * Constructs a new CTwoFactor_AddAuthenticator_Request.
     * @param [properties] Properties to set
     */
    constructor(properties?: CTwoFactor_AddAuthenticator_Request.$Properties);

    /** Unknown fields preserved while decoding when enabled */
    $unknowns?: Uint8Array[];

    /** CTwoFactor_AddAuthenticator_Request steamid. */
    steamid: (number|Long);

    /** CTwoFactor_AddAuthenticator_Request authenticatorTime. */
    authenticatorTime: (number|Long);

    /** CTwoFactor_AddAuthenticator_Request serialNumber. */
    serialNumber: (number|Long);

    /** CTwoFactor_AddAuthenticator_Request authenticatorType. */
    authenticatorType: number;

    /** CTwoFactor_AddAuthenticator_Request deviceIdentifier. */
    deviceIdentifier: string;

    /** CTwoFactor_AddAuthenticator_Request smsPhoneId. */
    smsPhoneId: string;

    /** CTwoFactor_AddAuthenticator_Request httpHeaders. */
    httpHeaders: string[];

    /** CTwoFactor_AddAuthenticator_Request version. */
    version: number;

    /**
     * Creates a new CTwoFactor_AddAuthenticator_Request instance using the specified properties.
     * @param [properties] Properties to set
     * @returns CTwoFactor_AddAuthenticator_Request instance
     */
    static create(properties: CTwoFactor_AddAuthenticator_Request.$Shape): CTwoFactor_AddAuthenticator_Request & CTwoFactor_AddAuthenticator_Request.$Shape;
    static create(properties?: CTwoFactor_AddAuthenticator_Request.$Properties): CTwoFactor_AddAuthenticator_Request;

    /**
     * Encodes the specified CTwoFactor_AddAuthenticator_Request message. Does not implicitly {@link CTwoFactor_AddAuthenticator_Request.verify|verify} messages.
     * @param message CTwoFactor_AddAuthenticator_Request message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    static encode(message: CTwoFactor_AddAuthenticator_Request.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified CTwoFactor_AddAuthenticator_Request message, length delimited. Does not implicitly {@link CTwoFactor_AddAuthenticator_Request.verify|verify} messages.
     * @param message CTwoFactor_AddAuthenticator_Request message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    static encodeDelimited(message: CTwoFactor_AddAuthenticator_Request.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a CTwoFactor_AddAuthenticator_Request message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns {CTwoFactor_AddAuthenticator_Request & CTwoFactor_AddAuthenticator_Request.$Shape} CTwoFactor_AddAuthenticator_Request
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CTwoFactor_AddAuthenticator_Request & CTwoFactor_AddAuthenticator_Request.$Shape;

    /**
     * Decodes a CTwoFactor_AddAuthenticator_Request message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns {CTwoFactor_AddAuthenticator_Request & CTwoFactor_AddAuthenticator_Request.$Shape} CTwoFactor_AddAuthenticator_Request
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CTwoFactor_AddAuthenticator_Request & CTwoFactor_AddAuthenticator_Request.$Shape;

    /**
     * Verifies a CTwoFactor_AddAuthenticator_Request message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a CTwoFactor_AddAuthenticator_Request message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns CTwoFactor_AddAuthenticator_Request
     */
    static fromObject(object: { [k: string]: any }): CTwoFactor_AddAuthenticator_Request;

    /**
     * Creates a plain object from a CTwoFactor_AddAuthenticator_Request message. Also converts values to other types if specified.
     * @param message CTwoFactor_AddAuthenticator_Request
     * @param [options] Conversion options
     * @returns Plain object
     */
    static toObject(message: CTwoFactor_AddAuthenticator_Request, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this CTwoFactor_AddAuthenticator_Request to JSON.
     * @returns JSON object
     */
    toJSON(): { [k: string]: any };

    /**
     * Gets the type url for CTwoFactor_AddAuthenticator_Request
     * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
     * @returns The type url
     */
    static getTypeUrl(prefix?: string): string;
}

export namespace CTwoFactor_AddAuthenticator_Request {

    /** Properties of a CTwoFactor_AddAuthenticator_Request. */
    interface $Properties {

        /** CTwoFactor_AddAuthenticator_Request steamid */
        steamid?: (number|Long|null);

        /** CTwoFactor_AddAuthenticator_Request authenticatorTime */
        authenticatorTime?: (number|Long|null);

        /** CTwoFactor_AddAuthenticator_Request serialNumber */
        serialNumber?: (number|Long|null);

        /** CTwoFactor_AddAuthenticator_Request authenticatorType */
        authenticatorType?: (number|null);

        /** CTwoFactor_AddAuthenticator_Request deviceIdentifier */
        deviceIdentifier?: (string|null);

        /** CTwoFactor_AddAuthenticator_Request smsPhoneId */
        smsPhoneId?: (string|null);

        /** CTwoFactor_AddAuthenticator_Request httpHeaders */
        httpHeaders?: (string[]|null);

        /** CTwoFactor_AddAuthenticator_Request version */
        version?: (number|null);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];
    }

    /** Shape of a CTwoFactor_AddAuthenticator_Request. */
    type $Shape = CTwoFactor_AddAuthenticator_Request.$Properties;
}

/**
 * Properties of a CTwoFactor_AddAuthenticator_Response.
 * @deprecated Use CTwoFactor_AddAuthenticator_Response.$Properties instead.
 */
export interface ICTwoFactor_AddAuthenticator_Response extends CTwoFactor_AddAuthenticator_Response.$Properties {
}

/** Represents a CTwoFactor_AddAuthenticator_Response. */
export class CTwoFactor_AddAuthenticator_Response {

    /**
     * Constructs a new CTwoFactor_AddAuthenticator_Response.
     * @param [properties] Properties to set
     */
    constructor(properties?: CTwoFactor_AddAuthenticator_Response.$Properties);

    /** Unknown fields preserved while decoding when enabled */
    $unknowns?: Uint8Array[];

    /** CTwoFactor_AddAuthenticator_Response sharedSecret. */
    sharedSecret: Uint8Array;

    /** CTwoFactor_AddAuthenticator_Response serialNumber. */
    serialNumber: (number|Long);

    /** CTwoFactor_AddAuthenticator_Response revocationCode. */
    revocationCode: string;

    /** CTwoFactor_AddAuthenticator_Response uri. */
    uri: string;

    /** CTwoFactor_AddAuthenticator_Response serverTime. */
    serverTime: (number|Long);

    /** CTwoFactor_AddAuthenticator_Response accountName. */
    accountName: string;

    /** CTwoFactor_AddAuthenticator_Response tokenGid. */
    tokenGid: string;

    /** CTwoFactor_AddAuthenticator_Response identitySecret. */
    identitySecret: Uint8Array;

    /** CTwoFactor_AddAuthenticator_Response secret_1. */
    secret_1: Uint8Array;

    /** CTwoFactor_AddAuthenticator_Response status. */
    status: number;

    /** CTwoFactor_AddAuthenticator_Response phoneNumberHint. */
    phoneNumberHint: string;

    /** CTwoFactor_AddAuthenticator_Response confirmType. */
    confirmType: number;

    /**
     * Creates a new CTwoFactor_AddAuthenticator_Response instance using the specified properties.
     * @param [properties] Properties to set
     * @returns CTwoFactor_AddAuthenticator_Response instance
     */
    static create(properties: CTwoFactor_AddAuthenticator_Response.$Shape): CTwoFactor_AddAuthenticator_Response & CTwoFactor_AddAuthenticator_Response.$Shape;
    static create(properties?: CTwoFactor_AddAuthenticator_Response.$Properties): CTwoFactor_AddAuthenticator_Response;

    /**
     * Encodes the specified CTwoFactor_AddAuthenticator_Response message. Does not implicitly {@link CTwoFactor_AddAuthenticator_Response.verify|verify} messages.
     * @param message CTwoFactor_AddAuthenticator_Response message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    static encode(message: CTwoFactor_AddAuthenticator_Response.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified CTwoFactor_AddAuthenticator_Response message, length delimited. Does not implicitly {@link CTwoFactor_AddAuthenticator_Response.verify|verify} messages.
     * @param message CTwoFactor_AddAuthenticator_Response message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    static encodeDelimited(message: CTwoFactor_AddAuthenticator_Response.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a CTwoFactor_AddAuthenticator_Response message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns {CTwoFactor_AddAuthenticator_Response & CTwoFactor_AddAuthenticator_Response.$Shape} CTwoFactor_AddAuthenticator_Response
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CTwoFactor_AddAuthenticator_Response & CTwoFactor_AddAuthenticator_Response.$Shape;

    /**
     * Decodes a CTwoFactor_AddAuthenticator_Response message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns {CTwoFactor_AddAuthenticator_Response & CTwoFactor_AddAuthenticator_Response.$Shape} CTwoFactor_AddAuthenticator_Response
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CTwoFactor_AddAuthenticator_Response & CTwoFactor_AddAuthenticator_Response.$Shape;

    /**
     * Verifies a CTwoFactor_AddAuthenticator_Response message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a CTwoFactor_AddAuthenticator_Response message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns CTwoFactor_AddAuthenticator_Response
     */
    static fromObject(object: { [k: string]: any }): CTwoFactor_AddAuthenticator_Response;

    /**
     * Creates a plain object from a CTwoFactor_AddAuthenticator_Response message. Also converts values to other types if specified.
     * @param message CTwoFactor_AddAuthenticator_Response
     * @param [options] Conversion options
     * @returns Plain object
     */
    static toObject(message: CTwoFactor_AddAuthenticator_Response, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this CTwoFactor_AddAuthenticator_Response to JSON.
     * @returns JSON object
     */
    toJSON(): { [k: string]: any };

    /**
     * Gets the type url for CTwoFactor_AddAuthenticator_Response
     * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
     * @returns The type url
     */
    static getTypeUrl(prefix?: string): string;
}

export namespace CTwoFactor_AddAuthenticator_Response {

    /** Properties of a CTwoFactor_AddAuthenticator_Response. */
    interface $Properties {

        /** CTwoFactor_AddAuthenticator_Response sharedSecret */
        sharedSecret?: (Uint8Array|null);

        /** CTwoFactor_AddAuthenticator_Response serialNumber */
        serialNumber?: (number|Long|null);

        /** CTwoFactor_AddAuthenticator_Response revocationCode */
        revocationCode?: (string|null);

        /** CTwoFactor_AddAuthenticator_Response uri */
        uri?: (string|null);

        /** CTwoFactor_AddAuthenticator_Response serverTime */
        serverTime?: (number|Long|null);

        /** CTwoFactor_AddAuthenticator_Response accountName */
        accountName?: (string|null);

        /** CTwoFactor_AddAuthenticator_Response tokenGid */
        tokenGid?: (string|null);

        /** CTwoFactor_AddAuthenticator_Response identitySecret */
        identitySecret?: (Uint8Array|null);

        /** CTwoFactor_AddAuthenticator_Response secret_1 */
        secret_1?: (Uint8Array|null);

        /** CTwoFactor_AddAuthenticator_Response status */
        status?: (number|null);

        /** CTwoFactor_AddAuthenticator_Response phoneNumberHint */
        phoneNumberHint?: (string|null);

        /** CTwoFactor_AddAuthenticator_Response confirmType */
        confirmType?: (number|null);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];
    }

    /** Shape of a CTwoFactor_AddAuthenticator_Response. */
    type $Shape = CTwoFactor_AddAuthenticator_Response.$Properties;
}

/**
 * Properties of a CTwoFactor_FinalizeAddAuthenticator_Request.
 * @deprecated Use CTwoFactor_FinalizeAddAuthenticator_Request.$Properties instead.
 */
export interface ICTwoFactor_FinalizeAddAuthenticator_Request extends CTwoFactor_FinalizeAddAuthenticator_Request.$Properties {
}

/** Represents a CTwoFactor_FinalizeAddAuthenticator_Request. */
export class CTwoFactor_FinalizeAddAuthenticator_Request {

    /**
     * Constructs a new CTwoFactor_FinalizeAddAuthenticator_Request.
     * @param [properties] Properties to set
     */
    constructor(properties?: CTwoFactor_FinalizeAddAuthenticator_Request.$Properties);

    /** Unknown fields preserved while decoding when enabled */
    $unknowns?: Uint8Array[];

    /** CTwoFactor_FinalizeAddAuthenticator_Request steamid. */
    steamid: (number|Long);

    /** CTwoFactor_FinalizeAddAuthenticator_Request authenticatorCode. */
    authenticatorCode: string;

    /** CTwoFactor_FinalizeAddAuthenticator_Request authenticatorTime. */
    authenticatorTime: (number|Long);

    /** CTwoFactor_FinalizeAddAuthenticator_Request activationCode. */
    activationCode: string;

    /** CTwoFactor_FinalizeAddAuthenticator_Request httpHeaders. */
    httpHeaders: string[];

    /** CTwoFactor_FinalizeAddAuthenticator_Request validateSmsCode. */
    validateSmsCode: boolean;

    /**
     * Creates a new CTwoFactor_FinalizeAddAuthenticator_Request instance using the specified properties.
     * @param [properties] Properties to set
     * @returns CTwoFactor_FinalizeAddAuthenticator_Request instance
     */
    static create(properties: CTwoFactor_FinalizeAddAuthenticator_Request.$Shape): CTwoFactor_FinalizeAddAuthenticator_Request & CTwoFactor_FinalizeAddAuthenticator_Request.$Shape;
    static create(properties?: CTwoFactor_FinalizeAddAuthenticator_Request.$Properties): CTwoFactor_FinalizeAddAuthenticator_Request;

    /**
     * Encodes the specified CTwoFactor_FinalizeAddAuthenticator_Request message. Does not implicitly {@link CTwoFactor_FinalizeAddAuthenticator_Request.verify|verify} messages.
     * @param message CTwoFactor_FinalizeAddAuthenticator_Request message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    static encode(message: CTwoFactor_FinalizeAddAuthenticator_Request.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified CTwoFactor_FinalizeAddAuthenticator_Request message, length delimited. Does not implicitly {@link CTwoFactor_FinalizeAddAuthenticator_Request.verify|verify} messages.
     * @param message CTwoFactor_FinalizeAddAuthenticator_Request message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    static encodeDelimited(message: CTwoFactor_FinalizeAddAuthenticator_Request.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a CTwoFactor_FinalizeAddAuthenticator_Request message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns {CTwoFactor_FinalizeAddAuthenticator_Request & CTwoFactor_FinalizeAddAuthenticator_Request.$Shape} CTwoFactor_FinalizeAddAuthenticator_Request
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CTwoFactor_FinalizeAddAuthenticator_Request & CTwoFactor_FinalizeAddAuthenticator_Request.$Shape;

    /**
     * Decodes a CTwoFactor_FinalizeAddAuthenticator_Request message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns {CTwoFactor_FinalizeAddAuthenticator_Request & CTwoFactor_FinalizeAddAuthenticator_Request.$Shape} CTwoFactor_FinalizeAddAuthenticator_Request
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CTwoFactor_FinalizeAddAuthenticator_Request & CTwoFactor_FinalizeAddAuthenticator_Request.$Shape;

    /**
     * Verifies a CTwoFactor_FinalizeAddAuthenticator_Request message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a CTwoFactor_FinalizeAddAuthenticator_Request message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns CTwoFactor_FinalizeAddAuthenticator_Request
     */
    static fromObject(object: { [k: string]: any }): CTwoFactor_FinalizeAddAuthenticator_Request;

    /**
     * Creates a plain object from a CTwoFactor_FinalizeAddAuthenticator_Request message. Also converts values to other types if specified.
     * @param message CTwoFactor_FinalizeAddAuthenticator_Request
     * @param [options] Conversion options
     * @returns Plain object
     */
    static toObject(message: CTwoFactor_FinalizeAddAuthenticator_Request, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this CTwoFactor_FinalizeAddAuthenticator_Request to JSON.
     * @returns JSON object
     */
    toJSON(): { [k: string]: any };

    /**
     * Gets the type url for CTwoFactor_FinalizeAddAuthenticator_Request
     * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
     * @returns The type url
     */
    static getTypeUrl(prefix?: string): string;
}

export namespace CTwoFactor_FinalizeAddAuthenticator_Request {

    /** Properties of a CTwoFactor_FinalizeAddAuthenticator_Request. */
    interface $Properties {

        /** CTwoFactor_FinalizeAddAuthenticator_Request steamid */
        steamid?: (number|Long|null);

        /** CTwoFactor_FinalizeAddAuthenticator_Request authenticatorCode */
        authenticatorCode?: (string|null);

        /** CTwoFactor_FinalizeAddAuthenticator_Request authenticatorTime */
        authenticatorTime?: (number|Long|null);

        /** CTwoFactor_FinalizeAddAuthenticator_Request activationCode */
        activationCode?: (string|null);

        /** CTwoFactor_FinalizeAddAuthenticator_Request httpHeaders */
        httpHeaders?: (string[]|null);

        /** CTwoFactor_FinalizeAddAuthenticator_Request validateSmsCode */
        validateSmsCode?: (boolean|null);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];
    }

    /** Shape of a CTwoFactor_FinalizeAddAuthenticator_Request. */
    type $Shape = CTwoFactor_FinalizeAddAuthenticator_Request.$Properties;
}

/**
 * Properties of a CTwoFactor_FinalizeAddAuthenticator_Response.
 * @deprecated Use CTwoFactor_FinalizeAddAuthenticator_Response.$Properties instead.
 */
export interface ICTwoFactor_FinalizeAddAuthenticator_Response extends CTwoFactor_FinalizeAddAuthenticator_Response.$Properties {
}

/** Represents a CTwoFactor_FinalizeAddAuthenticator_Response. */
export class CTwoFactor_FinalizeAddAuthenticator_Response {

    /**
     * Constructs a new CTwoFactor_FinalizeAddAuthenticator_Response.
     * @param [properties] Properties to set
     */
    constructor(properties?: CTwoFactor_FinalizeAddAuthenticator_Response.$Properties);

    /** Unknown fields preserved while decoding when enabled */
    $unknowns?: Uint8Array[];

    /** CTwoFactor_FinalizeAddAuthenticator_Response success. */
    success: boolean;

    /** CTwoFactor_FinalizeAddAuthenticator_Response wantMore. */
    wantMore: boolean;

    /** CTwoFactor_FinalizeAddAuthenticator_Response serverTime. */
    serverTime: (number|Long);

    /** CTwoFactor_FinalizeAddAuthenticator_Response status. */
    status: number;

    /**
     * Creates a new CTwoFactor_FinalizeAddAuthenticator_Response instance using the specified properties.
     * @param [properties] Properties to set
     * @returns CTwoFactor_FinalizeAddAuthenticator_Response instance
     */
    static create(properties: CTwoFactor_FinalizeAddAuthenticator_Response.$Shape): CTwoFactor_FinalizeAddAuthenticator_Response & CTwoFactor_FinalizeAddAuthenticator_Response.$Shape;
    static create(properties?: CTwoFactor_FinalizeAddAuthenticator_Response.$Properties): CTwoFactor_FinalizeAddAuthenticator_Response;

    /**
     * Encodes the specified CTwoFactor_FinalizeAddAuthenticator_Response message. Does not implicitly {@link CTwoFactor_FinalizeAddAuthenticator_Response.verify|verify} messages.
     * @param message CTwoFactor_FinalizeAddAuthenticator_Response message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    static encode(message: CTwoFactor_FinalizeAddAuthenticator_Response.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified CTwoFactor_FinalizeAddAuthenticator_Response message, length delimited. Does not implicitly {@link CTwoFactor_FinalizeAddAuthenticator_Response.verify|verify} messages.
     * @param message CTwoFactor_FinalizeAddAuthenticator_Response message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    static encodeDelimited(message: CTwoFactor_FinalizeAddAuthenticator_Response.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a CTwoFactor_FinalizeAddAuthenticator_Response message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns {CTwoFactor_FinalizeAddAuthenticator_Response & CTwoFactor_FinalizeAddAuthenticator_Response.$Shape} CTwoFactor_FinalizeAddAuthenticator_Response
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CTwoFactor_FinalizeAddAuthenticator_Response & CTwoFactor_FinalizeAddAuthenticator_Response.$Shape;

    /**
     * Decodes a CTwoFactor_FinalizeAddAuthenticator_Response message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns {CTwoFactor_FinalizeAddAuthenticator_Response & CTwoFactor_FinalizeAddAuthenticator_Response.$Shape} CTwoFactor_FinalizeAddAuthenticator_Response
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CTwoFactor_FinalizeAddAuthenticator_Response & CTwoFactor_FinalizeAddAuthenticator_Response.$Shape;

    /**
     * Verifies a CTwoFactor_FinalizeAddAuthenticator_Response message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a CTwoFactor_FinalizeAddAuthenticator_Response message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns CTwoFactor_FinalizeAddAuthenticator_Response
     */
    static fromObject(object: { [k: string]: any }): CTwoFactor_FinalizeAddAuthenticator_Response;

    /**
     * Creates a plain object from a CTwoFactor_FinalizeAddAuthenticator_Response message. Also converts values to other types if specified.
     * @param message CTwoFactor_FinalizeAddAuthenticator_Response
     * @param [options] Conversion options
     * @returns Plain object
     */
    static toObject(message: CTwoFactor_FinalizeAddAuthenticator_Response, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this CTwoFactor_FinalizeAddAuthenticator_Response to JSON.
     * @returns JSON object
     */
    toJSON(): { [k: string]: any };

    /**
     * Gets the type url for CTwoFactor_FinalizeAddAuthenticator_Response
     * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
     * @returns The type url
     */
    static getTypeUrl(prefix?: string): string;
}

export namespace CTwoFactor_FinalizeAddAuthenticator_Response {

    /** Properties of a CTwoFactor_FinalizeAddAuthenticator_Response. */
    interface $Properties {

        /** CTwoFactor_FinalizeAddAuthenticator_Response success */
        success?: (boolean|null);

        /** CTwoFactor_FinalizeAddAuthenticator_Response wantMore */
        wantMore?: (boolean|null);

        /** CTwoFactor_FinalizeAddAuthenticator_Response serverTime */
        serverTime?: (number|Long|null);

        /** CTwoFactor_FinalizeAddAuthenticator_Response status */
        status?: (number|null);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];
    }

    /** Shape of a CTwoFactor_FinalizeAddAuthenticator_Response. */
    type $Shape = CTwoFactor_FinalizeAddAuthenticator_Response.$Properties;
}

/**
 * Properties of a CRemoveAuthenticatorViaChallengeContinue_Replacement_Token.
 * @deprecated Use CRemoveAuthenticatorViaChallengeContinue_Replacement_Token.$Properties instead.
 */
export interface ICRemoveAuthenticatorViaChallengeContinue_Replacement_Token extends CRemoveAuthenticatorViaChallengeContinue_Replacement_Token.$Properties {
}

/** Represents a CRemoveAuthenticatorViaChallengeContinue_Replacement_Token. */
export class CRemoveAuthenticatorViaChallengeContinue_Replacement_Token {

    /**
     * Constructs a new CRemoveAuthenticatorViaChallengeContinue_Replacement_Token.
     * @param [properties] Properties to set
     */
    constructor(properties?: CRemoveAuthenticatorViaChallengeContinue_Replacement_Token.$Properties);

    /** Unknown fields preserved while decoding when enabled */
    $unknowns?: Uint8Array[];

    /** CRemoveAuthenticatorViaChallengeContinue_Replacement_Token sharedSecret. */
    sharedSecret: Uint8Array;

    /** CRemoveAuthenticatorViaChallengeContinue_Replacement_Token serialNumber. */
    serialNumber: (number|Long);

    /** CRemoveAuthenticatorViaChallengeContinue_Replacement_Token revocationCode. */
    revocationCode: string;

    /** CRemoveAuthenticatorViaChallengeContinue_Replacement_Token uri. */
    uri: string;

    /** CRemoveAuthenticatorViaChallengeContinue_Replacement_Token serverTime. */
    serverTime: (number|Long);

    /** CRemoveAuthenticatorViaChallengeContinue_Replacement_Token accountName. */
    accountName: string;

    /** CRemoveAuthenticatorViaChallengeContinue_Replacement_Token tokenGid. */
    tokenGid: string;

    /** CRemoveAuthenticatorViaChallengeContinue_Replacement_Token identitySecret. */
    identitySecret: Uint8Array;

    /** CRemoveAuthenticatorViaChallengeContinue_Replacement_Token secret_1. */
    secret_1: Uint8Array;

    /** CRemoveAuthenticatorViaChallengeContinue_Replacement_Token status. */
    status: number;

    /** CRemoveAuthenticatorViaChallengeContinue_Replacement_Token steamguardScheme. */
    steamguardScheme: number;

    /** CRemoveAuthenticatorViaChallengeContinue_Replacement_Token steamid. */
    steamid: (number|Long);

    /**
     * Creates a new CRemoveAuthenticatorViaChallengeContinue_Replacement_Token instance using the specified properties.
     * @param [properties] Properties to set
     * @returns CRemoveAuthenticatorViaChallengeContinue_Replacement_Token instance
     */
    static create(properties: CRemoveAuthenticatorViaChallengeContinue_Replacement_Token.$Shape): CRemoveAuthenticatorViaChallengeContinue_Replacement_Token & CRemoveAuthenticatorViaChallengeContinue_Replacement_Token.$Shape;
    static create(properties?: CRemoveAuthenticatorViaChallengeContinue_Replacement_Token.$Properties): CRemoveAuthenticatorViaChallengeContinue_Replacement_Token;

    /**
     * Encodes the specified CRemoveAuthenticatorViaChallengeContinue_Replacement_Token message. Does not implicitly {@link CRemoveAuthenticatorViaChallengeContinue_Replacement_Token.verify|verify} messages.
     * @param message CRemoveAuthenticatorViaChallengeContinue_Replacement_Token message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    static encode(message: CRemoveAuthenticatorViaChallengeContinue_Replacement_Token.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified CRemoveAuthenticatorViaChallengeContinue_Replacement_Token message, length delimited. Does not implicitly {@link CRemoveAuthenticatorViaChallengeContinue_Replacement_Token.verify|verify} messages.
     * @param message CRemoveAuthenticatorViaChallengeContinue_Replacement_Token message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    static encodeDelimited(message: CRemoveAuthenticatorViaChallengeContinue_Replacement_Token.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a CRemoveAuthenticatorViaChallengeContinue_Replacement_Token message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns {CRemoveAuthenticatorViaChallengeContinue_Replacement_Token & CRemoveAuthenticatorViaChallengeContinue_Replacement_Token.$Shape} CRemoveAuthenticatorViaChallengeContinue_Replacement_Token
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CRemoveAuthenticatorViaChallengeContinue_Replacement_Token & CRemoveAuthenticatorViaChallengeContinue_Replacement_Token.$Shape;

    /**
     * Decodes a CRemoveAuthenticatorViaChallengeContinue_Replacement_Token message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns {CRemoveAuthenticatorViaChallengeContinue_Replacement_Token & CRemoveAuthenticatorViaChallengeContinue_Replacement_Token.$Shape} CRemoveAuthenticatorViaChallengeContinue_Replacement_Token
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CRemoveAuthenticatorViaChallengeContinue_Replacement_Token & CRemoveAuthenticatorViaChallengeContinue_Replacement_Token.$Shape;

    /**
     * Verifies a CRemoveAuthenticatorViaChallengeContinue_Replacement_Token message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a CRemoveAuthenticatorViaChallengeContinue_Replacement_Token message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns CRemoveAuthenticatorViaChallengeContinue_Replacement_Token
     */
    static fromObject(object: { [k: string]: any }): CRemoveAuthenticatorViaChallengeContinue_Replacement_Token;

    /**
     * Creates a plain object from a CRemoveAuthenticatorViaChallengeContinue_Replacement_Token message. Also converts values to other types if specified.
     * @param message CRemoveAuthenticatorViaChallengeContinue_Replacement_Token
     * @param [options] Conversion options
     * @returns Plain object
     */
    static toObject(message: CRemoveAuthenticatorViaChallengeContinue_Replacement_Token, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this CRemoveAuthenticatorViaChallengeContinue_Replacement_Token to JSON.
     * @returns JSON object
     */
    toJSON(): { [k: string]: any };

    /**
     * Gets the type url for CRemoveAuthenticatorViaChallengeContinue_Replacement_Token
     * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
     * @returns The type url
     */
    static getTypeUrl(prefix?: string): string;
}

export namespace CRemoveAuthenticatorViaChallengeContinue_Replacement_Token {

    /** Properties of a CRemoveAuthenticatorViaChallengeContinue_Replacement_Token. */
    interface $Properties {

        /** CRemoveAuthenticatorViaChallengeContinue_Replacement_Token sharedSecret */
        sharedSecret?: (Uint8Array|null);

        /** CRemoveAuthenticatorViaChallengeContinue_Replacement_Token serialNumber */
        serialNumber?: (number|Long|null);

        /** CRemoveAuthenticatorViaChallengeContinue_Replacement_Token revocationCode */
        revocationCode?: (string|null);

        /** CRemoveAuthenticatorViaChallengeContinue_Replacement_Token uri */
        uri?: (string|null);

        /** CRemoveAuthenticatorViaChallengeContinue_Replacement_Token serverTime */
        serverTime?: (number|Long|null);

        /** CRemoveAuthenticatorViaChallengeContinue_Replacement_Token accountName */
        accountName?: (string|null);

        /** CRemoveAuthenticatorViaChallengeContinue_Replacement_Token tokenGid */
        tokenGid?: (string|null);

        /** CRemoveAuthenticatorViaChallengeContinue_Replacement_Token identitySecret */
        identitySecret?: (Uint8Array|null);

        /** CRemoveAuthenticatorViaChallengeContinue_Replacement_Token secret_1 */
        secret_1?: (Uint8Array|null);

        /** CRemoveAuthenticatorViaChallengeContinue_Replacement_Token status */
        status?: (number|null);

        /** CRemoveAuthenticatorViaChallengeContinue_Replacement_Token steamguardScheme */
        steamguardScheme?: (number|null);

        /** CRemoveAuthenticatorViaChallengeContinue_Replacement_Token steamid */
        steamid?: (number|Long|null);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];
    }

    /** Shape of a CRemoveAuthenticatorViaChallengeContinue_Replacement_Token. */
    type $Shape = CRemoveAuthenticatorViaChallengeContinue_Replacement_Token.$Properties;
}

/**
 * Properties of a CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request.
 * @deprecated Use CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request.$Properties instead.
 */
export interface ICTwoFactor_RemoveAuthenticatorViaChallengeStart_Request extends CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request.$Properties {
}

/** Represents a CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request. */
export class CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request {

    /**
     * Constructs a new CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request.
     * @param [properties] Properties to set
     */
    constructor(properties?: CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request.$Properties);

    /** Unknown fields preserved while decoding when enabled */
    $unknowns?: Uint8Array[];

    /**
     * Creates a new CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request instance using the specified properties.
     * @param [properties] Properties to set
     * @returns CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request instance
     */
    static create(properties: CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request.$Shape): CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request & CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request.$Shape;
    static create(properties?: CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request.$Properties): CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request;

    /**
     * Encodes the specified CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request message. Does not implicitly {@link CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request.verify|verify} messages.
     * @param message CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    static encode(message: CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request message, length delimited. Does not implicitly {@link CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request.verify|verify} messages.
     * @param message CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    static encodeDelimited(message: CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns {CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request & CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request.$Shape} CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request & CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request.$Shape;

    /**
     * Decodes a CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns {CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request & CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request.$Shape} CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request & CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request.$Shape;

    /**
     * Verifies a CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request
     */
    static fromObject(object: { [k: string]: any }): CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request;

    /**
     * Creates a plain object from a CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request message. Also converts values to other types if specified.
     * @param message CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request
     * @param [options] Conversion options
     * @returns Plain object
     */
    static toObject(message: CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request to JSON.
     * @returns JSON object
     */
    toJSON(): { [k: string]: any };

    /**
     * Gets the type url for CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request
     * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
     * @returns The type url
     */
    static getTypeUrl(prefix?: string): string;
}

export namespace CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request {

    /** Properties of a CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request. */
    interface $Properties {

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];
    }

    /** Shape of a CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request. */
    type $Shape = CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request.$Properties;
}

/**
 * Properties of a CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response.
 * @deprecated Use CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response.$Properties instead.
 */
export interface ICTwoFactor_RemoveAuthenticatorViaChallengeStart_Response extends CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response.$Properties {
}

/** Represents a CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response. */
export class CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response {

    /**
     * Constructs a new CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response.
     * @param [properties] Properties to set
     */
    constructor(properties?: CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response.$Properties);

    /** Unknown fields preserved while decoding when enabled */
    $unknowns?: Uint8Array[];

    /** CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response success. */
    success: boolean;

    /**
     * Creates a new CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response instance using the specified properties.
     * @param [properties] Properties to set
     * @returns CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response instance
     */
    static create(properties: CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response.$Shape): CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response & CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response.$Shape;
    static create(properties?: CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response.$Properties): CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response;

    /**
     * Encodes the specified CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response message. Does not implicitly {@link CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response.verify|verify} messages.
     * @param message CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    static encode(message: CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response message, length delimited. Does not implicitly {@link CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response.verify|verify} messages.
     * @param message CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    static encodeDelimited(message: CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns {CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response & CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response.$Shape} CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response & CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response.$Shape;

    /**
     * Decodes a CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns {CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response & CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response.$Shape} CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response & CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response.$Shape;

    /**
     * Verifies a CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response
     */
    static fromObject(object: { [k: string]: any }): CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response;

    /**
     * Creates a plain object from a CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response message. Also converts values to other types if specified.
     * @param message CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response
     * @param [options] Conversion options
     * @returns Plain object
     */
    static toObject(message: CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response to JSON.
     * @returns JSON object
     */
    toJSON(): { [k: string]: any };

    /**
     * Gets the type url for CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response
     * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
     * @returns The type url
     */
    static getTypeUrl(prefix?: string): string;
}

export namespace CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response {

    /** Properties of a CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response. */
    interface $Properties {

        /** CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response success */
        success?: (boolean|null);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];
    }

    /** Shape of a CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response. */
    type $Shape = CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response.$Properties;
}

/**
 * Properties of a CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request.
 * @deprecated Use CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request.$Properties instead.
 */
export interface ICTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request extends CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request.$Properties {
}

/** Represents a CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request. */
export class CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request {

    /**
     * Constructs a new CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request.
     * @param [properties] Properties to set
     */
    constructor(properties?: CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request.$Properties);

    /** Unknown fields preserved while decoding when enabled */
    $unknowns?: Uint8Array[];

    /** CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request smsCode. */
    smsCode: string;

    /** CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request generateNewToken. */
    generateNewToken: boolean;

    /** CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request version. */
    version: number;

    /**
     * Creates a new CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request instance using the specified properties.
     * @param [properties] Properties to set
     * @returns CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request instance
     */
    static create(properties: CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request.$Shape): CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request & CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request.$Shape;
    static create(properties?: CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request.$Properties): CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request;

    /**
     * Encodes the specified CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request message. Does not implicitly {@link CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request.verify|verify} messages.
     * @param message CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    static encode(message: CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request message, length delimited. Does not implicitly {@link CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request.verify|verify} messages.
     * @param message CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    static encodeDelimited(message: CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns {CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request & CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request.$Shape} CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request & CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request.$Shape;

    /**
     * Decodes a CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns {CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request & CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request.$Shape} CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request & CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request.$Shape;

    /**
     * Verifies a CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request
     */
    static fromObject(object: { [k: string]: any }): CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request;

    /**
     * Creates a plain object from a CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request message. Also converts values to other types if specified.
     * @param message CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request
     * @param [options] Conversion options
     * @returns Plain object
     */
    static toObject(message: CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request to JSON.
     * @returns JSON object
     */
    toJSON(): { [k: string]: any };

    /**
     * Gets the type url for CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request
     * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
     * @returns The type url
     */
    static getTypeUrl(prefix?: string): string;
}

export namespace CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request {

    /** Properties of a CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request. */
    interface $Properties {

        /** CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request smsCode */
        smsCode?: (string|null);

        /** CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request generateNewToken */
        generateNewToken?: (boolean|null);

        /** CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request version */
        version?: (number|null);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];
    }

    /** Shape of a CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request. */
    type $Shape = CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request.$Properties;
}

/**
 * Properties of a CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response.
 * @deprecated Use CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response.$Properties instead.
 */
export interface ICTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response extends CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response.$Properties {
}

/** Represents a CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response. */
export class CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response {

    /**
     * Constructs a new CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response.
     * @param [properties] Properties to set
     */
    constructor(properties?: CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response.$Properties);

    /** Unknown fields preserved while decoding when enabled */
    $unknowns?: Uint8Array[];

    /** CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response success. */
    success: boolean;

    /** CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response replacementToken. */
    replacementToken?: (CRemoveAuthenticatorViaChallengeContinue_Replacement_Token.$Properties|null);

    /**
     * Creates a new CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response instance using the specified properties.
     * @param [properties] Properties to set
     * @returns CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response instance
     */
    static create(properties: CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response.$Shape): CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response & CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response.$Shape;
    static create(properties?: CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response.$Properties): CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response;

    /**
     * Encodes the specified CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response message. Does not implicitly {@link CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response.verify|verify} messages.
     * @param message CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    static encode(message: CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response message, length delimited. Does not implicitly {@link CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response.verify|verify} messages.
     * @param message CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    static encodeDelimited(message: CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns {CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response & CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response.$Shape} CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response & CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response.$Shape;

    /**
     * Decodes a CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns {CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response & CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response.$Shape} CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response & CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response.$Shape;

    /**
     * Verifies a CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response
     */
    static fromObject(object: { [k: string]: any }): CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response;

    /**
     * Creates a plain object from a CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response message. Also converts values to other types if specified.
     * @param message CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response
     * @param [options] Conversion options
     * @returns Plain object
     */
    static toObject(message: CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response to JSON.
     * @returns JSON object
     */
    toJSON(): { [k: string]: any };

    /**
     * Gets the type url for CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response
     * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
     * @returns The type url
     */
    static getTypeUrl(prefix?: string): string;
}

export namespace CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response {

    /** Properties of a CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response. */
    interface $Properties {

        /** CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response success */
        success?: (boolean|null);

        /** CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response replacementToken */
        replacementToken?: (CRemoveAuthenticatorViaChallengeContinue_Replacement_Token.$Properties|null);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];
    }

    /** Shape of a CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response. */
    type $Shape = CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response.$Properties;
}
