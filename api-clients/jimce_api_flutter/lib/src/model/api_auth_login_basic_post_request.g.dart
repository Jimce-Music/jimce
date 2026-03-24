// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'api_auth_login_basic_post_request.dart';

// **************************************************************************
// CopyWithGenerator
// **************************************************************************

abstract class _$ApiAuthLoginBasicPostRequestCWProxy {
  ApiAuthLoginBasicPostRequest username(String username);

  ApiAuthLoginBasicPostRequest password(String password);

  /// Creates a new instance with the provided field values.
  /// Passing `null` to a nullable field nullifies it, while `null` for a non-nullable field is ignored. To update a single field use `ApiAuthLoginBasicPostRequest(...).copyWith.fieldName(value)`.
  ///
  /// Example:
  /// ```dart
  /// ApiAuthLoginBasicPostRequest(...).copyWith(id: 12, name: "My name")
  /// ```
  ApiAuthLoginBasicPostRequest call({String username, String password});
}

/// Callable proxy for `copyWith` functionality.
/// Use as `instanceOfApiAuthLoginBasicPostRequest.copyWith(...)` or call `instanceOfApiAuthLoginBasicPostRequest.copyWith.fieldName(value)` for a single field.
class _$ApiAuthLoginBasicPostRequestCWProxyImpl
    implements _$ApiAuthLoginBasicPostRequestCWProxy {
  const _$ApiAuthLoginBasicPostRequestCWProxyImpl(this._value);

  final ApiAuthLoginBasicPostRequest _value;

  @override
  ApiAuthLoginBasicPostRequest username(String username) =>
      call(username: username);

  @override
  ApiAuthLoginBasicPostRequest password(String password) =>
      call(password: password);

  @override
  /// Creates a new instance with the provided field values.
  /// Passing `null` to a nullable field nullifies it, while `null` for a non-nullable field is ignored. To update a single field use `ApiAuthLoginBasicPostRequest(...).copyWith.fieldName(value)`.
  ///
  /// Example:
  /// ```dart
  /// ApiAuthLoginBasicPostRequest(...).copyWith(id: 12, name: "My name")
  /// ```
  ApiAuthLoginBasicPostRequest call({
    Object? username = const $CopyWithPlaceholder(),
    Object? password = const $CopyWithPlaceholder(),
  }) {
    return ApiAuthLoginBasicPostRequest(
      username: username == const $CopyWithPlaceholder() || username == null
          ? _value.username
          // ignore: cast_nullable_to_non_nullable
          : username as String,
      password: password == const $CopyWithPlaceholder() || password == null
          ? _value.password
          // ignore: cast_nullable_to_non_nullable
          : password as String,
    );
  }
}

extension $ApiAuthLoginBasicPostRequestCopyWith
    on ApiAuthLoginBasicPostRequest {
  /// Returns a callable class used to build a new instance with modified fields.
  /// Example: `instanceOfApiAuthLoginBasicPostRequest.copyWith(...)` or `instanceOfApiAuthLoginBasicPostRequest.copyWith.fieldName(...)`.
  // ignore: library_private_types_in_public_api
  _$ApiAuthLoginBasicPostRequestCWProxy get copyWith =>
      _$ApiAuthLoginBasicPostRequestCWProxyImpl(this);
}

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

ApiAuthLoginBasicPostRequest _$ApiAuthLoginBasicPostRequestFromJson(
  Map<String, dynamic> json,
) => $checkedCreate('ApiAuthLoginBasicPostRequest', json, ($checkedConvert) {
  $checkKeys(json, requiredKeys: const ['username', 'password']);
  final val = ApiAuthLoginBasicPostRequest(
    username: $checkedConvert('username', (v) => v as String),
    password: $checkedConvert('password', (v) => v as String),
  );
  return val;
});

Map<String, dynamic> _$ApiAuthLoginBasicPostRequestToJson(
  ApiAuthLoginBasicPostRequest instance,
) => <String, dynamic>{
  'username': instance.username,
  'password': instance.password,
};
