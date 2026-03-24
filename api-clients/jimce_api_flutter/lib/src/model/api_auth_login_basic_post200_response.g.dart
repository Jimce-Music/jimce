// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'api_auth_login_basic_post200_response.dart';

// **************************************************************************
// CopyWithGenerator
// **************************************************************************

abstract class _$ApiAuthLoginBasicPost200ResponseCWProxy {
  ApiAuthLoginBasicPost200Response token(String token);

  /// Creates a new instance with the provided field values.
  /// Passing `null` to a nullable field nullifies it, while `null` for a non-nullable field is ignored. To update a single field use `ApiAuthLoginBasicPost200Response(...).copyWith.fieldName(value)`.
  ///
  /// Example:
  /// ```dart
  /// ApiAuthLoginBasicPost200Response(...).copyWith(id: 12, name: "My name")
  /// ```
  ApiAuthLoginBasicPost200Response call({String token});
}

/// Callable proxy for `copyWith` functionality.
/// Use as `instanceOfApiAuthLoginBasicPost200Response.copyWith(...)` or call `instanceOfApiAuthLoginBasicPost200Response.copyWith.fieldName(value)` for a single field.
class _$ApiAuthLoginBasicPost200ResponseCWProxyImpl
    implements _$ApiAuthLoginBasicPost200ResponseCWProxy {
  const _$ApiAuthLoginBasicPost200ResponseCWProxyImpl(this._value);

  final ApiAuthLoginBasicPost200Response _value;

  @override
  ApiAuthLoginBasicPost200Response token(String token) => call(token: token);

  @override
  /// Creates a new instance with the provided field values.
  /// Passing `null` to a nullable field nullifies it, while `null` for a non-nullable field is ignored. To update a single field use `ApiAuthLoginBasicPost200Response(...).copyWith.fieldName(value)`.
  ///
  /// Example:
  /// ```dart
  /// ApiAuthLoginBasicPost200Response(...).copyWith(id: 12, name: "My name")
  /// ```
  ApiAuthLoginBasicPost200Response call({
    Object? token = const $CopyWithPlaceholder(),
  }) {
    return ApiAuthLoginBasicPost200Response(
      token: token == const $CopyWithPlaceholder() || token == null
          ? _value.token
          // ignore: cast_nullable_to_non_nullable
          : token as String,
    );
  }
}

extension $ApiAuthLoginBasicPost200ResponseCopyWith
    on ApiAuthLoginBasicPost200Response {
  /// Returns a callable class used to build a new instance with modified fields.
  /// Example: `instanceOfApiAuthLoginBasicPost200Response.copyWith(...)` or `instanceOfApiAuthLoginBasicPost200Response.copyWith.fieldName(...)`.
  // ignore: library_private_types_in_public_api
  _$ApiAuthLoginBasicPost200ResponseCWProxy get copyWith =>
      _$ApiAuthLoginBasicPost200ResponseCWProxyImpl(this);
}

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

ApiAuthLoginBasicPost200Response _$ApiAuthLoginBasicPost200ResponseFromJson(
  Map<String, dynamic> json,
) =>
    $checkedCreate('ApiAuthLoginBasicPost200Response', json, ($checkedConvert) {
      $checkKeys(json, requiredKeys: const ['token']);
      final val = ApiAuthLoginBasicPost200Response(
        token: $checkedConvert('token', (v) => v as String),
      );
      return val;
    });

Map<String, dynamic> _$ApiAuthLoginBasicPost200ResponseToJson(
  ApiAuthLoginBasicPost200Response instance,
) => <String, dynamic>{'token': instance.token};
