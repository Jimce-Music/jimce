// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'api_auth_change_password_put_request.dart';

// **************************************************************************
// CopyWithGenerator
// **************************************************************************

abstract class _$ApiAuthChangePasswordPutRequestCWProxy {
  ApiAuthChangePasswordPutRequest newPassword(String newPassword);

  /// Creates a new instance with the provided field values.
  /// Passing `null` to a nullable field nullifies it, while `null` for a non-nullable field is ignored. To update a single field use `ApiAuthChangePasswordPutRequest(...).copyWith.fieldName(value)`.
  ///
  /// Example:
  /// ```dart
  /// ApiAuthChangePasswordPutRequest(...).copyWith(id: 12, name: "My name")
  /// ```
  ApiAuthChangePasswordPutRequest call({String newPassword});
}

/// Callable proxy for `copyWith` functionality.
/// Use as `instanceOfApiAuthChangePasswordPutRequest.copyWith(...)` or call `instanceOfApiAuthChangePasswordPutRequest.copyWith.fieldName(value)` for a single field.
class _$ApiAuthChangePasswordPutRequestCWProxyImpl
    implements _$ApiAuthChangePasswordPutRequestCWProxy {
  const _$ApiAuthChangePasswordPutRequestCWProxyImpl(this._value);

  final ApiAuthChangePasswordPutRequest _value;

  @override
  ApiAuthChangePasswordPutRequest newPassword(String newPassword) =>
      call(newPassword: newPassword);

  @override
  /// Creates a new instance with the provided field values.
  /// Passing `null` to a nullable field nullifies it, while `null` for a non-nullable field is ignored. To update a single field use `ApiAuthChangePasswordPutRequest(...).copyWith.fieldName(value)`.
  ///
  /// Example:
  /// ```dart
  /// ApiAuthChangePasswordPutRequest(...).copyWith(id: 12, name: "My name")
  /// ```
  ApiAuthChangePasswordPutRequest call({
    Object? newPassword = const $CopyWithPlaceholder(),
  }) {
    return ApiAuthChangePasswordPutRequest(
      newPassword:
          newPassword == const $CopyWithPlaceholder() || newPassword == null
          ? _value.newPassword
          // ignore: cast_nullable_to_non_nullable
          : newPassword as String,
    );
  }
}

extension $ApiAuthChangePasswordPutRequestCopyWith
    on ApiAuthChangePasswordPutRequest {
  /// Returns a callable class used to build a new instance with modified fields.
  /// Example: `instanceOfApiAuthChangePasswordPutRequest.copyWith(...)` or `instanceOfApiAuthChangePasswordPutRequest.copyWith.fieldName(...)`.
  // ignore: library_private_types_in_public_api
  _$ApiAuthChangePasswordPutRequestCWProxy get copyWith =>
      _$ApiAuthChangePasswordPutRequestCWProxyImpl(this);
}

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

ApiAuthChangePasswordPutRequest _$ApiAuthChangePasswordPutRequestFromJson(
  Map<String, dynamic> json,
) => $checkedCreate('ApiAuthChangePasswordPutRequest', json, ($checkedConvert) {
  $checkKeys(json, requiredKeys: const ['newPassword']);
  final val = ApiAuthChangePasswordPutRequest(
    newPassword: $checkedConvert('newPassword', (v) => v as String),
  );
  return val;
});

Map<String, dynamic> _$ApiAuthChangePasswordPutRequestToJson(
  ApiAuthChangePasswordPutRequest instance,
) => <String, dynamic>{'newPassword': instance.newPassword};
