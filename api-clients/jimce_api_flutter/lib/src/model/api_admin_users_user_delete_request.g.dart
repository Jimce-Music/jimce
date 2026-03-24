// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'api_admin_users_user_delete_request.dart';

// **************************************************************************
// CopyWithGenerator
// **************************************************************************

abstract class _$ApiAdminUsersUserDeleteRequestCWProxy {
  ApiAdminUsersUserDeleteRequest id(String id);

  /// Creates a new instance with the provided field values.
  /// Passing `null` to a nullable field nullifies it, while `null` for a non-nullable field is ignored. To update a single field use `ApiAdminUsersUserDeleteRequest(...).copyWith.fieldName(value)`.
  ///
  /// Example:
  /// ```dart
  /// ApiAdminUsersUserDeleteRequest(...).copyWith(id: 12, name: "My name")
  /// ```
  ApiAdminUsersUserDeleteRequest call({String id});
}

/// Callable proxy for `copyWith` functionality.
/// Use as `instanceOfApiAdminUsersUserDeleteRequest.copyWith(...)` or call `instanceOfApiAdminUsersUserDeleteRequest.copyWith.fieldName(value)` for a single field.
class _$ApiAdminUsersUserDeleteRequestCWProxyImpl
    implements _$ApiAdminUsersUserDeleteRequestCWProxy {
  const _$ApiAdminUsersUserDeleteRequestCWProxyImpl(this._value);

  final ApiAdminUsersUserDeleteRequest _value;

  @override
  ApiAdminUsersUserDeleteRequest id(String id) => call(id: id);

  @override
  /// Creates a new instance with the provided field values.
  /// Passing `null` to a nullable field nullifies it, while `null` for a non-nullable field is ignored. To update a single field use `ApiAdminUsersUserDeleteRequest(...).copyWith.fieldName(value)`.
  ///
  /// Example:
  /// ```dart
  /// ApiAdminUsersUserDeleteRequest(...).copyWith(id: 12, name: "My name")
  /// ```
  ApiAdminUsersUserDeleteRequest call({
    Object? id = const $CopyWithPlaceholder(),
  }) {
    return ApiAdminUsersUserDeleteRequest(
      id: id == const $CopyWithPlaceholder() || id == null
          ? _value.id
          // ignore: cast_nullable_to_non_nullable
          : id as String,
    );
  }
}

extension $ApiAdminUsersUserDeleteRequestCopyWith
    on ApiAdminUsersUserDeleteRequest {
  /// Returns a callable class used to build a new instance with modified fields.
  /// Example: `instanceOfApiAdminUsersUserDeleteRequest.copyWith(...)` or `instanceOfApiAdminUsersUserDeleteRequest.copyWith.fieldName(...)`.
  // ignore: library_private_types_in_public_api
  _$ApiAdminUsersUserDeleteRequestCWProxy get copyWith =>
      _$ApiAdminUsersUserDeleteRequestCWProxyImpl(this);
}

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

ApiAdminUsersUserDeleteRequest _$ApiAdminUsersUserDeleteRequestFromJson(
  Map<String, dynamic> json,
) => $checkedCreate('ApiAdminUsersUserDeleteRequest', json, ($checkedConvert) {
  $checkKeys(json, requiredKeys: const ['id']);
  final val = ApiAdminUsersUserDeleteRequest(
    id: $checkedConvert('id', (v) => v as String),
  );
  return val;
});

Map<String, dynamic> _$ApiAdminUsersUserDeleteRequestToJson(
  ApiAdminUsersUserDeleteRequest instance,
) => <String, dynamic>{'id': instance.id};
