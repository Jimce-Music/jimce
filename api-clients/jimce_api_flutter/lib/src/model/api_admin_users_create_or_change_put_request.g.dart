// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'api_admin_users_create_or_change_put_request.dart';

// **************************************************************************
// CopyWithGenerator
// **************************************************************************

abstract class _$ApiAdminUsersCreateOrChangePutRequestCWProxy {
  ApiAdminUsersCreateOrChangePutRequest username(String username);

  ApiAdminUsersCreateOrChangePutRequest password(String? password);

  ApiAdminUsersCreateOrChangePutRequest email(String? email);

  ApiAdminUsersCreateOrChangePutRequest isAdmin(bool isAdmin);

  /// Creates a new instance with the provided field values.
  /// Passing `null` to a nullable field nullifies it, while `null` for a non-nullable field is ignored. To update a single field use `ApiAdminUsersCreateOrChangePutRequest(...).copyWith.fieldName(value)`.
  ///
  /// Example:
  /// ```dart
  /// ApiAdminUsersCreateOrChangePutRequest(...).copyWith(id: 12, name: "My name")
  /// ```
  ApiAdminUsersCreateOrChangePutRequest call({
    String username,
    String? password,
    String? email,
    bool isAdmin,
  });
}

/// Callable proxy for `copyWith` functionality.
/// Use as `instanceOfApiAdminUsersCreateOrChangePutRequest.copyWith(...)` or call `instanceOfApiAdminUsersCreateOrChangePutRequest.copyWith.fieldName(value)` for a single field.
class _$ApiAdminUsersCreateOrChangePutRequestCWProxyImpl
    implements _$ApiAdminUsersCreateOrChangePutRequestCWProxy {
  const _$ApiAdminUsersCreateOrChangePutRequestCWProxyImpl(this._value);

  final ApiAdminUsersCreateOrChangePutRequest _value;

  @override
  ApiAdminUsersCreateOrChangePutRequest username(String username) =>
      call(username: username);

  @override
  ApiAdminUsersCreateOrChangePutRequest password(String? password) =>
      call(password: password);

  @override
  ApiAdminUsersCreateOrChangePutRequest email(String? email) =>
      call(email: email);

  @override
  ApiAdminUsersCreateOrChangePutRequest isAdmin(bool isAdmin) =>
      call(isAdmin: isAdmin);

  @override
  /// Creates a new instance with the provided field values.
  /// Passing `null` to a nullable field nullifies it, while `null` for a non-nullable field is ignored. To update a single field use `ApiAdminUsersCreateOrChangePutRequest(...).copyWith.fieldName(value)`.
  ///
  /// Example:
  /// ```dart
  /// ApiAdminUsersCreateOrChangePutRequest(...).copyWith(id: 12, name: "My name")
  /// ```
  ApiAdminUsersCreateOrChangePutRequest call({
    Object? username = const $CopyWithPlaceholder(),
    Object? password = const $CopyWithPlaceholder(),
    Object? email = const $CopyWithPlaceholder(),
    Object? isAdmin = const $CopyWithPlaceholder(),
  }) {
    return ApiAdminUsersCreateOrChangePutRequest(
      username: username == const $CopyWithPlaceholder() || username == null
          ? _value.username
          // ignore: cast_nullable_to_non_nullable
          : username as String,
      password: password == const $CopyWithPlaceholder()
          ? _value.password
          // ignore: cast_nullable_to_non_nullable
          : password as String?,
      email: email == const $CopyWithPlaceholder()
          ? _value.email
          // ignore: cast_nullable_to_non_nullable
          : email as String?,
      isAdmin: isAdmin == const $CopyWithPlaceholder() || isAdmin == null
          ? _value.isAdmin
          // ignore: cast_nullable_to_non_nullable
          : isAdmin as bool,
    );
  }
}

extension $ApiAdminUsersCreateOrChangePutRequestCopyWith
    on ApiAdminUsersCreateOrChangePutRequest {
  /// Returns a callable class used to build a new instance with modified fields.
  /// Example: `instanceOfApiAdminUsersCreateOrChangePutRequest.copyWith(...)` or `instanceOfApiAdminUsersCreateOrChangePutRequest.copyWith.fieldName(...)`.
  // ignore: library_private_types_in_public_api
  _$ApiAdminUsersCreateOrChangePutRequestCWProxy get copyWith =>
      _$ApiAdminUsersCreateOrChangePutRequestCWProxyImpl(this);
}

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

ApiAdminUsersCreateOrChangePutRequest
_$ApiAdminUsersCreateOrChangePutRequestFromJson(Map<String, dynamic> json) =>
    $checkedCreate('ApiAdminUsersCreateOrChangePutRequest', json, (
      $checkedConvert,
    ) {
      $checkKeys(json, requiredKeys: const ['username', 'email', 'isAdmin']);
      final val = ApiAdminUsersCreateOrChangePutRequest(
        username: $checkedConvert('username', (v) => v as String),
        password: $checkedConvert('password', (v) => v as String?),
        email: $checkedConvert('email', (v) => v as String?),
        isAdmin: $checkedConvert('isAdmin', (v) => v as bool),
      );
      return val;
    });

Map<String, dynamic> _$ApiAdminUsersCreateOrChangePutRequestToJson(
  ApiAdminUsersCreateOrChangePutRequest instance,
) => <String, dynamic>{
  'username': instance.username,
  'password': ?instance.password,
  'email': instance.email,
  'isAdmin': instance.isAdmin,
};
