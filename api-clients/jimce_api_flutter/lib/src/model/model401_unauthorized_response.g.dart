// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'model401_unauthorized_response.dart';

// **************************************************************************
// CopyWithGenerator
// **************************************************************************

abstract class _$Model401UnauthorizedResponseCWProxy {
  Model401UnauthorizedResponse statusCode(
    Model401UnauthorizedResponseStatusCodeEnum statusCode,
  );

  Model401UnauthorizedResponse code(String code);

  Model401UnauthorizedResponse error(
    Model401UnauthorizedResponseErrorEnum error,
  );

  Model401UnauthorizedResponse message(String message);

  /// Creates a new instance with the provided field values.
  /// Passing `null` to a nullable field nullifies it, while `null` for a non-nullable field is ignored. To update a single field use `Model401UnauthorizedResponse(...).copyWith.fieldName(value)`.
  ///
  /// Example:
  /// ```dart
  /// Model401UnauthorizedResponse(...).copyWith(id: 12, name: "My name")
  /// ```
  Model401UnauthorizedResponse call({
    Model401UnauthorizedResponseStatusCodeEnum statusCode,
    String code,
    Model401UnauthorizedResponseErrorEnum error,
    String message,
  });
}

/// Callable proxy for `copyWith` functionality.
/// Use as `instanceOfModel401UnauthorizedResponse.copyWith(...)` or call `instanceOfModel401UnauthorizedResponse.copyWith.fieldName(value)` for a single field.
class _$Model401UnauthorizedResponseCWProxyImpl
    implements _$Model401UnauthorizedResponseCWProxy {
  const _$Model401UnauthorizedResponseCWProxyImpl(this._value);

  final Model401UnauthorizedResponse _value;

  @override
  Model401UnauthorizedResponse statusCode(
    Model401UnauthorizedResponseStatusCodeEnum statusCode,
  ) => call(statusCode: statusCode);

  @override
  Model401UnauthorizedResponse code(String code) => call(code: code);

  @override
  Model401UnauthorizedResponse error(
    Model401UnauthorizedResponseErrorEnum error,
  ) => call(error: error);

  @override
  Model401UnauthorizedResponse message(String message) =>
      call(message: message);

  @override
  /// Creates a new instance with the provided field values.
  /// Passing `null` to a nullable field nullifies it, while `null` for a non-nullable field is ignored. To update a single field use `Model401UnauthorizedResponse(...).copyWith.fieldName(value)`.
  ///
  /// Example:
  /// ```dart
  /// Model401UnauthorizedResponse(...).copyWith(id: 12, name: "My name")
  /// ```
  Model401UnauthorizedResponse call({
    Object? statusCode = const $CopyWithPlaceholder(),
    Object? code = const $CopyWithPlaceholder(),
    Object? error = const $CopyWithPlaceholder(),
    Object? message = const $CopyWithPlaceholder(),
  }) {
    return Model401UnauthorizedResponse(
      statusCode:
          statusCode == const $CopyWithPlaceholder() || statusCode == null
          ? _value.statusCode
          // ignore: cast_nullable_to_non_nullable
          : statusCode as Model401UnauthorizedResponseStatusCodeEnum,
      code: code == const $CopyWithPlaceholder() || code == null
          ? _value.code
          // ignore: cast_nullable_to_non_nullable
          : code as String,
      error: error == const $CopyWithPlaceholder() || error == null
          ? _value.error
          // ignore: cast_nullable_to_non_nullable
          : error as Model401UnauthorizedResponseErrorEnum,
      message: message == const $CopyWithPlaceholder() || message == null
          ? _value.message
          // ignore: cast_nullable_to_non_nullable
          : message as String,
    );
  }
}

extension $Model401UnauthorizedResponseCopyWith
    on Model401UnauthorizedResponse {
  /// Returns a callable class used to build a new instance with modified fields.
  /// Example: `instanceOfModel401UnauthorizedResponse.copyWith(...)` or `instanceOfModel401UnauthorizedResponse.copyWith.fieldName(...)`.
  // ignore: library_private_types_in_public_api
  _$Model401UnauthorizedResponseCWProxy get copyWith =>
      _$Model401UnauthorizedResponseCWProxyImpl(this);
}

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Model401UnauthorizedResponse _$Model401UnauthorizedResponseFromJson(
  Map<String, dynamic> json,
) => $checkedCreate('Model401UnauthorizedResponse', json, ($checkedConvert) {
  $checkKeys(
    json,
    requiredKeys: const ['statusCode', 'code', 'error', 'message'],
  );
  final val = Model401UnauthorizedResponse(
    statusCode: $checkedConvert(
      'statusCode',
      (v) =>
          $enumDecode(_$Model401UnauthorizedResponseStatusCodeEnumEnumMap, v),
    ),
    code: $checkedConvert('code', (v) => v as String),
    error: $checkedConvert(
      'error',
      (v) => $enumDecode(_$Model401UnauthorizedResponseErrorEnumEnumMap, v),
    ),
    message: $checkedConvert('message', (v) => v as String),
  );
  return val;
});

Map<String, dynamic> _$Model401UnauthorizedResponseToJson(
  Model401UnauthorizedResponse instance,
) => <String, dynamic>{
  'statusCode':
      _$Model401UnauthorizedResponseStatusCodeEnumEnumMap[instance.statusCode]!,
  'code': instance.code,
  'error': _$Model401UnauthorizedResponseErrorEnumEnumMap[instance.error]!,
  'message': instance.message,
};

const _$Model401UnauthorizedResponseStatusCodeEnumEnumMap = {
  Model401UnauthorizedResponseStatusCodeEnum.n401: '401',
};

const _$Model401UnauthorizedResponseErrorEnumEnumMap = {
  Model401UnauthorizedResponseErrorEnum.unauthorized: 'Unauthorized',
};
