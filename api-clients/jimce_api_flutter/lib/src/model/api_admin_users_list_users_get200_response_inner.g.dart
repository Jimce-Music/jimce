// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'api_admin_users_list_users_get200_response_inner.dart';

// **************************************************************************
// CopyWithGenerator
// **************************************************************************

abstract class _$ApiAdminUsersListUsersGet200ResponseInnerCWProxy {
  ApiAdminUsersListUsersGet200ResponseInner id(String id);

  ApiAdminUsersListUsersGet200ResponseInner username(String username);

  ApiAdminUsersListUsersGet200ResponseInner email(String? email);

  ApiAdminUsersListUsersGet200ResponseInner isAdmin(bool isAdmin);

  /// Creates a new instance with the provided field values.
  /// Passing `null` to a nullable field nullifies it, while `null` for a non-nullable field is ignored. To update a single field use `ApiAdminUsersListUsersGet200ResponseInner(...).copyWith.fieldName(value)`.
  ///
  /// Example:
  /// ```dart
  /// ApiAdminUsersListUsersGet200ResponseInner(...).copyWith(id: 12, name: "My name")
  /// ```
  ApiAdminUsersListUsersGet200ResponseInner call({
    String id,
    String username,
    String? email,
    bool isAdmin,
  });
}

/// Callable proxy for `copyWith` functionality.
/// Use as `instanceOfApiAdminUsersListUsersGet200ResponseInner.copyWith(...)` or call `instanceOfApiAdminUsersListUsersGet200ResponseInner.copyWith.fieldName(value)` for a single field.
class _$ApiAdminUsersListUsersGet200ResponseInnerCWProxyImpl
    implements _$ApiAdminUsersListUsersGet200ResponseInnerCWProxy {
  const _$ApiAdminUsersListUsersGet200ResponseInnerCWProxyImpl(this._value);

  final ApiAdminUsersListUsersGet200ResponseInner _value;

  @override
  ApiAdminUsersListUsersGet200ResponseInner id(String id) => call(id: id);

  @override
  ApiAdminUsersListUsersGet200ResponseInner username(String username) =>
      call(username: username);

  @override
  ApiAdminUsersListUsersGet200ResponseInner email(String? email) =>
      call(email: email);

  @override
  ApiAdminUsersListUsersGet200ResponseInner isAdmin(bool isAdmin) =>
      call(isAdmin: isAdmin);

  @override
  /// Creates a new instance with the provided field values.
  /// Passing `null` to a nullable field nullifies it, while `null` for a non-nullable field is ignored. To update a single field use `ApiAdminUsersListUsersGet200ResponseInner(...).copyWith.fieldName(value)`.
  ///
  /// Example:
  /// ```dart
  /// ApiAdminUsersListUsersGet200ResponseInner(...).copyWith(id: 12, name: "My name")
  /// ```
  ApiAdminUsersListUsersGet200ResponseInner call({
    Object? id = const $CopyWithPlaceholder(),
    Object? username = const $CopyWithPlaceholder(),
    Object? email = const $CopyWithPlaceholder(),
    Object? isAdmin = const $CopyWithPlaceholder(),
  }) {
    return ApiAdminUsersListUsersGet200ResponseInner(
      id: id == const $CopyWithPlaceholder() || id == null
          ? _value.id
          // ignore: cast_nullable_to_non_nullable
          : id as String,
      username: username == const $CopyWithPlaceholder() || username == null
          ? _value.username
          // ignore: cast_nullable_to_non_nullable
          : username as String,
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

extension $ApiAdminUsersListUsersGet200ResponseInnerCopyWith
    on ApiAdminUsersListUsersGet200ResponseInner {
  /// Returns a callable class used to build a new instance with modified fields.
  /// Example: `instanceOfApiAdminUsersListUsersGet200ResponseInner.copyWith(...)` or `instanceOfApiAdminUsersListUsersGet200ResponseInner.copyWith.fieldName(...)`.
  // ignore: library_private_types_in_public_api
  _$ApiAdminUsersListUsersGet200ResponseInnerCWProxy get copyWith =>
      _$ApiAdminUsersListUsersGet200ResponseInnerCWProxyImpl(this);
}

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

ApiAdminUsersListUsersGet200ResponseInner
_$ApiAdminUsersListUsersGet200ResponseInnerFromJson(
  Map<String, dynamic> json,
) => $checkedCreate('ApiAdminUsersListUsersGet200ResponseInner', json, (
  $checkedConvert,
) {
  $checkKeys(json, requiredKeys: const ['id', 'username', 'email', 'isAdmin']);
  final val = ApiAdminUsersListUsersGet200ResponseInner(
    id: $checkedConvert('id', (v) => v as String),
    username: $checkedConvert('username', (v) => v as String),
    email: $checkedConvert('email', (v) => v as String?),
    isAdmin: $checkedConvert('isAdmin', (v) => v as bool),
  );
  return val;
});

Map<String, dynamic> _$ApiAdminUsersListUsersGet200ResponseInnerToJson(
  ApiAdminUsersListUsersGet200ResponseInner instance,
) => <String, dynamic>{
  'id': instance.id,
  'username': instance.username,
  'email': instance.email,
  'isAdmin': instance.isAdmin,
};
