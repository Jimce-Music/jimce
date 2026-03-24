// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'api_auth_check_token_get200_response.dart';

// **************************************************************************
// CopyWithGenerator
// **************************************************************************

abstract class _$ApiAuthCheckTokenGet200ResponseCWProxy {
  ApiAuthCheckTokenGet200Response payload(JWTPayload payload);

  ApiAuthCheckTokenGet200Response isAdmin(bool isAdmin);

  /// Creates a new instance with the provided field values.
  /// Passing `null` to a nullable field nullifies it, while `null` for a non-nullable field is ignored. To update a single field use `ApiAuthCheckTokenGet200Response(...).copyWith.fieldName(value)`.
  ///
  /// Example:
  /// ```dart
  /// ApiAuthCheckTokenGet200Response(...).copyWith(id: 12, name: "My name")
  /// ```
  ApiAuthCheckTokenGet200Response call({JWTPayload payload, bool isAdmin});
}

/// Callable proxy for `copyWith` functionality.
/// Use as `instanceOfApiAuthCheckTokenGet200Response.copyWith(...)` or call `instanceOfApiAuthCheckTokenGet200Response.copyWith.fieldName(value)` for a single field.
class _$ApiAuthCheckTokenGet200ResponseCWProxyImpl
    implements _$ApiAuthCheckTokenGet200ResponseCWProxy {
  const _$ApiAuthCheckTokenGet200ResponseCWProxyImpl(this._value);

  final ApiAuthCheckTokenGet200Response _value;

  @override
  ApiAuthCheckTokenGet200Response payload(JWTPayload payload) =>
      call(payload: payload);

  @override
  ApiAuthCheckTokenGet200Response isAdmin(bool isAdmin) =>
      call(isAdmin: isAdmin);

  @override
  /// Creates a new instance with the provided field values.
  /// Passing `null` to a nullable field nullifies it, while `null` for a non-nullable field is ignored. To update a single field use `ApiAuthCheckTokenGet200Response(...).copyWith.fieldName(value)`.
  ///
  /// Example:
  /// ```dart
  /// ApiAuthCheckTokenGet200Response(...).copyWith(id: 12, name: "My name")
  /// ```
  ApiAuthCheckTokenGet200Response call({
    Object? payload = const $CopyWithPlaceholder(),
    Object? isAdmin = const $CopyWithPlaceholder(),
  }) {
    return ApiAuthCheckTokenGet200Response(
      payload: payload == const $CopyWithPlaceholder() || payload == null
          ? _value.payload
          // ignore: cast_nullable_to_non_nullable
          : payload as JWTPayload,
      isAdmin: isAdmin == const $CopyWithPlaceholder() || isAdmin == null
          ? _value.isAdmin
          // ignore: cast_nullable_to_non_nullable
          : isAdmin as bool,
    );
  }
}

extension $ApiAuthCheckTokenGet200ResponseCopyWith
    on ApiAuthCheckTokenGet200Response {
  /// Returns a callable class used to build a new instance with modified fields.
  /// Example: `instanceOfApiAuthCheckTokenGet200Response.copyWith(...)` or `instanceOfApiAuthCheckTokenGet200Response.copyWith.fieldName(...)`.
  // ignore: library_private_types_in_public_api
  _$ApiAuthCheckTokenGet200ResponseCWProxy get copyWith =>
      _$ApiAuthCheckTokenGet200ResponseCWProxyImpl(this);
}

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

ApiAuthCheckTokenGet200Response _$ApiAuthCheckTokenGet200ResponseFromJson(
  Map<String, dynamic> json,
) => $checkedCreate('ApiAuthCheckTokenGet200Response', json, ($checkedConvert) {
  $checkKeys(json, requiredKeys: const ['payload', 'isAdmin']);
  final val = ApiAuthCheckTokenGet200Response(
    payload: $checkedConvert(
      'payload',
      (v) => JWTPayload.fromJson(v as Map<String, dynamic>),
    ),
    isAdmin: $checkedConvert('isAdmin', (v) => v as bool),
  );
  return val;
});

Map<String, dynamic> _$ApiAuthCheckTokenGet200ResponseToJson(
  ApiAuthCheckTokenGet200Response instance,
) => <String, dynamic>{
  'payload': instance.payload.toJson(),
  'isAdmin': instance.isAdmin,
};
