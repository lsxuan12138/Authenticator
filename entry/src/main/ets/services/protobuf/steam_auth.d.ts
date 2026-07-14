import * as $protobuf from '@ohos/protobufjs';
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

/** Represents a CAuthentication_DeviceDetails. */
export class CAuthentication_DeviceDetails implements ICAuthentication_DeviceDetails {

    /**
     * Constructs a new CAuthentication_DeviceDetails.
     * @param [properties] Properties to set
     */
    constructor(properties?: ICAuthentication_DeviceDetails);

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
    static create(properties?: ICAuthentication_DeviceDetails): CAuthentication_DeviceDetails;

    /**
     * Encodes the specified CAuthentication_DeviceDetails message. Does not implicitly {@link CAuthentication_DeviceDetails.verify|verify} messages.
     * @param message CAuthentication_DeviceDetails message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    static encode(message: ICAuthentication_DeviceDetails, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified CAuthentication_DeviceDetails message, length delimited. Does not implicitly {@link CAuthentication_DeviceDetails.verify|verify} messages.
     * @param message CAuthentication_DeviceDetails message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    static encodeDelimited(message: ICAuthentication_DeviceDetails, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a CAuthentication_DeviceDetails message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns CAuthentication_DeviceDetails
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CAuthentication_DeviceDetails;

    /**
     * Decodes a CAuthentication_DeviceDetails message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns CAuthentication_DeviceDetails
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CAuthentication_DeviceDetails;

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
     * Gets the default type url for CAuthentication_DeviceDetails
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a CAuthentication_AllowedConfirmation. */
export class CAuthentication_AllowedConfirmation implements ICAuthentication_AllowedConfirmation {

    /**
     * Constructs a new CAuthentication_AllowedConfirmation.
     * @param [properties] Properties to set
     */
    constructor(properties?: ICAuthentication_AllowedConfirmation);

    /** CAuthentication_AllowedConfirmation confirmationType. */
    confirmationType: EAuthSessionGuardType;

    /** CAuthentication_AllowedConfirmation associatedMessage. */
    associatedMessage: string;

    /**
     * Creates a new CAuthentication_AllowedConfirmation instance using the specified properties.
     * @param [properties] Properties to set
     * @returns CAuthentication_AllowedConfirmation instance
     */
    static create(properties?: ICAuthentication_AllowedConfirmation): CAuthentication_AllowedConfirmation;

    /**
     * Encodes the specified CAuthentication_AllowedConfirmation message. Does not implicitly {@link CAuthentication_AllowedConfirmation.verify|verify} messages.
     * @param message CAuthentication_AllowedConfirmation message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    static encode(message: ICAuthentication_AllowedConfirmation, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified CAuthentication_AllowedConfirmation message, length delimited. Does not implicitly {@link CAuthentication_AllowedConfirmation.verify|verify} messages.
     * @param message CAuthentication_AllowedConfirmation message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    static encodeDelimited(message: ICAuthentication_AllowedConfirmation, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a CAuthentication_AllowedConfirmation message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns CAuthentication_AllowedConfirmation
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CAuthentication_AllowedConfirmation;

    /**
     * Decodes a CAuthentication_AllowedConfirmation message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns CAuthentication_AllowedConfirmation
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CAuthentication_AllowedConfirmation;

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
     * Gets the default type url for CAuthentication_AllowedConfirmation
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData. */
export class CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData implements ICAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData {

    /**
     * Constructs a new CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData.
     * @param [properties] Properties to set
     */
    constructor(properties?: ICAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData);

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
    deviceDetails?: (ICAuthentication_DeviceDetails|null);

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
    static create(properties?: ICAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData): CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData;

    /**
     * Encodes the specified CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData message. Does not implicitly {@link CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData.verify|verify} messages.
     * @param message CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    static encode(message: ICAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData message, length delimited. Does not implicitly {@link CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData.verify|verify} messages.
     * @param message CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    static encodeDelimited(message: ICAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData;

    /**
     * Decodes a CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData;

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
     * Gets the default type url for CAuthentication_BeginAuthSessionViaCredentials_Request_BinaryGuardData
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a CAuthentication_BeginAuthSessionViaCredentials_Response. */
export class CAuthentication_BeginAuthSessionViaCredentials_Response implements ICAuthentication_BeginAuthSessionViaCredentials_Response {

    /**
     * Constructs a new CAuthentication_BeginAuthSessionViaCredentials_Response.
     * @param [properties] Properties to set
     */
    constructor(properties?: ICAuthentication_BeginAuthSessionViaCredentials_Response);

    /** CAuthentication_BeginAuthSessionViaCredentials_Response clientId. */
    clientId: (number|Long);

    /** CAuthentication_BeginAuthSessionViaCredentials_Response requestId. */
    requestId: Uint8Array;

    /** CAuthentication_BeginAuthSessionViaCredentials_Response interval. */
    interval: number;

    /** CAuthentication_BeginAuthSessionViaCredentials_Response allowedConfirmations. */
    allowedConfirmations: ICAuthentication_AllowedConfirmation[];

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
    static create(properties?: ICAuthentication_BeginAuthSessionViaCredentials_Response): CAuthentication_BeginAuthSessionViaCredentials_Response;

    /**
     * Encodes the specified CAuthentication_BeginAuthSessionViaCredentials_Response message. Does not implicitly {@link CAuthentication_BeginAuthSessionViaCredentials_Response.verify|verify} messages.
     * @param message CAuthentication_BeginAuthSessionViaCredentials_Response message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    static encode(message: ICAuthentication_BeginAuthSessionViaCredentials_Response, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified CAuthentication_BeginAuthSessionViaCredentials_Response message, length delimited. Does not implicitly {@link CAuthentication_BeginAuthSessionViaCredentials_Response.verify|verify} messages.
     * @param message CAuthentication_BeginAuthSessionViaCredentials_Response message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    static encodeDelimited(message: ICAuthentication_BeginAuthSessionViaCredentials_Response, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a CAuthentication_BeginAuthSessionViaCredentials_Response message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns CAuthentication_BeginAuthSessionViaCredentials_Response
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CAuthentication_BeginAuthSessionViaCredentials_Response;

    /**
     * Decodes a CAuthentication_BeginAuthSessionViaCredentials_Response message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns CAuthentication_BeginAuthSessionViaCredentials_Response
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CAuthentication_BeginAuthSessionViaCredentials_Response;

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
     * Gets the default type url for CAuthentication_BeginAuthSessionViaCredentials_Response
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request. */
export class CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request implements ICAuthentication_UpdateAuthSessionWithSteamGuardCode_Request {

    /**
     * Constructs a new CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request.
     * @param [properties] Properties to set
     */
    constructor(properties?: ICAuthentication_UpdateAuthSessionWithSteamGuardCode_Request);

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
    static create(properties?: ICAuthentication_UpdateAuthSessionWithSteamGuardCode_Request): CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request;

    /**
     * Encodes the specified CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request message. Does not implicitly {@link CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request.verify|verify} messages.
     * @param message CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    static encode(message: ICAuthentication_UpdateAuthSessionWithSteamGuardCode_Request, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request message, length delimited. Does not implicitly {@link CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request.verify|verify} messages.
     * @param message CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    static encodeDelimited(message: ICAuthentication_UpdateAuthSessionWithSteamGuardCode_Request, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request;

    /**
     * Decodes a CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request;

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
     * Gets the default type url for CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a CAuthentication_PollAuthSessionStatus_Request. */
export class CAuthentication_PollAuthSessionStatus_Request implements ICAuthentication_PollAuthSessionStatus_Request {

    /**
     * Constructs a new CAuthentication_PollAuthSessionStatus_Request.
     * @param [properties] Properties to set
     */
    constructor(properties?: ICAuthentication_PollAuthSessionStatus_Request);

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
    static create(properties?: ICAuthentication_PollAuthSessionStatus_Request): CAuthentication_PollAuthSessionStatus_Request;

    /**
     * Encodes the specified CAuthentication_PollAuthSessionStatus_Request message. Does not implicitly {@link CAuthentication_PollAuthSessionStatus_Request.verify|verify} messages.
     * @param message CAuthentication_PollAuthSessionStatus_Request message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    static encode(message: ICAuthentication_PollAuthSessionStatus_Request, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified CAuthentication_PollAuthSessionStatus_Request message, length delimited. Does not implicitly {@link CAuthentication_PollAuthSessionStatus_Request.verify|verify} messages.
     * @param message CAuthentication_PollAuthSessionStatus_Request message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    static encodeDelimited(message: ICAuthentication_PollAuthSessionStatus_Request, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a CAuthentication_PollAuthSessionStatus_Request message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns CAuthentication_PollAuthSessionStatus_Request
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CAuthentication_PollAuthSessionStatus_Request;

    /**
     * Decodes a CAuthentication_PollAuthSessionStatus_Request message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns CAuthentication_PollAuthSessionStatus_Request
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CAuthentication_PollAuthSessionStatus_Request;

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
     * Gets the default type url for CAuthentication_PollAuthSessionStatus_Request
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a CAuthentication_PollAuthSessionStatus_Response. */
export class CAuthentication_PollAuthSessionStatus_Response implements ICAuthentication_PollAuthSessionStatus_Response {

    /**
     * Constructs a new CAuthentication_PollAuthSessionStatus_Response.
     * @param [properties] Properties to set
     */
    constructor(properties?: ICAuthentication_PollAuthSessionStatus_Response);

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
    static create(properties?: ICAuthentication_PollAuthSessionStatus_Response): CAuthentication_PollAuthSessionStatus_Response;

    /**
     * Encodes the specified CAuthentication_PollAuthSessionStatus_Response message. Does not implicitly {@link CAuthentication_PollAuthSessionStatus_Response.verify|verify} messages.
     * @param message CAuthentication_PollAuthSessionStatus_Response message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    static encode(message: ICAuthentication_PollAuthSessionStatus_Response, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified CAuthentication_PollAuthSessionStatus_Response message, length delimited. Does not implicitly {@link CAuthentication_PollAuthSessionStatus_Response.verify|verify} messages.
     * @param message CAuthentication_PollAuthSessionStatus_Response message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    static encodeDelimited(message: ICAuthentication_PollAuthSessionStatus_Response, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a CAuthentication_PollAuthSessionStatus_Response message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns CAuthentication_PollAuthSessionStatus_Response
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CAuthentication_PollAuthSessionStatus_Response;

    /**
     * Decodes a CAuthentication_PollAuthSessionStatus_Response message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns CAuthentication_PollAuthSessionStatus_Response
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CAuthentication_PollAuthSessionStatus_Response;

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
     * Gets the default type url for CAuthentication_PollAuthSessionStatus_Response
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a CTwoFactor_AddAuthenticator_Request. */
export class CTwoFactor_AddAuthenticator_Request implements ICTwoFactor_AddAuthenticator_Request {

    /**
     * Constructs a new CTwoFactor_AddAuthenticator_Request.
     * @param [properties] Properties to set
     */
    constructor(properties?: ICTwoFactor_AddAuthenticator_Request);

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
    static create(properties?: ICTwoFactor_AddAuthenticator_Request): CTwoFactor_AddAuthenticator_Request;

    /**
     * Encodes the specified CTwoFactor_AddAuthenticator_Request message. Does not implicitly {@link CTwoFactor_AddAuthenticator_Request.verify|verify} messages.
     * @param message CTwoFactor_AddAuthenticator_Request message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    static encode(message: ICTwoFactor_AddAuthenticator_Request, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified CTwoFactor_AddAuthenticator_Request message, length delimited. Does not implicitly {@link CTwoFactor_AddAuthenticator_Request.verify|verify} messages.
     * @param message CTwoFactor_AddAuthenticator_Request message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    static encodeDelimited(message: ICTwoFactor_AddAuthenticator_Request, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a CTwoFactor_AddAuthenticator_Request message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns CTwoFactor_AddAuthenticator_Request
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CTwoFactor_AddAuthenticator_Request;

    /**
     * Decodes a CTwoFactor_AddAuthenticator_Request message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns CTwoFactor_AddAuthenticator_Request
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CTwoFactor_AddAuthenticator_Request;

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
     * Gets the default type url for CTwoFactor_AddAuthenticator_Request
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a CTwoFactor_AddAuthenticator_Response. */
export class CTwoFactor_AddAuthenticator_Response implements ICTwoFactor_AddAuthenticator_Response {

    /**
     * Constructs a new CTwoFactor_AddAuthenticator_Response.
     * @param [properties] Properties to set
     */
    constructor(properties?: ICTwoFactor_AddAuthenticator_Response);

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
    static create(properties?: ICTwoFactor_AddAuthenticator_Response): CTwoFactor_AddAuthenticator_Response;

    /**
     * Encodes the specified CTwoFactor_AddAuthenticator_Response message. Does not implicitly {@link CTwoFactor_AddAuthenticator_Response.verify|verify} messages.
     * @param message CTwoFactor_AddAuthenticator_Response message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    static encode(message: ICTwoFactor_AddAuthenticator_Response, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified CTwoFactor_AddAuthenticator_Response message, length delimited. Does not implicitly {@link CTwoFactor_AddAuthenticator_Response.verify|verify} messages.
     * @param message CTwoFactor_AddAuthenticator_Response message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    static encodeDelimited(message: ICTwoFactor_AddAuthenticator_Response, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a CTwoFactor_AddAuthenticator_Response message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns CTwoFactor_AddAuthenticator_Response
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CTwoFactor_AddAuthenticator_Response;

    /**
     * Decodes a CTwoFactor_AddAuthenticator_Response message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns CTwoFactor_AddAuthenticator_Response
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CTwoFactor_AddAuthenticator_Response;

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
     * Gets the default type url for CTwoFactor_AddAuthenticator_Response
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a CTwoFactor_FinalizeAddAuthenticator_Request. */
export class CTwoFactor_FinalizeAddAuthenticator_Request implements ICTwoFactor_FinalizeAddAuthenticator_Request {

    /**
     * Constructs a new CTwoFactor_FinalizeAddAuthenticator_Request.
     * @param [properties] Properties to set
     */
    constructor(properties?: ICTwoFactor_FinalizeAddAuthenticator_Request);

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
    static create(properties?: ICTwoFactor_FinalizeAddAuthenticator_Request): CTwoFactor_FinalizeAddAuthenticator_Request;

    /**
     * Encodes the specified CTwoFactor_FinalizeAddAuthenticator_Request message. Does not implicitly {@link CTwoFactor_FinalizeAddAuthenticator_Request.verify|verify} messages.
     * @param message CTwoFactor_FinalizeAddAuthenticator_Request message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    static encode(message: ICTwoFactor_FinalizeAddAuthenticator_Request, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified CTwoFactor_FinalizeAddAuthenticator_Request message, length delimited. Does not implicitly {@link CTwoFactor_FinalizeAddAuthenticator_Request.verify|verify} messages.
     * @param message CTwoFactor_FinalizeAddAuthenticator_Request message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    static encodeDelimited(message: ICTwoFactor_FinalizeAddAuthenticator_Request, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a CTwoFactor_FinalizeAddAuthenticator_Request message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns CTwoFactor_FinalizeAddAuthenticator_Request
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CTwoFactor_FinalizeAddAuthenticator_Request;

    /**
     * Decodes a CTwoFactor_FinalizeAddAuthenticator_Request message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns CTwoFactor_FinalizeAddAuthenticator_Request
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CTwoFactor_FinalizeAddAuthenticator_Request;

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
     * Gets the default type url for CTwoFactor_FinalizeAddAuthenticator_Request
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a CTwoFactor_FinalizeAddAuthenticator_Response. */
export class CTwoFactor_FinalizeAddAuthenticator_Response implements ICTwoFactor_FinalizeAddAuthenticator_Response {

    /**
     * Constructs a new CTwoFactor_FinalizeAddAuthenticator_Response.
     * @param [properties] Properties to set
     */
    constructor(properties?: ICTwoFactor_FinalizeAddAuthenticator_Response);

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
    static create(properties?: ICTwoFactor_FinalizeAddAuthenticator_Response): CTwoFactor_FinalizeAddAuthenticator_Response;

    /**
     * Encodes the specified CTwoFactor_FinalizeAddAuthenticator_Response message. Does not implicitly {@link CTwoFactor_FinalizeAddAuthenticator_Response.verify|verify} messages.
     * @param message CTwoFactor_FinalizeAddAuthenticator_Response message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    static encode(message: ICTwoFactor_FinalizeAddAuthenticator_Response, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified CTwoFactor_FinalizeAddAuthenticator_Response message, length delimited. Does not implicitly {@link CTwoFactor_FinalizeAddAuthenticator_Response.verify|verify} messages.
     * @param message CTwoFactor_FinalizeAddAuthenticator_Response message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    static encodeDelimited(message: ICTwoFactor_FinalizeAddAuthenticator_Response, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a CTwoFactor_FinalizeAddAuthenticator_Response message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns CTwoFactor_FinalizeAddAuthenticator_Response
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CTwoFactor_FinalizeAddAuthenticator_Response;

    /**
     * Decodes a CTwoFactor_FinalizeAddAuthenticator_Response message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns CTwoFactor_FinalizeAddAuthenticator_Response
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CTwoFactor_FinalizeAddAuthenticator_Response;

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
     * Gets the default type url for CTwoFactor_FinalizeAddAuthenticator_Response
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a CTwoFactor_Status_Request. */
export class CTwoFactor_Status_Request implements ICTwoFactor_Status_Request {

    /**
     * Constructs a new CTwoFactor_Status_Request.
     * @param [properties] Properties to set
     */
    constructor(properties?: ICTwoFactor_Status_Request);

    /** CTwoFactor_Status_Request steamid. */
    steamid: (number|Long);

    /**
     * Creates a new CTwoFactor_Status_Request instance using the specified properties.
     * @param [properties] Properties to set
     * @returns CTwoFactor_Status_Request instance
     */
    static create(properties?: ICTwoFactor_Status_Request): CTwoFactor_Status_Request;

    /**
     * Encodes the specified CTwoFactor_Status_Request message. Does not implicitly {@link CTwoFactor_Status_Request.verify|verify} messages.
     * @param message CTwoFactor_Status_Request message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    static encode(message: ICTwoFactor_Status_Request, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified CTwoFactor_Status_Request message, length delimited. Does not implicitly {@link CTwoFactor_Status_Request.verify|verify} messages.
     * @param message CTwoFactor_Status_Request message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    static encodeDelimited(message: ICTwoFactor_Status_Request, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a CTwoFactor_Status_Request message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns CTwoFactor_Status_Request
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CTwoFactor_Status_Request;

    /**
     * Decodes a CTwoFactor_Status_Request message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns CTwoFactor_Status_Request
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CTwoFactor_Status_Request;

    /**
     * Verifies a CTwoFactor_Status_Request message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a CTwoFactor_Status_Request message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns CTwoFactor_Status_Request
     */
    static fromObject(object: { [k: string]: any }): CTwoFactor_Status_Request;

    /**
     * Creates a plain object from a CTwoFactor_Status_Request message. Also converts values to other types if specified.
     * @param message CTwoFactor_Status_Request
     * @param [options] Conversion options
     * @returns Plain object
     */
    static toObject(message: CTwoFactor_Status_Request, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this CTwoFactor_Status_Request to JSON.
     * @returns JSON object
     */
    toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for CTwoFactor_Status_Request
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a CTwoFactor_Status_Response. */
export class CTwoFactor_Status_Response implements ICTwoFactor_Status_Response {

    /**
     * Constructs a new CTwoFactor_Status_Response.
     * @param [properties] Properties to set
     */
    constructor(properties?: ICTwoFactor_Status_Response);

    /** CTwoFactor_Status_Response state. */
    state: number;

    /** CTwoFactor_Status_Response inactivationReason. */
    inactivationReason: number;

    /** CTwoFactor_Status_Response authenticatorType. */
    authenticatorType: number;

    /** CTwoFactor_Status_Response authenticatorAllowed. */
    authenticatorAllowed: boolean;

    /** CTwoFactor_Status_Response steamguardScheme. */
    steamguardScheme: number;

    /** CTwoFactor_Status_Response tokenGid. */
    tokenGid: string;

    /** CTwoFactor_Status_Response emailValidated. */
    emailValidated: boolean;

    /** CTwoFactor_Status_Response deviceIdentifier. */
    deviceIdentifier: string;

    /** CTwoFactor_Status_Response timeCreated. */
    timeCreated: number;

    /** CTwoFactor_Status_Response revocationAttemptsRemaining. */
    revocationAttemptsRemaining: number;

    /** CTwoFactor_Status_Response classifiedAgent. */
    classifiedAgent: string;

    /** CTwoFactor_Status_Response allowExternalAuthenticator. */
    allowExternalAuthenticator: boolean;

    /** CTwoFactor_Status_Response timeTransferred. */
    timeTransferred: number;

    /** CTwoFactor_Status_Response version. */
    version: number;

    /**
     * Creates a new CTwoFactor_Status_Response instance using the specified properties.
     * @param [properties] Properties to set
     * @returns CTwoFactor_Status_Response instance
     */
    static create(properties?: ICTwoFactor_Status_Response): CTwoFactor_Status_Response;

    /**
     * Encodes the specified CTwoFactor_Status_Response message. Does not implicitly {@link CTwoFactor_Status_Response.verify|verify} messages.
     * @param message CTwoFactor_Status_Response message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    static encode(message: ICTwoFactor_Status_Response, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified CTwoFactor_Status_Response message, length delimited. Does not implicitly {@link CTwoFactor_Status_Response.verify|verify} messages.
     * @param message CTwoFactor_Status_Response message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    static encodeDelimited(message: ICTwoFactor_Status_Response, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a CTwoFactor_Status_Response message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns CTwoFactor_Status_Response
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CTwoFactor_Status_Response;

    /**
     * Decodes a CTwoFactor_Status_Response message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns CTwoFactor_Status_Response
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CTwoFactor_Status_Response;

    /**
     * Verifies a CTwoFactor_Status_Response message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a CTwoFactor_Status_Response message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns CTwoFactor_Status_Response
     */
    static fromObject(object: { [k: string]: any }): CTwoFactor_Status_Response;

    /**
     * Creates a plain object from a CTwoFactor_Status_Response message. Also converts values to other types if specified.
     * @param message CTwoFactor_Status_Response
     * @param [options] Conversion options
     * @returns Plain object
     */
    static toObject(message: CTwoFactor_Status_Response, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this CTwoFactor_Status_Response to JSON.
     * @returns JSON object
     */
    toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for CTwoFactor_Status_Response
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a CTwoFactor_RemoveAuthenticator_Request. */
export class CTwoFactor_RemoveAuthenticator_Request implements ICTwoFactor_RemoveAuthenticator_Request {

    /**
     * Constructs a new CTwoFactor_RemoveAuthenticator_Request.
     * @param [properties] Properties to set
     */
    constructor(properties?: ICTwoFactor_RemoveAuthenticator_Request);

    /** CTwoFactor_RemoveAuthenticator_Request revocationCode. */
    revocationCode: string;

    /** CTwoFactor_RemoveAuthenticator_Request revocationReason. */
    revocationReason: number;

    /** CTwoFactor_RemoveAuthenticator_Request steamguardScheme. */
    steamguardScheme: number;

    /** CTwoFactor_RemoveAuthenticator_Request removeAllSteamguardCookies. */
    removeAllSteamguardCookies: boolean;

    /**
     * Creates a new CTwoFactor_RemoveAuthenticator_Request instance using the specified properties.
     * @param [properties] Properties to set
     * @returns CTwoFactor_RemoveAuthenticator_Request instance
     */
    static create(properties?: ICTwoFactor_RemoveAuthenticator_Request): CTwoFactor_RemoveAuthenticator_Request;

    /**
     * Encodes the specified CTwoFactor_RemoveAuthenticator_Request message. Does not implicitly {@link CTwoFactor_RemoveAuthenticator_Request.verify|verify} messages.
     * @param message CTwoFactor_RemoveAuthenticator_Request message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    static encode(message: ICTwoFactor_RemoveAuthenticator_Request, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified CTwoFactor_RemoveAuthenticator_Request message, length delimited. Does not implicitly {@link CTwoFactor_RemoveAuthenticator_Request.verify|verify} messages.
     * @param message CTwoFactor_RemoveAuthenticator_Request message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    static encodeDelimited(message: ICTwoFactor_RemoveAuthenticator_Request, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a CTwoFactor_RemoveAuthenticator_Request message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns CTwoFactor_RemoveAuthenticator_Request
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CTwoFactor_RemoveAuthenticator_Request;

    /**
     * Decodes a CTwoFactor_RemoveAuthenticator_Request message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns CTwoFactor_RemoveAuthenticator_Request
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CTwoFactor_RemoveAuthenticator_Request;

    /**
     * Verifies a CTwoFactor_RemoveAuthenticator_Request message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a CTwoFactor_RemoveAuthenticator_Request message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns CTwoFactor_RemoveAuthenticator_Request
     */
    static fromObject(object: { [k: string]: any }): CTwoFactor_RemoveAuthenticator_Request;

    /**
     * Creates a plain object from a CTwoFactor_RemoveAuthenticator_Request message. Also converts values to other types if specified.
     * @param message CTwoFactor_RemoveAuthenticator_Request
     * @param [options] Conversion options
     * @returns Plain object
     */
    static toObject(message: CTwoFactor_RemoveAuthenticator_Request, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this CTwoFactor_RemoveAuthenticator_Request to JSON.
     * @returns JSON object
     */
    toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for CTwoFactor_RemoveAuthenticator_Request
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a CTwoFactor_RemoveAuthenticator_Response. */
export class CTwoFactor_RemoveAuthenticator_Response implements ICTwoFactor_RemoveAuthenticator_Response {

    /**
     * Constructs a new CTwoFactor_RemoveAuthenticator_Response.
     * @param [properties] Properties to set
     */
    constructor(properties?: ICTwoFactor_RemoveAuthenticator_Response);

    /** CTwoFactor_RemoveAuthenticator_Response success. */
    success: boolean;

    /** CTwoFactor_RemoveAuthenticator_Response serverTime. */
    serverTime: (number|Long);

    /** CTwoFactor_RemoveAuthenticator_Response revocationAttemptsRemaining. */
    revocationAttemptsRemaining: number;

    /**
     * Creates a new CTwoFactor_RemoveAuthenticator_Response instance using the specified properties.
     * @param [properties] Properties to set
     * @returns CTwoFactor_RemoveAuthenticator_Response instance
     */
    static create(properties?: ICTwoFactor_RemoveAuthenticator_Response): CTwoFactor_RemoveAuthenticator_Response;

    /**
     * Encodes the specified CTwoFactor_RemoveAuthenticator_Response message. Does not implicitly {@link CTwoFactor_RemoveAuthenticator_Response.verify|verify} messages.
     * @param message CTwoFactor_RemoveAuthenticator_Response message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    static encode(message: ICTwoFactor_RemoveAuthenticator_Response, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified CTwoFactor_RemoveAuthenticator_Response message, length delimited. Does not implicitly {@link CTwoFactor_RemoveAuthenticator_Response.verify|verify} messages.
     * @param message CTwoFactor_RemoveAuthenticator_Response message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    static encodeDelimited(message: ICTwoFactor_RemoveAuthenticator_Response, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a CTwoFactor_RemoveAuthenticator_Response message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns CTwoFactor_RemoveAuthenticator_Response
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CTwoFactor_RemoveAuthenticator_Response;

    /**
     * Decodes a CTwoFactor_RemoveAuthenticator_Response message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns CTwoFactor_RemoveAuthenticator_Response
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CTwoFactor_RemoveAuthenticator_Response;

    /**
     * Verifies a CTwoFactor_RemoveAuthenticator_Response message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a CTwoFactor_RemoveAuthenticator_Response message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns CTwoFactor_RemoveAuthenticator_Response
     */
    static fromObject(object: { [k: string]: any }): CTwoFactor_RemoveAuthenticator_Response;

    /**
     * Creates a plain object from a CTwoFactor_RemoveAuthenticator_Response message. Also converts values to other types if specified.
     * @param message CTwoFactor_RemoveAuthenticator_Response
     * @param [options] Conversion options
     * @returns Plain object
     */
    static toObject(message: CTwoFactor_RemoveAuthenticator_Response, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this CTwoFactor_RemoveAuthenticator_Response to JSON.
     * @returns JSON object
     */
    toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for CTwoFactor_RemoveAuthenticator_Response
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a CRemoveAuthenticatorViaChallengeContinue_Replacement_Token. */
export class CRemoveAuthenticatorViaChallengeContinue_Replacement_Token implements ICRemoveAuthenticatorViaChallengeContinue_Replacement_Token {

    /**
     * Constructs a new CRemoveAuthenticatorViaChallengeContinue_Replacement_Token.
     * @param [properties] Properties to set
     */
    constructor(properties?: ICRemoveAuthenticatorViaChallengeContinue_Replacement_Token);

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
    static create(properties?: ICRemoveAuthenticatorViaChallengeContinue_Replacement_Token): CRemoveAuthenticatorViaChallengeContinue_Replacement_Token;

    /**
     * Encodes the specified CRemoveAuthenticatorViaChallengeContinue_Replacement_Token message. Does not implicitly {@link CRemoveAuthenticatorViaChallengeContinue_Replacement_Token.verify|verify} messages.
     * @param message CRemoveAuthenticatorViaChallengeContinue_Replacement_Token message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    static encode(message: ICRemoveAuthenticatorViaChallengeContinue_Replacement_Token, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified CRemoveAuthenticatorViaChallengeContinue_Replacement_Token message, length delimited. Does not implicitly {@link CRemoveAuthenticatorViaChallengeContinue_Replacement_Token.verify|verify} messages.
     * @param message CRemoveAuthenticatorViaChallengeContinue_Replacement_Token message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    static encodeDelimited(message: ICRemoveAuthenticatorViaChallengeContinue_Replacement_Token, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a CRemoveAuthenticatorViaChallengeContinue_Replacement_Token message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns CRemoveAuthenticatorViaChallengeContinue_Replacement_Token
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CRemoveAuthenticatorViaChallengeContinue_Replacement_Token;

    /**
     * Decodes a CRemoveAuthenticatorViaChallengeContinue_Replacement_Token message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns CRemoveAuthenticatorViaChallengeContinue_Replacement_Token
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CRemoveAuthenticatorViaChallengeContinue_Replacement_Token;

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
     * Gets the default type url for CRemoveAuthenticatorViaChallengeContinue_Replacement_Token
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request. */
export class CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request implements ICTwoFactor_RemoveAuthenticatorViaChallengeStart_Request {

    /**
     * Constructs a new CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request.
     * @param [properties] Properties to set
     */
    constructor(properties?: ICTwoFactor_RemoveAuthenticatorViaChallengeStart_Request);

    /**
     * Creates a new CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request instance using the specified properties.
     * @param [properties] Properties to set
     * @returns CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request instance
     */
    static create(properties?: ICTwoFactor_RemoveAuthenticatorViaChallengeStart_Request): CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request;

    /**
     * Encodes the specified CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request message. Does not implicitly {@link CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request.verify|verify} messages.
     * @param message CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    static encode(message: ICTwoFactor_RemoveAuthenticatorViaChallengeStart_Request, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request message, length delimited. Does not implicitly {@link CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request.verify|verify} messages.
     * @param message CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    static encodeDelimited(message: ICTwoFactor_RemoveAuthenticatorViaChallengeStart_Request, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request;

    /**
     * Decodes a CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request;

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
     * Gets the default type url for CTwoFactor_RemoveAuthenticatorViaChallengeStart_Request
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response. */
export class CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response implements ICTwoFactor_RemoveAuthenticatorViaChallengeStart_Response {

    /**
     * Constructs a new CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response.
     * @param [properties] Properties to set
     */
    constructor(properties?: ICTwoFactor_RemoveAuthenticatorViaChallengeStart_Response);

    /** CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response success. */
    success: boolean;

    /**
     * Creates a new CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response instance using the specified properties.
     * @param [properties] Properties to set
     * @returns CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response instance
     */
    static create(properties?: ICTwoFactor_RemoveAuthenticatorViaChallengeStart_Response): CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response;

    /**
     * Encodes the specified CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response message. Does not implicitly {@link CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response.verify|verify} messages.
     * @param message CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    static encode(message: ICTwoFactor_RemoveAuthenticatorViaChallengeStart_Response, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response message, length delimited. Does not implicitly {@link CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response.verify|verify} messages.
     * @param message CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    static encodeDelimited(message: ICTwoFactor_RemoveAuthenticatorViaChallengeStart_Response, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response;

    /**
     * Decodes a CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response;

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
     * Gets the default type url for CTwoFactor_RemoveAuthenticatorViaChallengeStart_Response
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request. */
export class CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request implements ICTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request {

    /**
     * Constructs a new CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request.
     * @param [properties] Properties to set
     */
    constructor(properties?: ICTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request);

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
    static create(properties?: ICTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request): CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request;

    /**
     * Encodes the specified CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request message. Does not implicitly {@link CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request.verify|verify} messages.
     * @param message CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    static encode(message: ICTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request message, length delimited. Does not implicitly {@link CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request.verify|verify} messages.
     * @param message CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    static encodeDelimited(message: ICTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request;

    /**
     * Decodes a CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request;

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
     * Gets the default type url for CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Request
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response. */
export class CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response implements ICTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response {

    /**
     * Constructs a new CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response.
     * @param [properties] Properties to set
     */
    constructor(properties?: ICTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response);

    /** CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response success. */
    success: boolean;

    /** CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response replacementToken. */
    replacementToken?: (ICRemoveAuthenticatorViaChallengeContinue_Replacement_Token|null);

    /**
     * Creates a new CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response instance using the specified properties.
     * @param [properties] Properties to set
     * @returns CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response instance
     */
    static create(properties?: ICTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response): CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response;

    /**
     * Encodes the specified CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response message. Does not implicitly {@link CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response.verify|verify} messages.
     * @param message CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    static encode(message: ICTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response message, length delimited. Does not implicitly {@link CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response.verify|verify} messages.
     * @param message CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    static encodeDelimited(message: ICTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response;

    /**
     * Decodes a CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response;

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
     * Gets the default type url for CTwoFactor_RemoveAuthenticatorViaChallengeContinue_Response
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    static getTypeUrl(typeUrlPrefix?: string): string;
}
