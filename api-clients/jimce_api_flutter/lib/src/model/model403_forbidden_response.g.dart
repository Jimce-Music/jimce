// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'model403_forbidden_response.dart';

// **************************************************************************
// CopyWithGenerator
// **************************************************************************

abstract class _$Model403ForbiddenResponseCWProxy {
  Model403ForbiddenResponse statusCode(
    Model403ForbiddenResponseStatusCodeEnum statusCode,
  );

  Model403ForbiddenResponse code(String code);

  Model403ForbiddenResponse error(Model403ForbiddenResponseErrorEnum error);

  Model403ForbiddenResponse message(String message);

  /// Creates a new instance with the provided field values.
  /// Passing `null` to a nullable field nullifies it, while `null` for a non-nullable field is ignored. To update a single field use `Model403ForbiddenResponse(...).copyWith.fieldName(value)`.
  ///
  /// Example:
  /// ```dart
  /// Model403ForbiddenResponse(...).copyWith(id: 12, name: "My name")
  /// ```
  Model403ForbiddenResponse call({
    Model403ForbiddenResponseStatusCodeEnum statusCode,
    String code,
    Model403ForbiddenResponseErrorEnum error,
    String message,
  });
}

/// Callable proxy for `copyWith` functionality.
/// Use as `instanceOfModel403ForbiddenResponse.copyWith(...)` or call `instanceOfModel403ForbiddenResponse.copyWith.fieldName(value)` for a single field.
class _$Model403ForbiddenResponseCWProxyImpl
    implements _$Model403ForbiddenResponseCWProxy {
  const _$Model403ForbiddenResponseCWProxyImpl(this._value);

  final Model403ForbiddenResponse _value;

  @override
  Model403ForbiddenResponse statusCode(
    Model403ForbiddenResponseStatusCodeEnum statusCode,
  ) => call(statusCode: statusCode);

  @override
  Model403ForbiddenResponse code(String code) => call(code: code);

  @override
  Model403ForbiddenResponse error(Model403ForbiddenResponseErrorEnum error) =>
      call(error: error);

  @override
  Model403ForbiddenResponse message(String message) => call(message: message);

  @override
  /// Creates a new instance with the provided field values.
  /// Passing `null` to a nullable field nullifies it, while `null` for a non-nullable field is ignored. To update a single field use `Model403ForbiddenResponse(...).copyWith.fieldName(value)`.
  ///
  /// Example:
  /// ```dart
  /// Model403ForbiddenResponse(...).copyWith(id: 12, name: "My name")
  /// ```
  Model403ForbiddenResponse call({
    Object? statusCode = const $CopyWithPlaceholder(),
    Object? code = const $CopyWithPlaceholder(),
    Object? error = const $CopyWithPlaceholder(),
    Object? message = const $CopyWithPlaceholder(),
  }) {
    return Model403ForbiddenResponse(
      statusCode:
          statusCode == const $CopyWithPlaceholder() || statusCode == null
          ? _value.statusCode
          // ignore: cast_nullable_to_non_nullable
          : statusCode as Model403ForbiddenResponseStatusCodeEnum,
      code: code == const $CopyWithPlaceholder() || code == null
          ? _value.code
          // ignore: cast_nullable_to_non_nullable
          : code as String,
      error: error == const $CopyWithPlaceholder() || error == null
          ? _value.error
          // ignore: cast_nullable_to_non_nullable
          : error as Model403ForbiddenResponseErrorEnum,
      message: message == const $CopyWithPlaceholder() || message == null
          ? _value.message
          // ignore: cast_nullable_to_non_nullable
          : message as String,
    );
  }
}

extension $Model403ForbiddenResponseCopyWith on Model403ForbiddenResponse {
  /// Returns a callable class used to build a new instance with modified fields.
  /// Example: `instanceOfModel403ForbiddenResponse.copyWith(...)` or `instanceOfModel403ForbiddenResponse.copyWith.fieldName(...)`.
  // ignore: library_private_types_in_public_api
  _$Model403ForbiddenResponseCWProxy get copyWith =>
      _$Model403ForbiddenResponseCWProxyImpl(this);
}

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Model403ForbiddenResponse _$Model403ForbiddenResponseFromJson(
  Map<String, dynamic> json,
) => $checkedCreate('Model403ForbiddenResponse', json, ($checkedConvert) {
  $checkKeys(
    json,
    requiredKeys: const ['statusCode', 'code', 'error', 'message'],
  );
  final val = Model403ForbiddenResponse(
    statusCode: $checkedConvert(
      'statusCode',
      (v) => $enumDecode(_$Model403ForbiddenResponseStatusCodeEnumEnumMap, v),
    ),
    code: $checkedConvert('code', (v) => v as String),
    error: $checkedConvert(
      'error',
      (v) => $enumDecode(_$Model403ForbiddenResponseErrorEnumEnumMap, v),
    ),
    message: $checkedConvert('message', (v) => v as String),
  );
  return val;
});

Map<String, dynamic> _$Model403ForbiddenResponseToJson(
  Model403ForbiddenResponse instance,
) => <String, dynamic>{
  'statusCode':
      _$Model403ForbiddenResponseStatusCodeEnumEnumMap[instance.statusCode]!,
  'code': instance.code,
  'error': _$Model403ForbiddenResponseErrorEnumEnumMap[instance.error]!,
  'message': instance.message,
};

const _$Model403ForbiddenResponseStatusCodeEnumEnumMap = {
  Model403ForbiddenResponseStatusCodeEnum.n403: '403',
};

const _$Model403ForbiddenResponseErrorEnumEnumMap = {
  Model403ForbiddenResponseErrorEnum.forbidden: 'Forbidden',
};
