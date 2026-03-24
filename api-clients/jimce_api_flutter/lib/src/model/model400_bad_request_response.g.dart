// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'model400_bad_request_response.dart';

// **************************************************************************
// CopyWithGenerator
// **************************************************************************

abstract class _$Model400BadRequestResponseCWProxy {
  Model400BadRequestResponse statusCode(
    Model400BadRequestResponseStatusCodeEnum statusCode,
  );

  Model400BadRequestResponse code(String code);

  Model400BadRequestResponse error(Model400BadRequestResponseErrorEnum error);

  Model400BadRequestResponse message(String message);

  /// Creates a new instance with the provided field values.
  /// Passing `null` to a nullable field nullifies it, while `null` for a non-nullable field is ignored. To update a single field use `Model400BadRequestResponse(...).copyWith.fieldName(value)`.
  ///
  /// Example:
  /// ```dart
  /// Model400BadRequestResponse(...).copyWith(id: 12, name: "My name")
  /// ```
  Model400BadRequestResponse call({
    Model400BadRequestResponseStatusCodeEnum statusCode,
    String code,
    Model400BadRequestResponseErrorEnum error,
    String message,
  });
}

/// Callable proxy for `copyWith` functionality.
/// Use as `instanceOfModel400BadRequestResponse.copyWith(...)` or call `instanceOfModel400BadRequestResponse.copyWith.fieldName(value)` for a single field.
class _$Model400BadRequestResponseCWProxyImpl
    implements _$Model400BadRequestResponseCWProxy {
  const _$Model400BadRequestResponseCWProxyImpl(this._value);

  final Model400BadRequestResponse _value;

  @override
  Model400BadRequestResponse statusCode(
    Model400BadRequestResponseStatusCodeEnum statusCode,
  ) => call(statusCode: statusCode);

  @override
  Model400BadRequestResponse code(String code) => call(code: code);

  @override
  Model400BadRequestResponse error(Model400BadRequestResponseErrorEnum error) =>
      call(error: error);

  @override
  Model400BadRequestResponse message(String message) => call(message: message);

  @override
  /// Creates a new instance with the provided field values.
  /// Passing `null` to a nullable field nullifies it, while `null` for a non-nullable field is ignored. To update a single field use `Model400BadRequestResponse(...).copyWith.fieldName(value)`.
  ///
  /// Example:
  /// ```dart
  /// Model400BadRequestResponse(...).copyWith(id: 12, name: "My name")
  /// ```
  Model400BadRequestResponse call({
    Object? statusCode = const $CopyWithPlaceholder(),
    Object? code = const $CopyWithPlaceholder(),
    Object? error = const $CopyWithPlaceholder(),
    Object? message = const $CopyWithPlaceholder(),
  }) {
    return Model400BadRequestResponse(
      statusCode:
          statusCode == const $CopyWithPlaceholder() || statusCode == null
          ? _value.statusCode
          // ignore: cast_nullable_to_non_nullable
          : statusCode as Model400BadRequestResponseStatusCodeEnum,
      code: code == const $CopyWithPlaceholder() || code == null
          ? _value.code
          // ignore: cast_nullable_to_non_nullable
          : code as String,
      error: error == const $CopyWithPlaceholder() || error == null
          ? _value.error
          // ignore: cast_nullable_to_non_nullable
          : error as Model400BadRequestResponseErrorEnum,
      message: message == const $CopyWithPlaceholder() || message == null
          ? _value.message
          // ignore: cast_nullable_to_non_nullable
          : message as String,
    );
  }
}

extension $Model400BadRequestResponseCopyWith on Model400BadRequestResponse {
  /// Returns a callable class used to build a new instance with modified fields.
  /// Example: `instanceOfModel400BadRequestResponse.copyWith(...)` or `instanceOfModel400BadRequestResponse.copyWith.fieldName(...)`.
  // ignore: library_private_types_in_public_api
  _$Model400BadRequestResponseCWProxy get copyWith =>
      _$Model400BadRequestResponseCWProxyImpl(this);
}

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Model400BadRequestResponse _$Model400BadRequestResponseFromJson(
  Map<String, dynamic> json,
) => $checkedCreate('Model400BadRequestResponse', json, ($checkedConvert) {
  $checkKeys(
    json,
    requiredKeys: const ['statusCode', 'code', 'error', 'message'],
  );
  final val = Model400BadRequestResponse(
    statusCode: $checkedConvert(
      'statusCode',
      (v) => $enumDecode(_$Model400BadRequestResponseStatusCodeEnumEnumMap, v),
    ),
    code: $checkedConvert('code', (v) => v as String),
    error: $checkedConvert(
      'error',
      (v) => $enumDecode(_$Model400BadRequestResponseErrorEnumEnumMap, v),
    ),
    message: $checkedConvert('message', (v) => v as String),
  );
  return val;
});

Map<String, dynamic> _$Model400BadRequestResponseToJson(
  Model400BadRequestResponse instance,
) => <String, dynamic>{
  'statusCode':
      _$Model400BadRequestResponseStatusCodeEnumEnumMap[instance.statusCode]!,
  'code': instance.code,
  'error': _$Model400BadRequestResponseErrorEnumEnumMap[instance.error]!,
  'message': instance.message,
};

const _$Model400BadRequestResponseStatusCodeEnumEnumMap = {
  Model400BadRequestResponseStatusCodeEnum.n400: '400',
};

const _$Model400BadRequestResponseErrorEnumEnumMap = {
  Model400BadRequestResponseErrorEnum.badRequest: 'Bad Request',
};
