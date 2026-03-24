// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'api_me_userinfo_get200_response.dart';

// **************************************************************************
// CopyWithGenerator
// **************************************************************************

abstract class _$ApiMeUserinfoGet200ResponseCWProxy {
  ApiMeUserinfoGet200Response id(String id);

  ApiMeUserinfoGet200Response username(String? username);

  ApiMeUserinfoGet200Response email(String? email);

  ApiMeUserinfoGet200Response isAdmin(bool isAdmin);

  /// Creates a new instance with the provided field values.
  /// Passing `null` to a nullable field nullifies it, while `null` for a non-nullable field is ignored. To update a single field use `ApiMeUserinfoGet200Response(...).copyWith.fieldName(value)`.
  ///
  /// Example:
  /// ```dart
  /// ApiMeUserinfoGet200Response(...).copyWith(id: 12, name: "My name")
  /// ```
  ApiMeUserinfoGet200Response call({
    String id,
    String? username,
    String? email,
    bool isAdmin,
  });
}

/// Callable proxy for `copyWith` functionality.
/// Use as `instanceOfApiMeUserinfoGet200Response.copyWith(...)` or call `instanceOfApiMeUserinfoGet200Response.copyWith.fieldName(value)` for a single field.
class _$ApiMeUserinfoGet200ResponseCWProxyImpl
    implements _$ApiMeUserinfoGet200ResponseCWProxy {
  const _$ApiMeUserinfoGet200ResponseCWProxyImpl(this._value);

  final ApiMeUserinfoGet200Response _value;

  @override
  ApiMeUserinfoGet200Response id(String id) => call(id: id);

  @override
  ApiMeUserinfoGet200Response username(String? username) =>
      call(username: username);

  @override
  ApiMeUserinfoGet200Response email(String? email) => call(email: email);

  @override
  ApiMeUserinfoGet200Response isAdmin(bool isAdmin) => call(isAdmin: isAdmin);

  @override
  /// Creates a new instance with the provided field values.
  /// Passing `null` to a nullable field nullifies it, while `null` for a non-nullable field is ignored. To update a single field use `ApiMeUserinfoGet200Response(...).copyWith.fieldName(value)`.
  ///
  /// Example:
  /// ```dart
  /// ApiMeUserinfoGet200Response(...).copyWith(id: 12, name: "My name")
  /// ```
  ApiMeUserinfoGet200Response call({
    Object? id = const $CopyWithPlaceholder(),
    Object? username = const $CopyWithPlaceholder(),
    Object? email = const $CopyWithPlaceholder(),
    Object? isAdmin = const $CopyWithPlaceholder(),
  }) {
    return ApiMeUserinfoGet200Response(
      id: id == const $CopyWithPlaceholder() || id == null
          ? _value.id
          // ignore: cast_nullable_to_non_nullable
          : id as String,
      username: username == const $CopyWithPlaceholder()
          ? _value.username
          // ignore: cast_nullable_to_non_nullable
          : username as String?,
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

extension $ApiMeUserinfoGet200ResponseCopyWith on ApiMeUserinfoGet200Response {
  /// Returns a callable class used to build a new instance with modified fields.
  /// Example: `instanceOfApiMeUserinfoGet200Response.copyWith(...)` or `instanceOfApiMeUserinfoGet200Response.copyWith.fieldName(...)`.
  // ignore: library_private_types_in_public_api
  _$ApiMeUserinfoGet200ResponseCWProxy get copyWith =>
      _$ApiMeUserinfoGet200ResponseCWProxyImpl(this);
}

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

ApiMeUserinfoGet200Response _$ApiMeUserinfoGet200ResponseFromJson(
  Map<String, dynamic> json,
) => $checkedCreate('ApiMeUserinfoGet200Response', json, ($checkedConvert) {
  $checkKeys(json, requiredKeys: const ['id', 'username', 'email', 'isAdmin']);
  final val = ApiMeUserinfoGet200Response(
    id: $checkedConvert('id', (v) => v as String),
    username: $checkedConvert('username', (v) => v as String?),
    email: $checkedConvert('email', (v) => v as String?),
    isAdmin: $checkedConvert('isAdmin', (v) => v as bool),
  );
  return val;
});

Map<String, dynamic> _$ApiMeUserinfoGet200ResponseToJson(
  ApiMeUserinfoGet200Response instance,
) => <String, dynamic>{
  'id': instance.id,
  'username': instance.username,
  'email': instance.email,
  'isAdmin': instance.isAdmin,
};
