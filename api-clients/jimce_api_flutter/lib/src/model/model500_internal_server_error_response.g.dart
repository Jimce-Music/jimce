// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'model500_internal_server_error_response.dart';

// **************************************************************************
// CopyWithGenerator
// **************************************************************************

abstract class _$Model500InternalServerErrorResponseCWProxy {
  Model500InternalServerErrorResponse statusCode(
    Model500InternalServerErrorResponseStatusCodeEnum statusCode,
  );

  Model500InternalServerErrorResponse code(String code);

  Model500InternalServerErrorResponse error(
    Model500InternalServerErrorResponseErrorEnum error,
  );

  Model500InternalServerErrorResponse message(String message);

  /// Creates a new instance with the provided field values.
  /// Passing `null` to a nullable field nullifies it, while `null` for a non-nullable field is ignored. To update a single field use `Model500InternalServerErrorResponse(...).copyWith.fieldName(value)`.
  ///
  /// Example:
  /// ```dart
  /// Model500InternalServerErrorResponse(...).copyWith(id: 12, name: "My name")
  /// ```
  Model500InternalServerErrorResponse call({
    Model500InternalServerErrorResponseStatusCodeEnum statusCode,
    String code,
    Model500InternalServerErrorResponseErrorEnum error,
    String message,
  });
}

/// Callable proxy for `copyWith` functionality.
/// Use as `instanceOfModel500InternalServerErrorResponse.copyWith(...)` or call `instanceOfModel500InternalServerErrorResponse.copyWith.fieldName(value)` for a single field.
class _$Model500InternalServerErrorResponseCWProxyImpl
    implements _$Model500InternalServerErrorResponseCWProxy {
  const _$Model500InternalServerErrorResponseCWProxyImpl(this._value);

  final Model500InternalServerErrorResponse _value;

  @override
  Model500InternalServerErrorResponse statusCode(
    Model500InternalServerErrorResponseStatusCodeEnum statusCode,
  ) => call(statusCode: statusCode);

  @override
  Model500InternalServerErrorResponse code(String code) => call(code: code);

  @override
  Model500InternalServerErrorResponse error(
    Model500InternalServerErrorResponseErrorEnum error,
  ) => call(error: error);

  @override
  Model500InternalServerErrorResponse message(String message) =>
      call(message: message);

  @override
  /// Creates a new instance with the provided field values.
  /// Passing `null` to a nullable field nullifies it, while `null` for a non-nullable field is ignored. To update a single field use `Model500InternalServerErrorResponse(...).copyWith.fieldName(value)`.
  ///
  /// Example:
  /// ```dart
  /// Model500InternalServerErrorResponse(...).copyWith(id: 12, name: "My name")
  /// ```
  Model500InternalServerErrorResponse call({
    Object? statusCode = const $CopyWithPlaceholder(),
    Object? code = const $CopyWithPlaceholder(),
    Object? error = const $CopyWithPlaceholder(),
    Object? message = const $CopyWithPlaceholder(),
  }) {
    return Model500InternalServerErrorResponse(
      statusCode:
          statusCode == const $CopyWithPlaceholder() || statusCode == null
          ? _value.statusCode
          // ignore: cast_nullable_to_non_nullable
          : statusCode as Model500InternalServerErrorResponseStatusCodeEnum,
      code: code == const $CopyWithPlaceholder() || code == null
          ? _value.code
          // ignore: cast_nullable_to_non_nullable
          : code as String,
      error: error == const $CopyWithPlaceholder() || error == null
          ? _value.error
          // ignore: cast_nullable_to_non_nullable
          : error as Model500InternalServerErrorResponseErrorEnum,
      message: message == const $CopyWithPlaceholder() || message == null
          ? _value.message
          // ignore: cast_nullable_to_non_nullable
          : message as String,
    );
  }
}

extension $Model500InternalServerErrorResponseCopyWith
    on Model500InternalServerErrorResponse {
  /// Returns a callable class used to build a new instance with modified fields.
  /// Example: `instanceOfModel500InternalServerErrorResponse.copyWith(...)` or `instanceOfModel500InternalServerErrorResponse.copyWith.fieldName(...)`.
  // ignore: library_private_types_in_public_api
  _$Model500InternalServerErrorResponseCWProxy get copyWith =>
      _$Model500InternalServerErrorResponseCWProxyImpl(this);
}

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Model500InternalServerErrorResponse
_$Model500InternalServerErrorResponseFromJson(Map<String, dynamic> json) =>
    $checkedCreate('Model500InternalServerErrorResponse', json, (
      $checkedConvert,
    ) {
      $checkKeys(
        json,
        requiredKeys: const ['statusCode', 'code', 'error', 'message'],
      );
      final val = Model500InternalServerErrorResponse(
        statusCode: $checkedConvert(
          'statusCode',
          (v) => $enumDecode(
            _$Model500InternalServerErrorResponseStatusCodeEnumEnumMap,
            v,
          ),
        ),
        code: $checkedConvert('code', (v) => v as String),
        error: $checkedConvert(
          'error',
          (v) => $enumDecode(
            _$Model500InternalServerErrorResponseErrorEnumEnumMap,
            v,
          ),
        ),
        message: $checkedConvert('message', (v) => v as String),
      );
      return val;
    });

Map<String, dynamic> _$Model500InternalServerErrorResponseToJson(
  Model500InternalServerErrorResponse instance,
) => <String, dynamic>{
  'statusCode':
      _$Model500InternalServerErrorResponseStatusCodeEnumEnumMap[instance
          .statusCode]!,
  'code': instance.code,
  'error':
      _$Model500InternalServerErrorResponseErrorEnumEnumMap[instance.error]!,
  'message': instance.message,
};

const _$Model500InternalServerErrorResponseStatusCodeEnumEnumMap = {
  Model500InternalServerErrorResponseStatusCodeEnum.n500: '500',
};

const _$Model500InternalServerErrorResponseErrorEnumEnumMap = {
  Model500InternalServerErrorResponseErrorEnum.internalServerError:
      'Internal Server Error',
};
